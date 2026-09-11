import { Field } from '../../../shared/ui/field/field.tsx'
import styles from './guest-filter.module.css'

type GuestFilterProps = {
  minGuests: number
  onChange: (minGuests: number) => void
}

export function GuestFilter({ minGuests, onChange }: GuestFilterProps) {
  return (
    <div className={styles.filter}>
      <Field id="min-guests" label="Guests">
        <select
          id="min-guests"
          name="minGuests"
          value={String(minGuests)}
          onChange={(event) => onChange(Number(event.target.value))}
        >
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4</option>
        </select>
      </Field>
    </div>
  )
}
