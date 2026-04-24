'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

interface Point {
  x: number
  y: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calcAccuracy(userCanvas: HTMLCanvasElement, letter: any): number {
  if (!letter || !letter.guidePath) return 0
  const w = userCanvas.width
  const h = userCanvas.height
  const userCtx = userCanvas.getContext('2d')
  if (!userCtx) return 0
  const userData = userCtx.getImageData(0, 0, w, h).data
  const skeletonCanvas = document.createElement('canvas')
  skeletonCanvas.width = w
  skeletonCanvas.height = h
  const skeletonCtx = skeletonCanvas.getContext('2d')
  if (!skeletonCtx) return 0
  skeletonCtx.lineWidth = 6
  skeletonCtx.lineCap = 'round'
  skeletonCtx.lineJoin = 'round'
  skeletonCtx.strokeStyle = 'black'
  const scale = w / 200
  skeletonCtx.scale(scale, scale)
  skeletonCtx.stroke(new Path2D(letter.guidePath))
  const skeletonData = skeletonCtx.getImageData(0, 0, w, h).data
  const zoneCanvas = document.createElement('canvas')
  zoneCanvas.width = w
  zoneCanvas.height = h
  const zoneCtx = zoneCanvas.getContext('2d')
  if (!zoneCtx) return 0
  zoneCtx.lineWidth = 75
  zoneCtx.lineCap = 'round'
  zoneCtx.lineJoin = 'round'
  zoneCtx.strokeStyle = 'black'
  zoneCtx.scale(scale, scale)
  zoneCtx.stroke(new Path2D(letter.guidePath))
  const zoneData = zoneCtx.getImageData(0, 0, w, h).data
  let totalUser = 0
  let userInZone = 0
  let totalSkeleton = 0
  let skeletonCovered = 0
  for (let i = 3; i < userData.length; i += 4) {
    const u = userData[i] > 50
    const s = skeletonData[i] > 50
    const z = zoneData[i] > 50
    if (u) {
      totalUser++
      if (z) userInZone++
    }
    if (s) {
      totalSkeleton++
      if (u) skeletonCovered++
    }
  }
  if (totalUser === 0) return 0
  if (totalSkeleton === 0) return 100
  const precision = userInZone / totalUser
  const recall = skeletonCovered / totalSkeleton
  const mappedRecall = Math.min(1, recall / 0.50)
  const mappedPrecision = Math.min(1, precision / 0.50)
  const f1 = (2 * mappedPrecision * mappedRecall) / (mappedPrecision + mappedRecall || 1)
  return Math.round(f1 * 100)
}

export default function WritingClient({
  params,
}: {
  params: Promise<{ letterId: string }>
}) {
  const [letterId, setLetterId] = useState<string>('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [paths, setPaths] = useState<Point[][]>([])
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(12)
  const [showGuide, setShowGuide] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const guideCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { completeLesson, isLessonCompleted, addSessionAccuracy } = useLearningStore()
  const searchParams = useSearchParams()
  const level = parseInt(searchParams.get('level') || '1', 10)

  useEffect(() => {
    params.then((p) => setLetterId(p.letterId))
  }, [params])

  const letter = HIJAIYAH_LETTERS.find((l) => l.id === letterId)
  const currentIndex = HIJAIYAH_LETTERS.findIndex((l) => l.id === letterId)
  const prevLetter = currentIndex > 0 ? HIJAIYAH_LETTERS[currentIndex - 1] : null
  const nextLetter = currentIndex < HIJAIYAH_LETTERS.length - 1 ? HIJAIYAH_LETTERS[currentIndex + 1] : null
  const isCompleted = letter ? isLessonCompleted(`${level}-${letter.id}`) : false

  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current
    if (!canvas || !letter) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.font = `${canvas.width * 0.6}px Amiri, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = showGuide ? 'rgba(59, 130, 246, 0.08)' : 'transparent'
    ctx.fillText(letter.letter, canvas.width / 2, canvas.height / 2)
    ctx.restore()
    if (showGuide && letter.guidePath) {
      ctx.save()
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)'
      ctx.lineWidth = 3
      ctx.setLineDash([8, 6])
      ctx.lineCap = 'round'
      const path = new Path2D(letter.guidePath)
      const scale = canvas.width / 200
      ctx.scale(scale, scale)
      ctx.stroke(path)
      ctx.restore()
    }
    if (showGuide) {
      ctx.save()
      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)'
      ctx.beginPath()
      ctx.arc(canvas.width * 0.65, canvas.height * 0.35, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(245, 158, 11, 1)'
      ctx.font = 'bold 11px Plus Jakarta Sans'
      ctx.textAlign = 'center'
      ctx.fillText('▶ Start', canvas.width * 0.65, canvas.height * 0.35 - 16)
      ctx.restore()
    }
  }, [letter, showGuide])

  useEffect(() => {
    drawGuide()
  }, [drawGuide])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const allPaths = [...paths]
    if (currentPath.length > 0) allPaths.push(currentPath)
    allPaths.forEach((path) => {
      if (path.length < 2) return
      ctx.beginPath()
      ctx.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        const xc = (path[i - 1].x + path[i].x) / 2
        const yc = (path[i - 1].y + path[i].y) / 2
        ctx.quadraticCurveTo(path[i - 1].x, path[i - 1].y, xc, yc)
      }
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = strokeWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    })
  }, [paths, currentPath, strokeWidth])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    setAccuracy(null)
    const pos = getPos(e, canvas)
    setCurrentPath([pos])
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const pos = getPos(e, canvas)
    setCurrentPath((prev) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1]
        const dist = Math.hypot(last.x - pos.x, last.y - pos.y)
        if (dist < 1.5) return prev
      }
      return [...prev, pos]
    })
  }

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId)
    }
    setIsDrawing(false)
    if (currentPath.length > 1) {
      setPaths((prev) => [...prev, currentPath])
    }
    setCurrentPath([])
  }

  const handleCheck = () => {
    const userCanvas = canvasRef.current
    if (!userCanvas || !letter) return
    const score = calcAccuracy(userCanvas, letter)
    setAccuracy(score)
    addSessionAccuracy(score)
    if (score >= 60) {
      completeLesson(`${level}-${letter.id}`, score)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  const handleClear = () => {
    setPaths([])
    setCurrentPath([])
    setAccuracy(null)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  if (!letter && letterId) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#64748B]">Huruf tidak ditemukan</p>
          <Link href="/learn" className="btn-primary px-6 py-2 mt-4 inline-block text-sm">
            Kembali ke Peta
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#1E293B]/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl text-center animate-bounce-in border border-[#334155] shadow-[#2563EB]/20">
            <div className="text-6xl mb-3">🎉</div>
            <div className="text-2xl font-extrabold text-[#3B82F6] mb-1">Presisi Tinggi!</div>
            <div className="text-[#94A3B8] font-bold">Akurasi: {accuracy}%</div>
            <div className="font-arabic text-6xl text-[#F59E0B] mt-4">{letter?.letter}</div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#CBD5E1] mb-8">
          <Link href="/learn" className="hover:text-[#3B82F6] transition-colors">Peta Rute</Link>
          <span>›</span>
          <span className="text-[#3B82F6]">Sesi Tulis: {letter?.name || '...'}</span>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in">
            <div className="bento-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-7xl font-arabic text-[#334155]/50 -rotate-12 pointer-events-none">{letter?.letter}</div>
              <div className="text-[10px] font-extrabold tracking-widest text-[#F59E0B] mb-4 uppercase">Identitas Huruf</div>
              <div className="font-arabic text-9xl text-[#3B82F6] mb-4 leading-none py-4">{letter?.letter || ''}</div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{letter?.name}</h1>
              <p className="text-[#94A3B8] font-bold mt-1 uppercase tracking-widest">/{letter?.transliteration}/</p>
              {isCompleted && (
                <div className="mt-4 inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] text-[11px] uppercase tracking-wider font-extrabold px-4 py-2 rounded-full border border-[#10B981]/20">
                  <span className="text-base">✓</span> Kompetensi Tercapai
                </div>
              )}
            </div>
            <div className="bento-card p-6">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-5 text-center">Bentuk Transformasi</h3>
              <div className="grid grid-cols-4 gap-3">
                {letter && [
                  { label: 'Tunggal', char: letter.isolated },
                  { label: 'Awal', char: letter.initial },
                  { label: 'Tengah', char: letter.medial },
                  { label: 'Akhir', char: letter.final },
                ].map((p) => (
                  <div key={p.label} className="bg-[#0F172A] rounded-2xl p-4 text-center border border-[#334155]">
                    <div className="font-arabic text-2xl text-[#3B82F6] mb-2">{p.char}</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {prevLetter ? (
                <Link href={`/learn/writing/${prevLetter.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#1E293B] border border-[#334155] shadow-sm text-white rounded-2xl hover:border-[#3B82F6] transition-all text-center">
                  ← {prevLetter.name}
                </Link>
              ) : <div className="flex-1" />}
              {nextLetter ? (
                <Link href={`/learn/writing/${nextLetter.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.39)] hover:scale-[1.02] rounded-2xl transition-all text-center">
                  {nextLetter.name} →
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-[#0F172A] rounded-[2rem] border border-[#334155] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#0B1120] gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-extrabold uppercase tracking-widest text-white">Kanvas Digital</span>
                  <div className="w-px h-4 bg-[#334155] mx-1" />
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-9 h-5 rounded-full transition-colors relative ${showGuide ? 'bg-[#3B82F6]' : 'bg-[#334155]'}`} onClick={() => setShowGuide(!showGuide)}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showGuide ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider group-hover:text-white transition-colors">Ghost Guide</span>
                  </label>
                </div>
                <div className="flex items-center gap-3 bg-[#1E293B] px-3 py-1.5 rounded-full border border-[#334155]">
                  {[8, 12, 16].map((size) => (
                    <button key={size} onClick={() => setStrokeWidth(size)} className={`rounded-full transition-all ${strokeWidth === size ? 'bg-[#3B82F6] scale-110 shadow-md' : 'bg-[#475569] hover:bg-[#64748B]'}`} style={{ width: size + 6, height: size + 6 }} title={`Ketebalan ${size}`} />
                  ))}
                </div>
              </div>
              <div ref={containerRef} className="relative aspect-square w-full bg-[#1E293B]" style={{ maxHeight: 500 }}>
                <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
                <canvas ref={guideCanvasRef} width={500} height={500} className="absolute inset-0 w-full h-full" />
                <canvas ref={canvasRef} width={500} height={500} className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10" onPointerDown={startDrawing} onPointerMove={draw} onPointerUp={stopDrawing} onPointerCancel={stopDrawing} onPointerOut={stopDrawing} />
                {paths.length === 0 && currentPath.length === 0 && (
                  <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none z-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white bg-[#0F172A]/90 backdrop-blur border border-[#334155] px-6 py-2 rounded-full shadow-sm">Mulai goresan dari titik oranye</p>
                  </div>
                )}
              </div>
              <div className="bg-[#0B1120] border-t border-[#334155] p-4">
                {accuracy !== null ? (
                  <div className={`p-4 rounded-2xl text-[13px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${accuracy >= 70 ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : accuracy >= 50 ? 'bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/30' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                    {accuracy >= 70 ? '🎯 Sempurna!' : accuracy >= 50 ? '⚠️ Terus Berlatih!' : '🛑 Kurang Akurat.'} — Akurasi Algoritmik: <span className="font-extrabold text-base ml-1">{accuracy}%</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl text-[13px] font-bold uppercase tracking-wide text-[#94A3B8] border border-dashed border-[#334155] text-center">Sistem stand-by menanti hasil eksekusi tulisan Anda.</div>
                )}
              </div>
              <div className="flex gap-4 p-5 bg-[#0F172A]">
                <button id="btn-clear-canvas" onClick={handleClear} className="w-1/3 py-4 text-[13px] font-bold uppercase tracking-widest bg-[#1E293B] border border-[#334155] text-[#94A3B8] rounded-2xl hover:bg-[#334155] hover:border-[#475569] hover:text-white transition-all">Reset</button>
                <button id="btn-check-accuracy" onClick={handleCheck} disabled={paths.length === 0 && currentPath.length === 0} className="w-2/3 py-4 text-sm font-bold uppercase tracking-widest btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Validasi Akurasi</button>
              </div>
            </div>
            <div className="bento-card p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 text-[#FCD34D] flex items-center justify-center text-xl flex-shrink-0">💡</div>
                <div>
                  <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-white mb-1.5">Standar Operasional</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">Huruf Arab ditulis dari <strong>Kanan ke Kiri</strong>. Jangan terburu-buru, algoritma kami menilai letak <em>overlap</em> tinta Anda terhadap garis bayangan, bukan kecepatan goresan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
