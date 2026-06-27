import { Redis } from '@upstash/redis'

// Initialize Redis only if credentials are available
let redis: Redis | null = null

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
}

// Export a safe wrapper that handles missing Redis gracefully
export const safeRedis = {
  async set(key: string, value: string, options?: any) {
    if (!redis) return null
    return redis.set(key, value, options)
  },
  async get(key: string) {
    if (!redis) return null
    return redis.get(key)
  },
  async incr(key: string) {
    if (!redis) return null
    return redis.incr(key)
  },
  async publish(channel: string, message: string) {
    if (!redis) return null
    return redis.publish(channel, message)
  },
}

// Also export raw redis for advanced usage
export { redis }

// Redis key prefixes for organized data storage
export const REDIS_KEYS = {
  // Queue state management
  QUEUE_STATE: (officeId: string) => `queue:${officeId}:state`,
  QUEUE_POSITION: (appointmentId: string) => `queue:${appointmentId}:position`,
  CURRENT_SERVING: (officeId: string) => `queue:${officeId}:serving`,

  // Real-time updates
  QUEUE_UPDATES: (officeId: string) => `queue:${officeId}:updates`,
  APPOINTMENT_STATUS: (appointmentId: string) => `appointment:${appointmentId}:status`,

  // Cache
  APPOINTMENT_CACHE: (appointmentId: string) => `cache:appointment:${appointmentId}`,
  OFFICE_CACHE: (officeId: string) => `cache:office:${officeId}`,
  QUEUE_METRICS: (officeId: string, date: string) =>
    `metrics:${officeId}:${date}`,

  // Session management
  QUEUE_SESSION: (sessionId: string) => `session:${sessionId}`,
}

// Pub/Sub channels for real-time notifications
export const PUBSUB_CHANNELS = {
  QUEUE_UPDATE: (officeId: string) => `channel:queue:${officeId}`,
  POSITION_UPDATE: (appointmentId: string) => `channel:position:${appointmentId}`,
  ADMIN_ACTION: (officeId: string) => `channel:admin:${officeId}`,
}
