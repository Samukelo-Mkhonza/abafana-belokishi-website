import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReleaseCard from './ReleaseCard';
import ReleaseModal from './ReleaseModal';

const KING_FERGO_SPOTIFY = 'https://open.spotify.com/artist/5bu8v4RFoGSEsGd30gyx1P';
const sp = { label: 'Spotify', href: KING_FERGO_SPOTIFY };

const dz = (hash) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/500x500-000000-80-0-0.jpg`;

const RELEASES = [
  {
    title: 'ECHOES OF TOMORROW',
    artist: 'SAB',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e022560559e20b1319460228b53',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/1TVLfIlPfcs3g73lcZB85U' }],
    description: "SAB's debut single — a cinematic hip-hop offering that blends introspective lyricism with polished production. ECHOES OF TOMORROW signals a bold new chapter for Abafana Belokishi's R&B voice, reaching beyond the township into something bigger and bolder.",
  },
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

const TOTAL = RELEASES.length;
const GAP = 20;

function getVisibleCount(vw) {
  if (vw >= 900) return 3;
  if (vw >= 560) return 2;
  return 1;
}

export default function Releases() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const viewportRef = useRef(null);
  const [slidePx, setSlidePx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const vw = el.offsetWidth;
      const count = getVisibleCount(vw);
      setVisibleCount(count);
      setSlidePx((vw - GAP * (count - 1)) / count);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, TOTAL - visibleCount);

  const paginate = useCallback((dir) => {
    setIndex(i => Math.max(0, Math.min(i + dir, maxIndex)));
  }, [maxIndex]);

  const goTo = useCallback((i) => {
    setIndex(Math.min(i, maxIndex));
  }, [maxIndex]);

  const trackX = slidePx > 0 ? -(index * (slidePx + GAP)) : 0;

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

        <motion.div
          className="releases__carousel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="releases__viewport" ref={viewportRef}>
            <motion.div
              className="releases__track"
              animate={{ x: trackX }}
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, { offset, velocity }) => {
                if (Math.abs(offset.x) > 40 || Math.abs(velocity.x) > 400) {
                  paginate(offset.x < 0 ? 1 : -1);
                }
              }}
            >
              {RELEASES.map((release, i) => (
                <motion.div
                  key={i}
                  className="releases__slide"
                  style={{ width: slidePx > 0 ? slidePx : undefined }}
                  animate={{
                    scale: i >= index && i < index + visibleCount ? 1 : 0.93,
                    opacity: i >= index && i < index + visibleCount ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ReleaseCard
                    {...release}
                    index={i}
                    inCarousel
                    onClick={() => setSelected(release)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="releases__controls">
            <button
              className="releases__nav-btn"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              aria-label="Previous release"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 9H4M4 9L9 4M4 9L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="releases__counter">
              {String(index + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
            <button
              className="releases__nav-btn"
              onClick={() => paginate(1)}
              disabled={index >= maxIndex}
              aria-label="Next release"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9H14M14 9L9 4M14 9L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="releases__dots" role="tablist" aria-label="Select release">
            {RELEASES.map((r, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i >= index && i < index + visibleCount}
                aria-label={r.title}
                className={`releases__dot${i >= index && i < index + visibleCount ? ' releases__dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ReleaseModal release={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
