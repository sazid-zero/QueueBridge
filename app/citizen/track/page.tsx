'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Clock, AlertCircle, CheckCircle } from 'lucide-react'

function TrackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (!token) {
      setError('No token provided')
      setLoading(false)
      return
    }

    const fetchAppointment = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/queue/position?token=${encodeURIComponent(token)}`)
        if (!response.ok) {
          throw new Error('Appointment not found')
        }
        const data = await response.json()
        setAppointment(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load appointment')
        setAppointment(null)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointment()

    // Auto-refresh every 5 seconds if enabled
    let interval: NodeJS.Timeout | null = null
    if (autoRefresh) {
      interval = setInterval(fetchAppointment, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [token, autoRefresh])

  if (loading && !appointment) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading appointment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/citizen')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Booking
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'serving':
        return 'text-green-400'
      case 'completed':
        return 'text-blue-400'
      case 'no-show':
        return 'text-red-400'
      default:
        return 'text-purple-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'serving':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-blue-400" />
      default:
        return <Clock className="w-6 h-6 text-purple-400" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Track Your Appointment</h1>
          <p className="text-slate-400">Token: {token}</p>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 border border-slate-800 mb-6">
          {/* Status Indicator */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">{getStatusIcon(appointment?.status || 'pending')}</div>
            <h2 className={`text-2xl font-bold ${getStatusColor(appointment?.status || 'pending')} mb-2`}>
              {appointment?.status === 'serving'
                ? 'Now Serving'
                : appointment?.status === 'completed'
                  ? 'Completed'
                  : appointment?.status === 'no-show'
                    ? 'No Show'
                    : 'In Queue'}
            </h2>
            <p className="text-slate-400">Token {appointment?.token}</p>
          </div>

          {/* Queue Info */}
          {appointment?.status === 'pending' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Queue Position</p>
                <p className="text-white font-bold text-2xl">{appointment?.queuePosition || '-'}</p>
              </div>

              {appointment?.waitTimeMinutes !== undefined && (
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-slate-400 text-sm mb-1">Estimated Wait Time</p>
                  <p className="text-white font-bold text-2xl">{appointment.waitTimeMinutes} minutes</p>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Status</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(20, Math.min(100, ((5 - (appointment?.queuePosition || 5)) / 5) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {appointment?.status === 'serving' && (
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <p className="text-green-400 text-center font-semibold">Head to the counter now!</p>
            </div>
          )}

          {appointment?.status === 'completed' && (
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <p className="text-blue-400 text-center font-semibold">Thank you for visiting!</p>
            </div>
          )}
        </div>

        {/* Auto-refresh toggle */}
        <div className="flex items-center gap-2 p-4 bg-slate-900 rounded-lg border border-slate-800">
          <input
            type="checkbox"
            id="auto-refresh"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="auto-refresh" className="text-slate-300 cursor-pointer flex-1">
            Auto-refresh every 5 seconds
          </label>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('/citizen')}
          className="w-full mt-6 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  )
}
