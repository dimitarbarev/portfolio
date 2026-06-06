import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface FloatingElementProps {
  children: ReactNode
  duration?: number
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  duration = 4,
  delay = 0,
  className,
}: FloatingElementProps) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [-6, 6, -6] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
