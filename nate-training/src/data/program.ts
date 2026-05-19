import type { Phase, PhaseInfo, ProgramTargets } from '../types'

export const PROGRAM_START_DATE = '2026-05-18'
export const CAMP_REPORT_DATE = '2026-08-10'
export const NATE_USER_ID = import.meta.env.VITE_NATE_USER_ID as string

export const PHASES: PhaseInfo[] = [
  { id: 1, name: 'Foundation & Symmetry', weeks: [1, 2, 3], focus: 'Restore base, drill single-leg quad symmetry, bilateral plyos.', accent: 'phase-1' },
  { id: 2, name: 'Strength & Power', weeks: [4, 5, 6, 7], focus: 'Heavy strength, unilateral force production, pre-planned COD. Week 7 LSI re-test.', accent: 'phase-2' },
  { id: 3, name: 'Power & Speed Conversion', weeks: [8, 9, 10], focus: 'Reactive plyos, max velocity, REACTIVE agility.', accent: 'phase-3' },
  { id: 4, name: 'Re-Test & Taper', weeks: [11, 12], focus: 'Week 11 full re-test. Week 12 taper. Camp ready Aug 11.', accent: 'phase-4' },
]

export const TARGETS: ProgramTargets = {
  preInjury: {
    bodyWeight: 173,
    fortyYd: 4.50,
    vertical: 33,
    backSquat1RM: 355,
    frontSquat1RM: 275,
    deadlift1RM: 405,
    bench1RM: 275,
  },
  aug11: {
    bodyWeight: 170,
    fortyYd: 4.43,
    vertical: 35,
    backSquat3RM: 325,
    frontSquat3RM: 255,
    trapBar3RM: 385,
    bench3RM: 265,
    lsiMinimum: 95,
  },
}

export function getPhase(week: number): Phase {
  if (week <= 3) return 1
  if (week <= 7) return 2
  if (week <= 10) return 3
  return 4
}

export function weekInPhase(week: number): number {
  if (week <= 3) return week - 1
  if (week <= 7) return week - 4
  if (week <= 10) return week - 8
  return week - 11
}

export function phaseColor(phase: Phase): string {
  return ({ 1: '#c8102e', 2: '#ff6b35', 3: '#ffb020', 4: '#00d27a' } as const)[phase]
}

export function phaseName(phase: Phase): string {
  return PHASES.find((p) => p.id === phase)!.name
}
