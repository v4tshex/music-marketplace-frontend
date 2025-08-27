import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import PaymentModal from '../components/PaymentModal'

describe('PaymentModal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders when open and calls onPaymentSuccess on valid submit', async () => {
    const onClose = vi.fn()
    const onPaymentSuccess = vi.fn()

    render(
      <PaymentModal
        isOpen={true}
        onClose={onClose}
        onPaymentSuccess={onPaymentSuccess}
        song={{ name: 'Track', track_artists: [{ artist: { name: 'Artist' } }] }}
        songType="spotify"
      />
    )

    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '4242424242424242' } })
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), { target: { value: '12/99' } })
    fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } })
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Tester' } })
    fireEvent.change(screen.getByPlaceholderText('john.doe@example.com'), { target: { value: 'john@example.com' } })

    fireEvent.click(screen.getByRole('button', { name: /pay £0.99/i }))

    await act(async () => {
      vi.runAllTimers()
    })

    expect(onPaymentSuccess).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})


