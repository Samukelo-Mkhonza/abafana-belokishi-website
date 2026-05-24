import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Artists', href: '#artists' },
  { label: 'Releases', href: '#releases' },
  { label: 'Stream', href: '#soundcloud' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="container">
          <div className="navbar__inner">
            <a href="#hero" className="navbar__logo" onClick={e => handleLink(e, '#hero')}>
              <img
                src={scrolled && theme !== 'dark' ? '/images/ab-new-logo.JPG' : '/images/dark-mode-ab-logo.png'}
                alt="Abafana Belokishi"
                className="navbar__logo-img"
              />
              <div>
                <span className="navbar__logo-text">ABAFANA BELOKISHI</span>
                <span className="navbar__logo-sub">Entertainment</span>
              </div>
            </a>

            <div className="navbar__links" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`navbar__link${activeSection === label.toLowerCase() ? ' active' : ''}`}
                  role="listitem"
                  onClick={e => handleLink(e, href)}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="navbar__right">
              <ThemeToggle theme={theme} onToggle={onToggle} />
              <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span className="hamburger__bar" />
                <span className="hamburger__bar" />
                <span className="hamburger__bar" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`navbar__link${activeSection === label.toLowerCase() ? ' active' : ''}`}
                onClick={e => handleLink(e, href)}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
