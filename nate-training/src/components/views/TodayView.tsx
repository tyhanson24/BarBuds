import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { DayOfWeek } from '../../types'
import { useWorkoutData } from '../../hooks/useWorkoutData'
import { WorkoutDetail } from '../workout/WorkoutDetail'
import { dateFromWeekDay, formatWeekDay } from '../../lib/date'
import { differenceInCalendarDays } from 'date-fns'

export function TodayView({
  week,
  day,
  onChangeDay,
}: {
  week: number
  day: DayOfWeek
  onChangeDay: (w: number, d: DayOfWeek) => void
}) {
  const { workout, completion, logs, saving, upsertLog, markComplete } = useWorkoutData(week, day)
  const dayOfProgram = (week - 1) * 7 + day

  function shift(delta: number) {
    const total = (week - 1) * 7 + (day - 1) + delta
    if (total < 0 || total > 83) return
    const newWeek = Math.floor(total / 7) + 1
    const newDay = ((total % 7) + 1) as DayOfWeek
    onChangeDay(newWeek, newDay)
  }

  // Swipe handling
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0]?.clientX ?? null
    startY.current = e.touches[0]?.clientY ?? null
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null || startY.current === null) return
    const endX = e.changedTouches[0]?.clientX ?? startX.current
    const endY = e.changedTouches[0]?.clientY ?? startY.current
    const dx = endX - startX.current
    const dy = endY - startY.current
    if (Math.abs(dx) > 60 && Math.abs(dy) < 40) {
      if (dx < 0) shift(1)
      else shift(-1)
    }
    startX.current = null
    startY.current = null
  }

  return (
    <div className="flex-1 overflow-y-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <DayNav week={week} day={day} onPrev={() => shift(-1)} onNext={() => shift(1)} />
      <WorkoutDetail
        workout={workout}
        logs={logs}
        completion={completion}
        onSaveLog={(exerciseId, next) => upsertLog(exerciseId, next)}
        onMarkComplete={markComplete}
        saving={saving}
        dateLabel={formatWeekDay(week, day)}
        dayOfProgram={dayOfProgram}
      />
    </div>
  )
}

function DayNav({
  week,
  day,
  onPrev,
  onNext,
}: {
  week: number
  day: DayOfWeek
  onPrev: () => void
  onNext: () => void
}) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  const target = dateFromWeekDay(week, day)
  const diff = differenceInCalendarDays(target, now)
  const relative =
    diff === 0
      ? 'TODAY'
      : diff === -1
        ? 'YESTERDAY'
        : diff === 1
          ? 'TOMORROW'
          : diff < 0
            ? `${Math.abs(diff)} DAYS AGO`
            : `IN ${diff} DAYS`

  const atStart = week === 1 && day === 1
  const atEnd = week === 12 && day === 7
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-ink-800/60 border-b border-ink-600">
      <button
        onClick={onPrev}
        disabled={atStart}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-cream disabled:text-steel/40 disabled:cursor-not-allowed"
        aria-label="Previous day"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="font-display tracking-widest text-xs uppercase text-cream text-center px-2">
        {relative} · {formatWeekDay(week, day)}
      </div>
      <button
        onClick={onNext}
        disabled={atEnd}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-cream disabled:text-steel/40 disabled:cursor-not-allowed"
        aria-label="Next day"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
