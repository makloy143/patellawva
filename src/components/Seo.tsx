import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, absoluteUrl } from '../lib/site';
import { getRouteMeta, ogImageUrl } from '../lib/seo';

type Props = {
  /** Override page title (otherwise pulled from route config). */
  title?: string;
  /** Override meta description (otherwise pulled from route config). */
  description?: string;
  /** Override canonical (defaults to the current pathname). */
  canonical?: string;
  /** Override OG/Twitter image (otherwise route or SITE default). */
  image?: string;
  /** OG type (otherwise from route config or `website`). */
  type?: 'website' | 'article' | 'profile';
  /** When true, sets `noindex, nofollow` (e.g. 404 page). */
  noindex?: boolean;
  /** Additional keywords beyond route defaults. */
  keywords?: string[];
};

/**
 * Sets per-page SEO tags on the document head — title, description,
 * canonical, robots, Open Graph, and Twitter Card. Tags are tagged
 * with `data-seo` so re-renders / route changes cleanly replace them
 * instead of accumulating duplicates.
 *
 * Designed to work both client-side and inside the build-time
 * prerender pass (the tags end up in the static HTML for crawlers).
 */
export default function Seo(props: Props) {
  const { pathname } = useLocation();
  const route = getRouteMeta(pathname);

  const title = props.title ?? route?.title ?? `${SITE.firmName}, Esq.`;
  const description = props.description ?? route?.description ?? '';
  const canonical = absoluteUrl(props.canonical ?? pathname);
  const ogType = props.type ?? route?.ogType ?? 'website';
  const noindex = props.noindex ?? route?.noindex ?? false;
  const image = ogImageUrl(props.image ?? route?.ogImage);
  const keywords = [
    ...(route?.keywords ?? []),
    ...(props.keywords ?? []),
  ];

  useEffect(() => {
    document.title = title;
    document.documentElement.setAttribute('lang', SITE.language.split('-')[0]);

    setMetaName('description', description);
    setMetaName('robots', noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    if (keywords.length) setMetaName('keywords', keywords.join(', '));

    setLinkRel('canonical', canonical);

    // Open Graph
    setMetaProperty('og:locale', SITE.locale);
    setMetaProperty('og:site_name', SITE.legalName);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', canonical);
    setMetaProperty('og:image', image);
    setMetaProperty('og:image:width', String(SITE.defaultOgImageWidth));
    setMetaProperty('og:image:height', String(SITE.defaultOgImageHeight));
    setMetaProperty('og:image:alt', `${SITE.firmName}, ${SITE.firmTag}`);

    // Twitter Card
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', image);
    setMetaName('twitter:image:alt', `${SITE.firmName}, ${SITE.firmTag}`);
  }, [title, description, canonical, ogType, image, noindex, keywords.join('|')]);

  return null;
}

// ---------- DOM helpers ----------

function ensureTag<T extends HTMLElement>(
  selector: string,
  factory: () => T,
): T {
  let el = document.head.querySelector<T>(selector);
  if (!el) {
    el = factory();
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  return el;
}

function setMetaName(name: string, content: string) {
  if (!content) return;
  const el = ensureTag<HTMLMetaElement>(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.name = name;
      return m;
    },
  );
  el.content = content;
}

function setMetaProperty(property: string, content: string) {
  if (!content) return;
  const el = ensureTag<HTMLMetaElement>(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', property);
      return m;
    },
  );
  el.content = content;
}

function setLinkRel(rel: string, href: string) {
  if (!href) return;
  const el = ensureTag<HTMLLinkElement>(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.rel = rel;
      return l;
    },
  );
  el.href = href;
}
