import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import { SITE } from '../lib/site';

export default function NotFound() {
  usePageMeta({
    title: `Page not found | ${SITE.firmName}, Esq.`,
    description: 'The page you were looking for could not be found.',
  });

  return (
    <section className="hero">
      <div className="container-x" style={{ textAlign: 'center', maxWidth: 640 }}>
        <p className="eyebrow">404</p>
        <h1>This page wandered off.</h1>
        <p className="hero-lead" style={{ marginInline: 'auto' }}>
          The page you were looking for could not be found. Try the homepage, or get in touch and
          we&apos;ll help you find what you need.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="btn btn--gold btn--lg" to="/">
            Back to Home
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/contact">
            Contact Bhavik
          </Link>
        </div>
      </div>
    </section>
  );
}
