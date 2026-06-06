import { cn } from '@/utils/cn'

interface DividerProps {
  className?: string
  gradient?: boolean
}

export function Divider({ className, gradient = true }: DividerProps) {
  return (
    <div
      className={cn(
        'h-px w-full',
        gradient
          ? 'bg-gradient-to-r from-transparent via-purple/30 to-transparent'
          : 'bg-border-subtle',
        className,
      )}
    />
  )
}
