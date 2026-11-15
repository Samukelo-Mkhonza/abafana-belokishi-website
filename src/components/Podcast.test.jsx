import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '../test/render'
import Podcast from './Podcast'
import { CHANNELS } from '../data/site'

describe('Podcast', () => {
  it('names the episode under the still', () => {
    render(<Podcast />)
    expect(screen.getByRole('heading', { name: 'Nosipho Ncayiyana' })).toBeInTheDocument()
    expect(screen.getByText('Episode 1')).toBeInTheDocument()
  })

  it('lists where to watch as two rows of the same kind', () => {
    render(<Podcast />)
    const rows = within(screen.getAllByRole('list')[0]).getAllByRole('link')
    expect(rows).toHaveLength(2)
    expect(rows[0]).toHaveAccessibleName('Full episodes on YouTube')
    expect(rows[0]).toHaveAttribute('href', CHANNELS.youtube)
    expect(rows[1]).toHaveAccessibleName('Short clips on TikTok')
    expect(rows[1]).toHaveAttribute('href', CHANNELS.tiktok)
    rows.forEach((row) => expect(row).toHaveClass('link-row'))
  })

  it('only loads the YouTube player once play is pressed', () => {
    render(<Podcast />)
    expect(document.querySelector('iframe')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /play episode 1 with nosipho ncayiyana/i }))
    expect(document.querySelector('iframe')).toHaveAttribute('src', CHANNELS.podcastEpisodeEmbed)
  })
})
