import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Tiny plugin that mirrors what every static host (Netlify, Vercel,
 * Cloudflare Pages, S3+CloudFront, GitHub Pages, nginx) does by
 * default: if a request hits a clean URL like `/practice` and we have
 * a prerendered `dist/practice/index.html`, serve it directly instead
 * of letting Vite's SPA fallback rewrite the response to the root
 * shell. Without this the local `vite preview` would silently mask
 * the prerendered SEO output.
 */
function serveDirectoryIndexes(): Plugin {
  return {
    name: 'serve-prerendered-directory-indexes',
    apply: 'serve',
    configurePreviewServer(server) {
      const distDir = resolve(__dirname, 'dist');
      server.middlewares.use((req, _res, next) => {
        if (!req.url || req.url.includes('.')) return next();
        const url = req.url.split('?')[0];
        if (url.endsWith('/')) return next();
        const candidate = resolve(distDir, url.replace(/^\/+/, ''), 'index.html');
        if (existsSync(candidate)) {
          const qs = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
          req.url = url + '/' + qs;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveDirectoryIndexes()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
  },
});
