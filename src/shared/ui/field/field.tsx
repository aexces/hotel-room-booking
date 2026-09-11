import type { ReactNode } from 'react'
import styles from './field.module.css'

type FieldProps = {
  id: string
  label: string
  children: ReactNode
  hint?: string
}

export function Field({ id, label, children, hint }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  )
}
