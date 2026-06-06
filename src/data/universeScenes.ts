import type { UniverseSceneMeta } from '@/types/universe'
import engineerImg from '@/assets/scenes/engineer.png'
import researcherImg from '@/assets/scenes/researcher.png'
import athleteImg from '@/assets/scenes/athlete.png'
import speakerImg from '@/assets/scenes/speaker.png'
import explorerImg from '@/assets/scenes/explorer.png'
import realMeImg from '@/assets/scenes/realMe.png'

export const UNIVERSE_SCENE_COUNT = 6

export const AUTO_ROTATION_INTERVAL_MS = 8000
export const AUTO_ROTATION_RESUME_MS = 3000

export const UNIVERSE_SCENES: UniverseSceneMeta[] = [
  {
    id: 'engineer',
    index: 0,
    label: 'Software Engineer',
    shortLabel: 'Code',
    mood: 'Focused • Professional • Technical',
    description: 'Building systems, shipping code, architecting solutions.',
    accentColor: '#3b82f6',
    image: engineerImg,
  },
  {
    id: 'researcher',
    index: 1,
    label: 'AI Researcher',
    shortLabel: 'Research',
    mood: 'Experimental • Analytical • Innovative',
    description: 'Exploring neural networks, benchmarks, and discovery.',
    accentColor: '#7c3aed',
    image: researcherImg,
  },
  {
    id: 'athlete',
    index: 2,
    label: 'Endurance Athlete',
    shortLabel: 'Athlete',
    mood: 'Disciplined • Resilient • Driven',
    description: 'Running, triathlon, Ironman — discipline in motion.',
    accentColor: '#06b6d4',
    image: athleteImg,
  },
  {
    id: 'speaker',
    index: 3,
    label: 'Public Speaker',
    shortLabel: 'Speaker',
    mood: 'Confident • Expressive • Influential',
    description: 'Leading conversations, presenting ideas, inspiring teams.',
    accentColor: '#a855f7',
    image: speakerImg,
  },
  {
    id: 'explorer',
    index: 4,
    label: 'Explorer',
    shortLabel: 'Explorer',
    mood: 'Curious • Adventurous • Global',
    description: 'Traveling the world, embracing new cultures and horizons.',
    accentColor: '#f59e0b',
    image: explorerImg,
  },
  {
    id: 'realMe',
    index: 5,
    label: 'The Real Me',
    shortLabel: 'Real Me',
    mood: 'Authentic • Ambitious • Balanced',
    description: 'The person behind the work — calm, confident, real.',
    accentColor: '#c084fc',
    image: realMeImg,
  },
]

export function getSceneAngle(index: number): number {
  return -(index * (Math.PI * 2)) / UNIVERSE_SCENE_COUNT
}
