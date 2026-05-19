import { useState } from 'react'
import { Check, Clock } from 'lucide-react'
import type { Workout, ExerciseLog } from '../../types'
import { BlockSection } from './BlockSection'
import { PhaseBadge } from '../ui/PhaseBadge'
import { phaseColor } from '../../data/program'
import { CompleteWorkoutModal } from './CompleteWorkoutModal'
import type { WorkoutCompletion } from '../../types'

export function WorkoutDetail({
  workout,
  logs,
  completion,
  onSaveLog,
  onMarkComplete,
  saving,
  dateLabel,
  dayOfProgram,
}: {
  workout: Workout
  logs: Record<string, ExerciseLog>
  completion: WorkoutCompletion | null
  onSaveLog: (exerciseId: string, next: Omit<ExerciseLog, 'workoutId' | 'date'>) => void
  onMarkComplete: (data: { notes?: string; kneeFeel?: number; soreness?: number }) => Promise<void> | void
  saving: boolean
  dateLabel: string
  dayOfProgram: number
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const color = phaseColor(workout.phase)

  if (workout.rest) {
    return (
      <article className="px-4 py-6 space-y-3">
        <PhaseBadge phase={workout.phase} />
        <div className="font-mono text-[11px] tracking-wider text-steel uppercase">{dateLabel} · Day {dayOfProgram} / 84</div>
        <h1 className="font-display text-4xl tracking-wider text-cream uppercase">{workout.title}</h1>
        <div className="border-l-4 pl-3" style={{ borderColor: color }}>
          {(workout.notes ?? []).map((n, i) => (
            <p key={i} className="text-cream/90">{n}</p>
          ))}
        </div>
      </article>
    )
  }

  return (
    <article className="px-4 py-5 space-y-4 pb-32">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <PhaseBadge phase={workout.phase} />
          <span className="font-mono text-[11px] tracking-wider text-steel uppercase">
            Day {dayOfProgram} / 84
          </span>
        </div>
        <div className="font-mono text-[11px] tracking-wider text-steel uppercase">{dateLabel}</div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wider text-cream uppercase leading-tight">
          {workout.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-steel">
          <span className="flex items-center gap-1 font-mono">
            <Clock size={12} /> {workout.duration}
          </span>
          <span className="font-mono">{workout.type}</span>
        </div>
      </div>

      {workout.notes && workout.notes.length > 0 && (
        <div className="border-l-4 bg-ink-800 py-2 px-3 rounded-r-md space-y-1" style={{ borderColor: color }}>
          {workout.notes.map((n, i) => (
            <p key={i} className="text-sm text-cream/90">
              {n}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {workout.blocks.map((b) => (
          <BlockSection key={b.name} block={b} logs={logs} onSaveLog={onSaveLog} />
        ))}
      </div>

      <div className="fixed left-0 right-0 bottom-[64px] px-4 pt-3 pb-3 bg-gradient-to-t from-ink-900 via-ink-900/95 to-ink-900/0">
        <button
          onClick={() => setModalOpen(true)}
          disabled={saving}
          className={`w-full py-3.5 rounded font-display tracking-widest text-base uppercase flex items-center justify-center gap-2 ${
            completion
              ? 'bg-signal-green/15 text-signal-green border border-signal-green/40'
              : 'bg-ripon text-cream active:bg-ripon-dark'
          } disabled:opacity-50`}
        >
          <Check size={18} />
          {completion ? 'Completed — Update' : 'Mark Workout Complete'}
        </button>
      </div>

      <CompleteWorkoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        saving={saving}
        onSubmit={async (data) => {
          await onMarkComplete(data)
          setModalOpen(false)
        }}
      />
    </article>
  )
}
