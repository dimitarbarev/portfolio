import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Layers, GitBranch, Target, Lightbulb } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_PROJECTS } from '@/data/placeholders'
import type { Project, ProjectTab } from '@/types'
import { cn } from '@/utils/cn'

const tabs: { id: ProjectTab; label: string; icon: typeof Layers }[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'architecture', label: 'Architecture', icon: GitBranch },
  { id: 'outcomes', label: 'Outcomes', icon: Target },
  { id: 'learnings', label: 'Learnings', icon: Lightbulb },
]

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <Card interactive glow="purple" onClick={onOpen} className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <Badge variant={project.featured ? 'purple' : 'outline'}>
          {project.category}
        </Badge>
        <span className="text-xs text-text-muted">{project.year}</span>
      </div>

      <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-void-surface to-void-elevated border border-border-subtle flex items-center justify-center">
        <span className="text-xs text-text-muted tracking-widest uppercase">
          Screenshot Placeholder
        </span>
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
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs text-text-muted group-hover:text-purple-light transition-colors">
        <span>Open case study</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
    </Card>
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
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <Badge variant="purple" className="mb-4">{project.category}</Badge>
        <h3 className="font-display text-2xl md:text-3xl font-semibold">
          {project.title}
        </h3>
        <p className="text-purple-light mt-1">{project.subtitle}</p>

        <div className="my-6 aspect-video rounded-xl bg-gradient-to-br from-purple/5 to-blue/5 border border-border-subtle flex items-center justify-center">
          <span className="text-sm text-text-muted">
            Architecture diagram / screenshot placeholder
          </span>
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
                    ? 'bg-purple/15 text-purple-light'
                    : 'text-text-muted hover:text-text-secondary',
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-text-secondary leading-relaxed"
          >
            {project.tabs[activeTab]}
          </motion.p>
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border-subtle">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
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
          title="Shipped work, opened up"
          description="Each project is a mini case study — architecture, outcomes, and lessons learned. Click to explore."
          storyBeat="Experience"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_PROJECTS.map((project, i) => (
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
