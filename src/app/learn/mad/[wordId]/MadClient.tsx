'use client'

import { use, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

export default function MadClient({
  params,
}: {
  params: Promise<{ wordId: string }>
}) {
  const { wordId } = use(params)
  const [isPlaying, setIsPlaying] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { completeLesson, isLessonCompleted } = useLearningStore()
  const searchParams = useSearchParams()
  const level = 4

  const madWords = HIJAIYAH_WORDS.filter(
    (w) => w.category === 'Mad Ashli' || w.category === 'Mad Far\'i'
  )
  
  const wordData = madWords.find((w) => w.id === wordId)
  const currentIndex = madWords.findIndex((w) => w.id === wordId)
  const prevWord = currentIndex > 0 ? madWords[currentIndex - 1] : null
  const nextWord = currentIndex < madWords.length - 1 ? madWords[currentIndex + 1] : null
  const isCompleted = wordData ? isLessonCompleted(`${level}-${wordData.id}`) : false

  // Determine harakat length for visualization
  const isMadFari = wordData?.category === 'Mad Far\'i'
  const harakatLength = isMadFari ? 6 : 2 // 2 for Ashli, 4-6 for Far'i

  const handlePlay = () => {
    if (!wordData) return
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    const audioUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/quran-audio/words/${wordData.id}.mp3`
    const audio = new Audio(audioUrl)
    audioRef.current = audio
    audio.play().then(() => {
      audio.onended = () => setIsPlaying(false)
    }).catch((e) => {
      console.log(`Audio tidak ditemukan untuk ${wordData.transliteration}, menggunakan TTS.`, e)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utteranceText = wordData.word || wordData.transliteration
        const utterance = new SpeechSynthesisUtterance(utteranceText)
        utterance.lang = 'ar-SA'
        utterance.rate = 0.6 // Slower for Mad
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        window.speechSynthesis.speak(utterance)
      } else {
        setTimeout(() => setIsPlaying(false), 2000)
      }
    })
  }

  const handleReveal = () => {
    setRevealed(true)
    handlePlay()
    if (wordData) {
      completeLesson(`${level}-${wordData.id}`, 100)
    }
  }

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer)
    if (answer === wordData?.category) {
      if (wordData) completeLesson(`${level}-${wordData.id}`, 100)
    }
  }

  if (!wordData && wordId) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#64748B]">Materi tidak ditemukan</p>
          <Link href="/learn" className="btn-primary px-6 py-2 mt-4 inline-block text-sm">
            Kembali ke Peta
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#CBD5E1] mb-8">
          <Link href="/learn" className="hover:text-[#D97706] transition-colors">Peta Rute</Link>
          <span>›</span>
          <span className="text-[#D97706]">Level 4: Hukum Mad</span>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8 bg-[#1E293B] p-1.5 rounded-2xl w-fit border border-[#334155]">
          <button
            onClick={() => setQuizMode(false)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${!quizMode ? 'bg-[#D97706] text-white shadow-lg' : 'text-[#94A3B8] hover:bg-white/5'}`}
          >
            📖 Mode Belajar
          </button>
          <button
            onClick={() => { setQuizMode(true); setQuizAnswer(null) }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${quizMode ? 'bg-[#D97706] text-white shadow-lg' : 'text-[#94A3B8] hover:bg-white/5'}`}
          >
            🎯 Mode Kuis
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 flex flex-col gap-8 animate-fade-in">
            <div className="bg-[#0F172A] rounded-[3rem] border border-[#334155] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="text-left">
                  <div className="flex gap-2 mb-2">
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-lg border border-[#D97706]/20">
                      {wordData?.category}
                    </div>
                  </div>
                  <h2 className="text-white font-extrabold text-2xl tracking-tight">
                    {quizMode ? 'Tentukan Jenis Mad' : wordData?.transliteration}
                  </h2>
                </div>

                <button 
                  onClick={handlePlay}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isPlaying ? 'bg-[#D97706] text-white scale-110 shadow-[#D97706]/40' : 'bg-[#1E293B] text-[#D97706] border border-[#334155] hover:border-[#D97706] hover:scale-105'}`}
                >
                  {isPlaying ? (
                    <div className="flex gap-1.5 items-end h-6">
                      <div className="w-1.5 bg-white rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '60%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[bounce_1s_infinite]" style={{ height: '100%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[bounce_1.2s_infinite]" style={{ height: '80%' }} />
                    </div>
                  ) : (
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              </div>

              {/* Visualizer Mad */}
              <div className="mb-12 relative z-10 flex flex-col items-center">
                <div className="font-arabic text-center leading-none mb-10 text-white selection:bg-[#D97706]/30" style={{ fontSize: '10rem' }}>
                  {wordData?.word}
                </div>
                
                <div className="w-full max-w-md bg-[#1E293B] h-4 rounded-full overflow-hidden p-1 border border-[#334155]">
                  <div 
                    className={`h-full rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(217,119,6,0.5)] ${isPlaying ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B]' : 'bg-[#334155]'}`}
                    style={{ width: isPlaying ? '100%' : '0%' }}
                  />
                </div>
                <div className="mt-3 flex justify-between w-full max-w-md px-1">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Durasi Baca</span>
                  <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest">{harakatLength} Harakat</span>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-10 pt-10 border-t border-[#334155] relative z-10">
                {!quizMode ? (
                  !revealed ? (
                    <button 
                      onClick={handleReveal}
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-[0.2em] text-[#D97706] bg-[#D97706]/10 border border-[#D97706]/30 hover:bg-[#D97706] hover:text-white transition-all shadow-lg hover:shadow-[#D97706]/20"
                    >
                      Buka Kunci Materi ↓
                    </button>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
                      <div className="bg-[#1E293B]/50 p-6 rounded-2xl border border-[#334155] text-left">
                        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2">Transliterasi</div>
                        <div className="text-3xl font-black text-white tracking-tight">/{wordData?.transliteration}/</div>
                      </div>
                      <div className="bg-[#1E293B]/50 p-6 rounded-2xl border border-[#334155] text-left">
                        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2">Makna Kata</div>
                        <div className="text-xl font-bold text-white/90">{wordData?.meaning}</div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    <div className="text-sm font-bold text-[#94A3B8] mb-6 uppercase tracking-[0.15em]">Pilih Kategori Mad Yang Tepat:</div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Mad Ashli', 'Mad Far\'i'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleQuizAnswer(type)}
                          disabled={quizAnswer !== null}
                          className={`py-5 px-6 rounded-2xl font-black uppercase tracking-widest transition-all border-2 text-sm ${
                            quizAnswer === null 
                              ? 'bg-[#1E293B] border-[#334155] text-white hover:border-[#D97706] hover:shadow-lg'
                              : type === wordData?.category
                              ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                              : quizAnswer === type
                              ? 'bg-red-500/20 border-red-500 text-red-500'
                              : 'bg-[#1E293B] border-[#334155] text-white/30 opacity-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {quizAnswer && (
                      <div className={`mt-6 p-4 rounded-xl font-bold text-sm uppercase tracking-widest animate-fade-in ${quizAnswer === wordData?.category ? 'text-[#10B981]' : 'text-red-500'}`}>
                        {quizAnswer === wordData?.category ? '✨ Luar Biasa! Pemahaman Anda Tepat.' : `❌ Kurang Tepat. Ini adalah ${wordData?.category}.`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bento-card p-8 bg-[#0F172A] border-[#334155] relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D97706]/10 rounded-full blur-3xl group-hover:bg-[#D97706]/20 transition-all" />
              <div className="text-[10px] font-extrabold tracking-[0.2em] text-[#D97706] mb-6 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
                Catatan Tajwid
              </div>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D97706]/20 flex items-center justify-center text-2xl">📏</div>
                  <div>
                    <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wider">Durasi Suara</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {harakatLength} Harakat ({harakatLength / 2} Alif). Suara dipanjangkan secara konsisten.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D97706]/20 flex items-center justify-center text-2xl">🖋️</div>
                  <div>
                    <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wider">Tanda Baca</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {isMadFari ? 'Memiliki tanda bendera (~) di atas huruf mad.' : 'Bertemu dengan Alif, Waw mati, atau Ya mati.'}
                    </p>
                  </div>
                </div>
              </div>

              {isCompleted && (
                <div className="mt-10 p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-2xl flex items-center gap-4 animate-fade-in">
                  <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white text-xl shadow-lg">✓</div>
                  <div className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.15em]">Materi Dikuasai</div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-auto">
              {prevWord ? (
                <Link href={`/learn/mad/${prevWord.id}`} className="flex-1 py-5 text-xs font-black uppercase tracking-widest bg-[#1E293B] border border-[#334155] text-white rounded-2xl hover:border-[#D97706] transition-all text-center hover:shadow-xl">
                  ← PREV
                </Link>
              ) : <div className="flex-1" />}
              {nextWord ? (
                <Link href={`/learn/mad/${nextWord.id}`} className="flex-1 py-5 text-xs font-black uppercase tracking-widest bg-[#D97706] text-white shadow-[0_10px_20px_rgba(217,119,6,0.3)] hover:scale-[1.03] rounded-2xl transition-all text-center">
                  NEXT →
                </Link>
              ) : (
                <Link href="/learn" className="flex-1 py-5 text-xs font-black uppercase tracking-widest bg-[#10B981] text-white shadow-lg rounded-2xl text-center">
                  SELESAI
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
