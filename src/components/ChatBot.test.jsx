import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '../test/render'
import ChatBot from './ChatBot'

function openChat() {
  render(<ChatBot />)
  fireEvent.click(screen.getByRole('button', { name: /ask us/i }))
  return screen.getByRole('dialog', { name: /ask abafana belokishi/i })
}

describe('ChatBot', () => {
  it('starts closed with a launcher button', () => {
    render(<ChatBot />)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: /ask us/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens with a welcome message and focuses the input', () => {
    const dialog = openChat()
    expect(within(dialog).getByRole('log')).toHaveTextContent(/sawubona/i)
    expect(within(dialog).getByRole('textbox', { name: /ask a question/i })).toHaveFocus()
  })

  it('answers a typed question with links', () => {
    const dialog = openChat()
    const input = within(dialog).getByRole('textbox', { name: /ask a question/i })
    fireEvent.change(input, { target: { value: 'How do I book an artist?' } })
    fireEvent.submit(input.closest('form'))

    const log = within(dialog).getByRole('log')
    expect(log).toHaveTextContent('How do I book an artist?')
    expect(within(log).getByRole('link', { name: /whatsapp us/i })).toHaveAttribute('target', '_blank')
    expect(within(log).getByRole('link', { name: /enquiry form/i })).toHaveAttribute('href', '#contact')
    expect(input).toHaveValue('')
  })

  it('answers a quick reply', () => {
    const dialog = openChat()
    fireEvent.click(within(dialog).getByRole('button', { name: 'The podcast' }))
    expect(within(dialog).getByRole('link', { name: /watch on youtube/i })).toBeInTheDocument()
  })

  it('does not send an empty message', () => {
    const dialog = openChat()
    expect(within(dialog).getByRole('button', { name: 'Send' })).toBeDisabled()
  })

  it('closes on Escape and returns focus to the launcher', async () => {
    openChat()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(screen.getByRole('button', { name: /ask us/i })).toHaveFocus()
  })

  it('closes from the close button inside the panel', async () => {
    const dialog = openChat()
    fireEvent.click(within(dialog).getByRole('button', { name: /close chat/i }))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(screen.getByRole('button', { name: /ask us/i })).toHaveAttribute('aria-expanded', 'false')
  })
})
