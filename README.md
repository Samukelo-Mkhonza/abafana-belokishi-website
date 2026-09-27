# Abafana Belokishi Entertainment

Official website for **Abafana Belokishi Entertainment** — a music label, podcast network, and creative collective rooted in Harding, KwaZulu-Natal, South Africa. "Abafana Belokishi" translates to *"The Boys of the Township,"* and the site exists to give the label's artists, releases, and podcast a home online.

**Live site:** https://samukelo-mkhonza.github.io/abafana-belokishi-website/

## About

Abafana Belokishi was built by artists, for artists — spanning Amapiano, Hip-Hop, and long-form podcast conversation. The label represents artists **King Fergo**, **SAB**, **Assign**, and **Structure**.

This repository contains the single-page marketing site: a hero featuring the latest release, the label's story, the artist roster, a filterable discography with streaming players, the podcast, and a booking form with a location map.

## Features

- **Hero** — headline plus a card for the latest release, linked to Spotify
- **About** — the label's story with animated stat counters
- **Artists** — roster grid; each card opens a profile with bio, socials and a player
- **Music** — full discography, newest first, filterable by artist, with a detail dialog per release and a "Listen everywhere" player (Spotify, SoundCloud, YouTube)
- **Podcast** — latest episode and links to YouTube and TikTok
- **Contact** — validated enquiry form that opens a pre-filled email *or* WhatsApp message, direct phone/WhatsApp/email links, and a map of Harding
- **New-release card** — a small corner card announcing the latest drop, shown once per release
- **Light/dark theme** that follows the device setting, can be toggled, and never flashes on load

### Production quality

- **Design system** — all colours, type sizes, spacing, radii and shadows are CSS custom properties in `src/index.css`, defined for both themes
- **Performance** — third-party players (Spotify, SoundCloud, YouTube, Google Maps) only load when a visitor presses play; images are resized WebP; fonts are self-hosted and preloaded; Framer Motion loads only the features in use
- **Accessibility** — skip link, semantic landmarks, visible focus, dialogs with focus trap / Esc / focus return, keyboard-operable tabs, `prefers-reduced-motion` support, WCAG AA contrast in both themes
- **SEO & sharing** — descriptive meta tags, Open Graph/Twitter cards (1200×630 preview image for WhatsApp and socials), JSON-LD organisation data, web app manifest and icons, sitemap, and a branded 404 page

Lighthouse (mobile, production build): Performance 99, Accessibility 100, Best Practices 100, SEO 100.

## Tech Stack

- [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) (via `LazyMotion`) for animation
- [react-icons](https://react-icons.github.io/react-icons/)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) (Bebas Neue, DM Sans)
- Plain CSS with custom properties (no Tailwind/CSS framework)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests
- [ESLint](https://eslint.org/) for linting
- [sharp](https://sharp.pixelplumbing.com/) (dev only) for generating web images

> **Node compatibility:** Vite 8 and jsdom need Node **20.19+** or **22.12+**. CI uses the latest Node 20.

## Getting Started

### Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server with hot module reload.

### Build

```bash
npm run build
```

Outputs a production build to `dist/`.

### Preview

```bash
npm run preview
```

Serves the production build locally.

### Lint

```bash
npm run lint
```

### Tests

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # with coverage report
```

### Images

```bash
npm run images
```

Regenerates the web-sized WebP files, icons and social preview image in `public/images/web/` from the originals in `assets-source/`. Run it after adding or replacing a photo, logo or cover.

## Project Structure

```
src/
  components/    # page sections (Hero, About, Artists, Releases, Podcast, Contact, Footer, ...)
    ui/          # shared building blocks: Modal, Embed (click-to-load player), Reveal, SectionHeader
  data/          # content: releases.js, artists.js, site.js (contact details, socials, nav)
  hooks/         # useTheme (light/dark mode)
  lib/           # helpers: base-path-aware asset URLs, embed URLs, form validation, scrolling
  test/          # test setup and a render helper
  index.css      # design tokens and all styles
  App.jsx        # page composition
  main.jsx       # entry point
public/
  images/web/    # optimised images actually served by the site
  manifest.webmanifest, sitemap.xml
assets-source/   # full-size originals (not deployed)
scripts/
  optimise-images.mjs
```

### Updating content

- **New release:** add it to the top of `RELEASES` in `src/data/releases.js`. The hero card and new-release card use the first entry automatically.
- **Artist details:** edit `src/data/artists.js`. Social links set to `'#'` are hidden until a real URL is added.
- **Contact details and label socials:** edit `src/data/site.js`.
- **Images in JSX** must go through `asset('images/...')` so they resolve under the GitHub Pages base path.

## Deployment

The site auto-deploys to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it lints, tests, builds with `--base=/abafana-belokishi-website/`, and publishes `dist/`. A separate [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs lint/test/build on pull requests, and [CodeQL](.github/workflows/codeql.yml) + [Dependabot](.github/dependabot.yml) provide ongoing security scanning.

## Contact

- **Phone / WhatsApp:** 062 530 2863
- **Email:** abafanabelokishipodcasters@gmail.com
- **YouTube:** [@abafanabelokishipodcast](https://www.youtube.com/@abafanabelokishipodcast)

## Security

See [SECURITY.md](SECURITY.md) for how to report a vulnerability.
