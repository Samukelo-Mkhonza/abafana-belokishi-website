import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, closestCenter,
  MouseSensor, TouchSensor, KeyboardSensor,
  useSensor, useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext, rectSortingStrategy, arrayMove,
  sortableKeyboardCoordinates, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ReleaseCard from './ReleaseCard';
import ReleaseModal from './ReleaseModal';

const KING_FERGO_SPOTIFY = 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P';
const sp = { label: 'Spotify', href: KING_FERGO_SPOTIFY };

const dz = (hash) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/500x500-000000-80-0-0.jpg`;

const BASE_RELEASES = [
  {
    title: 'Gutara',
    artist: 'King Fergo',
    type: 'Single · 2026',
    image: dz('3155b0c5180c2fc4376f0f68650d3f13'),
    links: [sp],
    description: "King Fergo's freshest drop — a high-energy amapiano banger built for the dancefloor. Gutara blends infectious piano loops with hard-hitting bass, proving the Abafana Belokishi sound is only getting bigger.",
  },
  {
    title: 'Paradise',
    artist: 'King Fergo',
    type: 'Album · 2025',
    image: dz('fef55077e7f493269dec148ce65778f0'),
    links: [sp],
    description: "King Fergo's latest studio album — a full sonic journey exploring themes of elevation, joy, and belonging. Paradise is amapiano at its peak: rich, layered, and unapologetically KwaZulu-Natal.",
  },
  {
    title: 'Paradise',
    artist: 'King Fergo',
    type: 'Single · 2024',
    image: dz('52e1d201f9d0c3544daa0a3b1e4b288c'),
    links: [sp],
    description: "The lead single from the Paradise album — a melodic, feel-good record that sets the tone for everything that follows. Pure bliss wrapped in amapiano keys.",
  },
  {
    title: 'L E G E N D A R Y',
    artist: 'King Fergo',
    type: 'Hip-Hop · 2023',
    image: dz('92d378e2038debd5e494d0cb23391cea'),
    links: [sp],
    description: "A bold hip-hop statement track celebrating the grind, the come-up, and the legacy being built from the township up. This is King Fergo in full confidence mode.",
  },
  {
    title: 'PIKIPIKI (Kasi Flavor)',
    artist: 'King Fergo',
    type: 'Hip-Hop · 2023',
    image: dz('a6b128ce93aeb9ea66463f06fa747310'),
    links: [sp],
    description: "A hard-hitting hip-hop track with an infectious kasi flavor. PIKIPIKI brings the raw energy of the streets directly to the speakers — no filter, all flavor.",
  },
  {
    title: 'BACKSEAT',
    artist: 'King Fergo',
    type: 'Hip-Hop · 2023',
    image: dz('628e5cc9ac8986cd33872d5f5e77bb4c'),
    links: [sp],
    description: "A smooth hip-hop record with hypnotic flow and cinematic energy. BACKSEAT is for the drive home after a long night — laid-back, atmospheric, and deeply felt.",
  },
  {
    title: 'JMK',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('21cc1674a0127495da26f510182b11e7'),
    links: [sp],
    description: "A tribute to the journey, the music, and the culture that fuels it all. JMK is personal, gritty, and honest — the kind of record only someone who's lived it could make.",
  },
  {
    title: 'HELLO H. HELLO B. (Freestyle)',
    artist: 'King Fergo',
    type: 'Hip-Hop · 2023',
    image: dz('2da3d3dbc7761461a62d663aeec290b9'),
    links: [sp],
    description: "Raw and unfiltered hip-hop — a freestyle that strips everything back and lets the bars speak. HELLO H. HELLO B. showcases King Fergo's lyrical range and versatility in pure, unpolished form.",
  },
  {
    title: 'Abafana Belokishi (KePiano One Way)',
    artist: 'King Fergo',
    type: 'Album · 2022',
    image: dz('e37e30a945da94e5c193b0b35422e61d'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/3M5gqdVY0HUjvOcwKsxPks' }],
    description: "The landmark album that put the Abafana Belokishi sound on the map. KePiano One Way blends kasi culture with deep piano house, telling the story of a generation through every track. A must-listen from start to finish.",
  },
  {
    title: 'AmaPiano Kwa-K, Vol. 2',
    artist: 'King Fergo',
    type: 'Album · 2021',
    image: dz('7c66950e59cd184fd7d78a013cbf5d86'),
    links: [sp],
    description: "The follow-up to the debut that expanded the sonic palette — deeper grooves, richer textures, and more soul. Vol. 2 showed the growth of an artist fully in command of his craft.",
  },
  {
    title: 'Amapiano Kwa-K',
    artist: 'King Fergo',
    type: 'Album · 2020',
    image: dz('c016c2bea91cc24cd042a53106847709'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/59NReRQxf2uBaHZUtNhMpx' }],
    description: "The debut album that started it all. Raw, township-rooted amapiano straight from KwaZulu-Natal — this is where the Abafana Belokishi story began. Pure, unfiltered, and ahead of its time.",
  },
  {
    title: 'SBWL',
    artist: 'King Fergo',
    type: 'Single · 2020',
    image: 'https://i.scdn.co/image/ab67616d0000b2738c520785542cfcaff9f58c97',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/4IuxmFdc7pdJH4OGcmz0kJ' }],
    description: "An early single that captures the hunger and the hustle of building something from nothing. SBWL (Sisi Ngithanda Wena Babe) is a fan favourite that resonates far beyond the township.",
  },
  {
    title: 'Ubomi',
    artist: 'King Fergo',
    type: 'Single · 2020',
    image: dz('2534d290e10315cc11c7cbef7d256db1'),
    links: [sp],
    description: "A soulful reflection on life, growth, and purpose. Ubomi (meaning 'Life' in isiXhosa) is rooted in the township experience — honest, moving, and impossible to forget.",
  },
];

// Stable IDs for dnd-kit
const RELEASES = BASE_RELEASES.map((r, i) => ({ ...r, id: `release-${i}` }));

function SortableReleaseCard({ id, release, index, onOpen }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : undefined,
        opacity: isDragging ? 0.3 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <ReleaseCard
        {...release}
        index={index}
        onClick={() => onOpen(release)}
      />
    </div>
  );
}

export default function Releases() {
  const [releases, setReleases] = useState(RELEASES);
  const [selected, setSelected] = useState(null);
  const [activeRelease, setActiveRelease] = useState(null);
  const wasDragged = useRef(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = useCallback(({ active }) => {
    wasDragged.current = true;
    setActiveRelease(releases.find(r => r.id === active.id) ?? null);
  }, [releases]);

  const handleDragEnd = useCallback(({ active, over }) => {
    if (over && active.id !== over.id) {
      setReleases(prev => {
        const oldIdx = prev.findIndex(r => r.id === active.id);
        const newIdx = prev.findIndex(r => r.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
    setActiveRelease(null);
    setTimeout(() => { wasDragged.current = false; }, 0);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveRelease(null);
    wasDragged.current = false;
  }, []);

  const openRelease = useCallback((release) => {
    if (!wasDragged.current) setSelected(release);
  }, []);

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={releases.map(r => r.id)} strategy={rectSortingStrategy}>
            <div className="releases__grid">
              {releases.map((release, i) => (
                <SortableReleaseCard
                  key={release.id}
                  id={release.id}
                  release={release}
                  index={i}
                  onOpen={openRelease}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeRelease && (
              <div style={{ opacity: 0.85, transform: 'scale(1.05)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                <ReleaseCard {...activeRelease} index={0} onClick={() => {}} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <AnimatePresence>
        {selected && (
          <ReleaseModal release={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
