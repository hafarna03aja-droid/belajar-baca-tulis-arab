'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const supabase = createClient()

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        })
        if (error) throw error
        setSuccess('Akun berhasil dibuat! Cek emailmu untuk verifikasi, lalu login.')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-[#FDFDFB] font-sans">
      {/* Left panel - Cinematic branding */}
      <div className="hidden lg:flex flex-1 mesh-bg flex-col items-center justify-center p-16 relative overflow-hidden text-center rounded-r-[3rem] shadow-[10px_0_40px_rgba(2,44,34,0.15)] z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        {['ا', 'ب', 'ت', 'ج', 'ح', 'خ', 'س', 'ش'].map((l, i) => (
          <div
            key={i}
            className="absolute font-arabic text-white/[0.03] select-none pointer-events-none"
            style={{
              left: `${(i * 29) % 90}%`,
              top: `${(i * 23) % 90}%`,
              fontSize: `${4 + (i % 4)}rem`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {l}
          </div>
        ))}

        <div className="relative z-10 text-white animate-fade-in flex flex-col items-center">
          <div className="font-arabic text-8xl mb-8 animate-float text-[#D97706]/90 drop-shadow-[0_0_30px_rgba(217,119,6,0.5)]">بسم الله</div>
          <h2 className="text-4xl font-extrabold mb-5 tracking-tight">Qur&apos;an Flow</h2>
          <p className="text-white/70 max-w-sm leading-relaxed text-lg font-medium">
            Platform edukasi paling mewah untuk menguasai baca tulis Hijaiyah secara presisi.
          </p>

          <div className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 grid grid-cols-3 gap-10 shadow-2xl">
            {[
              { num: '28', label: 'Huruf' },
              { num: '6', label: 'Tingkatan' },
              { num: '∞', label: 'Akses' },
            ].map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-3xl font-extrabold text-[#D97706] mb-1 group-hover:scale-110 transition-transform">{s.num}</div>
                <div className="text-xs text-white/50 tracking-widest uppercase font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Pristine Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FDFDFB]">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Logo */}
          <Link href="/" className="flex justify-center mb-12 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] flex items-center justify-center shadow-xl shadow-[#064E3B]/20 group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-arabic text-3xl font-bold translate-y-[-1px]">ق</span>
            </div>
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
              {isLogin ? 'Selamat Datang' : 'Mulai Perjalanan'}
            </h1>
            <p className="text-[15px] font-medium text-[#64748B]">
              {isLogin
                ? 'Lanjutkan progres belajar mengaji Anda hari ini.'
                : 'Buat akun dalam detik demi penguasaan seumur hidup.'}
            </p>
          </div>

          {/* Minimalist Toggle */}
          <div className="flex bg-[#F1F5F9] rounded-xl p-1 mb-8 shadow-inner relative">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out z-0"
              style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${isLogin ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${!isLogin ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-[#0F172A] mb-2 block uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Hafiz / Hafizah"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#E2E8F0] bg-white text-[#0F172A] font-medium placeholder:text-[#94A3B8] focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 transition-all text-[15px]"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#0F172A] mb-2 block uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-5 py-4 rounded-xl border-2 border-[#E2E8F0] bg-white text-[#0F172A] font-medium placeholder:text-[#94A3B8] focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 transition-all text-[15px]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#0F172A] mb-2 block uppercase tracking-wider flex justify-between">
                Password
                {isLogin && <span className="text-[#64748B] hover:text-[#064E3B] cursor-pointer normal-case tracking-normal hover:underline">Lupa?</span>}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kombinasi rahasia"
                className="w-full px-5 py-4 rounded-xl border-2 border-[#E2E8F0] bg-white text-[#0F172A] font-medium placeholder:text-[#94A3B8] focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 transition-all text-[15px]"
                minLength={8}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-semibold px-5 py-4 rounded-xl border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}
            {success && (
              <div className="bg-[#064E3B]/5 text-[#064E3B] text-sm font-semibold px-5 py-4 rounded-xl border border-[#064E3B]/20 flex items-center gap-2">
                <span>✨</span> {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-[15px] mt-4 disabled:opacity-60 disabled:shadow-none"
            >
              {loading ? 'Memproses...' : isLogin ? 'Masuk ke Beranda' : 'Buat Akun Gratis'}
            </button>
          </form>

          {/* Elegant Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E2E8F0]" />
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Atau</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E2E8F0]" />
          </div>

          {/* Demo Login CTA */}
          <button
            onClick={handleDemoLogin}
            className="w-full py-4 text-[15px] font-bold border-2 border-[#E2E8F0] bg-white shadow-sm text-[#0F172A] rounded-xl hover:border-[#D97706] hover:text-[#D97706] transition-all"
          >
            Akses Sebagai Tamu (Demo)
          </button>
        </div>
      </div>
    </div>
  )
}
