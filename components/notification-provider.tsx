'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useNotifications, Notification, NotificationType } from '@/hooks/use-notifications'

interface NotificationContextType {
  notifications: Notification[]
  add: (message: string, type?: NotificationType, duration?: number) => string
  remove: (id: string) => void
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
  warning: (message: string, duration?: number) => string
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifications = useNotifications()

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within NotificationProvider'
    )
  }
  return context
}
