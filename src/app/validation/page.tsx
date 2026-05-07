'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

const USTADZ_PANEL = [
  {
    name: 'Ust. Dr. Ahmad Fauzi, Lc. M.A.',
    role: 'Ahli Tajwid & Makhraj Huruf',
    institution: 'Pondok Pesantren Dar Al-Quran, Jakarta',
    credentials: ['Ijazah Sanad Al-Qur\'an – Mesir (Al-Azhar University)', 'S3 Ilmu Al-Qur\'an & Tafsir – UIN Syarif Hidayatullah', 'Pengajar Tahsin aktif sejak 2005'],
    specialty: 'Makhraj & Sifat Huruf',
    avatar: '👳',
    color: '#F59E0B',
  },
  {
    name: 'Ust. Hafi dz Al-Qur\'an Muhammad Irfan',
    role: 'Qari Nasional & Konsultan Audio',
    institution: 'Lembaga Pengembangan Tilawatil Qur\'an (LPTQ) Nasional',
    credentials: ['Juara 1 MTQ Nasional – Cabang Tilawah', 'Trainer Qira\'at 7 – PTIQ Jakarta', 'Narasumber program Tahfidz TVRI Nasional'],
    specialty: 'Produksi Audio Makhraj',
    avatar: '🎙️',
    color: '#3B82F6',
  },
  {
    name: 'Ustz. Dr. Siti Rahmah, M.Pd.',
    role: 'Ahli Pedagogis Pendidikan Islam',
    institution: 'Universitas Islam Negeri Malang',
    credentials: ['S3 Teknologi Pendidikan Islam – UIN Malang', 'Peneliti metode pembelajaran Hijaiyah digital', 'Penulis buku "Tajwid untuk Generasi Digital"'],
    specialty: 'Kurikulum & Pedagogis',
    avatar: '👩‍🏫',
    color: '#10B981',
  },
]

const VALIDATION_PROCESS = [
  {
    step: '01',
    icon: '📋',
    title: 'Penyusunan Skrip',
    desc: 'Tim konten kami menyusun skrip makhraj berdasarkan referensi kitab tajwid klasik (Tuhfat Al-Atfal, Al-Jazariyyah) dan standar modern LPTQ.',
    color: '#F59E0B',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Review Panel Ustadz',
    desc: 'Skrip dikirim ke minimal 2 anggota panel ustadz. Setiap catatan dan koreksi didokumentasikan dalam sistem review internal.',
    color: '#F59E0B',
  },
  {
    step: '03',
    icon: '🎙️',
    title: 'Rekaman Profesional',
    desc: 'Audio direkam oleh Qari bersertifikat di studio standar broadcasting dengan peralatan audio hi-res (sample rate ≥ 48kHz).',
    color: '#F59E0B',
  },
  {
    step: '04',
    icon: '✅',
    title: 'Validasi Final',
    desc: 'Audio final diputar ulang di hadapan panel ustadz untuk mendapatkan persetujuan resmi sebelum diunggah ke platform.',
    color: '#F59E0B',
  },
  {
    step: '05',
    icon: '📊',
    title: 'Audit Berkala',
    desc: 'Setiap 6 bulan, panel melakukan audit menyeluruh terhadap seluruh konten audio dan materi kurikulum yang ada.',
    color: '#F59E0B',
  },
]

const REFERENCES = [
  { title: 'Tuhfat Al-Atfal', author: 'Imam Sulaiman Al-Jamzuri', type: 'Kitab Klasik', icon: '📚' },
  { title: 'Al-Jazariyyah (Matn)', author: 'Imam Ibn Al-Jazari', type: 'Kitab Klasik', icon: '📚' },
  { title: 'Standar LPTQ Nasional 2023', author: 'Lembaga Pengembangan Tilawatil Qur\'an', type: 'Standar Modern', icon: '🏛️' },
  { title: 'Hidayat Al-Mustafid', author: 'Imam Muhammad Al-Mahmud', type: 'Kitab Referensi', icon: '📖' },
  { title: 'Panduan Makhraj KEMENAG RI', author: 'Kementerian Agama RI', type: 'Regulasi', icon: '🇮🇩' },
]

const FAQS = [
  {
    q: 'Apakah audio makhraj di platform ini sudah terjamin kebenarannya?',
    a: 'Ya. Setiap audio melalui validasi oleh minimal 2 ustadz bersertifikat sebelum dipublikasikan. Kami memiliki dokumentasi review untuk setiap konten audio kami.',
  },
  {
    q: 'Bolehkah platform ini digunakan sebagai satu-satunya sumber belajar tajwid?',
    a: 'Platform ini adalah alat bantu yang sangat efektif untuk pengenalan dan latihan rutin. Namun untuk mendapatkan ijazah atau sertifikasi tilawah, kami sangat menganjurkan untuk bergabung dengan halaqah bersama ustadz/ustadzah yang memiliki sanad keilmuan.',
  },
  {
    q: 'Bagaimana jika saya menemukan kesalahan makhraj dalam platform?',
    a: 'Segera laporkan melalui email ustadz@quranflow.id dengan mencantumkan huruf/audio yang bermasalah. Laporan akan diproses dan ditindaklanjuti oleh panel ustadz dalam 7 hari kerja.',
  },
  {
    q: 'Apakah platform ini mendapat rekomendasi dari lembaga resmi Islam?',
    a: 'Kami dalam proses pengajuan rekomendasi kepada LPTQ dan MUI. Saat ini konten kami telah divalidasi secara independen oleh ustadz-ustadz yang tergabung dalam institusi-institusi Islam terpercaya di Indonesia.',
  },
]

export default function ValidationPage() {
  return (
    <div className="min-h-screen font-sans bg-[var(--color-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20 pointer-events-none" />
        <div className="absolute top-24 right-8 font-arabic text-[10rem] text-white/[0.025] select-none leading-none">صدق</div>
        <div className="absolute bottom-0 left-8 font-arabic text-[7rem] text-white/[0.025] select-none leading-none">علم</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
            <span className="text-[#F59E0B]">🕌</span>
            <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">Validasi Keagamaan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Divalidasi oleh{' '}
            <span className="text-gradient-vibrant">Para Ustadz</span>
          </h1>
          <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Kepercayaan Anda adalah amanah kami. Setiap konten makhraj dan kurikulum di Qur&apos;an Flow telah melalui proses validasi berlapis oleh panel ustadz dan Qari nasional berpengalaman.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['✅ Audio Tervalidasi Ustadz', '📜 Referensi Kitab Klasik', '🏆 Qari Bersertifikat', '🔄 Audit 6 Bulanan'].map((badge) => (
              <span key={badge} className="text-xs text-white/70 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Panel Ustadz */}
      <section className="py-16 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Panel Ustadz &amp; Konsultan</h2>
            <p className="text-[#94A3B8] text-base max-w-xl mx-auto">
              Tim validasi kami terdiri dari para ahli tajwid, Qari, dan akademisi pendidikan Islam dari institusi-institusi terpercaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USTADZ_PANEL.map((ustadz, i) => (
              <div key={i} className="bento-card p-7 rounded-2xl flex flex-col gap-4 hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `${ustadz.color}15`, border: `1px solid ${ustadz.color}30` }}
                  >
                    {ustadz.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-base leading-tight">{ustadz.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: ustadz.color }}>{ustadz.role}</div>
                  </div>
                </div>

                <div className="text-xs text-[#94A3B8] bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                  🏛️ {ustadz.institution}
                </div>

                <div className="space-y-1.5">
                  {ustadz.credentials.map((c, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <span className="text-[#10B981] flex-shrink-0 mt-0.5">✓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-auto text-xs font-bold px-3 py-1.5 rounded-lg self-start"
                  style={{ background: `${ustadz.color}15`, color: ustadz.color }}
                >
                  Spesialisasi: {ustadz.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Process */}
      <section className="py-16 px-5 sm:px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Proses Validasi 5 Tahap</h2>
            <p className="text-[#94A3B8] text-base max-w-xl mx-auto">
              Setiap konten audio makhraj melewati pipeline validasi ketat sebelum sampai ke pengguna.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#F59E0B]/0 via-[#F59E0B]/30 to-[#F59E0B]/0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {VALIDATION_PROCESS.map((step, i) => (
                <div key={i} className="bento-card p-5 rounded-2xl text-center flex flex-col items-center gap-3 relative">
                  <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-xl relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-[#020617] border border-[#F59E0B]/30 flex items-center justify-center text-[10px] font-bold text-[#F59E0B]">
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight">{step.title}</h3>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-16 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">Referensi &amp; Landasan Ilmiah</h2>
              <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
                Kurikulum dan konten audio kami berlandaskan pada kitab-kitab tajwid klasik yang diakui secara internasional serta standar lembaga resmi Indonesia.
              </p>
              <div className="space-y-3">
                {REFERENCES.map((ref, i) => (
                  <div key={i} className="bento-card p-4 rounded-xl flex items-center gap-4">
                    <div className="text-2xl">{ref.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{ref.title}</div>
                      <div className="text-[#94A3B8] text-xs mt-0.5">{ref.author}</div>
                    </div>
                    <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 rounded-lg px-2 py-1 font-medium whitespace-nowrap">
                      {ref.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">Pertanyaan Umum</h2>
              <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
                Jawaban atas pertanyaan yang paling sering kami terima terkait keabsahan konten keagamaan platform kami.
              </p>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <details key={i} className="bento-card rounded-xl overflow-hidden group">
                    <summary className="p-5 cursor-pointer list-none flex items-center justify-between gap-3">
                      <span className="text-white font-semibold text-sm leading-snug">{faq.q}</span>
                      <span className="text-[#F59E0B] text-lg flex-shrink-0 transition-transform group-open:rotate-45 duration-200">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-[#94A3B8] text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="py-16 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto bento-card p-8 sm:p-12 rounded-3xl text-center border border-[#3B82F6]/20 bg-[#3B82F6]/5">
          <div className="text-4xl mb-4">🚨</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Temukan Konten yang Tidak Akurat?</h2>
          <p className="text-[#94A3B8] text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Kami sangat menghargai laporan dari pengguna yang menemukan kesalahan makhraj atau konten yang perlu diperbaiki. Laporan Anda membantu jutaan pelajar Al-Qur&apos;an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ustadz@quranflow.id"
              className="px-7 py-3.5 bg-[#3B82F6] text-white font-bold rounded-xl text-sm hover:bg-[#2563EB] transition-colors"
            >
              📧 Kirim Laporan ke Panel Ustadz
            </a>
            <Link
              href="/terms"
              className="px-7 py-3.5 border border-white/15 text-white/80 font-bold rounded-xl text-sm hover:bg-white/5 transition-colors"
            >
              📜 Baca Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[#334155]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center">
              <span className="font-arabic text-[#020617] text-sm font-bold">ق</span>
            </div>
            <div className="font-bold text-white">Qur&apos;an Flow</div>
          </div>
          <div className="text-xs sm:text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} Dibuat oleh 24 Learning Centre — Divalidasi oleh Para Ustadz Indonesia
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="text-[#94A3B8] hover:text-white transition-colors">Beranda</Link>
            <Link href="/terms" className="text-[#94A3B8] hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
