import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import JsonLd from './JsonLd';
import {
  organizationSchema,
  attorneySchema,
  legalServiceSchema,
  websiteSchema,
} from '../lib/schema';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="page-shell">
      {/* WCAG: visible-on-focus skip link for keyboard / screen-reader users. */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />

      {/* Site-wide structured data — present on every page so Google
          can build the LegalService / Attorney / Organization graph. */}
      <JsonLd id="organization" data={organizationSchema()} />
      <JsonLd id="attorney" data={attorneySchema()} />
      <JsonLd id="legal-service" data={legalServiceSchema()} />
      <JsonLd id="website" data={websiteSchema()} />
    </div>
  );
}
