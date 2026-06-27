import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { updateMockAppointment, getMockAppointmentById } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, noShowReason } = await request.json()

    if (!appointmentId) {
      return NextResponse.json({ error: 'appointmentId required' }, { status: 400 })
    }

    try {
      // Try database first
      await db
        .update(appointments)
        .set({
          status: 'no-show',
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointmentId))

      return NextResponse.json({
        success: true,
        message: 'Appointment marked as no-show',
        appointmentId,
      })
    } catch (dbError) {
      console.warn('[v0] Database update failed, using mock data:', dbError instanceof Error ? dbError.message : String(dbError))

      // Fallback to mock data
      updateMockAppointment(appointmentId, { status: 'no-show' })

      return NextResponse.json({
        success: true,
        message: 'Appointment marked as no-show (mock)',
        appointmentId,
      })
    }
  } catch (error) {
    console.error('[v0] No-show error:', error)
    return NextResponse.json(
      { error: 'Failed to mark appointment as no-show' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const appointmentId = request.nextUrl.searchParams.get('appointmentId')

    if (!appointmentId) {
      return NextResponse.json({ error: 'appointmentId required' }, { status: 400 })
    }

    try {
      // Try database first
      const result = await db
        .select()
        .from(appointments)
        .where(eq(appointments.id, appointmentId))
        .limit(1)

      if (result.length === 0) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
      }

      return NextResponse.json(result[0])
    } catch (dbError) {
      console.warn('[v0] Database query failed, using mock data:', dbError instanceof Error ? dbError.message : String(dbError))

      // Fallback to mock data
      const appointment = getMockAppointmentById(appointmentId)
      if (!appointment) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
      }

      return NextResponse.json(appointment)
    }
  } catch (error) {
    console.error('[v0] Error fetching appointment:', error)
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 })
  }
}
