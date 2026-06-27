'use client'

import { useState, useEffect } from 'react'
import { useNotificationContext } from './notification-provider'
import { Play, RotateCcw } from 'lucide-react'

interface QueueAppointment {
  id: string
  token: string
  citizenName: string
  serviceName: string
  scheduledTime: string
  queuePosition: number
  status: 'pending' | 'serving' | 'completed'
}

interface QueueDisplayProps {
  officeId: string
  date: string
}

export function AdminQueueDisplay({ officeId, date }: QueueDisplayProps) {
  const [queue, setQueue] = useState<QueueAppointment[]>([])
  const [currentServing, setCurrentServing] = useState<QueueAppointment | null>(null)
  const [loading, setLoading] = useState(false)
  const [callLoading, setCallLoading] = useState(false)
  const { success, error } = useNotificationContext()

  // Mock data for demonstration
  useEffect(() => {
    const mockQueue: QueueAppointment[] = [
      {
        id: '1',
        token: 'A-001',
        citizenName: 'John Doe',
        serviceName: 'Visa Processing',
        scheduledTime: '09:00',
        queuePosition: 1,
        status: 'serving',
      },
      {
        id: '2',
        token: 'A-002',
        citizenName: 'Jane Smith',
        serviceName: 'Document Verification',
        scheduledTime: '09:30',
        queuePosition: 2,
        status: 'pending',
      },
      {
        id: '3',
        token: 'A-003',
        citizenName: 'Bob Johnson',
        serviceName: 'General Inquiry',
        scheduledTime: '10:00',
        queuePosition: 3,
        status: 'pending',
      },
    ]

    const serving = mockQueue.find((a) => a.status === 'serving')
    setCurrentServing(serving || null)
    setQueue(mockQueue)
  }, [officeId, date])

  const handleCallNext = async () => {
    setCallLoading(true)
    try {
      const response = await fetch('/api/admin/call-next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officeId,
          date,
        }),
      })

      if (!response.ok) throw new Error('Failed to call next')

      const data = await response.json()

      // Update current serving
      setCurrentServing({
        id: data.appointmentId,
        token: data.token,
        citizenName: 'Customer',
        serviceName: 'Service',
        scheduledTime: new Date().toLocaleTimeString(),
        queuePosition: data.remainingInQueue + 1,
        status: 'serving',
      })

      success(`Token ${data.token} called for service`)

      // Remove from queue
      setQueue((prev) => prev.filter((a) => a.id !== data.appointmentId))
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to call next')
    } finally {
      setCallLoading(false)
    }
  }

  const handleMarkCompleted = async (appointmentId: string) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId,
          officeId,
          date,
          completed: true,
        }),
      })

      success('Appointment marked as completed')
      setCurrentServing(null)

      if (queue.length > 0) {
        await handleCallNext()
      }
    } catch (err) {
      error('Failed to mark as completed')
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Currently Serving */}
      <div className="bg-white rounded-lg border-2 border-blue-300 p-8 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Currently Serving</h2>
        {currentServing ? (
          <div className="text-center">
            <p className="text-6xl font-bold text-blue-600 mb-4 font-mono">
              {currentServing.token}
            </p>
            <p className="text-xl text-gray-900 font-semibold mb-2">
              {currentServing.citizenName}
            </p>
            <p className="text-gray-600 mb-6">{currentServing.serviceName}</p>
            <button
              onClick={() => handleMarkCompleted(currentServing.id)}
              className="px-6 py-2 bg-green-600 rounded-lg font-semibold text-white hover:bg-green-700 transition-colors"
            >
              Mark Completed
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No one currently being served</p>
            <button
              onClick={handleCallNext}
              disabled={queue.length === 0 || callLoading}
              className="px-6 py-3 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              {callLoading ? 'Calling...' : 'Call Next'}
            </button>
          </div>
        )}
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Waiting Queue ({queue.length})
        </h2>

        {queue.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Queue is empty</p>
          </div>
        ) : (
          <div className="space-y-2">
            {queue.map((appointment, index) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-gray-900">
                      {appointment.token}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.citizenName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    {appointment.serviceName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Scheduled: {appointment.scheduledTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentServing && queue.length > 0 && (
          <button
            onClick={handleCallNext}
            disabled={callLoading}
            className="w-full mt-6 px-4 py-3 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {callLoading ? 'Calling Next...' : 'Call Next'}
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">In Queue</p>
          <p className="text-3xl font-bold text-gray-900">{queue.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Currently Serving</p>
          <p className="text-3xl font-bold text-blue-600">
            {currentServing ? 1 : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Est. Wait (Min)</p>
          <p className="text-3xl font-bold text-gray-900">
            {queue.length > 0 ? queue.length * 15 : 0}
          </p>
        </div>
      </div>
    </div>
  )
}
