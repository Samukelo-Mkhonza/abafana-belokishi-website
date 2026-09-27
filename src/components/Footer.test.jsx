import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '../test/render'
import Footer from './Footer'

describe('Footer', () => {
  it('shows the current year in the copyright line', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year} Abafana Belokishi`))).toBeInTheDocument()
  })

  it('renders the footer navigation with anchor hrefs', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /footer navigation/i })
    const expected = { About: '#about', Artists: '#artists', Music: '#releases', Podcast: '#podcast', Contact: '#contact' }
    for (const [label, href] of Object.entries(expected)) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('opens external socials safely (target=_blank + rel=noreferrer)', () => {
    render(<Footer />)
    const youtube = screen.getByRole('link', { name: /YouTube/i })
    expect(youtube).toHaveAttribute('target', '_blank')
    expect(youtube).toHaveAttribute('rel', 'noreferrer')
    expect(youtube).toHaveAttribute(
      'href',
      'https://www.youtube.com/@abafanabelokishipodcast'
    )
  })

  it('only links social accounts that have a real URL', () => {
    render(<Footer />)
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toBe('#')
    }
  })

  it('smooth-scrolls to the target section when a nav link is clicked', () => {
    render(<Footer />)
    const section = document.createElement('section')
    section.id = 'about'
    document.body.appendChild(section)

    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    section.remove()
  })
})
