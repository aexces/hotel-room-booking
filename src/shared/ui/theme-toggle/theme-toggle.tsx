import type { Theme, ThemeOrigin } from '../../lib/theme.ts'
import styles from './theme-toggle.module.css'

type ThemeToggleProps = {
  theme: Theme
  onToggle: (origin: ThemeOrigin) => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        onToggle({
          x: event.clientX || rect.left + rect.width / 2,
          y: event.clientY || rect.top + rect.height / 2,
        })
      }}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? (
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M12 4.5a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12A.75.75 0 0 1 12 4.5Zm6.01 1.48a.75.75 0 0 1 1.06 1.06l-.01.01a.75.75 0 0 1-1.06-1.06ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5ZM4.5 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 12Zm14.25-.75a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1 0-1.5ZM5.93 17.96a.75.75 0 0 1 1.06 0 .75.75 0 0 1 0 1.06l-.01.01a.75.75 0 1 1-1.06-1.06Zm12.14 0a.75.75 0 0 1 1.06 1.06l-.01.01a.75.75 0 1 1-1.06-1.06ZM12 18.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V19.25A.75.75 0 0 1 12 18.5ZM5.93 6.04a.75.75 0 0 1 1.06-1.06l.01.01A.75.75 0 1 1 5.93 6.04Z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M16.5 13.2A7 7 0 0 1 10.8 7.5 6.2 6.2 0 0 1 12 5.5 8.5 8.5 0 1 0 18.5 12a6.2 6.2 0 0 1-2 1.2Z"
            />
          </svg>
        )}
      </span>
      <span className={styles.copy}>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
