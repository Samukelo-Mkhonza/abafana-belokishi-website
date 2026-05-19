import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const isMobile = () => window.innerWidth <= 520;

export default function ReleaseModal({ release, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const link = release.links?.[0];
  const mobile = isMobile();

  const panelVariants = mobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { opacity: 0, y: 50, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 30, scale: 0.97 } };

  return (
    <motion.div
      className="release-modal__backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="release-modal__panel"
        {...panelVariants}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={release.title}
      >
        <button className="release-modal__close" onClick={onClose} aria-label="Close">
          <MdClose />
        </button>

        <div className="release-modal__inner">
          <div className="release-modal__artwork">
            {release.image
              ? <img src={release.image} alt={release.title} />
              : <span className="release-modal__artwork-letter">{release.title.charAt(0)}</span>
            }
          </div>

          <div className="release-modal__info">
            <span className="release-modal__type">{release.type}</span>
            <h2 className="release-modal__title">{release.title}</h2>
            <span className="release-modal__artist">{release.artist}</span>

            {release.description && (
              <p className="release-modal__desc">{release.description}</p>
            )}

            {link && (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="release-modal__spotify-btn"
              >
                <FaSpotify />
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
