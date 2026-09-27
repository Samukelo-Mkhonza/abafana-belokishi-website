export const SITE_NAME = 'Abafana Belokishi Entertainment';

export const CONTACT = {
  email: 'abafanabelokishipodcasters@gmail.com',
  phoneDisplay: '062 530 2863',
  phoneHref: 'tel:+27625302863',
  whatsappNumber: '27625302863',
  whatsappHandle: 'Abafana Belokishi_Ent',
};

export const whatsappLink = (text) =>
  `https://wa.me/${CONTACT.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const CHANNELS = {
  youtube: 'https://www.youtube.com/@abafanabelokishipodcast',
  spotifyPlaylist: 'https://open.spotify.com/playlist/5CXMGVu3rg045oaaYQAR6k',
  spotifyPlaylistEmbed: 'https://open.spotify.com/embed/playlist/5CXMGVu3rg045oaaYQAR6k?utm_source=generator&theme=0',
  soundcloud: 'https://soundcloud.com/sabelomoloi07',
  soundcloudEmbed:
    'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/sabelomoloi07' +
    '&color=%23ff5500&auto_play=false&hide_related=false' +
    '&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true',
  tiktok: 'https://www.tiktok.com/@abafanabelokishipodcast',
  podcastEpisodeEmbed: 'https://www.youtube-nocookie.com/embed/3GND3LlMTq0?autoplay=1',
  podcastEpisodeThumb: 'https://i.ytimg.com/vi/3GND3LlMTq0/hqdefault.jpg',
};

// Only accounts with a real URL are listed; add Instagram/Facebook here once their links exist.
export const SOCIALS = [
  { platform: 'YouTube', handle: '@abafanabelokishipodcast', href: CHANNELS.youtube },
  { platform: 'Spotify', handle: 'Abafana Belokishi', href: CHANNELS.spotifyPlaylist },
  { platform: 'TikTok', handle: '@abafanabelokishipodcast', href: CHANNELS.tiktok },
];

export const MAP = {
  label: 'Harding, KwaZulu-Natal',
  embed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.7536699735588!2d29.79992658161901!3d-30.625382533930477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee902da94e91%3A0xe8eaa517fd903bc5!2sHarding%2C%204680!5e0!3m2!1sen!2sza!4v1779626504640!5m2!1sen!2sza',
  link: 'https://www.google.com/maps/search/?api=1&query=Harding%2C+KwaZulu-Natal',
};

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Artists', href: '#artists' },
  { label: 'Music', href: '#releases' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Contact', href: '#contact' },
];
