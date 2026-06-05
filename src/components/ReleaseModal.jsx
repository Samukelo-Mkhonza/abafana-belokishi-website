import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const YT_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLky-eQTbtiYxoX_693z9MR9F8vFYExSZQ';

const isMobile = () => window.innerWidth <= 520;

function spotifyEmbed(href) {
  try {
    const parts = new URL(href).pathname.split('/').filter(Boolean);
    const type = parts[0]; // artist | album | track
    const id = parts[1];
    if (!id) return null;
    return {
      src: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`,
      height: type === 'album' ? 352 : 152,
    };
  } catch {
    return null;
  }
}

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
  const isYouTube = link?.label === 'YouTube';
  const embed = isYouTube ? null : (link ? spotifyEmbed(link.href) : null);
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

            {link && !isYouTube && (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="release-modal__spotify-btn"
              >
                <FaSpotify />
                Open in Spotify
              </a>
            )}
            <a
              href={YT_PLAYLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="release-modal__yt-btn"
            >
              <FaYoutube />
              {isYouTube ? 'Open Playlist' : 'Watch on YouTube'}
            </a>
          </div>
        </div>

        {embed && (
          <div className="release-modal__embed">
            <div className="stream__section-divider">
              <span>Music</span>
            </div>
            <iframe
              title={`${release.title} on Spotify`}
              src={embed.src}
              height={embed.height}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        {isYouTube && release.embedSrc && (
          <div className="release-modal__embed">
            <div className="stream__section-divider">
              <span>YouTube</span>
            </div>
            <iframe
              title="Abafana Belokishi on YouTube"
              src={release.embedSrc}
              width="100%"
              height="340"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
