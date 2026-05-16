/*
 * Shared header + footer partials, mounted into each page to avoid
 * duplicating markup across the multi-page Vite setup.
 */

const NAV_ITEMS = [
  { href: 'index.html',    label: 'Home',         match: ['index.html', ''] },
  { href: 'practice.html', label: 'Practice',     match: ['practice.html'] },
  { href: 'about.html',    label: 'About',        match: ['about.html'] },
  { href: 'results.html',  label: 'Results',      match: ['results.html'] },
  { href: 'areas.html',    label: 'Areas Served', match: ['areas.html'] },
  { href: 'contact.html',  label: 'Contact',      match: ['contact.html'] },
];

const PHONE_DISPLAY = '(703) 844-4519';
const PHONE_TEL = '7038444519';
const FIRM_NAME = 'Bhavik D. Patel';
const FIRM_TAG = 'Attorney at Law';
const FIRM_ADDRESS = '10500 Sager Ave, Suite F, Fairfax, VA 22030';
const FIRM_EMAIL = 'contact@patellawva.com';
const AVAILABILITY = 'Available 24/7';

function currentPageKey() {
  const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  return path;
}

function isActive(item) {
  const key = currentPageKey();
  return item.match.includes(key);
}

function renderBrand() {
  return `
    <a class="brand" href="./index.html" aria-label="${FIRM_NAME} — Home">
      <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="bm-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0a1b33"/>
            <stop offset="100%" stop-color="#1c3a6a"/>
          </linearGradient>
          <linearGradient id="bm-g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d5b27e"/>
            <stop offset="100%" stop-color="#b8945f"/>
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#bm-g1)"/>
        <path d="M19 17h12.5c5 0 8.5 3 8.5 7.4 0 3.1-1.7 5.4-4.4 6.4 3.4.8 5.4 3.4 5.4 6.9 0 4.7-3.6 7.8-9 7.8H19V17Zm5.4 4.6v7.6h6.6c2.6 0 4.4-1.5 4.4-3.8 0-2.3-1.8-3.8-4.4-3.8h-6.6Zm0 12v7.6h7.4c2.8 0 4.6-1.5 4.6-3.8 0-2.3-1.8-3.8-4.6-3.8h-7.4Z" fill="url(#bm-g2)"/>
        <path d="M14 50h36" stroke="url(#bm-g2)" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>
      </svg>
      <span class="brand-text">
        <span class="brand-name">${FIRM_NAME}</span>
        <span class="brand-tag">${FIRM_TAG}</span>
      </span>
    </a>
  `;
}

function renderNav(extraClass = '') {
  return `
    <nav class="nav ${extraClass}" aria-label="Primary">
      ${NAV_ITEMS.map(
        (i) => `<a href="./${i.href}" class="${isActive(i) ? 'is-active' : ''}">${i.label}</a>`
      ).join('')}
    </nav>
  `;
}

function renderMobileDrawer() {
  return `
    <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
      ${NAV_ITEMS.map(
        (i) => `<a href="./${i.href}" class="${isActive(i) ? 'is-active' : ''}">${i.label}</a>`
      ).join('')}
      <a class="btn btn--gold" href="./contact.html">
        Free Consultation
        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `;
}

function renderTopBar() {
  return `
    <div class="top-bar">
      <div class="container top-bar-inner">
        <span class="top-bar-availability">
          <span class="pulse" aria-hidden="true"></span>
          Free Consultation · ${AVAILABILITY}
        </span>
        <a class="top-bar-tel" href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
      </div>
    </div>
  `;
}

function renderHeader() {
  return `
    ${renderTopBar()}
    <header class="site-header" id="top">
      <div class="container header-inner">
        ${renderBrand()}
        ${renderNav()}
        <div class="header-actions">
          <a class="header-tel" href="tel:${PHONE_TEL}" aria-label="Call ${PHONE_DISPLAY}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>
            </svg>
            ${PHONE_DISPLAY}
          </a>
          <a class="btn btn--gold header-cta" href="./contact.html">
            Free Consultation
            <span class="arrow" aria-hidden="true">→</span>
          </a>
          <button class="nav-toggle" type="button" id="navToggle" aria-controls="mobileDrawer" aria-expanded="false" aria-label="Toggle navigation">
            <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      ${renderMobileDrawer()}
    </header>
  `;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div>
            <a class="footer-brand" href="./index.html">
              <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" rx="14" fill="#0a1b33"/>
                <path d="M19 17h12.5c5 0 8.5 3 8.5 7.4 0 3.1-1.7 5.4-4.4 6.4 3.4.8 5.4 3.4 5.4 6.9 0 4.7-3.6 7.8-9 7.8H19V17Zm5.4 4.6v7.6h6.6c2.6 0 4.4-1.5 4.4-3.8 0-2.3-1.8-3.8-4.4-3.8h-6.6Zm0 12v7.6h7.4c2.8 0 4.6-1.5 4.6-3.8 0-2.3-1.8-3.8-4.6-3.8h-7.4Z" fill="#b8945f"/>
              </svg>
              ${FIRM_NAME}
            </a>
            <p class="footer-affiliation">${FIRM_TAG} · Fairfax, VA</p>
            <p class="footer-tag">Trusted legal counsel for Fairfax and Northern Virginia — available 24/7, with no fee unless we win your injury case.</p>
            <p class="footer-disclaimer">This website is for informational purposes only and does not constitute legal advice. Prior results do not guarantee a similar outcome.</p>
          </div>
          <div class="footer">
            <h4>Explore</h4>
            <ul>
              ${NAV_ITEMS.map((i) => `<li><a href="./${i.href}">${i.label}</a></li>`).join('')}
            </ul>
          </div>
          <div class="footer">
            <h4>Practice</h4>
            <ul>
              <li><a href="./practice.html#personal-injury">Personal Injury</a></li>
              <li><a href="./practice.html#criminal-defense">Criminal Defense</a></li>
              <li><a href="./practice.html#family-law">Divorce &amp; Family Law</a></li>
              <li><a href="./practice.html#civil-litigation">Civil Litigation</a></li>
            </ul>
          </div>
          <div class="footer">
            <h4>Contact</h4>
            <ul>
              <li>${FIRM_ADDRESS}</li>
              <li><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> · ${AVAILABILITY}</li>
              <li><a href="mailto:${FIRM_EMAIL}">${FIRM_EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} ${FIRM_NAME}, Attorney at Law. All rights reserved.</span>
          <span>Licensed in the Commonwealth of Virginia.</span>
        </div>
      </div>
    </footer>
  `;
}

export function mountHeader() {
  const slot = document.querySelector('[data-component="header"]');
  if (slot) slot.outerHTML = renderHeader();
}

export function mountFooter() {
  const slot = document.querySelector('[data-component="footer"]');
  if (slot) slot.outerHTML = renderFooter();
}

export function bindMobileNav() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggle || !drawer) return;

  const close = () => {
    toggle.classList.remove('is-open');
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
}

export function bindHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
