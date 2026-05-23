import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

const ARTISTS = [
  {
    name: 'King Fergo',
    genre: 'Amapiano · Producer',
    initials: 'KF',
    image: '/images/artists/king-fergo-ab-profile-photo.JPG',
    bio: 'King Fergo is the founder and driving force behind Abafana Belokishi Entertainment. Born and raised in KwaZulu-Natal, he has built a reputation as one of the most authentic amapiano producers to emerge from the township. With multiple albums and countless singles to his name, his sound blends kasi culture with world-class production — earning him tens of thousands of monthly listeners on Spotify alone. He has worked with Ngane Sikobi (Native Rhythms) and Danger (Formerly of Big Nuz), to name a few.',
    socials: [
      { platform: 'Spotify',   href: 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P', handle: 'King Fergo' },
      { platform: 'Instagram', href: 'https://www.instagram.com/realkingfergo?igsh=YnIyYWx1ZGw4azhz', handle: '@realkingfergo' },
      { platform: 'TikTok',   href: 'https://www.tiktok.com/@king_fergo?_r=1&_t=ZS-96WLzTjzV6G', handle: '@king_fergo' },
    ],
  },
  {
    name: 'Structure',
    genre: 'Amapiano · Vocalist',
    initials: 'ST',
    image: '/images/artists/structure-ab-profile-photo.JPG',
    bio: 'Structure brings the vocal heart to the Abafana Belokishi sound. His smooth, emotive delivery has become a signature element of the label\'s amapiano releases — weaving storytelling and raw feeling into every performance. A key collaborator on the KePiano One Way album and a standout presence on stage.',
    socials: [
      { platform: 'Instagram', href: '#', handle: '@structure' },
      { platform: 'Spotify',   href: 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P', handle: 'Structure' },
      { platform: 'TikTok',   href: '#', handle: '@structure' },
    ],
  },
  {
    name: 'SAB',
    genre: 'Hip-Hop / R&B',
    initials: 'SAB',
    bio: 'SAB is Abafana Belokishi\'s hip-hop and R&B voice — crafting records that sit at the intersection of street realism and melodic soul. Drawing from the richness of township life, SAB delivers with authenticity and range, pushing the boundaries of what South African hip-hop can be.',
    socials: [
      { platform: 'Instagram', href: '#', handle: '@sab' },
      { platform: 'Spotify',   href: '#', handle: 'SAB' },
      { platform: 'TikTok',   href: '#', handle: '@sab' },
    ],
  },
  {
    name: 'Assign',
    genre: 'Hip-Hop',
    initials: 'AS',
    image: '/images/artists/assign-ab-profile-photo.JPG',
    bio: 'Assign brings raw hip-hop energy to the Abafana Belokishi roster. Known for sharp lyricism and an unflinching perspective, Assign represents the next wave of South African hip-hop — grounded, hungry, and relentless. Every bar is a statement, every track a testament to the township\'s resilience.',
    socials: [
      { platform: 'Instagram',  href: '#', handle: '@assign' },
      { platform: 'Spotify',    href: '#', handle: 'Assign' },
      { platform: 'TikTok',     href: '#', handle: '@assign' },
      { platform: 'SoundCloud', href: 'https://soundcloud.com/sabelomoloi07', handle: '@assign_za' },
    ],
  },
];

export default function Artists() {
  const [selected, setSelected] = useState(null);

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
            <ArtistCard
              key={artist.name}
              {...artist}
              index={i}
              onClick={() => setSelected(artist)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ArtistModal artist={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
