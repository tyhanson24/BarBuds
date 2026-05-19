import { useEffect, useState } from 'react'
import type { WorkoutCompletion } from '../types'
import { getAllCompletions } from '../lib/storage'

export function useCompletions() {
  const [completions, setCompletions] = useState<Record<string, WorkoutCompletion>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getAllCompletions().then((c) => {
      if (cancelled) return
      setCompletions(c)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { completions, loading }
}
