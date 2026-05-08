'use client'

import { useRef, useState, useCallback } from 'react'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  levelTitle: string
  levelIcon: string
  completedDate: string
  xp: number
  levelId: number
}

/**
 * Menggambar sertifikat premium di canvas dan mengembalikan dataURL
 */
function drawCertificate(
  canvas: HTMLCanvasElement,
  userName: string,
  levelTitle: string,
  levelIcon: string,
  completedDate: string,
  xp: number,
  levelId: number
) {
  const W = 1200, H = 850
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // ─── Background ─────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   '#020617')
  bg.addColorStop(0.5, '#0a1628')
  bg.addColorStop(1,   '#020617')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // ─── Ornament border luar ────────────────────────────────────────
  // Border emas gradient
  const borderGrad = ctx.createLinearGradient(0, 0, W, H)
  borderGrad.addColorStop(0,   '#F59E0B')
  borderGrad.addColorStop(0.5, '#FDE68A')
  borderGrad.addColorStop(1,   '#B45309')
  ctx.strokeStyle = borderGrad
  ctx.lineWidth = 6
  roundRect(ctx, 30, 30, W - 60, H - 60, 24, false, true)

  // Border dalam (tipis)
  ctx.strokeStyle = 'rgba(245,158,11,0.25)'
  ctx.lineWidth = 1.5
  roundRect(ctx, 46, 46, W - 92, H - 92, 18, false, true)

  // ─── Glow center ────────────────────────────────────────────────
  const radial = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500)
  radial.addColorStop(0,   'rgba(37,99,235,0.12)')
  radial.addColorStop(0.6, 'rgba(37,99,235,0.04)')
  radial.addColorStop(1,   'transparent')
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, W, H)

  // ─── Corner ornaments ────────────────────────────────────────────
  drawCornerOrnament(ctx, 60, 60, 1)
  drawCornerOrnament(ctx, W - 60, 60, -1)
  drawCornerOrnament(ctx, 60, H - 60, 1, true)
  drawCornerOrnament(ctx, W - 60, H - 60, -1, true)

  // ─── Header: Logo & App Name ─────────────────────────────────────
  ctx.textAlign = 'center'

  // Arabic bismillah ornament line
  ctx.fillStyle = 'rgba(245,158,11,0.5)'
  ctx.fillRect(W / 2 - 200, 90, 400, 1)

  // App name
  ctx.font = 'bold 16px sans-serif'
  ctx.fillStyle = 'rgba(245,158,11,0.8)'
  ctx.letterSpacing = '8px'
  ctx.fillText('QUR\'AN FLOW', W / 2, 130)

  ctx.font = '13px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.7)'
  ctx.letterSpacing = '3px'
  ctx.fillText('PLATFORM PEMBELAJARAN HIJAIYAH DIGITAL', W / 2, 158)

  ctx.fillStyle = 'rgba(245,158,11,0.5)'
  ctx.fillRect(W / 2 - 200, 172, 400, 1)

  // ─── Title ───────────────────────────────────────────────────────
  ctx.font = 'bold 22px sans-serif'
  ctx.fillStyle = 'rgba(203,213,225,0.7)'
  ctx.letterSpacing = '6px'
  ctx.fillText('SERTIFIKAT PENCAPAIAN', W / 2, 230)

  // ─── Recipient Name ──────────────────────────────────────────────
  ctx.font = 'italic 14px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.6)'
  ctx.letterSpacing = '2px'
  ctx.fillText('Dengan bangga diberikan kepada', W / 2, 280)

  // Name box glow
  const nameGlow = ctx.createLinearGradient(W / 2 - 320, 290, W / 2 + 320, 380)
  nameGlow.addColorStop(0,   'rgba(37,99,235,0)')
  nameGlow.addColorStop(0.5, 'rgba(37,99,235,0.08)')
  nameGlow.addColorStop(1,   'rgba(37,99,235,0)')
  ctx.fillStyle = nameGlow
  ctx.fillRect(W / 2 - 320, 290, 640, 90)

  ctx.font = 'bold 68px serif'
  ctx.fillStyle = '#FFFFFF'
  ctx.letterSpacing = '2px'
  ctx.fillText(userName || 'Nama Santri', W / 2, 368)

  // Underline name
  const nameWidth = ctx.measureText(userName || 'Nama Santri').width
  const underGrad = ctx.createLinearGradient(W / 2 - nameWidth / 2, 0, W / 2 + nameWidth / 2, 0)
  underGrad.addColorStop(0,   'transparent')
  underGrad.addColorStop(0.5, '#F59E0B')
  underGrad.addColorStop(1,   'transparent')
  ctx.strokeStyle = underGrad
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(W / 2 - nameWidth / 2, 378)
  ctx.lineTo(W / 2 + nameWidth / 2, 378)
  ctx.stroke()

  // ─── Achievement description ─────────────────────────────────────
  ctx.font = '15px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.75)'
  ctx.letterSpacing = '1px'
  ctx.fillText('telah berhasil menyelesaikan dengan penuh dedikasi', W / 2, 420)

  // ─── Level Badge ─────────────────────────────────────────────────
  // Badge background
  const badgeBg = ctx.createLinearGradient(W / 2 - 240, 440, W / 2 + 240, 560)
  badgeBg.addColorStop(0,   'rgba(245,158,11,0.12)')
  badgeBg.addColorStop(0.5, 'rgba(245,158,11,0.18)')
  badgeBg.addColorStop(1,   'rgba(245,158,11,0.12)')
  ctx.fillStyle = badgeBg
  roundRect(ctx, W / 2 - 240, 440, 480, 110, 16, true, false)
  ctx.strokeStyle = 'rgba(245,158,11,0.4)'
  ctx.lineWidth = 1
  roundRect(ctx, W / 2 - 240, 440, 480, 110, 16, false, true)

  // Level icon
  ctx.font = '40px serif'
  ctx.letterSpacing = '0'
  ctx.fillText(levelIcon, W / 2 - 170, 508)

  // Level number
  ctx.font = 'bold 13px sans-serif'
  ctx.fillStyle = '#F59E0B'
  ctx.letterSpacing = '4px'
  ctx.textAlign = 'left'
  ctx.fillText(`LEVEL ${levelId}`, W / 2 - 115, 476)

  // Level title
  ctx.font = 'bold 26px sans-serif'
  ctx.fillStyle = '#FFFFFF'
  ctx.letterSpacing = '0'
  ctx.fillText(levelTitle, W / 2 - 115, 510)

  // XP gained
  ctx.font = 'bold 12px sans-serif'
  ctx.fillStyle = 'rgba(245,158,11,0.7)'
  ctx.letterSpacing = '2px'
  ctx.fillText(`${xp} XP DIPEROLEH`, W / 2 - 115, 535)

  ctx.textAlign = 'center'

  // ─── Divider ─────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(245,158,11,0.3)'
  ctx.fillRect(W / 2 - 300, 575, 600, 1)

  // ─── Date & Signatures ───────────────────────────────────────────
  // Date
  ctx.font = '13px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.5)'
  ctx.letterSpacing = '2px'
  ctx.fillText(`DITERBITKAN: ${completedDate.toUpperCase()}`, W / 2, 610)

  // Two signature columns
  const sigY = 720
  const col1X = W / 2 - 200
  const col2X = W / 2 + 200

  // Signature 1 - Platform
  ctx.font = 'italic bold 22px serif'
  ctx.fillStyle = 'rgba(245,158,11,0.9)'
  ctx.letterSpacing = '0'
  ctx.fillText('Qur\'ān Flōw', col1X, sigY - 30)
  ctx.strokeStyle = 'rgba(245,158,11,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(col1X - 80, sigY - 5)
  ctx.lineTo(col1X + 80, sigY - 5)
  ctx.stroke()
  ctx.font = 'bold 11px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.6)'
  ctx.letterSpacing = '2px'
  ctx.fillText('DIREKTUR PLATFORM', col1X, sigY + 15)

  // Signature 2 - Ustadz
  ctx.font = 'italic bold 22px serif'
  ctx.fillStyle = 'rgba(245,158,11,0.9)'
  ctx.letterSpacing = '0'
  ctx.fillText('Ust. Daryanto', col2X, sigY - 30)
  ctx.strokeStyle = 'rgba(245,158,11,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(col2X - 80, sigY - 5)
  ctx.lineTo(col2X + 80, sigY - 5)
  ctx.stroke()
  ctx.font = 'bold 11px sans-serif'
  ctx.fillStyle = 'rgba(148,163,184,0.6)'
  ctx.letterSpacing = '2px'
  ctx.fillText('PENGAWAS KURIKULUM', col2X, sigY + 15)

  // ─── Seal / Stamp ─────────────────────────────────────────────────
  ctx.textAlign = 'center'
  // Outer circle
  const sealGrad = ctx.createRadialGradient(W / 2, sigY - 18, 0, W / 2, sigY - 18, 50)
  sealGrad.addColorStop(0,   'rgba(245,158,11,0.2)')
  sealGrad.addColorStop(1,   'rgba(245,158,11,0.05)')
  ctx.fillStyle = sealGrad
  ctx.beginPath()
  ctx.arc(W / 2, sigY - 18, 48, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(245,158,11,0.5)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(W / 2, sigY - 18, 48, 0, Math.PI * 2)
  ctx.stroke()
  // Inner text
  ctx.font = '30px serif'
  ctx.letterSpacing = '0'
  ctx.fillStyle = 'rgba(245,158,11,0.9)'
  ctx.fillText('✦', W / 2, sigY - 8)
  ctx.font = 'bold 9px sans-serif'
  ctx.fillStyle = 'rgba(245,158,11,0.7)'
  ctx.letterSpacing = '2px'
  ctx.fillText('RESMI', W / 2, sigY + 22)

  // ─── Footer ───────────────────────────────────────────────────────
  ctx.font = '10px sans-serif'
  ctx.fillStyle = 'rgba(100,116,139,0.4)'
  ctx.letterSpacing = '1px'
  ctx.fillText('qur-an-flow.pages.dev  •  Sertifikat Digital Berverifikasi', W / 2, H - 52)
}

// Helper: rounded rect
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number, fill: boolean, stroke: boolean
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  if (fill) ctx.fill()
  if (stroke) ctx.stroke()
}

// Helper: corner ornament
function drawCornerOrnament(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  flipX: number, flipY?: boolean
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(flipX, flipY ? -1 : 1)
  ctx.strokeStyle = 'rgba(245,158,11,0.45)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, 0); ctx.lineTo(50, 0)
  ctx.moveTo(0, 0); ctx.lineTo(0, 50)
  ctx.stroke()
  ctx.fillStyle = 'rgba(245,158,11,0.6)'
  ctx.beginPath()
  ctx.arc(0, 0, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// ─── Modal Component ──────────────────────────────────────────────────────────
export default function CertificateModal({
  isOpen, onClose, userName, levelTitle, levelIcon, completedDate, xp, levelId
}: CertificateModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rendered, setRendered] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const renderCertificate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawCertificate(canvas, userName, levelTitle, levelIcon, completedDate, xp, levelId)
    setRendered(true)
  }, [userName, levelTitle, levelIcon, completedDate, xp, levelId])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setDownloading(true)
    const link = document.createElement('a')
    link.download = `sertifikat-quranflow-level${levelId}-${(userName || 'santri').toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
    setTimeout(() => setDownloading(false), 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#0A1628] border border-[#1E293B] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E293B]">
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
              🎓 Sertifikat Digital
            </h2>
            <p className="text-[11px] text-[#64748B] font-medium mt-1">
              Level {levelId}: {levelTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Canvas Preview */}
        <div className="p-6">
          {!rendered ? (
            <div className="flex flex-col items-center gap-5 py-10">
              <div className="text-5xl animate-pulse">🎓</div>
              <p className="text-[#64748B] text-sm font-medium">Membuat sertifikat eksklusif Anda...</p>
              <button
                onClick={renderCertificate}
                className="btn-primary px-8 py-3 text-sm font-bold uppercase tracking-widest"
              >
                Render Sertifikat
              </button>
            </div>
          ) : null}

          <canvas
            ref={canvasRef}
            className={`w-full rounded-2xl border border-[#1E293B] transition-all duration-500 ${rendered ? 'opacity-100' : 'opacity-0 h-0'}`}
            onLoad={renderCertificate}
          />

          {/* Auto render on mount */}
          <div className="hidden" ref={(_el) => { if (!rendered) setTimeout(renderCertificate, 100) }} />
        </div>

        {/* Actions */}
        {rendered && (
          <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all
                bg-gradient-to-r from-[#F59E0B] to-[#B45309] text-[#0F172A] shadow-lg shadow-amber-500/20
                hover:shadow-amber-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
            >
              {downloading ? '⏳ Mengunduh...' : '⬇️ Unduh Sertifikat (PNG)'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#475569] transition-all"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
