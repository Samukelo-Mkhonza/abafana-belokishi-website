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
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

const BASE_ARTISTS = [
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
    bio: "Structure brings the vocal heart to the Abafana Belokishi sound. His smooth, emotive delivery has become a signature element of the label's amapiano releases — weaving storytelling and raw feeling into every performance. A key collaborator on the KePiano One Way album and a standout presence on stage.",
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
    bio: "SAB is Abafana Belokishi's hip-hop and R&B voice — crafting records that sit at the intersection of street realism and melodic soul. Drawing from the richness of township life, SAB delivers with authenticity and range, pushing the boundaries of what South African hip-hop can be.",
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
    bio: "Assign brings raw hip-hop energy to the Abafana Belokishi roster. Known for sharp lyricism and an unflinching perspective, Assign represents the next wave of South African hip-hop — grounded, hungry, and relentless. Every bar is a statement, every track a testament to the township's resilience.",
    socials: [
      { platform: 'Instagram',  href: '#', handle: '@assign' },
      { platform: 'Spotify',    href: '#', handle: 'Assign' },
      { platform: 'TikTok',     href: '#', handle: '@assign' },
      { platform: 'SoundCloud', href: 'https://soundcloud.com/sabelomoloi07', handle: '@assign_za' },
    ],
  },
];

const ARTISTS = BASE_ARTISTS.map((a, i) => ({ ...a, id: `artist-${i}` }));

const GripIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true">
    <circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/>
    <circle cx="2" cy="7" r="1.5"/><circle cx="8" cy="7" r="1.5"/>
    <circle cx="2" cy="12" r="1.5"/><circle cx="8" cy="12" r="1.5"/>
  </svg>
);

function SortableArtistCard({ id, artist, index, onOpen }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className="sortable-card-wrapper"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : undefined,
        opacity: isDragging ? 0.3 : 1,
        position: 'relative',
      }}
      {...attributes}
    >
      {/* Drag listeners live only on the handle — keeps Framer Motion gestures on the card conflict-free */}
      <div ref={setActivatorNodeRef} {...listeners} className="drag-handle-badge">
        <GripIcon />
      </div>
      <ArtistCard
        {...artist}
        index={index}
        onClick={() => onOpen(artist)}
      />
    </div>
  );
}

export default function Artists() {
  const [artists, setArtists] = useState(ARTISTS);
  const [selected, setSelected] = useState(null);
  const [activeArtist, setActiveArtist] = useState(null);
  const wasDragged = useRef(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = useCallback(({ active }) => {
    wasDragged.current = true;
    setActiveArtist(artists.find(a => a.id === active.id) ?? null);
  }, [artists]);

  const handleDragEnd = useCallback(({ active, over }) => {
    if (over && active.id !== over.id) {
      setArtists(prev => {
        const oldIdx = prev.findIndex(a => a.id === active.id);
        const newIdx = prev.findIndex(a => a.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
    setActiveArtist(null);
    setTimeout(() => { wasDragged.current = false; }, 0);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveArtist(null);
    wasDragged.current = false;
  }, []);

  const openArtist = useCallback((artist) => {
    if (!wasDragged.current) setSelected(artist);
  }, []);

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

        <p className="drag-reorder-hint" aria-hidden="true">
          <svg width="8" height="12" viewBox="0 0 10 14" fill="currentColor">
            <circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/>
            <circle cx="2" cy="7" r="1.5"/><circle cx="8" cy="7" r="1.5"/>
            <circle cx="2" cy="12" r="1.5"/><circle cx="8" cy="12" r="1.5"/>
          </svg>
          Hold &amp; drag to reorder
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={artists.map(a => a.id)} strategy={rectSortingStrategy}>
            <div className="artists__grid" role="list">
              {artists.map((artist, i) => (
                <SortableArtistCard
                  key={artist.id}
                  id={artist.id}
                  artist={artist}
                  index={i}
                  onOpen={openArtist}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeArtist && (
              <div style={{ opacity: 0.85, transform: 'scale(1.05)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                <ArtistCard {...activeArtist} index={0} onClick={() => {}} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <AnimatePresence>
        {selected && (
          <ArtistModal artist={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
