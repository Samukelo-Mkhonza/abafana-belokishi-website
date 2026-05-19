import { motion } from 'framer-motion';
import ReleaseCard from './ReleaseCard';

const KING_FERGO_SPOTIFY = 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P';
const sp = { label: 'Spotify', href: KING_FERGO_SPOTIFY };

const dz = (hash) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/500x500-000000-80-0-0.jpg`;

const RELEASES = [
  // 2026
  {
    title: 'Gutara',
    artist: 'King Fergo',
    type: 'Single · 2026',
    image: dz('3155b0c5180c2fc4376f0f68650d3f13'),
    links: [sp],
  },
  // 2025
  {
    title: 'Paradise',
    artist: 'King Fergo',
    type: 'Album · 2025',
    image: dz('fef55077e7f493269dec148ce65778f0'),
    links: [sp],
  },
  // 2024
  {
    title: 'Paradise',
    artist: 'King Fergo',
    type: 'Single · 2024',
    image: dz('52e1d201f9d0c3544daa0a3b1e4b288c'),
    links: [sp],
  },
  // 2023
  {
    title: 'L E G E N D A R Y',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('92d378e2038debd5e494d0cb23391cea'),
    links: [sp],
  },
  {
    title: 'PIKIPIKI (Kasi Flavor)',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('a6b128ce93aeb9ea66463f06fa747310'),
    links: [sp],
  },
  {
    title: 'BACKSEAT',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('628e5cc9ac8986cd33872d5f5e77bb4c'),
    links: [sp],
  },
  {
    title: 'JMK',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('21cc1674a0127495da26f510182b11e7'),
    links: [sp],
  },
  {
    title: 'HELLO H. HELLO B. (Freestyle)',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('2da3d3dbc7761461a62d663aeec290b9'),
    links: [sp],
  },
  // 2022
  {
    title: 'Abafana Belokishi (KePiano One Way)',
    artist: 'King Fergo',
    type: 'Album · 2022',
    image: dz('e37e30a945da94e5c193b0b35422e61d'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/3M5gqdVY0HUjvOcwKsxPks' }],
  },
  // 2021
  {
    title: 'AmaPiano Kwa-K, Vol. 2',
    artist: 'King Fergo',
    type: 'Album · 2021',
    image: dz('7c66950e59cd184fd7d78a013cbf5d86'),
    links: [sp],
  },
  // 2020
  {
    title: 'Amapiano Kwa-K',
    artist: 'King Fergo',
    type: 'Album · 2020',
    image: dz('c016c2bea91cc24cd042a53106847709'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/59NReRQxf2uBaHZUtNhMpx' }],
  },
  {
    title: 'SBWL',
    artist: 'King Fergo',
    type: 'Single · 2020',
    image: 'https://i.scdn.co/image/ab67616d0000b2738c520785542cfcaff9f58c97',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/4IuxmFdc7pdJH4OGcmz0kJ' }],
  },
  {
    title: 'Ubomi',
    artist: 'King Fergo',
    type: 'Single · 2020',
    image: dz('2534d290e10315cc11c7cbef7d256db1'),
    links: [sp],
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
