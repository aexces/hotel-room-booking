import { describe, expect, it } from 'vitest'
import {
  canOpenPreviousMonth,
  monthGrid,
  shiftMonth,
} from './calendar-month.ts'

describe('monthGrid', () => {
  it('starts on Monday and includes the first of the month', () => {
    const cells = monthGrid(2026, 8)

    expect(cells).toHaveLength(42)
    expect(cells[0]?.iso).toBe('2026-08-31')
    expect(cells.some((cell) => cell.iso === '2026-09-01' && cell.inMonth)).toBe(
      true,
    )
    expect(cells.some((cell) => cell.iso === '2026-09-30' && cell.inMonth)).toBe(
      true,
    )
  })
})

describe('calendar month navigation', () => {
  it('shifts into the next year', () => {
    expect(shiftMonth(2026, 11, 1)).toEqual({ year: 2027, month: 0 })
  })

  it('blocks months before the minimum date', () => {
    expect(canOpenPreviousMonth(2026, 8, '2026-09-11')).toBe(false)
    expect(canOpenPreviousMonth(2026, 9, '2026-09-11')).toBe(true)
  })
})
