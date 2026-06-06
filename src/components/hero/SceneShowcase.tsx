import { useCallback, useEffect, useState } from 'react'
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
import { useDragRotation } from '@/hooks/useDragRotation'
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

  const { pause, scheduleResume } = useAutoRotation({
    onTick: goNext,
    enabled: !isPaused && !isHovered,
    onPause: () => setIsPaused(true),
    onResume: () => setIsPaused(false),
  })

  const { isDragging, bindDrag, goNext: dragNext, goPrev: dragPrev } = useDragRotation({
    activeIndex,
    onIndexChange: setIndexWithDirection,
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') nudge(dragPrev)
      else if (e.key === 'ArrowRight') nudge(dragNext)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [dragPrev, dragNext, nudge])

  const drag = bindDrag()

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
      className="relative mx-auto w-full max-w-[700px]"
      style={{ perspective: 1400 }}
    >
      {/* Ambient outer glow — shifts with the active accent */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem] opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(55% 55% at 50% 42%, ${accent}66, transparent 72%)`,
          transition: 'background 1s ease',
        }}
      />

      <motion.div
        className={cn(
          'group relative aspect-[7/5] w-full overflow-hidden rounded-[1.75rem]',
          'border border-white/12 bg-white/[0.04] backdrop-blur-xl select-none touch-pan-y',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{
          rotateX: lite ? 0 : rotateX,
          rotateY: lite ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          boxShadow:
            '0 50px 120px -40px rgba(124,58,237,0.55), 0 20px 60px -30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
        onPointerDown={drag.onPointerDown}
        onPointerMove={(e) => {
          drag.onPointerMove(e)
          updateParallax(e)
        }}
        onPointerUp={drag.onPointerUp}
        onPointerCancel={drag.onPointerCancel}
        onPointerEnter={() => {
          setIsHovered(true)
          pause()
        }}
        onPointerLeave={() => {
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
                className="h-full w-full object-cover"
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
          className="pointer-events-none absolute left-5 top-5 z-20 flex items-center gap-2"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span
            className="rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.2em] backdrop-blur-md"
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
          className="absolute inset-x-0 bottom-0 z-20 p-6 pb-20 sm:p-8 sm:pb-24"
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
              <h3 className="font-display text-3xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-4xl">
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

        {/* Edge arrows (appear on hover) */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => nudge(dragPrev)}
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 opacity-0 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white group-hover:opacity-100"
          aria-label="Previous scene"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => nudge(dragNext)}
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 opacity-0 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white group-hover:opacity-100"
          aria-label="Next scene"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Premium pill navigation */}
      <ScenePills
        activeIndex={activeIndex}
        accent={accent}
        onSelect={(i) => nudge(() => setIndexWithDirection(i))}
      />
    </div>
  )
}
