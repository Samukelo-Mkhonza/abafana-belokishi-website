import { motion } from 'framer-motion';

export default function ArtistCard({ name, genre, initials, image, index = 0, onClick }) {
  return (
    <motion.article
      className="artist-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`View profile for ${name}`}
    >
      <div className="artist-card__frame">
        {image ? (
          <img src={image} alt={name} className="artist-card__img" />
        ) : (
          <div className="artist-card__placeholder" aria-hidden="true">
            {initials || name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="artist-card__name">{name}</h3>
      <span className="artist-card__genre">{genre}</span>
    </motion.article>
  );
}
