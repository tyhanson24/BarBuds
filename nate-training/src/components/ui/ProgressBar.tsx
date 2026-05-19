export function ProgressBar({ value, max, color = '#c8102e' }: { value: number; max: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="w-full h-1.5 bg-ink-700 rounded-full overflow-hidden">
      <div className="h-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}
