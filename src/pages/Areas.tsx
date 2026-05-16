import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

const VA_COUNTIES: Array<{ name: string; cities: string[] }> = [
  { name: 'Fairfax County', cities: ['Alexandria', 'Annandale', 'Centreville', 'Chantilly', 'Fairfax', 'Herndon', 'McLean', 'Reston', 'Springfield', 'Tysons Corner', 'Vienna'] },
  { name: 'Arlington County', cities: ['Ballston', 'Clarendon'] },
  { name: 'Loudoun County', cities: ['Ashburn', 'Dulles', 'Leesburg', 'South Riding', 'Sterling'] },
  { name: 'Prince William County', cities: ['Dale City', 'Manassas'] },
  { name: 'Fauquier County', cities: ['Warrenton'] },
];

const MD_COUNTIES: Array<{ name: string; cities: string[] }> = [
  { name: 'Montgomery County', cities: ['Bethesda', 'Chevy Chase', 'Gaithersburg', 'Germantown', 'Potomac', 'Rockville', 'Silver Spring', 'Wheaton'] },
  { name: 'Howard County', cities: ['Columbia', 'Ellicott City'] },
  { name: "Prince George's County", cities: ['Upper Marlboro'] },
];

export default function Areas() {
  usePageMeta({
    title: `Areas Served | ${SITE.firmName}, Esq. — Fairfax, VA Attorney`,
    description:
      `${SITE.firmName}, Esq. represents clients throughout Northern Virginia and Maryland — including Fairfax, Arlington, Loudoun, Prince William, Fauquier, Howard, Montgomery and Prince George's counties.`,
  });

  return (
    <>
      <section className="hero hero--sub">
        <div className="container-x">
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="sep" aria-hidden="true">/</span>
                <span aria-current="page">Areas Served</span>
              </nav>
              <p className="eyebrow">Areas Served · {SITE.city}</p>
              <h1>
                Representing clients across <span className="accent">Northern Virginia &amp; Maryland</span>.
              </h1>
              <p className="hero-lead">
                From the office in historic Fairfax, Bhavik serves communities throughout the DMV —
                Fairfax, Arlington, Loudoun, Prince William and Fauquier counties in Virginia, and
                Howard, Montgomery and Prince George&apos;s counties in Maryland.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="virginia">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Virginia</p>
            <h2 className="section-title">Northern Virginia communities we serve.</h2>
            <p className="section-lead">
              Comprehensive representation across Northern Virginia — including local courts in
              Fairfax, Arlington, Loudoun, Prince William and Fauquier counties.
            </p>
          </Reveal>

          <Reveal className="county-grid">
            {VA_COUNTIES.map((c) => (
              <article key={c.name} className="county-card">
                <h3>{c.name}</h3>
                <ul>{c.cities.map((city) => <li key={city}>{city}</li>)}</ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--mist" id="maryland">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Maryland</p>
            <h2 className="section-title">Maryland communities we serve.</h2>
            <p className="section-lead">
              Representation across Maryland&apos;s most populous counties — from Howard and Montgomery
              to Prince George&apos;s — for residents and visitors injured in the DMV region.
            </p>
          </Reveal>

          <Reveal className="county-grid">
            {MD_COUNTIES.map((c) => (
              <article key={c.name} className="county-card">
                <h3>{c.name}</h3>
                <ul>{c.cities.map((city) => <li key={city}>{city}</li>)}</ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">How Bhavik Can Help</p>
            <h2 className="section-title">Matters he handles across these jurisdictions.</h2>
            <p className="section-lead">
              Wherever you&apos;re located in the DMV, the practice areas are the same — and the
              approach is consistent: prepared, client-centered representation.
            </p>
          </Reveal>

          <div className="cards cards--2">
            {[
              { t: 'Personal Injury', d: 'Auto, truck, motorcycle and pedestrian collisions; slip-and-fall and premises liability; catastrophic injuries and wrongful death.', href: '/practice#personal-injury' },
              { t: 'Criminal Defense', d: 'DUI, reckless driving, assault, theft and drug-related matters in Virginia state and federal courts.', href: '/practice#criminal-defense' },
              { t: 'Divorce & Family Law', d: 'Contested and uncontested divorce, custody, support, equitable distribution and post-decree modifications.', href: '/practice#family-law' },
              { t: 'Civil Litigation', d: 'Contract, commercial loan, property and business disputes — prepared like a trial, often resolved at settlement.', href: '/practice#civil-litigation' },
            ].map((c) => (
              <Reveal key={c.t} as="article" className="card">
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <Link className="card-link" to={c.href}>
                  Learn more <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper section--tight">
        <div className="container-x">
          <Reveal className="cta-banner">
            <div>
              <p className="eyebrow">Don&apos;t See Your City? · Available 24/7</p>
              <h2>We likely still serve your area.</h2>
              <p>The list above isn&apos;t exhaustive — these are our most-frequent jurisdictions. Reach out for a free, confidential review and we&apos;ll confirm we can help.</p>
            </div>
            <div className="cta-banner-actions">
              <Link className="btn btn--gold btn--lg" to="/contact">
                Request a Consultation
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <a className="btn btn--ghost-light" href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
