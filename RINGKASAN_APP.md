# Ringkasan Detail Aplikasi: Qur'an Flow 🕌

Qur'an Flow adalah platform edukasi digital premium yang dirancang untuk membantu pengguna belajar membaca dan menulis huruf Hijaiyah secara terstruktur, interaktif, dan modern. Aplikasi ini menggabungkan pedagogi tradisional (seperti metode Iqro') dengan teknologi modern untuk menciptakan pengalaman belajar yang *engaging* dan efektif.

---

## 🛠️ Stack Teknologi

Aplikasi ini dibangun menggunakan teknologi web modern untuk menjamin performa, skalabilitas, dan pengalaman pengguna yang responsif:
- **Frontend / Framework Utama:** Next.js 16 (App Router) dengan TypeScript.
- **Styling:** Tailwind CSS v4 dikombinasikan dengan Vanilla CSS untuk utilitas desain premium (efek *glassmorphism*, bayangan 3D, *mesh gradient*).
- **Interaksi Kanvas:** HTML5 Canvas API terintegrasi dengan algoritma *pixel-overlap* untuk deteksi akurasi tulisan secara langsung.
- **Backend & Database:** Supabase (PostgreSQL, Authentication, dan Storage).
- **State Management:** Zustand dengan persistensi *LocalStorage* untuk mode *offline-first*.
- **Audio:** Browser-native Web Speech API untuk *Text-to-Speech* (TTS) bahasa Arab.
- **Tipografi:** Plus Jakarta Sans untuk antarmuka pengguna (UI) dan Amiri Font khusus untuk teks Arab.

---

## ✨ Fitur Utama

### 1. Modul Menulis Cerdas (*Smart Tracing Canvas*)
Fitur unggulan untuk melatih motorik halus pengguna dalam menulis huruf Arab.
- **Kanvas Interaktif:** Pengguna dapat menggambar langsung menggunakan sentuhan atau *mouse*.
- **Ghost Guide & Stroke Arrow:** Bayangan huruf yang memudar dan panah penunjuk arah coretan (titik emas) membimbing urutan penulisan yang benar.
- **AI Accuracy Scoring:** Menggunakan algoritma deteksi piksel untuk memberikan persentase kemiripan (0-100%) dan *feedback* instan ("Sempurna" atau "Terus Berlatih").
- **Visualisasi Dinamis:** Animasi *confetti* jika mencapai akurasi tinggi dan opsi ketebalan kuas.

### 2. Modul Membaca Interaktif
Membantu penguasaan pengucapan dan identifikasi huruf serta harakat.
- **Flashcard 3D:** Kartu huruf interaktif yang memutar dengan efek 3D saat diklik.
- **Audio Native Makhraj:** Pengucapan jernih untuk setiap huruf dan variasi harakatnya (Fathah, Kasrah, Dhammah, Sukun).
- **Mode Kuis:** Menguji pemahaman pengguna dengan menebak nama harakat secara acak.

### 3. Gamifikasi & Motivasi
- **XP (Experience Points):** Didapatkan setelah menyelesaikan modul atau memperoleh akurasi tinggi.
- **Sistem Level & Unlock:** Modul berikutnya terkunci (*locked*) hingga syarat penyelesaian modul sebelumnya terpenuhi, menjamin rute belajar yang linear.
- **Pencapaian Harian (Streak):** Menghitung hari belajar berturut-turut untuk menjaga motivasi.

### 4. Dashboard & Analitik Visual
- Kartu progres bergaya *Bento Box* dengan desain *glow* 3D.
- Visualisasi status level saat ini, riwayat aktivitas (*heatmap*), total XP, dan total pelajaran yang diselesaikan.

---

## 🚀 Alur Kerja Pengguna (*User Journey*)

1. **Fase Penemuan & Onboarding:**
   - Pengguna disambut *Landing Page* premium yang menonjolkan fitur AI Tracing.
   - Melakukan pendaftaran/login via Supabase Auth atau menggunakan fitur **Mode Tamu (Demo)** untuk langsung mencoba aplikasi tanpa registrasi.

2. **Fase Monitoring (Dashboard):**
   - Masuk ke *Dashboard* melihat statistik progres, XP, dan *streak* harian.
   - Membuka halaman **Roadmap**, sebuah peta vertikal dengan *timeline* untuk memilih level pelajaran.

3. **Fase Sesi Belajar:**
   - **Langkah 1 (Pilih):** Memilih modul yang sedang terbuka (misalnya: Huruf Alif).
   - **Langkah 2 (Membaca):** Melihat representasi huruf, mengklik *flashcard*, mendengarkan audio pengucapan, dan melihat variasi harakat/posisi huruf.
   - **Langkah 3 (Menulis):** Beralih ke mode kanvas untuk mempraktikkan tulisan tangan yang dibimbing sistem.
   - **Langkah 4 (Selesai):** Memperoleh skor, menambahkan XP, dan menyelesaikan modul. Pelajaran berikutnya otomatis terbuka.

---

## 📚 Kurikulum (*Leveling System*)

Terinspirasi dari efektivitas buku Iqro', materi disusun ke dalam 6 Level:
1. **Level 1 (Huruf Tunggal):** Mengenal huruf Alif sampai Ya secara mandiri.
2. **Level 2 (Harakat Dasar):** Mengenal tanda baca Fathah (A), Kasrah (I), Dhammah (U), Sukun (mati).
3. **Level 3 (Posisi Sambung):** Mengenal perubahan bentuk huruf di awal, tengah, dan akhir kata.
4. **Level 4 (Hukum Mad):** Latihan pengucapan vokal panjang (Mad Ashli & Mad Far'i).
5. **Level 5 (Baca Kata):** Berlatih membaca 100+ kosakata yang disambung dengan tajwid lengkap.
6. **Level 6 (Tulis Kata):** Lanjutan menulis rangkaian huruf/kata secara bersambung di kanvas.

---

## 📊 Skema Data & Arsitektur

### 1. Skema Basis Data Leksikal (Frontend Lib)
**A. Huruf (`HijaiyahLetter`)**
- `id`: string (e.g., 'alif')
- `letter`: string (ا)
- `name`: string (Alif)
- `transliteration`: string (a)
- `withFathah`, `withKasrah`, `withDhammah`, `withSukun`: Bentuk huruf beserta kombinasinya.

**B. Kata (`HijaiyahWord`)**
- `id`: string
- `word`: string (e.g., كَتَبَ)
- `letters`: string[] (Komponen huruf)
- `transliteration`: string (kataba)
- `meaning`: string
- `category`: string (Untuk aturan tajwid)

### 2. Skema State / Progres Belajar (Zustand)
Tersimpan di `learningStore.ts` dan di-persist ke localStorage:
- `currentLevel`: Level tertinggi (1-6).
- `completedLessons`: Array dari objek berisi `lessonId` dan `accuracyScore`.
- `totalXP`: Angka integer akumulasi.
- `streakDays`: Hitungan beruntun hari pengguna belajar.

### 3. Arsitektur Map Folder (Next.js)
- `src/app/learn`: Menyimpan struktur kurikulum (`/reading`, `/writing`, `/reading-words`).
- `src/app/dashboard`: Menangani UI progres pengguna.
- `src/components`: UI modular yang *reusable* (Card, Navigasi).
- `src/lib`: Data statis master huruf/kata dan utilitas validasi skor kanvas.
- `src/store`: Logic persistensi Zustand.

---

## 🎨 Desain dan UI/UX Premium
Mengusung palet warna *Deep Forest Green* dipadu aksen *Warm Gold* dan *Cream White* memberikan nuansa elegan dan Islami modern. Desain mengadopsi standar aplikasi papan atas (Apple-style) dengan banyak interaksi mikro animasi (framer-motion), *glow effect*, dan *mesh background* statis untuk mempertahankan estetikanya tanpa mengurangi *performa render*.
