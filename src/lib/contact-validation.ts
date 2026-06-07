import { CONTACT_FIELD_LIMITS } from '@/data/contact'

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export type ContactFormValues = {
  name: string
  email: string
  message: string
}

export type ContactFieldErrors = Partial<
  Record<'name' | 'email' | 'message' | 'form', string>
>

function stripControlChars(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
}

export function sanitizeClientValue(value: string, max: number) {
  return stripControlChars(value).trim().slice(0, max)
}

export function validateContactForm(
  values: ContactFormValues,
): { ok: true } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {}
  const name = sanitizeClientValue(values.name, CONTACT_FIELD_LIMITS.name)
  const email = sanitizeClientValue(values.email, CONTACT_FIELD_LIMITS.email).toLowerCase()
  const message = sanitizeClientValue(values.message, CONTACT_FIELD_LIMITS.message)

  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.'
  if (!message) errors.message = 'Please enter a message.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true }
}
