import { FaSpotify, FaYoutube } from 'react-icons/fa';
import Modal from './ui/Modal';
import Embed from './ui/Embed';
import { spotifyEmbed } from '../lib/embeds';
import { YT_PLAYLIST_URL } from '../data/releases';

export default function ReleaseModal({ release, onClose }) {
  const link = release.links?.[0];
  const isYouTube = link?.label === 'YouTube';
  const player = !isYouTube && link ? spotifyEmbed(link.href) : null;

  return (
    <Modal label={release.title} onClose={onClose} className="release-detail">
      <div className="release-detail__head">
        <img className="release-detail__cover" src={release.image} alt={`${release.title} cover art`} width="300" height="300" />
        <div>
          <p className="eyebrow">{release.type}</p>
          <h2 className="release-detail__title">{release.title}</h2>
          <p className="release-detail__artist">{release.artist}</p>
          <div className="btn-row">
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
      </div>

      {release.description && <p className="release-detail__desc">{release.description}</p>}

      {player && <Embed src={player.src} height={player.height} title={`${release.title} on Spotify`} provider="Spotify" />}
      {isYouTube && release.embedSrc && (
        <Embed src={release.embedSrc} ratio="16 / 9" title={`${release.title} on YouTube`} provider="YouTube" poster={release.image} />
      )}
    </Modal>
  );
}
