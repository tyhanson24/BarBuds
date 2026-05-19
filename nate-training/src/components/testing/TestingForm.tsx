import { useEffect, useState } from 'react'
import type { TestResult } from '../../types'
import { getTestResult, saveTestResult } from '../../lib/storage'
import { todayISO } from '../../lib/date'
import { calcLSI, lsiColorClass } from '../../lib/lsi'
import { TARGETS } from '../../data/program'

interface Field<T> {
  key: keyof T
  label: string
  unit?: string
  step?: string
}

const PERF_FIELDS: Field<NonNullable<TestResult['performance']>>[] = [
  { key: 'fortyYd', label: '40-yd dash', unit: 'sec', step: '0.01' },
  { key: 'tenYdSplit', label: '10-yd split', unit: 'sec', step: '0.01' },
  { key: 'vertical', label: 'Vertical', unit: 'in', step: '0.5' },
  { key: 'broadJump', label: 'Broad jump', unit: 'in', step: '0.5' },
  { key: 'proAgility', label: 'Pro agility 5-10-5', unit: 'sec', step: '0.01' },
]

const STRENGTH_FIELDS: Field<NonNullable<TestResult['strength']>>[] = [
  { key: 'frontSquat3RM', label: 'Front squat 3RM', unit: 'lb', step: '5' },
  { key: 'trapBar3RM', label: 'Trap bar 3RM', unit: 'lb', step: '5' },
  { key: 'bench3RM', label: 'Bench 3RM', unit: 'lb', step: '5' },
]

const SYM_FIELDS: { l: keyof NonNullable<TestResult['symmetry']>; r: keyof NonNullable<TestResult['symmetry']>; label: string; unit: string; lowerIsBetter?: boolean }[] = [
  { l: 'singleLegHopL', r: 'singleLegHopR', label: 'Single-leg hop', unit: 'cm' },
  { l: 'tripleHopL', r: 'tripleHopR', label: 'Triple hop', unit: 'cm' },
  { l: 'sixMeterHopL', r: 'sixMeterHopR', label: '6-m timed hop', unit: 'sec', lowerIsBetter: true },
]

export function TestingForm({
  testId,
  onClose,
}: {
  testId: TestResult['testId']
  onClose: () => void
}) {
  const [result, setResult] = useState<TestResult>({ testId, date: todayISO() })
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getTestResult(testId).then((r) => {
      if (r) setResult(r)
      setLoaded(true)
    })
  }, [testId])

  function setPerf(k: keyof NonNullable<TestResult['performance']>, v: number | undefined) {
    setResult((prev) => ({ ...prev, performance: { ...(prev.performance ?? {}), [k]: v } }))
  }
  function setStr(k: keyof NonNullable<TestResult['strength']>, v: number | undefined) {
    setResult((prev) => ({ ...prev, strength: { ...(prev.strength ?? {}), [k]: v } }))
  }
  function setSym(k: keyof NonNullable<TestResult['symmetry']>, v: number | undefined) {
    setResult((prev) => ({ ...prev, symmetry: { ...(prev.symmetry ?? {}), [k]: v } }))
  }
  function setBody(k: 'weight' | 'bodyFatPct', v: number | undefined) {
    setResult((prev) => ({ ...prev, body: { ...(prev.body ?? {}), [k]: v } }))
  }

  async function onSave() {
    setSaving(true)
    await saveTestResult(result)
    setSaving(false)
    onClose()
  }

  const surgicalSide: 'L' | 'R' = 'L'
  const lsiHop = calcLSI(
    result.symmetry?.[surgicalSide === 'L' ? 'singleLegHopL' : 'singleLegHopR'],
    result.symmetry?.[surgicalSide === 'L' ? 'singleLegHopR' : 'singleLegHopL'],
  )
  const lsiTriple = calcLSI(
    result.symmetry?.[surgicalSide === 'L' ? 'tripleHopL' : 'tripleHopR'],
    result.symmetry?.[surgicalSide === 'L' ? 'tripleHopR' : 'tripleHopL'],
  )
  const lsi6m = calcLSI(
    result.symmetry?.[surgicalSide === 'L' ? 'sixMeterHopL' : 'sixMeterHopR'],
    result.symmetry?.[surgicalSide === 'L' ? 'sixMeterHopR' : 'sixMeterHopL'],
    true,
  )

  if (!loaded) return <div className="p-6 text-steel">Loading…</div>

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-3xl tracking-wider uppercase text-cream">
          {testId === 'week1' ? 'Week 1 Baseline' : testId === 'week7' ? 'Week 7 Re-Test' : 'Week 11 Re-Test'}
        </h1>
        <button onClick={onClose} className="min-h-[44px] px-3 text-cream/80 hover:text-cream text-sm font-display tracking-widest uppercase active:bg-ink-700 rounded">Close</button>
      </div>
      <p className="text-xs text-steel font-mono">All fields optional. Surgical leg = LEFT. LSI auto-calcs.</p>

      <Section title="Performance">
        {PERF_FIELDS.map((f) => (
          <NumField
            key={String(f.key)}
            label={f.label}
            unit={f.unit}
            step={f.step}
            value={result.performance?.[f.key]}
            onChange={(v) => setPerf(f.key, v)}
            target={
              f.key === 'fortyYd'
                ? `Target ${TARGETS.aug11.fortyYd}`
                : f.key === 'vertical'
                  ? `Target ${TARGETS.aug11.vertical}"`
                  : undefined
            }
          />
        ))}
      </Section>

      {testId !== 'week1' && (
        <Section title="Strength (3RM)">
          {STRENGTH_FIELDS.map((f) => (
            <NumField
              key={String(f.key)}
              label={f.label}
              unit={f.unit}
              step={f.step}
              value={result.strength?.[f.key]}
              onChange={(v) => setStr(f.key, v)}
              target={
                f.key === 'frontSquat3RM'
                  ? `Target ${TARGETS.aug11.frontSquat3RM}`
                  : f.key === 'trapBar3RM'
                    ? `Target ${TARGETS.aug11.trapBar3RM}`
                    : `Target ${TARGETS.aug11.bench3RM}`
              }
            />
          ))}
        </Section>
      )}

      <Section title="Symmetry (L vs R)">
        {SYM_FIELDS.map((f) => {
          const lsi = calcLSI(result.symmetry?.[f.l], result.symmetry?.[f.r], f.lowerIsBetter)
          return (
            <div key={f.label} className="space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <NumField label={`${f.label} · L`} unit={f.unit} value={result.symmetry?.[f.l]} onChange={(v) => setSym(f.l, v)} />
                <NumField label={`${f.label} · R`} unit={f.unit} value={result.symmetry?.[f.r]} onChange={(v) => setSym(f.r, v)} />
              </div>
              {lsi && (
                <div className="text-xs font-mono pl-1">
                  LSI <span className={lsiColorClass(lsi.status)}>{lsi.label}</span>
                  <span className="text-steel"> (≥95% target)</span>
                </div>
              )}
            </div>
          )
        })}
        {(lsiHop || lsiTriple || lsi6m) && (
          <div className="mt-3 pt-3 border-t border-ink-700 text-xs text-steel">
            <span className="font-display tracking-widest uppercase">Composite LSI snapshot:</span>{' '}
            {[lsiHop, lsiTriple, lsi6m].filter(Boolean).map((l, i, arr) => (
              <span key={i} className={`${lsiColorClass(l!.status)} font-mono`}>
                {l!.label}
                {i < arr.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        )}
      </Section>

      <Section title="Body">
        <div className="grid grid-cols-2 gap-2">
          <NumField label="Weight" unit="lb" step="0.1" value={result.body?.weight} onChange={(v) => setBody('weight', v)} target={`Target ${TARGETS.aug11.bodyWeight}`} />
          <NumField label="Body fat" unit="%" step="0.1" value={result.body?.bodyFatPct} onChange={(v) => setBody('bodyFatPct', v)} />
        </div>
      </Section>

      <div className="pt-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full min-h-[48px] py-3 bg-ripon text-cream font-display tracking-widest text-base uppercase rounded disabled:opacity-50 active:bg-ripon-dark"
        >
          {saving ? 'Saving…' : 'Save Test'}
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-display tracking-widest text-cream uppercase text-lg">{title}</h2>
      <div className="space-y-2 bg-ink-800 p-3 rounded-md border border-ink-700">{children}</div>
    </section>
  )
}

function NumField({
  label,
  unit,
  step,
  value,
  onChange,
  target,
}: {
  label: string
  unit?: string
  step?: string
  value: number | undefined
  onChange: (v: number | undefined) => void
  target?: string
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider text-steel font-display">{label}</span>
        {target && <span className="text-[10px] font-mono text-steel/80">{target}</span>}
      </div>
      <div className="flex items-center gap-2">
        <input
          inputMode="decimal"
          type="number"
          step={step ?? '0.1'}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          className="flex-1 min-h-[44px] bg-ink-900 border border-ink-600 rounded px-3 text-base font-mono text-cream focus:border-ripon focus:outline-none"
        />
        {unit && <span className="text-xs font-mono text-steel">{unit}</span>}
      </div>
    </label>
  )
}
