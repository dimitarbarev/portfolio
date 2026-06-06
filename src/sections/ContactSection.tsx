import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Code2, Users, Share2, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import {
  PLACEHOLDER_CONTACT_FIELDS,
  PLACEHOLDER_SOCIAL,
} from '@/data/placeholders'
import { useExploration } from '@/context/ExplorationContext'
import { cn } from '@/utils/cn'

const socialIcons: Record<string, typeof Code2> = {
  github: Code2,
  linkedin: Users,
  twitter: Share2,
  mail: Mail,
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const { discover } = useExploration()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    discover('contact', 10)
  }

  return (
    <SectionWrapper id="contact" className="section-padding">
      <Container size="narrow">
        <SectionHeader
          label="Contact"
          title="Let's build something remarkable"
          description="Whether it's a collaboration, opportunity, or conversation — I'd love to hear from you."
          storyBeat="Future Vision"
          align="center"
        />

        <div className="grid gap-10 md:grid-cols-5">
          <ScrollReveal className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
              {PLACEHOLDER_CONTACT_FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm text-text-muted mb-2"
                  >
                    {field.label}
                    {field.required && <span className="text-purple-light ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      className={cn(
                        'w-full rounded-xl bg-void-surface border border-border-subtle px-4 py-3',
                        'text-text-primary placeholder:text-text-muted',
                        'focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20',
                        'transition-colors resize-none',
                      )}
                    />
                  ) : (
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={cn(
                        'w-full rounded-xl bg-void-surface border border-border-subtle px-4 py-3',
                        'text-text-primary placeholder:text-text-muted',
                        'focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20',
                        'transition-colors',
                      )}
                    />
                  )}
                </div>
              ))}

              {submitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-purple-light py-4"
                >
                  Message placeholder sent — form backend to be connected.
                </motion.p>
              ) : (
                <Button type="submit" className="w-full" icon={<Send className="h-4 w-4" />}>
                  Send message
                </Button>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h4 className="text-sm text-text-muted uppercase tracking-widest mb-4">
                  Connect
                </h4>
                <div className="space-y-3">
                  {PLACEHOLDER_SOCIAL.map((link) => {
                    const Icon = socialIcons[link.icon] ?? Mail
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        className="flex items-center gap-3 text-text-secondary hover:text-purple-light transition-colors group"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-void-surface border border-border-subtle group-hover:border-purple/30 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{link.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-text-secondary text-sm leading-relaxed">
                  Open to research collaborations, engineering leadership roles,
                  and speaking engagements.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>

      <div className="mt-20 text-center">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Portfolio. Crafted with precision.
        </p>
      </div>
    </SectionWrapper>
  )
}
