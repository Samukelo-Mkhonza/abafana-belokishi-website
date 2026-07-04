import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

// The desktop nav anchors carry role="listitem"; the logo/mobile anchors
// keep the implicit link role.
const NAV = {
  About: '#about',
  Artists: '#artists',
  Releases: '#releases',
  Stream: '#soundcloud',
  Podcast: '#podcast',
  Contact: '#contact',
}

describe('Navbar', () => {
  it('renders every navigation item pointing at its section', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    for (const [label, href] of Object.entries(NAV)) {
      // Desktop nav anchors carry role="listitem", so query by text.
      expect(screen.getByText(label)).toHaveAttribute('href', href)
    }
  })

  it('toggles the mobile menu and updates its aria state', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const openBtn = screen.getByRole('button', { name: /open menu/i })
    expect(openBtn).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(openBtn)

    const closeBtn = screen.getByRole('button', { name: /close menu/i })
    expect(closeBtn).toHaveAttribute('aria-expanded', 'true')
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

    fireEvent.click(screen.getByText('About'))
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    section.remove()
  })
})
