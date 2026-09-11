import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import {
  applyTheme,
  readDocumentTheme,
  readStoredTheme,
  resolveTheme,
  revealTheme,
  systemTheme,
  writeStoredTheme,
  type Theme,
  type ThemeOrigin,
} from './theme.ts'

export function useTheme(): {
  theme: Theme
  toggleTheme: (origin: ThemeOrigin) => void
} {
  const [theme, setTheme] = useState<Theme>(() => {
    const fromDocument = readDocumentTheme()
    if (fromDocument) {
      return fromDocument
    }

    return resolveTheme(readStoredTheme(), systemTheme())
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (readStoredTheme()) {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (): void => {
      if (!readStoredTheme()) {
        setTheme(systemTheme(media))
      }
    }

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [])

  const toggleTheme = (origin: ThemeOrigin): void => {
    const next = theme === 'dark' ? 'light' : 'dark'
    writeStoredTheme(next)
    revealTheme(next, origin, () => {
      flushSync(() => {
        setTheme(next)
      })
    })
  }

  return { theme, toggleTheme }
}
