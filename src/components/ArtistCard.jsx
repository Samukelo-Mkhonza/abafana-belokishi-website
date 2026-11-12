// One line of the roster, set like a name on a gig poster's bill: the name does
// the work, with the photo, genre and a way in to the profile beside it.
export default function ArtistCard({ index, name, genre, thumb, image, onOpen }) {
  return (
    <button type="button" className="bill__row" onClick={onOpen} aria-haspopup="dialog">
      <span className="bill__no" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className="bill__photo">
        <img
          src={thumb || image}
          srcSet={thumb && image ? `${thumb} 360w, ${image} 720w` : undefined}
          sizes="(min-width: 861px) 168px, 88px"
          alt=""
          width="360"
          height="360"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="bill__name">{name}</span>
      <span className="bill__genre">{genre}</span>
      <span className="bill__more">Profile <span aria-hidden="true">→</span></span>
    </button>
  );
}
