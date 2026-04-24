'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

function speakArabic(text: string) {
  if (typeof window === 'undefined') return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ar-SA'
  utterance.rate = 0.7
  utterance.pitch = 1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export default function ReadingClient({
  params,
}: {
  params: Promise<{ letterId: string }>
}) {
  const [letterId, setLetterId] = useState<string>('')
  const [activeHarakat, setActiveHarakat] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { completeLesson, isLessonCompleted } = useLearningStore()
  const searchParams = useSearchParams()
  const level = parseInt(searchParams.get('level') || '2', 10)

  useEffect(() => {
    params.then((p) => setLetterId(p.letterId))
  }, [params])

  const letter = HIJAIYAH_LETTERS.find((l) => l.id === letterId)
  const currentIndex = HIJAIYAH_LETTERS.findIndex((l) => l.id === letterId)
  const prevLetter = currentIndex > 0 ? HIJAIYAH_LETTERS[currentIndex - 1] : null
  const nextLetter = currentIndex < HIJAIYAH_LETTERS.length - 1 ? HIJAIYAH_LETTERS[currentIndex + 1] : null
  const isCompleted = letter ? isLessonCompleted(`${level}-${letter.id}`) : false

  const baseHarakatOptions = [
    { id: 'fathah', symbol: 'َ', name: 'Fathah', sound: `${letter?.transliteration || ''}a` },
    { id: 'kasrah', symbol: 'ِ', name: 'Kasrah', sound: `${letter?.transliteration || ''}i` },
    { id: 'dhammah', symbol: 'ُ', name: 'Dhammah', sound: `${letter?.transliteration || ''}u` },
  ]
  const advancedHarakatOptions = [
    { id: 'sukun', symbol: 'ْ', name: 'Sukun', sound: letter?.transliteration || '' },
    { id: 'fathah_tanwin', symbol: 'ً', name: 'Fathatain', sound: `${letter?.transliteration || ''}an` },
    { id: 'kasrah_tanwin', symbol: 'ٍ', name: 'Kasratain', sound: `${letter?.transliteration || ''}in` },
    { id: 'dhammah_tanwin', symbol: 'ٌ', name: 'Dhammatain', sound: `${letter?.transliteration || ''}un` },
  ]

  const harakatOptions = level >= 4 ? [...baseHarakatOptions, ...advancedHarakatOptions] : baseHarakatOptions

  const currentHarakat = harakatOptions[activeHarakat] || harakatOptions[0]

  const getLetterWithHarakat = (index: number = activeHarakat) => {
    if (!letter) return ''
    if (index === 0) return letter.withFathah
    if (index === 1) return letter.withKasrah
    if (index === 2) return letter.withDhammah
    if (level >= 4) {
      if (index === 3) return letter.withSukun
      if (index === 4) return letter.letter + 'ً'
      if (index === 5) return letter.letter + 'ٍ'
      if (index === 6) return letter.letter + 'ٌ'
    }
    return letter.letter
  }

  const handlePlaySpecific = (index: number) => {
    if (!letter) return
    setActiveHarakat(index)
    setIsFlipped(false)
    setRevealed(false)
    setQuizAnswer(null)
    setIsPlaying(true)
    
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const targetHarakat = harakatOptions[index]
    const audioUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/quran-audio/huruf/${letter.id}-${targetHarakat.id}.mp3`
    const audio = new Audio(audioUrl)
    audioRef.current = audio
    
    audio.play().then(() => {
      audio.onended = () => setIsPlaying(false)
    }).catch(e => {
      console.log(`Audio custom belum ada untuk ${letter.id}-${targetHarakat.id}, menggunakan suara mesin (TTS).`, e)
      speakArabic(getLetterWithHarakat(index))
      setTimeout(() => setIsPlaying(false), 1500)
    })
  }

  const handlePlay = () => handlePlaySpecific(activeHarakat)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped) {
      handlePlay()
    }
  }

  const handleReveal = () => {
    setRevealed(true)
    handlePlay()
    if (letter) {
      completeLesson(`${level}-${letter.id}`, 100)
    }
  }

  const handleQuizAnswer = (selected: string) => {
    if (quizAnswer !== null) return
    setQuizAnswer(selected)
    const isCorrect = selected === currentHarakat.name
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  const quizChoices = ['Fathah', 'Kasrah', 'Dhammah', 'Sukun']
    .sort(() => Math.random() - 0.5)

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
    <div className="min-h-screen bg-[var(--color-bg)] font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[13px] font-bold tracking-wider uppercase text-[#CBD5E1] mb-6 md:mb-8 flex-wrap">
          <Link href="/learn" className="hover:text-[#3B82F6] transition-colors whitespace-nowrap">Peta Rute</Link>
          <span>›</span>
          <span className="text-[#3B82F6] truncate">Sesi Baca: {letter?.name || '...'}</span>
        </div>

        {/* Mode toggle */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 md:mb-8 bg-white p-2 rounded-[1.5rem] md:rounded-[2rem] border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)] w-full sm:w-fit mx-auto lg:mx-0">
          <button
            onClick={() => setQuizMode(false)}
            className={`px-4 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-[15px] font-bold transition-all w-full sm:w-auto ${!quizMode ? 'bg-[#0F172A] text-white shadow-md' : 'text-[#64748B] hover:bg-[#F1F5F9]'}`}
          >
            📖 Mode Eksplorasi
          </button>
          <button
            onClick={() => { setQuizMode(true); setQuizAnswer(null) }}
            className={`px-8 py-3.5 rounded-full text-sm sm:text-[15px] font-bold transition-all w-full sm:w-auto ${quizMode ? 'bg-[#D97706] text-white shadow-[0_4px_15px_rgba(217,119,6,0.4)]' : 'text-[#64748B] hover:bg-[#F1F5F9]'}`}
          >
            🎯 Mode Kompetensi
          </button>
          
          {quizMode && (
            <div className="flex sm:hidden md:flex justify-center ml-0 sm:ml-4 items-center gap-3 px-4 sm:px-6 sm:border-l border-[#E2E8F0] py-2 sm:py-0">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8]">Skor</span>
              <span className="text-lg sm:text-xl font-extrabold text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-xl">{score.correct}/{score.total}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Main Interaction Area */}
          <div className="lg:col-span-3 flex flex-col gap-8 animate-fade-in">
            {/* Harakat selector */}
            <div className={`grid gap-2 sm:gap-3 bento-card p-3 sm:p-4 ${level >= 4 ? 'grid-cols-4 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-3'}`}>
              {harakatOptions.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => { setActiveHarakat(i); setIsFlipped(false); setRevealed(false); setQuizAnswer(null) }}
                  className={`flex flex-col items-center py-3 sm:py-4 rounded-2xl transition-all border ${activeHarakat === i ? 'bg-[#064E3B] border-[#064E3B] text-white shadow-lg shadow-[#064E3B]/30 scale-[1.02]' : 'bg-[#F8FAF9] border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:bg-white'}`}
                >
                  <div className={`font-arabic text-2xl sm:text-3xl leading-none mb-1 sm:mb-2 ${activeHarakat === i ? 'text-[#D97706]' : 'text-[#064E3B]'}`}>{h.symbol}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest uppercase text-center truncate w-full px-1">{h.name}</div>
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
                    className="bg-white rounded-[2rem] md:rounded-[3rem] border border-[#E2E8F0] p-6 md:p-12 text-center shadow-[0_20px_40px_-10px_rgba(15,23,42,0.05)] group-hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.1)] transition-shadow min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 md:h-2 bg-gradient-to-r from-[#064E3B] via-[#D97706] to-[#064E3B]" />
                    <div className="text-[9px] md:text-[11px] font-extrabold tracking-widest md:tracking-[0.2em] text-[#D97706] mb-4 md:mb-8 bg-[#D97706]/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-center">
                      KLIK UNTUK MEMBALIK & DENGARKAN
                    </div>
                    <div className="font-arabic text-center leading-none mb-6 md:mb-8 text-[#022C22] text-[8rem] sm:text-[10rem] md:text-[12rem]">
                      {getLetterWithHarakat()}
                    </div>
                    
                    <div className="mt-4 md:mt-8 flex justify-center">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all shadow-lg ${isPlaying ? 'bg-[#D97706] text-white scale-110 shadow-[#D97706]/40' : 'bg-[#064E3B] text-white shadow-[#064E3B]/30 hover:scale-105'}`}
                        onClick={(e) => { e.stopPropagation(); handlePlay() }}
                      >
                        {isPlaying ? '🔊' : '▶'}
                      </div>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div
                    className="absolute inset-0 mesh-bg rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center text-white flex flex-col items-center justify-center shadow-2xl border-none"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="absolute top-0 right-0 p-4 md:p-8 text-[10rem] md:text-[15rem] font-arabic opacity-5 pointer-events-none -rotate-12 leading-none">
                      {getLetterWithHarakat()}
                    </div>
                    <div className="font-arabic text-7xl md:text-9xl mb-4 md:mb-8 relative z-10">{getLetterWithHarakat()}</div>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#D97706] mb-3 md:mb-4 tracking-tighter bg-white/10 px-6 md:px-8 py-2 md:py-3 rounded-2xl backdrop-blur-md border border-white/20">/{currentHarakat.sound}/</div>
                    <div className="text-white/80 text-base md:text-lg mb-4 md:mb-8 font-medium tracking-wide">{letter?.name} + {currentHarakat.name}</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Quiz Mode UI */
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-[#E2E8F0] p-6 md:p-12 text-center shadow-[0_20px_40px_-5px_rgba(217,119,6,0.05)] min-h-[350px] md:min-h-[500px] flex flex-col justify-center">
                <div className="text-[9px] md:text-[11px] font-extrabold tracking-widest md:tracking-[0.2em] text-[#D97706] mb-6 md:mb-8">UJI PENGETAHUAN: APA NAMA HARAKAT INI?</div>
                <div className="font-arabic text-center leading-none mb-8 md:mb-12 text-[#0F172A] text-[7rem] sm:text-[8rem] md:text-[10rem]">
                  {getLetterWithHarakat()}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {quizChoices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleQuizAnswer(choice)}
                      disabled={quizAnswer !== null}
                      className={`py-4 md:py-5 px-4 md:px-6 rounded-xl md:rounded-2xl text-sm md:text-[15px] font-bold uppercase tracking-wider transition-all border-2 ${
                        quizAnswer === null
                          ? 'border-[#E2E8F0] bg-[#F8FAF9] text-[#0F172A] hover:border-[#064E3B] hover:shadow-[0_8px_20px_rgba(6,78,59,0.1)]'
                          : choice === currentHarakat.name
                          ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981] scale-105 shadow-lg'
                          : quizAnswer === choice
                          ? 'border-red-500 bg-red-500/10 text-red-600'
                          : 'border-[#E2E8F0] bg-white text-[#CBD5E1] opacity-50'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                {quizAnswer && (
                  <div className={`mt-6 md:mt-8 p-4 md:p-5 rounded-xl md:rounded-2xl text-[13px] md:text-[15px] font-bold uppercase tracking-wider md:tracking-widest border border-dashed flex flex-col sm:flex-row items-center justify-center gap-2 ${quizAnswer === currentHarakat.name ? 'bg-[#10B981]/5 text-[#10B981] border-[#10B981]/30' : 'bg-red-50 text-red-600 border-red-200'}`}>
                    <span>{quizAnswer === currentHarakat.name ? '🎯 Jawaban Presisi!' : `🛑 Salah. Seharusnya: ${currentHarakat.name}.`}</span>
                    <button onClick={() => setQuizAnswer(null)} className="underline decoration-2 underline-offset-4 sm:ml-2">Lanjut Uji</button>
                  </div>
                )}
              </div>
            )}
            
            {/* All Harakats Quick Preview */}
            <div className="bento-card p-4 md:p-6">
              <h3 className="text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase text-[#94A3B8] mb-4 text-center">Variasi Vokal</h3>
              <div className={`grid gap-3 md:gap-4 ${level >= 4 ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-3'}`}>
                {harakatOptions.map((h, i) => (
                  <button
                    key={h.name}
                    onClick={() => handlePlaySpecific(i)}
                    className="bg-white hover:bg-[#F8FAF9] hover:border-[#064E3B]/30 rounded-xl md:rounded-2xl p-3 md:p-4 text-center border border-[#E2E8F0] transition-all group flex flex-col items-center shadow-sm hover:shadow-md"
                  >
                    <div className="font-arabic text-3xl md:text-4xl text-[#064E3B] group-hover:scale-110 group-hover:text-[#D97706] transition-transform mb-2">
                       {h.symbol === 'ْ' ? letter?.withSukun : h.symbol === 'ً' ? letter?.letter + 'ً' : h.symbol === 'ٍ' ? letter?.letter + 'ٍ' : h.symbol === 'ٌ' ? letter?.letter + 'ٌ' : [letter?.withFathah, letter?.withKasrah, letter?.withDhammah][i]}
                    </div>
                    <div className="text-[8px] md:text-[9px] font-bold tracking-wider md:tracking-widest uppercase text-[#64748B] mb-1">{h.name}</div>
                    <div className="text-[9px] md:text-[10px] font-bold text-[#D97706]">/{h.sound}/</div>
                  </button>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right: Info & Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Letter identity card */}
            <div className="bento-card p-6 md:p-8 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]" />
              <div className="text-[9px] md:text-[10px] font-extrabold tracking-widest text-[#94A3B8] mb-3 md:mb-4 uppercase">Identitas Huruf</div>
              <div className="font-arabic text-6xl md:text-8xl text-[#1E293B] mb-2 md:mb-4 py-2">{letter?.letter}</div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">{letter?.name}</h1>
              <p className="text-[#64748B] text-sm md:text-base font-bold mt-1 uppercase tracking-widest">/{letter?.transliteration}/</p>
              {isCompleted && (
                 <div className="mt-4 md:mt-5 inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] text-[10px] md:text-[11px] uppercase tracking-wider font-extrabold px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#10B981]/20">
                  <span className="text-sm md:text-base">✓</span> Kompetensi Tercapai
                </div>
              )}
              
              {!quizMode && !isCompleted && (
                 <button
                 id="btn-mark-complete"
                 onClick={handleReveal}
                 className="w-full mt-6 md:mt-8 py-3 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-widest bg-white border-2 border-[#10B981] text-[#10B981] rounded-xl md:rounded-2xl hover:bg-[#10B981] hover:text-white transition-all shadow-sm"
               >
                 Tandai Dikuasai
               </button>
              )}
            </div>

            {/* Pronunciation Sheet */}
            <div className="bg-[#F8FAF9] rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#E2E8F0]">
              <h3 className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest text-[#64748B] mb-4 md:mb-5 text-center">Lembar Pengucapan</h3>
              <div className="flex flex-col gap-2 md:gap-3">
                {harakatOptions.map((h, i) => (
                  <div key={h.id} className="flex items-center justify-between bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-[#E2E8F0]">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="font-arabic text-xl md:text-2xl text-[#064E3B] min-w-[24px] text-center">{h.symbol}</span>
                      <span className="text-xs md:text-sm font-bold text-[#0F172A]">{h.name}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-[10px] md:text-xs font-bold text-[#D97706] bg-[#D97706]/10 px-2.5 md:px-3 py-1 rounded-lg">/{h.sound}/</span>
                      <button
                        onClick={() => handlePlaySpecific(i)}
                        className="w-8 h-8 md:w-10 md:h-10 bg-[#F1F5F9] rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-lg hover:bg-[#064E3B] hover:text-white transition-colors"
                      >
                        🔊
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Baris Latihan */}
            {letter && (level === 2 || level === 3 || level === 4) && (() => {
              const neighbors = HIJAIYAH_LETTERS.filter((l) => l.id !== letter.id).slice(0, 6)
              const pairs: { arabic: string; label: string }[] = []

              if (level === 2) {
                pairs.push({ arabic: `${letter.withFathah} ${neighbors[0]?.withFathah ?? ''} ${letter.withFathah}`, label: 'Fathah bolak-balik' })
                pairs.push({ arabic: `${neighbors[1]?.withFathah ?? ''} ${letter.withFathah} ${neighbors[2]?.withFathah ?? ''}`, label: 'Tengah' })
                pairs.push({ arabic: `${letter.withFathah} ${neighbors[3]?.withFathah ?? ''} ${neighbors[4]?.withFathah ?? ''} ${letter.withFathah}`, label: 'Pola 4' })
                pairs.push({ arabic: `${neighbors[0]?.withFathah ?? ''} ${letter.withFathah} ${neighbors[5]?.withFathah ?? ''}`, label: 'Pola akhir' })
              } else if (level === 3) {
                pairs.push({ arabic: `${letter.withFathah} ${letter.withKasrah} ${letter.withDhammah}`, label: 'a — i — u' })
                pairs.push({ arabic: `${neighbors[0]?.withFathah ?? ''} ${letter.withKasrah} ${neighbors[1]?.withDhammah ?? ''}`, label: 'Campuran' })
                pairs.push({ arabic: `${letter.withKasrah} ${neighbors[2]?.withKasrah ?? ''} ${letter.withDhammah}`, label: 'Kasrah variasi' })
                pairs.push({ arabic: `${letter.withDhammah} ${neighbors[3]?.withFathah ?? ''} ${letter.withFathah}`, label: 'Dhammah variasi' })
              } else if (level === 4) {
                pairs.push({ arabic: `${letter.withFathah} ${letter.withKasrah} ${letter.withDhammah}`, label: 'a — i — u' })
                pairs.push({ arabic: `${letter.withSukun} ${neighbors[0]?.withFathah ?? ''} ${letter.withSukun}`, label: 'Sukun' })
                pairs.push({ arabic: `${letter.letter}ً ${letter.letter}ٍ ${letter.letter}ٌ`, label: 'Tanwin' })
                pairs.push({ arabic: `${neighbors[1]?.withFathah ?? ''} ${letter.withSukun} ${neighbors[2]?.withFathah ?? ''}`, label: 'Sukun tengah' })
                pairs.push({ arabic: `${letter.withFathah} ${neighbors[3]?.letter ?? ''}ٌ ${letter.withSukun}`, label: 'Campuran' })
              }

              return (
                <div className="bg-[#020617] rounded-2xl md:rounded-3xl border border-[#374151] overflow-hidden mt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 md:px-5 md:py-3.5 border-b border-[#374151]/60 gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-[0.3em] text-emerald-400">
                        Baris Latihan
                      </span>
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold text-[#374151] uppercase tracking-widest">
                      Level {level} • {letter.name}
                    </span>
                  </div>

                  <div className="divide-y divide-[#374151]/30">
                    {pairs.map((row, idx) => (
                      <div key={idx} className="group flex items-center gap-2 md:gap-3 px-3 py-3 md:px-5 md:py-3.5 hover:bg-white/[0.03] transition-colors">
                        <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded text-[8px] md:rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                          <span className="text-[8px] md:text-[9px] font-extrabold text-[#F59E0B]">{idx + 1}</span>
                        </div>
                        <p className="flex-1 font-arabic text-xl sm:text-2xl text-white text-right leading-loose group-hover:text-[#F59E0B] transition-colors">
                          {row.arabic}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 md:px-5 md:py-2.5 border-t border-[#374151]/40 bg-white/[0.01]">
                    <p className="text-[7px] md:text-[8px] text-[#374151] font-bold uppercase tracking-[0.2em] text-center">
                      Baca kanan ke kiri • ulangi hingga lancar
                    </p>
                  </div>
                </div>
              )
            })()}

            {/* Pagination */}
            <div className="flex gap-2 md:gap-3">
              {prevLetter ? (
                <Link href={`/learn/reading/${prevLetter.id}?level=${level}`} className="flex-1 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-wider bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] rounded-xl md:rounded-2xl hover:border-[#D97706] transition-all text-center">
                  ← {prevLetter.name}
                </Link>
              ) : <div className="flex-1" />}
              {nextLetter ? (
                 <Link href={`/learn/reading/${nextLetter.id}?level=${level}`} className="flex-1 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-wider bg-[#064E3B] text-white shadow-[0_4px_14px_rgba(6,78,59,0.39)] hover:scale-[1.02] rounded-xl md:rounded-2xl transition-all text-center">
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
