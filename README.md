# Abafana Belokishi Entertainment

Official website for **Abafana Belokishi Entertainment** — a music label, podcast network, and creative collective rooted in Harding, KwaZulu-Natal, South Africa. "Abafana Belokishi" translates to *"The Boys of the Township,"* and the site exists to give the label's artists, releases, and podcast a home online.

**Live site:** https://samukelo-mkhonza.github.io/abafana-belokishi-website/

## About

Abafana Belokishi was built by artists, for artists — spanning Amapiano, Hip-Hop, and long-form podcast conversation. The label represents artists **King Fergo**, **SAB**, **Assign**, and **Structure**.

This repository contains the single-page marketing site: an animated hero, the label's story, an artist roster, release showcase with embedded streaming, a YouTube podcast feed, a booking/enquiry form, and a location map.

## Features

- **Hero** — animated landing section introducing the label
- **About** — label story with animated stat counters (years active, releases, monthly listeners)
- **Artists** — roster grid with per-artist modal profiles
- **Releases** — release catalogue with embedded players and a dedicated "New Release" popup for the latest drop
- **SoundCloud / Spotify embeds** — inline streaming for releases
- **Podcast** — embedded YouTube video feed with a link to the full channel
- **Contact** — booking/enquiry form (opens a pre-filled email) plus direct phone, email, and WhatsApp links
- **Location** — embedded map centered on Harding, KwaZulu-Natal
- **Light/dark theme toggle** with a dedicated logo per theme
- Fully responsive, animated with [Framer Motion](https://www.framer.com/motion/)

## Tech Stack

- [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [GSAP](https://gsap.com/) for supplementary motion
- [react-icons](https://react-icons.github.io/react-icons/)
- Plain CSS (custom properties, no Tailwind/CSS framework)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests
- [ESLint](https://eslint.org/) for linting

> **Node compatibility:** this project targets Node **20.x**. Vite 6 and jsdom 24 are deliberately pinned (not upgraded to Vite 8 / jsdom 25+) because those newer versions require Node ≥20.19, which isn't guaranteed on every dev machine running this project.

## Getting Started

### Prerequisites

- Node.js 20.x
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

## Project Structure

```
src/
  components/   # page sections (Hero, About, Artists, Releases, Podcast, Contact, Location, Footer, ...)
  hooks/         # useTheme (light/dark mode)
  assets/        # bundled images
  App.jsx        # page composition
  main.jsx       # entry point
public/
  images/        # logos, banners, artist photos
```

## Deployment

The site auto-deploys to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it lints, tests, builds with `--base=/abafana-belokishi-website/`, and publishes `dist/`. A separate [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs lint/test/build on pull requests, and [CodeQL](.github/workflows/codeql.yml) + [Dependabot](.github/dependabot.yml) provide ongoing security scanning.

## Contact

- **Phone / WhatsApp:** 062 530 2863
- **Email:** abafanabelokishipodcasters@gmail.com
- **YouTube:** [@abafanabelokishipodcast](https://www.youtube.com/@abafanabelokishipodcast)

## Security

See [SECURITY.md](SECURITY.md) for how to report a vulnerability.
