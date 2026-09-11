import type { Room } from '../../domain/room.ts'
import { RoomOption } from '../room-option/room-option.tsx'
import styles from './room-list.module.css'

type RoomListProps = {
  rooms: readonly Room[]
  selectedRoomCode: string | null
  unavailableCodes: ReadonlySet<string>
  onSelect: (roomCode: string) => void
}

export function RoomList({
  rooms,
  selectedRoomCode,
  unavailableCodes,
  onSelect,
}: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <p className={styles.empty} role="status">
        No rooms match that guest count. Try a smaller group.
      </p>
    )
  }

  return (
    <div className={styles.list} role="radiogroup" aria-label="Hotel rooms">
      {rooms.map((room) => (
        <RoomOption
          key={room.code}
          room={room}
          selected={selectedRoomCode === room.code}
          unavailable={unavailableCodes.has(room.code)}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
