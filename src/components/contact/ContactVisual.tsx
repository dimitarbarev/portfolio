import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import contactImage from '@/assets/contact/ciao-guy.png'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

const ACCENT = '#a855f7'

const MOTES = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  x: 12 + (i * 17) % 76,
  y: 8 + (i * 23) % 84,
  size: 2 + (i % 3),
  drift: 10 + (i % 5) * 4,
  duration: 6 + (i % 4) * 2,
  delay: i * 0.4,
}))

export function ContactVisual() {
  const reducedMotion = usePrefersReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mvX = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.5 })
  const mvY = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.5 })

  const rotateX = useTransform(mvY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mvX, [-0.5, 0.5], [-5, 5])
  const imgX = useTransform(mvX, [-0.5, 0.5], [10, -10])
  const imgY = useTransform(mvY, [-0.5, 0.5], [6, -6])

  const updateParallax = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const resetParallax = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div className="relative h-full w-full min-h-0" style={{ perspective: 1200 }}>
      <div
        className="pointer-events-none absolute -inset-3 rounded-2xl opacity-55 blur-2xl"
        style={{
          background: `radial-gradient(55% 55% at 50% 42%, ${ACCENT}55, transparent 72%)`,
        }}
      />

      <motion.div
        className={cn(
          'relative aspect-[7/5] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-0',
          'border border-white/12 bg-white/[0.04] backdrop-blur-xl',
        )}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          boxShadow:
            '0 40px 90px -35px rgba(124,58,237,0.4), 0 16px 48px -28px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
        onPointerMove={updateParallax}
        onPointerLeave={resetParallax}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b16] via-[#08080f] to-[#050509]" />

        <motion.div
          className="absolute inset-0"
          style={{ x: reducedMotion ? 0 : imgX, y: reducedMotion ? 0 : imgY }}
        >
          <motion.img
            src={contactImage}
            alt="Dimitar in his workspace — inviting collaboration"
            draggable={false}
            className="h-full w-full object-cover object-center"
            initial={false}
            animate={{ scale: reducedMotion ? 1 : 1.02 }}
            transition={{ duration: 12, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{ background: `linear-gradient(135deg, ${ACCENT}30, transparent 55%)` }}
        />

        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {MOTES.map((m) => (
              <motion.span
                key={m.id}
                className="absolute rounded-full"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  width: m.size,
                  height: m.size,
                  background: ACCENT,
                  boxShadow: `0 0 ${m.size * 2}px ${ACCENT}`,
                }}
                animate={{ y: [0, -m.drift, 0], opacity: [0.12, 0.5, 0.12] }}
                transition={{
                  duration: m.duration,
                  delay: m.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
