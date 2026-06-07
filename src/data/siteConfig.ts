/**
 * Public site configuration — personal links, contact endpoints, and assets.
 * Safe to commit: no API keys, tokens, or private backend credentials.
 * Update this file when links or the Formspree form change.
 */

export const SITE_SEO = {
  title: 'Dimitar Barev | Software Engineer & AI Researcher',
  description:
    'Personal portfolio of Dimitar Barev, Software Engineer and AI Researcher. Explore OCR benchmarking research, cloud-native projects, distributed systems, public speaking achievements, endurance sports and professional experience.',
  siteName: 'Dimitar Barev',
  ogImagePath: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    'Dimitar Barev — Software Engineer, AI Researcher, Public Speaker, and Endurance Athlete',
  twitterCard: 'summary_large_image',
} as const

export const SITE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/dimitarbarev',
  github: 'https://github.com/dimitarbarev',
  medium: 'https://medium.com/@mitkobarev',
  strava: 'https://www.strava.com/athletes/138482201',
} as const

export const SITE_CV = {
  path: '/Dimitar_Barev_Resume.pdf',
  downloadFilename: 'Dimitar_Barev_Resume.pdf',
} as const

/** Formspree form endpoint — public form ID, not a secret. */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeopyne'
