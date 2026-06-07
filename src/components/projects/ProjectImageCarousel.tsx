import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useAutoRotation } from '@/hooks/useAutoRotation'
import { useDragRotation } from '@/hooks/useDragRotation'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import type { ProjectImage } from '@/types'
import { cn } from '@/utils/cn'

const CAROUSEL_INTERVAL_MS = 5000

interface ProjectImageCarouselProps {
  images: ProjectImage[]
  accent?: string
  className?: string
}

export function ProjectImageCarousel({
  images,
  accent = '#7c3aed',
  className,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const count = images.length

  const setIndex = useCallback(
    (next: number) => {
      setActiveIndex(((next % count) + count) % count)
    },
    [count],
  )

  const goNext = useCallback(() => setIndex(activeIndex + 1), [activeIndex, setIndex])
  const goPrev = useCallback(() => setIndex(activeIndex - 1), [activeIndex, setIndex])

  const { pause, scheduleResume } = useAutoRotation({
    onTick: goNext,
    enabled: count > 1 && !isPaused && !isHovered && !lightboxOpen && !reducedMotion,
    intervalMs: CAROUSEL_INTERVAL_MS,
    onPause: () => setIsPaused(true),
    onResume: () => setIsPaused(false),
  })

  const { isDragging, bindDrag } = useDragRotation({
    activeIndex,
    itemCount: count,
    onIndexChange: setIndex,
    onDragStart: () => {
      pause()
      setIsPaused(true)
    },
    onDragEnd: () => scheduleResume(),
  })

  const nudge = useCallback(
    (fn: () => void) => {
      fn()
      pause()
      scheduleResume()
    },
    [pause, scheduleResume],
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') nudge(goPrev)
      else if (e.key === 'ArrowRight') nudge(goNext)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, goPrev, goNext, nudge])

  if (count === 0) return null

  const active = images[activeIndex]!
  const drag = bindDrag()
  const paused = isPaused || isHovered || lightboxOpen

  return (
    <>
      <div className={cn('relative', className)}>
        <div
          className={cn(
            'group relative aspect-video w-full overflow-hidden rounded-xl border border-border-subtle bg-void-surface',
            count > 1 && (isDragging ? 'cursor-grabbing' : 'cursor-grab'),
          )}
          style={{
            boxShadow: `0 24px 60px -24px ${accent}44, inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
          onPointerDown={count > 1 ? drag.onPointerDown : undefined}
          onPointerMove={count > 1 ? drag.onPointerMove : undefined}
          onPointerUp={count > 1 ? drag.onPointerUp : undefined}
          onPointerCancel={count > 1 ? drag.onPointerCancel : undefined}
          onPointerEnter={() => {
            setIsHovered(true)
            pause()
          }}
          onPointerLeave={() => {
            setIsHovered(false)
            scheduleResume()
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Project image gallery, slide ${activeIndex + 1} of ${count}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group/img relative h-full w-full cursor-zoom-in"
                aria-label={`Enlarge ${active.alt}`}
              >
                <img
                  src={active.src}
                  alt={active.alt}
                  draggable={false}
                  className="h-full w-full object-contain bg-gradient-to-br from-purple/5 to-blue/5 p-2"
                />
                <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 opacity-0 backdrop-blur-md transition-opacity group-hover/img:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </button>
            </motion.div>
          </AnimatePresence>

          {count > 1 && !reducedMotion && (
            <motion.div
              key={`progress-${activeIndex}-${paused}`}
              className="absolute left-0 top-0 z-10 h-[2px] origin-left rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.5))`,
                width: '100%',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{ duration: paused ? 0.2 : CAROUSEL_INTERVAL_MS / 1000, ease: 'linear' }}
            />
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => nudge(goPrev)}
                className={cn(
                  'absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white',
                  isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => nudge(goNext)}
                className={cn(
                  'absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white',
                  isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                )}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.alt}
                type="button"
                onClick={() => nudge(() => setIndex(i))}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeIndex
                    ? 'h-2 w-6'
                    : 'h-2 w-2 bg-text-muted/40 hover:bg-text-muted/70',
                )}
                style={
                  i === activeIndex
                    ? { background: accent, boxShadow: `0 0 12px ${accent}66` }
                    : undefined
                }
                aria-label={`Go to image ${i + 1}: ${img.alt}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-lg"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:text-white"
              aria-label="Close enlarged image"
            >
              <X className="h-5 w-5" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nudge(goPrev)
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nudge(goNext)
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.img
              key={activeIndex}
              src={active.src}
              alt={active.alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
              draggable={false}
            />

            <p className="pointer-events-none absolute bottom-6 left-1/2 max-w-lg -translate-x-1/2 text-center text-sm text-text-secondary">
              {active.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
