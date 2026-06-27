'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Download, Copy } from 'lucide-react'
import { generateQRCodeData } from '@/lib/qr-utils'

interface QRTicketProps {
  token: string
  appointmentId: string
  serviceName: string
  scheduledTime: string
}

export function QRTicket({ token, appointmentId, serviceName, scheduledTime }: QRTicketProps) {
  const [copied, setCopied] = useState(false)
  const qrValue = generateQRCodeData(token)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('[v0] Failed to copy token:', err)
    }
  }

  const handleDownload = () => {
    // This would download the QR code as an image
    // Implementation depends on the specific requirement
    const svg = document.getElementById('qr-code')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        canvas.getContext('2d')?.drawImage(img, 0, 0)
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `ticket-${token}.png`
        link.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 border border-slate-800 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Ticket</h2>
        <p className="text-slate-400">Scan or use this code to track your appointment</p>
      </div>

      {/* Service Info */}
      <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Service</p>
            <p className="text-white font-semibold">{serviceName}</p>
          </div>
          <div>
            <p className="text-slate-400">Time</p>
            <p className="text-white font-semibold">{scheduledTime}</p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-lg p-6 mb-6 flex items-center justify-center">
        <QRCode
          id="qr-code"
          value={qrValue}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      {/* Token Display */}
      <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
        <p className="text-slate-400 text-xs mb-2">Token Number</p>
        <div className="flex items-center justify-between">
          <p className="text-white font-mono text-xl font-bold">{token}</p>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="Copy token"
          >
            <Copy className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        {copied && <p className="text-green-400 text-xs mt-2">Copied!</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Token'}
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <p className="text-slate-400 text-xs leading-relaxed">
          <strong className="text-white">Tip:</strong> Save this ticket or screenshot it. You can scan the QR code or enter your token number at the check-in counter.
        </p>
      </div>
    </div>
  )
}
