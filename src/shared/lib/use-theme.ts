import { useEffect, useState } from 'react'
import {
  applyTheme,
  readDocumentTheme,
  readStoredTheme,
  resolveTheme,
  systemTheme,
  writeStoredTheme,
  type Theme,
} from './theme.ts'

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
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

  const toggleTheme = (): void => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      writeStoredTheme(next)
      return next
    })
  }

  return { theme, toggleTheme }
}
