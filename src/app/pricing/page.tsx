'use client'

import { useState } from 'react'
import { useLearningStore } from '@/store/learningStore'
import { useSubscription } from '@/lib/useSubscription'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any
  }
}

const PLANS = [
  {
    id: 'free',
    name: 'Gratis',
    icon: '🌱',
    price: 'Rp 0',
    period: 'selamanya',
    color: 'from-slate-700 to-slate-800',
    borderColor: 'border-white/10',
    badge: null,
    features: [
      '✅ Level 1 — Huruf Tunggal',
      '✅ Tracing AI huruf Alif–Ya',
      '✅ Audio makhraj huruf',
      '✅ Dashboard progres',
      '❌ Level 2–6 terkunci',
      '❌ Semua modul kata & tajwid',
    ],
    cta: 'Mulai Gratis',
    ctaHref: '/learn',
    isPrimary: false,
  },
  {
    id: 'monthly',
    name: 'Premium',
    icon: '✨',
    price: 'Rp 29.000',
    period: 'per bulan',
    color: 'from-[#064E3B] to-[#065F46]',
    borderColor: 'border-[#F59E0B]/40',
    badge: 'POPULER',
    features: [
      '✅ Semua Level 1–6',
      '✅ Tracing AI huruf & kata',
      '✅ 100+ kosakata tajwid',
      '✅ Hukum Mad & posisi huruf',
      '✅ Kuis harakat & flashcard 3D',
      '✅ Sertifikat digital',
    ],
    cta: 'Mulai Premium',
    ctaHref: null,
    isPrimary: true,
  },
  {
    id: 'yearly',
    name: 'Premium Tahunan',
    icon: '👑',
    price: 'Rp 199.000',
    period: 'per tahun',
    color: 'from-[#78350F] to-[#92400E]',
    borderColor: 'border-[#F59E0B]/30',
    badge: 'HEMAT 43%',
    features: [
      '✅ Semua fitur Premium',
      '✅ Akses 12 bulan penuh',
      '✅ Badge eksklusif "Huffaz"',
      '✅ Prioritas fitur baru',
      '✅ Hemat Rp 149.000/tahun',
      '✅ Sertifikat atas nama pribadi',
    ],
    cta: 'Pilih Tahunan',
    ctaHref: null,
    isPrimary: false,
  },
]

export default function PricingPage() {
  const { userId, userName } = useLearningStore()
  const { isPremium, subscription, isLoading } = useSubscription()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async (planId: 'monthly' | 'yearly') => {
    if (!userId) {
      window.location.href = '/auth/login?redirect=/pricing'
      return
    }

    setLoadingPlan(planId)
    setError(null)

    try {
      // Ambil session token dari Supabase
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        window.location.href = '/auth/login?redirect=/pricing'
        return
      }

      // Panggil Supabase Edge Function (bukan Next.js API route)
      const edgeFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/payment-create`

      const res = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify({ planType: planId }),
      })

      const data = await res.json()

      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Gagal memproses pembayaran')
      }

      // Buka Midtrans Snap popup
      window.snap.pay(data.token, {
        onSuccess: () => {
          window.location.href = '/dashboard?payment=success'
        },
        onPending: () => {
          window.location.href = '/dashboard?payment=pending'
        },
        onError: () => {
          setError('Pembayaran gagal. Silakan coba lagi.')
          setLoadingPlan(null)
        },
        onClose: () => {
          setLoadingPlan(null)
        },
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-sm font-bold tracking-widest uppercase mb-6">
            <span>✨</span> Buka Potensi Penuh
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Pilih Paket{' '}
            <span className="text-gradient-vibrant">Premium</span>
          </h1>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto font-medium">
            Kuasai baca-tulis Al-Qur&apos;an dari nol hingga mahir. Akses semua 6 level kurikulum, 100+ kosakata tajwid, dan sertifikat digital.
          </p>
        </div>

        {/* Status Premium Banner */}
        {!isLoading && isPremium && subscription && (
          <div className="mb-10 glass-premium rounded-2xl p-5 border border-[#10B981]/30 flex items-center gap-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center text-2xl flex-shrink-0">
              👑
            </div>
            <div>
              <p className="text-white font-bold text-lg">Kamu sudah Premium!</p>
              <p className="text-[#CBD5E1] text-sm">
                Paket {subscription.planType === 'monthly' ? 'Bulanan' : 'Tahunan'} aktif hingga{' '}
                <span className="text-[#F59E0B] font-semibold">
                  {subscription.endDate
                    ? new Date(subscription.endDate).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })
                    : '-'}
                </span>
              </p>
            </div>
            <Link href="/learn" className="ml-auto btn-primary px-6 py-2.5 text-sm flex-shrink-0">
              Belajar Sekarang →
            </Link>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, idx) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border ${plan.borderColor} overflow-hidden transition-all duration-300 animate-fade-in ${plan.isPrimary ? 'shadow-[0_0_40px_rgba(245,158,11,0.15)] scale-[1.03]' : 'opacity-90 hover:opacity-100'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30`} />

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F59E0B] text-[#020617] text-[10px] font-extrabold tracking-widest uppercase z-10">
                  {plan.badge}
                </div>
              )}

              <div className="relative z-10 p-7 flex flex-col h-full">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                    {plan.icon}
                  </div>
                  <div>
                    <p className="text-[#CBD5E1] text-xs font-bold uppercase tracking-widest">{plan.name}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  </div>
                  <p className="text-[#94A3B8] text-sm mt-1">{plan.period}</p>
                  {plan.id === 'yearly' && (
                    <p className="text-[#F59E0B] text-xs font-bold mt-1">≈ Rp 16.583/bulan</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-[14px] text-[#CBD5E1] font-medium">
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.ctaHref ? (
                  <Link
                    href={plan.ctaHref}
                    id={`btn-plan-${plan.id}`}
                    className="w-full text-center py-3.5 rounded-full text-[15px] font-bold transition-all border border-white/20 text-white hover:bg-white/10"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    id={`btn-plan-${plan.id}`}
                    onClick={() => handleUpgrade(plan.id as 'monthly' | 'yearly')}
                    disabled={loadingPlan !== null || isPremium}
                    className={`w-full py-3.5 rounded-full text-[15px] font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${plan.isPrimary
                        ? 'btn-primary shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'border border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/10'
                      }`}
                  >
                    {loadingPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Memproses...
                      </span>
                    ) : isPremium ? '✓ Aktif' : plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="text-center mb-12">
          <p className="text-[#64748B] text-sm mb-4 font-medium">Metode pembayaran yang tersedia</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-[#94A3B8]">
            {['QRIS', 'GoPay', 'OVO', 'Dana', 'ShopeePay', 'BCA', 'BNI', 'BRI', 'Mandiri', 'Indomaret', 'Alfamart'].map(m => (
              <span key={m} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">{m}</span>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="glass-premium rounded-3xl p-8 border border-white/5">
          <h2 className="text-xl font-extrabold text-white mb-6 text-center">Pertanyaan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Apakah Level 1 benar-benar gratis?', a: 'Ya! Level 1 (28 huruf Hijaiyah) bisa diakses sepenuhnya tanpa biaya, tanpa batas waktu.' },
              { q: 'Bisakah belajar tanpa internet?', a: 'Progress disimpan lokal di browser, tapi audio dan sinkronisasi butuh koneksi internet.' },
              { q: 'Bagaimana jika pembayaran gagal?', a: 'Kamu tidak akan dikenakan biaya. Coba ulangi atau hubungi kami via halaman kontak.' },
              { q: 'Apakah bisa upgrade dari bulanan ke tahunan?', a: 'Bisa! Sisa masa aktif akan diperhitungkan saat upgrade ke paket tahunan.' },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-white font-bold text-sm mb-2">{faq.q}</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
