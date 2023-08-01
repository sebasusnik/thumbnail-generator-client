// local-cache.ts
export class LocalCache {
  private cache: Record<string, any> = {}

  async get(key: string) {
    return this.cache[key]
  }

  async set(key: string, value: any) {
    this.cache[key] = value
  }
}
