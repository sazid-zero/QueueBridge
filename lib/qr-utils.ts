/**
 * QR Code utilities for generating trackable ticket links
 */

export function generateTicketUrl(token: string, baseUrl?: string): string {
  const url = baseUrl || process.env.VERCEL_URL || 'http://localhost:3000'
  const protocol = url.includes('localhost') ? 'http' : 'https'
  const cleanUrl = url.replace(/^https?:\/\//, '')
  return `${protocol}://${cleanUrl}/citizen/track?token=${encodeURIComponent(token)}`
}

export function generateQRCodeData(token: string, baseUrl?: string): string {
  return generateTicketUrl(token, baseUrl)
}

/**
 * Extract token from QR code URL
 */
export function extractTokenFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get('token')
  } catch {
    return null
  }
}
