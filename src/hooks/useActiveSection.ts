import { useEffect, useState } from 'react'
import type { SectionId } from '@/types'
import { NAV_ITEMS } from '@/utils/constants'

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId)
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: '-20% 0px -60% 0px' },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}
