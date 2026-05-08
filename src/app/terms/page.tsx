'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useState } from 'react'

const SECTIONS = [
  {
    id: 'pengantar',
    icon: '📜',
    title: '1. Pengantar & Penerimaan',
    content: `Selamat datang di Qur'an Flow ("Platform", "Kami", "Layanan"). Dengan mengakses atau menggunakan platform kami di quranflow.id, Anda ("Pengguna") menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan yang termuat dalam Syarat dan Ketentuan ini.

Layanan ini dikembangkan oleh 24 Learning Centre sebagai platform edukasi digital untuk membantu masyarakat belajar membaca dan menulis huruf Hijaiyah Al-Qur'an secara terstruktur, interaktif, dan berbasis sains pedagogis.

Jika Anda tidak menyetujui ketentuan ini, mohon hentikan penggunaan layanan kami.`
  },
  {
    id: 'layanan',
    icon: '🎓',
    title: '2. Deskripsi Layanan',
    content: `Qur'an Flow menyediakan:

• Kanvas tracing interaktif untuk latihan menulis huruf Hijaiyah dengan algoritma penilaian akurasi real-time
• Audio makhraj (pengucapan) yang direkam oleh Qari/Ustadz tervalidasi untuk 28 huruf Hijaiyah beserta harakatnya
• Kurikulum terstruktur mulai dari huruf tunggal hingga huruf bersambung (posisi awal, tengah, akhir)
• Sistem level progresif dengan XP, streak harian, dan analitik belajar personal
• Akses gratis untuk semua modul inti platform

Platform ini bersifat edukatif dan bukan pengganti bimbingan langsung dari guru/ustadz yang berwenang dalam hal-hal yang memerlukan penilaian individual.`
  },
  {
    id: 'akun',
    icon: '👤',
    title: '3. Pendaftaran & Akun Pengguna',
    content: `3.1 Eligibilitas: Layanan ini terbuka untuk semua usia. Pengguna di bawah 13 tahun disarankan menggunakan platform di bawah pengawasan orang tua/wali.

3.2 Akurasi Data: Anda bertanggung jawab menyediakan informasi pendaftaran yang akurat dan menjaga kerahasiaan kredensial akun Anda.

3.3 Keamanan Akun: Segera laporkan kepada kami jika terdapat penggunaan akun tanpa izin. Kami tidak bertanggung jawab atas kerugian akibat kegagalan menjaga kerahasiaan akun.

3.4 Satu Akun: Setiap individu hanya diperkenankan memiliki satu akun aktif. Pembuatan akun ganda untuk tujuan manipulasi sistem dilarang.`
  },
  {
    id: 'konten',
    icon: '📖',
    title: '4. Konten & Hak Kekayaan Intelektual',
    content: `4.1 Kepemilikan: Seluruh konten platform — termasuk materi kurikulum, audio makhraj, algoritma penilaian, desain UI, dan teks edukatif — adalah milik 24 Learning Centre atau mitra konten kami dan dilindungi hukum hak cipta Indonesia.

4.2 Konten Al-Qur'an: Teks dan audio yang bersumber dari Al-Qur'an Al-Karim ditampilkan semata-mata untuk tujuan edukasi. Kami berkomitmen terhadap akurasi dan menghormati kesucian Al-Qur'an dalam setiap aspek penyajiannya.

4.3 Lisensi Terbatas: Kami memberikan Anda lisensi non-eksklusif, tidak dapat dipindahtangankan, untuk mengakses dan menggunakan layanan secara personal dan non-komersial.

4.4 Larangan: Dilarang menyalin, mendistribusikan, memodifikasi, atau menggunakan konten kami untuk tujuan komersial tanpa izin tertulis dari kami.`
  },
  {
    id: 'privasi',
    icon: '🔒',
    title: '5. Privasi & Perlindungan Data',
    content: `5.1 Pengumpulan Data: Kami mengumpulkan data yang diperlukan untuk fungsi platform: nama, email, data progres belajar, dan statistik penggunaan anonim.

5.2 Penggunaan Data: Data Anda digunakan untuk: personalisasi pengalaman belajar, perbaikan algoritma, analitik agregat, dan komunikasi terkait layanan.

5.3 Keamanan: Data disimpan menggunakan layanan Supabase dengan enkripsi standar industri. Kami tidak menjual data pribadi Anda kepada pihak ketiga.

5.4 Hak Pengguna: Anda berhak meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi tim kami.

5.5 Cookie: Platform menggunakan cookie sesi untuk autentikasi. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun ini dapat mempengaruhi fungsionalitas platform.`
  },
  {
    id: 'perilaku',
    icon: '🤝',
    title: '6. Ketentuan Penggunaan',
    content: `Pengguna dilarang:

• Menggunakan platform untuk tujuan selain edukasi Hijaiyah
• Mengunggah konten yang tidak pantas, menyesatkan, atau melanggar hukum
• Mencoba meretas, merusak, atau mengganggu sistem platform
• Menyebarkan informasi yang salah tentang ajaran Islam menggunakan nama platform kami
• Mengklaim sebagai perwakilan resmi Qur'an Flow tanpa otorisasi
• Menggunakan bot, scraper, atau alat otomatis untuk mengakses konten platform

Pelanggaran dapat berakibat pada penangguhan atau penghapusan akun permanen.`
  },
  {
    id: 'validasi',
    icon: '🕌',
    title: '7. Validasi Keagamaan & Akurasi Makhraj',
    content: `Qur'an Flow berkomitmen penuh terhadap akurasi konten keagamaan:

7.1 Panel Ustadz: Konten audio makhraj dan materi kurikulum kami divalidasi oleh Panel Ustadz & Qari yang terdiri dari ustadz-ustadz bersertifikat dalam ilmu tajwid dan tahsin.

7.2 Proses Validasi: Setiap audio rekaman melalui proses review berlapis oleh minimal dua ustadz sebelum dipublikasikan ke platform.

7.3 Pembaruan Berkala: Kami melakukan audit konten keagamaan secara berkala untuk memastikan akurasi yang berkelanjutan.

7.4 Pelaporan: Jika Anda menemukan ketidakakuratan dalam konten keagamaan kami, segera laporkan melalui fitur pelaporan atau email ke tim kami. Laporan akan ditindaklanjuti dalam 7 hari kerja.

7.5 Disclaimer Keagamaan: Platform ini adalah alat bantu belajar. Untuk certifikasi tilawah atau ijazah Al-Qur'an, silakan bergabung dengan halaqah yang dipimpin oleh ustadz/ustadzah yang memiliki sanad keilmuan yang jelas.`
  },
  {
    id: 'tanggung-jawab',
    icon: '⚖️',
    title: '8. Batasan Tanggung Jawab',
    content: `8.1 Layanan Apa Adanya: Layanan disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak menjamin bahwa layanan akan bebas dari gangguan atau kesalahan teknis.

8.2 Tidak Ada Jaminan Hasil: Kemajuan belajar bergantung pada usaha dan dedikasi masing-masing pengguna. Kami tidak menjamin tingkat kemahiran tertentu dalam jangka waktu tertentu.

8.3 Kerugian Tidak Langsung: Kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan platform.

8.4 Force Majeure: Kami tidak bertanggung jawab atas gangguan layanan akibat kejadian di luar kendali kami (bencana alam, gangguan infrastruktur internet, dll).`
  },
  {
    id: 'perubahan',
    icon: '📝',
    title: '9. Perubahan Ketentuan',
    content: `Kami berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan material akan diberitahukan melalui:

• Notifikasi email ke alamat yang terdaftar
• Banner pemberitahuan di halaman utama platform
• Pembaruan tanggal "Terakhir Diperbarui" di bagian bawah halaman ini

Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan Anda terhadap ketentuan yang baru.`
  },
  {
    id: 'hukum',
    icon: '🏛️',
    title: '10. Hukum yang Berlaku',
    content: `Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui musyawarah mufakat. Apabila tidak tercapai kesepakatan, sengketa akan diselesaikan melalui Pengadilan Negeri yang berwenang di Indonesia.`
  },
  {
    id: 'kontak',
    icon: '📩',
    title: '11. Hubungi Kami',
    content: `Jika Anda memiliki pertanyaan, saran, atau keluhan terkait Syarat dan Ketentuan ini, silakan hubungi kami:

• Email: legal@quranflow.id
• Organisasi: 24 Learning Centre
• Waktu Respons: 3-5 hari kerja

Untuk laporan konten keagamaan yang tidak akurat, gunakan email: ustadz@quranflow.id`
  }
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('pengantar')

  return (
    <div className="min-h-screen font-sans bg-[var(--color-bg)]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
        <div className="absolute top-20 right-10 text-[8rem] font-arabic text-white/[0.03] select-none">عدل</div>
        <div className="absolute bottom-0 left-10 text-[6rem] font-arabic text-white/[0.03] select-none">حق</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <span className="text-[#F59E0B] text-lg">📜</span>
            <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">Dokumen Legal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Syarat &amp; <span className="text-gradient-vibrant">Ketentuan</span>
          </h1>
          <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dengan menggunakan Qur&apos;an Flow, Anda setuju dengan ketentuan berikut yang dibuat untuk melindungi hak dan kepercayaan seluruh pengguna kami.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-xs text-[#94A3B8] bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              📅 Terakhir diperbarui: 25 April 2026
            </span>
            <span className="text-xs text-[#94A3B8] bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              🌐 Berlaku di seluruh Indonesia
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-5 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

            {/* Sidebar Nav */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 bento-card p-4 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4 px-2">Daftar Isi</p>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                        ${activeSection === section.id
                          ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/20'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <span className="text-base">{section.icon}</span>
                      <span className="leading-tight">{section.title.replace(/^\d+\.\s/, '')}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <main className="space-y-6">
              {SECTIONS.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bento-card p-7 sm:p-9 rounded-2xl scroll-mt-28 hover:border-white/15 transition-all duration-300"
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-xl flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">{section.title}</h2>
                  </div>
                  <div className="text-[#94A3B8] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}

              {/* Signature / Closing */}
              <div className="bento-card p-7 sm:p-9 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✅</span>
                  <h2 className="text-lg font-bold text-white">Persetujuan Digital</h2>
                </div>
                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-5">
                  Dengan mendaftar dan menggunakan layanan Qur&apos;an Flow, Anda secara elektronik menyatakan persetujuan terhadap seluruh Syarat dan Ketentuan di atas, sebagaimana diakui berdasarkan Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) Republik Indonesia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Link
                    href="/auth/login"
                    className="px-6 py-3 bg-[#F59E0B] text-[#020617] font-bold rounded-xl text-sm hover:bg-[#D97706] transition-colors"
                  >
                    Saya Setuju — Mulai Belajar →
                  </Link>
                  <Link
                    href="/validation"
                    className="text-sm text-[#3B82F6] hover:text-white transition-colors underline underline-offset-2"
                  >
                    Lihat Validasi Ustadz kami →
                  </Link>
                </div>
              </div>
            </main>
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
            © {new Date().getFullYear()} Di buat oleh 24 Learning Centre — Dokumen ini berlaku sejak 25 April 2026
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="text-[#94A3B8] hover:text-white transition-colors">Beranda</Link>
            <Link href="/validation" className="text-[#94A3B8] hover:text-white transition-colors">Validasi Ustadz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
