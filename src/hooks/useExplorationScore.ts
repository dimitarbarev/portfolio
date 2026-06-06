import { useCallback, useState } from 'react'

const EASTER_EGG_KEYS = ['hero', 'skills', 'desk', 'contact'] as const

export function useExplorationScore() {
  const [discovered, setDiscovered] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)

  const discover = useCallback((key: string, points = 10) => {
    setDiscovered((prev) => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      setScore((s) => s + points)
      return next
    })
  }, [])

  const isDiscovered = useCallback(
    (key: string) => discovered.has(key),
    [discovered],
  )

  const totalPossible = EASTER_EGG_KEYS.length * 10

  return {
    score,
    discovered,
    discover,
    isDiscovered,
    totalPossible,
    explorationPercent: Math.round((score / totalPossible) * 100),
  }
}
