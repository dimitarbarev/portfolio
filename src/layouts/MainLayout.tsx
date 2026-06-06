import type { ReactNode } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { ExplorationProvider } from '@/context/ExplorationContext'

interface MainLayoutProps {
  children: ReactNode
}

function LayoutContent({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-void">
      <div className="noise-overlay" aria-hidden="true" />
      <CursorGlow />
      <Navbar />
      <main>{children}</main>
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
