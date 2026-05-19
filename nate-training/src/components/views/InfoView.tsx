import { useState } from 'react'
import { TARGETS } from '../../data/program'
import { ACL_NON_NEGOTIABLES, WARMUP_FLOW, FORM_CUES, TESTING_INSTRUCTIONS, COMING_SOON_TESTS } from '../../data/reference'
import { TestingForm } from '../testing/TestingForm'
import type { TestResult } from '../../types'

export function InfoView() {
  const [openTest, setOpenTest] = useState<TestResult['testId'] | null>(null)

  if (openTest) {
    return <TestingForm testId={openTest} onClose={() => setOpenTest(null)} />
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24">
      <h1 className="font-display text-3xl tracking-wider uppercase text-cream">Reference</h1>

      <Card title="Pre-Injury Baseline">
        <Grid>
          <Stat label="BW" value={TARGETS.preInjury.bodyWeight} unit="lb" />
          <Stat label="40-yd" value={TARGETS.preInjury.fortyYd} />
          <Stat label="Vertical" value={TARGETS.preInjury.vertical} unit="in" />
          <Stat label="Back squat 1RM" value={TARGETS.preInjury.backSquat1RM} unit="lb" />
          <Stat label="Front squat 1RM" value={TARGETS.preInjury.frontSquat1RM} unit="lb" />
          <Stat label="Deadlift 1RM" value={TARGETS.preInjury.deadlift1RM} unit="lb" />
          <Stat label="Bench 1RM" value={TARGETS.preInjury.bench1RM} unit="lb" />
        </Grid>
      </Card>

      <Card title="Aug 11 Targets" accent="#00d27a">
        <Grid>
          <Stat label="BW" value={TARGETS.aug11.bodyWeight} unit="lb" />
          <Stat label="40-yd" value={TARGETS.aug11.fortyYd} />
          <Stat label="Vertical" value={TARGETS.aug11.vertical} unit="in" />
          <Stat label="Front squat 3RM" value={TARGETS.aug11.frontSquat3RM} unit="lb" />
          <Stat label="Trap bar 3RM" value={TARGETS.aug11.trapBar3RM} unit="lb" />
          <Stat label="Bench 3RM" value={TARGETS.aug11.bench3RM} unit="lb" />
          <Stat label="LSI minimum" value={TARGETS.aug11.lsiMinimum} unit="%" />
        </Grid>
      </Card>

      <Card title={ACL_NON_NEGOTIABLES.title} accent="#c8102e">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-cream">
          {ACL_NON_NEGOTIABLES.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Card>

      <Card title={WARMUP_FLOW.title}>
        <ul className="space-y-1.5 text-sm">
          {WARMUP_FLOW.steps.map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-2">
              <span className="text-cream">{s.name}</span>
              <span className="font-mono text-xs text-steel">{s.reps}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Form Cues">
        <div className="space-y-3">
          {FORM_CUES.map((fc) => (
            <details key={fc.exercise} className="border-t border-ink-700 pt-2 first:border-t-0 first:pt-0">
              <summary className="font-display tracking-widest text-cream uppercase text-sm cursor-pointer">
                {fc.exercise}
              </summary>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-cream/90">
                {fc.cues.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Card>

      <Card title="Testing">
        <div className="space-y-3">
          {TESTING_INSTRUCTIONS.map((t) => (
            <div key={t.test}>
              <div className="font-display tracking-widest text-cream uppercase text-sm">{t.test}</div>
              <p className="text-sm text-cream/85 mt-0.5">{t.how}</p>
            </div>
          ))}
          <div className="border-t border-ink-700 pt-3 space-y-2">
            {COMING_SOON_TESTS.map((c) => (
              <div key={c.test} className="text-xs">
                <span className="font-display tracking-widest text-cream uppercase">{c.test}:</span>{' '}
                <span className="text-steel">{c.when}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {(['week1', 'week7', 'week11'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setOpenTest(id)}
                className="py-2 bg-ink-700 border border-ink-600 rounded font-display tracking-wider text-xs uppercase text-cream active:bg-ink-600"
              >
                {id === 'week1' ? 'Week 1' : id === 'week7' ? 'Week 7' : 'Week 11'}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

function Card({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="bg-ink-800 border border-ink-700 rounded-md overflow-hidden">
      <div
        className="px-3 py-2 font-display tracking-widest uppercase text-cream text-sm border-l-4"
        style={{ borderColor: accent ?? '#3a3a3a' }}
      >
        {title}
      </div>
      <div className="px-3 py-3">{children}</div>
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{children}</div>
}

function Stat({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-steel font-display">{label}</div>
      <div className="font-mono text-cream text-xl">
        {value}
        {unit && <span className="text-steel text-xs ml-0.5">{unit}</span>}
      </div>
    </div>
  )
}
