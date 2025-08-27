import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LogoutButton from '../components/LogoutButton'

vi.mock('../firebase', () => ({ auth: {} }))
vi.mock('firebase/auth', () => ({ signOut: vi.fn().mockResolvedValue(undefined) }))

describe('LogoutButton', () => {
  it('renders and triggers sign out on click', async () => {
    const { signOut } = await import('firebase/auth')
    delete window.location
    window.location = { href: '/' }

    render(<LogoutButton />)
    const button = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(button)

    expect(signOut).toHaveBeenCalled()
  })
})


