import type { AthleticAchievement, AthleticDiscipline } from '@/types'

import bestEfforts from '@/assets/athletics/best-efforts.png'
import openWaterSwim from '@/assets/athletics/open-water-swim.png'
import brutusRun from '@/assets/athletics/brutus-run.png'

export const ATHLETIC_ACHIEVEMENTS: AthleticAchievement[] = [
  {
    id: 'marathon-sub3',
    discipline: 'running',
    title: 'Sub-3 Marathon ⭐',
    date: '2026',
    metric: '2:58:41',
    centerLabel: 'Marathon PB',
    centerSubtext: '42.2 km • Sub-3 Marathon',
    description:
      '2:58:41 marathon personal best at the Ghent Marathon. Breaking the 3-hour barrier required years of consistent training, disciplined pacing, and long-term commitment.',
    link: { href: 'https://soficogentmarathon.com/en/', label: 'Ghent Marathon' },
    image: bestEfforts,
  },
  {
    id: 'half-marathon-pb',
    discipline: 'running',
    title: 'Half Marathon PB ⚡',
    date: '2026',
    metric: '1:28:26',
    centerLabel: 'Half Marathon PB',
    centerSubtext: '21.1 km • Personal Best',
    description:
      '1:28:26 half marathon personal best. A benchmark of speed and endurance developed through structured training and race execution.',
    image: bestEfforts,
  },
  {
    id: 'long-distance-swim',
    discipline: 'swimming',
    title: '6 km Long-Distance Swim 🏊',
    date: '2025',
    metric: '2:19:23',
    centerLabel: 'Long-Distance Swim',
    centerSubtext: '6,025 m • Continuous',
    description:
      '6,025 m completed in 2:19:23. One of my longest continuous swims and an important milestone toward long-distance triathlon goals.',
    image: openWaterSwim,
  },
  {
    id: 'brutus-run',
    discipline: 'trail',
    title: 'Brutus Run — 2nd Place 🏆',
    date: '2026',
    metric: '32.18 km',
    centerLabel: 'Trail Ultra',
    centerSubtext: '1,520 m gain • 2nd Place',
    description:
      '32.18 km mountain trail race with 1,520 m elevation gain at the Brutus Run. Finished in second place after more than seven hours of racing in demanding terrain.',
    link: { href: 'https://brutusrun.com/', label: 'Brutus Run' },
    image: brutusRun,
  },
]

export const ATHLETICS_DISCIPLINES: AthleticDiscipline[] = [
  'running',
  'swimming',
  'cycling',
  'trail',
]
