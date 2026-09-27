import { describe, it, expect } from 'vitest'
import { RELEASES, FEATURED_RELEASE, FIRST_RELEASE_YEAR } from './releases'
import { ARTISTS } from './artists'

const year = (r) => Number(r.type.match(/\d{4}/)?.[0])

describe('release catalogue', () => {
  it('gives every dated release a four-digit year and lists them newest first', () => {
    const dated = RELEASES.filter((r) => !Number.isNaN(year(r)))
    const years = dated.map(year)
    expect(years).toEqual([...years].sort((a, b) => b - a))
  })

  it('credits every release to an artist on the roster', () => {
    const names = ARTISTS.map((a) => a.name)
    RELEASES.forEach((r) => expect(names).toContain(r.artist))
  })

  it('features a release that exists and reports the first release year', () => {
    expect(RELEASES).toContain(FEATURED_RELEASE)
    expect(FIRST_RELEASE_YEAR).toBe(2020)
  })
})

describe('artist links', () => {
  it('points each Spotify link at a distinct artist profile', () => {
    const spotify = ARTISTS.flatMap((a) => a.socials.filter((s) => s.platform === 'Spotify').map((s) => s.href))
    spotify.forEach((href) => expect(href).toMatch(/^https:\/\/open\.spotify\.com\/artist\/\w+$/))
    expect(new Set(spotify).size).toBe(spotify.length)
  })
})
