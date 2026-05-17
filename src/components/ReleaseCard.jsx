import { motion } from 'framer-motion';

export default function ReleaseCard({ title, artist, type, image, links = [], letter, index = 0 }) {
  const primaryLink = links[0];

  return (
    <motion.div
      className="release-card"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {primaryLink && (
        <a
          href={primaryLink.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Listen to ${title} on ${primaryLink.label}`}
          className="release-card__tap-target"
        />
      )}
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
