import { useEffect, useState } from 'react'
import { Check, ChevronRight, Dumbbell, Zap, Activity as ActivityIcon, Target, Flame, Heart, Wind, MoveRight } from 'lucide-react'
import type { Exercise, ExerciseLog, SetLog } from '../../types'

const CATEGORY_ICON: Record<Exercise['category'], typeof Dumbbell> = {
  warmup: Heart,
  speed: Zap,
  plyo: Zap,
  agility: MoveRight,
  main: Dumbbell,
  accessory: Dumbbell,
  core: Target,
  conditioning: Flame,
  mobility: Wind,
  position: ActivityIcon,
}

export function ExerciseRow({
  exercise,
  log,
  onSave,
}: {
  exercise: Exercise
  log: ExerciseLog | undefined
  onSave: (next: Omit<ExerciseLog, 'workoutId' | 'date'>) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [sets, setSets] = useState<SetLog[]>(() =>
    log?.setLogs?.length ? log.setLogs : Array.from({ length: exercise.sets }, () => ({})),
  )
  const [completed, setCompleted] = useState(log?.completed ?? false)

  useEffect(() => {
    if (log) {
      setSets(log.setLogs.length ? log.setLogs : Array.from({ length: exercise.sets }, () => ({})))
      setCompleted(log.completed)
    }
  }, [log, exercise.sets])

  const Icon = CATEGORY_ICON[exercise.category] ?? Dumbbell

  function commit(nextSets: SetLog[], nextCompleted: boolean) {
    onSave({ exerciseId: exercise.id, setLogs: nextSets, completed: nextCompleted })
  }

  function updateSet(idx: number, patch: Partial<SetLog>) {
    setSets((prev) => {
      const next = prev.map((s, i) => (i === idx ? { ...s, ...patch } : s))
      commit(next, completed)
      return next
    })
  }

  function toggleComplete() {
    const next = !completed
    setCompleted(next)
    commit(sets, next)
  }

  return (
    <div
      className={`border-l-2 ${completed ? 'border-signal-green/70' : 'border-ink-600'} bg-ink-800 rounded-r-md overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-3 py-3 flex items-center gap-3 text-left active:bg-ink-700/60"
      >
        <Icon size={18} className="text-steel shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-cream truncate font-medium">{exercise.name}</span>
            <span className="font-mono text-sm text-cream/90 whitespace-nowrap">
              {exercise.sets} × {exercise.reps}
            </span>
          </div>
          {(exercise.load || exercise.effort || exercise.rest) && (
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              {exercise.load && <span className="font-mono text-ripon-light">{exercise.load}</span>}
              {exercise.effort && (
                <span className="font-mono text-steel">{exercise.effort}</span>
              )}
              {exercise.rest && (
                <span className="font-mono text-steel">rest {exercise.rest}</span>
              )}
            </div>
          )}
          {exercise.note && (
            <div className="mt-1 text-xs italic text-steel">{exercise.note}</div>
          )}
        </div>
        <ChevronRight
          size={18}
          className={`text-steel transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-ink-700/60">
          <div className="grid grid-cols-[28px_1fr_1fr_64px] gap-2 text-[10px] uppercase tracking-wide text-steel font-display pt-2">
            <span>SET</span>
            <span>WEIGHT</span>
            <span>REPS</span>
            <span className="text-center">RPE</span>
          </div>
          {sets.map((s, i) => (
            <div key={i} className="grid grid-cols-[28px_1fr_1fr_64px] gap-2 items-center">
              <span className="font-mono text-cream/70 text-sm">{i + 1}</span>
              <input
                inputMode="decimal"
                placeholder={exercise.load ?? '—'}
                value={s.weight ?? ''}
                onChange={(e) => updateSet(i, { weight: e.target.value })}
                className="min-h-[44px] bg-ink-900 border border-ink-600 rounded px-2 text-base font-mono text-cream focus:border-ripon focus:outline-none"
              />
              <input
                inputMode="numeric"
                placeholder={exercise.reps}
                value={s.reps ?? ''}
                onChange={(e) => updateSet(i, { reps: e.target.value })}
                className="min-h-[44px] bg-ink-900 border border-ink-600 rounded px-2 text-base font-mono text-cream focus:border-ripon focus:outline-none"
              />
              <input
                inputMode="numeric"
                placeholder="—"
                value={s.rpe ?? ''}
                onChange={(e) => {
                  const n = e.target.value === '' ? undefined : Number(e.target.value)
                  updateSet(i, { rpe: n })
                }}
                className="min-h-[44px] bg-ink-900 border border-ink-600 rounded px-2 text-base font-mono text-cream text-center focus:border-ripon focus:outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={toggleComplete}
            className={`mt-2 w-full min-h-[44px] py-2 rounded font-display tracking-wider text-sm uppercase flex items-center justify-center gap-2 ${
              completed
                ? 'bg-signal-green/15 text-signal-green border border-signal-green/40'
                : 'bg-ink-700 text-cream border border-ink-600'
            }`}
          >
            <Check size={16} /> {completed ? 'Done' : 'Mark Exercise Done'}
          </button>
        </div>
      )}
    </div>
  )
}
