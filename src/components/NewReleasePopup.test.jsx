import { describe, it, expect } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import NewReleasePopup from './NewReleasePopup'

// The popup reveals itself 1500ms after mount and animates out via
// AnimatePresence, so these tests use real timers and wait for the
// dialog to appear / be removed.
describe('NewReleasePopup', () => {
  const findDialog = () =>
    screen.findByRole('dialog', { name: /new release/i }, { timeout: 3000 })

  it('stays hidden until the reveal delay elapses', async () => {
    render(<NewReleasePopup />)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(await findDialog()).toBeInTheDocument()
  })

  it('presents the latest release details', async () => {
    render(<NewReleasePopup />)
    await findDialog()
    expect(
      screen.getByRole('heading', { name: /echoes of tomorrow/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /listen on spotify/i })
    ).toHaveAttribute('href', 'https://open.spotify.com/album/1TVLfIlPfcs3g73lcZB85U')
  })

  it('dismisses when the close button is pressed', async () => {
    render(<NewReleasePopup />)
    const dialog = await findDialog()
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    await waitForElementToBeRemoved(dialog, { timeout: 3000 })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('dismisses when Escape is pressed', async () => {
    render(<NewReleasePopup />)
    const dialog = await findDialog()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitForElementToBeRemoved(dialog, { timeout: 3000 })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
