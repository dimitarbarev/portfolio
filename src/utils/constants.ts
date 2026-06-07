import type { NavItem, SectionMeta } from '@/types'

export const SITE_NAME = "Dimi's Space"
export const SITE_TAGLINE = 'Engineer · Researcher · Builder'

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', shortLabel: 'Home' },
  { id: 'journey', label: 'Journey', shortLabel: 'Journey' },
  { id: 'experience', label: 'Experience', shortLabel: 'Exp' },
  { id: 'projects', label: 'Projects', shortLabel: 'Lab' },
  { id: 'skills', label: 'Skills', shortLabel: 'Skills' },
  { id: 'athletics', label: 'Athletics', shortLabel: 'Sport' },
  { id: 'desk', label: 'Desk', shortLabel: 'Desk' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact' },
]

export const SECTION_STORY: SectionMeta[] = [
  { id: 'hero', label: 'Origins', index: 0, storyBeat: 'First impression' },
  { id: 'journey', label: 'Origins', index: 1, storyBeat: 'Where it began' },
  { id: 'experience', label: 'Growth', index: 2, storyBeat: 'Building expertise' },
  { id: 'projects', label: 'Experience', index: 3, storyBeat: 'Shipped work' },
  { id: 'skills', label: 'Experience', index: 4, storyBeat: 'Technical depth' },
  { id: 'athletics', label: 'Growth', index: 5, storyBeat: 'Discipline beyond code' },
  { id: 'desk', label: 'Future Vision', index: 6, storyBeat: 'Resources & vision' },
  { id: 'contact', label: 'Future Vision', index: 7, storyBeat: 'What comes next' },
]

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
