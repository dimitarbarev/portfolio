import { SITE_LINKS, SITE_SEO, SITE_URL } from './src/data/siteConfig'
import { ARTICLE_SEO, PROJECT_SEO_ROUTES, type ProjectSeoRoute } from './src/data/seoRoutes'

export function normalizeUrl(url: string): string {
  return url.trim().replace(/\/$/, '')
}

export function isVercelPreview(): boolean {
  return process.env.VERCEL_ENV === 'preview'
}

/**
 * Resolves the public site URL for absolute Open Graph / canonical tags.
 * Always the custom domain unless VITE_SITE_URL is set to that same production host.
 * Vercel *.vercel.app hosts are never used.
 */
export function resolveSiteUrl(env: Record<string, string>): string {
  const fromEnv = env.VITE_SITE_URL
  if (fromEnv) {
    const resolved = normalizeUrl(fromEnv)
    if (resolved.endsWith('.vercel.app')) return SITE_URL
    return resolved
  }

  return SITE_URL
}

function stringifyJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}

function homeJsonLd(base: string): string {
  const personId = base ? `${base}/#person` : undefined
  const websiteId = base ? `${base}/#website` : undefined

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: SITE_SEO.siteName,
    jobTitle: SITE_SEO.jobTitle,
    description: SITE_SEO.description,
    sameAs: Object.values(SITE_LINKS),
  }
  if (personId) person['@id'] = personId
  if (base) {
    person.url = base
    person.image = `${base}${SITE_SEO.ogImagePath}`
  }

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    name: SITE_SEO.siteName,
    description: SITE_SEO.description,
    inLanguage: 'en',
  }
  if (websiteId) website['@id'] = websiteId
  if (base) website.url = base
  if (personId) website.publisher = { '@id': personId }

  const article: Record<string, unknown> = {
    '@type': 'ScholarlyArticle',
    headline: ARTICLE_SEO.title,
    name: ARTICLE_SEO.title,
    description: ARTICLE_SEO.description,
    url: ARTICLE_SEO.url,
    datePublished: ARTICLE_SEO.year,
    author: personId ? { '@id': personId } : { '@type': 'Person', name: SITE_SEO.siteName },
  }

  return stringifyJsonLd({
    '@context': 'https://schema.org',
    '@graph': [person, website, article],
  })
}

function projectJsonLd(base: string, route: ProjectSeoRoute): string {
  const url = base ? `${base}/projects/${route.id}` : `/projects/${route.id}`
  const personId = base ? `${base}/#person` : undefined

  const work: Record<string, unknown> = {
    '@type': 'CreativeWork',
    name: route.title.replace(' | Dimitar Barev', ''),
    description: route.description,
    url,
    dateCreated: route.year,
    author: personId
      ? { '@id': personId }
      : { '@type': 'Person', name: SITE_SEO.siteName },
  }
  if ('sameAs' in route && route.sameAs) work.sameAs = route.sameAs

  return stringifyJsonLd({
    '@context': 'https://schema.org',
    '@graph': [work],
  })
}

export function buildRobotsTxt(siteUrl: string, isPreview: boolean): string {
  if (isPreview) {
    return 'User-agent: *\nDisallow: /\n'
  }

  const lines = ['User-agent: *', 'Allow: /']
  const base = normalizeUrl(siteUrl)
  if (base) {
    lines.push('', `Sitemap: ${base}/sitemap.xml`)
  }
  return `${lines.join('\n')}\n`
}

export function buildSitemapXml(siteUrl: string): string | null {
  const base = normalizeUrl(siteUrl)
  if (!base) return null

  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${base}/`, changefreq: 'monthly', priority: '1.0' },
    ...PROJECT_SEO_ROUTES.map((route) => ({
      loc: `${base}/projects/${route.id}`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

type SeoPage =
  | { kind: 'home' }
  | { kind: 'project'; route: ProjectSeoRoute }

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function buildSeoHead(page: SeoPage, siteUrl: string, isPreview = false): string {
  const base = normalizeUrl(siteUrl)
  const path = page.kind === 'home' ? '/' : `/projects/${page.route.id}`
  const canonical = base ? `${base}${path === '/' ? '/' : path}` : ''
  const title = page.kind === 'home' ? SITE_SEO.title : page.route.title
  const description =
    page.kind === 'home' ? SITE_SEO.description : page.route.description
  const ogType = page.kind === 'home' ? 'website' : 'article'
  const ogImage = base ? `${base}${SITE_SEO.ogImagePath}` : SITE_SEO.ogImagePath
  const imageAlt = SITE_SEO.ogImageAlt
  const robots = isPreview ? 'noindex, nofollow' : 'index, follow'
  const jsonLd =
    page.kind === 'home' ? homeJsonLd(base) : projectJsonLd(base, page.route)

  const tags = [
    `<title>${escapeAttribute(title)}</title>`,
    `<meta name="description" content="${escapeAttribute(description)}" />`,
    `<meta name="author" content="${SITE_SEO.siteName}" />`,
    `<meta name="robots" content="${robots}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : '',
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:site_name" content="${SITE_SEO.siteName}" />`,
    `<meta property="og:title" content="${escapeAttribute(title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    base && ogImage.startsWith('https://')
      ? `<meta property="og:image:secure_url" content="${ogImage}" />`
      : '',
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${SITE_SEO.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${SITE_SEO.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${escapeAttribute(imageAlt)}" />`,
    canonical ? `<meta property="og:url" content="${canonical}" />` : '',
    `<meta name="twitter:card" content="${SITE_SEO.twitterCard}" />`,
    `<meta name="twitter:title" content="${escapeAttribute(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttribute(imageAlt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]

  return tags.filter(Boolean).join('\n    ')
}

export function wrapSeoHead(head: string): string {
  return `<!--seo-head-start-->\n    ${head}\n    <!--seo-head-end-->`
}

export function replaceSeoHead(html: string, head: string): string {
  if (html.includes('<!--seo-head-start-->')) {
    return html.replace(
      /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/,
      wrapSeoHead(head),
    )
  }
  return html.replace('<!--seo-head-->', wrapSeoHead(head))
}
