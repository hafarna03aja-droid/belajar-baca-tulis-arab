'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'

const FLOATING_LETTERS = ['ا', 'ب', 'ت', 'ح', 'د', 'ر', 'س', 'ع', 'ف', 'ق', 'ل', 'م', 'ن', 'و', 'ي']

const FEATURES = [
  {
    icon: '✍️',
    title: 'Kanvas Tracing Cerdas',
    desc: 'Bukan sekadar menggambar. Algoritma akurasi kami membaca tarikan garis Anda secara real-time.',
    span: 'md:col-span-2 lg:col-span-2'
  },
  {
    icon: '🏆',
    title: 'Sistem Level',
    desc: 'Kurikulum linier dari Alif hingga huruf tersambung.',
    span: 'md:col-span-1 lg:col-span-1'
  },
  {
    icon: '🎧',
    title: 'Audio Native Makhraj',
    desc: 'Akses instan ke pengucapan jernih untuk setiap variasi harakat.',
    span: 'md:col-span-1 lg:col-span-1'
  },
  {
    icon: '📊',
    title: 'Analitik Belajar Anda',
    desc: 'Pantau streak, kumpulkan XP, dan raih target harian dengan dashboard visual elegan.',
    span: 'md:col-span-2 lg:col-span-2'
  },
]

const CURRICULUM = [
  { level: 1, title: 'Huruf Tunggal', desc: 'Pengenalan fondasi dasar', icon: '✍️' },
  { level: 2, title: 'Harakat Dasar', desc: 'Fathah, Kasrah, Dhammah', icon: '📖' },
  { level: 3, title: 'Posisi Sambung', desc: 'Awal, tengah, akhir', icon: '🔗' },
]

export default function HomePage() {
  const [randomLetters, setRandomLetters] = useState<Array<{ letter: string; x: number; y: number; delay: number; size: number }>>([])

  useEffect(() => {
    const letters = Array.from({ length: 15 }, (_, i) => ({
      letter: FLOATING_LETTERS[i % FLOATING_LETTERS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 1.5 + 1.2,
    }))
    setRandomLetters(letters)
  }, [])

  return (
    <div className="min-h-screen font-sans selection:bg-[#2563EB]/30 bg-[var(--color-bg)]">
      <Navbar />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden mesh-bg pt-20 rounded-b-[3rem] shadow-2xl">
        {/* Floating Arabic letters */}
        {randomLetters.map((item, i) => (
          <div
            key={i}
            className="absolute font-arabic text-white/[0.04] select-none pointer-events-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size * 3}rem`,
              animation: `float ${4 + item.delay}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.letter}
          </div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in mt-10">
          <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10 backdrop-blur-md shadow-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3B82F6]"></span>
            </span>
            <span className="text-sm font-semibold text-white/90 tracking-wide">Platform Edukasi Hijaiyah #1</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Belajar{' '}
            <span className="relative inline-block">
              <span className="text-gradient-vibrant">Membaca</span>
              <svg className="absolute -bottom-3 left-0 w-full opacity-60" viewBox="0 0 300 12" fill="none">
                <path d="M2 10 Q 75 2 150 8 Q 225 14 298 6" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" className="animate-draw" />
              </svg>
            </span>
            <br />Al-Qur'an dari Nol.
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Tinggalkan cara lama. Mulai perjalanan Anda dengan kanvas tracing interaktif eksklusif dan kurikulum yang didesain secara sains.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-[#F59E0B] text-[#020617] font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            >
              Mulai Gratis
            </Link>
            <Link
              href="/learn/reading/ba"
              className="w-full sm:w-auto px-10 py-4.5 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>▶</span> Lihat Demo Interaktif
            </Link>
          </div>
        </div>

        {/* Bottom fading gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent opacity-30" />
      </section>

      {/* Stats - Floating */}
      <section className="-mt-16 relative z-20 px-6">
        <div className="max-w-4xl mx-auto glass-premium rounded-3xl p-8 flex justify-around flex-wrap gap-6 items-center border border-white/10 glow-blue">
          {[
            { num: '28', label: 'Huruf Hijaiyah', color: '#FCD34D' },
            { num: '6', label: 'Tingkatan Level', color: '#F59E0B' },
            { num: '100%', label: 'Gratis Akses', color: '#B45309' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl font-extrabold transition-transform group-hover:scale-110 duration-300" style={{ color: stat.color }}>{stat.num}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/50 font-bold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* App Interface Sneak Peek */}
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">Pengalaman Visual Tanpa Kompromi</h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">Dirancang layaknya aplikasi standar dunia. Bersih, fokus, tanpa distraksi.</p>
          </div>

          {/* Bento Box Layout for Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className={`bento-card p-8 md:p-10 flex flex-col justify-between group shadow-3d ${feature.span}`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#94A3B8] leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Langkah Pasti,<br/>Bukan Acak.</h2>
                <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">Kami tidak melempar semua informasi di hari pertama. Anda harus menaklukkan huruf tunggal sebelum menyentuh huruf bersambung.</p>
                
                <div className="flex flex-col gap-6">
                  {CURRICULUM.map((item, i) => (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold text-lg flex-shrink-0">
                        0{item.level}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-[#94A3B8]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/learn" className="btn-primary inline-flex mt-12 px-8 py-4 items-center gap-2 text-lg">
                  Lihat Roadmap Penuh →
                </Link>
              </div>

              <div className="flex-1 relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/20 to-[#1E3A8A]/20 blur-3xl -z-10 rounded-full" />
                 <div className="bento-card p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-8xl font-arabic opacity-5 text-[#3B82F6] -rotate-12">ص</div>
                    <div className="font-arabic text-9xl text-[#3B82F6] mb-8 relative z-10 leading-none py-6">ب</div>
                    <div className="text-sm font-bold tracking-widest text-[#3B82F6] mb-2 uppercase">Pratinjau Level 1</div>
                    <div className="text-2xl font-bold text-white">Kanvas Menulis</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mesh-bg rounded-3xl p-12 md:p-20 relative overflow-hidden bento-card border-none shadow-2xl">
            <div className="absolute top-4 right-8 text-8xl opacity-10 font-arabic text-white">بسم</div>
            <div className="absolute bottom-4 left-8 text-8xl opacity-10 font-arabic text-white">الله</div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Investasi 5 Menit / Hari.
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">
                Masuk sekarang dan dapatkan akses penuh kelengkapan belajar kami secara gratis.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#020617] font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 text-lg"
              >
                Mulai Belajar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-[#334155] mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center">
              <span className="font-arabic text-[#020617] text-sm font-bold">ق</span>
            </div>
            <div className="font-bold text-white tracking-tight">Qur'an Flow</div>
          </div>
          <div className="text-sm font-medium text-[#94A3B8]">
            © {new Date().getFullYear()} Dirakit dengan hati untuk kemudahan membaca Qur'an.
          </div>
        </div>
      </footer>
    </div>
  )
}
