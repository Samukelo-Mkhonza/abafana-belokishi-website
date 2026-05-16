import { motion } from 'framer-motion';

export default function ReleaseCard({ title, type, year, links = [], letter, index = 0 }) {
  return (
    <motion.div
      className="release-card"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="release-card__artwork" aria-hidden="true">
        {letter || title.charAt(0)}
      </div>
      <div className="release-card__overlay">
        <span className="release-card__type">{type}</span>
        <h3 className="release-card__title">{title}</h3>
        <div className="release-card__links">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="release-card__link"
              target="_blank"
              rel="noreferrer"
              aria-label={`Listen to ${title} on ${link.label}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
