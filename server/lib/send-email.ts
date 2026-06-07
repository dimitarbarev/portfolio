import type { SanitizedContactPayload } from './validate'

export interface ContactEnv {
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
  RESEND_API_KEY?: string
}

export async function sendContactEmail(
  payload: SanitizedContactPayload,
  env: ContactEnv,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'Email service is not configured.' }
  }

  const to = env.CONTACT_TO_EMAIL
  if (!to) {
    console.error('[contact] CONTACT_TO_EMAIL is not configured')
    return { ok: false, error: 'Email service is not configured.' }
  }

  const from =
    env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'

  const subject = `Portfolio message from ${payload.name}`
  const text = [
    'New portfolio contact form submission',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text,
    }),
  })

  if (!response.ok) {
    console.error('[contact] Email delivery failed', response.status)
    return { ok: false, error: 'Unable to send your message right now.' }
  }

  return { ok: true }
}
