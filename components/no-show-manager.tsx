'use client'

import { useState } from 'react'
import { AlertCircle, Clock, CheckCircle, X } from 'lucide-react'

interface AppointmentItem {
  id: string
  token: string
  queuePosition: number
  citizenName?: string
  status: string
  scheduledTime: string
}

interface NoShowManagerProps {
  appointments: AppointmentItem[]
  onMarkNoShow: (appointmentId: string) => void
  onAutoSkip?: (appointmentId: string, delayMinutes: number) => void
}

export function NoShowManager({ appointments, onMarkNoShow, onAutoSkip }: NoShowManagerProps) {
  const [noShowWarnings, setNoShowWarnings] = useState<Set<string>>(new Set())
  const [expandedNoShow, setExpandedNoShow] = useState<string | null>(null)

  const pendingAppointments = appointments.filter((apt) => apt.status === 'pending')

  const handleMarkNoShow = (appointmentId: string) => {
    onMarkNoShow(appointmentId)
    setNoShowWarnings((prev) => {
      const next = new Set(prev)
      next.delete(appointmentId)
      return next
    })
  }

  const handleAutoSkipWarning = (appointmentId: string) => {
    if (!noShowWarnings.has(appointmentId)) {
      setNoShowWarnings((prev) => new Set(prev).add(appointmentId))
      return
    }

    // Set auto-skip for 5 minutes
    onAutoSkip?.(appointmentId, 5)
    setNoShowWarnings((prev) => {
      const next = new Set(prev)
      next.delete(appointmentId)
      return next
    })
  }

  if (pendingAppointments.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 text-center">
        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-slate-300">No pending appointments</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-white">Pending Appointments</h3>
        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
          {pendingAppointments.length}
        </span>
      </div>

      {pendingAppointments.map((appointment) => {
        const isWarned = noShowWarnings.has(appointment.id)
        const scheduledTime = new Date(appointment.scheduledTime)
        const isOverdue = new Date() > scheduledTime

        return (
          <div
            key={appointment.id}
            className={`bg-slate-900 rounded-lg p-4 border transition-all ${
              isWarned ? 'border-red-500/50 bg-red-500/5' : isOverdue ? 'border-yellow-500/50' : 'border-slate-700/50'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <p className="text-white font-semibold">Token: {appointment.token}</p>
                <p className="text-slate-400 text-sm">Position: #{appointment.queuePosition}</p>
              </div>
              <div className="flex gap-2">
                {isOverdue && !isWarned && (
                  <button
                    onClick={() => handleAutoSkipWarning(appointment.id)}
                    className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors"
                    title="Mark as no-show (click twice)"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                )}
                {isWarned && (
                  <button
                    onClick={() => {
                      setNoShowWarnings((prev) => {
                        const next = new Set(prev)
                        next.delete(appointment.id)
                        return next
                      })
                    }}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {isOverdue && (
              <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-400 text-sm">
                Scheduled time has passed - customer may have arrived
              </div>
            )}

            {isWarned && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkNoShow(appointment.id)}
                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Confirm No-Show
                </button>
                <button
                  onClick={() => {
                    setNoShowWarnings((prev) => {
                      const next = new Set(prev)
                      next.delete(appointment.id)
                      return next
                    })
                    setExpandedNoShow(null)
                  }}
                  className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Customer Arrived
                </button>
              </div>
            )}
          </div>
        )
      })}

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-400 text-sm">
          <strong>Tip:</strong> Click the clock icon on overdue appointments to mark them as no-show. Double-click to confirm.
        </p>
      </div>
    </div>
  )
}
