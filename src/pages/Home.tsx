import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import BrandMark from '../components/BrandMark';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { images } from '../lib/images';
import { SITE } from '../lib/site';
import {
  webPageSchema,
  faqPageSchema,
  reviewListSchema,
  serviceListSchema,
} from '../lib/schema';

const HOME_FAQS = [
  {
    question: 'Do you offer a free consultation?',
    answer:
      "Yes. The initial consultation is free, confidential and carries no obligation. We're available 24/7 — call (703) 844-4519 anytime.",
  },
  {
    question: 'Do you handle cases on contingency?',
    answer:
      'Yes. Personal injury matters are handled on a contingency basis — you pay nothing unless I win your case. Other matters use flat or hourly rates, disclosed in writing before we begin.',
  },
  {
    question: 'What areas do you practice in?',
    answer:
      'Personal injury (including motor-vehicle accidents, slip-and-fall and premises liability, and wrongful death), criminal defense, divorce and family law, and civil litigation.',
  },
  {
    question: 'Which jurisdictions do you cover?',
    answer:
      "Clients throughout Northern Virginia — Fairfax, Arlington, Loudoun, Prince William and Fauquier counties — and Maryland's Howard, Montgomery and Prince George's counties. I also appear in federal courts in the Eastern District of Virginia.",
  },
  {
    question: 'Will I work directly with Bhavik?',
    answer:
      "Yes. Unlike many firms that delegate client interaction to paralegals or administrative staff, you'll work directly with Bhavik on the substantive aspects of your case — including updates, questions and strategy.",
  },
];

const HOME_REVIEWS = [
  {
    body:
      'From the very beginning, the service provided was the very best. They were easily accessible, got back to me quickly, aggressive and got me the results that I wanted — they will make you rest easy in the knowledge you are represented by the best in the area.',
    authorName: 'Verified Client',
    rating: 5,
    reviewLocation: 'Northern Virginia',
  },
  {
    body:
      'Mr. Patel is a superb attorney. He was attentive, extremely knowledgeable and provided me with outstanding legal guidance when I needed it. I always felt that my needs were met and that he was personally invested in me and my case.',
    authorName: 'Verified Client',
    rating: 5,
    reviewLocation: 'Fairfax, VA',
  },
];

const HOME_SERVICES = [
  { name: 'Personal Injury', description: 'Securing fair compensation for victims of negligence — from auto collisions to slip-and-fall and beyond.', path: '/practice#personal-injury' },
  { name: 'Criminal Defense', description: 'Strategic, discreet defense across Northern Virginia for misdemeanors and felonies.', path: '/practice#criminal-defense' },
  { name: 'Divorce & Family Law', description: 'Compassionate, decisive guidance through separation, custody and property division.', path: '/practice#family-law' },
  { name: 'Civil Litigation', description: 'Effective representation in contract, property and commercial disputes.', path: '/practice#civil-litigation' },
];

export default function Home() {
  return (
    <>
      <Seo />
      <JsonLd
        id="home-webpage"
        data={webPageSchema({
          path: '/',
          title: `${SITE.firmName}, Esq. | Fairfax Personal Injury & Criminal Defense Attorney`,
          description:
            `Fairfax, VA attorney ${SITE.firmName}, Esq. — 20+ years handling personal injury, car accidents, criminal defense, family law and civil litigation across Northern Virginia and Maryland.`,
        })}
      />
      <JsonLd id="home-faq" data={faqPageSchema(HOME_FAQS)} />
      <JsonLd id="home-reviews" data={reviewListSchema(HOME_REVIEWS)} />
      <JsonLd id="home-services" data={serviceListSchema(HOME_SERVICES)} />

      {/* Hero */}
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="container-x">
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <p className="eyebrow">{SITE.firmName}, {SITE.firmTag} · {SITE.city}</p>
              <h1 id="home-hero-heading">
                Fairfax Personal Injury &amp; Criminal Defense Attorney —{' '}
                <span className="accent">here when the unexpected happens</span>.
              </h1>
              <p className="hero-lead">
                Focused, client-first representation in personal injury, criminal defense, family
                law and civil litigation — serving Fairfax, Arlington, Loudoun and all of Northern
                Virginia &amp; Maryland.
              </p>
              <div className="hero-actions">
                <Link className="btn btn--gold btn--lg" to="/contact">
                  Schedule a Free Consultation
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
                <a className="btn btn--ghost btn--lg" href={`tel:${SITE.phoneTel}`}>
                  Call {SITE.phoneDisplay}
                </a>
              </div>
              <div className="hero-trust">
                <span><strong>No Fee</strong> Unless We Win</span>
                <span className="dot" aria-hidden="true" />
                <span><strong>Available 24/7</strong></span>
                <span className="dot" aria-hidden="true" />
                <span><strong>Free</strong> Consultation</span>
              </div>
            </Reveal>

            <Reveal className="hero-visual">
              <div className="hero-portrait">
                <img
                  src={images.attorney.portrait}
                  alt={`Portrait of ${SITE.firmName}, Esq., a Fairfax personal injury and criminal defense attorney`}
                  width={1321}
                  height={1981}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="hero-badge hero-badge--accent">
                <div className="hero-badge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 3 7v5c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <strong>20+ Years of Practice</strong>
                  <span>Personal injury &amp; trial experience</span>
                </div>
              </div>
              <div className="hero-badge">
                <div className="hero-badge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M9 14.5 7 22l5-3 5 3-2-7.5" />
                  </svg>
                </div>
                <div>
                  <strong>★★★★★ Reviews</strong>
                  <span>Five-star client reputation</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Firm stats */}
      <section className="firm-stats">
        <div className="container-x firm-stats-grid">
          <Reveal className="firm-stat">
            <div className="firm-stat-value">20<span className="suffix">+</span></div>
            <div className="firm-stat-label">Years of Trial &amp; Settlement Experience</div>
          </Reveal>
          <Reveal className="firm-stat">
            <div className="firm-stat-value">500<span className="suffix">+</span></div>
            <div className="firm-stat-label">Matters Personally Handled</div>
          </Reveal>
          <Reveal className="firm-stat">
            <div className="firm-stat-value">24/7</div>
            <div className="firm-stat-label">Availability for Clients</div>
          </Reveal>
          <Reveal className="firm-stat">
            <div className="firm-stat-value">0<span className="suffix">%</span></div>
            <div className="firm-stat-label">Fee Unless I Win Your Injury Case</div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">What Sets Us Apart</p>
            <h2 className="section-title">A practice built around your outcome.</h2>
            <p className="section-lead">
              Every case begins with a careful listen. From there, the strategy is shaped to your
              priorities — and pursued with the full weight of two decades of trial and
              settlement experience.
            </p>
          </Reveal>

          <div className="cards cards--3">
            {[
              { n: '01', t: 'Client-Centered', d: 'We adopt a well-rounded approach that considers your mental, physical and emotional well-being — not just the legal proceedings.' },
              { n: '02', t: 'Award-Winning & Proven', d: 'A long-standing reputation for successful advocacy, with substantial settlements and verdicts collected for our clients.' },
              { n: '03', t: 'Direct Attorney Access', d: "I'm the one who answers your questions — a direct line of communication that's rarely found in today's law firms." },
              { n: '04', t: 'Aggressive Representation', d: 'Relentless negotiation for maximum compensation, with the courtroom experience to challenge even the most resourceful opponents.' },
              { n: '05', t: 'Contingency-Based Fees', d: 'For personal injury matters, you pay nothing unless I win your case. The initial case review is always free.' },
              { n: '06', t: 'Trusted Network', d: 'Coordination with medical professionals, accident-reconstruction experts and financial analysts to build the strongest possible case.' },
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

      {/* Practice areas */}
      <section className="section section--paper" id="practice">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Areas of Practice</p>
            <h2 className="section-title">Focused experience across four core disciplines.</h2>
            <p className="section-lead">
              Bhavik concentrates his practice in the four areas where most clients need a steady,
              experienced hand — personal injury, criminal defense, family law and civil
              litigation.
            </p>
          </Reveal>

          <div className="cards cards--2">
            <Reveal as="article" className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12.5 11 14.5 15 10.5" />
                  <path d="M21 12c0 5-4 9-9 10-5-1-9-5-9-10V5l9-3 9 3v7Z" />
                </svg>
              </div>
              <h3>Personal Injury</h3>
              <p>Securing fair compensation for victims of negligence — from auto collisions to slip-and-fall and beyond.</p>
              <ul className="card-list">
                <li>Car, truck &amp; motorcycle accidents</li>
                <li>Slip &amp; fall, premises liability</li>
                <li>Wrongful death &amp; catastrophic injury</li>
              </ul>
              <Link className="card-link" to="/practice#personal-injury">
                Learn more <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="article" className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-7-4-7-12V5l7-3 7 3v5c0 8-7 12-7 12Z" />
                  <path d="m9 11 2 2 4-4" />
                </svg>
              </div>
              <h3>Criminal Defense</h3>
              <p>Strategic, discreet defense across Northern Virginia for misdemeanors and felonies.</p>
              <ul className="card-list">
                <li>DUI &amp; reckless driving</li>
                <li>Assault, theft &amp; drug offenses</li>
                <li>Pretrial through jury trial</li>
              </ul>
              <Link className="card-link" to="/practice#criminal-defense">
                Learn more <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="article" className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="17" cy="8" r="3" />
                  <path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
                  <path d="M14 21v-1a5 5 0 0 1 5-5" />
                </svg>
              </div>
              <h3>Divorce &amp; Family Law</h3>
              <p>Compassionate, decisive guidance through separation, custody and property division.</p>
              <ul className="card-list">
                <li>Contested &amp; uncontested divorce</li>
                <li>Custody, visitation &amp; support</li>
                <li>Asset &amp; property division</li>
              </ul>
              <Link className="card-link" to="/practice#family-law">
                Learn more <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="article" className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3h6v6" />
                  <path d="M10 21H4v-6" />
                  <path d="M20 3 10 13" />
                  <path d="M4 21 14 11" />
                </svg>
              </div>
              <h3>Civil Litigation</h3>
              <p>Effective representation in contract, property and commercial disputes.</p>
              <ul className="card-list">
                <li>Contract &amp; business disputes</li>
                <li>Property &amp; real estate claims</li>
                <li>Commercial loan matters</li>
              </ul>
              <Link className="card-link" to="/practice#civil-litigation">
                Learn more <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section section--mist" id="about">
        <div className="container-x">
          <Reveal className="split">
            <div className="split-media">
              <img src={images.home.aboutLibrary} alt="Law books and a leather chair in a private library" />
              <span className="split-media-frame" aria-hidden="true" />
              <div className="split-media-badge">
                <span className="num">★★★★★</span>
                <span className="lbl">Five-star reviews across Northern Virginia clients</span>
              </div>
            </div>

            <div>
              <p className="eyebrow">Meet Your Attorney</p>
              <h2 className="section-title">Experienced advocacy. Personal attention.</h2>
              <p>
                {SITE.firmName}, Esq. is a Fairfax-based attorney with two decades of focused
                legal practice. He represents individuals, families and businesses across
                Northern Virginia and the wider DMV region.
              </p>
              <p>
                Bhavik takes a pragmatic, evidence-driven approach to every case and believes good
                outcomes follow from a careful, unhurried understanding of what happened and what
                matters to each client.
              </p>
              <Link className="btn btn--ghost" to="/about">
                Read Full Profile
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <div className="signature">
                <BrandMark size={48} flat />
                <div>
                  <div className="signature-name">{SITE.firmName}, Esq.</div>
                  <div className="signature-title">{SITE.firmTag} · {SITE.city}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case results */}
      <section className="section section--paper" id="results">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Representative Case Results</p>
            <h2 className="section-title">Outcomes that reflect the work behind them.</h2>
            <p className="section-lead">
              Sample settlements and verdicts personally handled by Bhavik. Every case is unique;
              prior results do not guarantee a future outcome.
            </p>
          </Reveal>

          <div className="results-grid results-grid--5">
            {[
              { amt: '600K', desc: 'Commercial loan settlement', tag: 'Civil Litigation' },
              { amt: '550K', desc: 'Domestic abuse injury recovery', tag: 'Personal Injury' },
              { amt: '350K', desc: 'Pedestrian / bicycle accident', tag: 'Personal Injury' },
              { amt: '250K', desc: 'Pedestrian injury settlement', tag: 'Personal Injury' },
              { amt: '160K', desc: 'Dog bite injury recovery', tag: 'Personal Injury' },
            ].map((r) => (
              <Reveal key={r.amt + r.desc} as="article" className="result-card">
                <div className="result-amount"><span className="currency">$</span>{r.amt}</div>
                <p>{r.desc}</p>
                <span className="tag">{r.tag}</span>
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link className="btn btn--ghost" to="/results">
              View All Results
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--navy">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">What You Can Expect</p>
            <h2 className="section-title">From first call to resolution — a clear, considered path.</h2>
          </Reveal>
          <div className="process">
            {[
              { t: 'Tailored Strategy', d: 'No two cases or clients are alike. Strategy is shaped to the unique circumstances of your case and your goals.' },
              { t: 'Holistic Counseling', d: 'Advice across all the parts of your life affected by your matter — not just the courtroom questions.' },
              { t: 'Proactive Communication', d: 'Clear updates on developments, options and potential outcomes — so the process never feels opaque.' },
              { t: 'Trial-Ready', d: 'Settlement is often preferable — but every case is prepared as though it will be tried, which is what produces the strongest offers.' },
            ].map((p) => (
              <Reveal key={p.t} as="article" className="process-step">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Areas preview */}
      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Areas We Serve</p>
            <h2 className="section-title">Representing clients across Northern Virginia &amp; Maryland.</h2>
            <p className="section-lead">
              From the office in Fairfax, I serve communities throughout the DMV — including
              Fairfax, Arlington, Loudoun, Prince William and Fauquier counties in Virginia, and
              Howard, Montgomery and Prince George&apos;s counties in Maryland.
            </p>
          </Reveal>

          <Reveal className="areas-preview">
            <div className="area-col">
              <h3>Virginia</h3>
              <ul>
                <li>Fairfax County · Alexandria, Annandale, Centreville, Chantilly, Fairfax, Herndon, McLean, Reston, Springfield, Tysons Corner, Vienna</li>
                <li>Arlington County · Ballston, Clarendon</li>
                <li>Loudoun County · Ashburn, Dulles, Leesburg, Sterling, South Riding</li>
                <li>Prince William County · Dale City, Manassas</li>
                <li>Fauquier County · Warrenton</li>
              </ul>
            </div>
            <div className="area-col">
              <h3>Maryland</h3>
              <ul>
                <li>Howard County · Columbia, Ellicott City</li>
                <li>Montgomery County · Bethesda, Chevy Chase, Gaithersburg, Germantown, Potomac, Rockville, Silver Spring, Wheaton</li>
                <li>Prince George&apos;s County · Upper Marlboro</li>
              </ul>
            </div>
          </Reveal>

          <div className="flex justify-center mt-10">
            <Link className="btn btn--ghost" to="/areas">
              See Full List of Areas Served
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--paper">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Client Voices</p>
            <h2 className="section-title">In the words of those we&apos;ve served.</h2>
          </Reveal>

          <div className="quote-grid">
            <Reveal as="figure" className="quote">
              <p>
                From the very beginning, the service provided was the very best. They were easily
                accessible, got back to me quickly, aggressive and got me the results that I wanted
                — they will make you rest easy in the knowledge you are represented by the best in
                the area.
              </p>
              <figcaption className="quote-author">
                <span className="quote-avatar" aria-hidden="true">★★</span>
                <div>
                  <strong>Five-Star Client Review</strong>
                  <span>Northern Virginia · Personal Injury</span>
                </div>
              </figcaption>
            </Reveal>

            <Reveal as="figure" className="quote">
              <p>
                Mr. Patel is a superb attorney. He was attentive, extremely knowledgeable and
                provided me with outstanding legal guidance when I needed it. I always felt that
                my needs were met and that he was personally invested in me and my case.
              </p>
              <figcaption className="quote-author">
                <span className="quote-avatar" aria-hidden="true">★★</span>
                <div>
                  <strong>Five-Star Client Review</strong>
                  <span>Fairfax, VA · Personal Injury</span>
                </div>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Frequently Asked</p>
            <h2 className="section-title">Answers to common questions.</h2>
          </Reveal>

          <Reveal className="faq">
            <details>
              <summary>Do you offer a free consultation?</summary>
              <p>Yes. The initial consultation is free, confidential and carries no obligation. We&apos;re available 24/7 — call {SITE.phoneDisplay} anytime.</p>
            </details>
            <details>
              <summary>Do you handle cases on contingency?</summary>
              <p>Yes. Personal injury matters are handled on a contingency basis — you pay nothing unless I win your case. Other matters use flat or hourly rates, disclosed in writing before we begin.</p>
            </details>
            <details>
              <summary>What areas do you practice in?</summary>
              <p>Personal injury (including motor-vehicle accidents, slip-and-fall and premises liability, and wrongful death), criminal defense, divorce and family law, and civil litigation.</p>
            </details>
            <details>
              <summary>Which jurisdictions do you cover?</summary>
              <p>Clients throughout Northern Virginia — Fairfax, Arlington, Loudoun, Prince William and Fauquier counties — and Maryland&apos;s Howard, Montgomery and Prince George&apos;s counties. I also appear in federal courts in the Eastern District of Virginia.</p>
            </details>
            <details>
              <summary>Will I work directly with Bhavik?</summary>
              <p>Yes. Unlike many firms that delegate client interaction to paralegals or administrative staff, you&apos;ll work directly with Bhavik on the substantive aspects of your case — including updates, questions and strategy.</p>
            </details>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--paper section--tight" id="contact">
        <div className="container-x">
          <Reveal className="cta-banner">
            <div>
              <p className="eyebrow">Your Road to Justice Starts Here</p>
              <h2>Speak with Bhavik Patel today.</h2>
              <p>
                Don&apos;t let your chance at justice slip away. Time is of the essence — especially
                when it comes to preserving evidence and protecting your rights. Free, confidential
                consultations, available 24/7.
              </p>
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
