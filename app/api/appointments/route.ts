import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, queueEvents } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { safeRedis, REDIS_KEYS, PUBSUB_CHANNELS } from '@/lib/redis'
import { addMockAppointment, getMockAppointmentsForDate } from '@/lib/mock-data'

// Generate a unique token (e.g., A-047)
function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomChar = chars[Math.floor(Math.random() * chars.length)]
  const randomNum = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `${randomChar}-${randomNum}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      officeId,
      serviceId,
      citizenPhone,
      citizenEmail,
      citizenName,
      scheduledDate,
      scheduledTime,
    } = body

    if (
      !officeId ||
      !serviceId ||
      !citizenPhone ||
      !scheduledDate ||
      !scheduledTime
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let usedMockData = false
    let queuePosition = 1
    let appointmentId = randomUUID()
    let token = generateToken()

    try {
      // Try to use database
      let tokenExists = true
      while (tokenExists) {
        const existing = await db
          .select()
          .from(appointments)
          .where(eq(appointments.token, token))
          .limit(1)
        tokenExists = existing.length > 0
        if (tokenExists) {
          token = generateToken()
        }
      }

      // Get current queue position for this date
      const sameDayAppts = await db
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.officeId, officeId),
            eq(appointments.scheduledDate, scheduledDate),
            eq(appointments.status, 'pending')
          )
        )
      queuePosition = sameDayAppts.length + 1

      // Create appointment in database
      await db.insert(appointments).values({
        id: appointmentId,
        officeId,
        serviceId,
        citizenPhone,
        citizenEmail,
        citizenName,
        token,
        scheduledDate,
        scheduledTime,
        status: 'pending',
        queuePosition,
      })

      // Log creation event
      await db.insert(queueEvents).values({
        id: randomUUID(),
        appointmentId,
        eventType: 'appointment_created',
        eventData: { token, queuePosition },
      })
    } catch (dbError) {
      console.warn('[v0] Database error, using mock data:', dbError instanceof Error ? dbError.message : String(dbError))
      usedMockData = true

      // Fallback to mock data
      const mockAppts = getMockAppointmentsForDate(officeId, scheduledDate, 'pending')
      queuePosition = mockAppts.length + 1

      addMockAppointment({
        id: appointmentId,
        officeId,
        serviceId,
        citizenPhone,
        citizenEmail,
        citizenName,
        token,
        scheduledDate,
        scheduledTime,
        status: 'pending',
        queuePosition,
        createdAt: new Date().toISOString(),
      })
    }

    // Cache appointment in Redis for quick access (non-blocking)
    try {
      await safeRedis.set(
        REDIS_KEYS.APPOINTMENT_CACHE(appointmentId),
        JSON.stringify({
          id: appointmentId,
          token,
          officeId,
          queuePosition,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
        { ex: 86400 } // Cache for 24 hours
      )

      // Update queue state in Redis
      await safeRedis.incr(REDIS_KEYS.QUEUE_STATE(officeId))
    } catch (redisError) {
      console.warn('[v0] Redis caching failed (non-critical):', redisError)
      // Don't fail the appointment creation if Redis is unavailable
    }

    return NextResponse.json({
      id: appointmentId,
      token,
      queuePosition,
      scheduledDate,
      scheduledTime,
    })
  } catch (error) {
    console.error('[v0] Appointment creation error:', error instanceof Error ? error.message : String(error))
    console.error('[v0] Full error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
