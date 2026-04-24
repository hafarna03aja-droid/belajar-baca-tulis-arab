// Hijaiyah letter data with stroke information and audio
export interface HijaiyahLetter {
  id: string;
  letter: string;
  name: string;
  nameEn: string;
  transliteration: string;
  order: number;
  strokeCount: number;
  // SVG path for the ghost guide (simplified)
  guidePath: string;
  // Harakat variants
  withFathah: string;
  withKasrah: string;
  withDhammah: string;
  withSukun: string;
  audioUrl?: string;
  // Position forms
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  canConnect: boolean;
}

export const HIJAIYAH_LETTERS: HijaiyahLetter[] = [
  {
    id: 'alif', letter: 'ا', name: 'Alif', nameEn: 'Alif', transliteration: 'a',
    order: 1, strokeCount: 1,
    guidePath: 'M 100 30 L 100 170',
    withFathah: 'اَ', withKasrah: 'اِ', withDhammah: 'اُ', withSukun: 'اْ',
    audioUrl: 'https://dvwxdbrwpwcnygjsdrkn.supabase.co/storage/v1/object/public/quran-audio/alif.mp3',
    isolated: 'ا', initial: 'ا', medial: 'ا', final: 'ا',
    canConnect: false
  },
  {
    id: 'ba', letter: 'ب', name: 'Ba', nameEn: 'Ba', transliteration: 'b',
    order: 2, strokeCount: 2,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'بَ', withKasrah: 'بِ', withDhammah: 'بُ', withSukun: 'بْ',
    isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب',
    canConnect: true
  },
  {
    id: 'ta', letter: 'ت', name: 'Ta', nameEn: 'Ta', transliteration: 't',
    order: 3, strokeCount: 3,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'تَ', withKasrah: 'تِ', withDhammah: 'تُ', withSukun: 'تْ',
    isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت',
    canConnect: true
  },
  {
    id: 'tsa', letter: 'ث', name: 'Tsa', nameEn: 'Tha', transliteration: 'th',
    order: 4, strokeCount: 4,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'ثَ', withKasrah: 'ثِ', withDhammah: 'ثُ', withSukun: 'ثْ',
    isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث',
    canConnect: true
  },
  {
    id: 'jim', letter: 'ج', name: 'Jim', nameEn: 'Jim', transliteration: 'j',
    order: 5, strokeCount: 2,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'جَ', withKasrah: 'جِ', withDhammah: 'جُ', withSukun: 'جْ',
    isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج',
    canConnect: true
  },
  {
    id: 'ha', letter: 'ح', name: 'Ha', nameEn: 'Ha', transliteration: 'ḥ',
    order: 6, strokeCount: 1,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'حَ', withKasrah: 'حِ', withDhammah: 'حُ', withSukun: 'حْ',
    isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح',
    canConnect: true
  },
  {
    id: 'kha', letter: 'خ', name: 'Kha', nameEn: 'Kha', transliteration: 'kh',
    order: 7, strokeCount: 2,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'خَ', withKasrah: 'خِ', withDhammah: 'خُ', withSukun: 'خْ',
    isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ',
    canConnect: true
  },
  {
    id: 'dal', letter: 'د', name: 'Dal', nameEn: 'Dal', transliteration: 'd',
    order: 8, strokeCount: 1,
    guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140',
    withFathah: 'دَ', withKasrah: 'دِ', withDhammah: 'دُ', withSukun: 'دْ',
    isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد',
    canConnect: false
  },
  {
    id: 'dzal', letter: 'ذ', name: 'Dzal', nameEn: 'Dhal', transliteration: 'dh',
    order: 9, strokeCount: 2,
    guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140',
    withFathah: 'ذَ', withKasrah: 'ذِ', withDhammah: 'ذُ', withSukun: 'ذْ',
    isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ',
    canConnect: false
  },
  {
    id: 'ra', letter: 'ر', name: "Ra'", nameEn: 'Ra', transliteration: 'r',
    order: 10, strokeCount: 1,
    guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160',
    withFathah: 'رَ', withKasrah: 'رِ', withDhammah: 'رُ', withSukun: 'رْ',
    isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر',
    canConnect: false
  },
  {
    id: 'zai', letter: 'ز', name: 'Zai', nameEn: 'Zay', transliteration: 'z',
    order: 11, strokeCount: 2,
    guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160',
    withFathah: 'زَ', withKasrah: 'زِ', withDhammah: 'زُ', withSukun: 'زْ',
    isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز',
    canConnect: false
  },
  {
    id: 'sin', letter: 'س', name: 'Sin', nameEn: 'Sin', transliteration: 's',
    order: 12, strokeCount: 1,
    guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110',
    withFathah: 'سَ', withKasrah: 'سِ', withDhammah: 'سُ', withSukun: 'سْ',
    isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس',
    canConnect: true
  },
  {
    id: 'syin', letter: 'ش', name: 'Syin', nameEn: 'Shin', transliteration: 'sh',
    order: 13, strokeCount: 4,
    guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110',
    withFathah: 'شَ', withKasrah: 'شِ', withDhammah: 'شُ', withSukun: 'شْ',
    isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش',
    canConnect: true
  },
  {
    id: 'shad', letter: 'ص', name: 'Shad', nameEn: 'Sad', transliteration: 'ṣ',
    order: 14, strokeCount: 2,
    guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130',
    withFathah: 'صَ', withKasrah: 'صِ', withDhammah: 'صُ', withSukun: 'صْ',
    isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص',
    canConnect: true
  },
  {
    id: 'dhad', letter: 'ض', name: 'Dhad', nameEn: 'Dad', transliteration: 'ḍ',
    order: 15, strokeCount: 3,
    guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130',
    withFathah: 'ضَ', withKasrah: 'ضِ', withDhammah: 'ضُ', withSukun: 'ضْ',
    isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض',
    canConnect: true
  },
  {
    id: 'tha', letter: 'ط', name: "Tha'", nameEn: 'Ta', transliteration: 'ṭ',
    order: 16, strokeCount: 2,
    guidePath: 'M 80 60 L 80 150 Q 80 170 100 170 Q 140 170 160 150 Q 170 130 150 110',
    withFathah: 'طَ', withKasrah: 'طِ', withDhammah: 'طُ', withSukun: 'طْ',
    isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط',
    canConnect: true
  },
  {
    id: 'zha', letter: 'ظ', name: "Zha'", nameEn: 'Zha', transliteration: 'ẓ',
    order: 17, strokeCount: 3,
    guidePath: 'M 80 60 L 80 150 Q 80 170 100 170 Q 140 170 160 150 Q 170 130 150 110',
    withFathah: 'ظَ', withKasrah: 'ظِ', withDhammah: 'ظُ', withSukun: 'ظْ',
    isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ',
    canConnect: true
  },
  {
    id: 'ain', letter: 'ع', name: "Ain", nameEn: 'Ayn', transliteration: "'",
    order: 18, strokeCount: 2,
    guidePath: 'M 140 80 Q 170 100 160 130 Q 150 160 120 160 Q 80 155 60 130 Q 40 100 70 80 Q 100 65 140 80',
    withFathah: 'عَ', withKasrah: 'عِ', withDhammah: 'عُ', withSukun: 'عْ',
    isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع',
    canConnect: true
  },
  {
    id: 'ghain', letter: 'غ', name: 'Ghain', nameEn: 'Ghain', transliteration: 'gh',
    order: 19, strokeCount: 3,
    guidePath: 'M 140 80 Q 170 100 160 130 Q 150 160 120 160 Q 80 155 60 130 Q 40 100 70 80 Q 100 65 140 80',
    withFathah: 'غَ', withKasrah: 'غِ', withDhammah: 'غُ', withSukun: 'غْ',
    isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ',
    canConnect: true
  },
  {
    id: 'fa', letter: 'ف', name: 'Fa', nameEn: 'Fa', transliteration: 'f',
    order: 20, strokeCount: 2,
    guidePath: 'M 160 100 Q 130 70 90 85 Q 60 100 80 120 Q 100 140 160 130',
    withFathah: 'فَ', withKasrah: 'فِ', withDhammah: 'فُ', withSukun: 'فْ',
    isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف',
    canConnect: true
  },
  {
    id: 'qaf', letter: 'ق', name: 'Qaf', nameEn: 'Qaf', transliteration: 'q',
    order: 21, strokeCount: 3,
    guidePath: 'M 150 80 Q 100 50 60 80 Q 30 110 60 140 Q 100 160 150 140 Q 170 120 160 100',
    withFathah: 'قَ', withKasrah: 'قِ', withDhammah: 'قُ', withSukun: 'قْ',
    isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق',
    canConnect: true
  },
  {
    id: 'kaf', letter: 'ك', name: 'Kaf', nameEn: 'Kaf', transliteration: 'k',
    order: 22, strokeCount: 3,
    guidePath: 'M 150 50 L 150 170 M 150 100 Q 120 80 80 100',
    withFathah: 'كَ', withKasrah: 'كِ', withDhammah: 'كُ', withSukun: 'كْ',
    isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك',
    canConnect: true
  },
  {
    id: 'lam', letter: 'ل', name: 'Lam', nameEn: 'Lam', transliteration: 'l',
    order: 23, strokeCount: 1,
    guidePath: 'M 120 30 Q 120 120 80 160 Q 60 170 40 160',
    withFathah: 'لَ', withKasrah: 'لِ', withDhammah: 'لُ', withSukun: 'لْ',
    isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل',
    canConnect: true
  },
  {
    id: 'mim', letter: 'م', name: 'Mim', nameEn: 'Mim', transliteration: 'm',
    order: 24, strokeCount: 2,
    guidePath: 'M 100 80 Q 130 60 150 80 Q 160 100 140 120 Q 120 135 100 120 Q 70 105 60 80',
    withFathah: 'مَ', withKasrah: 'مِ', withDhammah: 'مُ', withSukun: 'مْ',
    isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم',
    canConnect: true
  },
  {
    id: 'nun', letter: 'ن', name: 'Nun', nameEn: 'Nun', transliteration: 'n',
    order: 25, strokeCount: 2,
    guidePath: 'M 60 100 Q 100 70 140 100 Q 160 120 140 140 Q 100 160 60 140',
    withFathah: 'نَ', withKasrah: 'نِ', withDhammah: 'نُ', withSukun: 'نْ',
    isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن',
    canConnect: true
  },
  {
    id: 'waw', letter: 'و', name: 'Waw', nameEn: 'Waw', transliteration: 'w',
    order: 26, strokeCount: 2,
    guidePath: 'M 130 70 Q 160 90 150 120 Q 135 150 110 155 Q 80 155 65 135',
    withFathah: 'وَ', withKasrah: 'وِ', withDhammah: 'وُ', withSukun: 'وْ',
    isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو',
    canConnect: false
  },
  {
    id: 'ha2', letter: 'ه', name: 'Ha', nameEn: 'Ha', transliteration: 'h',
    order: 27, strokeCount: 3,
    guidePath: 'M 100 80 Q 140 60 160 90 Q 160 110 140 110 Q 100 110 80 120 Q 60 130 70 150 Q 90 170 120 160',
    withFathah: 'هَ', withKasrah: 'هِ', withDhammah: 'هُ', withSukun: 'هْ',
    isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه',
    canConnect: true
  },
  {
    id: 'ya', letter: 'ي', name: "Ya'", nameEn: 'Ya', transliteration: 'y',
    order: 28, strokeCount: 3,
    guidePath: 'M 160 90 Q 110 70 70 90 Q 40 110 60 140 Q 90 170 130 160',
    withFathah: 'يَ', withKasrah: 'يِ', withDhammah: 'يُ', withSukun: 'يْ',
    isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي',
    canConnect: true
  },
];

export const HARAKATS = [
  { id: 'fathah', symbol: 'َ', name: 'Fathah', sound: 'a', example: 'بَ' },
  { id: 'kasrah', symbol: 'ِ', name: 'Kasrah', sound: 'i', example: 'بِ' },
  { id: 'dhammah', symbol: 'ُ', name: 'Dhammah', sound: 'u', example: 'بُ' },
  { id: 'sukun', symbol: 'ْ', name: 'Sukun', sound: '(no vowel)', example: 'بْ' },
  { id: 'fathah_tanwin', symbol: 'ً', name: 'Fathatain', sound: 'an', example: 'بً' },
  { id: 'kasrah_tanwin', symbol: 'ٍ', name: 'Kasratain', sound: 'in', example: 'بٍ' },
  { id: 'dhammah_tanwin', symbol: 'ٌ', name: 'Dhammatain', sound: 'un', example: 'بٌ' },
  { id: 'tasydid', symbol: 'ّ', name: 'Tasydid', sound: 'doubled', example: 'بّ' },
];

export const CURRICULUM_LEVELS = [
  {
    id: 1, phase: 'writing', title: 'Pondasi: Huruf Tunggal',
    description: 'Kenali dan gambar 28 huruf dasar Hijaiyah satu per satu.',
    icon: '✍️', totalLessons: 28, color: '#2563EB', path: 'writing'
  },
  {
    id: 2, phase: 'reading', title: 'Harakat Dasar',
    description: 'Berikan \'nyawa\' pada huruf. Belajar membunyikan huruf dengan Fathah, Kasrah, dan Dhammah.',
    icon: '🗣️', totalLessons: 28, color: '#3B82F6', path: 'reading'
  },
  {
    id: 3, phase: 'forms', title: 'Transformasi Bentuk',
    description: 'Pahami bagaimana huruf berubah bentuk saat berada di awal, tengah, dan akhir kata.',
    icon: '🧩', totalLessons: 28, color: '#F59E0B', path: 'forms'
  },
  {
    id: 4, phase: 'reading', title: 'Membaca Lanjut',
    description: 'Menguasai huruf dengan tanda mati (Sukun) dan vokal ganda (Tanwin).',
    icon: '🌊', totalLessons: 28, color: '#D97706', path: 'reading'
  },
  {
    id: 5, phase: 'reading-words', title: 'Membaca Kata',
    description: 'Tantangan menggabungkan 2-3 huruf bersambung menjadi satu kesatuan bacaan utuh.',
    icon: '🗣️', totalLessons: 100, color: '#10B981', path: 'reading-words'
  },
  {
    id: 6, phase: 'writing-words', title: 'Menulis Kata',
    description: 'Ujian tertinggi: menuliskan kata bersambung di atas kanvas digital.',
    icon: '✍️', totalLessons: 100, color: '#064E3B', path: 'writing-words'
  },
  {
    id: 7, phase: 'iqro', title: 'Urut Hijaiyah (Mode Iqro)',
    description: 'Kurikulum bertahap Jilid 1-6 secara berurutan. Fokus pada penguasaan satu per satu hingga tuntas.',
    icon: '📖', totalLessons: 6, color: '#B45309', path: 'iqro'
  }
];

