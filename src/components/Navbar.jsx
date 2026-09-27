import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { MdClose, MdPhone } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS, CONTACT, whatsappLink } from '../data/site';
import { asset } from '../lib/asset';
import { scrollToHash } from '../lib/scroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';

const DESKTOP_MIN = 901;

function MenuDrawer({ open, onClose, active, onNavigate }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open, onClose);
  useScrollLock(open);

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div key="drawer" className="drawer-root" initial="closed" animate="open" exit="closed">
          <m.div
            className="drawer-backdrop"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            id="mobile-menu"
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            variants={{ open: { x: 0 }, closed: { x: '100%' } }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer__head">
              <span className="drawer__title">Menu</span>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu" data-autofocus>
                <MdClose aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="drawer__nav">
              <ul>
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="drawer__link"
                      aria-current={active === href ? 'true' : undefined}
                      onClick={(e) => onNavigate(e, href)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="drawer__foot">
              <a href="#contact" className="btn btn--primary btn--block" onClick={(e) => onNavigate(e, '#contact')}>
                Book an artist
              </a>
              <div className="drawer__contact">
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn--whatsapp btn--sm">
                  <FaWhatsapp aria-hidden="true" /> WhatsApp
                </a>
                <a href={CONTACT.phoneHref} className="btn btn--ghost btn--sm">
                  <MdPhone aria-hidden="true" /> Call
                </a>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

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
    if (!menuOpen) return undefined;
    const onResize = () => window.innerWidth >= DESKTOP_MIN && setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const go = (e, href) => scrollToHash(e, href);

  // Close first so the scroll lock and focus trap are released, then scroll.
  const goFromMenu = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToHash(null, href));
  };

  const logo = theme === 'dark' ? 'images/web/logo-dark.webp' : 'images/web/logo-light.webp';

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
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
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            <span className="menu-btn__bar" />
            <span className="menu-btn__bar" />
          </button>
        </div>
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} active={active} onNavigate={goFromMenu} />
    </header>
  );
}
