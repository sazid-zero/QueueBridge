import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, queueEvents } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { safeRedis, PUBSUB_CHANNELS } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { officeId, date } = body

    if (!officeId || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the first pending appointment for this office on this date
    const pending = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.officeId, officeId),
          eq(appointments.scheduledDate, date),
          eq(appointments.status, 'pending')
        )
      )
      .limit(1)

    if (pending.length === 0) {
      return NextResponse.json(
        { message: 'No pending appointments' },
        { status: 200 }
      )
    }

    const appointment = pending[0]
    const now = new Date()

    // Calculate wait time
    const createdTime = new Date(appointment.createdAt)
    const waitTimeMinutes = Math.floor(
      (now.getTime() - createdTime.getTime()) / (1000 * 60)
    )

    // Mark appointment as being served
    await db
      .update(appointments)
      .set({
        status: 'serving',
        arrivedAt: now,
        waitTimeMinutes,
      })
      .where(eq(appointments.id, appointment.id))

    // Log event
    await db.insert(queueEvents).values({
      id: randomUUID(),
      appointmentId: appointment.id,
      eventType: 'called_for_service',
      eventData: { waitTimeMinutes },
    })

    // Get remaining queue
    const remaining = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.officeId, officeId),
          eq(appointments.scheduledDate, date),
          eq(appointments.status, 'pending')
        )
      )

    // Publish to Redis for real-time updates (non-blocking)
    try {
      await safeRedis.publish(
        PUBSUB_CHANNELS.QUEUE_UPDATE(officeId),
        JSON.stringify({
          type: 'appointment_called',
          token: appointment.token,
          status: 'serving',
          waitTimeMinutes,
        })
      )

      if (remaining.length > 0 && remaining.length <= 3) {
        await safeRedis.publish(
          PUBSUB_CHANNELS.QUEUE_UPDATE(officeId),
          JSON.stringify({
            type: 'threshold_alert',
            peopleAhead: remaining.length,
            tokens: remaining.map((a) => a.token),
          })
        )
      }
    } catch (redisError) {
      console.warn('[v0] Redis publish failed (non-critical):', redisError)
      // Don't fail the API if Redis pub/sub is unavailable
    }

    return NextResponse.json({
      appointmentId: appointment.id,
      token: appointment.token,
      status: 'serving',
      waitTimeMinutes,
      remainingInQueue: remaining.length - 1,
    })
  } catch (error) {
    console.error('[v0] Call next error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
