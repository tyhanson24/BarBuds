import { Settings as SettingsIcon } from 'lucide-react'
import type { Phase, DayOfWeek } from '../../types'
import { dayName } from '../../lib/date'

export function Header({
  week,
  day,
  phase,
  onSettings,
}: {
  week: number
  day: DayOfWeek
  phase: Phase
  onSettings?: () => void
}) {
  return (
    <header className="sticky top-0 z-30 h-[60px] bg-ink-900/95 backdrop-blur border-b border-ink-600 px-4 flex items-center justify-between">
      <div className="font-display text-2xl tracking-widest text-ripon">RIPON</div>
      <div className="font-display tracking-wider text-sm text-cream/90 flex items-baseline gap-2">
        <span>WK {week}</span>
        <span className="text-steel">·</span>
        <span>{dayName(day).toUpperCase()}</span>
        <span className="text-steel">·</span>
        <span style={{ color: phaseColorHex(phase) }}>P{phase}</span>
      </div>
      <button
        onClick={onSettings}
        className="text-steel hover:text-cream p-1 -mr-1"
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
    </header>
  )
}

function phaseColorHex(phase: Phase): string {
  return ({ 1: '#c8102e', 2: '#ff6b35', 3: '#ffb020', 4: '#00d27a' } as const)[phase]
}
