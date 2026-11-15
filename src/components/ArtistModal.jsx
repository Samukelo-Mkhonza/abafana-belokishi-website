import { MdArrowOutward } from 'react-icons/md';
import Modal from './ui/Modal';
import Embed from './ui/Embed';
import PlatformIcon from './ui/PlatformIcon';
import { spotifyEmbed, soundcloudEmbed } from '../lib/embeds';
import { RELEASES } from '../data/releases';

// How many of the artist's newest releases the profile lists.
const LATEST_COUNT = 4;

export default function ArtistModal({ artist, onClose }) {
  const socials = (artist.socials ?? []).filter((s) => s.href && s.href !== '#');
  const spotify = socials.find((s) => s.platform === 'Spotify');
  const soundcloud = socials.find((s) => s.platform === 'SoundCloud');
  const player = spotify ? spotifyEmbed(spotify.href) : null;
  const scPlayer = !player && soundcloud ? soundcloudEmbed(soundcloud.href) : null;
  // A blank line in the data starts a new paragraph.
  const bio = (artist.bio ?? '').split(/\n\s*\n/).filter(Boolean);
  // RELEASES is newest first, so the head of the list is the latest work.
  const releases = RELEASES.filter((r) => r.artist === artist.name && r.links?.[0]?.href);
  const latest = releases.slice(0, LATEST_COUNT);

  return (
    <Modal label={artist.name} onClose={onClose} className="profile">
      {/* The photo runs edge to edge with the name set over it, like the hero line-up. */}
      <header className="profile__banner">
        <img className="profile__photo" src={artist.image} alt="" width="720" height="720" />
        <div className="profile__title">
          <p className="profile__genre">{artist.genre}</p>
          <h2 className="profile__name">{artist.name}</h2>
        </div>
      </header>

      <div className="profile__body">
        {bio.length > 0 && (
          <div className="profile__bio">
            {bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        )}

        {socials.length > 0 && (
          <section className="profile__section" aria-label={`${artist.name} online`}>
            <h3 className="profile__heading">Follow</h3>
            <ul className="profile__links">
              {socials.map(({ platform, href, handle }) => (
                <li key={platform}>
                  <a className="profile__link" href={href} target="_blank" rel="noreferrer" aria-label={`${artist.name} on ${platform} (${handle})`}>
                    <PlatformIcon platform={platform} className="profile__link-icon" />
                    <span className="profile__link-text">
                      <span className="profile__link-platform">{platform}</span>
                      <span className="profile__link-handle">{handle}</span>
                    </span>
                    <MdArrowOutward aria-hidden="true" className="profile__link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {latest.length > 0 && (
          <section className="profile__section" aria-label={`Latest releases by ${artist.name}`}>
            <h3 className="profile__heading">
              Latest releases
              {releases.length > latest.length && <span className="profile__count">{releases.length} on the label</span>}
            </h3>
            <ul className="profile__releases">
              {latest.map((r) => {
                const link = r.links[0];
                return (
                  <li key={r.title}>
                    <a className="profile__release" href={link.href} target="_blank" rel="noreferrer" aria-label={`${r.title}, ${r.type}, on ${link.label}`}>
                      <img src={r.image} alt="" width="56" height="56" loading="lazy" decoding="async" />
                      <span className="profile__release-title">{r.title}</span>
                      <span className="profile__release-type">{r.type}</span>
                      <MdArrowOutward aria-hidden="true" className="profile__link-arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {(player || scPlayer) && (
          <section className="profile__section" aria-label="Player">
            <h3 className="profile__heading">Listen</h3>
            {player && <Embed compact src={player.src} height={player.height} title={`${artist.name} on Spotify`} provider="Spotify" />}
            {scPlayer && <Embed compact src={scPlayer.src} height={scPlayer.height} title={`${artist.name} on SoundCloud`} provider="SoundCloud" />}
          </section>
        )}
      </div>
    </Modal>
  );
}
