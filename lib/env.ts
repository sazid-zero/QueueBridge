/**
 * Environment Variables Configuration
 * 
 * This file validates and exports all required environment variables for QueueBridge.
 * Ensures type safety and provides helpful error messages if variables are missing.
 */

interface EnvConfig {
  // Database
  DATABASE_URL: string

  // Authentication
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL?: string

  // Redis
  REDIS_URL: string
  KV_REST_API_URL: string
  KV_REST_API_TOKEN: string
  KV_REST_API_READ_ONLY_TOKEN?: string

  // Node Environment
  NODE_ENV: 'development' | 'production' | 'test'

  // Optional AWS Configuration
  AWS_REGION?: string
  AWS_RDS_ENDPOINT?: string
  AWS_ACCESS_KEY_ID?: string
  AWS_SECRET_ACCESS_KEY?: string
}

// Required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'BETTER_AUTH_SECRET',
  'REDIS_URL',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
] as const

// Validate environment variables
function validateEnv(): EnvConfig {
  const missingVars: string[] = []

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName)
    }
  })

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.map((v) => `  - ${v}`).join('\n')}\n\nPlease check your .env.local file or integration settings.`
    )
  }

  return {
    // Database
    DATABASE_URL: process.env.DATABASE_URL!,

    // Authentication
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,

    // Redis
    REDIS_URL: process.env.REDIS_URL!,
    KV_REST_API_URL: process.env.KV_REST_API_URL!,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN!,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,

    // Node Environment
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',

    // Optional AWS
    AWS_REGION: process.env.AWS_REGION,
    AWS_RDS_ENDPOINT: process.env.AWS_RDS_ENDPOINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  }
}

// Export validated environment variables
export const env = validateEnv()

// Helper function to check if AWS is configured
export function isAWSConfigured(): boolean {
  return !!(env.AWS_REGION && env.AWS_RDS_ENDPOINT)
}

// Helper function to get database URL based on environment
export function getDatabaseURL(): string {
  // If AWS is configured, use AWS RDS endpoint
  if (isAWSConfigured() && env.AWS_RDS_ENDPOINT) {
    const user = 'postgres' // Default AWS RDS user
    const password = process.env.AWS_RDS_PASSWORD || ''
    const host = env.AWS_RDS_ENDPOINT
    const port = 5432
    const database = 'queuebridge'

    return `postgresql://${user}:${password}@${host}:${port}/${database}`
  }

  // Otherwise use Neon or local PostgreSQL
  return env.DATABASE_URL
}

// Log environment status (useful for debugging)
export function logEnvironmentStatus(): void {
  if (env.NODE_ENV === 'development') {
    console.log('[v0] Environment Configuration:')
    console.log(`  - Node Env: ${env.NODE_ENV}`)
    console.log(
      `  - Database: ${env.DATABASE_URL.split('://')[0]}://<credentials>@<host>/<db>`
    )
    console.log(
      `  - Redis: ${env.KV_REST_API_URL.split('://')[0]}://<token>@<host>`
    )
    console.log(
      `  - AWS Configured: ${isAWSConfigured() ? 'Yes' : 'No (using Neon)'}`
    )
  }
}
