'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useState } from 'react'

const CONTACT_CHANNELS = [
  {
    id: 'email-umum',
    icon: '✉️',
    label: 'Email Umum',
    value: 'hello@quranflow.id',
    description: 'Pertanyaan umum, saran, dan masukan seputar platform.',
    href: 'mailto:hello@quranflow.id',
    color: '#3B82F6',
  },
  {
    id: 'email-legal',
    icon: '⚖️',
    label: 'Email Legal',
    value: 'legal@quranflow.id',
    description: 'Pertanyaan terkait Syarat & Ketentuan serta privasi data.',
    href: 'mailto:legal@quranflow.id',
    color: '#F59E0B',
  },
  {
    id: 'email-ustadz',
    icon: '🕌',
    label: 'Email Validasi Ustadz',
    value: 'ustadz@quranflow.id',
    description: 'Laporan konten keagamaan yang perlu diverifikasi ustadz.',
    href: 'mailto:ustadz@quranflow.id',
    color: '#10B981',
  },
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'WhatsApp Admin',
    value: '+62 812-3456-7890',
    description: 'Respons cepat pada hari kerja pukul 08.00 – 17.00 WIB.',
    href: 'https://wa.me/6281234567890',
    color: '#25D366',
  },
]

const FAQ = [
  {
    q: 'Bagaimana cara reset password akun saya?',
    a: 'Kunjungi halaman Login → klik "Lupa Password" → ikuti tautan yang dikirim ke email terdaftar Anda.',
  },
  {
    q: 'Apakah Qur\'an Flow tersedia secara gratis?',
    a: 'Ya! Semua modul inti tersedia gratis. Kami berkomitmen untuk menjaga akses belajar terbuka bagi seluruh masyarakat.',
  },
  {
    q: 'Bagaimana cara melaporkan konten yang tidak akurat?',
    a: 'Kirim email ke ustadz@quranflow.id dengan menyertakan nama huruf / materi yang dimaksud. Tim ustadz kami akan merespons dalam 7 hari kerja.',
  },
  {
    q: 'Apakah data belajar saya aman?',
    a: 'Data disimpan dengan enkripsi standar industri menggunakan Supabase. Kami tidak pernah menjual data pribadi kepada pihak ketiga.',
  },
  {
    q: 'Bagaimana cara berkolaborasi atau bermitra dengan Qur\'an Flow?',
    a: 'Hubungi kami melalui hello@quranflow.id dengan subjek "Kolaborasi". Tim kami akan membalas dalam 3–5 hari kerja.',
  },
]

const TEAM = [
  {
    name: 'Tim Pengembang',
    role: 'Platform & Teknologi',
    icon: '💻',
    desc: 'Bertanggung jawab atas pengembangan fitur, performa, dan keamanan platform.',
    color: '#3B82F6',
  },
  {
    name: 'Tim Konten',
    role: 'Kurikulum & Audio',
    icon: '📖',
    desc: 'Menyusun kurikulum terstruktur dan memastikan audio makhraj berkualitas tinggi.',
    color: '#F59E0B',
  },
  {
    name: 'Panel Ustadz',
    role: 'Validasi Keagamaan',
    icon: '🕌',
    desc: 'Ustadz & Qari bersertifikat yang memvalidasi seluruh konten keagamaan platform.',
    color: '#10B981',
  },
  {
    name: 'Tim Support',
    role: 'Layanan Pengguna',
    icon: '🤝',
    desc: 'Siap membantu pertanyaan, laporan kendala, dan masukan dari pengguna.',
    color: '#A78BFA',
  },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Simulasi pengiriman — integrasikan dengan API/email service sesuai kebutuhan
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen font-sans bg-[var(--color-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
        <div className="absolute top-20 right-10 text-[8rem] font-arabic text-white/[0.03] select-none">تواصل</div>
        <div className="absolute bottom-0 left-10 text-[6rem] font-arabic text-white/[0.03] select-none">سلام</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <span className="text-[#F59E0B] text-lg">📬</span>
            <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">Hubungi Kami</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Ada Pertanyaan? <span className="text-gradient-vibrant">Kami Siap</span> Membantu
          </h1>
          <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Tim Qur&apos;an Flow berkomitmen memberikan respons terbaik untuk setiap pertanyaan, saran,
            dan laporan yang masuk dari komunitas pengguna kami.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-xs text-[#94A3B8] bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              ⏱ Respons dalam 3–5 hari kerja
            </span>
            <span className="text-xs text-[#94A3B8] bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              🌐 24 Learning Centre
            </span>
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-10 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-6">Saluran Kontak</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="bento-card p-6 rounded-2xl flex flex-col gap-3 group cursor-pointer"
                style={{ '--hover-color': ch.color } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${ch.color}18`, border: `1px solid ${ch.color}30` }}
                >
                  {ch.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: ch.color }}>
                    {ch.label}
                  </p>
                  <p className="text-white font-bold text-sm mb-1 break-all">{ch.value}</p>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{ch.description}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span
                    className="text-xs font-semibold transition-colors"
                    style={{ color: ch.color }}
                  >
                    Hubungi →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Team Info */}
      <section className="py-10 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* Contact Form */}
          <div className="bento-card p-7 sm:p-9 rounded-2xl">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-xl flex-shrink-0">
                📝
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Kirim Pesan Langsung</h2>
                <p className="text-xs text-[#94A3B8]">Isi formulir di bawah dan kami akan membalas secepatnya.</p>
              </div>
            </div>

            {sent && (
              <div className="mb-6 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-sm font-semibold animate-fade-in">
                <span className="text-lg">✅</span> Pesan terkirim! Kami akan segera merespons.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="contoh: Ahmad Fauzi"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#F59E0B]/50 focus:bg-[#F59E0B]/5 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="contoh: ahmad@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#F59E0B]/50 focus:bg-[#F59E0B]/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Subjek Pesan *
                </label>
                <select
                  id="contact-subject"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F59E0B]/50 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled>-- Pilih kategori --</option>
                  <option value="pertanyaan-umum">💬 Pertanyaan Umum</option>
                  <option value="laporan-bug">🐛 Laporan Bug / Masalah Teknis</option>
                  <option value="konten-keagamaan">🕌 Laporan Konten Keagamaan</option>
                  <option value="kerjasama">🤝 Kerjasama & Kolaborasi</option>
                  <option value="privasi-data">🔒 Privasi & Data Pengguna</option>
                  <option value="lainnya">📋 Lainnya</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Pesan *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tuliskan pesan Anda di sini dengan jelas..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#F59E0B]/50 focus:bg-[#F59E0B]/5 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F59E0B] text-[#020617] font-bold text-sm rounded-xl hover:bg-[#D97706] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-[#F59E0B]/30"
              >
                Kirim Pesan ✉️
              </button>
            </form>
          </div>

          {/* Tim Kami */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">Tim Kami</p>
              <div className="space-y-4">
                {TEAM.map((t) => (
                  <div key={t.name} className="bento-card p-5 rounded-2xl flex gap-4 items-start">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${t.color}18`, border: `1px solid ${t.color}25` }}
                    >
                      {t.icon}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs font-semibold mb-1" style={{ color: t.color }}>{t.role}</p>
                      <p className="text-[#94A3B8] text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bento-card p-5 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">🕐</span>
                <h3 className="font-bold text-white text-sm">Jam Operasional</h3>
              </div>
              <div className="space-y-2 text-xs text-[#94A3B8]">
                <div className="flex justify-between">
                  <span>Senin – Jumat</span>
                  <span className="text-white font-semibold">08.00 – 17.00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="text-white font-semibold">09.00 – 13.00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu & Hari Raya</span>
                  <span className="text-[#F59E0B] font-semibold">Libur</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-[#94A3B8]">
                  ⚡ Untuk kondisi darurat, kirim email dengan subjek <span className="text-white">[URGENT]</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-5 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-xl flex-shrink-0">
              ❓
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">FAQ</p>
              <h2 className="text-lg font-bold text-white">Pertanyaan yang Sering Diajukan</h2>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`bento-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  openFaq === i ? 'border-[#F59E0B]/30' : ''
                }`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                  <p className="text-sm font-semibold text-white leading-snug">{item.q}</p>
                  <span
                    className={`text-[#F59E0B] text-lg flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 text-[#94A3B8] text-sm leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[#334155]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center">
              <span className="font-arabic text-[#020617] text-sm font-bold">ق</span>
            </div>
            <div className="font-bold text-white tracking-tight">Qur&apos;an Flow</div>
          </div>
          <div className="text-xs sm:text-sm font-medium text-[#94A3B8]">
            © {new Date().getFullYear()} 24 Learning Centre — Dibuat dengan ❤️ untuk umat
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="text-[#94A3B8] hover:text-white transition-colors">Beranda</Link>
            <Link href="/terms" className="text-[#94A3B8] hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/validation" className="text-[#94A3B8] hover:text-white transition-colors">Validasi Ustadz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
