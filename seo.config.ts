import { SITE_SEO } from './src/data/siteConfig'

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/$/, '')
}

/**
 * Resolves the public site URL for absolute Open Graph / canonical tags.
 * Priority: VITE_SITE_URL → Vercel production domain → Vercel deployment URL.
 */
export function resolveSiteUrl(env: Record<string, string>): string {
  const fromEnv = env.VITE_SITE_URL
  if (fromEnv) return normalizeUrl(fromEnv)

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelProduction) return normalizeUrl(`https://${vercelProduction}`)

  const vercelDeployment = process.env.VERCEL_URL
  if (vercelDeployment) return normalizeUrl(`https://${vercelDeployment}`)

  return ''
}

export function buildSeoHead(siteUrl: string): string {
  const base = normalizeUrl(siteUrl)
  const ogImage = base ? `${base}${SITE_SEO.ogImagePath}` : SITE_SEO.ogImagePath
  const imageAlt = SITE_SEO.ogImageAlt

  const tags = [
    `<title>${SITE_SEO.title}</title>`,
    `<meta name="description" content="${SITE_SEO.description}" />`,
    `<meta name="author" content="${SITE_SEO.siteName}" />`,
    `<meta name="robots" content="index, follow" />`,
    base ? `<link rel="canonical" href="${base}/" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:site_name" content="${SITE_SEO.siteName}" />`,
    `<meta property="og:title" content="${SITE_SEO.title}" />`,
    `<meta property="og:description" content="${SITE_SEO.description}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    base && ogImage.startsWith('https://')
      ? `<meta property="og:image:secure_url" content="${ogImage}" />`
      : '',
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${SITE_SEO.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${SITE_SEO.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    base ? `<meta property="og:url" content="${base}/" />` : '',
    `<meta name="twitter:card" content="${SITE_SEO.twitterCard}" />`,
    `<meta name="twitter:title" content="${SITE_SEO.title}" />`,
    `<meta name="twitter:description" content="${SITE_SEO.description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${imageAlt}" />`,
  ]

  return tags.filter(Boolean).join('\n    ')
}
