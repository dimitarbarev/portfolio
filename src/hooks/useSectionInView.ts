import { useEffect, useRef, useState } from 'react'
import type { SectionId } from '@/types'

interface UseSectionInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useSectionInView(
  id: SectionId,
  options: UseSectionInViewOptions = {},
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const { threshold = 0.2, rootMargin = '-10% 0px -10% 0px' } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, id])

  return [ref, isInView]
}
