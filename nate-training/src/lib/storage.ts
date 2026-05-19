import { supabase, USER_ID } from './supabase'
import type {
  Settings,
  WorkoutCompletion,
  ExerciseLog,
  BodyMetric,
  TestResult,
  SetLog,
  OneRMEntry,
  OneRMLift,
} from '../types'

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from('nate_settings')
    .select('program_start_date, surgical_leg')
    .eq('user_id', USER_ID)
    .maybeSingle()
  if (error) {
    console.error('getSettings', error)
    return null
  }
  if (!data) return null
  return { programStartDate: data.program_start_date, surgicalLeg: data.surgical_leg }
}

export async function saveSettings(s: Settings): Promise<void> {
  const { error } = await supabase
    .from('nate_settings')
    .upsert({ user_id: USER_ID, program_start_date: s.programStartDate, surgical_leg: s.surgicalLeg, updated_at: new Date().toISOString() })
  if (error) console.error('saveSettings', error)
}

export async function getCompletion(workoutId: string): Promise<WorkoutCompletion | null> {
  const { data, error } = await supabase
    .from('nate_workout_completions')
    .select('workout_id, completed_at, notes, knee_feel, soreness')
    .eq('user_id', USER_ID)
    .eq('workout_id', workoutId)
    .maybeSingle()
  if (error) {
    console.error('getCompletion', error)
    return null
  }
  if (!data) return null
  return {
    workoutId: data.workout_id,
    completedAt: data.completed_at,
    notes: data.notes ?? undefined,
    kneeFeel: data.knee_feel ?? undefined,
    soreness: data.soreness ?? undefined,
  }
}

export async function getAllCompletions(): Promise<Record<string, WorkoutCompletion>> {
  const { data, error } = await supabase
    .from('nate_workout_completions')
    .select('workout_id, completed_at, notes, knee_feel, soreness')
    .eq('user_id', USER_ID)
  if (error) {
    console.error('getAllCompletions', error)
    return {}
  }
  const map: Record<string, WorkoutCompletion> = {}
  for (const row of data ?? []) {
    map[row.workout_id] = {
      workoutId: row.workout_id,
      completedAt: row.completed_at,
      notes: row.notes ?? undefined,
      kneeFeel: row.knee_feel ?? undefined,
      soreness: row.soreness ?? undefined,
    }
  }
  return map
}

export async function saveCompletion(c: WorkoutCompletion): Promise<void> {
  const { error } = await supabase
    .from('nate_workout_completions')
    .upsert({
      user_id: USER_ID,
      workout_id: c.workoutId,
      completed_at: c.completedAt,
      notes: c.notes ?? null,
      knee_feel: c.kneeFeel ?? null,
      soreness: c.soreness ?? null,
    })
  if (error) console.error('saveCompletion', error)
}

export async function getExerciseLog(workoutId: string, exerciseId: string): Promise<ExerciseLog | null> {
  const { data, error } = await supabase
    .from('nate_exercise_logs')
    .select('workout_id, exercise_id, date, set_logs, completed')
    .eq('user_id', USER_ID)
    .eq('workout_id', workoutId)
    .eq('exercise_id', exerciseId)
    .maybeSingle()
  if (error) {
    console.error('getExerciseLog', error)
    return null
  }
  if (!data) return null
  return {
    workoutId: data.workout_id,
    exerciseId: data.exercise_id,
    date: data.date,
    setLogs: (data.set_logs ?? []) as SetLog[],
    completed: data.completed,
  }
}

export async function getExerciseLogsForWorkout(workoutId: string): Promise<Record<string, ExerciseLog>> {
  const { data, error } = await supabase
    .from('nate_exercise_logs')
    .select('workout_id, exercise_id, date, set_logs, completed')
    .eq('user_id', USER_ID)
    .eq('workout_id', workoutId)
  if (error) {
    console.error('getExerciseLogsForWorkout', error)
    return {}
  }
  const map: Record<string, ExerciseLog> = {}
  for (const row of data ?? []) {
    map[row.exercise_id] = {
      workoutId: row.workout_id,
      exerciseId: row.exercise_id,
      date: row.date,
      setLogs: (row.set_logs ?? []) as SetLog[],
      completed: row.completed,
    }
  }
  return map
}

export async function saveExerciseLog(log: ExerciseLog): Promise<void> {
  const { error } = await supabase
    .from('nate_exercise_logs')
    .upsert({
      user_id: USER_ID,
      workout_id: log.workoutId,
      exercise_id: log.exerciseId,
      date: log.date,
      set_logs: log.setLogs,
      completed: log.completed,
      updated_at: new Date().toISOString(),
    })
  if (error) console.error('saveExerciseLog', error)
}

export async function getBodyMetrics(): Promise<BodyMetric[]> {
  const { data, error } = await supabase
    .from('nate_body_metrics')
    .select('*')
    .eq('user_id', USER_ID)
    .order('date', { ascending: true })
  if (error) {
    console.error('getBodyMetrics', error)
    return []
  }
  return (data ?? []).map((r) => ({
    date: r.date,
    weight: r.weight ?? undefined,
    sleepHours: r.sleep_hours ?? undefined,
    sleepQuality: r.sleep_quality ?? undefined,
    restingHR: r.resting_hr ?? undefined,
  }))
}

export async function saveBodyMetric(m: BodyMetric): Promise<void> {
  const { error } = await supabase
    .from('nate_body_metrics')
    .upsert({
      user_id: USER_ID,
      date: m.date,
      weight: m.weight ?? null,
      sleep_hours: m.sleepHours ?? null,
      sleep_quality: m.sleepQuality ?? null,
      resting_hr: m.restingHR ?? null,
    })
  if (error) console.error('saveBodyMetric', error)
}

export async function getTestResult(testId: TestResult['testId']): Promise<TestResult | null> {
  const { data, error } = await supabase
    .from('nate_test_results')
    .select('*')
    .eq('user_id', USER_ID)
    .eq('test_id', testId)
    .maybeSingle()
  if (error) {
    console.error('getTestResult', error)
    return null
  }
  if (!data) return null
  return {
    testId: data.test_id,
    date: data.date,
    performance: data.performance ?? undefined,
    strength: data.strength ?? undefined,
    symmetry: data.symmetry ?? undefined,
    body: data.body ?? undefined,
  }
}

export async function saveTestResult(t: TestResult): Promise<void> {
  const { error } = await supabase
    .from('nate_test_results')
    .upsert({
      user_id: USER_ID,
      test_id: t.testId,
      date: t.date,
      performance: t.performance ?? null,
      strength: t.strength ?? null,
      symmetry: t.symmetry ?? null,
      body: t.body ?? null,
    })
  if (error) console.error('saveTestResult', error)
}

export async function getOneRMs(): Promise<OneRMEntry[]> {
  const { data, error } = await supabase
    .from('nate_one_rms')
    .select('lift, date, value, reps, notes')
    .eq('user_id', USER_ID)
    .order('date', { ascending: false })
  if (error) {
    console.error('getOneRMs', error)
    return []
  }
  return (data ?? []).map((r) => ({
    lift: r.lift as OneRMLift,
    date: r.date,
    value: Number(r.value),
    reps: r.reps,
    notes: r.notes ?? undefined,
  }))
}

export async function saveOneRM(entry: OneRMEntry): Promise<void> {
  const { error } = await supabase
    .from('nate_one_rms')
    .upsert({
      user_id: USER_ID,
      lift: entry.lift,
      date: entry.date,
      value: entry.value,
      reps: entry.reps,
      notes: entry.notes ?? null,
    })
  if (error) console.error('saveOneRM', error)
}

export async function deleteOneRM(lift: OneRMLift, date: string): Promise<void> {
  const { error } = await supabase
    .from('nate_one_rms')
    .delete()
    .eq('user_id', USER_ID)
    .eq('lift', lift)
    .eq('date', date)
  if (error) console.error('deleteOneRM', error)
}

export async function getAllTestResults(): Promise<Partial<Record<TestResult['testId'], TestResult>>> {
  const { data, error } = await supabase
    .from('nate_test_results')
    .select('*')
    .eq('user_id', USER_ID)
  if (error) {
    console.error('getAllTestResults', error)
    return {}
  }
  const out: Partial<Record<TestResult['testId'], TestResult>> = {}
  for (const row of data ?? []) {
    out[row.test_id as TestResult['testId']] = {
      testId: row.test_id,
      date: row.date,
      performance: row.performance ?? undefined,
      strength: row.strength ?? undefined,
      symmetry: row.symmetry ?? undefined,
      body: row.body ?? undefined,
    }
  }
  return out
}
