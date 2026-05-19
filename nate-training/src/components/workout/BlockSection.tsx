import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Block, ExerciseLog } from '../../types'
import { ExerciseRow } from './ExerciseRow'

export function BlockSection({
  block,
  logs,
  onSaveLog,
}: {
  block: Block
  logs: Record<string, ExerciseLog>
  onSaveLog: (exerciseId: string, next: Omit<ExerciseLog, 'workoutId' | 'date'>) => void
}) {
  const [open, setOpen] = useState(true)
  return (
    <section className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2"
      >
        <div className="flex items-baseline gap-2">
          <h3 className="font-display tracking-widest text-cream uppercase text-lg">{block.name}</h3>
          {block.duration && <span className="text-xs font-mono text-steel">{block.duration}</span>}
        </div>
        <ChevronDown
          size={18}
          className={`text-steel transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && (
        <div className="space-y-2">
          {block.exercises.map((ex) => (
            <ExerciseRow
              key={ex.id}
              exercise={ex}
              log={logs[ex.id]}
              onSave={(next) => onSaveLog(ex.id, next)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
