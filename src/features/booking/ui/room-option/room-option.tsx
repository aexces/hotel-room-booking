import type { Room } from '../../domain/room.ts'
import { formatInr } from '../../../../shared/lib/format-inr.ts'
import { cx } from '../../../../shared/lib/cx.ts'
import styles from './room-option.module.css'

type RoomOptionProps = {
  room: Room
  selected: boolean
  unavailable: boolean
  onSelect: (roomCode: string) => void
}

export function RoomOption({
  room,
  selected,
  unavailable,
  onSelect,
}: RoomOptionProps) {
  return (
    <label
      className={cx(
        styles.card,
        selected && styles.selected,
        unavailable && styles.unavailable,
      )}
    >
      <input
        className={styles.input}
        type="radio"
        name="room"
        value={room.code}
        checked={selected}
        disabled={unavailable}
        onChange={() => onSelect(room.code)}
      />
      <span className={styles.top}>
        <span className={styles.code}>{room.code}</span>
        {unavailable ? (
          <span className={styles.badge}>Unavailable for these dates</span>
        ) : (
          <span className={styles.guests}>Up to {room.maxGuests} guests</span>
        )}
      </span>
      <strong className={styles.type}>{room.type}</strong>
      <span className={styles.price}>
        {formatInr(room.pricePerNight)}
        <span className={styles.per}> / night</span>
      </span>
    </label>
  )
}
