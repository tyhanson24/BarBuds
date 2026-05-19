import { useEffect, useState, useCallback } from 'react'
import type { DayOfWeek, ExerciseLog, WorkoutCompletion } from '../types'
import { getWorkout } from '../data/workouts'
import { getCompletion, getExerciseLogsForWorkout, saveCompletion, saveExerciseLog } from '../lib/storage'
import { dateFromWeekDay } from '../lib/date'
import { format } from 'date-fns'

export function useWorkoutData(week: number, day: DayOfWeek) {
  const workout = getWorkout(week, day)
  const [completion, setCompletion] = useState<WorkoutCompletion | null>(null)
  const [logs, setLogs] = useState<Record<string, ExerciseLog>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([getCompletion(workout.id), getExerciseLogsForWorkout(workout.id)])
      .then(([c, l]) => {
        if (cancelled) return
        setCompletion(c)
        setLogs(l)
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [workout.id])

  const upsertLog = useCallback(
    async (exerciseId: string, log: Omit<ExerciseLog, 'workoutId' | 'date'>) => {
      const date = format(dateFromWeekDay(week, day), 'yyyy-MM-dd')
      const full: ExerciseLog = { ...log, workoutId: workout.id, exerciseId, date }
      setLogs((prev) => ({ ...prev, [exerciseId]: full }))
      setSaving(true)
      await saveExerciseLog(full)
      setSaving(false)
    },
    [workout.id, week, day],
  )

  const markComplete = useCallback(
    async (data: { notes?: string; kneeFeel?: number; soreness?: number }) => {
      const c: WorkoutCompletion = {
        workoutId: workout.id,
        completedAt: new Date().toISOString(),
        ...(data.notes ? { notes: data.notes } : {}),
        ...(data.kneeFeel !== undefined ? { kneeFeel: data.kneeFeel } : {}),
        ...(data.soreness !== undefined ? { soreness: data.soreness } : {}),
      }
      setCompletion(c)
      setSaving(true)
      await saveCompletion(c)
      setSaving(false)
    },
    [workout.id],
  )

  return { workout, completion, logs, loading, saving, upsertLog, markComplete }
}
