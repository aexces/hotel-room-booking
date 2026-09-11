import { describe, expect, it } from 'vitest'
import { nightsBetween, stayTotal } from '../stay.ts'

describe('nightsBetween and stayTotal', () => {
  it('counts calendar nights and multiplies the nightly rate', () => {
    expect(nightsBetween('2026-09-11', '2026-09-13')).toBe(2)
    expect(stayTotal(2, 3500)).toBe(7000)
  })

  it('returns null for a zero-night stay', () => {
    expect(nightsBetween('2026-09-11', '2026-09-11')).toBeNull()
  })
})
