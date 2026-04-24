'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

export default function FormsClient({
  params,
}: {
  params: Promise<{ letterId: string }>
}) {
  const [letterId, setLetterId] = useState<string>('')
  const [activeForm, setActiveForm] = useState(0) // 0: tunggal, 1: awal, 2: tengah, 3: akhir
  const [isFlipped, setIsFlipped] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const { completeLesson, isLessonCompleted } = useLearningStore()
  const searchParams = useSearchParams()
  const level = parseInt(searchParams.get('level') || '3', 10)

  useEffect(() => {
    params.then((p) => setLetterId(p.letterId))
  }, [params])

  const letter = HIJAIYAH_LETTERS.find((l) => l.id === letterId)
  const currentIndex = HIJAIYAH_LETTERS.findIndex((l) => l.id === letterId)
  const prevLetter = currentIndex > 0 ? HIJAIYAH_LETTERS[currentIndex - 1] : null
  const nextLetter = currentIndex < HIJAIYAH_LETTERS.length - 1 ? HIJAIYAH_LETTERS[currentIndex + 1] : null
  const isCompleted = letter ? isLessonCompleted(`${level}-${letter.id}`) : false

  const formOptions = [
    { id: 'isolated', name: 'Tunggal', char: letter?.isolated },
    { id: 'initial', name: 'Awal', char: letter?.initial },
    { id: 'medial', name: 'Tengah', char: letter?.medial },
    { id: 'final', name: 'Akhir', char: letter?.final },
  ]

  const currentForm = formOptions[activeForm] || formOptions[0]

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleReveal = () => {
    if (letter) {
      completeLesson(`${level}-${letter.id}`, 100)
    }
  }

  const handleQuizAnswer = (selected: string) => {
    if (quizAnswer !== null) return
    setQuizAnswer(selected)
    const isCorrect = selected === currentForm.name
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  const quizChoices = ['Tunggal', 'Awal', 'Tengah', 'Akhir'].sort(() => Math.random() - 0.5)

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

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#94A3B8] mb-8">
          <Link href="/learn" className="hover:text-[#F59E0B] transition-colors">Peta Rute</Link>
          <span>›</span>
          <span className="text-[#F59E0B]">Transformasi: {letter?.name || '...'}</span>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-4 mb-8 bg-[#0F172A] p-2 rounded-[2rem] border border-[#334155] shadow-[0_4px_20px_rgba(0,0,0,0.5)] w-fit mx-auto lg:mx-0">
          <button
            onClick={() => setQuizMode(false)}
            className={`px-8 py-3.5 rounded-full text-[15px] font-bold transition-all ${!quizMode ? 'bg-[#3B82F6] text-white shadow-md' : 'text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            📖 Mode Hafalan
          </button>
          <button
            onClick={() => { setQuizMode(true); setQuizAnswer(null) }}
            className={`px-8 py-3.5 rounded-full text-[15px] font-bold transition-all ${quizMode ? 'bg-[#F59E0B] text-white shadow-[0_4px_15px_rgba(245,158,11,0.4)]' : 'text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            🎯 Mode Tebak Bentuk
          </button>
          
          {quizMode && (
            <div className="hidden md:flex ml-4 items-center gap-3 px-6 border-l border-[#334155]">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8]">Skor</span>
              <span className="text-xl font-extrabold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-xl">{score.correct}/{score.total}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Main Interaction Area */}
          <div className="lg:col-span-3 flex flex-col gap-8 animate-fade-in">
            {/* Form selector */}
            <div className={`grid gap-3 bento-card p-4 grid-cols-4`}>
              {formOptions.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => { setActiveForm(i); setIsFlipped(false); setQuizAnswer(null) }}
                  className={`flex flex-col items-center py-4 rounded-2xl transition-all border ${activeForm === i ? 'bg-[#F59E0B] border-[#F59E0B] text-[#0B1120] shadow-lg shadow-[#F59E0B]/30 scale-[1.02]' : 'bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:border-[#F59E0B] hover:bg-[#0F172A]'}`}
                >
                  <div className={`font-arabic text-4xl leading-none mb-3 ${activeForm === i ? 'text-[#0B1120]' : 'text-white'}`}>{f.char}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-center">{f.name}</div>
                </button>
              ))}
            </div>

            {/* Main Flashcard Container */}
            {!quizMode ? (
              <div
                className="relative cursor-pointer group"
                style={{ perspective: 2000 }}
                onClick={handleCardClick}
              >
                <div
                  className="relative transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card Front */}
                  <div
                    className="bg-[#0F172A] rounded-[3rem] border border-[#334155] p-12 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)] transition-shadow min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#2563EB] via-[#F59E0B] to-[#2563EB]" />
                    <div className="text-[11px] font-extrabold tracking-[0.2em] text-[#F59E0B] mb-8 bg-[#F59E0B]/10 px-4 py-1.5 rounded-full">
                      KLIK UNTUK MELIHAT POSISI
                    </div>
                    <div className="font-arabic text-center leading-none mb-8 text-[#3B82F6]" style={{ fontSize: '10rem' }}>
                      {currentForm?.char}
                    </div>
                  </div>

                  {/* Card Back */}
                  <div
                    className="absolute inset-0 bg-[#1E293B] rounded-[3rem] p-12 text-center text-white flex flex-col items-center justify-center shadow-2xl border border-[#334155]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="absolute top-0 right-0 p-8 text-[12rem] font-arabic opacity-5 pointer-events-none -rotate-12 leading-none">
                      {currentForm?.char}
                    </div>
                    <div className="font-arabic text-8xl mb-8 relative z-10 text-[#F59E0B]">{currentForm?.char}</div>
                    <div className="text-4xl font-extrabold text-[#3B82F6] mb-4 tracking-tighter bg-[#0B1120]/50 px-8 py-3 rounded-2xl backdrop-blur-md border border-[#334155]">Bentuk {currentForm?.name}</div>
                    <div className="text-[#94A3B8] text-lg mb-8 font-medium tracking-wide">Huruf {letter?.name}</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Quiz Mode UI */
              <div className="bg-[#0F172A] rounded-[3rem] border border-[#334155] p-12 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] min-h-[400px] flex flex-col justify-center">
                <div className="text-[11px] font-extrabold tracking-[0.2em] text-[#F59E0B] mb-8">UJI PENGETAHUAN: APA NAMA POSISI INI?</div>
                <div className="font-arabic text-center leading-none mb-12 text-[#3B82F6]" style={{ fontSize: '9rem' }}>
                  {currentForm?.char}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {quizChoices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleQuizAnswer(choice)}
                      disabled={quizAnswer !== null}
                      className={`py-5 px-6 rounded-2xl text-[15px] font-bold uppercase tracking-wider transition-all border-2 ${
                        quizAnswer === null
                          ? 'border-[#334155] bg-[#1E293B] text-white hover:border-[#F59E0B] hover:shadow-[0_8px_20px_rgba(245,158,11,0.1)]'
                          : choice === currentForm.name
                          ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981] scale-105 shadow-lg'
                          : quizAnswer === choice
                          ? 'border-red-500 bg-red-500/10 text-red-400'
                          : 'border-[#334155] bg-[#0B1120] text-[#475569] opacity-50'
                      }`}
                    >
                      Bentuk {choice}
                    </button>
                  ))}
                </div>
                {quizAnswer && (
                  <div className={`mt-8 p-5 rounded-2xl text-[15px] font-bold uppercase tracking-widest border border-dashed ${quizAnswer === currentForm.name ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                    {quizAnswer === currentForm.name ? '🎯 Jawaban Presisi! ' : `🛑 Salah. Seharusnya: Bentuk ${currentForm.name}. `}
                    <button onClick={() => {
                        setQuizAnswer(null);
                        setActiveForm((activeForm + 1) % 4);
                    }} className="underline decoration-2 underline-offset-4 ml-2">Lanjut Uji</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Info & Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Letter identity card */}
            <div className="bento-card p-8 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]" />
              <div className="text-[10px] font-extrabold tracking-widest text-[#F59E0B] mb-4 uppercase">Identitas Huruf</div>
              <div className="font-arabic text-8xl text-white mb-4 py-2">{letter?.isolated}</div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{letter?.name}</h1>
              <p className="text-[#94A3B8] font-bold mt-1 uppercase tracking-widest">/{letter?.transliteration}/</p>
              {isCompleted && (
                 <div className="mt-5 inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-[11px] uppercase tracking-wider font-extrabold px-4 py-2 rounded-full border border-[#10B981]/30">
                  <span className="text-base">✓</span> Kompetensi Tercapai
                </div>
              )}
              
              {!quizMode && !isCompleted && (
                 <button
                 id="btn-mark-complete"
                 onClick={handleReveal}
                 className="w-full mt-8 py-3.5 text-sm font-bold uppercase tracking-widest bg-[#1E293B] border-2 border-[#10B981] text-[#10B981] rounded-2xl hover:bg-[#10B981] hover:text-white transition-all shadow-sm"
               >
                 Tandai Dikuasai
               </button>
              )}
            </div>

            {/* Pagination */}
            <div className="flex gap-3 mt-auto">
              {prevLetter ? (
                <Link href={`/learn/forms/${prevLetter.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#1E293B] border border-[#334155] shadow-sm text-white rounded-2xl hover:border-[#F59E0B] transition-all text-center">
                  ← {prevLetter.name}
                </Link>
              ) : <div className="flex-1" />}
              {nextLetter ? (
                 <Link href={`/learn/forms/${nextLetter.id}?level=${level}`} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.39)] hover:scale-[1.02] rounded-2xl transition-all text-center">
                  {nextLetter.name} →
                </Link>
              ) : <div className="flex-1" />}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}
