import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const LATEST = {
  title: 'ECHOES OF TOMORROW',
  artist: 'SAB',
  type: 'Single · 2026',
  image: 'https://i.scdn.co/image/ab67616d00001e022560559e20b1319460228b53',
  spotifyHref: 'https://open.spotify.com/album/1TVLfIlPfcs3g73lcZB85U',
  embedSrc: 'https://open.spotify.com/embed/album/1TVLfIlPfcs3g73lcZB85U?utm_source=generator',
};

const SESSION_KEY = 'ab_new_release_seen_v1';

export default function NewReleasePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nrp__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={dismiss}
        >
          <motion.div
            className="nrp__card"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="New release"
          >
            {/* Header */}
            <div className="nrp__header">
              <span className="nrp__badge">New Release</span>
              <button className="nrp__close" onClick={dismiss} aria-label="Close">
                <MdClose />
              </button>
            </div>

            {/* Artwork + info */}
            <div className="nrp__inner">
              <div className="nrp__artwork">
                <img src={LATEST.image} alt={LATEST.title} />
              </div>
              <div className="nrp__info">
                <span className="nrp__type">{LATEST.type}</span>
                <h2 className="nrp__title">{LATEST.title}</h2>
                <span className="nrp__artist">{LATEST.artist}</span>
                <a
                  href={LATEST.spotifyHref}
                  target="_blank"
                  rel="noreferrer"
                  className="nrp__spotify-btn"
                  onClick={dismiss}
                >
                  <FaSpotify />
                  Listen on Spotify
                </a>
              </div>
            </div>

            {/* Embed */}
            <div className="nrp__embed">
              <iframe
                title={`${LATEST.title} on Spotify`}
                src={LATEST.embedSrc}
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
