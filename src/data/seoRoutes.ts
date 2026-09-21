/** Crawlable routes and off-site articles — no asset imports, safe for the Vite SEO plugin. */

export const ARTICLE_SEO = {
  title: 'A Reproducible OCR Benchmarking System for Scanned Car Repair Invoices',
  description:
    "Technical article based on Bachelor's thesis conducted at Fraunhofer Institute for Industrial Engineering IAO.",
  url: 'https://medium.com/@mitkobarev/a-reproducible-ocr-benchmarking-system-for-scanned-car-repair-invoices-fff3f80c06f1',
  year: '2026',
  author: 'Barev, D.',
} as const

export const PROJECT_SEO_ROUTES = [
  {
    id: 'asml-prioritization',
    title: 'Enterprise Request Prioritization Library | Dimitar Barev',
    description:
      'Java request-prioritization library built at ASML to solve the noisy-neighbor problem in concurrent enterprise systems.',
    year: '2025',
    organization: 'ASML',
    noscript:
      'Enterprise Request Prioritization Library — a reusable Java library developed at ASML to schedule requests fairly, prevent noisy-neighbor degradation, and keep throughput high in enterprise systems.',
  },
  {
    id: 'fraunhofer-ocr',
    title: `${ARTICLE_SEO.title} | Dimitar Barev`,
    description:
      'A reproducible OCR benchmarking system for scanned car repair invoices — Fraunhofer IAO research by Dimitar Barev.',
    year: '2026',
    organization: 'Fraunhofer IAO',
    sameAs: ARTICLE_SEO.url,
    noscript: `${ARTICLE_SEO.title}. Applied research at Fraunhofer IAO comparing OCR architectures for insurance invoice extraction. Full case study: ${ARTICLE_SEO.url}`,
  },
  {
    id: 'dimotion',
    title: 'Dimotion Collaboration Platform | Dimitar Barev',
    description:
      'Dimotion is a cloud-native collaboration platform with microservices, Auth0, and automated CI/CD security scanning.',
    year: '2025',
    organization: 'Personal project',
    noscript:
      'Dimotion Collaboration Platform — a full-stack microservice ecosystem with React, Spring Boot, RabbitMQ, Auth0, AWS, and GitHub Actions security scanning.',
  },
] as const

export type ProjectSeoRoute = (typeof PROJECT_SEO_ROUTES)[number]
