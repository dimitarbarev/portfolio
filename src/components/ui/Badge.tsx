import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'purple' | 'blue' | 'outline'
  className?: string
}

const variantClasses = {
  default: 'bg-white/5 text-text-secondary',
  purple: 'bg-purple/10 text-purple-light border border-purple/20',
  blue: 'bg-blue/10 text-blue-electric border border-blue/20',
  outline: 'border border-border-subtle text-text-muted',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
