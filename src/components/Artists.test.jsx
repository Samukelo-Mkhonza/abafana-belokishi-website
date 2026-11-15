import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within, waitForElementToBeRemoved } from '../test/render'
import Artists from './Artists'

describe('Artists', () => {
  it('lists every artist on the roster', () => {
    render(<Artists />)
    for (const name of ['King Fergo', 'Structure', 'SAB', 'Assign']) {
      expect(screen.getByRole('button', { name: new RegExp(name) })).toBeInTheDocument()
    }
  })

  it("prints each artist's genre on their line of the roster", () => {
    render(<Artists />)
    const row = screen.getByRole('button', { name: /^Assign/ })
    expect(within(row).getByText('Hip-hop')).toBeInTheDocument()
  })

  it('opens a profile with only real social links, and closes it', async () => {
    render(<Artists />)
    fireEvent.click(screen.getByRole('button', { name: /^SAB/ }))

    const dialog = screen.getByRole('dialog', { name: 'SAB' })
    const links = within(dialog).getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => expect(link.getAttribute('href')).not.toBe('#'))

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
    await waitForElementToBeRemoved(dialog)
  })

  it('wraps Tab focus from the last control back to the first inside the profile', () => {
    render(<Artists />)
    fireEvent.click(screen.getByRole('button', { name: /^King Fergo/ }))
    const dialog = screen.getByRole('dialog', { name: 'King Fergo' })
    const controls = dialog.querySelectorAll('a[href], button')
    const first = controls[0]
    const last = controls[controls.length - 1]

    last.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(first).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()
  })

  it("lists the artist's newest releases in the profile, each linked to where it plays", () => {
    render(<Artists />)
    fireEvent.click(screen.getByRole('button', { name: /^King Fergo/ }))
    const dialog = screen.getByRole('dialog', { name: 'King Fergo' })
    const releases = within(dialog).getByRole('region', { name: /latest releases by king fergo/i })

    const links = within(releases).getAllByRole('link')
    expect(links).toHaveLength(4)
    expect(links[0]).toHaveAccessibleName(/ngiyam'thanda.*on spotify/i)
    expect(links[0]).toHaveAttribute('href', 'https://open.spotify.com/album/1WQSuk54VomPv8GDE6Msya')
  })

  it('leaves the releases list out for an artist with none under their own name', () => {
    render(<Artists />)
    fireEvent.click(screen.getByRole('button', { name: /^Structure/ }))
    const dialog = screen.getByRole('dialog', { name: 'Structure' })
    expect(within(dialog).queryByRole('region', { name: /latest releases/i })).toBeNull()
  })

  it('keeps the player as a single bar until it is played', () => {
    render(<Artists />)
    fireEvent.click(screen.getByRole('button', { name: /^SAB/ }))
    const dialog = screen.getByRole('dialog', { name: 'SAB' })
    expect(dialog.querySelector('iframe')).toBeNull()

    fireEvent.click(within(dialog).getByRole('button', { name: /play sab on spotify/i }))
    expect(dialog.querySelector('iframe')).toHaveAttribute('title', 'SAB on Spotify')
  })
})
