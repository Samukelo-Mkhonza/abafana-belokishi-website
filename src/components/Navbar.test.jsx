import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within, waitFor, waitForElementToBeRemoved } from '../test/render'
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

  it('opens the menu drawer as a dialog and updates the button state', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const openBtn = screen.getByRole('button', { name: /open menu/i })
    expect(openBtn).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(openBtn)

    expect(openBtn).toHaveAttribute('aria-expanded', 'true')
    const drawer = screen.getByRole('dialog', { name: 'Menu' })
    expect(within(drawer).getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
    expect(within(drawer).getByRole('button', { name: /close menu/i })).toHaveFocus()
    expect(document.documentElement).toHaveClass('scroll-locked')
  })

  it('closes the drawer with Escape, unlocks the page and returns focus to the menu button', async () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const openBtn = screen.getByRole('button', { name: /open menu/i })
    openBtn.focus()
    fireEvent.click(openBtn)
    const drawer = screen.getByRole('dialog', { name: 'Menu' })

    fireEvent.keyDown(document, { key: 'Escape' })
    await waitForElementToBeRemoved(drawer)

    expect(openBtn).toHaveAttribute('aria-expanded', 'false')
    expect(openBtn).toHaveFocus()
    expect(document.documentElement).not.toHaveClass('scroll-locked')
  })

  it('closes the drawer when the backdrop is tapped', async () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const drawer = screen.getByRole('dialog', { name: 'Menu' })
    fireEvent.click(document.querySelector('.drawer-backdrop'))
    await waitForElementToBeRemoved(drawer)
  })

  it('keeps Tab focus inside the drawer', () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const drawer = screen.getByRole('dialog', { name: 'Menu' })
    const controls = drawer.querySelectorAll('a[href], button')
    const last = controls[controls.length - 1]

    last.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(controls[0]).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()
  })

  it('closes the drawer and scrolls to the section when a menu link is tapped', async () => {
    render(<Navbar theme="light" onToggle={() => {}} />)
    const section = document.createElement('section')
    section.id = 'podcast'
    document.body.appendChild(section)

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const drawer = screen.getByRole('dialog', { name: 'Menu' })
    fireEvent.click(within(drawer).getByRole('link', { name: 'Podcast' }))

    await waitForElementToBeRemoved(drawer)
    await waitFor(() => expect(section.scrollIntoView).toHaveBeenCalled())
    expect(section).toHaveFocus()
    section.remove()
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
