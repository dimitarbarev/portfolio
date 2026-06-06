import { motion } from 'framer-motion'
import { Code, Brain, Activity, Mic, Compass, User } from 'lucide-react'
import { UNIVERSE_SCENES } from '@/data/universeScenes'
import type { UniverseSceneId } from '@/types/universe'
import { cn } from '@/utils/cn'

const sceneIcons: Record<UniverseSceneId, typeof Code> = {
  engineer: Code,
  researcher: Brain,
  athlete: Activity,
  speaker: Mic,
  explorer: Compass,
  realMe: User,
}

interface ScenePillsProps {
  activeIndex: number
  accent: string
  onSelect: (index: number) => void
}

export function ScenePills({ activeIndex, accent, onSelect }: ScenePillsProps) {
  return (
    <div
      className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
      role="tablist"
      aria-label="Choose a dimension"
    >
      {UNIVERSE_SCENES.map((scene, i) => {
        const Icon = sceneIcons[scene.id]
        const isActive = i === activeIndex
        return (
          <button
            key={scene.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(i)}
            className={cn(
              'relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300',
              isActive
                ? 'text-white'
                : 'border-white/10 bg-white/[0.03] text-text-muted hover:border-white/20 hover:text-text-secondary',
            )}
            style={
              isActive
                ? {
                    borderColor: `${scene.accentColor}66`,
                    background: `${scene.accentColor}1f`,
                    boxShadow: `0 8px 30px -10px ${scene.accentColor}88`,
                  }
                : undefined
            }
          >
            {isActive && (
              <motion.span
                layoutId="scene-pill-active"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <Icon
              className="h-4 w-4 shrink-0"
              style={{ color: isActive ? scene.accentColor : undefined }}
              strokeWidth={2}
            />
            <span>{scene.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
