# Dokumentasi Struktur & Skema Qur'an Flow

Dokumen ini menjelaskan arsitektur teknis, skema data, dan struktur proyek dari platform edukasi **Qur'an Flow**.

## 🛠️ Stack Teknologi
- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (Premium Custom Utilities)
- **State Management:** Zustand (dengan persistensi LocalStorage)
- **Database/Auth:** Supabase (Client-side integration)
- **Icons/Fonts:** Plus Jakarta Sans & Amiri (Arabic Font)

---

## 📂 Struktur Proyek (Directory Structure)

```text
quran-flow/
├── public/                 # Aset statis (gambar, logo, dll)
├── src/
│   ├── app/                # Next.js App Router (Halaman & Rute)
│   │   ├── auth/           # Sistem Login & Registrasi
│   │   ├── dashboard/      # Panel progres user
│   │   ├── learn/          # Inti kurikulum (Roadmap & Pelajaran)
│   │   │   ├── reading/    # Modul baca huruf tunggal
│   │   │   ├── writing/    # Modul tulis huruf tunggal
│   │   │   ├── reading-words/ # Modul baca kata (Iqro Style)
│   │   │   └── writing-words/ # Modul tulis kata (Tracing AI)
│   │   ├── globals.css     # Desain sistem & utilitas premium
│   │   ├── layout.tsx      # Kerangka utama aplikasi
│   │   └── page.tsx        # Landing Page (Beranda)
│   ├── components/         # Komponen UI Reusable (Navbar, Card, dll)
│   ├── lib/                # Dataset & Utilitas Logic
│   │   ├── hijaiyah-data.ts # Master data huruf & harakat
│   │   └── words-data.ts    # Database 100+ kata (Tajwid)
│   └── store/              # State Management (Zustand)
│       └── learningStore.ts # Logika progres & leveling user
├── .env.local              # Konfigurasi Environment (Supabase Keys)
└── package.json            # Dependensi proyek
```

---

## 📊 Skema Data (Data Schema)

### 1. Skema Huruf (`HijaiyahLetter`)
Didefinisikan di `src/lib/hijaiyah-data.ts`:
```typescript
interface HijaiyahLetter {
  id: string;          // Identifier unik (misal: 'alif')
  letter: string;      // Karakter Arab asli (ا)
  name: string;        // Nama huruf (Alif)
  transliteration: string; // Cara baca (a)
  withFathah: string;  // Bentuk dengan harakat fathah
  withKasrah: string;  // Bentuk dengan harakat kasrah
  withDhammah: string; // Bentuk dengan harakat dhammah
  withSukun: string;   // Bentuk sukun
}
```

### 2. Skema Kata (`HijaiyahWord`)
Didefinisikan di `src/lib/words-data.ts`:
```typescript
interface HijaiyahWord {
  id: string;          // ID unik
  word: string;        // Kata Arab bersambung (كَتَبَ)
  letters: string[];   // Komponen huruf pembentuk
  transliteration: string; // Cara baca (kataba)
  meaning: string;     // Arti kata (Menulis)
  category: string;    // Kategori Tajwid (Mad, Tasydid, dll)
}
```

### 3. Skema Level Kurikulum
```typescript
interface CurriculumLevel {
  id: number;          // 1 s/d 6
  phase: string;       // Nama fase internal
  title: string;       // Judul di UI
  description: string; // Penjelasan level
  icon: string;        // Emoji/Icon
  totalLessons: number;// Jumlah modul dalam level ini
  color: string;       // Warna tema level
  path: string;        // Rute navigasi
}
```

---

## 🧠 State Management (Learning Store)

Aplikasi menggunakan Zustand untuk melacak kemajuan belajar user secara *offline-first*.

**Data yang Disimpan:**
- `currentLevel`: Level tertinggi yang sedang ditempuh (1-6).
- `completedLessons`: Record dari seluruh pelajaran yang telah diselesaikan.
  - `lessonId`: Kombinasi level dan ID materi (contoh: `1-alif`, `5-kataba`).
  - `accuracyScore`: Skor akurasi tracing/quiz (0-100).
- `totalXP`: Akumulasi poin pengalaman user.
- `streakDays`: Jumlah hari berturut-turut user belajar.

---

## 🎨 Desain Sistem (CSS Schema)

Aplikasi menggunakan utilitas CSS custom di `globals.css` untuk estetika premium:
- `.glass-premium`: Efek kaca transparan (Apple-style).
- `.shadow-3d`: Bayangan berlapis untuk efek kedalaman.
- `.text-gradient-vibrant`: Gradasi teks multi-warna profesional.
- `.mesh-bg`: Background mesh cinematic yang dinamis.
