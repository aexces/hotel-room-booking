import type { ReactNode } from 'react'
import styles from './page-shell.module.css'

type PageShellProps = {
  title: string
  eyebrow: string
  actions: ReactNode
  children: ReactNode
}

export function PageShell({
  title,
  eyebrow,
  actions,
  children,
}: PageShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.actions}>{actions}</div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
