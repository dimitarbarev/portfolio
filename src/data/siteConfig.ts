/**
 * Public site configuration — personal links, contact endpoints, and assets.
 * Safe to commit: no API keys, tokens, or private backend credentials.
 * Update this file when links or the Formspree form change.
 */

/** Production domain — used for canonical, Open Graph, sitemap, and JSON-LD. */
export const SITE_URL = 'https://dimitarbarev.com'

export const SITE_SEO = {
  title: 'Portfolio of Dimitar Barev | Software Engineer & AI Researcher',
  description:
    'Portfolio of Dimitar Barev — software engineer and AI researcher. OCR benchmarking, cloud-native systems, and experience at ASML and Fraunhofer.',
  siteName: 'Dimitar Barev',
  jobTitle: 'Software Engineer & AI Researcher',
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
  path: '/Dimitar_Barev_Resume_September2026.pdf',
  downloadFilename: 'Dimitar_Barev_Resume_September2026.pdf',
} as const

/** Formspree form endpoint — public form ID, not a secret. */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeopyne'
