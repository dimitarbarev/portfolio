import { useState, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import {
  SKILLS_CONSTELLATION,
  SKILLS_BY_ID,
  SKILL_CLUSTER_LABELS,
} from '@/data/skills'
import type { SkillCluster, SkillNode } from '@/types'
import { useExploration } from '@/context/ExplorationContext'
import { cn } from '@/utils/cn'

type ClusterFilter = SkillCluster | 'all'

const clusterFilters: { id: ClusterFilter; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: '#a78bfa' },
  { id: 'engineering', label: 'Software Engineering', color: '#3b82f6' },
  { id: 'ai', label: 'AI & Research', color: '#a855f7' },
  { id: 'cloud', label: 'Cloud & DevOps', color: '#14b8a6' },
  { id: 'center', label: 'Architecture', color: '#818cf8' },
  { id: 'leadership', label: 'Leadership', color: '#ec4899' },
]

const categoryColors: Record<SkillNode['category'], string> = {
  backend: '#3b82f6',
  frontend: '#22d3ee',
  cloud: '#14b8a6',
  ai: '#a855f7',
  devops: '#0d9488',
  architecture: '#818cf8',
  leadership: '#ec4899',
  personal: '#f59e0b',
}

const clusterLabels: Record<SkillCluster, string> = {
  center: 'System Architecture',
  engineering: 'Software Engineering',
  ai: 'AI & Research',
  cloud: 'Cloud & DevOps',
  leadership: 'Leadership & Communication',
  personal: 'Personal Development',
}

function nodeColor(node: SkillNode) {
  return node.accentColor ?? categoryColors[node.category]
}

function edgeKey(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`
}

function isNodeRelated(hoveredId: string | null, nodeId: string): boolean {
  if (!hoveredId) return true
  if (hoveredId === nodeId) return true
  const hovered = SKILLS_BY_ID[hoveredId]
  if (!hovered) return false
  return hovered.connections.includes(nodeId)
}

function SkillConstellation({
  nodes,
  activeCluster,
  onNodeHover,
}: {
  nodes: SkillNode[]
  activeCluster: ClusterFilter
  onNodeHover: (node: SkillNode | null) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (activeCluster === 'all') return nodes
    return nodes.filter((n) => n.cluster === activeCluster)
  }, [nodes, activeCluster])

  const handleHover = useCallback(
    (node: SkillNode | null) => {
      setHoveredId(node?.id ?? null)
      onNodeHover(node)
    },
    [onNodeHover],
  )

  const sizeMap = { sm: 3, md: 4.5, lg: 6, xl: 7.5 }

  const edges = useMemo(() => {
    const seen = new Set<string>()
    const result: { from: SkillNode; to: SkillNode }[] = []
    for (const node of filtered) {
      for (const connId of node.connections) {
        const key = edgeKey(node.id, connId)
        if (seen.has(key)) continue
        const target = nodes.find((n) => n.id === connId)
        if (!target || !filtered.includes(target)) continue
        seen.add(key)
        result.push({ from: node, to: target })
      }
    }
    return result
  }, [filtered, nodes])

  const clusterGlows = useMemo(
    () =>
      (['engineering', 'ai', 'cloud', 'center', 'leadership'] as SkillCluster[]).map(
        (cluster) => {
          const meta = SKILL_CLUSTER_LABELS[cluster]
          return (
            <ellipse
              key={cluster}
              cx={meta.glowX ?? meta.x}
              cy={meta.glowY ?? (cluster === 'center' ? 48 : meta.y)}
              rx={
                meta.glowRx ??
                (cluster === 'center' ? 14 : cluster === 'engineering' ? 16 : 18)
              }
              ry={
                meta.glowRy ??
                (cluster === 'center' ? 12 : cluster === 'ai' || cluster === 'cloud' ? 10 : 14)
              }
              fill={meta.color}
              opacity={activeCluster === 'all' || activeCluster === cluster ? 0.06 : 0.02}
              className="transition-opacity duration-500"
            />
          )
        },
      ),
    [activeCluster],
  )

  return (
    <svg
      ref={svgRef}
      viewBox="-6 -8 112 116"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="skills-glow">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#a855f7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <filter id="node-pulse">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {clusterGlows}
      <circle cx="50" cy="50" r="10" fill="url(#skills-glow)" />

      {(['engineering', 'ai', 'cloud', 'center', 'leadership'] as SkillCluster[]).map(
        (cluster) => {
          const meta = SKILL_CLUSTER_LABELS[cluster]
          if (!meta.label) return null
          const isActive = activeCluster === 'all' || activeCluster === cluster
          return (
            <text
              key={`label-${cluster}`}
              x={meta.x}
              y={cluster === 'center' ? 63 : meta.y}
              textAnchor="middle"
              fill={meta.color}
              fontSize="2"
              opacity={isActive ? 0.45 : 0.15}
              className="select-none uppercase tracking-widest transition-opacity duration-500"
            >
              {meta.label}
            </text>
          )
        },
      )}

      {edges.map(({ from, to }) => {
        const isHighlighted = hoveredId
          ? hoveredId === from.id || hoveredId === to.id
          : false
        const isHubEdge =
          from.id === 'system-design' ||
          to.id === 'system-design' ||
          from.id === 'software-architecture' ||
          to.id === 'software-architecture'
        const isDimmed = hoveredId !== null && !isHighlighted
        return (
          <line
            key={edgeKey(from.id, to.id)}
            x1={from.x * 100}
            y1={from.y * 100}
            x2={to.x * 100}
            y2={to.y * 100}
            stroke={
              isHighlighted
                ? '#c4b5fd'
                : isHubEdge
                  ? 'rgba(129, 140, 248, 0.22)'
                  : 'rgba(255,255,255,0.07)'
            }
            strokeWidth={isHighlighted ? 0.4 : isHubEdge ? 0.22 : 0.14}
            opacity={isDimmed ? 0.25 : 1}
            className="transition-all duration-300"
          />
        )
      })}

      {filtered.map((node) => {
        const isHovered = hoveredId === node.id
        const isRelated = isNodeRelated(hoveredId, node.id)
        const isDimmed = hoveredId !== null && !isRelated
        const r = sizeMap[node.size ?? 'md']
        const showLabel =
          isHovered || isRelated || node.size === 'lg' || node.size === 'xl'
        const labelAbove = node.y > 0.78
        const color = nodeColor(node)
        const isHub = node.id === 'system-design'

        return (
          <g
            key={node.id}
            onMouseEnter={() => handleHover(node)}
            onMouseLeave={() => handleHover(null)}
            className="cursor-pointer"
            opacity={isDimmed ? 0.3 : 1}
            style={{ transition: 'opacity 300ms' }}
          >
            {(node.size === 'lg' || node.size === 'xl') && (
              <circle
                cx={node.x * 100}
                cy={node.y * 100}
                r={r + (isHub ? 4 : 3)}
                fill={color}
                opacity={isHub ? 0.1 : 0.07}
                filter="url(#node-pulse)"
              >
                <animate
                  attributeName="r"
                  values={`${r + 3};${r + (isHub ? 5 : 4)};${r + 3}`}
                  dur={isHub ? '5s' : '4s'}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={isHub ? '0.07;0.14;0.07' : '0.05;0.1;0.05'}
                  dur={isHub ? '5s' : '4s'}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            {(isHovered || (isRelated && hoveredId)) && (
              <circle
                cx={node.x * 100}
                cy={node.y * 100}
                r={r + 2}
                fill={color}
                opacity={isHovered ? 0.28 : 0.12}
              />
            )}
            <circle
              cx={node.x * 100}
              cy={node.y * 100}
              r={r}
              fill={color}
              opacity={isHovered ? 1 : isRelated && hoveredId ? 0.9 : 0.7}
              className="transition-opacity duration-300"
            />
            {showLabel && (
              <text
                x={node.x * 100}
                y={
                  labelAbove
                    ? node.y * 100 - r - 2.5
                    : node.y * 100 + r + 2.8
                }
                textAnchor="middle"
                fill={isHovered ? '#f4f4f5' : isDimmed ? '#71717a' : '#a1a1aa'}
                fontSize={node.size === 'xl' ? 2.8 : node.size === 'lg' ? 2.4 : 1.9}
                fontWeight={node.size === 'xl' ? 600 : 400}
                className="select-none transition-fill duration-300 pointer-events-none"
              >
                {node.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function SkillsSection() {
  const [activeCluster, setActiveCluster] = useState<ClusterFilter>('all')
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null)
  const { discover } = useExploration()

  const relatedNodes = hoveredNode
    ? hoveredNode.connections
        .map((id) => SKILLS_BY_ID[id])
        .filter(Boolean)
    : []

  return (
    <SectionWrapper id="skills" className="section-padding">
      <Container>
        <SectionHeader
          label="Skills"
          title="What kind of engineer am I?"
          description="Not a skill checklist — a map of how engineering, research, architecture, cloud, and leadership reinforce each other. Hover nodes to see the experiences behind them."
          storyBeat="Experience"
        />

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {clusterFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCluster(filter.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-all duration-300',
                  activeCluster === filter.id
                    ? 'text-white'
                    : 'text-text-muted hover:text-text-secondary border border-transparent hover:border-border-subtle',
                )}
                style={
                  activeCluster === filter.id
                    ? {
                        backgroundColor: `${filter.color}33`,
                        borderColor: `${filter.color}50`,
                        color: filter.color,
                      }
                    : undefined
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <ScrollReveal>
            <div
              className="relative aspect-square max-h-[620px] glass rounded-2xl p-3 md:p-5"
              onClick={() => discover('skills', 10)}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-0.5 w-0.5 rounded-full bg-white/20"
                    style={{
                      left: `${(i * 17 + 7) % 100}%`,
                      top: `${(i * 23 + 13) % 100}%`,
                    }}
                  />
                ))}
              </div>
              <SkillConstellation
                nodes={SKILLS_CONSTELLATION}
                activeCluster={activeCluster}
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
                  <p
                    className="text-sm mt-1"
                    style={{ color: nodeColor(hoveredNode) }}
                  >
                    {clusterLabels[hoveredNode.cluster]}
                  </p>
                  {hoveredNode.description ? (
                    <p className="text-text-secondary text-sm mt-4 leading-relaxed">
                      {hoveredNode.description}
                    </p>
                  ) : null}
                  {relatedNodes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
                        Connected strengths
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {relatedNodes.map((n) => (
                          <span
                            key={n.id}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: `${nodeColor(n)}18`,
                              color: nodeColor(n),
                            }}
                          >
                            {n.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <p className="text-text-secondary text-sm leading-relaxed">
                  My profile sits at the intersection of Software Engineering, AI
                  Research, Architecture, and Leadership. Each project, internship, and
                  challenge has strengthened more than one area — from backend systems
                  and OCR research to cloud deployment, public speaking, and team
                  coordination.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}
