import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Code2, Users, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/layouts/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { ContactVisual } from '@/components/contact/ContactVisual'
import { CONTACT_CONNECT_LINKS, CONTACT_FIELD_LIMITS } from '@/data/contact'
import {
  sanitizeClientValue,
  validateContactForm,
  type ContactFieldErrors,
} from '@/lib/contact-validation'
import { submitContactForm } from '@/lib/contact-api'
import { useExploration } from '@/context/ExplorationContext'
import { cn } from '@/utils/cn'

const socialIcons: Record<string, typeof Code2> = {
  github: Code2,
  linkedin: Users,
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const emptyForm = { name: '', email: '', message: '' }

export function ContactSection() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const { discover } = useExploration()

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    const max =
      field === 'name'
        ? CONTACT_FIELD_LIMITS.name
        : field === 'email'
          ? CONTACT_FIELD_LIMITS.email
          : CONTACT_FIELD_LIMITS.message
    setForm((prev) => ({ ...prev, [field]: sanitizeClientValue(value, max) }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage('')

    const validation = validateContactForm(form)
    if (!validation.ok) {
      setErrors(validation.errors)
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      return
    }

    setStatus('sending')
    setErrors({})

    try {
      const result = await submitContactForm({
        name: sanitizeClientValue(form.name, CONTACT_FIELD_LIMITS.name),
        email: sanitizeClientValue(form.email, CONTACT_FIELD_LIMITS.email).toLowerCase(),
        message: sanitizeClientValue(form.message, CONTACT_FIELD_LIMITS.message),
      })

      if (result.success) {
        setStatus('success')
        setStatusMessage(result.message)
        setForm(emptyForm)
        discover('contact', 10)
        return
      }

      setStatus('error')
      setStatusMessage(result.message)
      if (result.errors) setErrors(result.errors)
    } catch {
      setStatus('error')
      setStatusMessage(
        'Something went wrong while sending your message. Please try again shortly.',
      )
    }
  }

  const isSending = status === 'sending'

  return (
    <SectionWrapper id="contact" className="section-padding">
      <Container size="wide">
        <SectionHeader
          label="Contact"
          title="Let's build something remarkable"
          description="Whether it's a collaboration, opportunity, or conversation — I'd love to hear from you."
          storyBeat="Future Vision"
          align="center"
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <ScrollReveal className="order-2 lg:order-1 flex h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass rounded-2xl p-6 md:p-8 space-y-5 w-full h-full"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                  Name <span className="text-purple-light">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  maxLength={CONTACT_FIELD_LIMITS.name}
                  disabled={isSending || status === 'success'}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Your name"
                  className={cn(
                    'w-full rounded-xl bg-void-surface border px-4 py-3',
                    'text-text-primary placeholder:text-text-muted',
                    'focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20',
                    'transition-colors disabled:opacity-60',
                    errors.name ? 'border-red-400/50' : 'border-border-subtle',
                  )}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                  Email <span className="text-purple-light">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  maxLength={CONTACT_FIELD_LIMITS.email}
                  disabled={isSending || status === 'success'}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full rounded-xl bg-void-surface border px-4 py-3',
                    'text-text-primary placeholder:text-text-muted',
                    'focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20',
                    'transition-colors disabled:opacity-60',
                    errors.email ? 'border-red-400/50' : 'border-border-subtle',
                  )}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                  Message <span className="text-purple-light">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  maxLength={CONTACT_FIELD_LIMITS.message}
                  disabled={isSending || status === 'success'}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Tell me about your project or opportunity..."
                  rows={4}
                  className={cn(
                    'w-full rounded-xl bg-void-surface border px-4 py-3',
                    'text-text-primary placeholder:text-text-muted',
                    'focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20',
                    'transition-colors resize-none disabled:opacity-60',
                    errors.message ? 'border-red-400/50' : 'border-border-subtle',
                  )}
                />
                <div className="mt-1.5 flex justify-between gap-4">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-red-400">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-text-muted shrink-0">
                    {form.message.length}/{CONTACT_FIELD_LIMITS.message}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {statusMessage && (
                  <motion.div
                    key={statusMessage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className={cn(
                      'flex items-start gap-2 rounded-xl px-4 py-3 text-sm',
                      status === 'success'
                        ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                        : 'bg-red-500/10 text-red-300 border border-red-500/20',
                    )}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {status !== 'success' && (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSending}
                  icon={
                    isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )
                  }
                >
                  {isSending ? 'Sending...' : 'Send message'}
                </Button>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="order-1 lg:order-2 flex h-full">
            <div className="flex h-full w-full min-h-0 flex-col gap-4">
              <div className="min-h-0 flex-1">
                <ContactVisual />
              </div>

              <div className="glass shrink-0 rounded-2xl p-5">
                <h4 className="text-sm text-text-muted uppercase tracking-widest mb-4">
                  Connect
                </h4>
                <div className="space-y-3">
                  {CONTACT_CONNECT_LINKS.map((link) => {
                    const Icon = socialIcons[link.icon] ?? Users
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
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
            </div>
          </ScrollReveal>
        </div>
      </Container>

      <div className="mt-20 text-center">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Dimitar Barev. Crafted with precision.
        </p>
      </div>
    </SectionWrapper>
  )
}
