export type SectionId =
  | 'hero'
  | 'journey'
  | 'experience'
  | 'projects'
  | 'skills'
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
