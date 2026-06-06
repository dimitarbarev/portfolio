import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import { Badge } from './Badge'
import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  storyBeat?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  storyBeat,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto max-w-2xl',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 mb-4',
          align === 'center' && 'justify-center',
        )}
      >
        <Badge variant="purple">{label}</Badge>
        {storyBeat && (
          <span className="text-xs text-text-muted tracking-widest uppercase">
            {storyBeat}
          </span>
        )}
      </div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  )
}
