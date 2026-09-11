const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

export type DateRangeIssue =
  | 'missing-check-in'
  | 'missing-check-out'
  | 'past-check-in'
  | 'checkout-not-after-check-in'

export function toIsoDate(date: Date): string {
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayIso(now: Date = new Date()): string {
  return toIsoDate(now)
}

export function parseIsoDate(value: string): Date | null {
  const match = ISO_DATE.exec(value)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

export function addCalendarDays(iso: string, days: number): string {
  const date = parseIsoDate(iso)
  if (!date) {
    throw new Error(`Invalid ISO date: ${iso}`)
  }

  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

export function calendarDayUtc(iso: string): number | null {
  const date = parseIsoDate(iso)
  if (!date) {
    return null
  }

  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
}

export function validateDateRange(
  checkIn: string,
  checkOut: string,
  today: string,
): DateRangeIssue | null {
  if (checkIn.trim() === '') {
    return 'missing-check-in'
  }

  if (checkOut.trim() === '') {
    return 'missing-check-out'
  }

  const checkInDay = calendarDayUtc(checkIn)
  const checkOutDay = calendarDayUtc(checkOut)
  const todayDay = calendarDayUtc(today)

  if (checkInDay === null || checkOutDay === null || todayDay === null) {
    return 'checkout-not-after-check-in'
  }

  if (checkInDay < todayDay) {
    return 'past-check-in'
  }

  if (checkOutDay <= checkInDay) {
    return 'checkout-not-after-check-in'
  }

  return null
}
