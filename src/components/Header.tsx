import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../lib/site';
import BrandMark from './BrandMark';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="top-bar">
        <div className="container-x top-bar-inner">
          <span className="top-bar-availability">
            <span className="pulse" aria-hidden="true" />
            Free Consultation · {SITE.availability}
          </span>
          <a className="top-bar-tel" href={`tel:${SITE.phoneTel}`}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top">
        <div className="container-x header-inner">
          <Link className="brand" to="/" aria-label={`${SITE.firmName} — Home`}>
            <BrandMark size={48} />
            <span className="brand-text">
              <span className="brand-name">{SITE.firmName}</span>
              <span className="brand-tag">{SITE.firmTag}</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-tel" href={`tel:${SITE.phoneTel}`} aria-label={`Call ${SITE.phoneDisplay}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
              </svg>
              {SITE.phoneDisplay}
            </a>
            <Link className="btn btn--gold header-cta" to="/contact">
              Free Consultation
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className={`nav-toggle${open ? ' is-open' : ''}`}
              aria-controls="mobileDrawer"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`mobile-drawer${open ? ' is-open' : ''}`} id="mobileDrawer" aria-hidden={!open}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="btn btn--gold" to="/contact" onClick={() => setOpen(false)}>
            Free Consultation
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <a className="mobile-drawer-tel" href={`tel:${SITE.phoneTel}`} onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
            </svg>
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </header>
    </>
  );
}
