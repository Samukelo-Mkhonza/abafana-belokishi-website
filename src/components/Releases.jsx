import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReleaseCard from './ReleaseCard';
import ReleaseModal from './ReleaseModal';
import ListenEverywhere from './ListenEverywhere';
import SectionHeader from './ui/SectionHeader';
import { RELEASES } from '../data/releases';

const INITIAL_COUNT = 8;
const ALL = 'All';

export default function Releases() {
  const [artist, setArtist] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);

  const artists = useMemo(() => [ALL, ...new Set(RELEASES.map((r) => r.artist))], []);
  const filtered = artist === ALL ? RELEASES : RELEASES.filter((r) => r.artist === artist);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hidden = filtered.length - visible.length;

  return (
    <section id="releases" className="section" aria-labelledby="releases-title">
      <div className="container">
        <SectionHeader
          id="releases-title"
          eyebrow="Discography"
          title="Music"
          intro="Every Abafana Belokishi release, newest first. Select a cover for the story behind it and a player."
        />

        <div className="filter-bar" role="group" aria-label="Filter releases by artist">
          {artists.map((name) => (
            <button
              key={name}
              type="button"
              className="chip chip--filter"
              aria-pressed={artist === name}
              onClick={() => setArtist(name)}
            >
              {name}
            </button>
          ))}
          <span className="filter-bar__count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'release' : 'releases'}
          </span>
        </div>

        <ul className="releases__grid">
          {visible.map((release) => (
            <li key={`${release.artist}-${release.title}`}>
              <ReleaseCard {...release} onOpen={() => setSelected(release)} />
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <div className="releases__more">
            <button type="button" className="btn btn--ghost" onClick={() => setExpanded(true)}>
              Show all {filtered.length} releases
            </button>
          </div>
        )}

        <ListenEverywhere />
      </div>

      <AnimatePresence>
        {selected && <ReleaseModal release={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
