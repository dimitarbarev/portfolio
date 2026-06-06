import { motion } from 'framer-motion'
import { Mic, Users, Award, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_LEADERSHIP } from '@/data/placeholders'
import type { LeadershipItem } from '@/types'
import { cn } from '@/utils/cn'

const typeConfig: Record<
  LeadershipItem['type'],
  { icon: typeof Mic; gradient: string }
> = {
  speaking: { icon: Mic, gradient: 'from-purple/30 to-transparent' },
  toastmasters: { icon: MessageCircle, gradient: 'from-blue/30 to-transparent' },
  mentoring: { icon: Users, gradient: 'from-blue-electric/30 to-transparent' },
  team: { icon: Award, gradient: 'from-purple-light/30 to-transparent' },
}

export function LeadershipSection() {
  return (
    <SectionWrapper id="leadership" className="section-padding bg-void-elevated">
      <Container>
        <SectionHeader
          label="Leadership"
          title="Leading beyond the keyboard"
          description="Public speaking, mentoring, Toastmasters, and team leadership — communication as a craft."
          storyBeat="Leadership"
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PLACEHOLDER_LEADERSHIP.map((item, i) => {
            const config = typeConfig[item.type]
            const Icon = config.icon

            return (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden glass rounded-2xl p-8 h-full"
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                      config.gradient,
                    )}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 border border-purple/20">
                        <Icon className="h-5 w-5 text-purple-light" />
                      </div>
                      {item.metric && (
                        <span className="font-display text-2xl font-bold text-gradient">
                          {item.metric}
                        </span>
                      )}
                    </div>

                    <span className="text-xs tracking-widest uppercase text-text-muted">
                      {item.period}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
