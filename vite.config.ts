import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Tiny plugin that mirrors what every static host (Netlify, Vercel,
 * Cloudflare Pages, S3+CloudFront, GitHub Pages, nginx) does by
 * default: if a request hits a clean URL like `/practice` and we have
 * a prerendered `dist/practice/index.html`, serve it directly instead
 * of letting Vite's SPA fallback rewrite the response to the root
 * shell. Without this the local `vite preview` would silently mask
 * the prerendered SEO output.
 */
function serveDirectoryIndexes() {
  return {
    name: 'serve-prerendered-directory-indexes',
    apply: 'serve' as const,
    configurePreviewServer(server: { middlewares: { use: (handler: unknown) => void } }) {
      const distDir = resolve(__dirname, 'dist');
      type ReqLike = { url?: string };
      type ResLike = { setHeader: (k: string, v: string) => void };
      server.middlewares.use((req: ReqLike, _res: ResLike, next: () => void) => {
        if (!req.url || req.url.includes('.')) return next();
        const url = req.url.split('?')[0];
        if (url.endsWith('/')) return next();
        const candidate = resolve(distDir, url.replace(/^\/+/, ''), 'index.html');
        if (existsSync(candidate)) {
          // Rewrite to the directory index so sirv-style static serving
          // picks it up natively.
          req.url = url + '/' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
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
