import { useEffect, useRef } from 'react';
import { FaSpotify, FaYoutube } from 'react-icons/fa';
import Modal from './ui/Modal';
import Embed from './ui/Embed';
import { spotifyEmbed } from '../lib/embeds';
import { largeCover } from '../lib/asset';
import { RELEASES, YT_PLAYLIST_URL } from '../data/releases';

// How many other releases by the same artist the sleeve offers.
const MORE_COUNT = 3;

export default function ReleaseModal({ release, onClose, onSelect }) {
  const link = release.links?.[0];
  const isYouTube = link?.label === 'YouTube';
  const player = !isYouTube && link ? spotifyEmbed(link.href) : null;
  // RELEASES is newest first, so these are the artist's most recent other records.
  const more = onSelect
    ? RELEASES.filter((r) => r.artist === release.artist && r !== release).slice(0, MORE_COUNT)
    : [];

  // Picking another record swaps the sleeve in place: start it from the top, and
  // keep focus in the dialog now that the button that was pressed is gone.
  const headRef = useRef(null);
  const shown = useRef(release);
  useEffect(() => {
    if (shown.current === release) return;
    shown.current = release;
    const panel = headRef.current?.closest('.modal__panel');
    if (!panel) return;
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
  }, [release]);

  return (
    <Modal label={release.title} onClose={onClose} className="sleeve">
      {/* The cover runs to the edges of the sheet, like the front of a record sleeve. */}
      <header ref={headRef} className="sleeve__head">
        <img
          className="sleeve__cover"
          src={release.image}
          srcSet={`${release.image} 300w, ${largeCover(release.image)} 640w`}
          sizes="(max-width: 560px) 100vw, 300px"
          alt={`${release.title} cover art`}
          width="640"
          height="640"
        />
        <div className="sleeve__intro">
          <p className="sleeve__type">{release.type}</p>
          {/* A long title is set smaller so it sits beside the cover without outgrowing it. */}
          <h2 className={`sleeve__title ${release.title.length > 18 ? 'sleeve__title--long' : ''}`}>{release.title}</h2>
          <p className="sleeve__artist">{release.artist}</p>
          <div className="sleeve__actions">
            {link && !isYouTube && (
              <a href={link.href} target="_blank" rel="noreferrer" className="btn btn--spotify btn--sm">
                <FaSpotify aria-hidden="true" /> Open in Spotify
              </a>
            )}
            <a href={isYouTube ? link.href : YT_PLAYLIST_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
              <FaYoutube aria-hidden="true" /> {isYouTube ? 'Open playlist' : 'Watch on YouTube'}
            </a>
          </div>
        </div>
      </header>

      <div className="sleeve__body">
        {release.description && <p className="sleeve__desc">{release.description}</p>}

        {(player || (isYouTube && release.embedSrc)) && (
          <section className="sleeve__section" aria-label="Player">
            <h3 className="sleeve__heading">Listen</h3>
            {player && (
              <Embed key={player.src} compact src={player.src} height={player.height} title={`${release.title} on Spotify`} provider="Spotify" />
            )}
            {isYouTube && release.embedSrc && (
              <Embed key={release.embedSrc} src={release.embedSrc} ratio="16 / 9" title={`${release.title} on YouTube`} provider="YouTube" poster={release.image} />
            )}
          </section>
        )}

        {more.length > 0 && (
          <section className="sleeve__section" aria-label={`More from ${release.artist}`}>
            <h3 className="sleeve__heading">More from {release.artist}</h3>
            <ul>
              {more.map((r) => (
                <li key={r.title}>
                  <button type="button" className="sleeve__more" onClick={() => onSelect(r)}>
                    <img src={r.image} alt="" width="56" height="56" loading="lazy" decoding="async" />
                    <span className="sleeve__more-title">{r.title}</span>
                    <span className="sleeve__more-type">{r.type}</span>
                    <span className="sleeve__more-arrow" aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Modal>
  );
}
