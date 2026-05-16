/**
 * Per-route SEO configuration. Anything in this file is consumed by:
 *   - <Seo /> component (title, meta description, canonical, OG, Twitter, robots)
 *   - <Breadcrumbs /> component (BreadcrumbList schema)
 *   - scripts/sitemap.mjs (URLs + priorities at build time)
 *
 * Keeping it in one map makes per-route changes a one-liner and lets us
 * keep the rest of the page components purely presentational.
 */

import { SITE } from './site';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  /** Optional OG image override (relative to site root). */
  ogImage?: string;
  /** OG type — `website` for most marketing pages. */
  ogType?: 'website' | 'article' | 'profile';
  /** Sitemap priority 0.0–1.0. */
  priority?: number;
  /** Sitemap change frequency. */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Hide from search engines (e.g. 404). */
  noindex?: boolean;
  /** Visible breadcrumb label — also used by BreadcrumbList schema. */
  breadcrumb?: string;
};

const SHARED_KEYWORDS = [
  'Fairfax attorney',
  'Northern Virginia lawyer',
  'free legal consultation',
  `${SITE.firmName} Esq`,
];

export const ROUTES: ReadonlyArray<RouteMeta> = [
  {
    path: '/',
    title: `${SITE.firmName}, Esq. | Fairfax Personal Injury & Criminal Defense Attorney`,
    description:
      `Fairfax, VA attorney ${SITE.firmName}, Esq. — 20+ years handling personal injury, car accidents, criminal defense, family law and civil litigation across Northern Virginia and Maryland. Free consultation, no fee unless we win, available 24/7.`,
    keywords: [
      'Fairfax personal injury lawyer',
      'Northern Virginia personal injury attorney',
      'Fairfax car accident attorney',
      'Fairfax criminal defense lawyer',
      'Fairfax DUI lawyer',
      'Fairfax family law attorney',
      'free legal consultation Fairfax',
      'lawyer near me Fairfax VA',
      ...SHARED_KEYWORDS,
    ],
    priority: 1.0,
    changefreq: 'weekly',
    breadcrumb: 'Home',
  },
  {
    path: '/practice',
    title: `Practice Areas | Fairfax Personal Injury, Criminal Defense & Family Law Attorney`,
    description:
      `${SITE.firmName}, Esq. handles personal injury, car & truck accidents, DUI and criminal defense, divorce and family law, and civil litigation throughout Fairfax County and Northern Virginia. Free, confidential consultations.`,
    keywords: [
      'Fairfax personal injury attorney',
      'Fairfax car accident lawyer',
      'Fairfax DUI defense lawyer',
      'Fairfax criminal defense attorney',
      'Fairfax divorce attorney',
      'Fairfax family law lawyer',
      'civil litigation attorney Northern Virginia',
      ...SHARED_KEYWORDS,
    ],
    priority: 0.9,
    changefreq: 'monthly',
    breadcrumb: 'Practice Areas',
  },
  {
    path: '/about',
    title: `About ${SITE.firmName}, Esq. | Fairfax, VA Trial Attorney`,
    description:
      `Meet ${SITE.firmName}, Esq. — a Fairfax-based trial attorney with two decades of experience across personal injury, criminal defense, family law and civil litigation. Direct attorney access, no paralegal layer.`,
    keywords: [
      `${SITE.firmName} Esq attorney`,
      'Fairfax trial attorney',
      'top rated lawyer Fairfax VA',
      'experienced Northern Virginia attorney',
      ...SHARED_KEYWORDS,
    ],
    ogType: 'profile',
    priority: 0.8,
    changefreq: 'yearly',
    breadcrumb: 'About',
  },
  {
    path: '/results',
    title: `Case Results | ${SITE.firmName}, Esq. — Fairfax Settlement & Verdict Attorney`,
    description:
      `Representative settlements and verdicts personally handled by ${SITE.firmName}, Esq. — six-figure personal injury recoveries, criminal case dismissals and family-law outcomes across Northern Virginia.`,
    keywords: [
      'Fairfax personal injury settlements',
      'Northern Virginia injury verdicts',
      'attorney case results Fairfax',
      'Fairfax accident settlement amounts',
      ...SHARED_KEYWORDS,
    ],
    priority: 0.8,
    changefreq: 'monthly',
    breadcrumb: 'Results',
  },
  {
    path: '/areas',
    title: `Areas Served | Fairfax, Northern Virginia & Maryland Attorney`,
    description:
      `${SITE.firmName}, Esq. represents clients across Fairfax, Arlington, Loudoun, Prince William and Fauquier counties in Virginia, and Howard, Montgomery and Prince George's counties in Maryland.`,
    keywords: [
      'lawyer Fairfax County',
      'attorney Arlington VA',
      'attorney Loudoun County',
      'lawyer Prince William County',
      'Maryland personal injury lawyer',
      'Montgomery County MD attorney',
      ...SHARED_KEYWORDS,
    ],
    priority: 0.8,
    changefreq: 'monthly',
    breadcrumb: 'Areas Served',
  },
  {
    path: '/contact',
    title: `Contact ${SITE.firmName}, Esq. | Free Consultation · ${SITE.availability}`,
    description:
      `Contact ${SITE.firmName}, Esq. for a free, confidential consultation — available 24/7. Office at ${SITE.address}. Call ${SITE.phoneDisplay} or send a message; injury cases handled on contingency.`,
    keywords: [
      'contact Fairfax attorney',
      'free consultation Fairfax lawyer',
      '24 hour lawyer Fairfax VA',
      'Fairfax law office',
      ...SHARED_KEYWORDS,
    ],
    priority: 0.9,
    changefreq: 'yearly',
    breadcrumb: 'Contact',
  },
];

const ROUTE_INDEX = new Map(ROUTES.map((r) => [r.path, r]));

/** Look up route metadata by pathname. Returns undefined for unknown paths. */
export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_INDEX.get(path);
}

/** Build a full Open Graph image URL (absolute). */
export function ogImageUrl(image?: string): string {
  const src = image || SITE.defaultOgImage;
  if (/^https?:\/\//i.test(src)) return src;
  return SITE.url + (src.startsWith('/') ? src : `/${src}`);
}
