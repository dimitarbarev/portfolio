import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { PROJECT_SEO_ROUTES } from './src/data/seoRoutes'
import {
  buildHomePrerenderHtml,
  buildProjectPrerenderHtml,
  injectPrerender,
} from './src/data/prerenderHtml'
import {
  buildRobotsTxt,
  buildSeoHead,
  buildSitemapXml,
  isVercelPreview,
  replaceSeoHead,
  resolveSiteUrl,
} from './seo.config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env)
  const isPreview = isVercelPreview()
  let indexShell = ''

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-seo-head',
        transformIndexHtml(html) {
          indexShell = replaceSeoHead(
            html,
            buildSeoHead({ kind: 'home' }, siteUrl, isPreview),
          )
          return injectPrerender(indexShell, buildHomePrerenderHtml())
        },
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url?.split('?')[0] ?? ''
            if (/^\/projects\/[^/]+\/?$/.test(url)) {
              req.url = '/index.html'
            }
            next()
          })
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: buildRobotsTxt(siteUrl, isPreview),
          })

          const sitemap = !isPreview ? buildSitemapXml(siteUrl) : null
          if (sitemap) {
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: sitemap,
            })
          }
        },
        closeBundle() {
          if (!indexShell) return
          const dist = path.resolve('dist')
          if (!fs.existsSync(dist)) return

          for (const route of PROJECT_SEO_ROUTES) {
            let html = replaceSeoHead(
              indexShell,
              buildSeoHead({ kind: 'project', route }, siteUrl, isPreview),
            )
            html = injectPrerender(html, buildProjectPrerenderHtml(route))
            html = html.replace(
              '</body>',
              `  <noscript>${route.noscript}</noscript>\n  </body>`,
            )
            const dir = path.join(dist, 'projects', route.id)
            fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(path.join(dir, 'index.html'), html)
          }
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
