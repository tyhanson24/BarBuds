import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Check, Flame, Calendar, Bed } from 'lucide-react'
import type { DayOfWeek, Workout, WorkoutCompletion } from '../../types'
import { getAllWorkouts } from '../../data/workouts'
import { PHASES, phaseColor, phaseName } from '../../data/program'
import { useCompletions } from '../../hooks/useCompletions'
import { dayName, dateFromWeekDay } from '../../lib/date'
import { format, isToday } from 'date-fns'

export function ProgramView({
  selectedWeek,
  selectedDay,
  currentWeek,
  currentDay,
  onSelect,
}: {
  selectedWeek: number
  selectedDay: DayOfWeek
  currentWeek: number
  currentDay: DayOfWeek
  onSelect: (week: number, day: DayOfWeek) => void
}) {
  const { completions } = useCompletions()
  const [openWeek, setOpenWeek] = useState<number>(currentWeek)
  const weekRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const grouped = useMemo(() => {
    const all = getAllWorkouts()
    const map: Record<number, Workout[]> = {}
    for (let w = 1; w <= 12; w++) map[w] = all.filter((x) => x.week === w)
    return map
  }, [])

  useEffect(() => {
    const el = weekRefs.current[openWeek]
    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [openWeek])

  const totalDone = Object.keys(completions).length
  const adherencePct = Math.round((totalDone / 84) * 100)
  const daysToCamp = Math.max(0, 84 - ((currentWeek - 1) * 7 + currentDay))

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      <div className="px-4 pt-5 pb-4 space-y-3 border-b border-ink-700/60">
        <h1 className="font-display text-3xl tracking-wider uppercase text-cream">Program</h1>
        <div className="grid grid-cols-3 gap-2">
          <Tile label="Day" value={`${Math.min(84, (currentWeek - 1) * 7 + currentDay)}`} sub="of 84" />
          <Tile label="Done" value={`${totalDone}`} sub={`${adherencePct}%`} />
          <Tile label="To camp" value={`${daysToCamp}`} sub="days" />
        </div>

        <div className="grid grid-cols-4 gap-1">
          {PHASES.map((p) => {
            const c = phaseColor(p.id)
            const isCurrent = currentWeek >= p.weeks[0]! && currentWeek <= p.weeks[p.weeks.length - 1]!
            return (
              <button
                key={p.id}
                onClick={() => setOpenWeek(p.weeks[0]!)}
                className={`min-h-[60px] text-left p-2 rounded border ${isCurrent ? 'border-cream/40' : 'border-ink-600'} active:bg-ink-700`}
                style={{ background: `linear-gradient(180deg, ${c}26 0%, transparent 100%)` }}
              >
                <div className="font-display tracking-widest text-[10px] uppercase" style={{ color: c }}>P{p.id}</div>
                <div className="font-display tracking-wide text-[11px] uppercase text-cream leading-tight mt-0.5">
                  {p.name.split(' & ')[0]}
                </div>
                <div className="text-[10px] font-mono text-steel mt-0.5">W{p.weeks[0]}–{p.weeks[p.weeks.length - 1]}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="divide-y divide-ink-700/60">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
          <WeekCard
            key={w}
            ref={(el) => { weekRefs.current[w] = el }}
            week={w}
            workouts={grouped[w]!}
            isOpen={openWeek === w}
            onToggle={() => setOpenWeek(openWeek === w ? -1 : w)}
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            currentWeek={currentWeek}
            currentDay={currentDay}
            completions={completions}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function Tile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink-800 border border-ink-700 rounded p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-steel font-display">{label}</div>
      <div className="font-mono text-2xl text-cream leading-none mt-1">{value}</div>
      <div className="text-[10px] font-mono text-steel mt-0.5">{sub}</div>
    </div>
  )
}

interface WeekCardProps {
  week: number
  workouts: Workout[]
  isOpen: boolean
  onToggle: () => void
  selectedWeek: number
  selectedDay: DayOfWeek
  currentWeek: number
  currentDay: DayOfWeek
  completions: Record<string, WorkoutCompletion>
  onSelect: (week: number, day: DayOfWeek) => void
}

const WeekCard = forwardRef<HTMLDivElement, WeekCardProps>(function WeekCard(
  { week, workouts, isOpen, onToggle, selectedWeek, selectedDay, currentWeek, currentDay, completions, onSelect },
  ref,
) {
  const phase = workouts[0]?.phase ?? 1
  const color = phaseColor(phase)
  const doneInWeek = workouts.filter((w) => completions[w.id]).length
  const trainingDays = workouts.filter((w) => !w.rest).length
  const isCurrent = week === currentWeek
  const startDate = dateFromWeekDay(week, 1)
  const endDate = dateFromWeekDay(week, 7)

  return (
    <div ref={ref} className="bg-ink-900">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center gap-3 active:bg-ink-800 min-h-[60px]"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <div className="flex flex-col items-center justify-center w-12 shrink-0">
          <span className="font-display tracking-widest text-[10px] uppercase text-steel">Wk</span>
          <span className="font-display text-3xl leading-none text-cream">{week}</span>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display tracking-widest text-[10px] uppercase" style={{ color }}>PHASE {phase}</span>
            {isCurrent && (
              <span className="font-display tracking-widest text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-ripon text-cream">NOW</span>
            )}
          </div>
          <div className="font-display tracking-wide text-sm uppercase text-cream truncate mt-0.5">
            {phaseName(phase)}
          </div>
          <div className="text-[11px] font-mono text-steel mt-0.5">
            {format(startDate, 'MMM d')} – {format(endDate, 'MMM d')}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-lg text-cream leading-none">
            {doneInWeek}<span className="text-steel text-sm">/{trainingDays}</span>
          </div>
          <div className="text-[10px] font-mono text-steel mt-0.5">done</div>
        </div>
      </button>

      {isOpen && (
        <div className="bg-ink-900/40 border-t border-ink-700/40 divide-y divide-ink-700/40">
          {workouts.map((w) => (
            <DayRow
              key={w.id}
              workout={w}
              completed={!!completions[w.id]}
              isSelected={w.week === selectedWeek && w.day === selectedDay}
              isToday={w.week === currentWeek && w.day === currentDay}
              isPast={
                w.week < currentWeek ||
                (w.week === currentWeek && w.day < currentDay)
              }
              onSelect={() => onSelect(w.week, w.day)}
            />
          ))}
        </div>
      )}
    </div>
  )
})

function DayRow({
  workout,
  completed,
  isSelected,
  isToday: today,
  isPast,
  onSelect,
}: {
  workout: Workout
  completed: boolean
  isSelected: boolean
  isToday: boolean
  isPast: boolean
  onSelect: () => void
}) {
  const date = dateFromWeekDay(workout.week, workout.day)
  const todayCheck = isToday(date)
  const isHighlight = today || todayCheck

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full min-h-[60px] px-4 py-3 flex items-center gap-3 active:bg-ink-800/70 text-left ${
        isSelected ? 'bg-ink-800' : ''
      }`}
    >
      <div className="w-10 shrink-0 flex flex-col items-center">
        <span className={`font-display tracking-widest text-[10px] uppercase ${isHighlight ? 'text-ripon' : 'text-steel'}`}>
          {dayName(workout.day)}
        </span>
        <span className={`font-mono text-base leading-tight ${isPast || isHighlight ? 'text-cream' : 'text-cream/70'}`}>
          {format(date, 'd')}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        {workout.rest ? (
          <div className="flex items-center gap-1.5 text-steel">
            <Bed size={14} />
            <span className="text-sm uppercase tracking-wider font-display">Rest</span>
          </div>
        ) : (
          <>
            <div className="text-sm text-cream truncate flex items-center gap-1.5">
              {workout.type.toLowerCase().includes('test') && (
                <Flame size={12} className="text-signal-amber shrink-0" />
              )}
              <span className="truncate">{workout.type}</span>
            </div>
            <div className="text-[11px] font-mono text-steel mt-0.5">{workout.duration}</div>
          </>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {isHighlight && !completed && (
          <span className="font-display tracking-widest text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-ripon text-cream">
            Today
          </span>
        )}
        {completed && (
          <span className="text-signal-green flex items-center gap-1">
            <Check size={16} />
          </span>
        )}
        {!completed && !workout.rest && isPast && (
          <span className="text-steel/50 text-[10px] font-mono uppercase">missed</span>
        )}
        {workout.rest && !isPast && (
          <Calendar size={14} className="text-steel/50" />
        )}
      </div>
    </button>
  )
}
