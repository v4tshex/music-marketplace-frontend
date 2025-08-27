import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'

vi.mock('../firebase', () => ({ auth: {} }))
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (_auth, cb) => {
    // default: not authed
    cb(null)
    return () => {}
  }
}))

describe('PrivateRoute', () => {
  it('redirects to /login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<PrivateRoute><div>Secret</div></PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument()
  })
})


