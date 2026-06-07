import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Code2,
  Users,
  BookOpen,
  Activity,
  GraduationCap,
  Award,
  ExternalLink,
  Download,
  X,
  Clock,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { DESK_RESOURCES } from '@/data/desk'
import type { DeskResource } from '@/types'
import { useExploration } from '@/context/ExplorationContext'
import { cn } from '@/utils/cn'

const iconMap: Record<string, typeof FileText> = {
  'file-text': FileText,
  github: Code2,
  linkedin: Users,
  'book-open': BookOpen,
  activity: Activity,
  'graduation-cap': GraduationCap,
  award: Award,
}

function ComingSoonModal({
  resource,
  onClose,
}: {
  resource: DeskResource
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-void/90 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm glass-strong rounded-2xl p-6 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple/15 text-purple-light">
          <Clock className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary">
          Coming Soon
        </h3>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          <span className="text-purple-light">{resource.label}</span> will be
          available here soon. Check back later!
        </p>
        <button
          onClick={onClose}
          className="mt-6 rounded-lg px-5 py-2.5 text-sm font-medium text-purple-light bg-purple/15 hover:bg-purple/25 transition-colors"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  )
}

function DeskCard({
  resource,
  isHovered,
  onHover,
  onClick,
}: {
  resource: DeskResource
  isHovered: boolean
  onHover: (id: string | null) => void
  onClick: (resource: DeskResource) => void
}) {
  const Icon = iconMap[resource.icon] ?? FileText
  const isDownload = resource.action === 'download'
  const isExternal = resource.action === 'link'
  const isComingSoon = resource.action === 'coming-soon'
  const isCenteredRow = resource.grid?.colSpan === 2

  const cardClass = cn(
    'group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 w-full',
    'border border-transparent hover:border-purple/20 hover:bg-purple/5 cursor-pointer',
    isCenteredRow && 'max-w-md mx-auto',
  )

  const content = (
    <>
      <div
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-lg transition-colors shrink-0',
          isHovered
            ? 'bg-purple/20 text-purple-light'
            : 'bg-void-surface text-text-muted',
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary truncate">
            {resource.label}
          </span>
          {isDownload ? (
            <Download className="h-3 w-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          ) : isComingSoon ? null : (
            <ExternalLink className="h-3 w-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          )}
        </div>
        <p className="text-xs text-text-muted truncate">{resource.description}</p>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-text-muted hidden sm:block shrink-0">
        {resource.category}
      </span>
    </>
  )

  if (isComingSoon) {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onMouseEnter={() => onHover(resource.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ x: 4 }}
        onClick={() => onClick(resource)}
        className={cardClass}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <motion.a
      href={resource.href}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover(resource.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ x: 4 }}
      onClick={() => onClick(resource)}
      download={isDownload ? resource.downloadFilename : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cardClass}
    >
      {content}
    </motion.a>
  )
}

export function DigitalDeskSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [comingSoonResource, setComingSoonResource] = useState<DeskResource | null>(
    null,
  )
  const { discover } = useExploration()

  const handleResourceClick = (resource: DeskResource) => {
    if (resource.action === 'coming-soon') {
      setComingSoonResource(resource)
    }
  }

  return (
    <SectionWrapper id="desk" className="section-padding bg-void-elevated">
      <Container>
        <SectionHeader
          label="Digital Desk"
          title="Your command center"
          description="CV, profiles, writing, and credentials — an interactive resource hub. Click to explore."
          storyBeat="Future Vision"
          align="center"
        />

        <ScrollReveal>
          <div
            className="relative mx-auto max-w-4xl"
            onMouseEnter={() => discover('desk', 10)}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple/5 via-transparent to-blue/5 blur-xl" />

            <div className="relative glass-strong rounded-2xl p-6 md:p-10">
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border-subtle">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/60" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                  <span className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-text-muted ml-2 font-mono">
                  ~/digital-desk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {DESK_RESOURCES.map((resource) => {
                  const grid = resource.grid ?? { row: 1, col: 1 }
                  return (
                    <div
                      key={resource.id}
                      style={{
                        gridRow: grid.row,
                        gridColumn:
                          grid.colSpan === 2
                            ? '1 / -1'
                            : `${grid.col} / ${grid.col + 1}`,
                      }}
                      className={cn(
                        grid.colSpan === 2 && 'flex justify-center',
                      )}
                    >
                      <DeskCard
                        resource={resource}
                        isHovered={hoveredId === resource.id}
                        onHover={setHoveredId}
                        onClick={handleResourceClick}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      <AnimatePresence>
        {comingSoonResource && (
          <ComingSoonModal
            resource={comingSoonResource}
            onClose={() => setComingSoonResource(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
