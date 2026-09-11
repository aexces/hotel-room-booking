import { addCalendarDays } from '../domain/date-range.ts'
import type { ExistingBooking } from '../domain/room.ts'

export function getExistingBookings(today: string): readonly ExistingBooking[] {
  return [
    { roomCode: 'R101', checkIn: addCalendarDays(today, 1), checkOut: addCalendarDays(today, 4) },
    { roomCode: 'R201', checkIn: addCalendarDays(today, 7), checkOut: addCalendarDays(today, 10) },
    { roomCode: 'R301', checkIn: addCalendarDays(today, 14), checkOut: addCalendarDays(today, 16) },
  ]
}
