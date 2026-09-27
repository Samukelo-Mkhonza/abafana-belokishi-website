import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within, waitForElementToBeRemoved } from '../test/render'
import Navbar from './Navbar'

const NAV = {
  About: '#about',
  Artists: '#artists',
  Music: '#releases',
  Podcast: '#podcast',
  Contact: '#contact',
}

describe('Navbar', () => {
  it('renders every navigation item pointing at its section', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    for (const [label, href] of Object.entries(NAV)) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('toggles the mobile menu and updates its aria state', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const openBtn = screen.getByRole('button', { name: /open menu/i })
    expect(openBtn).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(openBtn)

    const closeBtn = screen.getByRole('button', { name: /close menu/i })
    expect(closeBtn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
  })

  it('closes the mobile menu with Escape', async () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitForElementToBeRemoved(() => screen.queryByRole('navigation', { name: /mobile navigation/i }))
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('forwards theme toggling to the provided handler', () => {
    const onToggle = vi.fn()
    render(<Navbar theme="dark" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('smooth-scrolls to the section when a nav link is activated', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const section = document.createElement('section')
    section.id = 'about'
    document.body.appendChild(section)

    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    section.remove()
  })
})
