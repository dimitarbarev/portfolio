import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Timer, Mountain, Waves } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_ATHLETICS } from '@/data/placeholders'
import type { AthleticAchievement } from '@/types'
import { cn } from '@/utils/cn'

const typeIcons: Record<AthleticAchievement['type'], typeof Activity> = {
  running: Activity,
  triathlon: Waves,
  ironman: Timer,
  endurance: Mountain,
}

export function AthleticsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = PLACEHOLDER_ATHLETICS[activeIndex]

  return (
    <SectionWrapper id="athletics" className="section-padding">
      <Container>
        <SectionHeader
          label="Athletics"
          title="Discipline in motion"
          description="Running, triathlon, Ironman — endurance achievements that mirror the rigor applied to engineering."
          storyBeat="Growth"
        />

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <ScrollReveal>
            <div className="relative aspect-square max-h-[420px]">
              <div className="absolute inset-0 rounded-full border border-purple/10" />
              <div className="absolute inset-8 rounded-full border border-blue/10" />
              <div className="absolute inset-16 rounded-full border border-blue-electric/10" />

              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#athleticGradient)"
                  strokeWidth="2"
                  strokeDasharray={`${(activeIndex + 1) * 50} 502`}
                  className="transition-all duration-700"
                  transform="rotate(-90 100 100)"
                />
                <defs>
                  <linearGradient id="athleticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-display text-5xl md:text-6xl font-bold text-gradient">
                      {active.metric}
                    </span>
                    <p className="text-text-muted text-sm mt-2 uppercase tracking-widest">
                      {active.type}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {PLACEHOLDER_ATHLETICS.map((achievement, i) => {
              const Icon = typeIcons[achievement.type]
              const isActive = i === activeIndex

              return (
                <ScrollReveal key={achievement.id} delay={i * 0.08}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'w-full text-left glass rounded-xl p-5 transition-all duration-300',
                      isActive
                        ? 'border-purple/30 glow-purple'
                        : 'hover:border-border-subtle hover:bg-white/5',
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                          isActive
                            ? 'bg-purple/20 text-purple-light'
                            : 'bg-void-surface text-text-muted',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-text-primary">
                            {achievement.title}
                          </h4>
                          <span className="text-xs text-text-muted">
                            {achievement.date}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
