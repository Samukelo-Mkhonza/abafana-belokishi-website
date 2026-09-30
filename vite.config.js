import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves 404.html for any unknown path. Generate it at build time
// so its links honour the --base the deploy workflow passes in.
function notFoundPage() {
  let base = '/'
  return {
    name: 'not-found-page',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Page not found | Abafana Belokishi Entertainment</title>
<link rel="icon" href="${base}favicon.ico" sizes="16x16 32x32 48x48" />
<style>
  body{margin:0;min-height:100svh;display:grid;place-items:center;padding:1.5rem;background:#0b0b0c;color:#f3f1ec;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;text-align:center}
  img{width:72px;height:72px;border-radius:50%;margin:0 auto 1.5rem}
  h1{font-size:clamp(2rem,6vw,3.5rem);margin:0 0 .5rem;letter-spacing:.02em;text-transform:uppercase}
  p{color:#b5b0a7;margin:0 0 2rem}
  a{display:inline-flex;align-items:center;min-height:48px;padding:0 1.5rem;border-radius:999px;background:#f3f1ec;color:#0b0b0c;font-weight:600;text-decoration:none}
  a:hover,a:focus-visible{background:#e0b25a}
</style>
</head>
<body>
<main>
  <img src="${base}images/web/logo-dark.webp" alt="" />
  <h1>Page not found</h1>
  <p>We couldn't find that page.</p>
  <a href="${base}">Back to the homepage</a>
</main>
</body>
</html>
`,
      })
    },
  }
}

// The hero headline paints before the web fonts would normally be requested,
// so the swap shifts layout. Preloading the two latin files avoids that.
function preloadCriticalFonts() {
  const critical = [/bebas-neue-latin-400-normal-.*\.woff2$/, /dm-sans-latin-wght-normal-.*\.woff2$/]
  let base = '/'
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((f) => critical.some((re) => re.test(f)))
        return files.map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `${base}${file}`, crossorigin: '' },
          injectTo: 'head',
        }))
      },
    },
    configResolved(config) {
      base = config.base
    },
  }
}

export default defineConfig({
  plugins: [react(), notFoundPage(), preloadCriticalFonts()],
  css: {
    postcss: { plugins: [] },
  },
})
