import type { Project } from '@/types'

export const PROJECT_GLOW_STYLES: Record<
  NonNullable<Project['glow']>,
  { accent: string; gradient: string }
> = {
  enterprise: {
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(12,12,18,0.72) 55%)',
  },
  research: {
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.14) 0%, rgba(12,12,18,0.72) 55%)',
  },
  cloud: {
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(12,12,18,0.72) 55%)',
  },
}

export function projectAccent(project: Project): string {
  return project.accent ?? PROJECT_GLOW_STYLES[project.glow ?? 'enterprise'].accent
}

export function projectPath(id: string): string {
  return `/projects/${id}`
}
