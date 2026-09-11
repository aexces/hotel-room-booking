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

export type ThemeOrigin = {
  x: number
  y: number
}

type ViewTransition = {
  ready: Promise<void>
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function startViewTransition(update: () => void): ViewTransition | null {
  const start = (
    document as Document & {
      startViewTransition?: (callback: () => void) => ViewTransition
    }
  ).startViewTransition

  if (typeof start !== 'function') {
    return null
  }

  return start.call(document, update)
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function revealTheme(
  theme: Theme,
  origin: ThemeOrigin,
  update: () => void,
): void {
  const apply = (): void => {
    applyTheme(theme)
    update()
  }

  if (prefersReducedMotion()) {
    apply()
    return
  }

  const transition = startViewTransition(apply)
  if (!transition) {
    apply()
    return
  }

  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  )

  void transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: 560,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {
      return
    })
}

export function readDocumentTheme(): Theme | null {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') {
    return current
  }

  return null
}
