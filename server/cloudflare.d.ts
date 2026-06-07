declare interface KVNamespace {
  get(key: string): Promise<string | null>
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>
  delete(key: string): Promise<void>
}

type PagesFunction<Env = unknown> = (context: {
  request: Request
  env: Env
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
  next: () => Promise<Response>
  data: Record<string, unknown>
}) => Response | Promise<Response>
