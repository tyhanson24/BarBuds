export type Phase = 1 | 2 | 3 | 4
export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type ExerciseCategory =
  | 'warmup'
  | 'speed'
  | 'plyo'
  | 'agility'
  | 'main'
  | 'accessory'
  | 'core'
  | 'conditioning'
  | 'mobility'
  | 'position'

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  load?: string
  effort?: string
  rest?: string
  note?: string
  category: ExerciseCategory
}

export interface Block {
  name: string
  duration?: string
  exercises: Exercise[]
}

export interface Workout {
  id: string
  week: number
  day: DayOfWeek
  phase: Phase
  type: string
  title: string
  duration: string
  rest?: boolean
  blocks: Block[]
  notes?: string[]
}

export interface PhaseInfo {
  id: Phase
  name: string
  weeks: number[]
  focus: string
  accent: string
}

export interface SetLog {
  weight?: string
  reps?: string
  rpe?: number
}

export interface ExerciseLog {
  exerciseId: string
  workoutId: string
  date: string
  setLogs: SetLog[]
  completed: boolean
}

export interface WorkoutCompletion {
  workoutId: string
  completedAt: string
  notes?: string
  kneeFeel?: number
  soreness?: number
}

export interface BodyMetric {
  date: string
  weight?: number
  sleepHours?: number
  sleepQuality?: number
  restingHR?: number
}

export interface TestResult {
  testId: 'week1' | 'week7' | 'week11'
  date: string
  performance?: {
    fortyYd?: number
    tenYdSplit?: number
    vertical?: number
    broadJump?: number
    proAgility?: number
  }
  strength?: {
    frontSquat3RM?: number
    trapBar3RM?: number
    bench3RM?: number
  }
  symmetry?: {
    singleLegHopL?: number
    singleLegHopR?: number
    tripleHopL?: number
    tripleHopR?: number
    sixMeterHopL?: number
    sixMeterHopR?: number
  }
  body?: {
    weight?: number
    bodyFatPct?: number
  }
}

export interface ProgramTargets {
  preInjury: {
    bodyWeight: number
    fortyYd: number
    vertical: number
    backSquat1RM: number
    frontSquat1RM: number
    deadlift1RM: number
    bench1RM: number
  }
  aug11: {
    bodyWeight: number
    fortyYd: number
    vertical: number
    backSquat3RM: number
    frontSquat3RM: number
    trapBar3RM: number
    bench3RM: number
    lsiMinimum: number
  }
}

export interface Settings {
  programStartDate: string
  surgicalLeg: 'L' | 'R'
}
