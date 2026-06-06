import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export function CursorGlow() {
  const { x, y } = useMousePosition()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  if (isMobile || reducedMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      animate={{ x: x - 200, y: y - 200 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.5 }}
    >
      <div
        className="h-[400px] w-[400px] rounded-full opacity-[0.07]"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
