export default function ArtistCard({ name, genre, thumb, image, onOpen }) {
  return (
    <button type="button" className="artist-card" onClick={onOpen} aria-haspopup="dialog">
      <span className="artist-card__media">
        <img
          src={thumb || image}
          srcSet={thumb && image ? `${thumb} 360w, ${image} 720w` : undefined}
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          alt=""
          width="360"
          height="360"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="artist-card__body">
        <span className="artist-card__name">{name}</span>
        <span className="artist-card__genre">{genre}</span>
        <span className="artist-card__more">View profile <span aria-hidden="true">→</span></span>
      </span>
    </button>
  );
}
