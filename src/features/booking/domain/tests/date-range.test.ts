import { describe, expect, it } from 'vitest'
import { validateDateRange } from '../date-range.ts'

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
