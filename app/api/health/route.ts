import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { safeRedis } from '@/lib/redis'

export async function GET(request: NextRequest) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unchecked' as string,
      redis: 'unchecked' as string,
    },
  }

  try {
    // Check database connectivity
    try {
      await db.select().from(require('@/lib/db/schema').user).limit(1)
      health.checks.database = 'healthy'
    } catch (dbError) {
      console.warn('[v0] Database health check failed:', dbError instanceof Error ? dbError.message : String(dbError))
      health.checks.database = 'unhealthy'
    }

    // Check Redis connectivity
    try {
      const testKey = 'health-check-' + Date.now()
      await safeRedis.set(testKey, 'ok', { ex: 60 })
      health.checks.redis = 'healthy'
    } catch (redisError) {
      console.warn('[v0] Redis health check failed:', redisError instanceof Error ? redisError.message : String(redisError))
      health.checks.redis = 'unhealthy'
    }

    // Determine overall status
    const allHealthy = Object.values(health.checks).every((check) => check === 'healthy')
    health.status = allHealthy ? 'ok' : 'degraded'

    const statusCode = allHealthy ? 200 : 503

    return NextResponse.json(health, { status: statusCode })
  } catch (error) {
    console.error('[v0] Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Health check failed',
      },
      { status: 500 }
    )
  }
}
