import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_EXPERIENCE } from '@/data/placeholders'
import type { ExperienceType } from '@/types'
import { cn } from '@/utils/cn'

const filters: { id: ExperienceType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'internship', label: 'Internships' },
  { id: 'research', label: 'Research' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'university', label: 'University' },
]

const typeAccent: Record<ExperienceType, string> = {
  internship: 'border-l-blue',
  research: 'border-l-purple-light',
  leadership: 'border-l-blue-electric',
  university: 'border-l-purple',
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<ExperienceType | 'all'>('all')

  const filtered =
    filter === 'all'
      ? PLACEHOLDER_EXPERIENCE
      : PLACEHOLDER_EXPERIENCE.filter((e) => e.type === filter)

  return (
    <SectionWrapper id="experience" className="section-padding bg-void-elevated">
      <Container>
        <SectionHeader
          label="Experience"
          title="Where theory meets production"
          description="Internships, research roles, leadership positions, and university projects — each chapter building on the last."
          storyBeat="Growth"
        />

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-all duration-300',
                  filter === f.id
                    ? 'bg-purple/20 text-purple-light border border-purple/30'
                    : 'text-text-muted hover:text-text-secondary border border-transparent hover:border-border-subtle',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filtered.map((entry, i) => (
            <ScrollReveal key={entry.id} delay={i * 0.1}>
              <motion.div
                layout
                className={cn(
                  'glass rounded-xl p-6 md:p-8 border-l-2 transition-all duration-300',
                  'hover:glow-purple hover:border-l-purple-light',
                  typeAccent[entry.type],
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs tracking-widest uppercase text-text-muted">
                      {entry.period}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      {entry.title}
                    </h3>
                    <p className="text-purple-light text-sm mt-0.5">
                      {entry.organization}
                    </p>
                    <p className="text-text-secondary mt-3 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-[200px] md:justify-end">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
