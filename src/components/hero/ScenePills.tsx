import { useEffect, useRef } from 'react'
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
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const active = activeRef.current
    if (!scroller || !active) return
    if (scroller.scrollWidth <= scroller.clientWidth) return

    const scrollerBox = scroller.getBoundingClientRect()
    const activeBox = active.getBoundingClientRect()
    const delta =
      activeBox.left - scrollerBox.left - (scroller.clientWidth - activeBox.width) / 2
    scroller.scrollTo({
      left: scroller.scrollLeft + delta,
      behavior: 'smooth',
    })
  }, [activeIndex])

  return (
    <div
      ref={scrollerRef}
      className="mt-3 w-full min-w-0 overflow-x-auto no-scrollbar md:mt-6 md:overflow-visible"
      role="tablist"
      aria-label="Choose a dimension"
    >
      <div className="flex w-max min-w-full flex-nowrap items-center justify-center gap-1.5 px-1 md:w-full md:flex-wrap md:gap-2.5 md:px-0">
        {UNIVERSE_SCENES.map((scene, i) => {
          const Icon = sceneIcons[scene.id]
          const isActive = i === activeIndex
          return (
            <button
              key={scene.id}
              ref={isActive ? activeRef : undefined}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(i)}
              className={cn(
                'relative flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-all duration-300 md:gap-2 md:px-3.5 md:py-2 md:text-sm',
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
                className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4"
                style={{ color: isActive ? scene.accentColor : undefined }}
                strokeWidth={2}
              />
              <span>{scene.shortLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
