import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns'
import type { DayOfWeek } from '../types'
import { PROGRAM_START_DATE } from '../data/program'

export interface ProgramDay {
  week: number
  day: DayOfWeek
  dayOfProgram: number
  date: string
  isBeforeStart: boolean
  isAfterEnd: boolean
}

export function getProgramDayFromDate(d: Date, startISO: string = PROGRAM_START_DATE): ProgramDay {
  const start = parseISO(startISO)
  const diff = differenceInCalendarDays(d, start)
  const clamped = Math.max(0, Math.min(83, diff))
  const week = Math.floor(clamped / 7) + 1
  const day = ((clamped % 7) + 1) as DayOfWeek
  return {
    week,
    day,
    dayOfProgram: clamped + 1,
    date: format(d, 'yyyy-MM-dd'),
    isBeforeStart: diff < 0,
    isAfterEnd: diff > 83,
  }
}

export function dateFromWeekDay(week: number, day: DayOfWeek, startISO: string = PROGRAM_START_DATE): Date {
  const start = parseISO(startISO)
  return addDays(start, (week - 1) * 7 + (day - 1))
}

export function formatWeekDay(week: number, day: DayOfWeek): string {
  const date = dateFromWeekDay(week, day)
  return format(date, 'EEE · MMM d')
}

export function dayName(day: DayOfWeek): string {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day - 1]!
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd')
}
