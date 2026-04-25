'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useLearningStore } from '@/store/learningStore'

const NAV_LINKS = [
  { href: '/learn', label: 'Mulai Belajar' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const { userName, setUserId, setUserName } = useLearningStore()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUserId(null)
    setUserName(null)
    router.push('/')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
        scrolled ? 'py-3 sm:py-4 glass-premium border-b border-white/10 shadow-lg shadow-black/40' : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-[#2563EB]/20 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <span className="text-white font-arabic text-lg sm:text-xl font-bold translate-y-[-1px]">ق</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">Qur&apos;an Flow</span>
            <p className="text-[8px] sm:text-[10px] text-[#3B82F6] uppercase tracking-wider font-bold opacity-80 mt-0 sm:-mt-0.5">Platform Edukasi</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#1E293B]/50 border border-[#334155] px-2 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2 text-sm font-semibold text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors rounded-full"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-[#334155] mx-2" />
          {userName ? (
            <div className="flex items-center gap-3 px-3">
              <span className="text-sm font-bold text-white">Halo, {userName.split(' ')[0]}</span>
              <button onClick={handleLogout} className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-full">
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn-primary px-6 py-2.5 text-sm"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 sm:p-2 rounded-full bg-[#1E293B]/50 border border-[#334155] hover:bg-[#1E293B] transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <div className="w-4 h-3 sm:w-5 sm:h-4 flex flex-col justify-between relative">
            <span className={`block h-[1.5px] sm:h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-left ${menuOpen ? 'rotate-45 translate-y-[-0.5px] sm:translate-y-[-1px]' : ''}`} />
            <span className={`block h-[1.5px] sm:h-[2px] w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] sm:h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-left ${menuOpen ? '-rotate-45 translate-y-[0.5px] sm:translate-y-[1px]' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 sm:left-auto sm:right-6 sm:w-[320px] bg-[#0F172A]/98 backdrop-blur-2xl border border-white/10 rounded-3xl p-2.5 flex flex-col gap-1 shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-fade-in origin-top max-h-[calc(100vh-6rem)] overflow-y-auto ring-1 ring-white/5">
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-2xl transition-all flex items-center justify-between group"
              onClick={() => setMenuOpen(false)}
            >
              <span>{link.label}</span>
              <span className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all">→</span>
            </Link>
          ))}
          {userName ? (
            <div className="flex flex-col gap-2 mt-1.5 pt-2.5 border-t border-white/10">
              <div className="px-4 py-1.5 text-[13px] font-medium text-[#94A3B8] flex items-center gap-3">
                 <div className="w-7 h-7 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center text-white font-bold text-xs shadow-inner flex-shrink-0">
                    {userName.charAt(0).toUpperCase()}
                 </div>
                 <span className="truncate leading-tight">Halo, <span className="font-semibold text-white">{userName}</span></span>
              </div>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="w-full mt-1 px-4 py-3 text-sm font-bold text-red-400 bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/30 text-center rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn-primary w-full px-4 py-3.5 text-sm text-center mt-1.5 rounded-xl font-bold shadow-lg shadow-[#3B82F6]/20"
              onClick={() => setMenuOpen(false)}
            >
              Masuk ke Akun
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
