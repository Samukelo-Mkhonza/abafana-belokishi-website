import { motion } from 'framer-motion';
import ArtistCard from './ArtistCard';

const ARTISTS = [
  { name: 'Senzo Mkhonza', genre: 'Amapiano', initials: 'SM' },
  { name: 'Langa Fire', genre: 'Hip-Hop / Rap', initials: 'LF' },
  { name: 'Sibongile Nkosi', genre: 'Afro-Soul', initials: 'SN' },
  { name: 'T-Flow Dlamini', genre: 'Gqom', initials: 'TD' },
  { name: 'DJ Mzansi', genre: 'House', initials: 'DM' },
  { name: 'Nomvula B', genre: 'R&B / Neo-Soul', initials: 'NB' },
  { name: 'Khulekani', genre: 'Maskandi', initials: 'KH' },
  { name: 'Young Stead', genre: 'Afro-Pop', initials: 'YS' },
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
