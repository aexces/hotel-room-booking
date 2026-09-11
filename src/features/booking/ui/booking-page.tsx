import { useState } from 'react'
import { getExistingBookings } from '../data/existing-bookings.ts'
import { rooms } from '../data/rooms.ts'
import {
  addCalendarDays,
  todayIso,
  validateDateRange,
} from '../domain/date-range.ts'
import { isRoomBooked } from '../domain/overlap.ts'
import { nightsBetween, stayTotal } from '../domain/stay.ts'
import { Alert } from '../../../shared/ui/alert/alert.tsx'
import { DateRangeFields } from './date-range-fields.tsx'
import { dateRangeMessage } from './date-range-message.ts'
import { GuestFilter } from './guest-filter.tsx'
import { RoomList } from './room-list.tsx'
import { StaySummary } from './stay-summary.tsx'
import styles from './booking-page.module.css'

export function BookingPage() {
  const today = todayIso()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>(null)
  const [minGuests, setMinGuests] = useState(1)

  const dateIssue = validateDateRange(checkIn, checkOut, today)
  const nights = dateIssue ? null : nightsBetween(checkIn, checkOut)
  const bookings = getExistingBookings(today)
  const visibleRooms = rooms.filter((room) => room.maxGuests >= minGuests)

  const unavailableCodes = new Set(
    nights === null
      ? []
      : rooms
          .filter((room) =>
            isRoomBooked(room.code, { checkIn, checkOut }, bookings),
          )
          .map((room) => room.code),
  )

  const selectedRoom =
    visibleRooms.find((room) => room.code === selectedRoomCode) ?? null
  const selectedUnavailable = selectedRoom
    ? unavailableCodes.has(selectedRoom.code)
    : false

  const total =
    nights !== null && selectedRoom && !selectedUnavailable
      ? stayTotal(nights, selectedRoom.pricePerNight)
      : null

  const handleCheckInChange = (value: string): void => {
    setCheckIn(value)
    setSelectedRoomCode(null)
  }

  const handleCheckOutChange = (value: string): void => {
    setCheckOut(value)
    setSelectedRoomCode(null)
  }

  const showDatePrompt =
    dateIssue === 'missing-check-in' || dateIssue === 'missing-check-out'
  const showDateError =
    dateIssue === 'past-check-in' || dateIssue === 'checkout-not-after-check-in'
  const showRoomPrompt = !dateIssue && !selectedRoom
  const showBookedError = Boolean(selectedRoom && selectedUnavailable)

  return (
    <div className={styles.page}>
      <section className={styles.controls} aria-label="Stay details">
        <DateRangeFields
          checkIn={checkIn}
          checkOut={checkOut}
          minCheckIn={today}
          minCheckOut={
            checkIn ? addCalendarDays(checkIn, 1) : addCalendarDays(today, 1)
          }
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
        />
        <GuestFilter minGuests={minGuests} onChange={setMinGuests} />
      </section>

      {showDatePrompt && dateIssue ? (
        <Alert tone="info">{dateRangeMessage(dateIssue)}</Alert>
      ) : null}
      {showDateError && dateIssue ? (
        <Alert tone="error">{dateRangeMessage(dateIssue)}</Alert>
      ) : null}
      {showRoomPrompt ? (
        <Alert tone="info">Select a room to see nights and the total price.</Alert>
      ) : null}
      {showBookedError ? (
        <Alert tone="error">
          That room is already booked for these dates. Choose another room.
        </Alert>
      ) : null}

      <div className={styles.layout}>
        <RoomList
          rooms={visibleRooms}
          selectedRoomCode={selectedRoomCode}
          unavailableCodes={unavailableCodes}
          onSelect={setSelectedRoomCode}
        />
        <StaySummary
          checkIn={checkIn}
          checkOut={checkOut}
          nights={nights}
          room={selectedUnavailable ? null : selectedRoom}
          total={total}
        />
      </div>
    </div>
  )
}
