'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

interface Point {
  x: number
  y: number
}

// Calculate pixel overlap similarity between two canvas images
function calcAccuracy(userCanvas: HTMLCanvasElement, maskCanvas: HTMLCanvasElement): number {
  const ctx1 = userCanvas.getContext('2d')
  const ctx2 = maskCanvas.getContext('2d')
  if (!ctx1 || !ctx2) return 0

  const w = userCanvas.width
  const h = userCanvas.height
  const data1 = ctx1.getImageData(0, 0, w, h).data
  const data2 = ctx2.getImageData(0, 0, w, h).data

  let overlap = 0
  let totalUser = 0
  let totalMask = 0

  for (let i = 3; i < data1.length; i += 4) {
    const userPixel = data1[i] > 50 ? 1 : 0
    const maskPixel = data2[i] > 50 ? 1 : 0
    if (userPixel) totalUser++
    if (maskPixel) totalMask++
    if (userPixel && maskPixel) overlap++
  }

  if (totalUser === 0) return 0
  // Note: FillText area is very large compared to stroke width.
  // We need to adjust precision/recall expectations since we're using a font area as mask.
  const precision = totalMask > 0 ? overlap / totalMask : 0
  const recall = totalUser > 0 ? overlap / totalUser : 0
  
  if (precision + recall === 0) return 0
  
  // For tracing a solid font mask with a thin stroke, recall will be high (most user stroke is inside mask)
  // but precision will be very low (most mask is untouched).
  // We should rely primarily on recall to see if they stayed within the lines, 
  // and penalize if they just colored the whole thing in (precision too low).
  
  // Let's use an adjusted score:
  // recall * 100 is how much of their drawing was INSIDE the bounds.
  // We cap precision penalty so they don't have to fill the whole text.
  let score = recall * 100;
  if (precision < 0.05) score -= 40; // Penalty for barely touching or just a small dot
  if (score < 0) score = 0;
  
  return Math.round(score)
}

export default function WritingWordsLessonPage({
  params,
}: {
  params: Promise<{ wordId: string }>
}) {
  const [wordId, setWordId] = useState<string>('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [paths, setPaths] = useState<Point[][]>([])
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(8)
  const [showGuide, setShowGuide] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const guideCanvasRef = useRef<HTMLCanvasElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { completeLesson, isLessonCompleted, addSessionAccuracy } = useLearningStore()
  const searchParams = useSearchParams()
  const level = parseInt(searchParams.get('level') || '6', 10)

  useEffect(() => {
    params.then((p) => setWordId(p.wordId))
  }, [params])

  const wordData = HIJAIYAH_WORDS.find((w) => w.id === wordId)
  const currentIndex = HIJAIYAH_WORDS.findIndex((w) => w.id === wordId)
  const prevWord = currentIndex > 0 ? HIJAIYAH_WORDS[currentIndex - 1] : null
  const nextWord = currentIndex < HIJAIYAH_WORDS.length - 1 ? HIJAIYAH_WORDS[currentIndex + 1] : null
  const isCompleted = wordData ? isLessonCompleted(`${level}-${wordData.id}`) : false

  // Draw guide letter on guide canvas (for user to see)
  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current
    if (!canvas || !wordData) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.font = `${canvas.width * 0.35}px Amiri, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = showGuide ? 'rgba(59, 130, 246, 0.08)' : 'transparent'
    ctx.fillText(wordData.word, canvas.width / 2, canvas.height / 2)
    ctx.restore()
  }, [wordData, showGuide])

  // Draw solid mask on hidden canvas (for accuracy calc)
  const drawMask = useCallback(() => {
    const canvas = maskCanvasRef.current
    if (!canvas || !wordData) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.font = `${canvas.width * 0.35}px Amiri, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // Draw with solid black so alpha is 255
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    
    // Add some stroke to expand the tolerance area slightly
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
    ctx.lineWidth = 10
    ctx.lineJoin = 'round'
    
    ctx.fillText(wordData.word, canvas.width / 2, canvas.height / 2)
    ctx.strokeText(wordData.word, canvas.width / 2, canvas.height / 2)
    ctx.restore()
  }, [wordData])

  useEffect(() => {
    drawGuide()
    drawMask()
  }, [drawGuide, drawMask])

  // Draw user strokes on main canvas
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

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    setAccuracy(null)
    const pos = getPos(e, canvas)
    setCurrentPath([pos])
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const pos = getPos(e, canvas)
    setCurrentPath((prev) => [...prev, pos])
  }

  const stopDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    setIsDrawing(false)
    if (currentPath.length > 1) {
      setPaths((prev) => [...prev, currentPath])
    }
    setCurrentPath([])
  }

  const handleCheck = () => {
    const userCanvas = canvasRef.current
    const maskCanvas = maskCanvasRef.current
    if (!userCanvas || !maskCanvas || !wordData) return

    const score = calcAccuracy(userCanvas, maskCanvas)
    setAccuracy(score)
    addSessionAccuracy(score)

    if (score >= 60) {
      completeLesson(`${level}-${wordData.id}`, score)
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

  if (!wordData && wordId) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#64748B]">Kata tidak ditemukan</p>
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

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#1E293B]/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl text-center animate-bounce-in border border-[#334155] shadow-[#2563EB]/20">
            <div className="text-6xl mb-3">🎉</div>
            <div className="text-2xl font-extrabold text-[#3B82F6] mb-1">Presisi Tinggi!</div>
            <div className="text-[#94A3B8] font-bold">Akurasi Keluar Garis: {accuracy}%</div>
            <div className="font-arabic text-6xl text-[#10B981] mt-4">{wordData?.word}</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#CBD5E1] mb-8">
          <Link href="/learn" className="hover:text-[#10B981] transition-colors">Peta Rute</Link>
          <span>›</span>
          <span className="text-[#10B981]">Sesi Tulis: {wordData?.transliteration || '...'}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Info + navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in">
            {/* Word card */}
            <div className="bento-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-7xl font-arabic text-[#334155]/50 -rotate-12 pointer-events-none">{wordData?.word}</div>
              <div className="flex justify-center gap-2 mb-4">
                <div className="text-[10px] font-extrabold tracking-widest text-[#10B981] uppercase">Identitas Kata</div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 px-2 rounded uppercase">
                  {wordData?.category}
                </div>
              </div>
              <div className="font-arabic text-8xl text-[#10B981] mb-4 leading-none py-4">
                {wordData?.word || ''}
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">/{wordData?.transliteration}/</h1>
              <p className="text-[#94A3B8] font-bold mt-2">"{wordData?.meaning}"</p>

              {isCompleted && (
                <div className="mt-6 inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] text-[11px] uppercase tracking-wider font-extrabold px-4 py-2 rounded-full border border-[#10B981]/20">
                  <span className="text-base">✓</span> Kompetensi Tercapai
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {prevWord ? (
                <Link
                  href={`/learn/writing-words/${prevWord.id}?level=${level}`}
                  className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#1E293B] border border-[#334155] shadow-sm text-white rounded-2xl hover:border-[#10B981] transition-all text-center"
                >
                  ← {prevWord.transliteration}
                </Link>
              ) : <div className="flex-1" />}
              {nextWord ? (
                <Link
                  href={`/learn/writing-words/${nextWord.id}?level=${level}`}
                  className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#064E3B] text-white shadow-[0_4px_14px_rgba(6,78,59,0.39)] hover:scale-[1.02] rounded-2xl transition-all text-center"
                >
                  {nextWord.transliteration} →
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>

          {/* Right: Canvas area */}
          <div className="lg:col-span-3 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Tablet-like Digital Canvas */}
            <div className="bg-[#0F172A] rounded-[2rem] border border-[#334155] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              {/* Canvas toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#0B1120] gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-extrabold uppercase tracking-widest text-white">Kanvas Kata</span>
                  <div className="w-px h-4 bg-[#334155] mx-1" />
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-9 h-5 rounded-full transition-colors relative ${showGuide ? 'bg-[#10B981]' : 'bg-[#334155]'}`}
                      onClick={() => setShowGuide(!showGuide)}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showGuide ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider group-hover:text-white transition-colors">Ghost Guide</span>
                  </label>
                </div>

                {/* Brush size */}
                <div className="flex items-center gap-3 bg-[#1E293B] px-3 py-1.5 rounded-full border border-[#334155]">
                  {[4, 8, 12].map((size) => (
                    <button
                      key={size}
                      onClick={() => setStrokeWidth(size)}
                      className={`rounded-full transition-all ${strokeWidth === size ? 'bg-[#10B981] scale-110 shadow-md' : 'bg-[#475569] hover:bg-[#64748B]'}`}
                      style={{ width: size + 6, height: size + 6 }}
                      title={`Ketebalan ${size}`}
                    />
                  ))}
                </div>
              </div>

              {/* Canvas stack */}
              <div ref={containerRef} className="relative aspect-video w-full bg-[#1E293B]" style={{ maxHeight: 400 }}>
                {/* Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
                
                {/* Hidden Mask Canvas (for checking accuracy) */}
                <canvas
                  ref={maskCanvasRef}
                  width={800}
                  height={400}
                  className="hidden"
                />

                {/* Guide canvas (background) */}
                <canvas
                  ref={guideCanvasRef}
                  width={800}
                  height={400}
                  className="absolute inset-0 w-full h-full"
                />
                
                {/* Drawing canvas (foreground) */}
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />

                {/* Empty state overlay */}
                {paths.length === 0 && currentPath.length === 0 && (
                  <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none z-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white bg-[#0F172A]/90 backdrop-blur border border-[#334155] px-6 py-2 rounded-full shadow-sm">
                      Tulis dari Kanan ke Kiri
                    </p>
                  </div>
                )}
              </div>

              {/* Status Output */}
              <div className="bg-[#0B1120] border-t border-[#334155] p-4">
                {accuracy !== null ? (
                  <div className={`p-4 rounded-2xl text-[13px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${accuracy >= 70 ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : accuracy >= 50 ? 'bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/30' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                    {accuracy >= 70 ? '🎯 Sempurna!' : accuracy >= 50 ? '⚠️ Terus Berlatih!' : '🛑 Kurang Akurat.'}
                    {' — '} Akurasi Algoritmik: <span className="font-extrabold text-base ml-1">{accuracy}%</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl text-[13px] font-bold uppercase tracking-wide text-[#94A3B8] border border-dashed border-[#334155] text-center">
                    Sistem stand-by menanti hasil eksekusi tulisan Anda.
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 p-5 bg-[#0F172A]">
                <button
                  id="btn-clear-canvas"
                  onClick={handleClear}
                  className="w-1/3 py-4 text-[13px] font-bold uppercase tracking-widest bg-[#1E293B] border border-[#334155] text-[#94A3B8] rounded-2xl hover:bg-[#334155] hover:border-[#475569] hover:text-white transition-all"
                >
                  Reset
                </button>
                <button
                  id="btn-check-accuracy"
                  onClick={handleCheck}
                  disabled={paths.length === 0 && currentPath.length === 0}
                  className="w-2/3 py-4 text-sm font-bold uppercase tracking-widest bg-[#064E3B] text-white rounded-2xl hover:bg-[#10B981] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Validasi Akurasi
                </button>
              </div>
            </div>

            {/* Tip card Component */}
            <div className="bento-card p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-xl flex-shrink-0">
                  💡
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-white mb-1.5">Standar Operasional Kata</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                    Pastikan Anda menyambung huruf sesuai kaidah. Sistem AI deteksi bentuk ini akan mentolerir margin error yang lebih besar karena kata bersifat dinamis. Tetap konsentrasi pada ruang panduan huruf bayangan.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
