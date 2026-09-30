import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { CHANNELS, MAP } from './data/site'
import { RELEASES, YT_PLAYLIST_EMBED_SRC } from './data/releases'
import { largeCover } from './lib/asset'

const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1]
const directive = (name) =>
  policy.split(';').map((d) => d.trim().split(/\s+/)).find(([n]) => n === name)?.slice(1) ?? []
const allows = (name, url) => directive(name).includes(new URL(url).origin)

describe('Content-Security-Policy', () => {
  it('hashes every inline script, so editing one without updating the policy fails here', () => {
    const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
    expect(inline.length).toBeGreaterThan(0)
    for (const body of inline) {
      const hash = createHash('sha256').update(body).digest('base64')
      expect(directive('script-src')).toContain(`'sha256-${hash}'`)
    }
  })

  it('allows every player the site embeds', () => {
    const frames = [
      CHANNELS.spotifyPlaylistEmbed,
      CHANNELS.soundcloudEmbed,
      CHANNELS.podcastEpisodeEmbed,
      YT_PLAYLIST_EMBED_SRC,
      MAP.embed,
      ...RELEASES.map((r) => r.embedSrc).filter(Boolean),
    ]
    for (const src of frames) expect(allows('frame-src', src), src).toBe(true)
  })

  it('allows every remote image the site shows', () => {
    const images = [
      CHANNELS.podcastEpisodeThumb,
      ...RELEASES.flatMap((r) => (r.image ? [r.image, largeCover(r.image)] : [])),
    ].filter((src) => src.startsWith('http'))
    for (const src of images) expect(allows('img-src', src), src).toBe(true)
  })
})
