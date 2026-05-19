import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Trash2, X, TrendingUp } from 'lucide-react'
import { deleteOneRM, getAllCompletions, getAllTestResults, getOneRMs, saveOneRM } from '../../lib/storage'
import type { WorkoutCompletion, TestResult, OneRMEntry, OneRMLift } from '../../types'
import { ONE_RM_LIFTS } from '../../types'
import { TARGETS } from '../../data/program'
import { todayISO } from '../../lib/date'

export function LogView() {
  const [completions, setCompletions] = useState<Record<string, WorkoutCompletion>>({})
  const [tests, setTests] = useState<Partial<Record<TestResult['testId'], TestResult>>>({})
  const [oneRMs, setOneRMs] = useState<OneRMEntry[]>([])
  const [loaded, setLoaded] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const reload = useCallback(() => {
    return Promise.all([getAllCompletions(), getAllTestResults(), getOneRMs()]).then(([c, t, r]) => {
      setCompletions(c)
      setTests(t)
      setOneRMs(r)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const total = 84
  const done = Object.keys(completions).length
  const adherencePct = Math.round((done / total) * 100)
  const week1 = tests.week1
  const week7 = tests.week7
  const week11 = tests.week11

  const bestByLift = useMemo(() => {
    const map: Partial<Record<OneRMLift, OneRMEntry>> = {}
    for (const r of oneRMs) {
      const prev = map[r.lift]
      if (!prev || r.value > prev.value) map[r.lift] = r
    }
    return map
  }, [oneRMs])

  if (!loaded) return <div className="p-6 text-steel">Loading…</div>

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-28">
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

      <section className="bg-ink-800 border border-ink-700 rounded-md overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-ink-700">
          <div className="font-display tracking-widest uppercase text-cream text-sm flex items-center gap-2">
            <TrendingUp size={14} className="text-ripon" />
            1-Rep Maxes
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="min-h-[40px] px-3 bg-ripon text-cream rounded font-display tracking-widest text-xs uppercase flex items-center gap-1.5 active:bg-ripon-dark"
          >
            <Plus size={14} /> Log PR
          </button>
        </div>
        <div className="divide-y divide-ink-700/60">
          {ONE_RM_LIFTS.map(({ key, label }) => {
            const best = bestByLift[key]
            return (
              <div key={key} className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-cream">{label}</div>
                  {best ? (
                    <div className="text-[11px] font-mono text-steel mt-0.5">
                      {best.value} lb{best.reps > 1 ? ` × ${best.reps}` : ''} · {best.date}
                    </div>
                  ) : (
                    <div className="text-[11px] font-mono text-steel/60 mt-0.5">No entries</div>
                  )}
                </div>
                <div className="font-mono text-2xl text-cream tabular-nums shrink-0">
                  {best ? best.value : <span className="text-steel/40">—</span>}
                </div>
              </div>
            )
          })}
        </div>
        {oneRMs.length > 0 && (
          <details className="border-t border-ink-700">
            <summary className="px-4 py-3 text-xs text-steel font-display tracking-widest uppercase cursor-pointer">
              All entries ({oneRMs.length})
            </summary>
            <div className="divide-y divide-ink-700/60 max-h-72 overflow-y-auto">
              {oneRMs.map((r) => (
                <div key={`${r.lift}-${r.date}`} className="px-4 py-2.5 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-cream">{ONE_RM_LIFTS.find((l) => l.key === r.lift)?.label}</div>
                    <div className="text-[11px] font-mono text-steel mt-0.5">{r.date}{r.notes ? ` · ${r.notes}` : ''}</div>
                  </div>
                  <div className="font-mono text-base text-cream shrink-0">
                    {r.value}<span className="text-steel text-xs ml-0.5">lb</span>
                    {r.reps > 1 && <span className="text-steel text-xs">×{r.reps}</span>}
                  </div>
                  <button
                    onClick={async () => {
                      await deleteOneRM(r.lift, r.date)
                      await reload()
                    }}
                    aria-label="Delete entry"
                    className="text-steel hover:text-signal-red min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      <section className="bg-ink-800 border border-ink-700 rounded-md p-4 space-y-3">
        <div className="font-display tracking-widest uppercase text-cream text-sm">Performance vs Aug 11 Targets</div>
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
        <div className="font-display tracking-widest uppercase text-cream text-sm">Knee + Soreness</div>
        {Object.values(completions).length === 0 ? (
          <p className="text-steel text-sm">No completions yet.</p>
        ) : (
          <div className="space-y-1 text-xs">
            {Object.values(completions)
              .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
              .slice(0, 12)
              .map((c) => (
                <div key={c.workoutId} className="grid grid-cols-[64px_1fr_auto_auto] gap-2 items-center">
                  <span className="font-mono text-steel">{c.workoutId}</span>
                  <span className="font-mono text-steel/70 truncate">{c.completedAt.slice(0, 10)}</span>
                  <span className="font-mono text-cream">k{c.kneeFeel ?? '—'}</span>
                  <span className="font-mono text-cream">s{c.soreness ?? '—'}</span>
                </div>
              ))}
          </div>
        )}
      </section>

      {addOpen && (
        <AddOneRMModal
          onClose={() => setAddOpen(false)}
          onSaved={async () => {
            await reload()
            setAddOpen(false)
          }}
        />
      )}
    </div>
  )
}

function AddOneRMModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [lift, setLift] = useState<OneRMLift>('backSquat')
  const [value, setValue] = useState<string>('')
  const [reps, setReps] = useState<string>('1')
  const [date, setDate] = useState<string>(todayISO())
  const [notes, setNotes] = useState<string>('')
  const [saving, setSaving] = useState(false)

  async function submit() {
    const v = Number(value)
    const r = Math.max(1, Number(reps) || 1)
    if (!v || v <= 0) return
    setSaving(true)
    const entry: OneRMEntry = {
      lift,
      value: v,
      reps: r,
      date,
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    }
    await saveOneRM(entry)
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-40 bg-ink-900/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-ink-800 border border-ink-600 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 space-y-4 max-h-[90dvh] overflow-y-auto" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display tracking-widest text-xl uppercase text-cream">Log 1RM</h2>
          <button onClick={onClose} className="text-steel hover:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">Lift</div>
          <select
            value={lift}
            onChange={(e) => setLift(e.target.value as OneRMLift)}
            className="w-full min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base text-cream focus:border-ripon focus:outline-none"
          >
            {ONE_RM_LIFTS.map((l) => (
              <option key={l.key} value={l.key}>{l.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">Weight (lb)</div>
            <input
              type="number"
              inputMode="decimal"
              step="5"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="—"
              className="w-full min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base font-mono text-cream focus:border-ripon focus:outline-none"
            />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">Reps</div>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="10"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base font-mono text-cream focus:border-ripon focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">Date</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base font-mono text-cream focus:border-ripon focus:outline-none"
          />
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">Notes</div>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. crisp, belt only"
            className="w-full min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base text-cream focus:border-ripon focus:outline-none"
          />
        </div>

        <button
          disabled={saving || !value}
          onClick={submit}
          className="w-full min-h-[48px] py-3 bg-ripon text-cream font-display tracking-widest text-base uppercase rounded disabled:opacity-50 active:bg-ripon-dark"
        >
          {saving ? 'Saving…' : 'Save PR'}
        </button>
      </div>
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
