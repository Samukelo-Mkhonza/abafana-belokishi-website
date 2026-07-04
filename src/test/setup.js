import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { MotionGlobalConfig } from 'framer-motion'

// Make framer-motion animations resolve instantly so AnimatePresence
// exit transitions don't leave elements mounted during assertions.
MotionGlobalConfig.skipAnimations = true

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

// jsdom does not implement matchMedia; default to the light scheme.
// Individual tests override this when they need a specific preference.
window.matchMedia = window.matchMedia || function matchMedia(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }
}

// jsdom does not implement IntersectionObserver (used by Navbar).
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.IntersectionObserver = IntersectionObserverStub

// jsdom does not implement scrollIntoView (used by nav/footer links).
window.HTMLElement.prototype.scrollIntoView = vi.fn()
