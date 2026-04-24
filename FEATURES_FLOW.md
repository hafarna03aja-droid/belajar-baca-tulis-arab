# Panduan Fitur & Alur Belajar Qur'an Flow

Dokumen ini menjelaskan alur pengguna (*User Journey*) dan fitur-fitur utama yang tersedia di platform **Qur'an Flow**.

---

## 🚀 1. Alur Pengguna (User Flow)

### Fase A: Penemuan & Onboarding
1.  **Landing Page:** User mengeksplorasi nilai jual aplikasi (tracing interaktif, audio native, & kurikulum terstruktur).
2.  **Autentikasi:** User masuk melalui sistem Login/Daftar atau menggunakan fitur **Akses Tamu (Demo)** untuk langsung mencoba aplikasi.

### Fase B: Monitoring Progres
3.  **Dashboard:** Setelah login, user disambut dengan statistik real-time:
    *   **Streak:** Jumlah hari belajar berturut-turut.
    *   **Total XP:** Poin yang dikumpulkan dari setiap latihan.
    *   **Level Tracker:** Status level saat ini (1-6).
4.  **Peta Perjalanan (Roadmap):** User masuk ke rute belajar linear. Level yang belum dicapai akan terkunci (Locked) secara visual untuk menjaga urutan belajar.

### Fase C: Sesi Belajar Interaktif
5.  **Memilih Modul:** User mengklik modul yang aktif (misal: "Huruf Tunggal").
6.  **Sesi Membaca:** User mendengarkan audio pengucapan yang jernih dan melihat visualisasi harakat.
7.  **Sesi Menulis (Tracing AI):** User menulis langsung di kanvas digital. Sistem menghitung akurasi tarikan garis secara instan menggunakan algoritma deteksi pixel.
8.  **Penyelesaian:** Jika akurasi mencukupi, modul ditandai selesai (✓), XP ditambahkan, dan progres disimpan secara permanen.

---

## ✨ 2. Fitur Unggulan

### ✍️ Kanvas Tracing Cerdas (Smart Tracing)
Bukan sekadar menggambar, fitur ini mendeteksi presisi tulisan user dibandingkan dengan bentuk asli huruf/kata. Dilengkapi dengan:
- **Ghost Guide:** Panduan bayangan huruf untuk membantu pemula.
- **Accuracy Validator:** Algoritma yang memberikan feedback instan (Sempurna / Terus Berlatih).

### 🎧 Audio Native Makhraj
Setiap huruf dan kosa kata dilengkapi dengan audio berkualitas tinggi.
- Mendukung berbagai variasi harakat (Fathah, Kasrah, Dhammah, Sukun).
- Memberikan referensi pengucapan yang tepat sesuai kaidah tajwid.

### 📈 Analitik Belajar Visual
Visualisasi data yang elegan menggunakan gaya desain **Bento Box**:
- Progres bar dinamis untuk setiap level.
- Kartu statistik dengan efek cahaya (*glow*) dan 3D.

---

## 📚 3. Alur Kurikulum (Leveling System)

Kurikulum dirancang mengikuti pedagogi buku Iqro' yang telah diringkas secara efektif:

| Level | Materi Utama | Tujuan Akhir |
| :--- | :--- | :--- |
| **1** | **Huruf Tunggal** | Mengenal Alif s/d Ya secara mandiri. |
| **2** | **Harakat Dasar** | Membaca huruf dengan tanda A, I, U. |
| **3** | **Posisi Sambung** | Mengenal perubahan bentuk huruf di awal, tengah, dan akhir. |
| **4** | **Hukum Mad** | Menguasai bacaan panjang (Mad Ashli & Far'i). |
| **5** | **Baca Kata** | Membaca 100+ kosakata kompleks dengan tajwid lengkap. |
| **6** | **Tulis Kata** | Menulis kata bersambung secara presisi di kanvas AI. |

---

## 🎮 4. Mekanisme Gamifikasi

Untuk menjaga motivasi user, aplikasi menerapkan sistem:
- **XP (Experience Points):** Didapat setiap kali menyelesaikan modul atau mendapatkan akurasi tinggi.
- **Unlock Logic:** Level selanjutnya hanya akan terbuka jika user telah menyelesaikan kuota modul di level sebelumnya (misal: 100 modul untuk Level 5 & 6).
- **Celebration Effect:** Animasi confetti dan pop-up 3D saat user mencapai presisi tinggi atau naik level.
