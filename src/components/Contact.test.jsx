import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Contact from './Contact'

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
  })

  it('renders the direct contact channels with correct links', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: '062 530 2863' })).toHaveAttribute(
      'href',
      'tel:+27625302863'
    )
    expect(
      screen.getByRole('link', { name: 'abafanabelokishipodcasters@gmail.com' })
    ).toHaveAttribute('href', 'mailto:abafanabelokishipodcasters@gmail.com')
  })

  it('updates form fields as the user types', () => {
    render(<Contact />)
    const name = screen.getByLabelText(/full name/i)
    fireEvent.change(name, { target: { value: 'Thabo' } })
    expect(name).toHaveValue('Thabo')
  })

  it('opens a prefilled mailto and shows a confirmation on submit', () => {
    render(<Contact />)
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Thabo' },
    })
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'thabo@example.com' },
    })

    const form = screen.getByRole('button', { name: /send enquiry/i }).closest('form')
    fireEvent.submit(form)

    expect(window.location.href).toContain('mailto:abafanabelokishipodcasters@gmail.com')
    expect(window.location.href).toContain('Thabo')
    expect(screen.getByText(/enquiry sent/i)).toBeInTheDocument()
    // The form is replaced by the confirmation panel.
    expect(screen.queryByLabelText(/full name/i)).toBeNull()
  })
})
