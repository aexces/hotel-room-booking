import { Field } from '../../../shared/ui/field/field.tsx'
import styles from './date-range-fields.module.css'

type DateRangeFieldsProps = {
  checkIn: string
  checkOut: string
  minCheckIn: string
  minCheckOut: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

export function DateRangeFields({
  checkIn,
  checkOut,
  minCheckIn,
  minCheckOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangeFieldsProps) {
  return (
    <div className={styles.fields}>
      <Field id="check-in" label="Check-in">
        <input
          id="check-in"
          type="date"
          name="checkIn"
          value={checkIn}
          min={minCheckIn}
          onChange={(event) => onCheckInChange(event.target.value)}
        />
      </Field>
      <Field id="check-out" label="Check-out">
        <input
          id="check-out"
          type="date"
          name="checkOut"
          value={checkOut}
          min={minCheckOut}
          onChange={(event) => onCheckOutChange(event.target.value)}
        />
      </Field>
    </div>
  )
}
