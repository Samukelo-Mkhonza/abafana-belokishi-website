import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { ARTISTS } from '../data/artists';

export default function Artists() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="artists" className="section section--alt" aria-labelledby="artists-title">
      <div className="container">
        <SectionHeader
          id="artists-title"
          eyebrow="The roster"
          title="Artists"
          action={<p className="bill__hint">Pick a name for the bio, links and a player</p>}
        />

        <ul className="bill">
          {ARTISTS.map((artist, i) => (
            <Reveal as="li" key={artist.slug} delay={i * 0.06} y={12}>
              <ArtistCard {...artist} index={i} onOpen={() => setSelected(artist)} />
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selected && <ArtistModal artist={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
