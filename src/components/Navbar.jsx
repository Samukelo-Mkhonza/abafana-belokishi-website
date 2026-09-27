import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../data/site';
import { asset } from '../lib/asset';
import { scrollToHash } from '../lib/scroll';

export default function Navbar({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const go = (e, href) => {
    setMenuOpen(false);
    scrollToHash(e, href);
  };

  const logo = theme === 'dark' ? 'images/web/logo-dark.webp' : 'images/web/logo-light.webp';

  return (
    <header className={`site-header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="brand" onClick={(e) => go(e, '#top')}>
          <img src={asset(logo)} alt="" width="40" height="40" className="brand__logo" />
          <span className="brand__text">
            <span className="brand__name">Abafana Belokishi</span>
            <span className="brand__sub">Entertainment</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="site-nav">
          <ul className="site-nav__list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="site-nav__link"
                  aria-current={active === href ? 'true' : undefined}
                  onClick={(e) => go(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href="#contact" className="btn btn--primary btn--sm site-header__cta" onClick={(e) => go(e, '#contact')}>
            Book us
          </a>
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button
            type="button"
            className={`icon-btn menu-btn${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="menu-btn__bar" />
            <span className="menu-btn__bar" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="container">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="mobile-menu__link"
                    aria-current={active === href ? 'true' : undefined}
                    onClick={(e) => go(e, href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="btn btn--primary btn--block" onClick={(e) => go(e, '#contact')}>
                  Book an artist
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
