import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SongCard from '../components/SongCard'

vi.mock('../components/MusicPlayer', () => ({
  __esModule: true,
  default: ({ title, artist }) => <div data-testid="mock-player">{title} - {artist}</div>
}))

describe('SongCard', () => {
  it('renders song meta and player', () => {
    const song = {
      id: '1',
      title: 'Hello',
      artist: 'World',
      album: 'Album',
      trackNumber: 2,
      genre: 'Pop',
      fileUrl: '/f.mp3',
      imageUrl: '/img.jpg',
      explicit: true
    }
    render(<ul><SongCard song={song} /></ul>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText(/by World/)).toBeInTheDocument()
    expect(screen.getByTestId('mock-player')).toHaveTextContent('Hello - World')
  })
})


