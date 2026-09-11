import { PageShell } from '../shared/ui/page-shell/page-shell.tsx'
import { ThemeToggle } from '../shared/ui/theme-toggle/theme-toggle.tsx'
import { useTheme } from '../shared/lib/use-theme.ts'
import { BookingPage } from '../features/booking/ui/booking-page.tsx'

export function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <PageShell
      eyebrow="Raintech Stay"
      title="Hotel Room Booking"
      description="Pick your dates and a room. We’ll show the number of nights and the total in Indian rupees."
      actions={<ThemeToggle theme={theme} onToggle={toggleTheme} />}
    >
      <BookingPage />
    </PageShell>
  )
}
