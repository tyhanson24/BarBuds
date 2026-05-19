import { useState } from 'react'
import { X } from 'lucide-react'

export function CompleteWorkoutModal({
  open,
  onClose,
  onSubmit,
  saving,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: { kneeFeel: number; soreness: number; notes: string }) => void
  saving: boolean
}) {
  const [kneeFeel, setKneeFeel] = useState(7)
  const [soreness, setSoreness] = useState(4)
  const [notes, setNotes] = useState('')

  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 bg-ink-900/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-ink-800 border border-ink-600 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 space-y-4 max-h-[90dvh] overflow-y-auto" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display tracking-widest text-xl uppercase text-cream">Mark Complete</h2>
          <button onClick={onClose} className="text-steel hover:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center -m-1" aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <Scale label="Knee feel" value={kneeFeel} onChange={setKneeFeel} hintLow="bad" hintHigh="great" />
        <Scale label="Soreness" value={soreness} onChange={setSoreness} hintLow="none" hintHigh="brutal" />
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-display">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Anything to flag?"
            className="w-full bg-ink-900 border border-ink-600 rounded px-3 py-2 text-base text-cream focus:border-ripon focus:outline-none"
          />
        </div>
        <button
          disabled={saving}
          onClick={() => onSubmit({ kneeFeel, soreness, notes })}
          className="w-full min-h-[48px] py-3 bg-ripon text-cream font-display tracking-widest text-base uppercase rounded disabled:opacity-50 active:bg-ripon-dark"
        >
          {saving ? 'Saving…' : 'Save & Lock In'}
        </button>
      </div>
    </div>
  )
}

function Scale({
  label,
  value,
  onChange,
  hintLow,
  hintHigh,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  hintLow: string
  hintHigh: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] uppercase tracking-wider text-steel font-display">{label}</span>
        <span className="font-mono text-cream text-lg">{value}/10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ripon"
      />
      <div className="flex justify-between text-[10px] text-steel mt-0.5 font-mono">
        <span>{hintLow}</span>
        <span>{hintHigh}</span>
      </div>
    </div>
  )
}
