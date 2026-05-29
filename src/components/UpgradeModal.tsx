'use client'

import { useRouter } from 'next/navigation'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  levelId?: number
}

export default function UpgradeModal({ isOpen, onClose, levelId }: UpgradeModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleUpgrade = () => {
    onClose()
    router.push('/pricing')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 max-w-md w-full glass-premium rounded-3xl border border-[#F59E0B]/20 p-8 shadow-[0_0_60px_rgba(245,158,11,0.1)] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/20 transition-all text-sm"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#065F46] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.2)] border border-[#F59E0B]/20">
              👑
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-xs">
              🔒
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold text-white mb-2">
            Konten Premium
          </h3>
          <p className="text-[#CBD5E1] leading-relaxed">
            {levelId
              ? `Level ${levelId} memerlukan akses Premium.`
              : 'Konten ini memerlukan akses Premium.'
            }
            {' '}Unlock semua 6 level kurikulum mulai dari
            <span className="text-[#F59E0B] font-bold"> Rp 29.000/bulan</span>.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: '📖', text: 'Level 2–6 Penuh' },
            { icon: '🎧', text: 'Audio Makhraj' },
            { icon: '✍️', text: 'Tracing AI Kata' },
            { icon: '🏆', text: 'Sertifikat Digital' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-lg">{f.icon}</span>
              <span className="text-[#CBD5E1] text-xs font-semibold">{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <button
            id="btn-upgrade-modal"
            onClick={handleUpgrade}
            className="btn-primary w-full py-4 text-[15px] font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            Lihat Paket Premium ✨
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors font-medium"
          >
            Lanjutkan gratis (Level 1 saja)
          </button>
        </div>
      </div>
    </div>
  )
}
