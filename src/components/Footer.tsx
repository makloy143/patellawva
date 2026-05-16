import { Link } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../lib/site';
import BrandMark from './BrandMark';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" to="/">
              <BrandMark size={36} flat />
              {SITE.firmName}
            </Link>
            <p className="footer-affiliation">{SITE.firmTag} · {SITE.city}</p>
            <p className="footer-tag">
              Trusted legal counsel for Fairfax and Northern Virginia — available 24/7,
              with no fee unless we win your injury case.
            </p>
            <p className="footer-disclaimer">
              This website is for informational purposes only and does not constitute legal
              advice. Prior results do not guarantee a similar outcome.
            </p>
          </div>

          <div className="footer">
            <h4>Explore</h4>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer">
            <h4>Practice</h4>
            <ul>
              <li><Link to="/practice#personal-injury">Personal Injury</Link></li>
              <li><Link to="/practice#criminal-defense">Criminal Defense</Link></li>
              <li><Link to="/practice#family-law">Divorce &amp; Family Law</Link></li>
              <li><Link to="/practice#civil-litigation">Civil Litigation</Link></li>
            </ul>
          </div>

          <div className="footer">
            <h4>Contact</h4>
            <ul>
              <li>{SITE.address}</li>
              <li>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a> · {SITE.availability}
              </li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {SITE.firmName}, Attorney at Law. All rights reserved.</span>
          <span>Licensed in the Commonwealth of Virginia.</span>
        </div>
      </div>
    </footer>
  );
}
