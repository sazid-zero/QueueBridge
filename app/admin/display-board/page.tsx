'use client'

import { useEffect, useState } from 'react'

interface CurrentService {
  token: string
  counterNumber: number
  status: string
}

interface QueueStats {
  totalInQueue: number
  averageWaitTime: number
  lastUpdated: string
}

export default function DisplayBoardPage() {
  const [currentServices, setCurrentServices] = useState<CurrentService[]>([
    { token: 'A-047', counterNumber: 1, status: 'serving' },
    { token: 'A-048', counterNumber: 2, status: 'serving' },
    { token: 'WAITING', counterNumber: 3, status: 'idle' },
  ])

  const [queueStats, setQueueStats] = useState<QueueStats>({
    totalInQueue: 12,
    averageWaitTime: 8,
    lastUpdated: new Date().toLocaleTimeString(),
  })

  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  // Update clock
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStats((prev) => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString(),
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-slate-900/50 border-b-2 border-purple-600 p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Queue Management System</h1>
            <p className="text-slate-400 text-lg">Current Operations</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-white font-mono">{mounted ? formatTime(time) : '--:--:--'}</div>
            <p className="text-slate-400">Last updated: {queueStats.lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Now Serving Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Now Serving</h2>
            <div className="grid grid-cols-3 gap-6">
              {currentServices.map((service, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-8 border-4 flex flex-col items-center justify-center min-h-64 transition-all ${
                    service.status === 'serving'
                      ? 'bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500 shadow-lg shadow-green-500/50'
                      : 'bg-slate-900/50 border-slate-700'
                  }`}
                >
                  <p className="text-slate-400 text-xl mb-4">Counter {service.counterNumber}</p>
                  {service.status === 'serving' ? (
                    <>
                      <div className="text-7xl font-bold text-green-400 font-mono mb-4">{service.token}</div>
                      <p className="text-green-400 text-lg font-semibold">SERVING</p>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-slate-600 mb-4">—</div>
                      <p className="text-slate-500 text-lg font-semibold">IDLE</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Queue Status */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-8 border-2 border-blue-500">
              <p className="text-slate-400 text-lg mb-2">In Queue</p>
              <p className="text-5xl font-bold text-blue-400">{queueStats.totalInQueue}</p>
              <p className="text-blue-300 text-sm mt-4">Waiting appointments</p>
            </div>

            {/* Average Wait Time */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border-2 border-purple-500">
              <p className="text-slate-400 text-lg mb-2">Avg Wait Time</p>
              <p className="text-5xl font-bold text-purple-400">{queueStats.averageWaitTime}</p>
              <p className="text-purple-300 text-sm mt-4">Minutes</p>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl p-8 border-2 border-green-500">
              <p className="text-slate-400 text-lg mb-2">System Status</p>
              <p className="text-5xl font-bold text-green-400">●</p>
              <p className="text-green-300 text-sm mt-4">Operational</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-slate-900/50 rounded-2xl p-6 border border-slate-700 text-center">
            <p className="text-slate-300 text-lg">
              This display updates every 10 seconds. Position a monitor or TV in the waiting area for optimal customer experience.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 text-center text-slate-500 text-sm bg-slate-950/80 border-t border-slate-800">
        <p>QueueBridge Display System • Refresh to update manually</p>
      </div>
    </div>
  )
}
