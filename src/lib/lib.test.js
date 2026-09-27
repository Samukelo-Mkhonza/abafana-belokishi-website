import { describe, it, expect } from 'vitest'
import { asset, largeCover, isArtistLink } from './asset'
import { spotifyEmbed } from './embeds'
import { validateEnquiry } from './validateEnquiry'

describe('asset', () => {
  it('prefixes public paths with the Vite base so they resolve on GitHub Pages', () => {
    expect(asset('images/web/logo-dark.webp')).toBe(`${import.meta.env.BASE_URL}images/web/logo-dark.webp`)
    expect(asset('/images/x.webp')).toBe(`${import.meta.env.BASE_URL}images/x.webp`)
  })

  it('upgrades 300px Spotify covers to 640px and leaves other URLs alone', () => {
    expect(largeCover('https://i.scdn.co/image/ab67616d00001e02abc')).toBe('https://i.scdn.co/image/ab67616d0000b273abc')
    expect(largeCover('https://example.com/a.jpg')).toBe('https://example.com/a.jpg')
  })

  it('upgrades Deezer covers to 1000px', () => {
    expect(largeCover('https://cdn-images.dzcdn.net/images/cover/abc123/500x500-000000-80-0-0.jpg')).toBe(
      'https://cdn-images.dzcdn.net/images/cover/abc123/1000x1000-000000-80-0-0.jpg'
    )
  })
})

describe('isArtistLink', () => {
  it('only matches Spotify artist pages on the real Spotify host', () => {
    expect(isArtistLink('https://open.spotify.com/artist/2tyq2nUN54HaJX4FkjRkuJ')).toBe(true)
    expect(isArtistLink('https://open.spotify.com/album/48HGkUBmriYc01Ke0EXulE')).toBe(false)
    expect(isArtistLink('https://evil.example/open.spotify.com/artist/x')).toBe(false)
    expect(isArtistLink('https://open.spotify.com.evil.example/artist/x')).toBe(false)
    expect(isArtistLink('#')).toBe(false)
  })
})

describe('spotifyEmbed', () => {
  it('builds the embed URL and a taller player for albums', () => {
    expect(spotifyEmbed('https://open.spotify.com/album/123')).toEqual({
      src: 'https://open.spotify.com/embed/album/123?utm_source=generator',
      height: 352,
    })
    expect(spotifyEmbed('https://open.spotify.com/track/9').height).toBe(152)
  })

  it('returns null for unusable links', () => {
    expect(spotifyEmbed('#')).toBeNull()
    expect(spotifyEmbed('https://open.spotify.com/')).toBeNull()
  })
})

describe('validateEnquiry', () => {
  const valid = { name: 'Thabo', email: 'thabo@example.co.za', service: 'Other', message: 'Hello there, bookings?' }

  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({})
  })

  it('flags each missing or malformed field', () => {
    const errors = validateEnquiry({ name: ' ', email: 'thabo@', service: '', message: 'hi' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'service'])
  })
})
