import { RATE_LIMIT } from './constants'

interface RateLimitEntry {
  count: number
  resetAt: number
}

export interface RateLimitStore {
  get(key: string): Promise<RateLimitEntry | null>
  set(key: string, entry: RateLimitEntry): Promise<void>
}

/** In-memory store for local development */
export class MemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, RateLimitEntry>()

  async get(key: string) {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.resetAt) {
      this.store.delete(key)
      return null
    }
    return entry
  }

  async set(key: string, entry: RateLimitEntry) {
    this.store.set(key, entry)
  }
}

/** Cloudflare KV adapter */
export class KvRateLimitStore implements RateLimitStore {
  kv: KVNamespace

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  async get(key: string) {
    const raw = await this.kv.get(key)
    if (!raw) return null
    try {
      const entry = JSON.parse(raw) as RateLimitEntry
      if (Date.now() > entry.resetAt) {
        await this.kv.delete(key)
        return null
      }
      return entry
    } catch {
      return null
    }
  }

  async set(key: string, entry: RateLimitEntry) {
    const ttlSeconds = Math.ceil((entry.resetAt - Date.now()) / 1000)
    await this.kv.put(key, JSON.stringify(entry), {
      expirationTtl: Math.max(ttlSeconds, 60),
    })
  }
}

export async function checkRateLimit(
  store: RateLimitStore,
  ip: string,
): Promise<{ allowed: true } | { allowed: false; retryAfterSeconds: number }> {
  const key = `contact:${ip}`
  const now = Date.now()
  const existing = await store.get(key)

  if (!existing) {
    await store.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT.windowMs,
    })
    return { allowed: true }
  }

  if (existing.count >= RATE_LIMIT.maxSubmissions) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  await store.set(key, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  })
  return { allowed: true }
}
