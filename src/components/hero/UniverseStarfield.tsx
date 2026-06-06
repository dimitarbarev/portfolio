import { motion } from 'framer-motion'

interface UniverseStarfieldProps {
  count?: number
  animate?: boolean
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

/** Pre-computed once at module load (decorative, stable across renders). */
const STAR_POOL: Star[] = Array.from({ length: 64 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: 2.5 + Math.random() * 3.5,
}))

export function UniverseStarfield({ count = 48, animate = true }: UniverseStarfieldProps) {
  const stars = STAR_POOL.slice(0, count)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0.15 }}
          animate={
            animate
              ? { opacity: [0.15, 0.8, 0.15], scale: [1, 1.25, 1] }
              : { opacity: 0.4 }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
