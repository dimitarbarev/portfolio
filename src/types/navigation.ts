export type SectionId =
  | 'hero'
  | 'journey'
  | 'experience'
  | 'projects'
  | 'research'
  | 'skills'
  | 'leadership'
  | 'athletics'
  | 'desk'
  | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  shortLabel?: string
}

export interface SectionMeta {
  id: SectionId
  label: string
  index: number
  storyBeat: string
}
