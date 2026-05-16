/**
 * Centralized image store.
 *
 * Every image used across the site is referenced from this file.
 * Swap a URL or a local path here once and every page picks it up.
 *
 *   import { images } from '@/lib/images';
 *   <img src={images.attorney.portrait} alt="…" />
 *
 * Local files: drop into `public/images/` and reference as `/images/your-file.jpg`.
 * Remote files: paste the absolute URL.
 */

export const images = {
  brand: {
    logo: '/logo.svg',
    logoMark: '/logo-mark.svg',
    favicon: '/favicon.svg',
  },

  attorney: {
    portrait:
      'https://cdn.sanity.io/images/4nanwteg/production/25b5e4e9112eedb8a32550201e0bf1e83a495ad1-1321x1981.jpg?w=1321&q=100&fit=max&auto=format&dpr=2',
  },

  home: {
    aboutLibrary:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=80',
  },

  practice: {
    personalInjury:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    criminalDefense:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    familyLaw:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    civilLitigation:
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
  },
} as const;

export type ImagePath =
  | `brand.${keyof typeof images.brand}`
  | `attorney.${keyof typeof images.attorney}`
  | `home.${keyof typeof images.home}`
  | `practice.${keyof typeof images.practice}`;
