import { CONTACT_LIMITS } from './constants'

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export type ContactFieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export interface SanitizedContactPayload {
  name: string
  email: string
  message: string
}

export function validateContactFields(
  fields: SanitizedContactPayload,
): { ok: true; data: SanitizedContactPayload } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {}

  if (!fields.name) {
    errors.name = 'Please enter your name.'
  } else if (fields.name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_LIMITS.nameMax} characters or fewer.`
  }

  if (!fields.email) {
    errors.email = 'Please enter your email address.'
  } else if (fields.email.length > CONTACT_LIMITS.emailMax) {
    errors.email = `Email must be ${CONTACT_LIMITS.emailMax} characters or fewer.`
  } else if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.message) {
    errors.message = 'Please enter a message.'
  } else if (fields.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, data: fields }
}
