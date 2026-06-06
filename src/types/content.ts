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

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  year: string
  description: string
  tags: string[]
  featured?: boolean
  tabs: Record<ProjectTab, string>
}

export type ResearchType = 'thesis' | 'paper' | 'experiment' | 'benchmark'

export interface ResearchItem {
  id: string
  type: ResearchType
  title: string
  year: string
  abstract: string
  tags: string[]
  status: 'published' | 'in-progress' | 'preprint'
}

export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'cloud'
  | 'ai'
  | 'devops'
  | 'architecture'
  | 'leadership'

export interface SkillNode {
  id: string
  name: string
  category: SkillCategory
  x: number
  y: number
  connections: string[]
  size?: 'sm' | 'md' | 'lg'
}

export interface LeadershipItem {
  id: string
  type: 'speaking' | 'mentoring' | 'toastmasters' | 'team'
  title: string
  period: string
  description: string
  metric?: string
}

export interface AthleticAchievement {
  id: string
  type: 'running' | 'triathlon' | 'ironman' | 'endurance'
  title: string
  date: string
  metric: string
  description: string
}

export interface DeskResource {
  id: string
  label: string
  description: string
  icon: string
  href: string
  category: 'professional' | 'social' | 'research' | 'athletic'
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
