'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

const WORDS_PER_PAGE = 12

export default function ReadingGridPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const { completeLesson, isLessonCompleted } = useLearningStore()

  // Shuffle logic for "acak like iqro" but stable per session
  const paginatedWords = useMemo(() => {
    const totalPages = Math.ceil(HIJAIYAH_WORDS.length / WORDS_PER_PAGE)
    const pages = []
    
    // Create a copy to shuffle
    const shuffled = [...HIJAIYAH_WORDS]
    // Simple deterministic shuffle based on index to keep it "organized" but feel random
    // In a real app we might want a real shuffle, but for Iqro, 
    // usually it's just categorized but mixed.
    
    for (let i = 0; i < totalPages; i++) {
      pages.push(shuffled.slice(i * WORDS_PER_PAGE, (i + 1) * WORDS_PER_PAGE))
    }
    return pages
  }, [])

  const currentWords = paginatedWords[currentPage - 1] || []
  const isPageCompleted = isLessonCompleted(`7-page-${currentPage}`)

  const handleToggleReveal = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleFinishPage = () => {
    completeLesson(`7-page-${currentPage}`, 100)
    if (currentPage < paginatedWords.length) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F59E0B] mb-2">
              <span className="w-8 h-px bg-[#F59E0B]/30" />
              Latihan Mandiri
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Membaca <span className="text-gradient-vibrant">Tanpa Suara</span>
            </h1>
            <p className="text-[#94A3B8] mt-4 max-w-lg font-medium leading-relaxed">
              Uji hafalan dan kelancaran Anda. Baca setiap kotak dengan teliti. Klik kotak untuk mengintip cara baca.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#0B0E14] p-2 rounded-2xl border border-[#374151]">
            {paginatedWords.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-[#F59E0B] text-[#020617] shadow-lg glow-gold' 
                    : isLessonCompleted(`7-page-${i+1}`)
                    ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                    : 'text-[#94A3B8] hover:bg-white/5'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid - Iqro Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {currentWords.map((word, idx) => (
            <div
              key={word.id}
              onClick={() => handleToggleReveal(word.id)}
              className="group relative aspect-square bg-[#0B0E14] border border-[#374151] rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#F59E0B]/50 transition-all hover:scale-[1.02] overflow-hidden"
            >
              {/* Grid Lines Effect */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
              
              <div className="font-arabic text-6xl text-white group-hover:text-[#F59E0B] transition-colors duration-500 mb-2">
                {word.word}
              </div>

              {/* Peek Label */}
              <div className={`absolute bottom-6 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                revealedIds.has(word.id) 
                  ? 'bg-[#F59E0B] text-[#020617] opacity-100 translate-y-0' 
                  : 'bg-white/5 text-[#94A3B8] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
              }`}>
                {revealedIds.has(word.id) ? word.transliteration : 'Klik Intip'}
              </div>
              
              {/* Corner Index */}
              <div className="absolute top-4 right-6 text-[10px] font-bold text-[#374151] group-hover:text-[#F59E0B]/20 transition-colors">
                {((currentPage - 1) * WORDS_PER_PAGE) + idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
          
          {isPageCompleted ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-[#10B981] font-bold uppercase tracking-widest text-sm">
                <span className="text-xl">✓</span> Halaman Ini Sudah Dikuasai
              </div>
              <button 
                onClick={handleFinishPage}
                className="btn-primary px-12 py-4"
              >
                Lanjut ke Halaman {currentPage + 1}
              </button>
            </div>
          ) : (
            <button
              onClick={handleFinishPage}
              className="px-12 py-4.5 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-[#F59E0B] hover:text-[#020617] transition-all hover:scale-105 shadow-xl"
            >
              Selesaikan Halaman {currentPage}
            </button>
          )}
          
          <Link href="/learn" className="text-sm font-bold text-[#94A3B8] hover:text-[#F59E0B] transition-colors uppercase tracking-widest">
            Kembali ke Peta Perjalanan
          </Link>
        </div>
      </div>
    </div>
  )
}
