/**
 * Single source of truth for brand and contact constants used across
 * every page and component.
 */

export const SITE = {
  firmName: 'Bhavik D. Patel',
  firmTag: 'Attorney at Law',
  address: '10500 Sager Ave, Suite F, Fairfax, VA 22030',
  email: 'contact@patellawva.com',
  phoneDisplay: '(703) 844-4519',
  phoneTel: '7038444519',
  availability: 'Available 24/7',
  city: 'Fairfax, VA',
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
