import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react'
import { MainLayout } from '@/layouts/MainLayout'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { ProjectImageCarousel } from '@/components/projects/ProjectImageCarousel'
import { ProjectTabContent } from '@/components/projects/ProjectTabContent'
import { projectAccent } from '@/components/projects/projectGlow'
import { useDocumentSeo } from '@/hooks/useDocumentSeo'
import { PROJECTS } from '@/data/projects'
import { PROJECT_SEO_ROUTES } from '@/data/seoRoutes'
import { SITE_SEO } from '@/data/siteConfig'
import type { ProjectTab } from '@/types'

const CASE_STUDY_SECTIONS: { id: ProjectTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'learnings', label: 'Learnings' },
]

interface ProjectPageProps {
  projectId: string
}

export function ProjectPage({ projectId }: ProjectPageProps) {
  const project = PROJECTS.find((item) => item.id === projectId)
  const seo = PROJECT_SEO_ROUTES.find((item) => item.id === projectId)

  useDocumentSeo(
    seo?.title ?? SITE_SEO.title,
    seo?.description ?? SITE_SEO.description,
  )

  if (!project) {
    return (
      <MainLayout>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-text-secondary">This case study could not be found.</p>
          <Button onClick={() => window.location.assign('/#projects')}>Back to projects</Button>
        </div>
      </MainLayout>
    )
  }

  const accent = projectAccent(project)

  return (
    <MainLayout>
      <article className="section-padding pt-28 md:pt-32">
        <Container size="narrow">
          <a
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-purple-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </a>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="purple">{project.category}</Badge>
            {project.organization && (
              <span className="text-sm text-text-secondary">{project.organization}</span>
            )}
            <span className="text-xs text-text-muted">{project.year}</span>
          </div>

          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-purple-light">{project.subtitle}</p>
          <p className="mt-6 text-text-secondary leading-relaxed">{project.description}</p>

          {project.publicationLink && (
            <a
              href={project.publicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-purple-light hover:underline"
            >
              <BookOpen className="h-4 w-4" />
              Publication
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </a>
          )}

          <div className="my-10">
            <ProjectImageCarousel images={project.images} accent={accent} />
          </div>

          <div className="space-y-10">
            {CASE_STUDY_SECTIONS.map((section) => (
              <section key={section.id}>
                <h2 className="mb-4 font-display text-2xl font-semibold">{section.label}</h2>
                <ProjectTabContent content={project.tabs[section.id]} />
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-border-subtle pt-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-text-muted">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Container>
      </article>
    </MainLayout>
  )
}
