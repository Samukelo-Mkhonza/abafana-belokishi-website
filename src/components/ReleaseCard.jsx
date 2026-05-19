import { motion } from 'framer-motion';

export default function ReleaseCard({ title, artist, type, image, links = [], letter, index = 0, onClick }) {
  return (
    <motion.div
      className="release-card"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`View details for ${title}`}
    >
      <div className="release-card__artwork" aria-hidden="true">
        {image
          ? <img src={image} alt={title} loading="lazy" />
          : <span className="release-card__artwork-letter">{letter || title.charAt(0)}</span>
        }
      </div>
      <div className="release-card__overlay">
        <span className="release-card__type">{type}</span>
        <h3 className="release-card__title">{title}</h3>
        {artist && <span className="release-card__artist">{artist}</span>}
        <div className="release-card__links">
          {links.map(link => (
            <span key={link.label} className="release-card__link">
              {link.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
