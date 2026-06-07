import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Bike, Footprints, Mountain, Waves } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { ATHLETIC_ACHIEVEMENTS, ATHLETICS_DISCIPLINES } from '@/data/athletics'
import type { AthleticDiscipline, AthleticAchievement } from '@/types'
import { cn } from '@/utils/cn'

const disciplineIcons: Record<AthleticDiscipline, typeof Activity> = {
  running: Footprints,
  swimming: Waves,
  cycling: Bike,
  trail: Mountain,
}

const disciplineColors: Record<AthleticDiscipline, string> = {
  running: '#a855f7',
  swimming: '#06b6d4',
  cycling: '#3b82f6',
  trail: '#f59e0b',
}

const disciplineProgress: Record<AthleticDiscipline, number> = {
  running: 0.92,
  swimming: 0.78,
  cycling: 0.65,
  trail: 0.85,
}

const RING_RADII = [72, 58, 44, 30] as const
const ORBIT_RADIUS = 82

function DisciplineOrbit({
  discipline,
  angle,
  isActive,
}: {
  discipline: AthleticDiscipline
  angle: number
  isActive: boolean
}) {
  const Icon = disciplineIcons[discipline]
  const color = disciplineColors[discipline]
  const rad = (angle * Math.PI) / 180
  const x = 100 + ORBIT_RADIUS * Math.cos(rad)
  const y = 100 + ORBIT_RADIUS * Math.sin(rad)

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        r="15"
        fill="rgba(10,10,15,0.9)"
        stroke={isActive ? color : `${color}44`}
        strokeWidth={isActive ? 1.5 : 1}
      />
      <foreignObject x="-8" y="-8" width="16" height="16">
        <div
          className="flex h-4 w-4 items-center justify-center"
          style={{ color: isActive ? color : `${color}99` }}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        </div>
      </foreignObject>
    </g>
  )
}

function ProgressRings({ activeDiscipline }: { activeDiscipline: AthleticDiscipline }) {
  return (
    <svg
      viewBox="-8 -8 216 216"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id="athleticsRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {ATHLETICS_DISCIPLINES.map((discipline, i) => {
        const r = RING_RADII[i]!
        const circumference = 2 * Math.PI * r
        const progress = disciplineProgress[discipline]
        const isActive = discipline === activeDiscipline
        const color = disciplineColors[discipline]

        return (
          <motion.circle
            key={discipline}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={isActive ? color : `${color}33`}
            strokeWidth={isActive ? 2.5 : 1.5}
            strokeLinecap="round"
            strokeDasharray={`${progress * circumference} ${circumference}`}
            transform="rotate(-90 100 100)"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.4,
              strokeWidth: isActive ? 2.5 : 1.5,
            }}
            transition={{ duration: 0.5 }}
          />
        )
      })}

      <circle
        cx="100"
        cy="100"
        r={RING_RADII[0]}
        fill="none"
        stroke="url(#athleticsRingGradient)"
        strokeWidth="1"
        opacity="0.15"
      />

      <DisciplineOrbit discipline="running" angle={-90} isActive={activeDiscipline === 'running'} />
      <DisciplineOrbit discipline="swimming" angle={0} isActive={activeDiscipline === 'swimming'} />
      <DisciplineOrbit discipline="cycling" angle={90} isActive={activeDiscipline === 'cycling'} />
      <DisciplineOrbit discipline="trail" angle={180} isActive={activeDiscipline === 'trail'} />
    </svg>
  )
}

function AchievementDescription({ achievement }: { achievement: AthleticAchievement }) {
  const { description, link } = achievement

  if (!link) {
    return <p className="mt-2 text-sm text-text-secondary line-clamp-3">{description}</p>
  }

  const parts = description.split(link.label)
  if (parts.length < 2) {
    return <p className="mt-2 text-sm text-text-secondary line-clamp-3">{description}</p>
  }

  return (
    <p className="mt-2 text-sm text-text-secondary line-clamp-3">
      {parts[0]}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-purple-light underline decoration-purple-light/40 underline-offset-2 transition-colors hover:text-purple hover:decoration-purple"
      >
        {link.label}
      </a>
      {parts.slice(1).join(link.label)}
    </p>
  )
}

function AchievementCard({
  achievement,
  isActive,
  onSelect,
}: {
  achievement: AthleticAchievement
  isActive: boolean
  onSelect: () => void
}) {
  const Icon = disciplineIcons[achievement.discipline]
  const color = disciplineColors[achievement.discipline]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full text-left glass rounded-xl p-5 transition-all duration-300',
        isActive
          ? 'border-purple/30 glow-purple'
          : 'hover:border-border-subtle hover:bg-white/5',
      )}
      style={
        isActive
          ? {
              borderColor: `${color}44`,
              boxShadow: `0 20px 50px -24px ${color}55`,
            }
          : undefined
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            isActive ? 'text-white' : 'bg-void-surface text-text-muted',
          )}
          style={isActive ? { background: `${color}33`, color } : undefined}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-medium text-text-primary">{achievement.title}</h4>
            <span className="shrink-0 text-xs text-text-muted">{achievement.date}</span>
          </div>

          <div className="mt-1">
            <span
              className="font-display text-sm font-semibold tabular-nums"
              style={{ color: isActive ? color : undefined }}
            >
              {achievement.metric}
            </span>
          </div>

          <AchievementDescription achievement={achievement} />
        </div>
      </div>
    </button>
  )
}

function CenterDisplay({ achievement }: { achievement: AthleticAchievement }) {
  const color = disciplineColors[achievement.discipline]

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <span
            className="font-display text-4xl font-bold tabular-nums sm:text-5xl md:text-[3.25rem]"
            style={{
              background: `linear-gradient(135deg, #f4f4f5 20%, ${color} 80%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {achievement.metric}
          </span>
          <p
            className="mt-2 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color }}
          >
            {achievement.centerLabel}
          </p>
          <p className="mt-1 text-sm text-text-muted">{achievement.centerSubtext}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function AthleticsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = ATHLETIC_ACHIEVEMENTS[activeIndex]!

  return (
    <SectionWrapper id="athletics" className="section-padding">
      <Container>
        <SectionHeader
          label="Athletics"
          title="Discipline in motion"
          description="Endurance sports have taught me the same lessons as software engineering: consistency, patience, resilience, and continuous improvement."
          storyBeat="Growth"
        />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative mx-auto w-full max-w-[460px] overflow-visible px-4 py-6">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-[6%] rounded-full border border-purple/10" />
                <div className="absolute inset-[14%] rounded-full border border-blue/10" />
                <div className="absolute inset-[22%] rounded-full border border-blue-electric/10" />

                <ProgressRings activeDiscipline={active.discipline} />

                <CenterDisplay achievement={active} />

                <motion.div
                  className="pointer-events-none absolute inset-[4%] rounded-full blur-3xl"
                  style={{ background: disciplineColors[active.discipline] }}
                  animate={{ opacity: [0.06, 0.14, 0.06] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {ATHLETIC_ACHIEVEMENTS.map((achievement, i) => (
              <ScrollReveal key={achievement.id} delay={i * 0.08}>
                <AchievementCard
                  achievement={achievement}
                  isActive={i === activeIndex}
                  onSelect={() => setActiveIndex(i)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
