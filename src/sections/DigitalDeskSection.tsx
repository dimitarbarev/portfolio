import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Code2,
  Users,
  BookOpen,
  Activity,
  GraduationCap,
  Award,
  ExternalLink,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_DESK } from '@/data/placeholders'
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

export function DigitalDeskSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { discover } = useExploration()

  return (
    <SectionWrapper id="desk" className="section-padding bg-void-elevated">
      <Container>
        <SectionHeader
          label="Digital Desk"
          title="Your command center"
          description="CV, GitHub, research papers, certifications — an interactive resource hub. Click to explore."
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

              <div className="grid gap-3 sm:grid-cols-2">
                {PLACEHOLDER_DESK.map((resource, i) => {
                  const Icon = iconMap[resource.icon] ?? FileText
                  const isHovered = hoveredId === resource.id

                  return (
                    <motion.a
                      key={resource.id}
                      href={resource.href}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      onMouseEnter={() => setHoveredId(resource.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      whileHover={{ x: 4 }}
                      className={cn(
                        'group flex items-center gap-4 rounded-xl p-4 transition-all duration-300',
                        'border border-transparent hover:border-purple/20 hover:bg-purple/5',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-lg transition-colors',
                          isHovered
                            ? 'bg-purple/20 text-purple-light'
                            : 'bg-void-surface text-text-muted',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary truncate">
                            {resource.label}
                          </span>
                          <ExternalLink className="h-3 w-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                        <p className="text-xs text-text-muted truncate">
                          {resource.description}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-text-muted hidden sm:block">
                        {resource.category}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  )
}
