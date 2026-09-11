import { useEffect, useId, useRef, useState } from 'react'
import { calendarDayUtc } from '../domain/date-range.ts'
import {
  canOpenPreviousMonth,
  formatMonthTitle,
  monthGrid,
  shiftMonth,
  visibleMonth,
  weekdayLabels,
} from '../domain/calendar-month.ts'
import { formatIsoDate } from './format-iso-date.ts'
import { cx } from '../../../shared/lib/cx.ts'
import styles from './date-picker.module.css'

type DatePickerProps = {
  id: string
  label: string
  value: string
  min: string
  today: string
  rangeStart?: string
  rangeEnd?: string
  onChange: (iso: string) => void
}

export function DatePicker({
  id,
  label,
  value,
  min,
  today,
  rangeStart = '',
  rangeEnd = '',
  onChange,
}: DatePickerProps) {
  const dialogId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => visibleMonth(value, min))

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const days = monthGrid(view.year, view.month)
  const canGoBack = canOpenPreviousMonth(view.year, view.month, min)

  const toggleOpen = (): void => {
    if (open) {
      setOpen(false)
      return
    }

    setView(visibleMonth(value, min))
    setOpen(true)
  }

  const selectDay = (iso: string): void => {
    onChange(iso)
    setOpen(false)
  }

  return (
    <div className={styles.wrap} ref={rootRef}>
      <button
        type="button"
        id={id}
        className={cx(styles.trigger, !value && styles.placeholder)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={toggleOpen}
      >
        <span>{value ? formatIsoDate(value) : `Select ${label.toLowerCase()}`}</span>
        <CalendarIcon />
      </button>
      {open ? (
        <div
          className={styles.dialog}
          id={dialogId}
          role="dialog"
          aria-label={`Choose ${label.toLowerCase()} date`}
        >
          <div className={styles.monthBar}>
            <button
              type="button"
              className={styles.nav}
              aria-label="Previous month"
              disabled={!canGoBack}
              onClick={() => setView((current) => shiftMonth(current.year, current.month, -1))}
            >
              ‹
            </button>
            <p className={styles.monthTitle}>{formatMonthTitle(view.year, view.month)}</p>
            <button
              type="button"
              className={styles.nav}
              aria-label="Next month"
              onClick={() => setView((current) => shiftMonth(current.year, current.month, 1))}
            >
              ›
            </button>
          </div>
          <div className={styles.weekdays} aria-hidden="true">
            {weekdayLabels.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className={styles.grid} role="group" aria-label={formatMonthTitle(view.year, view.month)}>
            {days.map((day) => {
              const disabled = isBeforeMin(day.iso, min)
              const selected = day.iso === value
              const inRange = isInRange(day.iso, rangeStart, rangeEnd)
              const isStart = rangeStart !== '' && day.iso === rangeStart
              const isEnd = rangeEnd !== '' && day.iso === rangeEnd
              const isToday = day.iso === today

              return (
                <button
                  key={day.iso}
                  type="button"
                  disabled={disabled}
                  aria-label={formatIsoDate(day.iso)}
                  aria-pressed={selected}
                  aria-current={isToday ? 'date' : undefined}
                  className={cx(
                    styles.day,
                    !day.inMonth && styles.outside,
                    selected && styles.selected,
                    (isStart || isEnd) && styles.rangeEdge,
                    inRange && styles.inRange,
                    isToday && styles.today,
                  )}
                  onClick={() => selectDay(day.iso)}
                >
                  {Number(day.iso.slice(-2))}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function isBeforeMin(iso: string, min: string): boolean {
  const day = calendarDayUtc(iso)
  const minDay = calendarDayUtc(min)
  if (day === null || minDay === null) {
    return false
  }

  return day < minDay
}

function isInRange(iso: string, start: string, end: string): boolean {
  if (start === '' || end === '') {
    return false
  }

  const day = calendarDayUtc(iso)
  const from = calendarDayUtc(start)
  const to = calendarDayUtc(end)
  if (day === null || from === null || to === null) {
    return false
  }

  return day > from && day < to
}

function CalendarIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 3.75a.75.75 0 0 1 1.5 0V5h7V3.75a.75.75 0 0 1 1.5 0V5H19a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.75V3.75ZM4.5 10.5v8.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-8.5h-15Z"
      />
    </svg>
  )
}
