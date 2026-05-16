/**
 * Single source of truth for brand, contact, and SEO constants used
 * across every page, component, and structured-data builder.
 *
 * Anything that appears in user-visible copy, schema.org JSON-LD, OG
 * meta tags, or the sitemap should be derived from this file so the
 * site stays consistent and is trivial to rebrand later.
 */

const SITE_URL = 'https://www.patellawva.com';

export const SITE = {
  firmName: 'Bhavik D. Patel',
  firmTag: 'Attorney at Law',
  legalName: 'Bhavik D. Patel, Attorney at Law',
  honorific: 'Esq.',
  founder: 'Bhavik D. Patel',

  // Backwards-compatible single-line address used by existing components.
  address: '10500 Sager Ave, Suite F, Fairfax, VA 22030',

  // Structured address — used by JSON-LD (PostalAddress) and microdata.
  postalAddress: {
    streetAddress: '10500 Sager Ave, Suite F',
    addressLocality: 'Fairfax',
    addressRegion: 'VA',
    postalCode: '22030',
    addressCountry: 'US',
  },

  // Geo coordinates for the office — used by LocalBusiness schema and
  // map providers. Approximate centroid of the Fairfax office address.
  geo: { latitude: 38.8462, longitude: -77.3064 },

  email: 'contact@patellawva.com',
  phoneDisplay: '(703) 844-4519',
  phoneTel: '7038444519',
  phoneE164: '+17038444519',

  availability: 'Available 24/7',
  city: 'Fairfax, VA',

  // 24/7 in schema.org OpeningHoursSpecification shorthand.
  openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',

  priceRange: '$$',
  foundingYear: 2005,

  // Absolute site URL — must NOT include a trailing slash. Used to
  // construct canonical URLs, og:url, sitemap entries, etc.
  url: SITE_URL,

  // Default Open Graph / Twitter image (relative to site root).
  // PNG, not SVG — Facebook, LinkedIn, X/Twitter, iMessage, WhatsApp,
  // Slack, Discord, etc. do not render SVG `og:image` values.
  defaultOgImage: '/og-default.png',
  defaultOgImageType: 'image/png',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,

  // Optional social handles — pruned to those actually used.
  social: {
    twitter: undefined as string | undefined,
    facebook: undefined as string | undefined,
    linkedin: undefined as string | undefined,
  },

  language: 'en-US',
  locale: 'en_US',

  // Service / practice keyword universe — kept here so meta + JSON-LD
  // + on-page copy can pull from the same vocabulary.
  primaryKeywords: [
    'Fairfax personal injury lawyer',
    'Northern Virginia personal injury attorney',
    'Fairfax car accident lawyer',
    'Fairfax criminal defense attorney',
    'Fairfax DUI lawyer',
    'Fairfax family law attorney',
    'Fairfax divorce lawyer',
    'civil litigation attorney Fairfax',
    'free legal consultation Fairfax VA',
    'best lawyer near me Fairfax',
  ],
} as const;

export type NavItem = {
  to: string;
  label: string;
};

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: '/',          label: 'Home' },
  { to: '/practice',  label: 'Practice' },
  { to: '/about',     label: 'About' },
  { to: '/results',   label: 'Results' },
  { to: '/areas',     label: 'Areas Served' },
  { to: '/contact',   label: 'Contact' },
];

// Helper — build an absolute URL for a given route path. Always
// produces the canonical form (no trailing slash other than the root).
export function absoluteUrl(path: string): string {
  if (!path || path === '/') return SITE.url + '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  // Strip any trailing slash for non-root paths.
  return SITE.url + clean.replace(/\/+$/, '');
}
