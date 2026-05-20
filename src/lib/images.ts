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
    personalInjury: '/images/personal-injury.png',
    criminalDefense: '/images/criminal-defense.png',
    familyLaw: '/images/family-law.png',
    civilLitigation: '/images/civil-litigation.png',
  },
} as const;

export type ImagePath =
  | `brand.${keyof typeof images.brand}`
  | `attorney.${keyof typeof images.attorney}`
  | `home.${keyof typeof images.home}`
  | `practice.${keyof typeof images.practice}`;
