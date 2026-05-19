import { useMemo } from 'react'
import type { DayOfWeek, WorkoutCompletion } from '../../types'
import { getAllWorkouts } from '../../data/workouts'
import { phaseColor } from '../../data/program'
import { useCompletions } from '../../hooks/useCompletions'
import { dayName, formatWeekDay } from '../../lib/date'

export function ProgramView({
  selectedWeek,
  selectedDay,
  onSelect,
}: {
  selectedWeek: number
  selectedDay: DayOfWeek
  onSelect: (week: number, day: DayOfWeek) => void
}) {
  const { completions } = useCompletions()
  const grid = useMemo(() => {
    const weeks: { week: number; days: ReturnType<typeof getAllWorkouts> }[] = []
    const all = getAllWorkouts()
    for (let w = 1; w <= 12; w++) {
      weeks.push({ week: w, days: all.filter((x) => x.week === w) })
    }
    return weeks
  }, [])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
      <h1 className="font-display text-3xl tracking-wider uppercase text-cream">Program</h1>
      <p className="text-xs text-steel font-mono">12 weeks · 84 days · 4 phases · Aug 11 camp</p>
      <div className="grid grid-cols-[auto_1fr] gap-1 items-center">
        <div />
        <div className="grid grid-cols-7 gap-1 text-[10px] text-steel font-display tracking-widest uppercase text-center">
          {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        {grid.map(({ week, days }) => (
          <WeekRow
            key={week}
            week={week}
            workouts={days}
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            completions={completions}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function WeekRow({
  week,
  workouts,
  selectedWeek,
  selectedDay,
  completions,
  onSelect,
}: {
  week: number
  workouts: ReturnType<typeof getAllWorkouts>
  selectedWeek: number
  selectedDay: DayOfWeek
  completions: Record<string, WorkoutCompletion>
  onSelect: (week: number, day: DayOfWeek) => void
}) {
  return (
    <>
      <span className="font-display tracking-widest text-xs uppercase text-steel pr-2">W{week}</span>
      <div className="grid grid-cols-7 gap-1">
        {workouts.map((w) => {
          const isSelected = w.week === selectedWeek && w.day === selectedDay
          const isComplete = !!completions[w.id]
          const phasecolor = phaseColor(w.phase)
          return (
            <button
              key={w.id}
              onClick={() => onSelect(w.week, w.day)}
              className={`aspect-square flex items-center justify-center text-[10px] font-mono rounded-sm border ${
                isSelected ? 'ring-2 ring-ripon ring-offset-1 ring-offset-ink-900' : ''
              } ${
                isComplete
                  ? 'bg-ink-700 text-cream border-signal-green/60'
                  : w.rest
                    ? 'bg-ink-800 text-steel border-ink-700'
                    : 'bg-ink-800 text-cream/80 border-ink-700'
              }`}
              style={{ borderLeftWidth: 3, borderLeftColor: phasecolor }}
              title={`${formatWeekDay(w.week, w.day)} · ${w.type}`}
            >
              {w.rest ? '—' : dayName(w.day)[0]}
            </button>
          )
        })}
      </div>
    </>
  )
}
