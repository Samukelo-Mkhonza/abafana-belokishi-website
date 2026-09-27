import Modal from './ui/Modal';
import Embed from './ui/Embed';
import PlatformIcon from './ui/PlatformIcon';
import { spotifyEmbed, soundcloudEmbed } from '../lib/embeds';

export default function ArtistModal({ artist, onClose }) {
  const socials = (artist.socials ?? []).filter((s) => s.href && s.href !== '#');
  const spotify = socials.find((s) => s.platform === 'Spotify');
  const soundcloud = socials.find((s) => s.platform === 'SoundCloud');
  const player = spotify ? spotifyEmbed(spotify.href) : null;
  const scPlayer = !player && soundcloud ? soundcloudEmbed(soundcloud.href) : null;

  return (
    <Modal label={artist.name} onClose={onClose} className="profile">
      <div className="profile__head">
        <img className="profile__photo" src={artist.image} alt={artist.name} width="720" height="720" />
        <div className="profile__intro">
          <p className="eyebrow">{artist.genre}</p>
          <h2 className="profile__name">{artist.name}</h2>
          {socials.length > 0 && (
            <ul className="chip-list" aria-label={`${artist.name} online`}>
              {socials.map(({ platform, href, handle }) => (
                <li key={platform}>
                  <a className="chip" href={href} target="_blank" rel="noreferrer" aria-label={`${artist.name} on ${platform} (${handle})`}>
                    <PlatformIcon platform={platform} />
                    <span>{platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {artist.bio && <p className="profile__bio">{artist.bio}</p>}

      {player && <Embed src={player.src} height={player.height} title={`${artist.name} on Spotify`} provider="Spotify" />}
      {scPlayer && <Embed src={scPlayer.src} height={scPlayer.height} title={`${artist.name} on SoundCloud`} provider="SoundCloud" />}
    </Modal>
  );
}
