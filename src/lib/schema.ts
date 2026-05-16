/**
 * Schema.org JSON-LD builders. Each function returns a plain object
 * ready for `JSON.stringify` and embedding inside
 * `<script type="application/ld+json">`.
 *
 * Helps with rich results in Google: LegalService, Attorney,
 * LocalBusiness, FAQ rich snippets, breadcrumb trails, reviews, and
 * sitelink search box.
 */

import { SITE, absoluteUrl } from './site';

/** Core organization / firm identity — referenced by `@id` elsewhere. */
const ORG_ID = `${SITE.url}/#organization`;
const PERSON_ID = `${SITE.url}/#attorney`;
const PLACE_ID = `${SITE.url}/#place`;
const WEBSITE_ID = `${SITE.url}/#website`;

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: SITE.postalAddress.streetAddress,
  addressLocality: SITE.postalAddress.addressLocality,
  addressRegion: SITE.postalAddress.addressRegion,
  postalCode: SITE.postalAddress.postalCode,
  addressCountry: SITE.postalAddress.addressCountry,
};

const GEO_COORDS = {
  '@type': 'GeoCoordinates' as const,
  latitude: SITE.geo.latitude,
  longitude: SITE.geo.longitude,
};

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Fairfax County, VA' },
  { '@type': 'AdministrativeArea', name: 'Arlington County, VA' },
  { '@type': 'AdministrativeArea', name: 'Loudoun County, VA' },
  { '@type': 'AdministrativeArea', name: 'Prince William County, VA' },
  { '@type': 'AdministrativeArea', name: 'Fauquier County, VA' },
  { '@type': 'AdministrativeArea', name: 'Montgomery County, MD' },
  { '@type': 'AdministrativeArea', name: 'Howard County, MD' },
  { '@type': "Prince George's County, MD" },
];

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
];

const PRACTICE_SERVICES = [
  'Personal Injury',
  'Car Accidents',
  'Truck Accidents',
  'Motorcycle Accidents',
  'Slip and Fall',
  'Wrongful Death',
  'Criminal Defense',
  'DUI Defense',
  'Reckless Driving',
  'Divorce and Family Law',
  'Child Custody',
  'Civil Litigation',
  'Commercial Loan Disputes',
];

/** Sameas social URLs — populated only with defined handles. */
function sameAs(): string[] {
  return Object.values(SITE.social).filter((u): u is string => Boolean(u));
}

// ---------- Builders ----------

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.legalName,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl('/logo.svg'),
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: POSTAL_ADDRESS,
    founder: { '@id': PERSON_ID },
    foundingDate: String(SITE.foundingYear),
    sameAs: sameAs(),
  };
}

export function attorneySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Person', 'Attorney'],
    '@id': PERSON_ID,
    name: `${SITE.firmName}, Esq.`,
    givenName: 'Bhavik',
    familyName: 'Patel',
    jobTitle: 'Attorney at Law',
    description: `Fairfax, VA attorney with 20+ years of focused legal practice across personal injury, criminal defense, family law and civil litigation.`,
    image: absoluteUrl('/logo.svg'),
    url: absoluteUrl('/about'),
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: POSTAL_ADDRESS,
    worksFor: { '@id': ORG_ID },
    workLocation: { '@id': PLACE_ID },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        recognizedBy: { '@type': 'Organization', name: 'Virginia State Bar' },
      },
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Virginia School of Law' },
      { '@type': 'CollegeOrUniversity', name: 'The College of William & Mary' },
    ],
    memberOf: [
      { '@type': 'Organization', name: 'American Bar Association' },
      { '@type': 'Organization', name: 'Virginia Bar Association' },
      { '@type': 'Organization', name: 'Fairfax County Bar Association' },
      { '@type': 'Organization', name: 'Virginia Trial Lawyers Association' },
    ],
    knowsAbout: PRACTICE_SERVICES,
  };
}

export function legalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness', 'ProfessionalService'],
    '@id': PLACE_ID,
    name: SITE.legalName,
    image: absoluteUrl('/logo.svg'),
    logo: absoluteUrl('/logo.svg'),
    url: SITE.url,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: SITE.priceRange,
    description:
      `Fairfax, VA law office of ${SITE.firmName}, Esq. — personal injury, criminal defense, divorce and family law, and civil litigation. Free consultation, available 24/7.`,
    slogan: 'Available 24/7. No fee unless I win your injury case.',
    address: POSTAL_ADDRESS,
    geo: GEO_COORDS,
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}`,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: AREA_SERVED,
    serviceType: PRACTICE_SERVICES,
    paymentAccepted: ['Cash', 'Check', 'Credit Card'],
    currenciesAccepted: 'USD',
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    sameAs: sameAs(),
    knowsLanguage: ['English'],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/contact'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: { '@type': 'Reservation', name: 'Free Legal Consultation' },
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.legalName,
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.language,
  };
}

export function webPageSchema(opts: {
  path: string;
  title: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type || 'WebPage',
    '@id': absoluteUrl(opts.path) + '#webpage',
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: absoluteUrl(SITE.defaultOgImage),
    inLanguage: SITE.language,
  };
}

export function breadcrumbListSchema(
  items: ReadonlyArray<{ name: string; path?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqPageSchema(faqs: ReadonlyArray<FaqEntry>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export type ReviewEntry = {
  body: string;
  authorName: string;
  rating?: number;
  reviewLocation?: string;
};

export function reviewListSchema(reviews: ReadonlyArray<ReviewEntry>) {
  // Attach reviews directly to the firm (LegalService) so they enrich
  // the LocalBusiness entity in Google's knowledge panel.
  const reviewItems = reviews.map((r) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    author: { '@type': 'Person', name: r.authorName },
    reviewBody: r.body,
    itemReviewed: { '@id': PLACE_ID },
  }));

  const ratingValue =
    reviews.reduce((s, r) => s + (r.rating ?? 5), 0) / Math.max(1, reviews.length);

  return [
    {
      '@context': 'https://schema.org',
      '@id': `${PLACE_ID}/aggregate-rating`,
      '@type': 'AggregateRating',
      itemReviewed: { '@id': PLACE_ID },
      ratingValue: Number(ratingValue.toFixed(1)),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    ...reviewItems,
  ];
}

export type CaseResult = { amount: string; description: string; category: string };

export function caseResultsItemListSchema(results: ReadonlyArray<CaseResult>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Representative Case Results',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: results.length,
    itemListElement: results.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${r.amount} — ${r.category}`,
      description: r.description,
    })),
  };
}

export function serviceListSchema(
  services: ReadonlyArray<{ name: string; description: string; path?: string }>,
) {
  return services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.name,
    name: s.name,
    description: s.description,
    provider: { '@id': PLACE_ID },
    areaServed: AREA_SERVED,
    ...(s.path ? { url: absoluteUrl(s.path) } : {}),
  }));
}
