import type { Room } from '../domain/room.ts'
import { formatInr } from '../../../shared/lib/format-inr.ts'
import { formatIsoDate } from './format-iso-date.ts'
import styles from './stay-summary.module.css'

type StaySummaryProps = {
  checkIn: string
  checkOut: string
  nights: number | null
  room: Room | null
  total: number | null
}

export function StaySummary({
  checkIn,
  checkOut,
  nights,
  room,
  total,
}: StaySummaryProps) {
  return (
    <aside className={styles.panel} aria-live="polite">
      <h2 className={styles.heading}>Stay summary</h2>
      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Check-in</dt>
          <dd>{checkIn ? formatIsoDate(checkIn) : 'Choose a date'}</dd>
        </div>
        <div className={styles.row}>
          <dt>Check-out</dt>
          <dd>{checkOut ? formatIsoDate(checkOut) : 'Choose a date'}</dd>
        </div>
        <div className={styles.row}>
          <dt>Room</dt>
          <dd>{room ? `${room.code} · ${room.type}` : 'Select a room'}</dd>
        </div>
        <div className={styles.row}>
          <dt>Nights</dt>
          <dd>{nights ?? '—'}</dd>
        </div>
        {room ? (
          <div className={styles.row}>
            <dt>Per night</dt>
            <dd>{formatInr(room.pricePerNight)}</dd>
          </div>
        ) : null}
      </dl>
      <p className={styles.total}>
        <span>Total</span>
        <strong>{total !== null ? formatInr(total) : '—'}</strong>
      </p>
    </aside>
  )
}
