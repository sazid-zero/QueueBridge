import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, analytics } from '@/lib/db/schema'
import { eq, and, gte, lt } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const officeId = searchParams.get('officeId')
    const date = searchParams.get('date')

    if (!officeId || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get analytics data
    const analyticsData = await db
      .select()
      .from(analytics)
      .where(
        and(
          eq(analytics.officeId, officeId),
          eq(analytics.date, date)
        )
      )
      .limit(1)

    if (analyticsData.length === 0) {
      return NextResponse.json({
        officeId,
        date,
        totalAppointments: 0,
        completedAppointments: 0,
        noShowAppointments: 0,
        averageWaitTimeMinutes: 0,
        peakHour: null,
        noShowRate: 0,
      })
    }

    const data = analyticsData[0]
    const noShowRate =
      data.totalAppointments > 0
        ? ((data.noShowAppointments / data.totalAppointments) * 100).toFixed(2)
        : 0

    return NextResponse.json({
      officeId,
      date,
      totalAppointments: data.totalAppointments,
      completedAppointments: data.completedAppointments,
      noShowAppointments: data.noShowAppointments,
      averageWaitTimeMinutes: data.averageWaitTimeMinutes,
      peakHour: data.peakHour,
      noShowRate: parseFloat(noShowRate as string),
    })
  } catch (error) {
    console.error('[v0] Analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update analytics when an appointment is completed
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { appointmentId, officeId, date, completed } = body

    if (!appointmentId || !officeId || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get current analytics
    let analyticsRecord = await db
      .select()
      .from(analytics)
      .where(
        and(
          eq(analytics.officeId, officeId),
          eq(analytics.date, date)
        )
      )
      .limit(1)

    // Get appointment details for wait time
    const apptResult = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, appointmentId))
      .limit(1)

    const appt = apptResult[0]
    const isNoShow = completed === false

    if (analyticsRecord.length === 0) {
      // Create new analytics record
      await db.insert(analytics).values({
        id: randomUUID(),
        officeId,
        date,
        totalAppointments: 1,
        completedAppointments: completed ? 1 : 0,
        noShowAppointments: isNoShow ? 1 : 0,
        totalWaitTimeMinutes: appt?.waitTimeMinutes || 0,
        averageWaitTimeMinutes: appt?.waitTimeMinutes || 0,
        peakHour: new Date(appt?.createdAt || new Date())
          .getHours()
          .toString(),
      })
    } else {
      // Update existing record
      const current = analyticsRecord[0]
      const newTotal = current.totalAppointments + 1
      const newCompleted = completed ? current.completedAppointments + 1 : current.completedAppointments
      const newNoShow = isNoShow ? current.noShowAppointments + 1 : current.noShowAppointments
      const totalWaitTime = (current.totalWaitTimeMinutes || 0) + (appt?.waitTimeMinutes || 0)
      const avgWait = Math.floor(totalWaitTime / newTotal)

      await db
        .update(analytics)
        .set({
          totalAppointments: newTotal,
          completedAppointments: newCompleted,
          noShowAppointments: newNoShow,
          totalWaitTimeMinutes: totalWaitTime,
          averageWaitTimeMinutes: avgWait,
          peakHour: new Date(appt?.createdAt || new Date())
            .getHours()
            .toString(),
        })
        .where(
          and(
            eq(analytics.officeId, officeId),
            eq(analytics.date, date)
          )
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Analytics update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
