import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FaInstagram, FaSpotify, FaTiktok, FaYoutube, FaFacebook, FaSoundcloud } from 'react-icons/fa';

const ICON_MAP = {
  Instagram:  <FaInstagram />,
  Spotify:    <FaSpotify />,
  TikTok:     <FaTiktok />,
  YouTube:    <FaYoutube />,
  Facebook:   <FaFacebook />,
  SoundCloud: <FaSoundcloud />,
};

const isMobile = () => window.innerWidth <= 520;

function spotifyEmbed(href) {
  try {
    const parts = new URL(href).pathname.split('/').filter(Boolean);
    const type = parts[0];
    const id = parts[1];
    if (!id) return null;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
  } catch {
    return null;
  }
}

function soundcloudEmbed(href) {
  try {
    new URL(href);
    return (
      'https://w.soundcloud.com/player/?url=' +
      encodeURIComponent(href) +
      '&color=%23ff5500&auto_play=false&hide_related=false' +
      '&show_comments=false&show_user=true&show_reposts=false&show_teaser=false'
    );
  } catch {
    return null;
  }
}

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

  const spotifySocial    = artist.socials?.find(s => s.platform === 'Spotify');
  const soundcloudSocial = artist.socials?.find(s => s.platform === 'SoundCloud');
  const spotifyEmbedSrc    = spotifySocial    ? spotifyEmbed(spotifySocial.href)       : null;
  const soundcloudEmbedSrc = soundcloudSocial ? soundcloudEmbed(soundcloudSocial.href) : null;

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

        {(spotifyEmbedSrc || soundcloudEmbedSrc) && (
          <div className="artist-modal__embed">
            {spotifyEmbedSrc && (
              <iframe
                title={`${artist.name} on Spotify`}
                src={spotifyEmbedSrc}
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            )}
            {soundcloudEmbedSrc && (
              <iframe
                title={`${artist.name} on SoundCloud`}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={soundcloudEmbedSrc}
                loading="lazy"
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
