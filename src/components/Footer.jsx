import { MdEmail, MdPhone } from 'react-icons/md';
import PlatformIcon from './ui/PlatformIcon';
import { CONTACT, NAV_LINKS, SOCIALS, SITE_NAME } from '../data/site';
import { asset } from '../lib/asset';
import { scrollToHash } from '../lib/scroll';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img src={asset('images/web/logo-dark.webp')} alt="" width="48" height="48" loading="lazy" />
            <p className="site-footer__name">Abafana Belokishi</p>
            <p className="site-footer__tagline">Born from the township. Built for the world.</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="site-footer__heading">Explore</p>
            <ul className="site-footer__list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="site-footer__link" onClick={(e) => scrollToHash(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="site-footer__heading">Follow</p>
            <ul className="site-footer__list">
              {SOCIALS.map(({ platform, handle, href }) => (
                <li key={platform}>
                  <a href={href} className="site-footer__link" target="_blank" rel="noreferrer" aria-label={`${platform}: ${handle}`}>
                    <PlatformIcon platform={platform} /> {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="site-footer__heading">Contact</p>
            <ul className="site-footer__list">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="site-footer__link site-footer__link--wrap">
                  <MdEmail aria-hidden="true" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="site-footer__link">
                  <MdPhone aria-hidden="true" /> {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p>Harding, KwaZulu-Natal, South Africa</p>
        </div>
      </div>
    </footer>
  );
}
