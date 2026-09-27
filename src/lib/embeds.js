// Turns a public Spotify URL into its embed URL and a sensible player height.
export function spotifyEmbed(href) {
  try {
    const [type, id] = new URL(href).pathname.split('/').filter(Boolean);
    if (!id) return null;
    return {
      src: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`,
      height: type === 'track' ? 152 : 352,
    };
  } catch {
    return null;
  }
}

export function soundcloudEmbed(href) {
  try {
    new URL(href);
    return {
      src:
        'https://w.soundcloud.com/player/?url=' +
        encodeURIComponent(href) +
        '&color=%23ff5500&auto_play=false&hide_related=false' +
        '&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
      height: 166,
    };
  } catch {
    return null;
  }
}
