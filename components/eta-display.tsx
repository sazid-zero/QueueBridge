'use client'

import { Clock } from 'lucide-react'
import { calculateETA, formatETA, getETAStatus, getETAColor } from '@/lib/eta-calculator'

interface ETADisplayProps {
  queuePosition: number
  totalInQueue: number
  averageServiceTime?: number
  serviceWindowsOpen?: number
  showDetails?: boolean
}

export function ETADisplay({
  queuePosition,
  totalInQueue,
  averageServiceTime = 8,
  serviceWindowsOpen = 1,
  showDetails = false,
}: ETADisplayProps) {
  const eta = calculateETA({
    queuePosition,
    totalInQueue,
    averageServiceTime,
    serviceWindowsOpen,
  })

  const status = getETAStatus(eta)
  const color = getETAColor(status)
  const formatted = formatETA(eta)

  const statusMessage = {
    short: 'You&apos;ll be served soon!',
    medium: 'Typical wait time',
    long: 'Long wait time',
  }[status]

  return (
    <div className={`rounded-lg p-6 border ${
      status === 'short'
        ? 'bg-green-500/10 border-green-500/30'
        : status === 'medium'
          ? 'bg-yellow-500/10 border-yellow-500/30'
          : 'bg-red-500/10 border-red-500/30'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <Clock className={`w-5 h-5 ${color}`} />
        <p className="text-slate-400 text-sm font-medium">Estimated Wait Time</p>
      </div>

      <p className={`text-3xl font-bold mb-2 ${color}`}>{formatted}</p>

      <p className={`text-sm ${color} opacity-80`}>{statusMessage}</p>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Your Position:</span>
            <span className="text-white font-semibold">#{queuePosition}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>People in Queue:</span>
            <span className="text-white font-semibold">{totalInQueue}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Avg Service Time:</span>
            <span className="text-white font-semibold">{averageServiceTime} min</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Active Counters:</span>
            <span className="text-white font-semibold">{serviceWindowsOpen}</span>
          </div>
        </div>
      )}
    </div>
  )
}
