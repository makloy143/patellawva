import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE } from '../lib/site';
import {
  webPageSchema,
  caseResultsItemListSchema,
  reviewListSchema,
} from '../lib/schema';

type Item = { amount: string; desc: string; tag: string };

const RESULTS: Item[] = [
  { amount: '$600K', desc: 'Commercial loan settlement after multi-party dispute.', tag: 'Civil Litigation' },
  { amount: '$550K', desc: 'Recovery for client injured in a domestic abuse incident.', tag: 'Personal Injury' },
  { amount: '$350K', desc: 'Pedestrian / bicycle accident with contested liability.', tag: 'Personal Injury' },
  { amount: '$250K', desc: 'Pedestrian accident — pre-litigation settlement.', tag: 'Personal Injury' },
  { amount: '$160K', desc: 'Dog bite injury — premises liability recovery.', tag: 'Personal Injury' },
  { amount: 'Dismissed', desc: 'DUI charge dismissed before trial after suppression motion.', tag: 'Criminal Defense' },
  { amount: 'Reduced',   desc: 'Reckless driving reduced to a non-moving violation.', tag: 'Criminal Defense' },
  { amount: 'Custody',   desc: 'Primary physical custody secured for parent client.', tag: 'Family Law' },
];

function ResultAmount({ value }: { value: string }) {
  if (value.startsWith('$')) {
    return (
      <div className="result-amount">
        <span className="currency">$</span>{value.slice(1)}
      </div>
    );
  }
  return <div className="result-amount">{value}</div>;
}

const RESULTS_REVIEWS = [
  { body: 'From the very beginning, the service provided was the very best. They were easily accessible, got back to me quickly, aggressive and got me the results that I wanted. They maintained constant communication and assistance from the consultation all the way to the resolution.', authorName: 'Verified Client', rating: 5, reviewLocation: 'Fairfax, VA' },
  { body: 'Mr. Patel is a superb attorney. He was attentive, extremely knowledgeable and provided me with outstanding legal guidance when I needed it. I always felt that my needs were met and that he was personally invested in me and my case.', authorName: 'Verified Client', rating: 5, reviewLocation: 'Northern Virginia' },
];

export default function Results() {
  return (
    <>
      <Seo />
      <JsonLd
        id="results-webpage"
        data={webPageSchema({
          path: '/results',
          title: `Case Results | ${SITE.firmName}, Esq. — Fairfax Settlement & Verdict Attorney`,
          description: `Representative settlements and verdicts personally handled by ${SITE.firmName} — six-figure personal injury recoveries and criminal case dismissals across Northern Virginia.`,
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        id="results-itemlist"
        data={caseResultsItemListSchema(
          RESULTS.map((r) => ({
            amount: r.amount,
            description: r.desc,
            category: r.tag,
          })),
        )}
      />
      <JsonLd id="results-reviews" data={reviewListSchema(RESULTS_REVIEWS)} />

      <section className="hero hero--sub" aria-labelledby="results-hero-heading">
        <div className="container-x">
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <Breadcrumbs
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Results' },
                ]}
              />
              <p className="eyebrow">Case Results · {SITE.city}</p>
              <h1 id="results-hero-heading">
                Proven outcomes for <span className="accent">real people</span> across Northern Virginia.
              </h1>
              <p className="hero-lead">
                A selection of recent settlements and verdicts personally handled by Bhavik. Each
                case is unique; results depend on its specific facts, evidence and law. Prior
                outcomes do not guarantee a similar result in your matter.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container-x">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">By The Numbers</p>
            <h2 className="section-title">A track record built on careful preparation.</h2>
          </Reveal>

          <div className="stats">
            <Reveal as="article" className="stat">
              <div className="stat-value">20<span className="suffix">+</span></div>
              <p className="stat-label">Years of trial &amp; settlement experience</p>
            </Reveal>
            <Reveal as="article" className="stat">
              <div className="stat-value">500<span className="suffix">+</span></div>
              <p className="stat-label">Matters personally handled across four practice areas</p>
            </Reveal>
            <Reveal as="article" className="stat">
              <div className="stat-value">★★★★★</div>
              <p className="stat-label">Five-star client reviews and reputation</p>
            </Reveal>
            <Reveal as="article" className="stat">
              <div className="stat-value">0<span className="suffix">%</span></div>
              <p className="stat-label">Fee unless I win your injury case</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container-x">
          <Reveal className="section-head">
            <p className="eyebrow">Representative Results</p>
            <h2 className="section-title">Selected settlements &amp; verdicts.</h2>
            <p className="section-lead">
              A sampling from recent years across Bhavik&apos;s four practice areas — illustrative,
              not exhaustive. Names and identifying details are omitted to protect client privacy.
            </p>
          </Reveal>

          <div className="results-grid">
            {RESULTS.map((r) => (
              <Reveal key={r.amount + r.desc} as="article" className="result-card">
                <ResultAmount value={r.amount} />
                <p>{r.desc}</p>
                <span className="tag">{r.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container-x">
          <div className="quote-grid">
            <Reveal as="figure" className="quote">
              <p>
                From the very beginning, the service provided was the very best. They were easily
                accessible, got back to me quickly, aggressive and got me the results that I
                wanted. They maintained constant communication and assistance from the consultation
                all the way to the resolution.
              </p>
              <figcaption className="quote-author">
                <span className="quote-avatar" aria-hidden="true">★★</span>
                <div>
                  <strong>Five-Star Client Review</strong>
                  <span>Fairfax, VA · Personal Injury</span>
                </div>
              </figcaption>
            </Reveal>
            <Reveal as="figure" className="quote">
              <p>
                Mr. Patel is a superb attorney. He was attentive, extremely knowledgeable and
                provided me with outstanding legal guidance when I needed it. I always felt that my
                needs were met and that he was personally invested in me and my case.
              </p>
              <figcaption className="quote-author">
                <span className="quote-avatar" aria-hidden="true">★★</span>
                <div>
                  <strong>Five-Star Client Review</strong>
                  <span>Northern Virginia · Criminal Defense</span>
                </div>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory section--tight">
        <div className="container-x">
          <Reveal className="cta-banner">
            <div>
              <p className="eyebrow">Tell Us Your Story</p>
              <h2>Could a similar result be possible for you?</h2>
              <p>Every case is different — but a candid, no-cost consultation is often the fastest way to find out what&apos;s realistic for your situation.</p>
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
