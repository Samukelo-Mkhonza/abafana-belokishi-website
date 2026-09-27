import { asset } from '../lib/asset';

export const YT_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLky-eQTbtiYxoX_693z9MR9F8vFYExSZQ';
export const YT_PLAYLIST_EMBED_SRC = 'https://www.youtube.com/embed/videoseries?list=PLky-eQTbtiYxoX_693z9MR9F8vFYExSZQ';

const KING_FERGO_SPOTIFY = 'https://open.spotify.com/artist/2tyq2nUN54HaJX4FkjRkuJ';
const sp = { label: 'Spotify', href: KING_FERGO_SPOTIFY };
const ASSIGN_SPOTIFY = { label: 'Spotify', href: 'https://open.spotify.com/artist/3XoiNab3csSA07GnFOxptt' };

const dz = (hash) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/500x500-000000-80-0-0.jpg`;

const YT_EMBED_SRC = YT_PLAYLIST_EMBED_SRC;

// Newest first. Dates, track lists and credits were checked against Spotify and
// Deezer in September 2026; keep descriptions to facts that can be checked.
export const RELEASES = [
  {
    title: "Ngiyam'thanda",
    artist: 'King Fergo',
    type: 'Single · 2026',
    image: dz('a7fe92efe88c3ce1acb70a984d9c43e6'),
    links: [sp],
    description: "King Fergo's newest single, out 26 September 2026, with HOLLY M, Turn Twenty and Akhonna.",
  },
  {
    title: 'Your Son Can Rap - Prelude',
    artist: 'Assign',
    type: 'EP · 2026',
    image: dz('65aba5dfa51854847adb887e188e2162'),
    links: [ASSIGN_SPOTIFY],
    description: 'Four tracks with IIILESTDON, out 25 September 2026: Intro (Still Doing Me), G-Unit (The Get Back), I Get Lonely and Snowball Effect.',
  },
  {
    title: 'Mapholoba',
    artist: 'King Fergo',
    type: 'Album · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e02dd7b498687bf4b4e599c997e',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/48HGkUBmriYc01Ke0EXulE' }],
    embedSrc: 'https://open.spotify.com/embed/album/48HGkUBmriYc01Ke0EXulE',
    description: "Seven tracks, released 4 September 2026. It opens with Love On You and ends with Good Times. It's King Fergo's first album since Abafana Belokishi (KePiano One Way) in 2022.",
  },
  {
    title: 'Be Gone',
    artist: 'SAB',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e022ed6940548ded1b6cc37e08a',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/2XWTIbyLmlWi3KvOguFWyi' }],
    description: "SAB's second release, out 13 August 2026. Rhyme Tyme is on it too.",
  },
  {
    title: "X's Change",
    artist: 'Assign',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e023ee162fe2b018958b62ce3a5',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/0wWf8Cd592Vslhefsd1jO9' }],
    description: "Assign's first single on Spotify, released 26 June 2026. No features, just Assign.",
  },
  {
    title: 'The Get Back',
    artist: 'Assign',
    type: 'EP · YouTube',
    image: asset('images/web/the-get-back.webp'),
    links: [{ label: 'YouTube', href: YT_PLAYLIST_URL }],
    embedSrc: YT_EMBED_SRC,
    description: 'Four tracks: G-Unit, Never, I Get Lonely and Ending (Outro). IIILESTDON produced, mixed and mastered all of it. The whole EP is on YouTube.',
  },
  {
    title: 'ECHOES OF TOMORROW',
    artist: 'SAB',
    type: 'Single · 2026',
    image: 'https://i.scdn.co/image/ab67616d00001e022560559e20b1319460228b53',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/1TVLfIlPfcs3g73lcZB85U' }],
    description: "SAB's first release on Spotify, out 29 May 2026. There are three songs: ECHOES OF TOMORROW, FONDNESS with Assign, and ALPHA with King Fergo.",
  },
  {
    title: 'Gutara',
    artist: 'King Fergo',
    type: 'Single · 2026',
    image: dz('3155b0c5180c2fc4376f0f68650d3f13'),
    links: [sp],
    description: 'King Fergo and Structure, released 14 May 2026.',
  },
  {
    title: 'Paradise',
    artist: 'King Fergo',
    type: 'Single · 2024',
    image: dz('52e1d201f9d0c3544daa0a3b1e4b288c'),
    links: [sp],
    description: 'A King Fergo solo single, released 30 August 2024.',
  },
  {
    title: 'JMK',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('21cc1674a0127495da26f510182b11e7'),
    links: [sp],
    description: 'A King Fergo solo single, released 3 November 2023.',
  },
  {
    title: 'BACKSEAT',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('628e5cc9ac8986cd33872d5f5e77bb4c'),
    links: [sp],
    description: 'Hip-hop with sab and Trevor, released 31 October 2023.',
  },
  {
    title: 'PIKIPIKI (Kasi Flavor)',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('a6b128ce93aeb9ea66463f06fa747310'),
    links: [sp],
    description: 'A hip-hop posse cut from 16 June 2023. King Fergo shares it with Structure, Rhyme Tyme, Rude P and Styl Makhathaza.',
  },
  {
    title: 'L E G E N D A R Y',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('92d378e2038debd5e494d0cb23391cea'),
    links: [sp],
    description: 'Hip-hop with sab, released 1 June 2023.',
  },
  {
    title: 'HELLO H. HELLO B. (Freestyle)',
    artist: 'King Fergo',
    type: 'Single · 2023',
    image: dz('2da3d3dbc7761461a62d663aeec290b9'),
    links: [sp],
    description: 'A freestyle with Turn Twenty, released 17 February 2023.',
  },
  {
    title: 'Abafana Belokishi (KePiano One Way)',
    artist: 'King Fergo',
    type: 'Album · 2022',
    image: dz('e37e30a945da94e5c193b0b35422e61d'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/3M5gqdVY0HUjvOcwKsxPks' }],
    description: "King Fergo's third album, released 6 October 2022. It has 20 tracks, with Trevor, Maviwest, S'phesh, Structure, Bonesh, Denvelic, Akhonna, Jalie ZA, Syba and Yonela Luke.",
  },
  {
    title: 'Ubomi (Radio Edit)',
    artist: 'King Fergo',
    type: 'Single · 2021',
    image: dz('2534d290e10315cc11c7cbef7d256db1'),
    links: [sp],
    description: 'A radio edit of Ubomi with Structure, released 17 December 2021. The full version, which also has Akhonna on it, is on Amapiano Kwa-K. Ubomi means "life" in isiXhosa.',
  },
  {
    title: 'AmaPiano Kwa-K, Vol. 2',
    artist: 'King Fergo',
    type: 'Album · 2021',
    image: dz('7c66950e59cd184fd7d78a013cbf5d86'),
    links: [sp],
    description: 'Seven tracks, released 11 December 2021, almost exactly a year after the first volume. Abafana Belokishi, Potsoyi and Kwaze Kwamnandi are on it.',
  },
  {
    title: 'MOLO',
    artist: 'King Fergo',
    type: 'Single · 2021',
    image: 'https://i.scdn.co/image/ab67616d00001e02df48044a315770b2471190ef',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/0wVLCGlc5mcAXAbQCnd8rf' }],
    description: "A posse cut from 15 August 2021: King Fergo with S'phesh, Maviwest, Caro P and Structure.",
  },
  {
    title: 'Amapiano Kwa-K',
    artist: 'King Fergo',
    type: 'Album · 2020',
    image: dz('c016c2bea91cc24cd042a53106847709'),
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/59NReRQxf2uBaHZUtNhMpx' }],
    description: "King Fergo's first album, from late 2020. Structure is on all eight tracks, including Ubomi and Sebenza.",
  },
  {
    title: 'SBWL',
    artist: 'King Fergo',
    type: 'Single · 2020',
    image: 'https://i.scdn.co/image/ab67616d0000b2738c520785542cfcaff9f58c97',
    links: [{ label: 'Spotify', href: 'https://open.spotify.com/album/4IuxmFdc7pdJH4OGcmz0kJ' }],
    description: "King Fergo's first single, made with Structure and released 12 May 2020.",
  },
];

// The hero card and the new-release card feature this one. It is set by hand rather
// than taken from the top of the list so the label chooses what leads the page.
export const FEATURED_RELEASE = RELEASES.find((r) => r.title === "Ngiyam'thanda");

export const FIRST_RELEASE_YEAR = Math.min(...RELEASES.map((r) => Number(r.type.match(/\d{4}/)?.[0] ?? Infinity)));
