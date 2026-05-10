'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

export default function ReadingWordsClient({
  params,
}: {
  params: Promise<{ wordId: string }>
}) {
  const [wordId, setWordId] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [quizChoices, setQuizChoices] = useState<string[]>([])
  const [quizType, setQuizType] = useState<'transliteration' | 'meaning'>('transliteration')
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { completeLesson, isLessonCompleted } = useLearningStore()
  const searchParams = useSearchParams()
  const level = parseInt(searchParams.get('level') || '5', 10)

  useEffect(() => {
    params.then((p) => setWordId(p.wordId))
  }, [params])

  const wordData = HIJAIYAH_WORDS.find((w) => w.id === wordId)
  const currentIndex = HIJAIYAH_WORDS.findIndex((w) => w.id === wordId)
  const prevWord = currentIndex > 0 ? HIJAIYAH_WORDS[currentIndex - 1] : null
  const nextWord = currentIndex < HIJAIYAH_WORDS.length - 1 ? HIJAIYAH_WORDS[currentIndex + 1] : null
  const isCompleted = wordData ? isLessonCompleted(`${level}-${wordData.id}`) : false

  // Generate quiz choices
  useEffect(() => {
    if (quizMode && wordData) {
      const type = Math.random() > 0.5 ? 'transliteration' : 'meaning'
      setQuizType(type)
      
      const correctOption = type === 'transliteration' ? wordData.transliteration : wordData.meaning
      const others = HIJAIYAH_WORDS
        .filter(w => w.id !== wordData.id)
        .map(w => type === 'transliteration' ? w.transliteration : w.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      setQuizChoices([correctOption, ...others].sort(() => Math.random() - 0.5))
      setQuizAnswer(null)
    }
  }, [quizMode, wordId, wordData])

  const handlePlay = () => {
    if (!wordData) return
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    // Gunakan wordData.id langsung — sesuai nama file di Supabase Storage folder words/
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
        utterance.rate = 0.8
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        window.speechSynthesis.speak(utterance)
      } else {
        setTimeout(() => setIsPlaying(false), 1000)
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

  const handleQuizAnswer = (selected: string) => {
    if (quizAnswer) return
    setQuizAnswer(selected)
    const isCorrect = selected === (quizType === 'transliteration' ? wordData?.transliteration : wordData?.meaning)
    
    if (isCorrect) {
      setScore(s => ({ ...s, correct: s.correct + 1 }))
      if (wordData) completeLesson(`${level}-${wordData.id}`, 100)
    }
    setScore(s => ({ ...s, total: s.total + 1 }))
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
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#CBD5E1]">
            <Link href="/learn" className="hover:text-[#10B981] transition-colors">Peta Rute</Link>
            <span>›</span>
            <span className="text-[#10B981]">Membaca Kata: {wordData?.transliteration || '...'}</span>
          </div>
          
          {quizMode && (
            <div className="flex items-center gap-3 px-4 py-1.5 bg-[#1E293B] rounded-full border border-[#334155]">
              <span className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest">Skor</span>
              <span className="text-sm font-black text-[#10B981]">{score.correct}/{score.total}</span>
            </div>
          )}
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8 bg-[#1E293B] p-1 rounded-2xl w-fit border border-[#334155]">
          <button
            onClick={() => setQuizMode(false)}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!quizMode ? 'bg-[#10B981] text-white shadow-lg' : 'text-[#94A3B8] hover:bg-white/5'}`}
          >
            📖 Belajar
          </button>
          <button
            onClick={() => setQuizMode(true)}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${quizMode ? 'bg-[#10B981] text-white shadow-lg' : 'text-[#94A3B8] hover:bg-white/5'}`}
          >
            🎯 Kuis
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8 animate-fade-in">
            <div className="relative group cursor-pointer" onClick={handlePlay}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="bg-[#0F172A] rounded-[3rem] border border-[#334155] p-12 text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="text-left">
                    <div className="flex gap-2 mb-1">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981]">Kosa Kata</div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 px-2 rounded">{wordData?.category}</div>
                    </div>
                    {!quizMode && <div className="text-white font-bold text-lg">{wordData?.transliteration}</div>}
                  </div>
                  <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-[#10B981] text-white scale-110 shadow-[#10B981]/50' : 'bg-[#1E293B] text-[#10B981] border border-[#334155] hover:border-[#10B981] hover:scale-105'}`}>
                    {isPlaying ? (
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                </div>
                <div className="relative z-10 py-8">
                  <div className="font-arabic text-center leading-tight mb-8 text-white transition-all duration-500 hover:scale-105 hover:text-[#10B981]" style={{ fontSize: '9rem' }}>{wordData?.word}</div>
                </div>
                
                <div className="mt-8 border-t border-[#334155] pt-8 relative z-10">
                  {!quizMode ? (
                    !revealed ? (
                      <button onClick={(e) => { e.stopPropagation(); handleReveal() }} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 hover:bg-[#10B981] hover:text-white transition-all group">Buka Cara Baca & Arti <span className="group-hover:translate-y-1 transition-transform">↓</span></button>
                    ) : (
                      <div className="animate-fade-in space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#1E293B]/50 p-4 rounded-2xl border border-[#334155] text-left">
                            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-1">Cara Membaca</div>
                            <div className="text-2xl font-extrabold text-white tracking-tight text-[#10B981]">/{wordData?.transliteration}/</div>
                          </div>
                          <div className="bg-[#1E293B]/50 p-4 rounded-2xl border border-[#334155] text-left">
                            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-1">Arti Kata</div>
                            <div className="text-lg font-bold text-white">{wordData?.meaning}</div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="space-y-6">
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] mb-4">
                        PILIH {quizType === 'transliteration' ? 'CARA BACA' : 'ARTI'} YANG TEPAT
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quizChoices.map((choice) => {
                          const isCorrect = choice === (quizType === 'transliteration' ? wordData?.transliteration : wordData?.meaning)
                          return (
                            <button
                              key={choice}
                              onClick={(e) => { e.stopPropagation(); handleQuizAnswer(choice) }}
                              disabled={quizAnswer !== null}
                              className={`py-4 px-6 rounded-2xl text-sm font-bold transition-all border-2 ${
                                quizAnswer === null
                                  ? 'bg-[#1E293B] border-[#334155] text-white hover:border-[#10B981] hover:shadow-lg'
                                  : isCorrect
                                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                                  : quizAnswer === choice
                                  ? 'bg-red-500/20 border-red-500 text-red-500'
                                  : 'bg-[#1E293B] border-[#334155] text-white/30 opacity-50'
                              }`}
                            >
                              {choice}
                            </button>
                          )
                        })}
                      </div>
                      {quizAnswer && (
                        <div className={`text-sm font-bold uppercase tracking-widest animate-fade-in ${quizAnswer === (quizType === 'transliteration' ? wordData?.transliteration : wordData?.meaning) ? 'text-[#10B981]' : 'text-red-500'}`}>
                          {quizAnswer === (quizType === 'transliteration' ? wordData?.transliteration : wordData?.meaning) ? '✨ JAWABAN TEPAT!' : '❌ KURANG TEPAT'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bento-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-7xl font-arabic text-[#334155]/50 -rotate-12 pointer-events-none">{wordData?.word}</div>
              <div className="text-[10px] font-extrabold tracking-widest text-[#10B981] mb-4 uppercase">Status Pembelajaran</div>
              {isCompleted ? (
                 <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center text-3xl text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)]">✓</div>
                  <div className="text-[#10B981] text-sm uppercase tracking-wider font-extrabold">Kompetensi Tercapai</div>
                </div>
              ) : (
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-[#F59E0B]/20 rounded-full flex items-center justify-center text-3xl text-[#FCD34D]">⏳</div>
                  <div className="text-[#FCD34D] text-sm uppercase tracking-wider font-extrabold">Menunggu Eksekusi</div>
                  <p className="text-xs text-[#94A3B8] mt-2">Buka cara baca dan dengarkan audionya untuk menyelesaikan modul.</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-auto">
              {prevWord ? (
                <Link href={`/learn/reading-words/${prevWord.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] rounded-2xl hover:border-[#10B981] transition-all text-center">← {prevWord.transliteration}</Link>
              ) : <div className="flex-1" />}
              {nextWord ? (
                 <Link href={`/learn/reading-words/${nextWord.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#10B981] text-white shadow-[0_4px_14px_rgba(16,185,129,0.39)] hover:scale-[1.02] rounded-2xl transition-all text-center">{nextWord.transliteration} →</Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
