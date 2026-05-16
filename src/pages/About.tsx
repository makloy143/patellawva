import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { images } from '../lib/images';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export default function About() {
  usePageMeta({
    title: `About | ${SITE.firmName}, Esq. — Fairfax, VA Attorney`,
    description:
      `${SITE.firmName}, Esq. — a Fairfax, VA attorney practicing personal injury, criminal defense, family law and civil litigation across Northern Virginia and Maryland.`,
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
                <span aria-current="page">About</span>
              </nav>
              <p className="eyebrow">Attorney Profile · {SITE.city}</p>
              <h1>
                Meet <span className="accent">{SITE.firmName}, Esq.</span>
              </h1>
              <p className="hero-lead">
                Two decades of focused legal practice, an even temperament under pressure, and a
                belief that the best outcomes come from preparation and respect for every client.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="section section--paper">
        <div className="container-x">
          <Reveal className="split">
            <div className="split-media">
              <img src={images.attorney.portrait} alt={`Portrait of attorney ${SITE.firmName}`} />
              <span className="split-media-frame" aria-hidden="true" />
              <div className="split-media-badge">
                <span className="num">★★★★★</span>
                <span className="lbl">Five-star client reviews across Northern Virginia</span>
              </div>
            </div>

            <div>
              <p className="eyebrow">Background</p>
              <h2 className="section-title">A practice grounded in care and craft.</h2>
              <p>
                Bhavik began his career with the conviction that good lawyering is, above all, good
                listening. Twenty years on, that conviction still shapes how he runs his practice —
                and how he treats each client who walks through the door.
              </p>
              <p>
                His practice spans personal injury, criminal defense, family law and civil
                litigation. Whatever the matter, the approach is consistent: understand the goal,
                weigh the evidence honestly, and pursue the result with steady, well-prepared
                advocacy.
              </p>
              <p>
                Bhavik works directly with each client — there is no army of paralegals between you
                and your attorney. When you call, he answers. When the strategy needs rethinking,
                he is the one rethinking it.
              </p>
              <Link className="btn btn--ghost" to="/contact">
                Schedule a Conversation
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* I Am / I Offer */}
      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Why Clients Hire Us</p>
            <h2 className="section-title">A team that treats your case like it matters — because it does.</h2>
            <p className="section-lead">
              Choosing the right legal counsel can make all the difference when facing the
              life-altering consequences of an injury, a charge or a family transition. Here is
              what to expect from working with Bhavik.
            </p>
          </Reveal>

          <div className="creds" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal as="article" className="cred">
              <h3>I Am…</h3>
              <ul>
                <li><strong>Client-Centered</strong> — a well-rounded approach that considers your mental, physical and emotional well-being.</li>
                <li><strong>Experienced</strong> — two decades of trial and settlement work across four practice areas.</li>
                <li><strong>Results-Driven</strong> — substantial compensation collected through settlements and verdicts.</li>
                <li><strong>Highly-Rated</strong> — five-star client reviews attest to my dedication.</li>
                <li><strong>A Proven Litigator</strong> — courtroom experience to challenge resourceful opponents.</li>
              </ul>
            </Reveal>
            <Reveal as="article" className="cred">
              <h3>I Offer…</h3>
              <ul>
                <li><strong>Complimentary Consultations</strong> — your initial case review is always free.</li>
                <li><strong>Contingency-Based Fees</strong> — for injury cases, you pay nothing unless I win.</li>
                <li><strong>Aggressive Representation</strong> — relentless negotiation for maximum compensation.</li>
                <li><strong>Direct Attorney Access</strong> — no paralegal layer between you and your lawyer.</li>
                <li><strong>Trusted Network</strong> — coordination with medical, accident-reconstruction and financial experts.</li>
                <li><strong>Compassionate Service</strong> — a genuine desire to guide people through difficult periods.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="section section--paper">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">What You Can Expect</p>
            <h2 className="section-title">From first call to resolution — a clear, considered path.</h2>
            <p className="section-lead">
              A personal injury — or any serious legal matter — is more than a dispute. It&apos;s a
              life-changing event with physical, emotional and financial dimensions. The approach
              here is built around that reality.
            </p>
          </Reveal>

          <div className="cards cards--3">
            {[
              { n: '01', t: 'Tailored Legal Strategies', d: 'No two cases or clients are alike. Strategy is crafted specifically to the unique circumstances of your case and your individual needs.' },
              { n: '02', t: 'Holistic Legal Counseling', d: 'Lawyers do more than give legal advice. Bhavik advises on all the parts of your life affected by your case — financial planning, emotional support, the long view.' },
              { n: '03', t: 'Direct Attorney Access', d: 'Unlike many practices that delegate client interaction to paralegals or administrative staff, your attorney is directly accessible to you.' },
              { n: '04', t: 'Proactive Communication', d: 'Keeping you informed about case developments, options and potential outcomes — clear, regular updates that reduce stress and confusion.' },
              { n: '05', t: 'Trial Readiness', d: 'Settling out of court is often preferable, but some cases demand the rigor of a trial. Every case is prepared as though it will be tried — which produces the strongest settlements.' },
              { n: '06', t: 'Compassionate Advocacy', d: 'From the moment you entrust Bhavik with your case, he steps into the roles of legal advocate and ally — uncompromising representation, every step of the way.' },
            ].map((v) => (
              <Reveal key={v.n} as="article" className="value">
                <span className="value-num">{v.n}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section section--mist">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Personal Philosophy</p>
            <h2 className="section-title">Three principles that guide every case.</h2>
          </Reveal>
          <div className="cards cards--3">
            {[
              { n: '01', t: 'Listen First', d: 'No two cases — and no two clients — are the same. Strategy follows from a careful, unhurried understanding of what happened and what matters to you.' },
              { n: '02', t: 'Prepare Relentlessly', d: 'Good outcomes come from doing the work — reading every record, interviewing every witness, anticipating every question.' },
              { n: '03', t: 'Communicate Clearly', d: 'Legal jargon should never sit between you and the decisions in your own case. Expect plain language and honest assessments.' },
            ].map((v) => (
              <Reveal key={v.n} as="article" className="value">
                <span className="value-num">{v.n}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section section--paper">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Credentials</p>
            <h2 className="section-title">Admissions, education &amp; memberships.</h2>
          </Reveal>

          <div className="creds">
            <Reveal as="article" className="cred">
              <h3>Education</h3>
              <ul>
                <li>University of Virginia School of Law, J.D.</li>
                <li>The College of William &amp; Mary, B.A.</li>
              </ul>
            </Reveal>
            <Reveal as="article" className="cred">
              <h3>Admissions</h3>
              <ul>
                <li>Virginia State Bar</li>
                <li>U.S. District Court, Eastern District of Virginia</li>
                <li>U.S. Court of Appeals, Fourth Circuit</li>
              </ul>
            </Reveal>
            <Reveal as="article" className="cred">
              <h3>Memberships</h3>
              <ul>
                <li>American Bar Association</li>
                <li>Virginia Bar Association</li>
                <li>Fairfax County Bar Association</li>
                <li>Virginia Trial Lawyers Association</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--ivory section--tight">
        <div className="container-x">
          <Reveal className="cta-banner">
            <div>
              <p className="eyebrow">Get In Touch · Available 24/7</p>
              <h2>Have a matter you&apos;d like to discuss?</h2>
              <p>Reach out for a free, confidential consultation. We&apos;ll listen carefully and tell you honestly how we can help.</p>
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
