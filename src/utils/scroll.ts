import type { SectionId } from '@/types'

export function scrollToSection(id: SectionId, offset = 80): void {
  const element = document.getElementById(id)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function getScrollProgress(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / docHeight))
}
