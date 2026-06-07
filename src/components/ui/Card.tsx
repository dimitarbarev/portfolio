import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { cardHover } from '@/animations/variants'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  glow?: 'purple' | 'blue' | 'none'
  onClick?: () => void
  style?: CSSProperties
}

export function Card({
  children,
  className,
  interactive = false,
  glow = 'none',
  onClick,
  style,
}: CardProps) {
  const glowClasses = {
    purple: 'hover:glow-purple',
    blue: 'hover:glow-blue',
    none: '',
  }

  if (interactive) {
    return (
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        style={style}
        className={cn(
          'glass rounded-2xl p-6 transition-colors duration-300',
          'cursor-pointer hover:border-purple/20',
          glowClasses[glow],
          className,
        )}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'glass rounded-2xl p-6',
        glowClasses[glow],
        className,
      )}
    >
      {children}
    </div>
  )
}
