// Build-time rasterizer for the Open Graph card.
//
// Most social platforms — Facebook, LinkedIn, X/Twitter, iMessage,
// WhatsApp, Slack, Discord, Telegram, Pinterest — refuse to render
// SVG values of `og:image`. They want a real bitmap.
//
// This script:
//   1. Boots a headless Chrome instance via the Chrome DevTools
//      Protocol (no puppeteer dependency).
//   2. Loads an HTML wrapper around `public/og-default.svg` that
//      preloads the same Google Fonts the SVG was designed in
//      (Cormorant Garamond + Inter), waiting for `document.fonts.ready`.
//   3. Captures a 1200×630 PNG screenshot and writes it to
//      `public/og-default.png` (and mirrors it into `dist/` if a
//      build is already on disk).
//
// Output: a deterministic, pixel-perfect, social-platform-friendly
// PNG version of the SVG with crisp brand typography.

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, copyFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = resolve(projectRoot, 'public');
const distDir = resolve(projectRoot, 'dist');

const SVG_PATH = resolve(publicDir, 'og-default.svg');
const PNG_PATH = resolve(publicDir, 'og-default.png');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

if (!existsSync(SVG_PATH)) {
  console.error(`[og-image] Source SVG not found: ${SVG_PATH}`);
  process.exit(1);
}

const svg = readFileSync(SVG_PATH, 'utf8');

// ---------- 1. Locate Chrome ----------
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
  console.warn('[og-image] No Chrome/Chromium binary found — skipping PNG generation.');
  console.warn('[og-image] Existing og-default.png (if any) will be reused.');
  process.exit(0);
}

// ---------- 2. Free debug port ----------
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

const cdpPort = await getFreePort();

// ---------- 3. Spawn Chrome ----------
const userDataDir = mkdtempSync(join(tmpdir(), 'patellawva-og-'));
const chromeProc = spawn(
  chromeBin,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    '--allow-file-access-from-files',
    '--force-color-profile=srgb',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${cdpPort}`,
    'about:blank',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
);
chromeProc.stderr.on('data', () => {});

async function waitForChrome() {
  for (let i = 0; i < 80; i++) {
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

// ---------- 4. Attach + load HTML wrapper ----------
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);

await s('Page.enable');
await s('Runtime.enable');

// Render at 1× so the output PNG is exactly OG_WIDTH×OG_HEIGHT and
// stays under the size limits social crawlers enforce (~1 MB).
// SVG paths and CSS fonts both rasterize crisply at 1× anyway.
await s('Emulation.setDeviceMetricsOverride', {
  width: OG_WIDTH,
  height: OG_HEIGHT,
  deviceScaleFactor: 1,
  mobile: false,
});

const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>OG card</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
    width: ${OG_WIDTH}px;
    height: ${OG_HEIGHT}px;
    overflow: hidden;
    /* Match the same font stack the SVG declares. */
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  svg { display: block; width: ${OG_WIDTH}px; height: ${OG_HEIGHT}px; }
</style>
</head>
<body>
${svg}
</body>
</html>`;

await s('Page.setDocumentContent', {
  frameId: (await s('Page.getFrameTree')).frameTree.frame.id,
  html,
});

// Wait until Google Fonts have loaded so the rasterized text uses
// Cormorant Garamond / Inter rather than the serif/sans fallback.
const fontReady = await s('Runtime.evaluate', {
  expression: `(async () => {
    try {
      // Force-load the specific weights/families used in the SVG so
      // document.fonts.ready resolves only after they're in memory.
      const want = [
        '700 88px "Cormorant Garamond"',
        '600 30px "Cormorant Garamond"',
        '700 24px Inter',
        '600 22px Inter',
        '500 26px Inter',
        '500 20px Inter',
      ];
      await Promise.all(want.map((f) => document.fonts.load(f)));
      await document.fonts.ready;
      return true;
    } catch (e) {
      return String(e);
    }
  })()`,
  awaitPromise: true,
  returnByValue: true,
});
if (fontReady.result.value !== true) {
  console.warn('[og-image] Font loading warning:', fontReady.result.value);
}

// Tiny settle to let layout flush after fonts swap in.
await new Promise((r) => setTimeout(r, 150));

// ---------- 5. Screenshot ----------
const shot = await s('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: false,
  clip: {
    x: 0,
    y: 0,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    scale: 1,
  },
  fromSurface: true,
});

const buf = Buffer.from(shot.data, 'base64');
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
writeFileSync(PNG_PATH, buf);

// Mirror into dist/ if a build already exists, so re-running this
// script after `vite build` keeps the served asset in sync.
if (existsSync(distDir)) {
  try {
    copyFileSync(PNG_PATH, resolve(distDir, 'og-default.png'));
    copyFileSync(SVG_PATH, resolve(distDir, 'og-default.svg'));
  } catch (e) {
    console.warn('[og-image] Could not mirror into dist/:', e.message);
  }
}

const kb = (statSync(PNG_PATH).size / 1024).toFixed(1);
console.log(`[og-image] wrote ${PNG_PATH} (${OG_WIDTH}×${OG_HEIGHT}, ${kb} KB)`);

// ---------- 6. Teardown ----------
try { chromeProc.kill('SIGTERM'); } catch {}
ws.close();

process.exit(0);
