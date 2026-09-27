import { asset } from '../lib/asset';

export const YT_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLky-eQTbtiYxoX_693z9MR9F8vFYExSZQ';
export const YT_PLAYLIST_EMBED_SRC = 'https://www.youtube.com/embed/videoseries?list=PLky-eQTbtiYxoX_693z9MR9F8vFYExSZQ';

const KING_FERGO_SPOTIFY = 'https://open.spotify.com/artist/2tyq2nUN54HaJX4FkjRkuJ';
const sp = { label: 'Spotify', href: KING_FERGO_SPOTIFY };

const dz = (hash) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/500x500-000000-80-0-0.jpg`;

const YT_EMBED_SRC = YT_PLAYLIST_EMBED_SRC;

// Newest first — the first entry is featured in the hero and the new-release card.
export const RELEASES = [
  {
    title: 'Mapholoba',
    artist: 'King Fergo',
    type: 'Album · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e02dd7b498687bf4b4e599c997e',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/48HGkUBmriYc01Ke0EXulE' }],
    embedSrc: 'https://open.spotify.com/embed/album/48HGkUBmriYc01Ke0EXulE?utm_source=generator',
    description: "King Fergo's newest album — seven tracks of after-dark amapiano that lean into melody as much as groove, from the slow burn of Love On You to the floor-filling Move Is A Dance. Mapholoba is the most assured Abafana Belokishi record yet, built and mixed in KwaZulu-Natal.",
  },
  {
    title: 'Be Gone',
    artist: 'SAB',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e022ed6940548ded1b6cc37e08a',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/2XWTIbyLmlWi3KvOguFWyi' }],
    description: "SAB's follow-up to ECHOES OF TOMORROW, trading cinematic scale for something sharper — a moody hip-hop cut with Rhyme Tyme trading bars over spare, heavy drums. Proof the Abafana Belokishi hip-hop lane is widening fast.",
  },
  {
    title: "X's Change",
    artist: 'Assign',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e023ee162fe2b018958b62ce3a5',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/0wWf8Cd592Vslhefsd1jO9' }],
    description: "Assign's first single on Spotify — melodic South African hip-hop that carries the same restless energy as his Instagram freestyles. X's Change finally puts the Abafana Belokishi rapper's pen on record.",
  },
  {
    title: 'The Get Back',
    artist: 'Assign',
    type: 'EP · YouTube',
    image: asset('images/web/the-get-back.webp'),
    links: [{ label: 'YouTube', href: YT_PLAYLIST_URL }],
    embedSrc: YT_EMBED_SRC,
    description: "Assign's third EP — The Get Back is a statement of return, resilience, and artistry refined. Stream the full project on YouTube.",
  },
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
    title: 'MOLO',
    artist: 'King Fergo',
    type: 'Single · 2021',
    image: 'https://i.scdn.co/image/ab67616d00001e02df48044a315770b2471190ef',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/0wVLCGlc5mcAXAbQCnd8rf' }],
    description: "A posse cut in the truest kasi sense — King Fergo hands the mic to S'phesh, Maviwest, Caro P and Structure over warm, rolling piano keys. MOLO is a greeting and an invitation, and it captures the Abafana Belokishi crew at their loosest.",
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

export const LATEST_RELEASE = RELEASES[0];
