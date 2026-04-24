'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CURRICULUM_LEVELS, HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { useLearningStore } from '@/store/learningStore'
import Navbar from '@/components/Navbar'

// Paths yang langsung ke halaman tanpa slug dinamis
const STATIC_PATHS = ['reading-grid', 'iqro']

function getLevelHref(path: string, lessonId: string, levelId: number) {
  if (STATIC_PATHS.includes(path)) return `/learn/${path}`
  return `/learn/${path}/${lessonId}?level=${levelId}`
}

export default function LearnPage() {
  const { completedLessons, currentLevel, forceUnlockAll } = useLearningStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [randomPicks, setRandomPicks] = useState<Record<number, any>>({})

  useEffect(() => {
    const pickRandoms = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const picks: Record<number, any> = {}
      CURRICULUM_LEVELS.forEach(level => {
        const dataset = level.id >= 5 ? HIJAIYAH_WORDS : HIJAIYAH_LETTERS
        picks[level.id] = dataset[Math.floor(Math.random() * dataset.length)]
      })
      setRandomPicks(picks)
    }

    pickRandoms()
    const interval = setInterval(pickRandoms, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="text-gradient-vibrant">Peta Perjalanan</span>
          </h1>
          <p className="text-lg text-[#CBD5E1] max-w-xl mx-auto font-medium mb-6">
            Kurikulum linear yang terstruktur rapi. Taklukkan setiap pos penjagaan untuk membuka rute selanjutnya.
          </p>
          <button
            onClick={() => forceUnlockAll()}
            className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-4 py-2 rounded-full hover:bg-[#D97706]/20 transition-colors border border-[#D97706]/20"
          >
            🔓 Aktifkan Semua Fitur (Dev Mode)
          </button>
        </div>

        {/* Roadmap */}
        <div className="relative isolate">
          {/* Vertical connector line */}
          <div className="absolute left-[18px] md:left-[39px] top-0 bottom-0 w-1 bg-gradient-to-b from-[#064E3B] via-[#D97706] to-[#E2E8F0] rounded-full -z-10 shadow-[0_0_10px_rgba(6,78,59,0.3)]" />

          <div className="flex flex-col gap-6">
            {CURRICULUM_LEVELS.map((level, idx) => {
              const isCompleted = currentLevel > level.id
              const isActive = currentLevel === level.id
              const isLocked = currentLevel < level.id

              const dataset = level.id >= 5 ? HIJAIYAH_WORDS : HIJAIYAH_LETTERS
              const completedCountForLevel = Object.keys(completedLessons).filter(k => k.startsWith(`${level.id}-`) && completedLessons[k].completed).length
              const uncompletedLesson = dataset.find(l => !completedLessons[`${level.id}-${l.id}`]?.completed) || dataset[0]


              return (
                <div key={level.id} className="relative pl-12 md:pl-24 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Connector node */}
                  <div
                    className={`absolute left-1 md:left-5 top-6 md:top-8 w-8 h-8 md:w-11 md:h-11 rounded-full border-2 md:border-[3px] flex items-center justify-center text-sm md:text-lg font-bold transition-all z-10 shadow-3d ${isCompleted
                        ? 'bg-gradient-to-br from-[#F59E0B] to-[#B45309] border-white text-[#020617] glow-gold'
                        : isActive
                          ? 'bg-gradient-to-br from-[#FDE68A] to-[#F59E0B] border-white text-[#020617] glow-gold animate-pulse'
                          : 'bg-[#111827] border-[#374151] text-white/20'
                      }`}
                  >
                    {isCompleted ? '✓' : isActive ? '▶' : '🔒'}
                  </div>

                  {/* Level Card */}
                  <div
                    className={`glass-premium p-5 md:p-8 transition-all rounded-2xl md:rounded-3xl border shadow-3d ${isLocked
                        ? 'opacity-40 grayscale pointer-events-none'
                        : isActive
                          ? 'border-[#F59E0B]/50 glow-gold scale-[1.02]'
                          : 'border-white/5 opacity-90'
                      }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                      <div className="flex items-start gap-3 md:gap-5 flex-1 w-full">
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-sm border ${isLocked ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#064E3B]/5 border-[#064E3B]/10'
                            }`}
                        >
                          {isLocked ? '🔒' : level.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1.5">
                            <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#D97706] uppercase">
                              Level {level.id}
                            </span>
                            <span
                              className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${level.phase === 'writing'
                                  ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                  : 'bg-[#374151] text-white/40'
                                }`}
                            >
                              {level.phase === 'writing' ? '✍️ Menulis' : '📖 Membaca'}
                            </span>
                          </div>
                          <h3 className={`text-2xl font-extrabold tracking-tight mb-1 ${isLocked ? 'text-[#64748B]' : 'text-white'}`}>
                            {level.title}
                          </h3>
                          <p className={`text-[15px] font-medium leading-relaxed ${isLocked ? 'text-[#475569]' : 'text-[#CBD5E1]'}`}>
                            {level.description}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      {!isLocked && (
                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                          <Link
                            href={getLevelHref(level.path, uncompletedLesson.id, level.id)}
                            id={`btn-level-${level.id}`}
                            className={`w-full md:w-auto text-center flex-shrink-0 px-8 py-3.5 rounded-full text-[15px] transition-all shadow-sm ${isActive
                                ? 'btn-primary'
                                : 'btn-secondary text-[#F59E0B]'
                              }`}
                          >
                            {isActive ? 'Mulai Eksplorasi →' : 'Uji Kembali'}
                          </Link>
                          <button
                            onClick={() => {
                              const randomItem = randomPicks[level.id] || dataset[0]
                              window.location.href = getLevelHref(level.path, randomItem.id, level.id)
                            }}
                            className="w-full md:w-auto text-center flex-shrink-0 px-6 py-3.5 rounded-full text-[15px] font-bold transition-all shadow-sm bg-[#F8FAF9] border border-[#E2E8F0] text-[#64748B] hover:bg-white hover:border-[#D97706] hover:text-[#D97706] hover:shadow-md"
                          >
                            {(() => {
                              const r = randomPicks[level.id]
                              if (!r) return 'Acak 🎲'
                              const label = r.transliteration || r.name
                              if (level.phase.includes('writing')) return `Tulis "${label}" 🎲`
                              if (level.phase === 'forms') return `Tebak "${label}" 🎲`
                              return `Baca "${label}" 🎲`
                            })()}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Level progress bar */}
                    {!isLocked && (
                      <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2.5">
                          <span>{level.totalLessons} Modul Tersedia</span>
                          <span className={isCompleted ? 'text-[#10B981]' : isActive ? 'text-[#D97706]' : ''}>
                            {isCompleted ? '100' : isActive ? Math.floor((completedCountForLevel / level.totalLessons) * 100) : '0'}% Tuntas
                          </span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden shadow-inner cursor-default">
                          <div
                            className={`h-full transition-all duration-1000 rounded-full ${isCompleted ? 'bg-[#10B981]' : 'progress-bar'}`}
                            style={{
                              width: `${isCompleted ? 100 : isActive ? Math.floor((completedCountForLevel / level.totalLessons) * 100) : 0}%`,
                            }}
                          />
                        </div>

                        {/* Letter preview grid (writing levels) */}
                        {(level.id === 1 || level.id === 6) && (
                          <div className="flex flex-wrap gap-2.5 mt-6">
                            {dataset.slice(0, 10).map((lesson) => {
                              const done = !!completedLessons[`${level.id}-${lesson.id}`]?.completed
                              return (
                                <Link
                                  key={lesson.id}
                                  href={`/learn/${level.path}/${lesson.id}?level=${level.id}`}
                                  className={`h-11 px-3 rounded-xl flex items-center justify-center text-xl font-arabic transition-all border ${done
                                      ? 'bg-gradient-to-br from-green-50 to-emerald-100/50 border-emerald-200 text-[#064E3B] shadow-sm hover:scale-105'
                                      : 'bg-white border-[#E2E8F0] text-[#94A3B8] hover:border-[#064E3B]/30 hover:text-[#064E3B]'
                                    }`}
                                  title={'name' in lesson ? lesson.name : lesson.transliteration}
                                >
                                  {/* @ts-expect-error ignore dynamic typing */}
                                  {lesson.letter || lesson.word}
                                </Link>
                              )
                            })}
                            {dataset.length > 10 && (
                              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[10px] tracking-tighter font-bold text-[#94A3B8] bg-[#F8FAF9] border border-dashed border-[#CBD5E1]">
                                +{dataset.length - 10}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Final completion Node */}
          <div className="pl-12 md:pl-24 relative mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="absolute left-[2px] md:left-[18px] top-6 w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-[#D97706] to-[#B45309] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.4)] z-10 border-2 md:border-4 border-[#FDFDFB]">
              <span className="text-sm md:text-xl">🏆</span>
            </div>
            <div className="mesh-bg rounded-2xl md:rounded-3xl p-6 md:p-8 text-white relative overflow-hidden bento-card border-none shadow-xl">
              <div className="absolute top-0 right-0 p-4 text-[6rem] md:text-9xl font-arabic text-white/5 pointer-events-none -rotate-12">م</div>
              <div className="relative z-10">
                <h3 className="font-extrabold text-2xl mb-2">Graduasi Al-Qur&apos;an 🎓</h3>
                <p className="text-white/80 font-medium leading-relaxed max-w-md">
                  Puncak dari disiplin Anda. Selesaikan semua rute untuk mendekode kehebatan bahasa suci dan klaim Medali Kehormatan Anda.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
