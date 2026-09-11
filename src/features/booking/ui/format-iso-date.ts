import { parseIsoDate } from '../domain/date-range.ts'

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatIsoDate(iso: string): string {
  const date = parseIsoDate(iso)
  if (!date) {
    return iso
  }

  return dateFormatter.format(date)
}
