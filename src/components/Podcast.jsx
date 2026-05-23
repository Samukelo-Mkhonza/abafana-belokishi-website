import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import Waveform from './Waveform';

const CHANNEL_URL = 'https://www.youtube.com/@abafanabelokishipodcast';

export default function Podcast() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id="podcast" className="podcast section">
      <div className="podcast__waveform-bg" aria-hidden="true">
        <Waveform className="waveform-svg" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <motion.h2
            className="section-title"
            style={{ color: '#f5f4f0' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Podcast
          </motion.h2>
          <div className="section-rule" aria-hidden="true" />
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 0, color: '#f5f4f0' }}
          >
            All Episodes
          </motion.p>
        </div>

        <motion.div
          className="podcast__preview"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {isLoading && (
            <div className="podcast__loading" aria-label="Video loading">
              <div className="podcast__loading-icon">
                <FaYoutube />
              </div>
              <p className="podcast__loading-text">Video loading</p>
              <div className="podcast__loading-bar" />
            </div>
          )}
          <iframe
            className="podcast__video"
            src="https://www.youtube.com/embed/3GND3LlMTq0?si=O8WADUIOcABYTZ_R&autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
          />
        </motion.div>

        <motion.div
          className="podcast__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="podcast__cta-desc">
            Real conversations about music, culture, and the journey of building something from the ground up. New episodes live on YouTube.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="podcast__cta-btn"
          >
            <FaYoutube />
            Watch on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
