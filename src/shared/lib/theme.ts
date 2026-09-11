export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'hotel-booking-theme'

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    return null
  }

  return null
}

export function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    return
  }
}

export function systemTheme(
  media: Pick<MediaQueryList, 'matches'> = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ),
): Theme {
  return media.matches ? 'dark' : 'light'
}

export function resolveTheme(stored: Theme | null, system: Theme): Theme {
  return stored ?? system
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function readDocumentTheme(): Theme | null {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') {
    return current
  }

  return null
}
