'use client'

import { useNotificationContext } from './notification-provider'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { Notification } from '@/hooks/use-notifications'

function NotificationItem({ notification, onRemove }: { notification: Notification; onRemove: () => void }) {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  }[notification.type]

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  }[notification.type]

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  }[notification.type]

  const icons = {
    success: <CheckCircle className={`w-5 h-5 ${iconColor}`} />,
    error: <AlertCircle className={`w-5 h-5 ${iconColor}`} />,
    info: <Info className={`w-5 h-5 ${iconColor}`} />,
    warning: <AlertTriangle className={`w-5 h-5 ${iconColor}`} />,
  }[notification.type]

  return (
    <div
      className={`${bgColor} border rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-200`}
      role="alert"
    >
      {icons}
      <div className={`flex-1 ${textColor} text-sm font-medium`}>
        {notification.message}
      </div>
      <button
        onClick={onRemove}
        className={`${textColor} hover:opacity-70 transition-opacity`}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function NotificationToast() {
  const { notifications, remove } = useNotificationContext()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md pointer-events-auto">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => remove(notification.id)}
        />
      ))}
    </div>
  )
}
