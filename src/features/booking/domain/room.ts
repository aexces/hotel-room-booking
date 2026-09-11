export type Room = {
  code: string
  type: string
  pricePerNight: number
  maxGuests: number
}

export type ExistingBooking = {
  roomCode: string
  checkIn: string
  checkOut: string
}
