import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScenePills } from './ScenePills'
import { UniverseStarfield } from './UniverseStarfield'
import { useAutoRotation } from '@/hooks/useAutoRotation'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { UNIVERSE_SCENES, UNIVERSE_SCENE_COUNT } from '@/data/universeScenes'
import { cn } from '@/utils/cn'

/** Pre-computed once at module load (decorative, stable across renders). */
const MOTES = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  drift: 12 + Math.random() * 22,
  duration: 7 + Math.random() * 8,
  delay: Math.random() * 6,
}))

/** Drifting glow motes layered over the image for a sense of life. */
function FloatingParticles({ accent, count = 14 }: { accent: string; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.slice(0, count).map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: m.size,
            height: m.size,
            background: accent,
            boxShadow: `0 0 ${m.size * 2.5}px ${accent}`,
            opacity: 0.5,
          }}
          animate={{ y: [0, -m.drift, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function SceneShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const lite = isMobile || reducedMotion

  // Pointer-driven parallax / tilt
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mvX = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.5 })
  const mvY = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.5 })

  const rotateX = useTransform(mvY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(mvX, [-0.5, 0.5], [-9, 9])
  const imgX = useTransform(mvX, [-0.5, 0.5], [24, -24])
  const imgY = useTransform(mvY, [-0.5, 0.5], [16, -16])
  const textX = useTransform(mvX, [-0.5, 0.5], [-8, 8])

  const setIndexWithDirection = useCallback(
    (next: number) => {
      setActiveIndex((prev) => {
        const wrapped = ((next % UNIVERSE_SCENE_COUNT) + UNIVERSE_SCENE_COUNT) % UNIVERSE_SCENE_COUNT
        if (wrapped !== prev) {
          const forward =
            (wrapped - prev + UNIVERSE_SCENE_COUNT) % UNIVERSE_SCENE_COUNT <= UNIVERSE_SCENE_COUNT / 2
          setDirection(forward ? 1 : -1)
        }
        return wrapped
      })
    },
    [],
  )

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((i) => (i + 1) % UNIVERSE_SCENE_COUNT)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((i) => (i - 1 + UNIVERSE_SCENE_COUNT) % UNIVERSE_SCENE_COUNT)
  }, [])

  const cardRef = useRef<HTMLDivElement | null>(null)
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null)
  const didDragRef = useRef(false)
  const draggingRef = useRef(false)

  const { pause, scheduleResume } = useAutoRotation({
    onTick: goNext,
    enabled: !isPaused && !isHovered,
    onPause: () => setIsPaused(true),
    onResume: () => setIsPaused(false),
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') nudge(goPrev)
      else if (e.key === 'ArrowRight') nudge(goNext)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext, nudge])

  // React's touchmove is passive, so the page can steal a swipe and cancel
  // pointer events. Lock horizontal moves on the card itself.
  useLayoutEffect(() => {
    const node = cardRef.current
    if (!node) return

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      if (!touch) return
      const start = swipeStartRef.current
      if (!start) return
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
      }
    }

    node.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => node.removeEventListener('touchmove', onTouchMove)
  }, [])

  const updateParallax = (e: React.PointerEvent) => {
    if (lite) return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const active = UNIVERSE_SCENES[activeIndex]!
  const accent = active.accentColor
  const paused = isPaused || isHovered

  return (
    <div
      className="relative mx-auto w-full max-w-[19rem] md:max-w-[700px]"
      style={{ perspective: 1400 }}
    >
      {/* Ambient outer glow — shifts with the active accent */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2.5rem] opacity-70 blur-3xl md:-inset-8"
        style={{
          background: `radial-gradient(55% 55% at 50% 42%, ${accent}66, transparent 72%)`,
          transition: 'background 1s ease',
        }}
      />

      <motion.div
        ref={cardRef}
        className={cn(
          'group relative aspect-[7/5] w-full overflow-hidden rounded-2xl md:rounded-[1.75rem]',
          'border border-white/12 bg-white/[0.04] backdrop-blur-xl select-none touch-pan-y',
          'max-md:cursor-pointer md:cursor-grab',
          isDragging && 'cursor-grabbing',
        )}
        style={{
          ...(lite
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d' as const,
              }),
          boxShadow:
            '0 50px 120px -40px rgba(124,58,237,0.55), 0 20px 60px -30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
          touchAction: 'pan-y',
        }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragMomentum={false}
        onDragStart={() => {
          didDragRef.current = true
          draggingRef.current = true
          pause()
          setIsPaused(true)
          setIsDragging(true)
        }}
        onDragEnd={(_, info) => {
          draggingRef.current = false
          setIsDragging(false)
          const wentNext = info.offset.x < -40 || info.velocity.x < -250
          const wentPrev = info.offset.x > 40 || info.velocity.x > 250
          if (wentNext) goNext()
          else if (wentPrev) goPrev()
          scheduleResume()
        }}
        onTap={(event, info) => {
          if (didDragRef.current) {
            didDragRef.current = false
            return
          }
          if ((event.target as HTMLElement).closest('button')) return
          const rect = cardRef.current?.getBoundingClientRect()
          if (!rect) return
          const ratio = (info.point.x - rect.left) / rect.width
          nudge(ratio < 0.38 ? goPrev : goNext)
        }}
        onPointerDown={(e) => {
          didDragRef.current = false
          swipeStartRef.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerMove={updateParallax}
        onPointerUp={() => {
          swipeStartRef.current = null
        }}
        onPointerCancel={() => {
          swipeStartRef.current = null
        }}
        onPointerEnter={() => {
          setIsHovered(true)
          pause()
        }}
        onPointerLeave={() => {
          if (draggingRef.current) return
          rawX.set(0)
          rawY.set(0)
          setIsHovered(false)
          scheduleResume()
        }}
        role="region"
        aria-label="Personal universe — interactive image showcase"
        aria-roledescription="carousel"
      >
        {/* Deep space base + stars (behind the image, visible through letterbox edges) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b16] via-[#08080f] to-[#050509]" />
        <UniverseStarfield count={lite ? 26 : 46} animate={!lite} />

        {/* Cinematic image crossfade */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ x: lite ? 0 : imgX, y: lite ? 0 : imgY }}
            >
              <motion.img
                src={active.image}
                alt={active.label}
                draggable={false}
                className="pointer-events-none h-full w-full touch-pan-y object-cover max-md:object-[center_22%]"
                initial={{ scale: lite ? 1.04 : 1.14 }}
                animate={{ scale: lite ? 1.02 : 1.04 }}
                transition={{ duration: lite ? 0.6 : 9, ease: lite ? 'easeOut' : 'linear' }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scrims for legibility + depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <div
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
          style={{ background: `linear-gradient(135deg, ${accent}40, transparent 60%)` }}
        />

        {/* Floating particles in front of image */}
        {!lite && <FloatingParticles accent={accent} />}

        {/* Top row: index + live accent dot */}
        <div
          className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2 md:left-5 md:top-5"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] backdrop-blur-md md:px-2.5 md:py-1 md:text-[11px]"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              background: 'rgba(8,8,14,0.45)',
            }}
          >
            0{active.index + 1} / 0{UNIVERSE_SCENE_COUNT}
          </span>
        </div>

        {/* Overlay title + subtitle */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 pb-3 sm:p-8 sm:pb-24"
          style={{ x: lite ? 0 : textX, transform: 'translateZ(60px)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="mb-2 inline-block h-1 w-10 rounded-full"
                style={{ background: accent }}
              />
              <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-4xl">
                {active.label}
              </h3>
              <p className="mt-1.5 text-sm font-medium tracking-wide text-white/75 sm:text-base">
                {active.mood}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Inner vignette + hairline */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-60px_120px_-50px_rgba(0,0,0,0.9)]" />

        {/* Progress bar */}
        <motion.div
          key={`bar-${active.id}-${paused}`}
          className="absolute left-0 top-0 z-30 h-[3px] origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #ffffff80)`, width: '100%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? 0 : 1 }}
          transition={{ duration: paused ? 0.3 : 8, ease: 'linear' }}
        />

        {/* Edge arrows — always visible on mobile, hover-reveal on desktop */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={() => nudge(goPrev)}
          className="absolute left-2.5 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 opacity-80 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white md:left-3 md:h-10 md:w-10 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Previous scene"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={() => nudge(goNext)}
          className="absolute right-2.5 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 opacity-80 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white md:right-3 md:h-10 md:w-10 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Next scene"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </motion.div>

      <div className="mt-3 flex flex-col items-center gap-1.5 md:hidden">
        <div className="flex items-center gap-1.5">
          {UNIVERSE_SCENES.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => nudge(() => setIndexWithDirection(i))}
              aria-label={`${scene.label}, ${i + 1} of ${UNIVERSE_SCENE_COUNT}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === activeIndex ? 'w-5' : 'w-1.5 bg-white/20',
              )}
              style={i === activeIndex ? { background: accent } : undefined}
            />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted">
          Swipe or tap
        </p>
      </div>

      {/* Premium pill navigation */}
      <ScenePills
        activeIndex={activeIndex}
        accent={accent}
        onSelect={(i) => nudge(() => setIndexWithDirection(i))}
      />
    </div>
  )
}
