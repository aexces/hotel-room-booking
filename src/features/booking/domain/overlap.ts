import { calendarDayUtc } from './date-range.ts'
import type { ExistingBooking } from './room.ts'

export type DateRange = {
  checkIn: string
  checkOut: string
}

export function dateRangesOverlap(a: DateRange, b: DateRange): boolean {
  const aStart = calendarDayUtc(a.checkIn)
  const aEnd = calendarDayUtc(a.checkOut)
  const bStart = calendarDayUtc(b.checkIn)
  const bEnd = calendarDayUtc(b.checkOut)

  if (aStart === null || aEnd === null || bStart === null || bEnd === null) {
    return false
  }

  return aStart < bEnd && bStart < aEnd
}

export function isRoomBooked(
  roomCode: string,
  stay: DateRange,
  bookings: readonly ExistingBooking[],
): boolean {
  return bookings.some(
    (booking) =>
      booking.roomCode === roomCode &&
      dateRangesOverlap(stay, {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      }),
  )
}
