// Files in public/ are served under Vite's base path (/abafana-belokishi-website/
// on GitHub Pages), so string paths in JSX must be prefixed or they 404 in production.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

// Spotify serves the same cover at 64/300/640px (the prefix selects the size) and
// Deezer at any square size in the path, so both can be upgraded for the hero.
export function largeCover(url) {
  return url
    .replace('https://i.scdn.co/image/ab67616d00001e02', 'https://i.scdn.co/image/ab67616d0000b273')
    .replace(/(cdn-images\.dzcdn\.net\/images\/cover\/\w+)\/500x500-/, '$1/1000x1000-');
}

// Some releases only link to the artist's Spotify page, not an album page.
export function isArtistLink(href) {
  return /open\.spotify\.com\/artist\//.test(href);
}
