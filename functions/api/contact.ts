import { handleContactSubmission } from '../../server/lib/handler'
import { KvRateLimitStore, MemoryRateLimitStore } from '../../server/lib/rate-limit'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL?: string
  RATE_LIMIT_KV?: KVNamespace
}

const fallbackStore = new MemoryRateLimitStore()

function getClientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    '0.0.0.0'
  )
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  if (request.headers.get('Content-Type')?.includes('application/json') !== true) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid content type.' }),
      { status: 415, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid JSON body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const rateLimitStore = env.RATE_LIMIT_KV
    ? new KvRateLimitStore(env.RATE_LIMIT_KV)
    : fallbackStore

  return handleContactSubmission(body, {
    ip: getClientIp(request),
    env: {
      RESEND_API_KEY: env.RESEND_API_KEY,
      CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
    },
    rateLimitStore,
  })
}
