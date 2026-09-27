import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within, waitForElementToBeRemoved } from '../test/render'
import Releases from './Releases'
import { RELEASES } from '../data/releases'

const cards = () => within(screen.getAllByRole('list')[0]).getAllByRole('button')

describe('Releases', () => {
  it('shows the newest releases first and reveals the rest on demand', () => {
    render(<Releases />)
    expect(cards()).toHaveLength(8)
    expect(cards()[0]).toHaveTextContent(RELEASES[0].title)

    fireEvent.click(screen.getByRole('button', { name: `Show all ${RELEASES.length} releases` }))
    expect(cards()).toHaveLength(RELEASES.length)
    expect(screen.queryByRole('button', { name: /show all/i })).toBeNull()
  })

  it('filters the catalogue by artist', () => {
    render(<Releases />)
    const sab = screen.getByRole('button', { name: 'SAB' })
    fireEvent.click(sab)

    expect(sab).toHaveAttribute('aria-pressed', 'true')
    const expected = RELEASES.filter((r) => r.artist === 'SAB')
    expect(cards()).toHaveLength(expected.length)
    cards().forEach((card) => expect(card).toHaveTextContent('SAB'))
    expect(screen.getByText(`${expected.length} releases`)).toBeInTheDocument()
  })

  it('opens release details in a dialog and returns focus when closed with Escape', async () => {
    render(<Releases />)
    const card = cards()[0]
    card.focus()
    fireEvent.click(card)

    const dialog = screen.getByRole('dialog', { name: RELEASES[0].title })
    expect(within(dialog).getByRole('link', { name: /open in spotify/i })).toHaveAttribute(
      'href',
      RELEASES[0].links[0].href
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    await waitForElementToBeRemoved(dialog)
    expect(card).toHaveFocus()
  })

  it('only loads a streaming player after the visitor asks for it', () => {
    render(<Releases />)
    expect(document.querySelector('iframe')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /play the abafana belokishi playlist/i }))
    const iframe = document.querySelector('iframe')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('open.spotify.com/embed/playlist'))
  })

  it('switches streaming platforms with the tab list', () => {
    render(<Releases />)
    const tabs = screen.getByRole('tablist', { name: /streaming platform/i })
    fireEvent.click(within(tabs).getByRole('tab', { name: /soundcloud/i }))
    expect(within(tabs).getByRole('tab', { name: /soundcloud/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('link', { name: /open soundcloud/i })).toHaveAttribute('href', 'https://soundcloud.com/sabelomoloi07')
  })
})
