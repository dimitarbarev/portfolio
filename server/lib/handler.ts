import { sanitizeContactFields } from './sanitize'
import { validateContactFields } from './validate'
import { checkRateLimit, type RateLimitStore } from './rate-limit'
import { sendContactEmail, type ContactEnv } from './send-email'

export interface ContactHandlerContext {
  ip: string
  env: ContactEnv
  rateLimitStore: RateLimitStore
}

export type ContactSuccessResponse = { success: true; message: string }
export type ContactErrorResponse = {
  success: false
  message: string
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
}

function jsonResponse(
  body: ContactSuccessResponse | ContactErrorResponse,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function logValidationFailure(ip: string, reason: string, fields?: string[]) {
  console.warn('[contact] Validation failed', {
    ip,
    reason,
    fields: fields ?? [],
    timestamp: new Date().toISOString(),
  })
}

export async function handleContactSubmission(
  body: unknown,
  context: ContactHandlerContext,
): Promise<Response> {
  const { ip, env, rateLimitStore } = context

  if (!body || typeof body !== 'object') {
    logValidationFailure(ip, 'invalid_json_body')
    return jsonResponse(
      { success: false, message: 'Invalid request. Please try again.' },
      400,
    )
  }

  const raw = body as Record<string, unknown>

  const sanitized = sanitizeContactFields({
    name: raw.name,
    email: raw.email,
    message: raw.message,
  })

  const validation = validateContactFields(sanitized)
  if (!validation.ok) {
    logValidationFailure(ip, 'field_validation', Object.keys(validation.errors))
    return jsonResponse(
      {
        success: false,
        message: 'Please fix the highlighted fields.',
        errors: validation.errors,
      },
      400,
    )
  }

  const rateCheck = await checkRateLimit(rateLimitStore, ip)
  if (!rateCheck.allowed) {
    logValidationFailure(ip, 'rate_limit_exceeded')
    return jsonResponse(
      {
        success: false,
        message: `Too many messages sent. Please try again in ${Math.ceil(rateCheck.retryAfterSeconds / 60)} minutes.`,
      },
      429,
    )
  }

  const emailResult = await sendContactEmail(validation.data, env)
  if (!emailResult.ok) {
    console.error('[contact] Email send failed for ip', ip)
    return jsonResponse(
      { success: false, message: emailResult.error },
      502,
    )
  }

  return jsonResponse(
    {
      success: true,
      message:
        'Thank you! Your message was sent successfully. I will get back to you soon.',
    },
    200,
  )
}
