import type { DateRangeIssue } from '../domain/date-range.ts'

export function dateRangeMessage(issue: DateRangeIssue): string {
  if (issue === 'missing-check-in') {
    return 'Choose a check-in date.'
  }

  if (issue === 'missing-check-out') {
    return 'Choose a check-out date.'
  }

  if (issue === 'past-check-in') {
    return 'Check-in cannot be in the past.'
  }

  return 'Check-out must be after check-in.'
}
