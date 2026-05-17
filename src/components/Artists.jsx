import { motion } from 'framer-motion';
import ArtistCard from './ArtistCard';

const ARTISTS = [
  { name: 'King Fergo', genre: 'Amapiano · Producer', initials: 'KF' },
  { name: 'Structure', genre: 'Amapiano · Vocalist', initials: 'ST' },
  { name: 'SAB', genre: 'Hip-Hop / R&B', initials: 'SAB' },
  { name: 'Assign', genre: 'Hip-Hop', initials: 'AS' },
];

export default function Artists() {
  return (
    <section id="artists" className="artists section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Artists
          </motion.h2>
          <div className="section-rule" aria-hidden="true" />
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 0 }}
          >
            Our Roster
          </motion.p>
        </div>

        <div className="artists__grid" role="list">
          {ARTISTS.map((artist, i) => (
            <ArtistCard key={artist.name} {...artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
