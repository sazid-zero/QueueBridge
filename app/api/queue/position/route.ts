import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { safeRedis, REDIS_KEYS } from '@/lib/redis'
import { getMockAppointmentByToken, getAllMockAppointments } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    let appt: any
    let usedMockData = false

    try {
      const appointment = await db
        .select()
        .from(appointments)
        .where(eq(appointments.token, token))
        .limit(1)

      if (appointment.length === 0) {
        throw new Error('Not found in database')
      }

      appt = appointment[0]
    } catch (dbError) {
      console.warn('[v0] Database error, checking mock data:', dbError instanceof Error ? dbError.message : String(dbError))
      // Fallback to mock data
      appt = getMockAppointmentByToken(token)
      usedMockData = true

      if (!appt) {
        return NextResponse.json(
          { error: 'Appointment not found' },
          { status: 404 }
        )
      }
    }

    // Check Redis cache first for faster response
    const cacheKey = REDIS_KEYS.APPOINTMENT_CACHE(appt.id)
    let cachedPosition = await safeRedis.get(cacheKey)

    let position = appt.queuePosition

    // Get all pending appointments for this office on this date that are ahead in queue
    try {
      const aheadInQueue = await db
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.officeId, appt.officeId),
            eq(appointments.scheduledDate, appt.scheduledDate),
            eq(appointments.status, 'pending')
          )
        )

      position = aheadInQueue.filter(
        (a) => (a.queuePosition || 0) < (appt.queuePosition || 0)
      ).length + 1
    } catch (dbError) {
      if (usedMockData) {
        // Use mock data for position calculation
        const allAppts = getAllMockAppointments()
        const sameOfficeDate = allAppts.filter(
          (a) => a.officeId === appt.officeId && a.scheduledDate === appt.scheduledDate && a.status === 'pending'
        )
        position = sameOfficeDate.filter((a) => (a.queuePosition || 0) < (appt.queuePosition || 0)).length + 1
      }
    }

    // Build response
    const response = {
      token,
      status: appt.status,
      queuePosition: position,
      arrivedAt: appt.arrivedAt,
      completedAt: appt.completedAt,
      waitTimeMinutes: appt.waitTimeMinutes,
    }

    // Update Redis cache (non-blocking)
    try {
      await safeRedis.set(cacheKey, JSON.stringify(response), { ex: 300 }) // Cache for 5 minutes
    } catch (redisError) {
      console.warn('[v0] Redis caching failed (non-critical):', redisError)
      // Don't fail the request if Redis is unavailable
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[v0] Queue position error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
