import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        practice: resolve(__dirname, 'practice.html'),
        about: resolve(__dirname, 'about.html'),
        results: resolve(__dirname, 'results.html'),
        areas: resolve(__dirname, 'areas.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
