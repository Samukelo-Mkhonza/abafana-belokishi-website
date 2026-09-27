import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/render'
import Contact from './Contact'

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } })

const fillValidForm = () => {
  fill(/full name/i, 'Thabo Nkosi')
  fill(/email address/i, 'thabo@example.com')
  fill(/what's it about/i, 'Artist Booking')
  fill(/message/i, 'We would love King Fergo at our December festival.')
}

describe('Contact', () => {
  let originalLocation

  beforeEach(() => {
    originalLocation = window.location
    // Replace location so the mailto assignment on submit is observable
    // and does not trigger jsdom "navigation not implemented" noise.
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { href: '' },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    })
    vi.restoreAllMocks()
  })

  it('renders the direct contact channels with correct links', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /062 530 2863/ })).toHaveAttribute('href', 'tel:+27625302863')
    expect(screen.getByRole('link', { name: /abafanabelokishipodcasters@gmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:abafanabelokishipodcasters@gmail.com'
    )
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', 'https://wa.me/27625302863')
  })

  it('updates form fields as the user types', () => {
    render(<Contact />)
    fill(/full name/i, 'Thabo')
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Thabo')
  })

  it('shows inline errors and does not send when required fields are missing', () => {
    render(<Contact />)
    fill(/email address/i, 'not-an-email')
    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(window.location.href).toBe('')
    expect(screen.getByText(/tell us your name/i)).toBeInTheDocument()
    expect(screen.getByText(/doesn't look right/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(/full name/i)).toHaveFocus()
  })

  it('clears a field error once the user edits that field', () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }))
    expect(screen.getByText(/tell us your name/i)).toBeInTheDocument()
    fill(/full name/i, 'T')
    expect(screen.queryByText(/tell us your name/i)).toBeNull()
  })

  it('opens a prefilled mailto and shows a confirmation on valid submit', () => {
    render(<Contact />)
    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(window.location.href).toContain('mailto:abafanabelokishipodcasters@gmail.com')
    expect(window.location.href).toContain('Thabo')
    expect(screen.getByRole('status')).toHaveTextContent(/your message is ready/i)
    expect(screen.queryByLabelText(/full name/i)).toBeNull()
  })

  it('can send the enquiry through WhatsApp instead', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Contact />)
    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: /send on whatsapp/i }))

    expect(open).toHaveBeenCalledTimes(1)
    const url = open.mock.calls[0][0]
    expect(url).toMatch(/^https:\/\/wa\.me\/27625302863\?text=/)
    expect(decodeURIComponent(url)).toContain('Service: Artist Booking')
  })

  it('lets the visitor start a new enquiry after sending', () => {
    render(<Contact />)
    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }))
    fireEvent.click(screen.getByRole('button', { name: /send another enquiry/i }))
    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
  })
})
