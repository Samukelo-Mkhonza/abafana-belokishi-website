import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FaInstagram, FaSpotify, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

const ICON_MAP = {
  Instagram: <FaInstagram />,
  Spotify:   <FaSpotify />,
  TikTok:    <FaTiktok />,
  YouTube:   <FaYoutube />,
  Facebook:  <FaFacebook />,
};

const isMobile = () => window.innerWidth <= 520;

export default function ArtistModal({ artist, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const mobile = isMobile();
  const panelVariants = mobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { opacity: 0, y: 50, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 30, scale: 0.97 } };

  return (
    <motion.div
      className="artist-modal__backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="artist-modal__panel"
        {...panelVariants}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={artist.name}
      >
        <button className="artist-modal__close" onClick={onClose} aria-label="Close">
          <MdClose />
        </button>

        <div className="artist-modal__inner">
          {/* Left — avatar panel */}
          <div className="artist-modal__avatar-panel">
            <div className="artist-modal__avatar">
              {artist.image
                ? <img src={artist.image} alt={artist.name} />
                : <span>{artist.initials || artist.name.charAt(0)}</span>
              }
            </div>
          </div>

          {/* Right — info */}
          <div className="artist-modal__info">
            <span className="artist-modal__genre">{artist.genre}</span>
            <h2 className="artist-modal__name">{artist.name}</h2>
            <div className="artist-modal__divider" aria-hidden="true" />

            {artist.bio && (
              <p className="artist-modal__bio">{artist.bio}</p>
            )}

            {artist.socials?.length > 0 && (
              <div className="artist-modal__socials">
                {artist.socials.map(({ platform, href, handle }) => (
                  href !== '#'
                    ? (
                      <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="artist-modal__social-link"
                        aria-label={`${artist.name} on ${platform}`}
                      >
                        <span className="artist-modal__social-icon" aria-hidden="true">
                          {ICON_MAP[platform]}
                        </span>
                        <span className="artist-modal__social-handle">{handle}</span>
                      </a>
                    ) : (
                      <div key={platform} className="artist-modal__social-link artist-modal__social-link--placeholder">
                        <span className="artist-modal__social-icon" aria-hidden="true">
                          {ICON_MAP[platform]}
                        </span>
                        <span className="artist-modal__social-handle">{handle}</span>
                      </div>
                    )
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
