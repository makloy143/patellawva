import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export default function Contact() {
  usePageMeta({
    title: `Contact | ${SITE.firmName}, Esq. — Fairfax, VA Attorney`,
    description:
      `Contact ${SITE.firmName}, Esq. for a free, confidential consultation — available 24/7. Located at ${SITE.address}. ${SITE.phoneDisplay}.`,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setShowSuccess(true);
    form.reset();
    window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    window.setTimeout(() => setShowSuccess(false), 6000);
  }

  return (
    <>
      <section className="hero hero--sub">
        <div className="container-x">
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="sep" aria-hidden="true">/</span>
                <span aria-current="page">Contact</span>
              </nav>
              <p className="eyebrow">Free Consultation · {SITE.availability}</p>
              <h1>
                Tell us what happened — <span className="accent">we&apos;ll take it from there</span>.
              </h1>
              <p className="hero-lead">
                Share a few details about your situation and Bhavik will be in touch — anytime, day
                or night. There&apos;s no fee, no pressure and no obligation. For injury cases, you pay
                nothing unless he wins.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container-x">
          <div className="contact-grid">
            <Reveal>
              <p className="eyebrow">How To Reach Us</p>
              <h2 className="section-title">Multiple ways to get in touch.</h2>
              <p>
                Phone is fastest for urgent matters — the line is answered 24/7. For everything
                else, the form below is the easiest way to share the facts of your case privately.
              </p>

              <div className="contact-info-card">
                <div className="row">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <span className="info-label">Office</span>
                    <span className="info-value">
                      {SITE.firmName}, {SITE.firmTag}<br />
                      10500 Sager Ave, Suite F<br />
                      Fairfax, VA 22030
                    </span>
                  </div>
                </div>
                <div className="row">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <div>
                    <span className="info-label">Phone</span>
                    <span className="info-value">
                      <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
                      <br />
                      <small>{SITE.availability} · Free Consultation</small>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
                  </div>
                </div>
                <div className="row">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <div>
                    <span className="info-label">Availability</span>
                    <span className="info-value"><strong>24 hours · 7 days a week</strong><br />Office visits welcome by appointment</span>
                  </div>
                </div>
                <div className="row">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 3 7v5c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <span className="info-label">Fees</span>
                    <span className="info-value">Free, confidential consultation<br />Injury cases: <strong>no fee unless I win</strong></span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="form" className="contact-form" onSubmit={onSubmit} noValidate>
              <div className={`form-success${showSuccess ? ' is-visible' : ''}`} role="status" aria-live="polite">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span><strong>Thank you.</strong> Your request was received — we&apos;ll be in touch shortly.</span>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="firstName">First name <span className="req">*</span></label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jane" required />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last name <span className="req">*</span></label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Doe" required />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email <span className="req">*</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone <span className="req">*</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(703) 555-0123" required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="matter">Matter type</label>
                <select id="matter" name="matter" defaultValue="">
                  <option value="">Choose a practice area…</option>
                  <option>Personal Injury</option>
                  <option>Criminal Defense</option>
                  <option>Divorce &amp; Family Law</option>
                  <option>Civil Litigation</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Tell us what happened</label>
                <textarea id="message" name="message" rows={5} placeholder="A brief summary helps us prepare for our first call. No sensitive details required." />
              </div>

              <button type="submit" className="btn btn--gold btn--lg">
                Submit Request
                <span className="arrow" aria-hidden="true">→</span>
              </button>

              <p className="form-disclaimer">
                Submitting this form does not create an attorney-client relationship. Please do not
                include confidential or time-sensitive information.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--mist section--tight">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Visit The Office</p>
            <h2 className="section-title">In the heart of historic Fairfax.</h2>
          </Reveal>
          <Reveal className="map-card">
            <iframe
              title="Map of office location at 10500 Sager Ave, Fairfax, VA"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=10500+Sager+Ave,+Fairfax,+VA+22030&output=embed"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
