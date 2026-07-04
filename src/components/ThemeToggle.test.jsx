import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('labels the action as switching to dark when currently light', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />)
    expect(
      screen.getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument()
  })

  it('labels the action as switching to light when currently dark', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />)
    expect(
      screen.getByRole('button', { name: /switch to light mode/i })
    ).toBeInTheDocument()
  })

  it('invokes onToggle when clicked', () => {
    const onToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
