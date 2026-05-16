import { motion } from 'framer-motion';
import ReleaseCard from './ReleaseCard';

const RELEASES = [
  {
    title: 'Township Chronicles',
    type: 'EP · 2024',
    links: [{ label: 'Spotify', href: '#' }, { label: 'Apple Music', href: '#' }],
  },
  {
    title: 'Izwi Lethu',
    type: 'Single · 2024',
    links: [{ label: 'Spotify', href: '#' }, { label: 'YouTube', href: '#' }],
  },
  {
    title: 'Siyabonga Mix',
    type: 'Mixtape · 2023',
    links: [{ label: 'SoundCloud', href: '#' }, { label: 'Apple Music', href: '#' }],
  },
  {
    title: 'Amandla',
    type: 'Single · 2023',
    links: [{ label: 'Spotify', href: '#' }, { label: 'Boomplay', href: '#' }],
  },
  {
    title: 'Ekhaya',
    type: 'Album · 2022',
    links: [{ label: 'Spotify', href: '#' }, { label: 'Apple Music', href: '#' }],
  },
  {
    title: 'Indlela',
    type: 'Single · 2022',
    links: [{ label: 'YouTube', href: '#' }, { label: 'Boomplay', href: '#' }],
  },
];

export default function Releases() {
  return (
    <section id="releases" className="releases section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Releases
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
            Latest Music
          </motion.p>
        </div>

        <div className="releases__grid">
          {RELEASES.map((release, i) => (
            <ReleaseCard key={release.title} {...release} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
