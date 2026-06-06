import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { PLACEHOLDER_SKILLS } from '@/data/placeholders'
import type { SkillCategory, SkillNode } from '@/types'
import { useExploration } from '@/context/ExplorationContext'
import { cn } from '@/utils/cn'

const categories: { id: SkillCategory | 'all'; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: '#a855f7' },
  { id: 'backend', label: 'Backend', color: '#7c3aed' },
  { id: 'frontend', label: 'Frontend', color: '#3b82f6' },
  { id: 'cloud', label: 'Cloud', color: '#06b6d4' },
  { id: 'ai', label: 'AI', color: '#a855f7' },
  { id: 'devops', label: 'DevOps', color: '#3b82f6' },
  { id: 'architecture', label: 'Architecture', color: '#06b6d4' },
  { id: 'leadership', label: 'Leadership', color: '#c084fc' },
]

const categoryColors: Record<SkillCategory, string> = {
  backend: '#7c3aed',
  frontend: '#3b82f6',
  cloud: '#06b6d4',
  ai: '#a855f7',
  devops: '#2563eb',
  architecture: '#0891b2',
  leadership: '#c084fc',
}

function SkillConstellation({
  nodes,
  activeCategory,
  onNodeHover,
}: {
  nodes: SkillNode[]
  activeCategory: SkillCategory | 'all'
  onNodeHover: (node: SkillNode | null) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered =
    activeCategory === 'all'
      ? nodes
      : nodes.filter((n) => n.category === activeCategory)

  const handleHover = useCallback(
    (node: SkillNode | null) => {
      setHoveredId(node?.id ?? null)
      onNodeHover(node)
    },
    [onNodeHover],
  )

  const sizeMap = { sm: 4, md: 6, lg: 8 }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="40" fill="url(#glow)" />

      {filtered.map((node) =>
        node.connections.map((connId) => {
          const target = nodes.find((n) => n.id === connId)
          if (!target || !filtered.includes(target)) return null
          const isHighlighted =
            hoveredId === node.id || hoveredId === connId
          return (
            <line
              key={`${node.id}-${connId}`}
              x1={node.x * 100}
              y1={node.y * 100}
              x2={target.x * 100}
              y2={target.y * 100}
              stroke={isHighlighted ? '#a855f7' : 'rgba(255,255,255,0.06)'}
              strokeWidth={isHighlighted ? 0.4 : 0.15}
              className="transition-all duration-300"
            />
          )
        }),
      )}

      {filtered.map((node) => {
        const isHovered = hoveredId === node.id
        const r = sizeMap[node.size ?? 'md']
        return (
          <g
            key={node.id}
            onMouseEnter={() => handleHover(node)}
            onMouseLeave={() => handleHover(null)}
            className="cursor-pointer"
          >
            {isHovered && (
              <circle
                cx={node.x * 100}
                cy={node.y * 100}
                r={r + 4}
                fill={categoryColors[node.category]}
                opacity={0.2}
              />
            )}
            <circle
              cx={node.x * 100}
              cy={node.y * 100}
              r={r}
              fill={categoryColors[node.category]}
              opacity={isHovered ? 1 : 0.7}
              className="transition-opacity duration-300"
            />
            <text
              x={node.x * 100}
              y={node.y * 100 + r + 3}
              textAnchor="middle"
              fill={isHovered ? '#f4f4f5' : '#a1a1aa'}
              fontSize="2.5"
              className="select-none transition-fill duration-300"
            >
              {node.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null)
  const { discover } = useExploration()

  return (
    <SectionWrapper id="skills" className="section-padding">
      <Container>
        <SectionHeader
          label="Skills"
          title="A constellation of capabilities"
          description="An interconnected ecosystem — not progress bars. Hover nodes to explore connections."
          storyBeat="Experience"
        />

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-all duration-300',
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'text-text-muted hover:text-text-secondary border border-transparent hover:border-border-subtle',
                )}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: `${cat.color}33`, borderColor: `${cat.color}50`, color: cat.color }
                    : undefined
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <ScrollReveal>
            <div
              className="relative aspect-square max-h-[500px] glass rounded-2xl p-4 md:p-8"
              onClick={() => discover('skills', 10)}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-0.5 w-0.5 rounded-full bg-white/20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
              <SkillConstellation
                nodes={PLACEHOLDER_SKILLS}
                activeCategory={activeCategory}
                onNodeHover={setHoveredNode}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass rounded-2xl p-6 h-fit sticky top-24">
              <h4 className="text-sm text-text-muted uppercase tracking-widest mb-4">
                {hoveredNode ? 'Selected Node' : 'Ecosystem View'}
              </h4>
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-display text-xl font-semibold text-text-primary">
                    {hoveredNode.name}
                  </p>
                  <p className="text-sm text-purple-light capitalize mt-1">
                    {hoveredNode.category}
                  </p>
                  <p className="text-text-secondary text-sm mt-4 leading-relaxed">
                    Connected to{' '}
                    {hoveredNode.connections
                      .map((id) => PLACEHOLDER_SKILLS.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(', ') || 'no nodes'}
                    .
                  </p>
                </motion.div>
              ) : (
                <p className="text-text-secondary text-sm leading-relaxed">
                  Select a category filter or hover over constellation nodes to
                  reveal skill relationships and depth areas.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}
