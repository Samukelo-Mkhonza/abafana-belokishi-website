import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
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
    for (const label of ['About', 'Artists', 'Releases', 'Podcast', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`
      )
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
