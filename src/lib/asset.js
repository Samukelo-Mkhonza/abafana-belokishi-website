// Files in public/ are served under Vite's base path (/abafana-belokishi-website/
// on GitHub Pages), so string paths in JSX must be prefixed or they 404 in production.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

// Spotify serves the same cover at 64/300/640px; the prefix selects the size.
export function largeCover(url) {
  return url.replace('https://i.scdn.co/image/ab67616d00001e02', 'https://i.scdn.co/image/ab67616d0000b273');
}
