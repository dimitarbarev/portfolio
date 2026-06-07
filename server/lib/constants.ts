export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 255,
  messageMax: 2000,
} as const

export const RATE_LIMIT = {
  maxSubmissions: 5,
  windowMs: 60 * 60 * 1000,
} as const
