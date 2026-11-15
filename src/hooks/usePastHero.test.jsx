import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test/render'
import { usePastHero } from './usePastHero'
import NewReleasePopup from '../components/NewReleasePopup'
import ChatBot from '../components/ChatBot'

function Probe() {
  return <output>{usePastHero() ? 'past' : 'at hero'}</output>
}

// Stands in for the foot of the hero, placed wherever a test needs it.
function placeHeroFoot(bottom) {
  const foot = document.createElement('div')
  foot.setAttribute('data-hero-foot', '')
  foot.getBoundingClientRect = () => ({ bottom })
  document.body.append(foot)
  return (next) => {
    foot.getBoundingClientRect = () => ({ bottom: next })
    fireEvent.scroll(window)
  }
}

afterEach(() => {
  document.querySelectorAll('[data-hero-foot]').forEach((el) => el.remove())
})

describe('usePastHero', () => {
  it('is true on a page with no hero', () => {
    render(<Probe />)
    expect(screen.getByText('past')).toBeInTheDocument()
  })

  it('turns true once the foot of the hero has scrolled clear of the corner', async () => {
    const moveTo = placeHeroFoot(window.innerHeight)
    render(<Probe />)
    expect(screen.getByText('at hero')).toBeInTheDocument()

    moveTo(window.innerHeight * 0.5)
    expect(await screen.findByText('past')).toBeInTheDocument()

    moveTo(window.innerHeight)
    expect(await screen.findByText('at hero')).toBeInTheDocument()
  })
})

describe('corner widgets at the top of the page', () => {
  it('holds the new-release card back until the hero is scrolled past, then keeps it', async () => {
    const moveTo = placeHeroFoot(window.innerHeight)
    render(<NewReleasePopup />)
    await new Promise((resolve) => setTimeout(resolve, 1700))
    expect(screen.queryByRole('dialog')).toBeNull()

    moveTo(0)
    expect(await screen.findByRole('dialog', { name: /new release/i })).toBeInTheDocument()

    // Scrolling back up must not pull the card away again.
    moveTo(window.innerHeight)
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(screen.getByRole('dialog', { name: /new release/i })).toBeInTheDocument()
  })

  it('tucks the chat button away over the hero and brings it out below it', async () => {
    const moveTo = placeHeroFoot(window.innerHeight)
    render(<ChatBot />)
    const launcher = screen.getByRole('button', { name: /ask us/i })
    expect(launcher).toHaveClass('chat-launcher--away')

    moveTo(0)
    await waitFor(() => expect(launcher).not.toHaveClass('chat-launcher--away'))
  })
})
