import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'
import styles from './alert.module.css'

type AlertProps = {
  tone: 'error' | 'info'
  children: ReactNode
}

export function Alert({ tone, children }: AlertProps) {
  return (
    <div
      className={cx(styles.alert, tone === 'error' ? styles.error : styles.info)}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  )
}
