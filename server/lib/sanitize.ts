import { CONTACT_LIMITS } from './constants'

/** Strip HTML and control characters; never treat user input as markup. */
export function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeContactFields(raw: {
  name?: unknown
  email?: unknown
  message?: unknown
}) {
  return {
    name: sanitizeText(raw.name, CONTACT_LIMITS.nameMax),
    email: sanitizeText(raw.email, CONTACT_LIMITS.emailMax).toLowerCase(),
    message: sanitizeText(raw.message, CONTACT_LIMITS.messageMax),
  }
}
