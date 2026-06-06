export type JourneyMilestoneType =
  | 'origin'
  | 'education'
  | 'career'
  | 'personal'

export interface JourneyMilestone {
  id: string
  type: JourneyMilestoneType
  year: string
  title: string
  location?: string
  description: string
  highlight?: string
}

export type ExperienceType =
  | 'internship'
  | 'research'
  | 'leadership'
  | 'university'

export interface ExperienceEntry {
  id: string
  type: ExperienceType
  period: string
  title: string
  organization: string
  description: string
  tags: string[]
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
