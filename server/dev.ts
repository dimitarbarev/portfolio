import 'dotenv/config'
import { createServer } from 'node:http'
import { MemoryRateLimitStore } from './lib/rate-limit'
import { handleContactSubmission } from './lib/handler'

const PORT = Number(process.env.CONTACT_API_PORT ?? 8787)
const rateLimitStore = new MemoryRateLimitStore()

function getClientIp(req: import('node:http').IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket.remoteAddress ?? '127.0.0.1'
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS' && req.url === '/api/contact') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.method !== 'POST' || req.url !== '/api/contact') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, message: 'Not found' }))
    return
  }

  let body = ''
  req.on('data', (chunk) => {
    body += chunk
    if (body.length > 12_000) {
      req.destroy()
    }
  })

  req.on('end', async () => {
    try {
      const parsed = body ? JSON.parse(body) : null
      const ip = getClientIp(req)

      const response = await handleContactSubmission(parsed, {
        ip,
        env: {
          RESEND_API_KEY: process.env.RESEND_API_KEY,
          CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
          CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
        },
        rateLimitStore,
      })

      const responseBody = await response.text()
      res.writeHead(response.status, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      })
      res.end(responseBody)
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ success: false, message: 'Invalid request body.' }),
      )
    }
  })
})

server.listen(PORT, () => {
  console.log(`[contact-api] listening on http://localhost:${PORT}`)
})
