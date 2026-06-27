/**
 * Calculate estimated time of arrival (ETA) based on queue position and average service time
 */

const AVG_SERVICE_TIME_MINUTES = 8 // Default average service time per customer

interface ServiceMetrics {
  queuePosition: number
  totalInQueue: number
  averageServiceTime?: number
  serviceWindowsOpen?: number
}

/**
 * Calculate ETA in minutes based on queue position
 * Formula: (queue_position - 1) * avg_service_time / service_windows_open
 */
export function calculateETA(metrics: ServiceMetrics): number {
  const {
    queuePosition,
    averageServiceTime = AVG_SERVICE_TIME_MINUTES,
    serviceWindowsOpen = 1,
  } = metrics

  // People ahead of you
  const peopleAhead = Math.max(0, queuePosition - 1)

  // Calculate ETA (distribute load across service windows)
  const eta = Math.ceil((peopleAhead * averageServiceTime) / serviceWindowsOpen)

  return Math.max(1, eta) // Minimum 1 minute
}

/**
 * Get ETA with confidence level
 */
export function getETAWithConfidence(metrics: ServiceMetrics): {
  eta: number
  min: number
  max: number
  confidence: 'high' | 'medium' | 'low'
} {
  const eta = calculateETA(metrics)

  // Confidence increases with more people processed (stable average)
  // For now, mock logic: higher queue = more data points = higher confidence
  const confidence: 'high' | 'medium' | 'low' =
    metrics.totalInQueue > 10 ? 'high' : metrics.totalInQueue > 5 ? 'medium' : 'low'

  // Confidence intervals
  const variance = eta * 0.15 // +/- 15% variance
  const min = Math.max(1, Math.floor(eta - variance))
  const max = Math.ceil(eta + variance)

  return { eta, min, max, confidence }
}

/**
 * Format ETA for display
 */
export function formatETA(minutes: number): string {
  if (minutes < 1) return 'Less than a minute'
  if (minutes === 1) return '1 minute'
  if (minutes < 60) return `${minutes} minutes`

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${mins}m`
}

/**
 * Get ETA status indicator
 */
export function getETAStatus(minutes: number): 'short' | 'medium' | 'long' {
  if (minutes <= 5) return 'short'
  if (minutes <= 15) return 'medium'
  return 'long'
}

/**
 * Get ETA color for UI
 */
export function getETAColor(
  status: 'short' | 'medium' | 'long'
): string {
  switch (status) {
    case 'short':
      return 'text-green-400'
    case 'medium':
      return 'text-yellow-400'
    case 'long':
      return 'text-red-400'
  }
}
