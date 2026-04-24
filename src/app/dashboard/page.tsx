'use client'

import Link from 'next/link'
import { useLearningStore } from '@/store/learningStore'
import { CURRICULUM_LEVELS, HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import Navbar from '@/components/Navbar'

export default function DashboardPage() {
  const { streakDays, totalXP, completedLessons, currentLevel, userName } = useLearningStore()

  const completedCount = Object.values(completedLessons).filter((l) => l.completed).length
  const totalLessons = HIJAIYAH_LETTERS.length
  const overallProgress = Math.floor((completedCount / totalLessons) * 100)

  const today = new Date()
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    return {
      label: dayNames[d.getDay()],
      date: d.getDate(),
      active: i >= 7 - streakDays,
    }
  })

  const recentLetters = HIJAIYAH_LETTERS.slice(
    Math.max(0, completedCount - 3),
    Math.min(completedCount + 2, HIJAIYAH_LETTERS.length)
  )

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
            <span className="text-gradient-vibrant">Ruang Kendali</span> {userName ? userName.split(' ')[0] : 'Anda'}
          </h1>
          <p className="text-lg text-[#CBD5E1] font-medium">Bukan sekadar belajar, ini adalah investasi spiritual Anda.</p>
        </div>

        {/* Stats Row - Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Stats Cards */}
          {[
            { label: 'Konsistensi', value: streakDays, unit: 'hari', icon: '🔥', color: '#FDE68A', glow: 'glow-gold' },
            { label: 'Total XP', value: totalXP, unit: 'poin', icon: '✨', color: '#F59E0B', glow: 'glow-gold' },
            { label: 'Pelajaran', value: completedCount, unit: `/ ${totalLessons}`, icon: '🎯', color: '#D97706', glow: 'glow-gold' },
            { label: 'Level Saya', value: currentLevel, unit: '/ 6 level', icon: '🎖️', color: '#B45309', glow: 'glow-gold' },
          ].map((stat) => (
            <div key={stat.label} className={`glass-premium p-6 flex flex-col justify-between rounded-3xl transition-all hover:scale-[1.05] hover:z-10 ${stat.glow}`}>
              <div className="text-3xl mb-4">{stat.icon}</div>
              <div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <div className="text-4xl font-extrabold text-white tracking-tighter">{stat.value}</div>
                  <div className="text-sm font-semibold text-white/50">{stat.unit}</div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: stat.color }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Tracking */}
          <div className="lg:col-span-2 flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            
            {/* Overall Progress Block */}
            <div className="bento-card p-8 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 font-arabic text-8xl text-black/[0.02] pointer-events-none">ي</div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">Akuisisi Pengetahuan</h2>
              <p className="text-sm font-medium text-[#64748B] mb-6">Misi Penguasaan Hijaiyah: {completedCount} dari {totalLessons}</p>
              
              <div className="w-full bg-[#F1F5F9] rounded-full h-4 mb-3 shadow-inner">
                <div
                  className="progress-bar h-full rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                <span>Mulai (Alif)</span>
                <span className="text-[#064E3B]">{overallProgress}% Selesai</span>
                <span>Tamat (Ya&apos;)</span>
              </div>
            </div>

            {/* Streak Graph */}
            <div className="bento-card p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Intensitas Mingguan</h2>
                  <p className="text-sm font-medium text-[#94A3B8]">Keberhasilan ditentukan oleh kehadiran.</p>
                </div>
                <div className="bg-[#D97706]/10 text-[#D97706] font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <span className="text-lg">🔥</span> {streakDays} Hari
                </div>
              </div>

              <div className="flex justify-between gap-2">
                {weekDays.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-full">
                    <div
                      className={`w-full aspect-square max-w-[3.5rem] rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        day.active
                          ? 'bg-[#064E3B] text-white shadow-[0_8px_20px_rgba(6,78,59,0.3)]'
                          : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'
                      }`}
                    >
                      {day.date}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${day.active ? 'text-[#064E3B]' : 'text-[#94A3B8]'}`}>
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Roadmap Progress */}
            <div className="bento-card p-8">
               <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Capaian Tahapan</h2>
               <div className="flex flex-col gap-6">
                {CURRICULUM_LEVELS.map((level) => {
                  const progress = level.id < currentLevel ? 100 : level.id === currentLevel ? Math.floor((completedCount / level.totalLessons) * 100) : 0
                  const isLocked = level.id > currentLevel
                  return (
                    <div key={level.id} className={`flex items-center gap-5 p-4 rounded-3xl transition-all ${isLocked ? 'bg-[#F8FAF9] opacity-70' : 'bg-white border border-[#E2E8F0] shadow-sm'}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${isLocked ? 'bg-[#E2E8F0]' : 'bg-[#064E3B]/10'}`}>
                        {isLocked ? '🔒' : level.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className={`text-[15px] font-bold ${isLocked ? 'text-[#94A3B8]' : 'text-[#0F172A]'}`}>{level.title}</h3>
                          <span className={`text-xs font-bold ${isLocked ? 'text-[#94A3B8]' : 'text-[#064E3B]'}`}>{progress}%</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${isLocked ? 'bg-[#CBD5E1]' : 'progress-bar'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
               </div>
            </div>

          </div>

          {/* Right Column - Actions */}
          <div className="flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            
            {/* The Daily Target Block - Premium Dark Component */}
            <div className="mesh-bg rounded-3xl p-8 text-white relative overflow-hidden bento-card border-none shadow-[0_20px_40px_-5px_rgba(2,44,34,0.3)]">
              <div className="absolute top-0 right-0 p-6 text-7xl font-arabic text-white/5 pointer-events-none">هدف</div>
              
              <div className="bg-white/10 w-max px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#D97706] mb-4 backdrop-blur-md">Prioritas Hari Ini</div>
              <h2 className="text-2xl font-bold mb-2">Sirkuit 5 Menit</h2>
              <p className="text-white/70 text-sm font-medium mb-8">Penuhi kuota latihan harian Anda untuk membangun habit permanen.</p>
              
              <div className="w-full bg-white/10 rounded-full h-2 mb-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-full rounded-full shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                  style={{ width: `${Math.min(100, completedCount * 15)}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-xs font-bold text-white/80 mb-6 uppercase tracking-wider">
                <span>Mulai</span>
                <span>{Math.min(completedCount, 3)} / 3 Unit</span>
              </div>

              <Link
                href="/learn"
                className="w-full py-4 bg-white text-[#022C22] font-bold rounded-2xl block text-center hover:scale-[1.02] transition-transform shadow-lg shadow-white/10"
              >
                Mulai Sesi Sekarang
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bento-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-5">Akses Cepat</h2>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/learn', icon: '🗺️', label: 'Peta Kurikulum', highlight: false },
                  { href: `/learn/writing/${HIJAIYAH_LETTERS[Math.max(0, completedCount)]?.id || 'alif'}`, icon: '✍️', label: 'Lanjutkan Menulis', highlight: true },
                  { href: `/learn/reading/${HIJAIYAH_LETTERS[Math.max(0, completedCount)]?.id || 'alif'}`, icon: '🎧', label: 'Flashcard Audio', highlight: true },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group hover:-translate-y-0.5 ${
                      action.highlight 
                        ? 'bg-gradient-to-r from-[#D97706]/10 to-transparent border border-[#D97706]/30 hover:border-[#F59E0B]/60 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]' 
                        : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      action.highlight 
                        ? 'bg-[#D97706]/20 border border-[#D97706]/30 shadow-inner' 
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      {action.icon}
                    </div>
                    <div className={`font-bold transition-colors duration-300 ${
                      action.highlight ? 'text-white group-hover:text-[#FCD34D]' : 'text-[#CBD5E1] group-hover:text-white'
                    }`}>
                      {action.label}
                    </div>
                    <div className={`ml-auto font-bold transition-all duration-300 group-hover:translate-x-1.5 ${
                      action.highlight ? 'text-[#F59E0B]' : 'text-[#64748B] group-hover:text-white'
                    }`}>
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Lineup Preview */}
            <div className="bento-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-5">Antrean Materi</h2>
              <div className="flex flex-col gap-3">
                {recentLetters.map((letter) => {
                  const isDone = !!completedLessons[letter.id]?.completed
                  return (
                    <Link
                      key={letter.id}
                      href={`/learn/writing/${letter.id}`}
                      className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 border group hover:-translate-y-0.5 ${
                        isDone
                          ? 'bg-[#10B981]/10 border-[#10B981]/30 hover:border-[#10B981]/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center font-arabic text-2xl rounded-xl shadow-sm border transition-transform duration-300 group-hover:scale-110 ${
                        isDone ? 'bg-[#10B981]/20 border-[#10B981]/30 text-[#10B981]' : 'bg-white/5 border-white/10 text-white'
                      }`}>
                        {letter.letter}
                      </div>
                      <div className="flex-1">
                        <div className={`text-[15px] font-bold mb-0.5 transition-colors ${isDone ? 'text-white' : 'text-[#E2E8F0] group-hover:text-white'}`}>{letter.name}</div>
                        <div className={`text-xs font-semibold uppercase tracking-wider transition-colors ${isDone ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>/{letter.transliteration}/</div>
                      </div>
                      {isDone ? (
                        <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] text-xs shadow-sm border border-[#10B981]/30">✓</div>
                      ) : (
                        <div className="text-[#64748B] opacity-50 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300">→</div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
