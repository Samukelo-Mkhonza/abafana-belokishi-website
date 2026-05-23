import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSoundcloud, FaSpotify } from 'react-icons/fa';

const SC_PROFILE_URL = 'https://soundcloud.com/sabelomoloi07';
const SC_EMBED_SRC =
  'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/sabelomoloi07' +
  '&color=%23ff5500&auto_play=false&hide_related=false' +
  '&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';

const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P';
const SPOTIFY_EMBED_SRC = 'https://open.spotify.com/embed/artist/5bu8v4RFoGSEsGd30gyx1P?utm_source=generator&theme=0';

const TABS = [
  { id: 'soundcloud', label: 'SoundCloud', icon: FaSoundcloud },
  { id: 'spotify', label: 'Spotify', icon: FaSpotify },
];

export default function SoundCloud() {
  const [activeTab, setActiveTab] = useState('soundcloud');

  return (
    <section id="soundcloud" className="soundcloud section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Stream
          </motion.h2>
          <div className="section-rule" aria-hidden="true" />
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 0 }}
          >
            Listen Online
          </motion.p>
        </div>

        <motion.div
          className="stream__tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`stream__tab${activeTab === id ? ' stream__tab--active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="soundcloud__player"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'soundcloud' ? (
              <motion.div
                key="soundcloud"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  title="Abafana Belokishi on SoundCloud"
                  width="100%"
                  height="500"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={SC_EMBED_SRC}
                />
              </motion.div>
            ) : (
              <motion.div
                key="spotify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  title="King Fergo on Spotify"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  src={SPOTIFY_EMBED_SRC}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="soundcloud__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeTab === 'soundcloud' ? (
            <a
              href={SC_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="soundcloud__cta-btn"
            >
              <FaSoundcloud />
              Open on SoundCloud
            </a>
          ) : (
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="soundcloud__cta-btn soundcloud__cta-btn--spotify"
            >
              <FaSpotify />
              Open on Spotify
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
