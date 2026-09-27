/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'framer-motion'

// Components use the lightweight `m` API, which needs the same LazyMotion
// provider App supplies for animations (including exit) to run.
function Providers({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

const renderWithProviders = (ui, options) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { renderWithProviders as render }
