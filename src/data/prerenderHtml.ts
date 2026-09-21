import {
  PLACEHOLDER_EXPERIENCE,
  PLACEHOLDER_HERO,
  PLACEHOLDER_JOURNEY,
} from './placeholders'
import { ARTICLE_SEO, PROJECT_SEO_ROUTES, type ProjectSeoRoute } from './seoRoutes'
import { SITE_LINKS, SITE_SEO } from './siteConfig'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function paragraph(text: string): string {
  return `<p>${escapeHtml(text)}</p>`
}

export function buildHomePrerenderHtml(): string {
  const journey = PLACEHOLDER_JOURNEY.map(
    (item) => `
      <article>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(`${item.country} · ${item.location} · ${item.period}`)}</p>
        ${paragraph(item.description)}
      </article>`,
  ).join('')

  const experience = PLACEHOLDER_EXPERIENCE.map(
    (item) => `
      <article>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml([item.organization, item.location, item.period].filter(Boolean).join(' · '))}</p>
        ${paragraph(item.description)}
      </article>`,
  ).join('')

  const projects = PROJECT_SEO_ROUTES.map(
    (route) => `
      <article>
        <h3>${escapeHtml(route.title.replace(' | Dimitar Barev', ''))}</h3>
        ${paragraph(route.description)}
        ${paragraph(route.noscript)}
      </article>`,
  ).join('')

  return `
    <main>
      <section>
        <p>Portfolio Experience</p>
        <h1>${escapeHtml(`${PLACEHOLDER_HERO.headline} ${PLACEHOLDER_HERO.headlineLine2} ${PLACEHOLDER_HERO.headlineAccent}`)}</h1>
        ${paragraph(PLACEHOLDER_HERO.subheadline)}
      </section>
      <section>
        <h2>Engineering Growth Around The Globe</h2>
        ${journey}
      </section>
      <section>
        <h2>Where theory meets production</h2>
        ${experience}
      </section>
      <section>
        <h2>Building systems that solve real problems</h2>
        ${projects}
      </section>
      <section>
        <h2>Writing</h2>
        <article>
          <h3>${escapeHtml(ARTICLE_SEO.title)}</h3>
          ${paragraph(ARTICLE_SEO.description)}
        </article>
      </section>
      <section>
        <h2>Let's build something remarkable</h2>
        ${paragraph(SITE_SEO.description)}
        <p>
          <a href="${SITE_LINKS.linkedin}">LinkedIn</a>
          <a href="${SITE_LINKS.github}">GitHub</a>
          <a href="${SITE_LINKS.medium}">Medium</a>
        </p>
      </section>
    </main>
  `.trim()
}

export function buildProjectPrerenderHtml(route: ProjectSeoRoute): string {
  return `
    <main>
      <article>
        <h1>${escapeHtml(route.title.replace(' | Dimitar Barev', ''))}</h1>
        ${paragraph(route.description)}
        ${paragraph(route.noscript)}
      </article>
    </main>
  `.trim()
}

export function injectPrerender(html: string, inner: string): string {
  return html.replace('<div id="root"></div>', `<div id="root">${inner}</div>`)
}
