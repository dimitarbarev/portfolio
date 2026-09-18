import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '@/utils/cn'

interface HorizontalSnapCarouselProps {
  children: ReactNode
  className?: string
  itemClassName?: string
  activeIndex?: number
  onIndexChange?: (index: number) => void
  showIndicator?: boolean
  ariaLabel?: string
  /** How items should layout from the `md` breakpoint up. */
  desktop?: 'stack' | 'grid'
  desktopClassName?: string
}

export function HorizontalSnapCarousel({
  children,
  className,
  itemClassName,
  activeIndex,
  onIndexChange,
  showIndicator = true,
  ariaLabel,
  desktop,
  desktopClassName,
}: HorizontalSnapCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const count = items.length
  const [index, setIndex] = useState(activeIndex ?? 0)
  const indexRef = useRef(index)
  const programmaticRef = useRef(false)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const syncFromScroll = useCallback(() => {
    const root = scrollerRef.current
    if (!root || programmaticRef.current) return

    const slides = Array.from(root.children) as HTMLElement[]
    if (slides.length === 0) return

    const padding = Number.parseFloat(getComputedStyle(root).paddingLeft) || 0
    const target = root.getBoundingClientRect().left + padding
    let closest = 0
    let minDist = Infinity

    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().left - target)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })

    if (closest !== indexRef.current) {
      indexRef.current = closest
      setIndex(closest)
      onIndexChange?.(closest)
    }
  }, [onIndexChange])

  const scrollToIndex = useCallback((next: number, behavior: ScrollBehavior = 'smooth') => {
    const root = scrollerRef.current
    const slide = root?.children[next] as HTMLElement | undefined
    if (!root || !slide) return

    programmaticRef.current = true
    slide.scrollIntoView({ behavior, inline: 'start', block: 'nearest' })
    window.setTimeout(() => {
      programmaticRef.current = false
    }, 480)
  }, [])

  useEffect(() => {
    if (activeIndex == null || activeIndex === indexRef.current) return
    indexRef.current = activeIndex
    setIndex(activeIndex)
    scrollToIndex(activeIndex)
  }, [activeIndex, scrollToIndex])

  return (
    <div className={cn('relative min-w-0 w-full', className)}>
      <div
        ref={scrollerRef}
        role="list"
        aria-label={ariaLabel}
        onScroll={syncFromScroll}
        className={cn(
          'flex min-w-0 w-full gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar max-md:touch-pan-x py-2',
          desktop === 'stack' &&
            'md:flex-col md:overflow-visible md:overscroll-auto md:snap-none md:py-0',
          desktop === 'grid' &&
            cn(
              'md:grid md:overflow-visible md:overscroll-auto md:snap-none md:py-0 md:gap-6',
              desktopClassName ?? 'md:grid-cols-2 lg:grid-cols-3',
            ),
        )}
      >
        {items.map((child, i) => (
          <div
            key={isValidElement(child) && child.key != null ? child.key : i}
            role="listitem"
            className={cn(
              'w-[82%] shrink-0 snap-start',
              desktop === 'stack' && 'md:w-full md:shrink',
              desktop === 'grid' && 'md:w-auto md:min-w-0 md:shrink md:snap-align-none',
              itemClassName,
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {showIndicator && count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
          <div className="h-[2px] w-16 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-purple-light transition-all duration-300"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.18em] text-text-muted">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  )
}
