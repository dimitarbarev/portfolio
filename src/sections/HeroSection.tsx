import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { SceneShowcase } from '@/components/hero/SceneShowcase'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { PLACEHOLDER_HERO } from '@/data/placeholders'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { scrollToSection } from '@/utils/scroll'

export function HeroSection() {
  return (
    <SectionWrapper id="hero" fullHeight>
      <div className="relative z-10 flex min-h-screen flex-col justify-center section-padding pt-24">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left — Hero copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-xl lg:max-w-none"
            >
              <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-purple to-blue" />
                <span className="text-sm tracking-widest uppercase text-text-muted">
                  Portfolio Experience
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
              >
                {PLACEHOLDER_HERO.headline}
                <br />
                {PLACEHOLDER_HERO.headlineLine2}
                <br />
                <span className="text-gradient">{PLACEHOLDER_HERO.headlineAccent}</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary md:text-xl"
              >
                {PLACEHOLDER_HERO.subheadline}
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection('journey')}>
                  {PLACEHOLDER_HERO.ctaPrimary}
                </Button>
                <Button variant="secondary" onClick={() => scrollToSection('projects')}>
                  {PLACEHOLDER_HERO.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — Personal universe image showcase */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="relative w-full lg:pl-4"
            >
              <SceneShowcase />
            </motion.div>
          </div>
        </Container>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('journey')}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
            aria-label="Scroll to journey"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </SectionWrapper>
  )
}
