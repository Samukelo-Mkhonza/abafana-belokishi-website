import { FaSpotify } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';
import { ARTISTS } from '../data/artists';
import { FEATURED_RELEASE, RELEASES } from '../data/releases';
import { scrollToHash } from '../lib/scroll';
import { isArtistLink } from '../lib/asset';

// A phone shows each face about 90px wide, so it gets a 180px copy of the photo.
const xs = (thumb) => thumb.replace('-sm.webp', '-xs.webp');

// The ticker repeats its list once so the loop has no visible seam.
const TICKER = RELEASES.map((r) => r.title);

export default function Hero() {
  const latest = FEATURED_RELEASE;
  const spotify = latest.links.find((l) => l.label === 'Spotify');

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__head">
        <p className="hero__masthead">
          <span>Abafana Belokishi Entertainment</span>
          <span>Harding, KZN</span>
        </p>

        {/* The headline is the LCP element, so it renders without any animation. */}
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">
            Born from <span className="hero__muted">the</span> township<span className="hero__stop">.</span>
          </span>{' '}
          <span className="hero__line">
            Built for <span className="hero__muted">the</span> world<span className="hero__stop">.</span>
          </span>
        </h1>
      </div>

      <ul className="hero__lineup" aria-label="The artists">
        {ARTISTS.map((a) => (
          <li key={a.slug} className="hero__face">
            <img
              src={a.thumb}
              srcSet={`${xs(a.thumb)} 180w, ${a.thumb} 360w, ${a.image} 720w`}
              sizes="(max-width: 860px) 25vw, 320px"
              alt={a.name}
              width="360"
              height="360"
              // The headline is what the visitor reads first; the photos must not
              // compete with the script for a slow connection.
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />
            <p className="hero__face-name" aria-hidden="true">{a.name}</p>
          </li>
        ))}
      </ul>

      <div className="container hero__inner hero__inner--foot">
        <div className="hero__pitch">
          <p className="hero__lede">
            Amapiano and hip-hop from King Fergo, Structure, SAB and Assign, and a
            podcast about music and kasi life.
          </p>
          <div className="hero__ctas">
            <a href="#releases" className="btn btn--primary" onClick={(e) => scrollToHash(e, '#releases')}>
              Hear the music
            </a>
            <a href="#artists" className="btn btn--ghost" onClick={(e) => scrollToHash(e, '#artists')}>
              Meet the artists
            </a>
          </div>
        </div>

        <aside className="hero__sleeve" aria-label="Latest release">
          <img
            className="hero__sleeve-cover"
            src={latest.image}
            alt={`${latest.title} cover art`}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
          />
          <div className="hero__sleeve-text">
            <p className="hero__sleeve-kicker">
              <span className="hero__sleeve-now">Out now</span> {latest.type}
            </p>
            <p className="hero__sleeve-title">{latest.title}</p>
            <p className="hero__sleeve-artist">{latest.artist}</p>
            {spotify && (
              <a
                href={spotify.href}
                target="_blank"
                rel="noreferrer"
                className="hero__sleeve-link"
                aria-label={isArtistLink(spotify.href) ? `${latest.artist} on Spotify` : `Listen to ${latest.title} on Spotify`}
              >
                <FaSpotify aria-hidden="true" /> Listen on Spotify <MdArrowOutward aria-hidden="true" />
              </a>
            )}
          </div>
        </aside>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((n) => (
            <ul key={n} className="ticker__list">
              {TICKER.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
