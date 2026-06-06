import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { SectionId } from '@/types'

interface SectionWrapperProps {
  id: SectionId
  children: ReactNode
  className?: string
  fullHeight?: boolean
  dark?: boolean
}

export function SectionWrapper({
  id,
  children,
  className,
  fullHeight = false,
  dark = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        fullHeight && 'min-h-screen',
        dark ? 'bg-void' : 'bg-void-elevated',
        className,
      )}
    >
      {children}
    </section>
  )
}
