import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { images } from '../lib/images';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export default function Practice() {
  usePageMeta({
    title: `Practice Areas | ${SITE.firmName}, Fairfax Attorney`,
    description:
      `Practice areas of ${SITE.firmName}, Esq. — personal injury, criminal defense, divorce and family law, and civil litigation across Northern Virginia and Maryland.`,
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
                <span aria-current="page">Practice Areas</span>
              </nav>
              <p className="eyebrow">Areas of Practice</p>
              <h1>
                Focused legal experience across <span className="accent">four core areas</span>.
              </h1>
              <p className="hero-lead">
                Bhavik Patel concentrates his practice on the matters that most often shape lives
                — personal injury, criminal defense, family law and civil litigation — for clients
                throughout Northern Virginia and Maryland.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight section--paper">
        <div className="container-x">
          <Reveal className="practice-index">
            <a href="#personal-injury">Personal Injury</a>
            <a href="#criminal-defense">Criminal Defense</a>
            <a href="#family-law">Divorce &amp; Family Law</a>
            <a href="#civil-litigation">Civil &amp; Business Litigation</a>
          </Reveal>
        </div>
      </section>

      {/* Personal Injury */}
      <section className="section section--paper" id="personal-injury">
        <div className="container-x">
          <Reveal className="split split--text-first">
            <div>
              <p className="eyebrow">Practice · 01</p>
              <h2 className="section-title">Personal Injury</h2>
              <p>
                When someone else&apos;s negligence causes serious harm, the cost is rarely just
                medical. Bhavik pursues full and fair compensation — for the bills, the lost wages,
                the pain and the disruption that comes with it. Personal injury matters are
                handled on a contingency basis: <strong>no fee unless I win your case</strong>.
              </p>
              <ul className="card-list" style={{ marginBottom: '1.75rem' }}>
                <li>Free, confidential consultation — available 24/7</li>
                <li>Aggressive negotiation with insurers for maximum compensation</li>
                <li>Coordination with medical providers and economic-loss experts</li>
                <li>Trial-ready preparation that produces stronger settlements</li>
                <li>Bad-faith and underinsured / uninsured motorist disputes</li>
              </ul>
              <div className="subareas subareas--3" style={{ marginBottom: '1.75rem' }}>
                <div>
                  <h4>Motor Vehicle Accidents</h4>
                  <ul>
                    <li>Car &amp; truck accidents</li>
                    <li>Motorcycle &amp; bicycle accidents</li>
                    <li>Pedestrian &amp; ride-share claims</li>
                    <li>Distracted &amp; drunk driving</li>
                  </ul>
                </div>
                <div>
                  <h4>Premises &amp; Slip-and-Fall</h4>
                  <ul>
                    <li>Grocery store &amp; parking lot falls</li>
                    <li>Sidewalk &amp; stairwell hazards</li>
                    <li>Negligent security claims</li>
                    <li>Dog bite &amp; animal attacks</li>
                  </ul>
                </div>
                <div>
                  <h4>Catastrophic &amp; Wrongful Death</h4>
                  <ul>
                    <li>Traumatic brain &amp; spinal injuries</li>
                    <li>Severe burns &amp; amputation</li>
                    <li>Fatal collisions &amp; survival actions</li>
                    <li>Long-term loss-of-earnings claims</li>
                  </ul>
                </div>
              </div>
              <Link className="btn btn--ghost" to="/contact">
                Discuss Your Injury Case
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="split-media">
              <img src={images.practice.personalInjury} alt="Attorney consultation in a private office" />
              <span className="split-media-frame" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Criminal Defense */}
      <section className="section section--mist" id="criminal-defense">
        <div className="container-x">
          <Reveal className="split">
            <div className="split-media">
              <img src={images.practice.criminalDefense} alt="Courthouse exterior with classical architecture" />
              <span className="split-media-frame" aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Practice · 02</p>
              <h2 className="section-title">Criminal Defense</h2>
              <p>
                A criminal charge demands a calm, prepared response. Bhavik works through every
                detail — police reports, video, witness accounts — to build a defense that
                protects your record, your freedom and your future.
              </p>
              <ul className="card-list" style={{ marginBottom: '1.75rem' }}>
                <li>DUI &amp; DWI defense</li>
                <li>Reckless driving and traffic offenses</li>
                <li>Assault, theft &amp; property crimes</li>
                <li>Drug-related offenses</li>
                <li>Pretrial motions through jury trial</li>
              </ul>
              <Link className="btn btn--ghost" to="/contact">
                Discuss Your Defense
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Family Law */}
      <section className="section section--paper" id="family-law">
        <div className="container-x">
          <Reveal className="split split--text-first">
            <div>
              <p className="eyebrow">Practice · 03</p>
              <h2 className="section-title">Divorce &amp; Family Law</h2>
              <p>
                Family transitions are deeply personal. Bhavik pairs careful, discreet counsel with
                decisive advocacy — protecting your children, your finances and your future as you
                move forward.
              </p>
              <ul className="card-list" style={{ marginBottom: '1.75rem' }}>
                <li>Contested &amp; uncontested divorce</li>
                <li>Child custody, visitation &amp; support</li>
                <li>Spousal support &amp; equitable distribution</li>
                <li>Property &amp; asset division</li>
                <li>Post-decree modifications</li>
              </ul>
              <Link className="btn btn--ghost" to="/contact">
                Speak Confidentially
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="split-media">
              <img src={images.practice.familyLaw} alt="Private consultation between attorney and client" />
              <span className="split-media-frame" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Civil Litigation */}
      <section className="section section--mist" id="civil-litigation">
        <div className="container-x">
          <Reveal className="split">
            <div className="split-media">
              <img src={images.practice.civilLitigation} alt="Stacked legal volumes on a wooden desk" />
              <span className="split-media-frame" aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Practice · 04</p>
              <h2 className="section-title">Civil Litigation</h2>
              <p>
                Whether the dispute is over a contract, a commercial loan or a piece of property,
                Bhavik prepares every case as though it will be tried — which is often what
                produces the strongest settlement.
              </p>
              <ul className="card-list" style={{ marginBottom: '1.75rem' }}>
                <li>Breach of contract &amp; business disputes</li>
                <li>Commercial loan &amp; collection matters</li>
                <li>Real estate and property claims</li>
                <li>Business representation &amp; advisory</li>
                <li>Trial &amp; appellate representation</li>
              </ul>
              <Link className="btn btn--ghost" to="/contact">
                Review Your Dispute
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Frequently Asked</p>
            <h2 className="section-title">Questions clients often ask first.</h2>
          </Reveal>

          <Reveal className="faq">
            <details>
              <summary>How quickly will I hear back after reaching out?</summary>
              <p>Our office is available 24/7. You&apos;ll typically hear back within a few hours, and urgent matters are responded to immediately.</p>
            </details>
            <details>
              <summary>What should I bring to a first meeting?</summary>
              <p>Anything you have — police reports, photos, medical records, contracts, correspondence, insurance information. If you have nothing on hand, that&apos;s fine; we&apos;ll work from your account of events.</p>
            </details>
            <details>
              <summary>How are legal fees structured?</summary>
              <p>Personal injury matters are handled on a contingency basis — <strong>no fee unless I win your case</strong>. Other matters use flat or hourly rates, fully disclosed in writing before we begin.</p>
            </details>
            <details>
              <summary>Will Bhavik personally handle my case?</summary>
              <p>Yes. Unlike many firms that delegate client interaction to paralegals or administrative staff, your attorney is directly accessible to you on the substantive aspects of your matter.</p>
            </details>
            <details>
              <summary>Which jurisdictions do you cover?</summary>
              <p>Clients throughout Northern Virginia — Fairfax, Arlington, Loudoun, Prince William and Fauquier counties — and Maryland&apos;s Howard, Montgomery and Prince George&apos;s counties.</p>
            </details>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--paper section--tight">
        <div className="container-x">
          <Reveal className="cta-banner">
            <div>
              <p className="eyebrow">Free, Confidential Review · Available 24/7</p>
              <h2>Not sure where your matter fits?</h2>
              <p>Send the facts. Bhavik will tell you honestly whether he can help — and if it&apos;s outside his practice, he&apos;ll point you toward someone who can.</p>
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
