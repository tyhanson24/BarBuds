import type { Phase } from '../../types'
import { phaseName, phaseColor } from '../../data/program'

export function PhaseBadge({ phase, compact = false }: { phase: Phase; compact?: boolean }) {
  const color = phaseColor(phase)
  return (
    <span
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-display tracking-wider text-xs uppercase"
      style={{ backgroundColor: color, color: '#0a0a0a' }}
    >
      <span className="font-bold">Phase {phase}</span>
      {!compact && <span className="opacity-80">· {phaseName(phase)}</span>}
    </span>
  )
}
