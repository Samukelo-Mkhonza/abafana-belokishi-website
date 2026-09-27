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
})
