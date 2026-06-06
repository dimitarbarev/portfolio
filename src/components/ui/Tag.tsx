import { cn } from '@/utils/cn'

interface TagProps {
  children: string
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-md bg-void-surface px-2.5 py-1 text-xs text-text-muted',
        'border border-border-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}
