'use client'

import { useState } from 'react'
import { X, Calendar, AlertCircle } from 'lucide-react'

interface CancelRescheduleProps {
  token: string
  appointmentId: string
  scheduledDate: string
  scheduledTime: string
  onCancel: (appointmentId: string, reason: string) => Promise<void>
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => Promise<void>
  onClose: () => void
}

export function CancelReschedule({
  token,
  appointmentId,
  scheduledDate,
  scheduledTime,
  onCancel,
  onReschedule,
  onClose,
}: CancelRescheduleProps) {
  const [action, setAction] = useState<'select' | 'cancel' | 'reschedule'>('select')
  const [cancellationReason, setCancellationReason] = useState('')
  const [newDate, setNewDate] = useState(scheduledDate)
  const [newTime, setNewTime] = useState(scheduledTime)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleCancel = async () => {
    if (!cancellationReason) {
      setError('Please select a reason for cancellation')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await onCancel(appointmentId, cancellationReason)
      setSuccess('Appointment cancelled successfully')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel appointment')
    } finally {
      setLoading(false)
    }
  }

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      setError('Please select a date and time')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await onReschedule(appointmentId, newDate, newTime)
      setSuccess('Appointment rescheduled successfully')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reschedule appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Manage Appointment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          {/* Appointment Info */}
          <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 mb-1">Token</p>
                <p className="text-white font-mono font-bold">{token}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Current Date</p>
                <p className="text-white">{scheduledDate}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Time</p>
                <p className="text-white">{scheduledTime}</p>
              </div>
            </div>
          </div>

          {action === 'select' && (
            <div className="space-y-3">
              <button
                onClick={() => setAction('cancel')}
                className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
              >
                Cancel Appointment
              </button>
              <button
                onClick={() => setAction('reschedule')}
                className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reschedule
              </button>
            </div>
          )}

          {action === 'cancel' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Reason for Cancellation</label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Select a reason...</option>
                  <option value="personal">Personal reasons</option>
                  <option value="sick">I am sick</option>
                  <option value="scheduling">Scheduling conflict</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setAction('select')}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading || !cancellationReason}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Cancelling...' : 'Confirm Cancel'}
                </button>
              </div>
            </div>
          )}

          {action === 'reschedule' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Time</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Select time...</option>
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setAction('select')}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleReschedule}
                  disabled={loading || !newDate || !newTime}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Rescheduling...' : 'Confirm Reschedule'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
