import { useState } from 'react';

export default function ReleaseCard({ title, artist, type, image, onOpen }) {
  const [broken, setBroken] = useState(false);
  const showImage = image && !broken;

  return (
    <button type="button" className="release-card" onClick={onOpen} aria-haspopup="dialog">
      <span className="release-card__cover">
        {showImage ? (
          <img src={image} alt="" width="300" height="300" loading="lazy" decoding="async" onError={() => setBroken(true)} />
        ) : (
          <span className="release-card__letter" aria-hidden="true">{title.charAt(0)}</span>
        )}
      </span>
      <span className="release-card__title">{title}</span>
      <span className="release-card__meta">
        {artist} <span aria-hidden="true">·</span> {type}
      </span>
    </button>
  );
}
