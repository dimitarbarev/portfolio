import { lazy, Suspense, useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { HeroSection } from '@/sections/HeroSection'
import { scrollToSection } from '@/utils/scroll'
import type { SectionId } from '@/types'

const HomeBelowFold = lazy(() =>
  import('@/pages/HomeBelowFold').then((module) => ({ default: module.HomeBelowFold })),
)

export function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '') as SectionId | ''
    if (!hash) return

    const tryScroll = () => {
      if (!document.getElementById(hash)) return false
      scrollToSection(hash)
      return true
    }

    if (tryScroll()) return

    const interval = window.setInterval(() => {
      if (tryScroll()) window.clearInterval(interval)
    }, 50)
    const timeout = window.setTimeout(() => window.clearInterval(interval), 4000)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen bg-void" aria-hidden="true" />}>
        <HomeBelowFold />
      </Suspense>
    </MainLayout>
  )
}
