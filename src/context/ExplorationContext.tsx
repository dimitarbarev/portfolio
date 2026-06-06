import { createContext, useContext, type ReactNode } from 'react'
import { useExplorationScore } from '@/hooks/useExplorationScore'

type ExplorationContextValue = ReturnType<typeof useExplorationScore>

const ExplorationContext = createContext<ExplorationContextValue | null>(null)

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const value = useExplorationScore()
  return (
    <ExplorationContext.Provider value={value}>{children}</ExplorationContext.Provider>
  )
}

export function useExploration(): ExplorationContextValue {
  const ctx = useContext(ExplorationContext)
  if (!ctx) {
    throw new Error('useExploration must be used within ExplorationProvider')
  }
  return ctx
}
