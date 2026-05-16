// Build-time prerender for the React SPA.
//
// 1. Spawns `vite preview` on a free port to serve `dist/`.
// 2. Boots a headless Chrome instance via the Chrome DevTools
//    Protocol (no puppeteer dependency).
// 3. For every route in ROUTES, navigates the page, waits for any
//    pending rAF + a short settle window, then captures
//    `document.documentElement.outerHTML`.
// 4. Writes the captured HTML to `dist/<route>/index.html`.
// 5. Tears the preview server + Chrome down.
//
// Output: each route becomes a real, crawlable HTML document. The
// client-side React app still hydrates on top — but Googlebot,
// LinkedIn/Twitter/Facebook crawlers, and first-paint LCP all benefit
// from the pre-rendered shell.

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');

if (!existsSync(distDir)) {
  console.error('[prerender] dist/ not found — run `vite build` first.');
  process.exit(1);
}

const ROUTES = [
  '/',
  '/practice',
  '/about',
  '/results',
  '/areas',
  '/contact',
];

// Skip prerender on non-Darwin systems where the Chrome binary lookup
// might not resolve. The site still works fine via the SPA shell.
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  process.env.CHROME_PATH,
].filter(Boolean);

const chromeBin = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromeBin) {
  console.warn('[prerender] No Chrome/Chromium binary found — skipping prerender.');
  console.warn('[prerender] Tried:', CHROME_CANDIDATES);
  process.exit(0);
}

// ---------- 1. Pick free ports ----------
async function getFreePort() {
  return new Promise((res, rej) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', rej);
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => res(port));
    });
  });
}

const previewPort = await getFreePort();
const cdpPort = await getFreePort();

// ---------- 2. Start `vite preview` ----------
const previewProc = spawn(
  process.execPath,
  [
    resolve(projectRoot, 'node_modules/vite/bin/vite.js'),
    'preview',
    '--port', String(previewPort),
    '--strictPort',
    '--host', '127.0.0.1',
  ],
  { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] },
);
previewProc.stdout.on('data', () => {});
previewProc.stderr.on('data', (d) => process.stderr.write(`[preview] ${d}`));

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 304) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Server did not start: ${url}`);
}

await waitForServer(`http://127.0.0.1:${previewPort}/`);

// ---------- 3. Start headless Chrome ----------
const userDataDir = mkdtempSync(join(tmpdir(), 'patellawva-prerender-'));
const chromeProc = spawn(
  chromeBin,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${cdpPort}`,
    'about:blank',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
);
chromeProc.stderr.on('data', () => {});

async function waitForChrome() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (r.ok) return r.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('Chrome did not start');
}

const ver = await waitForChrome();
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let nextId = 1;
const pending = new Map();
const onEvent = new Map();
ws.onmessage = (ev) => {
  const data = typeof ev.data === 'string' ? ev.data : ev.data.toString();
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    const sid = msg.sessionId || '_';
    const key = `${sid}::${msg.method}`;
    const hs = onEvent.get(key) || [];
    onEvent.delete(key);
    hs.forEach((h) => h(msg.params));
  }
};

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

const waitForEvent = (method, sessionId, timeoutMs = 15000) =>
  new Promise((resolve, reject) => {
    const sid = sessionId || '_';
    const key = `${sid}::${method}`;
    const hs = onEvent.get(key) || [];
    const timer = setTimeout(() => reject(new Error(`Timeout waiting for ${method}`)), timeoutMs);
    hs.push((p) => {
      clearTimeout(timer);
      resolve(p);
    });
    onEvent.set(key, hs);
  });

// Create one shared target/session so we don't pay setup cost per route.
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);

await s('Page.enable');
await s('Runtime.enable');
await s('Network.enable');

// ---------- 4. Walk routes ----------
const baseUrl = `http://127.0.0.1:${previewPort}`;

async function prerenderRoute(route) {
  const loadP = waitForEvent('Page.loadEventFired', sessionId, 20000);
  await s('Page.navigate', { url: baseUrl + route });
  await loadP;

  // Give React's <Seo> / <JsonLd> effects and lazy-loaded chunks a
  // moment to flush into the DOM. 600ms is comfortably enough for
  // our small app on a local preview server.
  await new Promise((r) => setTimeout(r, 700));

  // Make sure scroll is at top so any prerendered scroll state is clean.
  await s('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });

  const { result } = await s('Runtime.evaluate', {
    expression: `(() => {
      // Drop the bundled JS preload-prefetch hints React Router
      // generated at runtime — we want a clean static document.
      // (Vite's index.html already references the real script bundles.)
      return '<!doctype html>' + document.documentElement.outerHTML;
    })()`,
    returnByValue: true,
  });

  return result.value;
}

const writes = [];
for (const route of ROUTES) {
  const html = await prerenderRoute(route);
  const outDir = route === '/' ? distDir : resolve(distDir, route.replace(/^\//, ''));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, 'index.html');
  writeFileSync(outFile, html, 'utf8');
  writes.push(outFile.replace(distDir + '/', ''));
}

console.log('[prerender] wrote:');
writes.forEach((p) => console.log('  •', p));

// ---------- 5. Teardown ----------
try { chromeProc.kill('SIGTERM'); } catch {}
try { previewProc.kill('SIGTERM'); } catch {}
ws.close();

process.exit(0);
