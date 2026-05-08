'use client'

import { useRef, useState, useEffect } from 'react'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import Navbar from '@/components/Navbar'

interface Point {
  x: number
  y: number
}

export default function AdminPathEditor() {
  const [selectedLetter, setSelectedLetter] = useState(HIJAIYAH_LETTERS[0].id)
  const [activeForm, setActiveForm] = useState<'isolated' | 'initial' | 'medial' | 'final'>('initial')
  const [strokeWidth, setStrokeWidth] = useState(12)
  const [paths, setPaths] = useState<Point[][]>([])
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [generatedSvg, setGeneratedSvg] = useState<string>('')
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const letter = HIJAIYAH_LETTERS.find((l) => l.id === selectedLetter)

  // Redraw canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw reference character in background
    if (letter) {
      ctx.save()
      ctx.font = `${canvas.width * 0.6}px Amiri, serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)'
      ctx.fillText(letter.positionForms[activeForm]?.char || '', canvas.width / 2, canvas.height / 2)
      ctx.restore()
    }

    // Draw user strokes
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
      ctx.strokeStyle = '#F59E0B' // Orange for guide
      ctx.lineWidth = strokeWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    })
  }, [paths, currentPath, strokeWidth, letter, activeForm])

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
    const pos = getPos(e, canvas)
    setCurrentPath([pos])
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (currentPath.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const pos = getPos(e, canvas)
    setCurrentPath((prev) => {
      const last = prev[prev.length - 1]
      const dist = Math.hypot(last.x - pos.x, last.y - pos.y)
      // smoothing by ignoring very close points
      if (dist < 3) return prev
      return [...prev, pos]
    })
  }

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (canvas) canvas.releasePointerCapture(e.pointerId)
    if (currentPath.length > 1) {
      setPaths((prev) => [...prev, currentPath])
    }
    setCurrentPath([])
  }

  const handleClear = () => {
    setPaths([])
    setCurrentPath([])
    setGeneratedSvg('')
  }

  const handleGenerate = () => {
    if (paths.length === 0) return
    
    // Scale coords to match the standard 200x200 guide paths if possible
    const targetSize = 200
    const canvasSize = 500
    const scale = targetSize / canvasSize
    
    let svgPath = ''
    
    paths.forEach((path) => {
      if (path.length < 2) return
      
      const startX = Math.round(path[0].x * scale)
      const startY = Math.round(path[0].y * scale)
      svgPath += `M ${startX} ${startY} `
      
      // simplify path (roughly take every Nth point to make SVG shorter but still curvy)
      // simple approach: just use Q curves
      for (let i = 1; i < path.length; i += 3) {
        if (i + 1 < path.length) {
          const ctrlX = Math.round(path[i].x * scale)
          const ctrlY = Math.round(path[i].y * scale)
          const endX = Math.round(path[i+1].x * scale)
          const endY = Math.round(path[i+1].y * scale)
          svgPath += `Q ${ctrlX} ${ctrlY} ${endX} ${endY} `
        } else {
          const endX = Math.round(path[i].x * scale)
          const endY = Math.round(path[i].y * scale)
          svgPath += `L ${endX} ${endY} `
        }
      }
    })
    
    setGeneratedSvg(svgPath.trim())
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-8 border-b border-[#334155] pb-4">
          <h1 className="text-3xl font-extrabold text-[#F59E0B]">Admin: SVG Guide Path Editor</h1>
          <p className="text-[#94A3B8] mt-2">Gambar bayangan untuk posisi sambung, lalu klik Generate untuk mendapatkan kode path SVG-nya.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="bento-card p-6">
               <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Pilih Huruf</label>
               <select 
                 className="w-full bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-white"
                 value={selectedLetter}
                 onChange={(e) => { setSelectedLetter(e.target.value); handleClear(); }}
               >
                 {HIJAIYAH_LETTERS.map(l => (
                   <option key={l.id} value={l.id}>{l.name} ({l.letter})</option>
                 ))}
               </select>

               <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2 mt-4 block">Posisi</label>
               <div className="grid grid-cols-4 gap-2">
                 {['isolated', 'initial', 'medial', 'final'].map(form => (
                   <button
                     key={form}
                     onClick={() => { setActiveForm(form as any); handleClear(); }}
                     className={`py-2 text-sm rounded-xl border transition-all ${activeForm === form ? 'bg-[#3B82F6] border-[#3B82F6]' : 'bg-[#1E293B] border-[#334155]'}`}
                   >
                     {form === 'isolated' ? 'Tunggal' : form === 'initial' ? 'Awal' : form === 'medial' ? 'Tengah' : 'Akhir'}
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-[#0F172A] border border-[#334155] rounded-[2rem] overflow-hidden shadow-xl">
               <div className="relative aspect-square w-full bg-[#1E293B]" style={{ maxHeight: 500 }}>
                 <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
                 <canvas 
                   ref={canvasRef} 
                   width={500} height={500} 
                   className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10" 
                   onPointerDown={startDrawing} 
                   onPointerMove={draw} 
                   onPointerUp={stopDrawing} 
                   onPointerCancel={stopDrawing} 
                   onPointerOut={stopDrawing} 
                 />
               </div>
               
               <div className="p-4 border-t border-[#334155] flex gap-3">
                 <button onClick={handleClear} className="flex-1 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-sm font-bold uppercase hover:bg-[#334155]">Clear</button>
                 <button onClick={handleGenerate} className="flex-1 py-3 bg-[#F59E0B] text-[#0B1120] rounded-xl text-sm font-extrabold uppercase shadow-md hover:bg-[#D97706]">Generate Path</button>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bento-card p-6 h-full flex flex-col">
              <h3 className="text-sm font-extrabold text-white mb-4 uppercase tracking-widest border-b border-[#334155] pb-2">Output Data</h3>
              
              <div className="bg-[#0B1120] border border-[#334155] rounded-xl p-4 flex-1 font-mono text-sm text-[#3B82F6] break-all whitespace-pre-wrap select-all">
                {generatedSvg ? (
                  `guidePath: '${generatedSvg}',\nstrokeCount: ${paths.length}`
                ) : (
                  <span className="text-[#475569]">Output path akan muncul di sini...</span>
                )}
              </div>
              
              {generatedSvg && (
                <button 
                  onClick={() => navigator.clipboard.writeText(`guidePath: '${generatedSvg}',\nstrokeCount: ${paths.length}`)}
                  className="mt-4 w-full py-3 bg-[#10B981] text-white rounded-xl font-bold uppercase text-sm"
                >
                  Copy to Clipboard
                </button>
              )}

              <div className="mt-8 text-xs text-[#94A3B8] leading-relaxed">
                <p className="font-bold text-white mb-1">Cara Menggunakan:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Goreskan bayangan huruf yang ideal di kanvas kiri (usahakan presisi).</li>
                  <li>Klik Generate Path.</li>
                  <li>Copy hasilnya.</li>
                  <li>Buka \`src/lib/hijaiyah-data.ts\` dan paste/update pada property yang sesuai.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
