// Build-time sitemap.xml generator. Reads the route table from
// src/lib/seo.ts (via a tsc-stripped dynamic import) and writes a
// fully-formed XML sitemap into dist/.
//
// Invoked as a post-build step from package.json.

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');

if (!existsSync(distDir)) {
  console.warn('[sitemap] dist/ not found — run `vite build` first.');
  process.exit(0);
}

// We need to import the TS modules at runtime. Easiest path: use a
// small inlined copy of the route list so we don't introduce a tsx
// runtime dep. Keep this in sync with src/lib/seo.ts.
const SITE_URL = 'https://www.patellawva.com';
const ROUTES = [
  { path: '/',         priority: 1.0, changefreq: 'weekly'  },
  { path: '/practice', priority: 0.9, changefreq: 'monthly' },
  { path: '/about',    priority: 0.8, changefreq: 'yearly'  },
  { path: '/results',  priority: 0.8, changefreq: 'monthly' },
  { path: '/areas',    priority: 0.8, changefreq: 'monthly' },
  { path: '/contact',  priority: 0.9, changefreq: 'yearly'  },
];

const today = new Date().toISOString().slice(0, 10);

const absoluteUrl = (p) =>
  p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.replace(/\/+$/, '')}`;

const body = ROUTES.map(
  (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf8');
console.log('[sitemap] wrote dist/sitemap.xml with', ROUTES.length, 'urls');

// Silence pathToFileURL import warning when this is required, but keep
// it imported so future tsx-based hydration is a one-line change.
void pathToFileURL;
