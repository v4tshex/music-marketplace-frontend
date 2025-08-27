import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import MusicPlayer from '../components/MusicPlayer'

describe('MusicPlayer', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true })
  })

  it('renders title and artist and audio element', () => {
    const { container } = render(<MusicPlayer src="/test.mp3" title="Song A" artist="Artist X" id="123" />)
    expect(screen.getByText('Song A')).toBeInTheDocument()
    expect(screen.getByText(/by Artist X/)).toBeInTheDocument()
    expect(container.querySelector('audio')).not.toBeNull()
  })

  it('calls increment play on play event when id provided', async () => {
    const { container } = render(<MusicPlayer src="/t.mp3" title="T" artist="A" id="abc" />)
    const audio = container.querySelector('audio')
    audio.dispatchEvent(new Event('play'))
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/songs/abc/play', { method: 'POST' })
  })
})


