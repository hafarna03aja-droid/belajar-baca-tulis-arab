# Qur'an Flow 🕌

> Platform edukasi digital untuk belajar menulis dan membaca Hijaiyah secara terstruktur dan interaktif.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | **Next.js 16** (App Router) |
| Styling | **Tailwind CSS v4** |
| Canvas | **HTML5 Canvas API** (pixel-overlap accuracy scoring) |
| Backend/Auth | **Supabase** (Auth + PostgreSQL + Storage) |
| State | **Zustand** (with localStorage persistence) |
| Audio | **Web Speech API** (browser-native Arabic TTS) |
| Fonts | Amiri (Arabic) + Plus Jakarta Sans (UI) |

---

## 📦 Struktur Proyek

```
src/
├── app/
│   ├── page.tsx                        # Landing Page
│   ├── layout.tsx                      # Root Layout + Fonts
│   ├── globals.css                     # Design System
│   ├── auth/login/page.tsx             # Login / Register
│   ├── dashboard/page.tsx              # User Dashboard
│   ├── learn/
│   │   ├── page.tsx                    # Curriculum Roadmap
│   │   ├── writing/[letterId]/page.tsx # Canvas Writing Engine
│   │   └── reading/[letterId]/page.tsx # Flashcard Reading
├── components/
│   └── Navbar.tsx
├── lib/
│   ├── hijaiyah-data.ts                # All 28 letters + curriculum
│   └── supabase/
│       ├── client.ts                   # Browser client
│       └── server.ts                   # Server-side client
├── store/
│   └── learningStore.ts                # Zustand state
supabase/
└── schema.sql                          # Database schema
```

---

## 🚀 Cara Menjalankan Lokal

```bash
# 1. Install dependencies (sudah selesai)
npm install

# 2. Isi Supabase credentials
# Edit .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 3. Jalankan dev server
npm run dev
# → http://localhost:3000
```

---

## ☁️ Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** di dashboard Supabase
3. Copy-paste isi `supabase/schema.sql` dan jalankan
4. Salin URL dan Anon Key dari **Project Settings → API**
5. Isi ke `.env.local`

---

## 🎯 Fitur MVP

### ✍️ Modul Menulis
- **Kanvas tracing interaktif** — gambar huruf dengan mouse/sentuhan
- **Ghost guide** — bayangan huruf sebagai panduan
- **Stroke direction arrow** — titik awal berwarna emas
- **Pixel-overlap accuracy scoring** — skor 0-100% secara otomatis
- **Brush size selector** — pilih ketebalan kuas
- **Celebration animation** — konfeti saat akurasi ≥ 60%
- **Harakat & position forms** view (Fathah/Kasrah/Dhammah/Sukun + Awal/Tengah/Akhir)

### 📖 Modul Membaca
- **3D Flip flashcard** — klik untuk balik kartu dan dengar bunyi
- **Web Speech API** — pengucapan Arab native dari browser
- **Mode Quiz** — tebak nama harakat untuk latihan aktif
- **Harakat selector** — pilih Fathah/Kasrah/Dhammah/Sukun

### 🗺️ Kurikulum
- **6 level** dengan sistem lock (tidak bisa skip level)
- **Visual roadmap** vertikal dengan timeline
- **Letter grid** shortcut ke semua huruf

### 📊 Dashboard
- **Streak counter** harian 🔥
- **Weekly heatmap** aktivitas
- **XP system** per pelajaran
- **Level progress bars**

### 🔐 Auth
- Login / Register via Supabase Auth
- **Demo mode** (bypass login untuk mencoba)

---

## 🎨 Design System

```css
--color-primary:  #1B4332  /* Deep Forest Green */
--color-accent:   #D4A843  /* Warm Gold */
--color-bg:       #FAFAF7  /* Cream White */
--color-text:     #1C1917  /* Charcoal */
```

---

## 📋 Roadmap

- [x] **Fase 1 MVP** — Huruf tunggal (Alif-Ya), harakat dasar, auth
- [ ] **Fase 2** — Huruf bersambung, audio CDN lengkap, XP sync Supabase
- [ ] **Fase 3** — Voice recognition, badges, dark mode, sertifikat digital

---

## 📊 KPI Target

| Metrik | Target |
|---|---|
| Retention Day-7 | > 40% |
| Completion Rate Level 1 | > 60% |
| User Satisfaction | > 4.5/5 ⭐ |
