'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IQRO_DATA } from '@/lib/iqro-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

export default function IqroModePage() {
  const [currentJilidIndex, setCurrentJilidIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [showTransliteration, setShowTransliteration] = useState(false)
  const { completeLesson } = useLearningStore()


  const currentJilid = IQRO_DATA[currentJilidIndex]
  const currentPage = currentJilid.pages[currentPageIndex]

  // Progress tracking
  useEffect(() => {
    const saved = localStorage.getItem('quran-flow-iqro-v2-progress')
    if (saved) {
      const { jilid, page } = JSON.parse(saved)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentJilidIndex(jilid)
      setCurrentPageIndex(page)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('quran-flow-iqro-v2-progress', JSON.stringify({
      jilid: currentJilidIndex,
      page: currentPageIndex
    }))
  }, [currentJilidIndex, currentPageIndex])



  const handleNext = () => {
    completeLesson(`iqro-p-${currentPage.id}`, 100)
    setShowTransliteration(false)

    if (currentPageIndex < currentJilid.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1)
    } else if (currentJilidIndex < IQRO_DATA.length - 1) {
      setCurrentJilidIndex(prev => prev + 1)
      setCurrentPageIndex(0)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setShowTransliteration(false)
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1)
    } else if (currentJilidIndex > 0) {
      setCurrentJilidIndex(prev => prev - 1)
      setCurrentPageIndex(IQRO_DATA[currentJilidIndex - 1].pages.length - 1)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#F59E0B] mb-3">
             {currentJilid.title} • {currentPage.title}
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Metode <span className="text-gradient-vibrant">Iqro Digital</span>
          </h1>
          <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl px-6 py-3 inline-block">
             <p className="text-[#F59E0B] text-sm font-bold italic">
               &quot;{currentPage.instruction}&quot;
             </p>
          </div>
        </div>

        {/* The Page - Iqro Book Style */}
        <div className="relative group mb-12 animate-fade-in">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F59E0B] to-[#78350F] rounded-[3rem] blur opacity-10" />
          <div className="relative bg-[#0B0E14] border border-[#374151] rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12">
            
            {/* Visual Header Decoration */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#374151]/50">
               <div className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Digital Jilid {currentJilid.id}</div>
               <div className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest">{currentPage.title}</div>
            </div>

            {/* Rows of Words */}
            <div className="flex flex-col gap-0">
               {currentPage.rows.map((row, rowIdx) => (
                 <div key={rowIdx} className={`flex justify-around items-center py-10 border-b border-[#374151]/30 last:border-0 ${rowIdx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    {row.map((word, wordIdx) => (
                      <div key={wordIdx} className="text-center group/word">
                         <div className="font-arabic text-6xl md:text-7xl text-white mb-4 transition-all group-hover/word:text-[#F59E0B] group-hover/word:scale-110">
                           {word.content}
                         </div>
                         {showTransliteration && (
                            <div className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-widest animate-fade-in mb-2">
                               {word.transliteration}
                            </div>
                         )}

                      </div>
                    ))}
                 </div>
               ))}
            </div>

            {/* Visual Footer Decoration */}
            <div className="mt-8 pt-6 border-t border-[#374151]/50 text-center">
               <button 
                 onClick={() => setShowTransliteration(!showTransliteration)}
                 className="text-[10px] font-extrabold text-[#94A3B8] hover:text-[#F59E0B] transition-colors uppercase tracking-[0.2em]"
               >
                 {showTransliteration ? '[ Sembunyikan Cara Baca ]' : '[ Tampilkan Cara Baca ]'}
               </button>
            </div>
          </div>
        </div>

        {/* Practice Lines Section */}
        {currentPage.practiceLines && currentPage.practiceLines.length > 0 && (
          <div className="relative mb-12 animate-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#065F46] to-[#064E3B] rounded-[2.5rem] blur opacity-10" />
            <div className="relative bg-[#0B0E14] border border-[#374151] rounded-[2.5rem] shadow-xl overflow-hidden">
              {/* Section Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-[#374151]/60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-emerald-400">
                    Baris Latihan — {currentJilid.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">
                  {currentPage.practiceLines.length} Baris
                </span>
              </div>

              {/* Practice Rows */}
              <div className="divide-y divide-[#374151]/30">
                {currentPage.practiceLines.map((line, lineIdx) => (
                  <div
                    key={lineIdx}
                    className="group/line flex items-center gap-4 px-8 py-5 hover:bg-white/[0.025] transition-colors"
                  >
                    {/* Row Number */}
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                      <span className="text-[10px] font-extrabold text-[#F59E0B]">{lineIdx + 1}</span>
                    </div>

                    {/* Arabic Text */}
                    <div className="flex-1 text-right">
                      <p className="font-arabic text-3xl md:text-4xl text-white leading-loose tracking-wide group-hover/line:text-[#F59E0B] transition-colors">
                        {line.arabic}
                      </p>
                      {showTransliteration && (
                        <p className="text-[11px] font-bold text-[#94A3B8] mt-1 tracking-widest animate-fade-in">
                          {line.transliteration}
                        </p>
                      )}
                    </div>

                    {/* Finger pointer on hover */}
                    <div className="flex-shrink-0 opacity-0 group-hover/line:opacity-100 transition-opacity text-lg">
                      👈
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-8 py-4 border-t border-[#374151]/40 bg-white/[0.01]">
                <p className="text-[10px] text-[#374151] font-bold uppercase tracking-[0.2em] text-center">
                  Baca dari kanan ke kiri • Ulangi hingga lancar
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 animate-fade-in">
           <div className="flex items-center gap-6">
              <button 
                onClick={handlePrev}
                disabled={currentJilidIndex === 0 && currentPageIndex === 0}
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
              </button>

              <button 
                onClick={handleNext}
                className="group relative px-20 py-6 rounded-2xl bg-[#F59E0B] text-[#020617] font-extrabold text-xl overflow-hidden hover:scale-105 transition-all shadow-xl shadow-orange-900/20 active:scale-95"
              >
                 <span className="relative z-10 flex items-center gap-3">
                   HALAMAN SELANJUTNYA <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7M5 12h16"/></svg>
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
           </div>

           {/* Jilid Quick Access */}
           <div className="flex gap-2 flex-wrap justify-center mt-4">
              {IQRO_DATA.map((j, i) => (
                <button
                  key={j.id}
                  onClick={() => { setCurrentJilidIndex(i); setCurrentPageIndex(0); setShowTransliteration(false) }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                    currentJilidIndex === i 
                      ? 'bg-[#F59E0B] border-[#F59E0B] text-[#020617] shadow-lg' 
                      : 'bg-white/5 border-white/10 text-[#94A3B8] hover:border-white/20'
                  }`}
                >
                  Jilid {j.id}
                </button>
              ))}
           </div>

           <Link href="/learn" className="text-xs font-bold text-[#374151] hover:text-[#F59E0B] transition-colors uppercase tracking-widest mt-8">
              Kembali ke Peta Perjalanan
           </Link>
        </div>
      </div>
    </div>
  )
}
