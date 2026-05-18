import { type FormEvent, type ReactNode, useState } from 'react';
import BrandMark from './BrandMark';
import { SITE } from '../lib/site';

const STORAGE_KEY = 'patellawva-site-unlock-v1';

function readStoredUnlock(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

type SiteGateProps = { children: ReactNode };

/** Optional full-site gate driven by `VITE_SITE_PASSWORD` (build-time env). Not a cryptographic lock. */
export default function SiteGate({ children }: SiteGateProps) {
  const expectedRaw = import.meta.env.VITE_SITE_PASSWORD;
  const expected = typeof expectedRaw === 'string' ? expectedRaw.trim() : '';
  const gateEnabled = expected.length > 0;

  const [unlocked, setUnlocked] = useState(() => !gateEnabled || readStoredUnlock());
  const [error, setError] = useState(false);

  if (!gateEnabled) return children;

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError(false);
    const pwd = new FormData(ev.currentTarget).get('password');
    const str = typeof pwd === 'string' ? pwd.trim() : '';
    if (str !== expected) {
      setError(true);
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* still allow view for this navigation if storage is blocked */
    }
    setUnlocked(true);
  }

  if (unlocked) return children;

  return (
    <div className="site-gate" role="dialog" aria-modal="true" aria-labelledby="site-gate-title">
      <div className="site-gate__panel">
        <div className="site-gate__brand">
          <BrandMark size={56} />
        </div>
        <p className="site-gate__eyebrow">Private preview</p>
        <h1 id="site-gate-title" className="site-gate__title">
          Enter the site passphrase
        </h1>
        <p className="site-gate__lead">
          This copy of the site is limited to invitees only. Wrong attempts stay on this screen.
          For urgent legal matters, call{' '}
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>.
        </p>

        <form className="site-gate__form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="site-gate-password">
            Passphrase
          </label>
          <input
            id="site-gate-password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={`site-gate__input${error ? ' site-gate__input--invalid' : ''}`}
            placeholder="Passphrase"
            aria-invalid={error}
            aria-describedby={error ? 'site-gate-error' : undefined}
            required
          />
          {error && (
            <p id="site-gate-error" className="site-gate__error" role="alert">
              Incorrect passphrase — try again.
            </p>
          )}
          <button type="submit" className="btn btn--gold site-gate__submit">
            View site
          </button>
        </form>

        <p className="site-gate__hint">
          Access is remembered for this browser tab until you close it.
        </p>
      </div>
    </div>
  );
}
