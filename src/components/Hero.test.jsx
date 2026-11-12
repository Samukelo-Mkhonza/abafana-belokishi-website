import { describe, it, expect } from 'vitest'
import { render, screen, within } from '../test/render'
import Hero from './Hero'
import { ARTISTS } from '../data/artists'
import { FEATURED_RELEASE } from '../data/releases'

describe('Hero', () => {
  it('sets the tagline as the page heading', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /born from the township\.\s*built for the world\./i })
    ).toBeInTheDocument()
  })

  it('lines up a photo of every artist', () => {
    render(<Hero />)
    const lineup = screen.getByRole('list', { name: /the artists/i })
    for (const artist of ARTISTS) {
      expect(within(lineup).getByRole('img', { name: artist.name })).toBeInTheDocument()
    }
  })

  it('shows the featured release with its Spotify link', () => {
    render(<Hero />)
    const sleeve = screen.getByRole('complementary', { name: /latest release/i })
    expect(within(sleeve).getByText(FEATURED_RELEASE.title)).toBeInTheDocument()
    const spotify = FEATURED_RELEASE.links.find((l) => l.label === 'Spotify')
    expect(within(sleeve).getByRole('link', { name: /spotify/i })).toHaveAttribute('href', spotify.href)
  })

  it('keeps the release ticker out of the accessibility tree', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('.ticker')).toHaveAttribute('aria-hidden', 'true')
  })
})
