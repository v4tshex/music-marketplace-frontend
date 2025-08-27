import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

vi.mock('../firebase', () => {
  return {
    auth: {},
  }
})

vi.mock('firebase/auth', async (orig) => {
  return {
    onAuthStateChanged: (_auth, cb) => {
      cb(null)
      return () => {}
    },
    signOut: vi.fn(),
  }
})

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
  })

  it('renders brand and login link', () => {
    expect(screen.getByText(/Music Marketplace/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument()
  })
})


