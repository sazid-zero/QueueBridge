import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { updateMockAppointment } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, action, reason, newDate, newTime } = await request.json()

    if (!appointmentId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (action === 'cancel') {
      if (!reason) {
        return NextResponse.json({ error: 'Cancellation reason required' }, { status: 400 })
      }

      try {
        // Try database first
        await db
          .update(appointments)
          .set({
            status: 'cancelled',
            updatedAt: new Date(),
          })
          .where(eq(appointments.id, appointmentId))

        return NextResponse.json({
          success: true,
          message: 'Appointment cancelled',
          appointmentId,
        })
      } catch (dbError) {
        console.warn('[v0] Database update failed, using mock data:', dbError instanceof Error ? dbError.message : String(dbError))

        // Fallback to mock data
        updateMockAppointment(appointmentId, { status: 'cancelled' })

        return NextResponse.json({
          success: true,
          message: 'Appointment cancelled (mock)',
          appointmentId,
        })
      }
    } else if (action === 'reschedule') {
      if (!newDate || !newTime) {
        return NextResponse.json({ error: 'New date and time required' }, { status: 400 })
      }

      try {
        // Try database first
        await db
          .update(appointments)
          .set({
            scheduledDate: newDate,
            scheduledTime: newTime,
            status: 'rescheduled',
            updatedAt: new Date(),
          })
          .where(eq(appointments.id, appointmentId))

        return NextResponse.json({
          success: true,
          message: 'Appointment rescheduled',
          appointmentId,
          newDate,
          newTime,
        })
      } catch (dbError) {
        console.warn('[v0] Database update failed, using mock data:', dbError instanceof Error ? dbError.message : String(dbError))

        // Fallback to mock data
        updateMockAppointment(appointmentId, {
          scheduledDate: newDate,
          scheduledTime: newTime,
          status: 'rescheduled',
        })

        return NextResponse.json({
          success: true,
          message: 'Appointment rescheduled (mock)',
          appointmentId,
          newDate,
          newTime,
        })
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('[v0] Cancel/reschedule error:', error)
    return NextResponse.json(
      { error: 'Failed to process appointment' },
      { status: 500 }
    )
  }
}
