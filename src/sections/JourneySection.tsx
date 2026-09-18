import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { HorizontalSnapCarousel } from '@/components/ui/HorizontalSnapCarousel'
import { PLACEHOLDER_JOURNEY } from '@/data/placeholders'
import type { JourneyMilestone } from '@/types'
import { cn } from '@/utils/cn'

function JourneyChapterCard({ chapter }: { chapter: JourneyMilestone }) {
  const accent = chapter.accent

  return (
    <div
      className="glass relative overflow-hidden rounded-2xl border p-6 md:p-10 min-h-[340px] h-full"
      style={{
        borderColor: `${accent}33`,
        background: `linear-gradient(135deg, ${accent}1f 0%, rgba(17,17,24,0.5) 55%)`,
        boxShadow: `0 30px 90px -40px ${accent}88`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
        style={{ background: accent }}
      />
      <span
        className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[10rem] leading-none opacity-10"
        aria-hidden
      >
        {chapter.flag}
      </span>

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden>
                {chapter.flag}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {chapter.country}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
              {chapter.title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {chapter.location}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              background: `${accent}12`,
            }}
          >
            {chapter.period}
          </span>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {chapter.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {chapter.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border px-3 py-1.5 text-xs text-text-secondary transition-colors"
              style={{
                borderColor: `${accent}33`,
                background: `${accent}14`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function JourneySection() {
  const [activeId, setActiveId] = useState(PLACEHOLDER_JOURNEY[0]?.id ?? '')
  const activeIndex = Math.max(
    0,
    PLACEHOLDER_JOURNEY.findIndex((m) => m.id === activeId),
  )
  const active = PLACEHOLDER_JOURNEY[activeIndex] ?? PLACEHOLDER_JOURNEY[0]!

  const selectIndex = (index: number) => {
    const chapter = PLACEHOLDER_JOURNEY[index]
    if (chapter) setActiveId(chapter.id)
  }

  return (
    <SectionWrapper id="journey" className="section-padding">
      <Container>
        <SectionHeader
          label="Journey"
          title="Engineering Growth Around The Globe"
          description="A journey through education, exploration, and applied research."
          storyBeat="Four chapters"
        />

        {/* Mobile: flag rail + horizontal cards */}
        <div className="md:hidden">
          <div className="relative mb-6">
            <div className="absolute left-[12%] right-[12%] top-6 h-px bg-gradient-to-r from-purple/25 via-white/15 to-purple/25" />
            <div className="relative flex items-start justify-between">
              {PLACEHOLDER_JOURNEY.map((chapter, i) => {
                const isActive = chapter.id === activeId
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => selectIndex(i)}
                    className="flex flex-col items-center gap-2"
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`${chapter.country}, ${chapter.period}`}
                  >
                    <span
                      className={cn(
                        'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-xl transition-all duration-300',
                        isActive ? 'scale-110' : 'scale-90 grayscale-[0.35]',
                      )}
                      style={
                        isActive
                          ? {
                              borderColor: chapter.accent,
                              background: `${chapter.accent}22`,
                              boxShadow: `0 10px 28px -12px ${chapter.accent}aa`,
                            }
                          : {
                              borderColor: 'var(--color-border-subtle)',
                              background: 'var(--color-void-surface)',
                            }
                      }
                    >
                      <span aria-hidden>{chapter.flag}</span>
                    </span>
                    <span
                      className={cn(
                        'max-w-[72px] text-center text-[10px] font-medium uppercase tracking-[0.14em] leading-tight',
                        isActive ? 'text-text-primary' : 'text-text-muted',
                      )}
                      style={isActive ? { color: chapter.accent } : undefined}
                    >
                      {chapter.country}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <HorizontalSnapCarousel
            ariaLabel="Journey chapters"
            activeIndex={activeIndex}
            onIndexChange={selectIndex}
          >
            {PLACEHOLDER_JOURNEY.map((chapter) => (
              <JourneyChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </HorizontalSnapCarousel>
        </div>

        {/* Desktop: vertical country nav + active chapter */}
        <div className="hidden gap-8 lg:grid-cols-[300px_1fr] md:grid">
          <ScrollReveal>
            <div className="relative flex flex-col gap-2">
              <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-purple/40 via-blue/20 to-transparent" />

              {PLACEHOLDER_JOURNEY.map((chapter, i) => {
                const isActive = chapter.id === activeId
                return (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveId(chapter.id)}
                    className={cn(
                      'relative flex items-center gap-4 rounded-xl p-3 text-left transition-all duration-300',
                      isActive ? 'glass' : 'hover:bg-white/5',
                    )}
                    style={
                      isActive
                        ? {
                            borderColor: `${chapter.accent}55`,
                            boxShadow: `0 12px 40px -16px ${chapter.accent}aa`,
                          }
                        : undefined
                    }
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div
                      className={cn(
                        'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-300',
                        !isActive && 'border-border-subtle bg-void-surface grayscale-[0.4]',
                      )}
                      style={
                        isActive
                          ? {
                              borderColor: chapter.accent,
                              background: `${chapter.accent}22`,
                            }
                          : undefined
                      }
                    >
                      <span aria-hidden>{chapter.flag}</span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'text-base font-semibold leading-tight transition-colors',
                          isActive ? 'text-text-primary' : 'text-text-secondary',
                        )}
                        style={isActive ? { color: chapter.accent } : undefined}
                      >
                        {chapter.country}
                      </p>
                      <span className="text-xs text-text-muted">
                        {String(i + 1).padStart(2, '0')} · {chapter.period}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <JourneyChapterCard chapter={active} />
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}
