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
        scrolled ? 'py-4 glass-premium border-b border-white/10 shadow-lg shadow-black/40' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-[#2563EB]/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-arabic text-xl font-bold translate-y-[-1px]">ق</span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight">Qur'an Flow</span>
            <p className="text-[10px] text-[#3B82F6] uppercase tracking-wider font-bold opacity-80 -mt-0.5">Platform Edukasi</p>
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
          className="md:hidden p-2 rounded-full bg-[#1E293B]/50 border border-[#334155] hover:bg-[#1E293B] transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between relative">
            <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-left ${menuOpen ? 'rotate-45 translate-y-[-1px]' : ''}`} />
            <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-left ${menuOpen ? '-rotate-45 translate-y-[1px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t-0 m-4 rounded-3xl p-4 flex flex-col gap-2 shadow-2xl animate-fade-in origin-top">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-[#1E293B] rounded-2xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {userName ? (
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
              <div className="px-5 py-2 text-[15px] font-semibold text-white/70">
                Halo, {userName}
              </div>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="px-5 py-3.5 text-[15px] font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 text-center rounded-2xl transition-colors"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn-primary px-5 py-4 text-[15px] text-center mt-2 rounded-2xl"
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
