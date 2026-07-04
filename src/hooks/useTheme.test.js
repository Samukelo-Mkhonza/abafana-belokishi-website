import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('uses the persisted theme when one is stored', () => {
    localStorage.setItem('ab-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('falls back to the OS preference (dark) when nothing is stored', () => {
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    try {
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('dark')
    } finally {
      window.matchMedia = original
    }
  })

  it('falls back to light when the OS preference is not dark', () => {
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
    try {
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('light')
    } finally {
      window.matchMedia = original
    }
  })

  it('reflects the theme on <html data-theme> and persists it', () => {
    localStorage.setItem('ab-theme', 'light')
    renderHook(() => useTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('ab-theme')).toBe('light')
  })

  it('toggle flips between light and dark and persists each change', () => {
    localStorage.setItem('ab-theme', 'light')
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('ab-theme')).toBe('dark')

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('ab-theme')).toBe('light')
  })
})
