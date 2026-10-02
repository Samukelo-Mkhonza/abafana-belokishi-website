import { ARTISTS } from '../data/artists';
import { RELEASES, YT_PLAYLIST_URL } from '../data/releases';
import { CHANNELS, CONTACT, MAP, SITE_NAME, SOCIALS, whatsappLink } from '../data/site';

// A keyword matcher, not a language model: every answer is assembled from the
// data files, so it stays correct when releases or contact details change and
// it never sends what visitors type anywhere.

export function normalise(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Single words also match longer forms ("release" → "releases", "book" →
// "booking"); short words and phrases must match exactly.
function hasKeyword(text, words, keyword) {
  if (keyword.includes(' ')) return ` ${text} `.includes(` ${keyword} `);
  if (keyword.length < 4) return words.includes(keyword);
  return words.some((w) => w.startsWith(keyword));
}

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href);
const link = (label, href) => ({ label, href, external: isExternal(href) });
const realLinks = (items) => items.filter(({ href }) => href && href !== '#');

const CONTACT_LINKS = [
  link('WhatsApp us', whatsappLink()),
  link(`Email ${CONTACT.email}`, `mailto:${CONTACT.email}`),
  link(`Call ${CONTACT.phoneDisplay}`, CONTACT.phoneHref),
];

export const QUICK_REPLIES = ['Who are you?', "What's new?", 'Meet the artists', 'The podcast', 'Book an artist', 'Where are you based?'];

// --- Entities -------------------------------------------------------------

const ARTIST_ALIASES = {
  'King Fergo': ['kingfergo', 'fergo'],
  Assign: ['assign za', 'assignza', 'assign da yungkid'],
};

const artistEntries = ARTISTS.map((artist) => ({
  artist,
  names: [normalise(artist.name), ...(ARTIST_ALIASES[artist.name] ?? [])],
}));

const LABEL = normalise(SITE_NAME.replace(/ Entertainment$/, ''));

// Titles also match without a trailing "(Radio Edit)" or " - Prelude".
const releaseEntries = RELEASES.map((release) => {
  const variants = [release.title, release.title.split(' (')[0], release.title.split(' - ')[0]]
    .map(normalise)
    .filter((v) => v.length >= 3 && v !== LABEL);
  return { release, variants: [...new Set(variants)] };
});

function findRelease(text) {
  const compact = text.replace(/ /g, '');
  let best = null;
  for (const { release, variants } of releaseEntries) {
    for (const v of variants) {
      const squashed = v.replace(/ /g, '');
      // Spaced-out titles like "L E G E N D A R Y" are typed as one word.
      const hit = ` ${text} `.includes(` ${v} `) || (squashed.length >= 8 && compact.includes(squashed));
      if (hit && (!best || v.length > best.length)) best = { release, length: v.length };
    }
  }
  return best?.release ?? null;
}

function findArtist(text, words) {
  return artistEntries.find(({ names }) => names.some((n) => hasKeyword(text, words, n)))?.artist ?? null;
}

// --- Answers --------------------------------------------------------------

const FIRST_RELEASE = RELEASES.at(-1);

const firstSentences = (text, count) => text.match(/[^.!?]+[.!?]+/g)?.slice(0, count).join('').trim() ?? text;

function releaseAnswer(release) {
  return {
    text: `${release.title} by ${release.artist} (${release.type}). ${release.description}`,
    links: [...realLinks(release.links).map((l) => link(`Listen on ${l.label}`, l.href)), link('See all music', '#releases')],
  };
}

function artistAnswer(artist) {
  const latest = RELEASES.find((r) => r.artist === artist.name);
  const latestLine = latest ? ` Latest release: ${latest.title} (${latest.type}).` : '';
  return {
    text: `${artist.name} (${artist.genre}). ${firstSentences(artist.bio, 2)}${latestLine}`,
    links: [
      ...realLinks(artist.socials).map((s) => link(`${s.platform}: ${s.handle}`, s.href)),
      link('Meet the artists', '#artists'),
    ],
  };
}

// Ties go to the earlier intent, so specific asks (booking, location) sit
// ahead of broad topics: "book an artist" is a booking question.
const INTENTS = [
  {
    id: 'contact',
    keywords: ['book', 'hire', 'perform', 'shows', 'a show', 'live show', 'event', 'gig', 'collab', 'partner', 'brand', 'sponsor', 'contact', 'email', 'phone', 'call you', 'call the', 'call me', 'number', 'whatsapp', 'reach', 'talk to', 'enquir', 'inquir', 'price', 'fee', 'cost', 'rate'],
    answer: (artist) => ({
      text: `${artist ? `To book ${artist.name}` : 'For bookings, collaborations and brand partnerships'}, WhatsApp or email the team, or use the enquiry form. Prices and dates are agreed directly, so I can't quote them here.`,
      links: [
        artist ? link('WhatsApp us', whatsappLink(`Hi, I'd like to book ${artist.name}.`)) : CONTACT_LINKS[0],
        ...CONTACT_LINKS.slice(1),
        link('Enquiry form', '#contact'),
      ],
    }),
  },
  {
    id: 'location',
    keywords: ['where are you', 'where is the label', 'based', 'located', 'location', 'harding', 'kzn', 'kwazulu', 'natal', 'address', 'map', 'directions', 'come from'],
    answer: () => ({
      text: `The label is based in ${MAP.label}, South Africa.`,
      links: [link('Open in Google Maps', MAP.link), link('Contact details', '#contact')],
    }),
  },
  {
    id: 'artists',
    keywords: ['artist', 'roster', 'signed', 'musician', 'rapper', 'singer', 'who is on', 'members', 'meet'],
    answer: () => ({
      text: `There are ${ARTISTS.length} artists on the roster: ${ARTISTS.map((a) => `${a.name} (${a.genre})`).join(', ')}. Ask me about any of them by name.`,
      links: [link('Meet the artists', '#artists')],
    }),
  },
  {
    id: 'stream',
    keywords: ['listen', 'stream', 'spotify', 'playlist', 'soundcloud', 'apple music', 'deezer', 'hear', 'play'],
    answer: () => ({
      text: 'The easiest place to start is the label playlist on Spotify. Music videos are on YouTube, and every release on this site links to where you can stream it.',
      links: [link('Spotify playlist', CHANNELS.spotifyPlaylist), link('YouTube playlist', YT_PLAYLIST_URL), link('See all music', '#releases')],
    }),
  },
  {
    id: 'latest',
    keywords: ['new', 'latest', 'newest', 'recent', 'release', 'music', 'song', 'album', 'single', 'track', 'drop', 'whats out'],
    answer: () => {
      const recent = RELEASES.slice(0, 3);
      return {
        text: `The newest releases: ${recent.map((r) => `${r.title} by ${r.artist} (${r.type})`).join('; ')}.`,
        links: [
          ...recent.flatMap((r) => realLinks(r.links).slice(0, 1).map((l) => link(`${r.title} on ${l.label}`, l.href))),
          link('See all music', '#releases'),
        ],
      };
    },
  },
  {
    id: 'podcast',
    keywords: ['podcast', 'episode', 'interview', 'youtube', 'video', 'watch', 'clip'],
    answer: () => ({
      text: 'The Abafana Belokishi Podcast is long conversations about music and life ekasi. Full episodes go up on YouTube and short clips go on TikTok. The first episode is with Nosipho Ncayiyana, on ukugudlana, mental health and therapy.',
      links: [link('Watch on YouTube', CHANNELS.youtube), link('Clips on TikTok', CHANNELS.tiktok), link('Go to the podcast', '#podcast')],
    }),
  },
  {
    id: 'socials',
    keywords: ['instagram', 'facebook', 'tiktok', 'social', 'follow', 'insta', 'ig'],
    answer: () => ({
      text: `The label is on ${SOCIALS.map((s) => s.platform).join(', ')}. Each artist has their own accounts too, so ask me about one by name.`,
      links: SOCIALS.map((s) => link(`${s.platform}: ${s.handle}`, s.href)),
    }),
  },
  {
    id: 'about',
    keywords: ['who are you', 'who is abafana', 'what is abafana', 'about', 'label', 'meaning', 'mean', 'township', 'founder', 'founded', 'started', 'history', 'owner', 'who owns', 'company'],
    answer: () => ({
      text: `${SITE_NAME} is a record label and podcast from Harding in KwaZulu-Natal. "Abafana Belokishi" means "the boys of the township". King Fergo started it, and the first release was ${FIRST_RELEASE.title} (${FIRST_RELEASE.type}).`,
      links: [link('About the label', '#about'), link('Meet the artists', '#artists')],
    }),
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'ngiyabonga', 'siyabonga', 'ngiyathokoza', 'enkosi', 'cheers', 'sharp'],
    answer: () => ({ text: 'Ngiyabonga! Anything else you want to know?', links: [] }),
  },
];

const GREETING = ['hi', 'hey', 'hello', 'hola', 'howzit', 'sawubona', 'sanibonani', 'yebo', 'heita', 'unjani', 'good morning', 'good afternoon', 'good evening'];

export const WELCOME = {
  text: `Sawubona! I can tell you about ${SITE_NAME}: the artists, new music, the podcast and how to get in touch. What would you like to know?`,
  links: [],
};

export const FALLBACK = {
  text: "Angiqondi (I didn't catch that). I only know what's on this website: the label, the artists, releases, the podcast and contact details. For anything else, ask the team directly.",
  links: CONTACT_LINKS.slice(0, 2),
};

// Returns { intent, text, links } for a visitor's message.
export function reply(message) {
  const text = normalise(message);
  const words = text.split(' ').filter(Boolean);
  if (!words.length) return { intent: 'fallback', ...FALLBACK };

  const release = findRelease(text);
  if (release) return { intent: 'release', ...releaseAnswer(release) };

  let best = null;
  for (const intent of INTENTS) {
    const score = intent.keywords.filter((k) => hasKeyword(text, words, k)).length;
    if (score > (best?.score ?? 0)) best = { intent, score };
  }

  // "Book King Fergo" is a booking question, not a question about King Fergo.
  const artist = findArtist(text, words);
  if (best?.intent.id === 'contact') return { intent: 'contact', ...best.intent.answer(artist) };
  if (artist) return { intent: 'artist', ...artistAnswer(artist) };
  if (best) return { intent: best.intent.id, ...best.intent.answer() };

  if (GREETING.some((g) => hasKeyword(text, words, g))) return { intent: 'greeting', ...WELCOME };
  return { intent: 'fallback', ...FALLBACK };
}
