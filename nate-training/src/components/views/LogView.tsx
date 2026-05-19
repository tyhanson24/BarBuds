import { useEffect, useState } from 'react'
import { getAllCompletions, getAllTestResults } from '../../lib/storage'
import type { WorkoutCompletion, TestResult } from '../../types'
import { TARGETS } from '../../data/program'

export function LogView() {
  const [completions, setCompletions] = useState<Record<string, WorkoutCompletion>>({})
  const [tests, setTests] = useState<Partial<Record<TestResult['testId'], TestResult>>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([getAllCompletions(), getAllTestResults()]).then(([c, t]) => {
      setCompletions(c)
      setTests(t)
      setLoaded(true)
    })
  }, [])

  if (!loaded) return <div className="p-6 text-steel">Loading…</div>

  const total = 84
  const done = Object.keys(completions).length
  const adherencePct = Math.round((done / total) * 100)

  // Streak: consecutive days completed working backwards from today
  // Simple: count completions
  const week1 = tests.week1
  const week7 = tests.week7
  const week11 = tests.week11

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24">
      <h1 className="font-display text-3xl tracking-wider uppercase text-cream">Log</h1>

      <section className="bg-ink-800 border border-ink-700 rounded-md p-4">
        <div className="font-display tracking-widest uppercase text-cream text-sm mb-2">Adherence</div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl text-cream">{adherencePct}%</span>
          <span className="text-steel text-sm">
            {done} / {total} workouts
          </span>
        </div>
        <div className="mt-2 h-2 bg-ink-700 rounded-full overflow-hidden">
          <div className="h-full bg-ripon" style={{ width: `${adherencePct}%` }} />
        </div>
      </section>

      <section className="bg-ink-800 border border-ink-700 rounded-md p-4 space-y-3">
        <div className="font-display tracking-widest uppercase text-cream text-sm">Performance vs Targets</div>
        <ProgressRow
          label="40-yd"
          start={week1?.performance?.fortyYd}
          current={week11?.performance?.fortyYd ?? week7?.performance?.fortyYd}
          target={TARGETS.aug11.fortyYd}
          lowerIsBetter
        />
        <ProgressRow
          label="Vertical"
          start={week1?.performance?.vertical}
          current={week11?.performance?.vertical ?? week7?.performance?.vertical}
          target={TARGETS.aug11.vertical}
          unit="in"
        />
        <ProgressRow
          label="Front Squat 3RM"
          start={week7?.strength?.frontSquat3RM}
          current={week11?.strength?.frontSquat3RM}
          target={TARGETS.aug11.frontSquat3RM}
          unit="lb"
        />
        <ProgressRow
          label="Trap Bar 3RM"
          start={week7?.strength?.trapBar3RM}
          current={week11?.strength?.trapBar3RM}
          target={TARGETS.aug11.trapBar3RM}
          unit="lb"
        />
        <ProgressRow
          label="Bench 3RM"
          start={week7?.strength?.bench3RM}
          current={week11?.strength?.bench3RM}
          target={TARGETS.aug11.bench3RM}
          unit="lb"
        />
      </section>

      <section className="bg-ink-800 border border-ink-700 rounded-md p-4 space-y-2">
        <div className="font-display tracking-widest uppercase text-cream text-sm">Knee + Soreness History</div>
        {Object.values(completions).length === 0 ? (
          <p className="text-steel text-sm">No completions yet.</p>
        ) : (
          <div className="space-y-1 text-xs">
            {Object.values(completions)
              .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
              .slice(0, 12)
              .map((c) => (
                <div key={c.workoutId} className="grid grid-cols-[80px_1fr_auto_auto] gap-2 items-center">
                  <span className="font-mono text-steel">{c.workoutId}</span>
                  <span className="font-mono text-steel/70">{c.completedAt.slice(0, 10)}</span>
                  <span className="font-mono text-cream">knee {c.kneeFeel ?? '—'}</span>
                  <span className="font-mono text-cream">sore {c.soreness ?? '—'}</span>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

function ProgressRow({
  label,
  start,
  current,
  target,
  unit,
  lowerIsBetter,
}: {
  label: string
  start?: number
  current?: number
  target: number
  unit?: string
  lowerIsBetter?: boolean
}) {
  const value = current ?? start
  const onTarget = value !== undefined && (lowerIsBetter ? value <= target : value >= target)
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-baseline text-sm">
      <span className="text-cream">{label}</span>
      <span className="font-mono text-steel">
        {start ?? '—'}
        {unit ? unit : ''}
      </span>
      <span className={`font-mono ${onTarget ? 'text-signal-green' : 'text-cream'}`}>
        → {value ?? '—'}
        {unit ? unit : ''}
      </span>
      <span className="font-mono text-xs text-steel">/ {target}{unit ?? ''}</span>
    </div>
  )
}
