import type { ContactFieldErrors } from '@/lib/contact-validation'

export type ContactApiSuccess = {
  success: true
  message: string
}

export type ContactApiError = {
  success: false
  message: string
  errors?: ContactFieldErrors
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError

export async function submitContactForm(payload: {
  name: string
  email: string
  message: string
}): Promise<ContactApiResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ContactApiResponse
  return data
}
