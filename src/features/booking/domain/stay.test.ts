import { describe, expect, it } from 'vitest'
import { validateDateRange } from './date-range.ts'
import { dateRangesOverlap, isRoomBooked } from './overlap.ts'
import { nightsBetween, stayTotal } from './stay.ts'

const today = '2026-09-11'

describe('validateDateRange', () => {
  it('rejects a check-in date before today', () => {
    expect(validateDateRange('2026-09-10', '2026-09-12', today)).toBe(
      'past-check-in',
    )
  })

  it('allows checking in today', () => {
    expect(validateDateRange('2026-09-11', '2026-09-12', today)).toBeNull()
  })

  it('rejects same-day checkout', () => {
    expect(validateDateRange('2026-09-11', '2026-09-11', today)).toBe(
      'checkout-not-after-check-in',
    )
  })

  it('rejects checkout before check-in', () => {
    expect(validateDateRange('2026-09-14', '2026-09-12', today)).toBe(
      'checkout-not-after-check-in',
    )
  })

  it('reports missing dates', () => {
    expect(validateDateRange('', '2026-09-12', today)).toBe('missing-check-in')
    expect(validateDateRange('2026-09-12', '', today)).toBe('missing-check-out')
  })
})

describe('nightsBetween and stayTotal', () => {
  it('counts calendar nights and multiplies the nightly rate', () => {
    expect(nightsBetween('2026-09-11', '2026-09-13')).toBe(2)
    expect(stayTotal(2, 3500)).toBe(7000)
  })

  it('returns null for a zero-night stay', () => {
    expect(nightsBetween('2026-09-11', '2026-09-11')).toBeNull()
  })
})

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
