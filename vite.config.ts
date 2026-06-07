import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { SITE_SEO } from './src/data/siteConfig'

function buildSeoHead(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const canonical = base || undefined
  const ogImage = base ? `${base}${SITE_SEO.ogImagePath}` : SITE_SEO.ogImagePath

  const tags = [
    `<title>${SITE_SEO.title}</title>`,
    `<meta name="description" content="${SITE_SEO.description}" />`,
    `<meta name="author" content="${SITE_SEO.siteName}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_SEO.siteName}" />`,
    `<meta property="og:title" content="${SITE_SEO.title}" />`,
    `<meta property="og:description" content="${SITE_SEO.description}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="${SITE_SEO.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${SITE_SEO.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${SITE_SEO.title}" />`,
    canonical ? `<meta property="og:url" content="${canonical}" />` : '',
    `<meta name="twitter:card" content="${SITE_SEO.twitterCard}" />`,
    `<meta name="twitter:title" content="${SITE_SEO.title}" />`,
    `<meta name="twitter:description" content="${SITE_SEO.description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${SITE_SEO.title}" />`,
  ]

  return tags.filter(Boolean).join('\n    ')
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL ?? ''

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-seo-head',
        transformIndexHtml(html) {
          return html.replace('<!--seo-head-->', buildSeoHead(siteUrl))
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
