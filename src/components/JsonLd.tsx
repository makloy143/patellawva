import { useEffect } from 'react';

type Props = {
  /** Stable id — used so re-renders update the same <script> tag. */
  id: string;
  /** Either a single schema.org node or an array of nodes (becomes @graph). */
  data: object | object[];
};

/**
 * Injects a `<script type="application/ld+json">` into the document
 * head. The script is idempotent — keyed by `id` so successive renders
 * replace rather than duplicate.
 *
 * Use one `<JsonLd id="page-..." data={...} />` per logical schema set
 * per page so individual blocks remain easy to audit in DevTools.
 */
export default function JsonLd({ id, data }: Props) {
  useEffect(() => {
    const elementId = `jsonld-${id}`;
    const json = JSON.stringify(data);

    let tag = document.getElementById(elementId) as HTMLScriptElement | null;
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = elementId;
      tag.setAttribute('data-seo', '');
      document.head.appendChild(tag);
    }
    if (tag.textContent !== json) {
      tag.textContent = json;
    }

    return () => {
      // We deliberately leave the tag in place across remounts so the
      // prerender capture keeps it. It will only be replaced (not
      // accumulated) thanks to the stable id.
    };
  }, [id, data]);

  return null;
}
