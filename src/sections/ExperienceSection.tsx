import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_EXPERIENCE } from '@/data/placeholders'
import type { ExperienceEntry, ExperienceType } from '@/types'
import { cn } from '@/utils/cn'

const filters: { id: ExperienceType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'internship', label: 'Internships' },
  { id: 'research', label: 'Research' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'university', label: 'University' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
]

const typeAccent: Record<ExperienceType, string> = {
  internship: '#3b82f6',
  research: '#a855f7',
  leadership: '#06b6d4',
  university: '#7c3aed',
  entrepreneurship: '#f59e0b',
}

const stats: { type: ExperienceType; label: string }[] = [
  { type: 'internship', label: 'Internships' },
  { type: 'research', label: 'Research Projects' },
  { type: 'leadership', label: 'Leadership Roles' },
  { type: 'university', label: 'Academic Experiences' },
  { type: 'entrepreneurship', label: 'Entrepreneurship' },
]

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const accent = entry.accent ?? typeAccent[entry.type]
  const featured = entry.featured
  const linked = Boolean(entry.link)

  return (
    <motion.a
      layout
      href={entry.link}
      target={linked ? '_blank' : undefined}
      rel={linked ? 'noopener noreferrer' : undefined}
      aria-label={linked ? `${entry.title} — open ${entry.organization ?? 'website'} in a new tab` : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'group relative block overflow-hidden rounded-xl p-6 md:p-8',
        featured ? 'backdrop-blur-2xl' : 'glass',
        linked && 'cursor-pointer',
      )}
      style={{
        borderLeft: `3px solid ${accent}`,
        ...(featured
          ? {
              border: `1px solid ${accent}55`,
              borderLeft: `3px solid ${accent}`,
              background: `linear-gradient(135deg, ${accent}16 0%, rgba(12,12,18,0.72) 55%)`,
              boxShadow: `0 28px 80px -34px ${accent}aa, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }
          : {}),
      }}
    >
      {/* External-link affordance */}
      {linked && (
        <span
          className="pointer-events-none absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          style={{ borderColor: `${accent}55`, background: `${accent}1f`, color: accent }}
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}

      {/* Featured: animated accent lighting */}
      {featured && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
          style={{ background: accent }}
          animate={{ opacity: [0.18, 0.4, 0.18], scale: [1, 1.12, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-1 gap-4">
          {/* Logo / monogram badge */}
          {entry.logo && (
            <div
              className={cn(
                'flex shrink-0 items-center justify-center rounded-xl border font-bold tracking-tight transition-transform duration-300 group-hover:scale-105',
                featured ? 'h-14 w-14 text-sm' : 'h-12 w-12 text-xs',
              )}
              style={{
                borderColor: `${accent}66`,
                background: `${accent}1f`,
                color: accent,
              }}
              aria-hidden
            >
              {entry.logo}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-text-muted">
                {entry.period}
              </span>
              {featured && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: accent, background: `${accent}1f`, border: `1px solid ${accent}40` }}
                >
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </span>
              )}
            </div>

            <h3 className="mt-1 font-display text-xl font-semibold">{entry.title}</h3>

            {(entry.organization || entry.location) && (
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                {entry.organization && (
                  <span style={{ color: accent }} className="font-medium">
                    {entry.organization}
                  </span>
                )}
                {entry.location && (
                  <span className="flex items-center gap-1 text-text-muted">
                    {entry.organization && <span className="text-border-subtle">·</span>}
                    {entry.flag && <span aria-hidden>{entry.flag}</span>}
                    {entry.location}
                  </span>
                )}
              </p>
            )}

            <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">
              {entry.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:max-w-[210px] md:justify-end">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<ExperienceType | 'all'>('all')

  const counts = useMemo(() => {
    return PLACEHOLDER_EXPERIENCE.reduce(
      (acc, e) => {
        acc[e.type] = (acc[e.type] ?? 0) + 1
        return acc
      },
      {} as Record<ExperienceType, number>,
    )
  }, [])

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
          description="Experiences that transformed classroom knowledge into real-world impact."
          storyBeat="Growth"
        />

        {/* Stat counts */}
        <ScrollReveal>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div
                key={s.type}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: typeAccent[s.type] }}
                >
                  {counts[s.type] ?? 0}
                </span>
                <span className="text-xs leading-tight text-text-secondary">{s.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-all duration-300',
                  filter === f.id
                    ? 'border border-purple/30 bg-purple/20 text-purple-light'
                    : 'border border-transparent text-text-muted hover:border-border-subtle hover:text-text-secondary',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="space-y-4">
          {filtered.map((entry, i) => (
            <ScrollReveal key={entry.id} delay={i * 0.06}>
              <ExperienceCard entry={entry} />
            </ScrollReveal>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  )
}
