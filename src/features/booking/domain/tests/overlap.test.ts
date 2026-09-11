import { describe, expect, it } from 'vitest'
import { dateRangesOverlap, isRoomBooked } from '../overlap.ts'

describe('date range overlap', () => {
  it('treats the checkout day as free', () => {
    expect(
      dateRangesOverlap(
        { checkIn: '2026-09-11', checkOut: '2026-09-13' },
        { checkIn: '2026-09-13', checkOut: '2026-09-15' },
      ),
    ).toBe(false)
  })

  it('flags a room that is already booked for overlapping dates', () => {
    expect(
      isRoomBooked(
        'R101',
        { checkIn: '2026-09-12', checkOut: '2026-09-14' },
        [{ roomCode: 'R101', checkIn: '2026-09-11', checkOut: '2026-09-13' }],
      ),
    ).toBe(true)
  })
})
