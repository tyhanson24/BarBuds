import { useMemo } from 'react'
import { getProgramDayFromDate } from '../lib/date'

export function useCurrentDay() {
  return useMemo(() => getProgramDayFromDate(new Date()), [])
}
