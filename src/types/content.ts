export interface JourneyMilestone {
  id: string
  /** Flag emoji shown in the navigation + chapter header */
  flag: string
  /** Country name — the primary navigation label */
  country: string
  title: string
  period: string
  location: string
  description: string
  highlights: string[]
  /** Country accent color (hex) used for borders, glows and chips */
  accent: string
}

export type ExperienceType =
  | 'internship'
  | 'research'
  | 'leadership'
  | 'university'
  | 'entrepreneurship'

export interface ExperienceEntry {
  id: string
  type: ExperienceType
  period: string
  title: string
  organization?: string
  location?: string
  /** Country flag emoji shown beside the location */
  flag?: string
  description: string
  tags: string[]
  /** External landing page (company / university / club) */
  link?: string
  /** Globally-recognized brand — gets premium glow + accent treatment */
  featured?: boolean
  /** Brand accent color (hex) */
  accent?: string
  /** Short monogram shown in the logo badge */
  logo?: string
}

export type ProjectTab = 'overview' | 'architecture' | 'outcomes' | 'learnings'

export type ProjectGlow = 'enterprise' | 'research' | 'cloud'

export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  organization?: string
  /** External landing page for the organization badge */
  organizationLink?: string
  year: string
  description: string
  tags: string[]
  featured?: boolean
  /** Brand accent color (hex) for glow and highlights */
  accent?: string
  /** Visual glow treatment for the card */
  glow?: ProjectGlow
  coverImage: string
  images: ProjectImage[]
  tabs: Record<ProjectTab, string>
}

export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'cloud'
  | 'ai'
  | 'devops'
  | 'architecture'
  | 'leadership'
  | 'personal'

export type SkillCluster =
  | 'center'
  | 'engineering'
  | 'ai'
  | 'cloud'
  | 'leadership'
  | 'personal'

export interface SkillNode {
  id: string
  name: string
  category: SkillCategory
  cluster: SkillCluster
  x: number
  y: number
  connections: string[]
  size?: 'sm' | 'md' | 'lg' | 'xl'
  description?: string
  /** Override category color for special nodes */
  accentColor?: string
}

export type AthleticDiscipline = 'running' | 'swimming' | 'cycling' | 'trail'

export interface AthleticAchievement {
  id: string
  discipline: AthleticDiscipline
  title: string
  date: string
  metric: string
  centerLabel: string
  centerSubtext: string
  description: string
  /** Optional inline link shown in the description */
  link?: { href: string; label: string }
  /** Optional Strava or race screenshot */
  image?: string
}

export type DeskAction = 'link' | 'download' | 'coming-soon'

export interface DeskResource {
  id: string
  label: string
  description: string
  icon: string
  href: string
  category: 'professional' | 'social' | 'research' | 'athletic'
  action?: DeskAction
  /** Grid placement: row (1-based), column (1-based), optional col span */
  grid?: { row: number; col: number; colSpan?: number }
  downloadFilename?: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
}

export interface ContactField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  placeholder: string
  required?: boolean
}
