import { Suspense, lazy } from 'react'
import { SceneFallback } from './SceneFallback'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useMousePosition } from '@/hooks/useMousePosition'

const HeroCanvas = lazy(() =>
  import('./HeroCanvas').then((m) => ({ default: m.HeroCanvas })),
)

export function HeroScene() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { normalizedX, normalizedY } = useMousePosition()

  if (isMobile || reducedMotion) {
    return <SceneFallback />
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<SceneFallback />}>
        <HeroCanvas mouseX={normalizedX} mouseY={normalizedY} />
      </Suspense>
    </div>
  )
}
