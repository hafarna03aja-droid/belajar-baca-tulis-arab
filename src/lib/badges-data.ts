/**
 * Qur'an Flow — Badge System Data
 * Definisi semua 20 lencana pencapaian dalam platform.
 */

export interface Badge {
  id: string
  name: string
  nameAr?: string
  description: string
  icon: string
  category: 'xp' | 'streak' | 'mastery' | 'accuracy' | 'special'
  /** Warna gradient untuk kartu badge */
  color: string
  /** Warna glow saat hover */
  glow: string
  /** Cek apakah badge ini sudah unlock berdasarkan state */
  condition: (state: BadgeCheckState) => boolean
}

export interface BadgeCheckState {
  totalXP: number
  streakDays: number
  completedLessonsCount: number
  currentLevel: number
  avgAccuracy: number
  level1Done: boolean
  level2Done: boolean
  level3Done: boolean
  level4Done: boolean
  level5Done: boolean
  level6Done: boolean
}

export const ALL_BADGES: Badge[] = [
  // ─── XP Milestones ────────────────────────────────
  {
    id: 'xp_100',
    name: 'Pemula Bersemangat',
    nameAr: 'المبتدئ',
    description: 'Kumpulkan 100 XP pertamamu.',
    icon: '⚡',
    category: 'xp',
    color: 'from-yellow-500/20 to-amber-600/20',
    glow: 'shadow-yellow-500/30',
    condition: (s) => s.totalXP >= 100,
  },
  {
    id: 'xp_500',
    name: 'Pelajar Tekun',
    nameAr: 'المجتهد',
    description: 'Kumpulkan 500 XP dengan konsistensi tinggi.',
    icon: '🌟',
    category: 'xp',
    color: 'from-amber-400/20 to-orange-500/20',
    glow: 'shadow-amber-400/30',
    condition: (s) => s.totalXP >= 500,
  },
  {
    id: 'xp_1000',
    name: 'Santri Berprestasi',
    nameAr: 'الطالب المتفوق',
    description: 'Capai 1.000 XP — dedikasi luar biasa!',
    icon: '🏅',
    category: 'xp',
    color: 'from-orange-400/20 to-red-500/20',
    glow: 'shadow-orange-400/30',
    condition: (s) => s.totalXP >= 1000,
  },
  {
    id: 'xp_5000',
    name: 'Ahli Hijaiyah',
    nameAr: 'خبير الهجائية',
    description: 'Kumpulkan 5.000 XP — level master sejati.',
    icon: '👑',
    category: 'xp',
    color: 'from-yellow-300/20 to-yellow-600/20',
    glow: 'shadow-yellow-300/40',
    condition: (s) => s.totalXP >= 5000,
  },

  // ─── Streak ────────────────────────────────────────
  {
    id: 'streak_3',
    name: 'Tiga Hari Berturut',
    nameAr: 'ثلاثة أيام',
    description: 'Belajar 3 hari berturut-turut tanpa putus.',
    icon: '🔥',
    category: 'streak',
    color: 'from-red-500/20 to-orange-500/20',
    glow: 'shadow-red-500/30',
    condition: (s) => s.streakDays >= 3,
  },
  {
    id: 'streak_7',
    name: 'Pendekar Sepekan',
    nameAr: 'أسبوع متواصل',
    description: 'Belajar tanpa henti selama 7 hari penuh.',
    icon: '🗓️',
    category: 'streak',
    color: 'from-red-600/20 to-pink-500/20',
    glow: 'shadow-red-600/30',
    condition: (s) => s.streakDays >= 7,
  },
  {
    id: 'streak_30',
    name: 'Istiqomah Sejati',
    nameAr: 'الاستقامة الحقيقية',
    description: 'Menjaga konsistensi belajar 30 hari berturut-turut.',
    icon: '💎',
    category: 'streak',
    color: 'from-purple-500/20 to-pink-500/20',
    glow: 'shadow-purple-500/40',
    condition: (s) => s.streakDays >= 30,
  },

  // ─── Level Mastery ─────────────────────────────────
  {
    id: 'level1_done',
    name: 'Penguasa Huruf Tunggal',
    nameAr: 'سيد الحروف المفردة',
    description: 'Selesaikan seluruh pelajaran Level 1: Pondasi.',
    icon: '✍️',
    category: 'mastery',
    color: 'from-blue-500/20 to-cyan-500/20',
    glow: 'shadow-blue-500/30',
    condition: (s) => s.level1Done,
  },
  {
    id: 'level2_done',
    name: 'Maestro Harakat',
    nameAr: 'ماهر الحركات',
    description: 'Kuasai semua tanda baca di Level 2: Harakat Dasar.',
    icon: '🗣️',
    category: 'mastery',
    color: 'from-sky-500/20 to-blue-500/20',
    glow: 'shadow-sky-500/30',
    condition: (s) => s.level2Done,
  },
  {
    id: 'level3_done',
    name: 'Ahli Transformasi',
    nameAr: 'خبير التحويل',
    description: 'Pahami perubahan bentuk huruf di Level 3.',
    icon: '🧩',
    category: 'mastery',
    color: 'from-amber-500/20 to-yellow-400/20',
    glow: 'shadow-amber-500/30',
    condition: (s) => s.level3Done,
  },
  {
    id: 'level4_done',
    name: 'Pembaca Terampil',
    nameAr: 'القارئ الماهر',
    description: 'Selesaikan Level 4: Membaca Lanjut dengan sukses.',
    icon: '🌊',
    category: 'mastery',
    color: 'from-teal-500/20 to-emerald-500/20',
    glow: 'shadow-teal-500/30',
    condition: (s) => s.level4Done,
  },
  {
    id: 'level5_done',
    name: 'Pembaca Kata',
    nameAr: 'قارئ الكلمات',
    description: 'Taklukkan Level 5: Membaca Kata.',
    icon: '📖',
    category: 'mastery',
    color: 'from-green-500/20 to-emerald-400/20',
    glow: 'shadow-green-500/30',
    condition: (s) => s.level5Done,
  },
  {
    id: 'level6_done',
    name: 'Penulis Sejati',
    nameAr: 'الكاتب الحقيقي',
    description: 'Selesaikan Level 6: Menulis Kata — puncak keahlian!',
    icon: '🖊️',
    category: 'mastery',
    color: 'from-emerald-600/20 to-green-400/20',
    glow: 'shadow-emerald-600/30',
    condition: (s) => s.level6Done,
  },

  // ─── Accuracy ─────────────────────────────────────
  {
    id: 'accuracy_70',
    name: 'Goresan Tepat',
    nameAr: 'الدقيق',
    description: 'Raih rata-rata akurasi di atas 70% dalam sesi.',
    icon: '🎯',
    category: 'accuracy',
    color: 'from-violet-500/20 to-purple-500/20',
    glow: 'shadow-violet-500/30',
    condition: (s) => s.avgAccuracy >= 70,
  },
  {
    id: 'accuracy_90',
    name: 'Presisi Tinggi',
    nameAr: 'الدقة العالية',
    description: 'Capai rata-rata akurasi 90% atau lebih.',
    icon: '🔬',
    category: 'accuracy',
    color: 'from-fuchsia-500/20 to-purple-600/20',
    glow: 'shadow-fuchsia-500/40',
    condition: (s) => s.avgAccuracy >= 90,
  },

  // ─── Special ───────────────────────────────────────
  {
    id: 'first_lesson',
    name: 'Langkah Pertama',
    nameAr: 'الخطوة الأولى',
    description: 'Selesaikan pelajaran pertamamu di Qur\'an Flow.',
    icon: '🌱',
    category: 'special',
    color: 'from-lime-500/20 to-green-400/20',
    glow: 'shadow-lime-500/30',
    condition: (s) => s.completedLessonsCount >= 1,
  },
  {
    id: 'lesson_10',
    name: 'Sepuluh Langkah',
    nameAr: 'عشر خطوات',
    description: 'Selesaikan 10 pelajaran dalam perjalananmu.',
    icon: '🔟',
    category: 'special',
    color: 'from-cyan-500/20 to-blue-400/20',
    glow: 'shadow-cyan-500/30',
    condition: (s) => s.completedLessonsCount >= 10,
  },
  {
    id: 'lesson_50',
    name: 'Lima Puluh Pencapaian',
    nameAr: 'خمسون إنجازاً',
    description: 'Telah menuntaskan 50 pelajaran. Luar biasa!',
    icon: '🏆',
    category: 'special',
    color: 'from-yellow-400/20 to-amber-500/20',
    glow: 'shadow-yellow-400/40',
    condition: (s) => s.completedLessonsCount >= 50,
  },
  {
    id: 'all_levels',
    name: 'Khatam Al-Qur\'an Flow',
    nameAr: 'ختم قرآن فلو',
    description: 'Selesaikan semua 7 level. Gelar tertinggi!',
    icon: '🕌',
    category: 'special',
    color: 'from-yellow-300/20 via-amber-400/20 to-yellow-600/20',
    glow: 'shadow-yellow-300/50',
    condition: (s) => s.level1Done && s.level2Done && s.level3Done && s.level4Done && s.level5Done && s.level6Done,
  },
]

/** Hitung badge state dari learning store */
export function computeBadgeState(
  totalXP: number,
  streakDays: number,
  completedLessons: Record<string, { completed: boolean; accuracyScore: number }>,
  currentLevel: number
): BadgeCheckState {
  const allCompleted = Object.values(completedLessons)
  const completedArr = allCompleted.filter(l => l.completed)
  const scores = completedArr.map(l => l.accuracyScore).filter(s => s > 0)
  const avgAccuracy = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  const levelDone = (lvl: number, total: number) =>
    Object.keys(completedLessons).filter(k => k.startsWith(`${lvl}-`) && completedLessons[k].completed).length >= total

  return {
    totalXP,
    streakDays,
    completedLessonsCount: completedArr.length,
    currentLevel,
    avgAccuracy,
    level1Done: levelDone(1, 3),
    level2Done: levelDone(2, 3),
    level3Done: levelDone(3, 3),
    level4Done: levelDone(4, 3),
    level5Done: levelDone(5, 3),
    level6Done: levelDone(6, 3),
  }
}

/** Kembalikan daftar badge yang sudah di-unlock */
export function getUnlockedBadges(state: BadgeCheckState): Badge[] {
  return ALL_BADGES.filter(b => b.condition(state))
}
