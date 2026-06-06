import { motion } from 'framer-motion'
import { FileText, FlaskConical, BarChart3, BookOpen } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_RESEARCH } from '@/data/placeholders'
import type { ResearchType } from '@/types'
import { cn } from '@/utils/cn'

const typeConfig: Record<
  ResearchType,
  { icon: typeof FileText; label: string; color: string }
> = {
  thesis: { icon: BookOpen, label: 'Thesis', color: 'text-purple-light' },
  paper: { icon: FileText, label: 'Paper', color: 'text-blue' },
  experiment: { icon: FlaskConical, label: 'Experiment', color: 'text-blue-electric' },
  benchmark: { icon: BarChart3, label: 'Benchmark', color: 'text-purple' },
}

const statusStyles = {
  published: 'bg-green-500/10 text-green-400 border-green-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  preprint: 'bg-blue/10 text-blue border-blue/20',
}

export function ResearchSection() {
  return (
    <SectionWrapper id="research" className="section-padding bg-void-elevated">
      <Container>
        <SectionHeader
          label="Research"
          title="Exploring the unknown"
          description="Thesis work, papers, experiments, and benchmarks — a scientific lens on hard problems."
          storyBeat="Research"
        />

        <div className="grid gap-6">
          {PLACEHOLDER_RESEARCH.map((item, i) => {
            const config = typeConfig[item.type]
            const Icon = config.icon

            return (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <motion.article
                  whileHover={{ x: 4 }}
                  className="group relative glass rounded-xl p-6 md:p-8 border border-border-subtle hover:border-purple/20 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-gradient-to-b from-purple to-blue opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-void-surface border border-border-subtle">
                      <Icon className={cn('h-5 w-5', config.color)} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs tracking-widest uppercase text-text-muted">
                          {config.label}
                        </span>
                        <span className="text-xs text-text-muted">{item.year}</span>
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-0.5 text-xs capitalize',
                            statusStyles[item.status],
                          )}
                        >
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-purple-light transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-text-secondary leading-relaxed font-light">
                        {item.abstract}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>

                    <Badge variant="outline" className="shrink-0 hidden md:flex">
                      Read abstract →
                    </Badge>
                  </div>
                </motion.article>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
