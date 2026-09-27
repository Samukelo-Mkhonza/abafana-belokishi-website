import { m } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import Waveform from './Waveform';
import { FEATURED_RELEASE } from '../data/releases';
import { scrollToHash } from '../lib/scroll';
import { largeCover } from '../lib/asset';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const latest = FEATURED_RELEASE;
  const spotify = latest.links.find((l) => l.label === 'Spotify');

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <m.p className="eyebrow" {...fadeUp(0.05)}>
            Record label and podcast · Harding, KZN
          </m.p>

          {/* Headline and lede render without a fade: they are the LCP element. */}
          <h1 id="hero-title" className="hero__title">
            Born from <span className="hero__muted">the</span> township.
            <br />
            Built for <span className="hero__muted">the</span> world.
          </h1>

          <p className="hero__lede">
            Amapiano and hip-hop from King Fergo, Structure, SAB and Assign, and a
            podcast about music and kasi life.
          </p>

          <m.div className="hero__ctas" {...fadeUp(0.35)}>
            <a href="#releases" className="btn btn--primary" onClick={(e) => scrollToHash(e, '#releases')}>
              Hear the music
            </a>
            <a href="#artists" className="btn btn--ghost" onClick={(e) => scrollToHash(e, '#artists')}>
              Meet the artists
            </a>
          </m.div>
        </div>

        <m.aside className="hero__feature" aria-label="Latest release" {...fadeUp(0.3)}>
          <div className="hero__cover">
            <img
              src={largeCover(latest.image)}
              srcSet={`${latest.image} 300w, ${largeCover(latest.image)} 640w`}
              sizes="(max-width: 480px) 96px, 360px"
              alt={`${latest.title} cover art`}
              width="640"
              height="640"
            />
            <span className="badge badge--accent hero__badge">Out now</span>
          </div>
          <div className="hero__feature-meta">
            <div>
              <p className="hero__feature-type">{latest.type}</p>
              <p className="hero__feature-title">{latest.title}</p>
              <p className="hero__feature-artist">{latest.artist}</p>
            </div>
            {spotify && (
              <a
                href={spotify.href}
                target="_blank"
                rel="noreferrer"
                className="icon-btn icon-btn--spotify"
                aria-label={`Listen to ${latest.title} on Spotify`}
              >
                <FaSpotify aria-hidden="true" />
              </a>
            )}
          </div>
        </m.aside>
      </div>

      <div className="hero__waveform" aria-hidden="true">
        <Waveform />
      </div>
    </section>
  );
}
