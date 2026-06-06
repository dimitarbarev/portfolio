import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Heart } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_JOURNEY } from '@/data/placeholders'
import type { JourneyMilestoneType } from '@/types'
import { cn } from '@/utils/cn'

const typeIcons: Record<JourneyMilestoneType, typeof MapPin> = {
  origin: MapPin,
  education: GraduationCap,
  career: Briefcase,
  personal: Heart,
}

const typeColors: Record<JourneyMilestoneType, string> = {
  origin: 'from-purple/20 to-purple/5 border-purple/30',
  education: 'from-blue/20 to-blue/5 border-blue/30',
  career: 'from-blue-electric/20 to-blue-electric/5 border-blue-electric/30',
  personal: 'from-purple-light/20 to-purple-light/5 border-purple-light/30',
}

export function JourneySection() {
  const [activeId, setActiveId] = useState(PLACEHOLDER_JOURNEY[0]?.id ?? '')

  const active = PLACEHOLDER_JOURNEY.find((m) => m.id === activeId)

  return (
    <SectionWrapper id="journey" className="section-padding">
      <Container>
        <SectionHeader
          label="Journey"
          title="A path across borders & disciplines"
          description="From early origins through education, career, and personal growth — an interactive timeline of transformation."
          storyBeat="Origins"
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ScrollReveal>
            <div className="relative flex flex-col gap-2">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-purple/40 via-blue/20 to-transparent" />

              {PLACEHOLDER_JOURNEY.map((milestone) => {
                const Icon = typeIcons[milestone.type]
                const isActive = milestone.id === activeId

                return (
                  <button
                    key={milestone.id}
                    onClick={() => setActiveId(milestone.id)}
                    className={cn(
                      'relative flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-300',
                      isActive
                        ? 'glass glow-purple'
                        : 'hover:bg-white/5',
                    )}
                  >
                    <div
                      className={cn(
                        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                        isActive
                          ? 'border-purple bg-purple/20 text-purple-light'
                          : 'border-border-subtle bg-void-surface text-text-muted',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted">{milestone.year}</span>
                      <p className={cn('text-sm font-medium', isActive ? 'text-text-primary' : 'text-text-secondary')}>
                        {milestone.title}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    'glass rounded-2xl p-8 md:p-10 min-h-[320px] bg-gradient-to-br border',
                    typeColors[active.type],
                  )}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-text-muted">{active.year}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold mt-1">
                        {active.title}
                      </h3>
                      {active.location && (
                        <p className="flex items-center gap-1.5 mt-2 text-sm text-text-muted">
                          <MapPin className="h-3.5 w-3.5" />
                          {active.location}
                        </p>
                      )}
                    </div>
                    {active.highlight && (
                      <span className="rounded-full bg-purple/10 border border-purple/20 px-3 py-1 text-xs text-purple-light">
                        {active.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {active.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}
