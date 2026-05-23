import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const NAV = ['About', 'Artists', 'Releases', 'Podcast', 'Contact'];
const SOCIALS = [
  { icon: <FaInstagram />, label: 'Instagram', handle: '@abafana_belokishi_ent', href: '#' },
  { icon: <FaFacebook />, label: 'Facebook', handle: 'Abafana Belokishi Ent', href: '#' },
  { icon: <FaYoutube />, label: 'YouTube', handle: '@abafanabelokishipodcast', href: 'https://www.youtube.com/@abafanabelokishipodcast' },
  { icon: <FaSpotify />, label: 'Spotify', handle: 'Abafana Belokishi', href: 'https://open.spotify.com/playlist/5CXMGVu3rg045oaaYQAR6k' },
  { icon: <FaTiktok />, label: 'TikTok', handle: '@abafanabelokishipodcast', href: 'https://www.tiktok.com/@abafanabelokishipodcast' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scroll = (id) => (e) => {
    e.preventDefault();
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <img
              src="/images/ab-new-logo.JPG"
              alt="Abafana Belokishi"
              className="footer__brand-logo"
            />
            <div className="footer__brand-name">ABAFANA BELOKISHI</div>
            <div className="footer__brand-sub">Entertainment</div>
            <p className="footer__tagline">
              Born from the township.<br />Built for the world.
            </p>
          </div>

          <div>
            <p className="footer__col-title">Navigate</p>
            <nav className="footer__links" aria-label="Footer navigation">
              {NAV.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="footer__link"
                  onClick={scroll(item)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="footer__col-title">Connect</p>
            <div className="footer__socials">
              {SOCIALS.map(({ icon, label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  className="footer__social"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label}: ${handle}`}
                >
                  <span className="footer__social-icon" aria-hidden="true">{icon}</span>
                  <span>{handle}</span>
                </a>
              ))}

              <a href="mailto:abafanabelokishipodcasters@gmail.com" className="footer__social">
                <span className="footer__social-icon" aria-hidden="true"><MdEmail /></span>
                <span>abafanabelokishipodcasters@gmail.com</span>
              </a>

              <a href="tel:+27625302863" className="footer__social">
                <span className="footer__social-icon" aria-hidden="true"><MdPhone /></span>
                <span>062 530 2863</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} Abafana Belokishi Entertainment. All rights reserved. KwaZulu-Natal, South Africa.
          </p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
