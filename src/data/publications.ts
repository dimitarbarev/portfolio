import type { Publication } from '@/types'
import { ARTICLE_SEO } from './seoRoutes'

export const PUBLICATIONS: Publication[] = [
  {
    id: 'ocr-benchmarking',
    author: ARTICLE_SEO.author,
    year: ARTICLE_SEO.year,
    title: ARTICLE_SEO.title,
    description: ARTICLE_SEO.description,
    source: 'Medium',
    href: ARTICLE_SEO.url,
  },
]
