import type { ReactNode } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { EasterEggCounter } from '@/components/effects/EasterEggCounter'
import { ExplorationProvider, useExploration } from '@/context/ExplorationContext'

interface MainLayoutProps {
  children: ReactNode
}

function LayoutContent({ children }: MainLayoutProps) {
  const { score, explorationPercent } = useExploration()

  return (
    <div className="relative min-h-screen bg-void">
      <div className="noise-overlay" aria-hidden="true" />
      <CursorGlow />
      <Navbar />
      <main>{children}</main>
      <EasterEggCounter
        score={score}
        percent={explorationPercent}
        visible={score > 0}
      />
    </div>
  )
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ExplorationProvider>
      <LayoutContent>{children}</LayoutContent>
    </ExplorationProvider>
  )
}
