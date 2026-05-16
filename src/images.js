/**
 * Centralized image store.
 *
 * Every image used across the site is referenced from this file.
 * Swap a URL or a local path here once — every page picks it up.
 *
 * Usage in HTML:
 *   <img data-image="attorney.portrait" alt="..." />
 *
 * Usage in JS:
 *   import { getImage } from './images.js';
 *   const url = getImage('practice.personalInjury');
 *
 * Local files: drop the file into `public/images/` and reference it as
 *   '/images/your-file.jpg'  (Vite serves /public from the site root)
 *
 * Remote files: paste the absolute URL.
 */

export const images = {
  brand: {
    logo: '/logo.svg',
    logoMark: '/logo-mark.svg',
    favicon: '/favicon.svg',
  },

  attorney: {
    // Bhavik's portrait — used in the homepage hero and the about page
    portrait:
      'https://cdn.sanity.io/images/4nanwteg/production/25b5e4e9112eedb8a32550201e0bf1e83a495ad1-1321x1981.jpg?w=1321&q=100&fit=max&auto=format&dpr=2',
  },

  home: {
    // "Meet Your Attorney" preview — law library / leather chair
    aboutLibrary:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=80',
  },

  practice: {
    // 4 practice-area illustrations (one per section on practice.html)
    personalInjury:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    criminalDefense:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    familyLaw:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    civilLitigation:
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
  },
};

/**
 * Resolve a dotted-path key like "practice.personalInjury" against the store.
 * Returns the string URL, or undefined if the key is not registered.
 */
export function getImage(path) {
  if (!path) return undefined;
  return path
    .split('.')
    .reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), images);
}

/**
 * Find every `<img data-image="...">` on the page and fill in its `src`.
 * Also handles elements with `data-image-bg` to set CSS background-image.
 * Safe to call multiple times — already-resolved nodes are skipped.
 */
export function bindImages(root = document) {
  root.querySelectorAll('img[data-image]').forEach((el) => {
    if (el.dataset.imageResolved === 'true') return;
    const url = getImage(el.dataset.image);
    if (!url) {
      console.warn(`[images] missing key: "${el.dataset.image}"`);
      return;
    }
    el.src = url;
    el.dataset.imageResolved = 'true';
  });

  root.querySelectorAll('[data-image-bg]').forEach((el) => {
    if (el.dataset.imageBgResolved === 'true') return;
    const url = getImage(el.dataset.imageBg);
    if (!url) {
      console.warn(`[images] missing key: "${el.dataset.imageBg}"`);
      return;
    }
    el.style.backgroundImage = `url("${url}")`;
    el.dataset.imageBgResolved = 'true';
  });
}
