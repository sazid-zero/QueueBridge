'use client'

import { useState, useCallback } from 'react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const add = useCallback(
    (
      message: string,
      type: NotificationType = 'info',
      duration: number = 3000
    ) => {
      const id = Math.random().toString(36).substr(2, 9)
      const notification: Notification = {
        id,
        message,
        type,
        duration,
      }

      setNotifications((prev) => [...prev, notification])

      if (duration > 0) {
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== id)
          )
        }, duration)
      }

      return id
    },
    []
  )

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const success = useCallback(
    (message: string, duration?: number) =>
      add(message, 'success', duration),
    [add]
  )

  const error = useCallback(
    (message: string, duration?: number) =>
      add(message, 'error', duration || 5000),
    [add]
  )

  const info = useCallback(
    (message: string, duration?: number) =>
      add(message, 'info', duration),
    [add]
  )

  const warning = useCallback(
    (message: string, duration?: number) =>
      add(message, 'warning', duration),
    [add]
  )

  return {
    notifications,
    add,
    remove,
    success,
    error,
    info,
    warning,
  }
}
