import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { buildSeoHead, resolveSiteUrl } from './seo.config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env)

  if (mode === 'production' && !siteUrl) {
    console.warn(
      '[seo] No site URL resolved. Set VITE_SITE_URL or deploy on Vercel so Open Graph tags use absolute URLs.',
    )
  }

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
