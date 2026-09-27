import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { FEATURED_RELEASE } from '../data/releases';

const storageKey = `ab-seen-release:${FEATURED_RELEASE.title}`;

function alreadySeen() {
  try {
    return localStorage.getItem(storageKey) === '1';
  } catch {
    return false;
  }
}

// A non-blocking corner card rather than a full-screen modal: it announces the
// latest drop once per release without getting in the way of the page.
export default function NewReleasePopup() {
  const [visible, setVisible] = useState(false);
  const latest = FEATURED_RELEASE;
  const spotify = latest.links.find((l) => l.label === 'Spotify');

  useEffect(() => {
    if (alreadySeen()) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => e.key === 'Escape' && dismiss();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, '1');
    } catch {
      // Storage can be blocked; the card simply shows again next visit.
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="toast"
          role="dialog"
          aria-label="New release"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="toast__cover"
            src={latest.image}
            alt=""
            width="72"
            height="72"
            onError={(e) => { e.currentTarget.hidden = true; }}
          />
          <div className="toast__body">
            <p className="toast__badge">New release · {latest.type}</p>
            <h2 className="toast__title">{latest.title}</h2>
            <p className="toast__artist">{latest.artist}</p>
            {spotify && (
              <a href={spotify.href} target="_blank" rel="noreferrer" className="btn btn--spotify btn--sm" onClick={dismiss}>
                <FaSpotify aria-hidden="true" /> Listen on Spotify
              </a>
            )}
          </div>
          <button type="button" className="icon-btn icon-btn--sm toast__close" onClick={dismiss} aria-label="Close">
            <MdClose aria-hidden="true" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
