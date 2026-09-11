import { Field } from '../../../../shared/ui/field/field.tsx'
import { DatePicker } from '../date-picker/date-picker.tsx'
import styles from './date-range-fields.module.css'

type DateRangeFieldsProps = {
  checkIn: string
  checkOut: string
  minCheckIn: string
  minCheckOut: string
  today: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

export function DateRangeFields({
  checkIn,
  checkOut,
  minCheckIn,
  minCheckOut,
  today,
  onCheckInChange,
  onCheckOutChange,
}: DateRangeFieldsProps) {
  return (
    <div className={styles.fields}>
      <Field id="check-in" label="Check-in">
        <DatePicker
          id="check-in"
          label="Check-in"
          value={checkIn}
          min={minCheckIn}
          today={today}
          rangeStart={checkIn}
          rangeEnd={checkOut}
          onChange={onCheckInChange}
        />
      </Field>
      <Field id="check-out" label="Check-out">
        <DatePicker
          id="check-out"
          label="Check-out"
          value={checkOut}
          min={minCheckOut}
          today={today}
          rangeStart={checkIn}
          rangeEnd={checkOut}
          onChange={onCheckOutChange}
        />
      </Field>
    </div>
  )
}
