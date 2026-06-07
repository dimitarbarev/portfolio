import { FORMSPREE_ENDPOINT } from '@/data/contact'

export type ContactApiSuccess = {
  success: true
  message: string
}

export type ContactApiError = {
  success: false
  message: string
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError

const SUCCESS_MESSAGE =
  'Thank you! Your message was sent successfully. I will get back to you soon.'

const ERROR_MESSAGE =
  'Unable to send your message right now. Please try again or reach out via LinkedIn.'

type FormspreeResponse = {
  ok?: boolean
  error?: string
  next?: string
}

function parseFormspreeBody(text: string): FormspreeResponse | null {
  if (!text) return null
  try {
    return JSON.parse(text) as FormspreeResponse
  } catch {
    return null
  }
}

export async function submitContactForm(payload: {
  name: string
  email: string
  message: string
  honeypot: string
}): Promise<ContactApiResponse> {
  if (payload.honeypot.trim()) {
    console.warn('[Contact] Honeypot triggered — submission blocked (no POST sent).')
    return { success: false, message: ERROR_MESSAGE }
  }

  const body = {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    _gotcha: payload.honeypot,
  }

  console.log('[Contact] POST', FORMSPREE_ENDPOINT, body)

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const responseText = await response.text()
  const responseBody = parseFormspreeBody(responseText)

  console.log('[Contact] Formspree response status:', response.status)
  console.log('[Contact] Formspree response body:', responseText || '(empty)')

  const accepted = response.ok && responseBody?.ok === true

  if (accepted) {
    return { success: true, message: SUCCESS_MESSAGE }
  }

  let detail = ERROR_MESSAGE
  if (responseBody?.error) {
    detail = responseBody.error
  } else if (!response.ok) {
    detail = `Formspree returned HTTP ${response.status}.`
  } else if (responseBody?.ok !== true) {
    detail = 'Formspree did not confirm the submission.'
  }

  console.error('[Contact] Submission rejected:', detail)

  return { success: false, message: detail }
}
