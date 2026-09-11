import { parseIsoDate, toIsoDate } from './date-range.ts'

export type CalendarDay = {
  iso: string
  inMonth: boolean
}

export function monthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1)
  const mondayOffset = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - mondayOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return {
      iso: toIsoDate(day),
      inMonth: day.getMonth() === month,
    }
  })
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const next = new Date(year, month + delta, 1)
  return { year: next.getFullYear(), month: next.getMonth() }
}

export function visibleMonth(
  selectedIso: string,
  fallbackIso: string,
): { year: number; month: number } {
  const date = parseIsoDate(selectedIso) ?? parseIsoDate(fallbackIso)
  if (!date) {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }

  return { year: date.getFullYear(), month: date.getMonth() }
}

export function canOpenPreviousMonth(
  year: number,
  month: number,
  minIso: string,
): boolean {
  const minDate = parseIsoDate(minIso)
  if (!minDate) {
    return true
  }

  if (year > minDate.getFullYear()) {
    return true
  }

  if (year < minDate.getFullYear()) {
    return false
  }

  return month > minDate.getMonth()
}

export function formatMonthTitle(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1))
}

export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
