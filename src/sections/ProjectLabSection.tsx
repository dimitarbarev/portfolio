import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Layers, GitBranch, Target, Lightbulb, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { ProjectImageCarousel } from '@/components/projects/ProjectImageCarousel'
import { PROJECTS } from '@/data/projects'
import type { Project, ProjectTab } from '@/types'
import { cn } from '@/utils/cn'

const tabs: { id: ProjectTab; label: string; icon: typeof Layers }[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'architecture', label: 'Architecture', icon: GitBranch },
  { id: 'outcomes', label: 'Outcomes', icon: Target },
  { id: 'learnings', label: 'Learnings', icon: Lightbulb },
]

const glowStyles: Record<
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

function ProjectTabContent({ content }: { content: string }) {
  const blocks = content.split('\n\n')

  return (
    <div className="space-y-4 text-text-secondary leading-relaxed">
      {blocks.map((block) => {
        const lines = block.split('\n')
        const isList = lines.every((line) => line.startsWith('- '))

        if (isList) {
          return (
            <ul key={block} className="space-y-2 pl-1">
              {lines.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light" />
                  <span>{line.slice(2)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (lines.length > 1 && lines.some((line) => line.startsWith('- '))) {
          return (
            <div key={block} className="space-y-3">
              {lines.map((line) =>
                line.startsWith('- ') ? (
                  <div key={line} className="flex gap-3 pl-1">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light" />
                    <span>{line.slice(2)}</span>
                  </div>
                ) : (
                  <p key={line}>{line}</p>
                ),
              )}
            </div>
          )
        }

        return <p key={block}>{block}</p>
      })}
    </div>
  )
}

function OrganizationBadge({
  project,
  accent,
  size = 'sm',
}: {
  project: Project
  accent: string
  size?: 'sm' | 'md'
}) {
  if (!project.organization) return null

  const linked = Boolean(project.organizationLink)
  const className = cn(
    'inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide transition-colors',
    size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]',
    linked && 'hover:brightness-125',
  )
  const style = {
    color: accent,
    background: `${accent}1a`,
    border: `1px solid ${accent}40`,
  }

  const content = (
    <>
      {project.featured && linked && <Sparkles className="h-3 w-3" />}
      {project.organization}
      {linked && <ArrowUpRight className="h-3 w-3 opacity-70" />}
    </>
  )

  if (linked) {
    return (
      <a
        href={project.organizationLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={className}
        style={style}
        aria-label={`${project.organization} — open website in a new tab`}
      >
        {content}
      </a>
    )
  }

  return (
    <span className={className} style={style}>
      {content}
    </span>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const accent = project.accent ?? glowStyles[project.glow ?? 'enterprise'].accent
  const glow = project.glow ? glowStyles[project.glow] : null
  const featured = project.featured

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="h-full"
    >
      <Card
        interactive
        glow="purple"
        onClick={onOpen}
        className={cn(
          'group relative h-full flex flex-col overflow-hidden',
          featured && 'backdrop-blur-2xl',
        )}
        style={
          featured && glow
            ? {
                border: `1px solid ${accent}55`,
                background: glow.gradient,
                boxShadow: `0 28px 80px -34px ${accent}88, inset 0 1px 0 rgba(255,255,255,0.08)`,
              }
            : undefined
        }
      >
        {featured && glow && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
            style={{ background: accent }}
            animate={{ opacity: [0.12, 0.32, 0.12], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="relative flex items-start justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={featured ? 'purple' : 'outline'}>{project.category}</Badge>
            <OrganizationBadge project={project} accent={accent} />
          </div>
          <span className="text-xs text-text-muted shrink-0">{project.year}</span>
        </div>

        <div
          className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-border-subtle"
          style={{ boxShadow: featured ? `0 16px 40px -20px ${accent}55` : undefined }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              background: `linear-gradient(135deg, ${accent}30, transparent 60%)`,
            }}
          />
        </div>

        <h3 className="font-display text-xl font-semibold mb-1">{project.title}</h3>
        <p className="text-sm text-purple-light mb-3">{project.subtitle}</p>
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-subtle">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.tags.length > 3 && (
            <Tag>{`+${project.tags.length - 3}`}</Tag>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs text-text-muted group-hover:text-purple-light transition-colors">
          <span>Open case study</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </Card>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<ProjectTab>('overview')
  const accent = project.accent ?? glowStyles[project.glow ?? 'enterprise'].accent

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-void/90 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-strong rounded-2xl p-6 md:p-10"
        style={{
          boxShadow: `0 40px 100px -30px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="purple">{project.category}</Badge>
          <OrganizationBadge project={project} accent={accent} size="md" />
          <span className="text-xs text-text-muted">{project.year}</span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-semibold pr-10">
          {project.title}
        </h3>
        <p className="text-purple-light mt-1">{project.subtitle}</p>

        <div className="my-6">
          <ProjectImageCarousel images={project.images} accent={accent} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-border-subtle pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all',
                  activeTab === tab.id
                    ? 'text-purple-light'
                    : 'text-text-muted hover:text-text-secondary',
                )}
                style={
                  activeTab === tab.id
                    ? { background: `${accent}22`, boxShadow: `inset 0 0 0 1px ${accent}44` }
                    : undefined
                }
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ProjectTabContent content={project.tabs[activeTab]} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 pt-6 border-t border-border-subtle">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-3">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectLabSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <SectionWrapper id="projects" className="section-padding">
      <Container size="wide">
        <SectionHeader
          label="Project Lab"
          title="Building systems that solve real problems"
          description="Each project is a mini case study — architecture, outcomes, and lessons learned. Click to explore."
          storyBeat="Experience"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
