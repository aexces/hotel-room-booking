import { calendarDayUtc } from './date-range.ts'

export function nightsBetween(checkIn: string, checkOut: string): number | null {
  const start = calendarDayUtc(checkIn)
  const end = calendarDayUtc(checkOut)

  if (start === null || end === null) {
    return null
  }

  const nights = (end - start) / 86_400_000
  if (!Number.isInteger(nights) || nights <= 0) {
    return null
  }

  return nights
}

export function stayTotal(nights: number, pricePerNight: number): number {
  return nights * pricePerNight
}
