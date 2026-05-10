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
  positionForms: {
    isolated: { char: string; guidePath: string; strokeCount: number };
    initial: { char: string; guidePath: string; strokeCount: number };
    medial: { char: string; guidePath: string; strokeCount: number };
    final: { char: string; guidePath: string; strokeCount: number };
  };
  canConnect: boolean;
}

export const HIJAIYAH_LETTERS: HijaiyahLetter[] = [
  {
    id: 'alif', letter: 'ا', name: 'Alif', nameEn: 'Alif', transliteration: 'a',
    order: 1, strokeCount: 1,
    guidePath: 'M 100 30 L 100 170',
    withFathah: 'اَ', withKasrah: 'اِ', withDhammah: 'اُ', withSukun: 'اْ',
    audioUrl: 'https://dvwxdbrwpwcnygjsdrkn.supabase.co/storage/v1/object/public/quran-audio/alif.mp3',
    positionForms: {
      isolated: { char: 'ا', guidePath: 'M 100 30 L 100 170', strokeCount: 1 },
      initial: { char: 'ا', guidePath: 'M 100 30 L 100 170', strokeCount: 1 },
      medial: { char: 'ا', guidePath: 'M 200 120 L 100 120 L 100 30', strokeCount: 1 },
      final: { char: 'ا', guidePath: 'M 200 120 L 100 120 L 100 30', strokeCount: 1 }
    },
    canConnect: false
  },
  {
    id: 'ba', letter: 'ب', name: 'Ba', nameEn: 'Ba', transliteration: 'b',
    order: 2, strokeCount: 2,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'بَ', withKasrah: 'بِ', withDhammah: 'بُ', withSukun: 'بْ',
    positionForms: {
      isolated: { char: 'ب', guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110', strokeCount: 2 },
      initial: { char: 'بـ', guidePath: 'M 180 120 Q 140 120 100 120 L 40 120', strokeCount: 2 },
      medial: { char: 'ـبـ', guidePath: 'M 200 120 L 160 120 Q 100 120 40 120', strokeCount: 2 },
      final: { char: 'ـب', guidePath: 'M 200 120 L 160 120 Q 100 120 40 130 Q 100 150 160 130', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'ta', letter: 'ت', name: 'Ta', nameEn: 'Ta', transliteration: 't',
    order: 3, strokeCount: 3,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'تَ', withKasrah: 'تِ', withDhammah: 'تُ', withSukun: 'تْ',
    positionForms: {
      isolated: { char: 'ت', guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110', strokeCount: 3 },
      initial: { char: 'تـ', guidePath: 'M 180 120 Q 140 120 100 120 L 40 120', strokeCount: 3 },
      medial: { char: 'ـتـ', guidePath: 'M 200 120 L 160 120 Q 100 120 40 120', strokeCount: 3 },
      final: { char: 'ـت', guidePath: 'M 200 120 L 160 120 Q 100 120 40 130 Q 100 150 160 130', strokeCount: 3 }
    },
    canConnect: true
  },
  {
    id: 'tsa', letter: 'ث', name: 'Tsa', nameEn: 'Tha', transliteration: 'th',
    order: 4, strokeCount: 4,
    guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110',
    withFathah: 'ثَ', withKasrah: 'ثِ', withDhammah: 'ثُ', withSukun: 'ثْ',
    positionForms: {
      isolated: { char: 'ث', guidePath: 'M 160 100 Q 100 80 40 100 Q 100 130 160 110', strokeCount: 4 },
      initial: { char: 'ثـ', guidePath: 'M 180 120 Q 140 120 100 120 L 40 120', strokeCount: 4 },
      medial: { char: 'ـثـ', guidePath: 'M 200 120 L 160 120 Q 100 120 40 120', strokeCount: 4 },
      final: { char: 'ـث', guidePath: 'M 200 120 L 160 120 Q 100 120 40 130 Q 100 150 160 130', strokeCount: 4 }
    },
    canConnect: true
  },
  {
    id: 'jim', letter: 'ج', name: 'Jim', nameEn: 'Jim', transliteration: 'j',
    order: 5, strokeCount: 2,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'جَ', withKasrah: 'جِ', withDhammah: 'جُ', withSukun: 'جْ',
    positionForms: {
      isolated: { char: 'ج', guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 2 },
      initial: { char: 'جـ', guidePath: 'M 140 60 Q 180 80 140 120 L 40 120', strokeCount: 2 },
      medial: { char: 'ـجـ', guidePath: 'M 200 120 L 160 120 Q 180 80 140 120 L 40 120', strokeCount: 2 },
      final: { char: 'ـج', guidePath: 'M 200 120 L 160 120 Q 180 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'ha', letter: 'ح', name: 'Ha', nameEn: 'Ha', transliteration: 'ḥ',
    order: 6, strokeCount: 1,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'حَ', withKasrah: 'حِ', withDhammah: 'حُ', withSukun: 'حْ',
    positionForms: {
      isolated: { char: 'ح', guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 1 },
      initial: { char: 'حـ', guidePath: 'M 140 60 Q 180 80 140 120 L 40 120', strokeCount: 1 },
      medial: { char: 'ـحـ', guidePath: 'M 200 120 L 160 120 Q 180 80 140 120 L 40 120', strokeCount: 1 },
      final: { char: 'ـح', guidePath: 'M 200 120 L 160 120 Q 180 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'kha', letter: 'خ', name: 'Kha', nameEn: 'Kha', transliteration: 'kh',
    order: 7, strokeCount: 2,
    guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100',
    withFathah: 'خَ', withKasrah: 'خِ', withDhammah: 'خُ', withSukun: 'خْ',
    positionForms: {
      isolated: { char: 'خ', guidePath: 'M 120 60 Q 160 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 2 },
      initial: { char: 'خـ', guidePath: 'M 140 60 Q 180 80 140 120 L 40 120', strokeCount: 2 },
      medial: { char: 'ـخـ', guidePath: 'M 200 120 L 160 120 Q 180 80 140 120 L 40 120', strokeCount: 2 },
      final: { char: 'ـخ', guidePath: 'M 200 120 L 160 120 Q 180 80 150 120 Q 140 160 80 150 Q 40 140 60 100', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'dal', letter: 'د', name: 'Dal', nameEn: 'Dal', transliteration: 'd',
    order: 8, strokeCount: 1,
    guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140',
    withFathah: 'دَ', withKasrah: 'دِ', withDhammah: 'دُ', withSukun: 'دْ',
    positionForms: {
      isolated: { char: 'د', guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 1 },
      initial: { char: 'د', guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 1 },
      medial: { char: 'ـد', guidePath: 'M 200 140 L 150 140 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 1 },
      final: { char: 'ـد', guidePath: 'M 200 140 L 150 140 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 1 }
    },
    canConnect: false
  },
  {
    id: 'dzal', letter: 'ذ', name: 'Dzal', nameEn: 'Dhal', transliteration: 'dh',
    order: 9, strokeCount: 2,
    guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140',
    withFathah: 'ذَ', withKasrah: 'ذِ', withDhammah: 'ذُ', withSukun: 'ذْ',
    positionForms: {
      isolated: { char: 'ذ', guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 2 },
      initial: { char: 'ذ', guidePath: 'M 150 80 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 2 },
      medial: { char: 'ـذ', guidePath: 'M 200 140 L 150 140 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 2 },
      final: { char: 'ـذ', guidePath: 'M 200 140 L 150 140 Q 160 120 130 150 Q 100 160 80 140 L 40 140', strokeCount: 2 }
    },
    canConnect: false
  },
  {
    id: 'ra', letter: 'ر', name: "Ra'", nameEn: 'Ra', transliteration: 'r',
    order: 10, strokeCount: 1,
    guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160',
    withFathah: 'رَ', withKasrah: 'رِ', withDhammah: 'رُ', withSukun: 'رْ',
    positionForms: {
      isolated: { char: 'ر', guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 1 },
      initial: { char: 'ر', guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 1 },
      medial: { char: 'ـر', guidePath: 'M 200 60 L 150 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 1 },
      final: { char: 'ـر', guidePath: 'M 200 60 L 150 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 1 }
    },
    canConnect: false
  },
  {
    id: 'zai', letter: 'ز', name: 'Zai', nameEn: 'Zay', transliteration: 'z',
    order: 11, strokeCount: 2,
    guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160',
    withFathah: 'زَ', withKasrah: 'زِ', withDhammah: 'زُ', withSukun: 'زْ',
    positionForms: {
      isolated: { char: 'ز', guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 2 },
      initial: { char: 'ز', guidePath: 'M 130 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 2 },
      medial: { char: 'ـز', guidePath: 'M 200 60 L 150 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 2 },
      final: { char: 'ـز', guidePath: 'M 200 60 L 150 60 Q 160 100 140 150 Q 120 170 80 160', strokeCount: 2 }
    },
    canConnect: false
  },
  {
    id: 'sin', letter: 'س', name: 'Sin', nameEn: 'Sin', transliteration: 's',
    order: 12, strokeCount: 1,
    guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110',
    withFathah: 'سَ', withKasrah: 'سِ', withDhammah: 'سُ', withSukun: 'سْ',
    positionForms: {
      isolated: { char: 'س', guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110', strokeCount: 1 },
      initial: { char: 'سـ', guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 L 40 110', strokeCount: 1 },
      medial: { char: 'ـسـ', guidePath: 'M 200 110 L 170 110 Q 140 90 110 110 Q 90 125 70 110 L 40 110', strokeCount: 1 },
      final: { char: 'ـس', guidePath: 'M 200 110 L 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'syin', letter: 'ش', name: 'Syin', nameEn: 'Shin', transliteration: 'sh',
    order: 13, strokeCount: 4,
    guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110',
    withFathah: 'شَ', withKasrah: 'شِ', withDhammah: 'شُ', withSukun: 'شْ',
    positionForms: {
      isolated: { char: 'ش', guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110', strokeCount: 4 },
      initial: { char: 'شـ', guidePath: 'M 170 110 Q 140 90 110 110 Q 90 125 70 110 L 40 110', strokeCount: 4 },
      medial: { char: 'ـشـ', guidePath: 'M 200 110 L 170 110 Q 140 90 110 110 Q 90 125 70 110 L 40 110', strokeCount: 4 },
      final: { char: 'ـش', guidePath: 'M 200 110 L 170 110 Q 140 90 110 110 Q 90 125 70 110 Q 50 95 30 110', strokeCount: 4 }
    },
    canConnect: true
  },
  {
    id: 'shad', letter: 'ص', name: 'Shad', nameEn: 'Sad', transliteration: 'ṣ',
    order: 14, strokeCount: 2,
    guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130',
    withFathah: 'صَ', withKasrah: 'صِ', withDhammah: 'صُ', withSukun: 'صْ',
    positionForms: {
      isolated: { char: 'ص', guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130', strokeCount: 2 },
      initial: { char: 'صـ', guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 L 30 130', strokeCount: 2 },
      medial: { char: 'ـصـ', guidePath: 'M 200 130 L 150 130 Q 100 100 60 130 L 30 130', strokeCount: 2 },
      final: { char: 'ـص', guidePath: 'M 200 130 L 150 130 Q 100 100 60 130 Q 30 150 60 170 Q 100 190 150 170 L 170 170', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'dhad', letter: 'ض', name: 'Dhad', nameEn: 'Dad', transliteration: 'ḍ',
    order: 15, strokeCount: 3,
    guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130',
    withFathah: 'ضَ', withKasrah: 'ضِ', withDhammah: 'ضُ', withSukun: 'ضْ',
    positionForms: {
      isolated: { char: 'ض', guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 Q 100 150 150 130 L 170 130', strokeCount: 3 },
      initial: { char: 'ضـ', guidePath: 'M 150 90 Q 100 60 60 90 Q 30 110 60 130 L 30 130', strokeCount: 3 },
      medial: { char: 'ـضـ', guidePath: 'M 200 130 L 150 130 Q 100 100 60 130 L 30 130', strokeCount: 3 },
      final: { char: 'ـض', guidePath: 'M 200 130 L 150 130 Q 100 100 60 130 Q 30 150 60 170 Q 100 190 150 170 L 170 170', strokeCount: 3 }
    },
    canConnect: true
  },
  {
    id: 'tha', letter: 'ط', name: "Tha'", nameEn: 'Ta', transliteration: 'ṭ',
    order: 16, strokeCount: 2,
    guidePath: 'M 80 60 L 80 150 Q 80 170 100 170 Q 140 170 160 150 Q 170 130 150 110',
    withFathah: 'طَ', withKasrah: 'طِ', withDhammah: 'طُ', withSukun: 'طْ',
    positionForms: {
      isolated: { char: 'ط', guidePath: 'M 140 130 Q 110 90 70 90 Q 40 100 40 130 Q 40 160 100 160 L 160 160 M 70 90 L 70 30', strokeCount: 2 },
      initial: { char: 'طـ', guidePath: 'M 140 130 Q 110 90 70 90 Q 40 100 40 130 Q 40 160 100 160 L 160 160 M 70 90 L 70 30', strokeCount: 2 },
      medial: { char: 'ـطـ', guidePath: 'M 200 160 L 160 160 Q 110 120 70 120 Q 40 130 40 160 L 40 160 M 70 120 L 70 60', strokeCount: 2 },
      final: { char: 'ـط', guidePath: 'M 200 160 L 160 160 Q 110 120 70 120 Q 40 130 40 160 L 40 160 M 70 120 L 70 60', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'zha', letter: 'ظ', name: "Zha'", nameEn: 'Zha', transliteration: 'ẓ',
    order: 17, strokeCount: 3,
    guidePath: 'M 80 60 L 80 150 Q 80 170 100 170 Q 140 170 160 150 Q 170 130 150 110',
    withFathah: 'ظَ', withKasrah: 'ظِ', withDhammah: 'ظُ', withSukun: 'ظْ',
    positionForms: {
      isolated: { char: 'ظ', guidePath: 'M 140 130 Q 110 90 70 90 Q 40 100 40 130 Q 40 160 100 160 L 160 160 M 70 90 L 70 30', strokeCount: 3 },
      initial: { char: 'ظـ', guidePath: 'M 140 130 Q 110 90 70 90 Q 40 100 40 130 Q 40 160 100 160 L 160 160 M 70 90 L 70 30', strokeCount: 3 },
      medial: { char: 'ـظـ', guidePath: 'M 200 160 L 160 160 Q 110 120 70 120 Q 40 130 40 160 L 40 160 M 70 120 L 70 60', strokeCount: 3 },
      final: { char: 'ـظ', guidePath: 'M 200 160 L 160 160 Q 110 120 70 120 Q 40 130 40 160 L 40 160 M 70 120 L 70 60', strokeCount: 3 }
    },
    canConnect: true
  },
  {
    id: 'ain', letter: 'ع', name: "Ain", nameEn: 'Ayn', transliteration: "'",
    order: 18, strokeCount: 2,
    guidePath: 'M 140 80 Q 170 100 160 130 Q 150 160 120 160 Q 80 155 60 130 Q 40 100 70 80 Q 100 65 140 80',
    withFathah: 'عَ', withKasrah: 'عِ', withDhammah: 'عُ', withSukun: 'عْ',
    positionForms: {
      isolated: { char: 'ع', guidePath: 'M 150 70 Q 110 50 80 80 Q 60 110 90 140 Q 120 170 80 180 Q 40 190 20 150', strokeCount: 1 },
      initial: { char: 'عـ', guidePath: 'M 150 70 Q 110 50 80 80 Q 60 110 90 110 L 40 110', strokeCount: 1 },
      medial: { char: 'ـعـ', guidePath: 'M 200 110 L 160 110 Q 150 70 110 70 Q 80 110 120 110 L 40 110', strokeCount: 1 },
      final: { char: 'ـع', guidePath: 'M 200 110 L 160 110 Q 150 70 110 70 Q 80 110 110 140 Q 140 170 100 180 Q 60 190 40 150', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'ghain', letter: 'غ', name: 'Ghain', nameEn: 'Ghain', transliteration: 'gh',
    order: 19, strokeCount: 3,
    guidePath: 'M 140 80 Q 170 100 160 130 Q 150 160 120 160 Q 80 155 60 130 Q 40 100 70 80 Q 100 65 140 80',
    withFathah: 'غَ', withKasrah: 'غِ', withDhammah: 'غُ', withSukun: 'غْ',
    positionForms: {
      isolated: { char: 'غ', guidePath: 'M 150 70 Q 110 50 80 80 Q 60 110 90 140 Q 120 170 80 180 Q 40 190 20 150', strokeCount: 2 },
      initial: { char: 'غـ', guidePath: 'M 150 70 Q 110 50 80 80 Q 60 110 90 110 L 40 110', strokeCount: 2 },
      medial: { char: 'ـغـ', guidePath: 'M 200 110 L 160 110 Q 150 70 110 70 Q 80 110 120 110 L 40 110', strokeCount: 2 },
      final: { char: 'ـغ', guidePath: 'M 200 110 L 160 110 Q 150 70 110 70 Q 80 110 110 140 Q 140 170 100 180 Q 60 190 40 150', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'fa', letter: 'ف', name: 'Fa', nameEn: 'Fa', transliteration: 'f',
    order: 20, strokeCount: 2,
    guidePath: 'M 160 100 Q 130 70 90 85 Q 60 100 80 120 Q 100 140 160 130',
    withFathah: 'فَ', withKasrah: 'فِ', withDhammah: 'فُ', withSukun: 'فْ',
    positionForms: {
      isolated: { char: 'ف', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 M 90 110 Q 60 110 40 110 Q 60 140 120 140 Q 180 140 160 110', strokeCount: 2 },
      initial: { char: 'فـ', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 M 90 110 L 40 110', strokeCount: 2 },
      medial: { char: 'ـفـ', guidePath: 'M 200 110 L 160 110 Q 150 80 120 110 Q 150 140 160 110 M 120 110 L 40 110', strokeCount: 2 },
      final: { char: 'ـف', guidePath: 'M 200 110 L 160 110 Q 150 80 120 110 Q 150 140 160 110 M 120 110 Q 60 110 40 110 Q 60 140 120 140 Q 180 140 160 110', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'qaf', letter: 'ق', name: 'Qaf', nameEn: 'Qaf', transliteration: 'q',
    order: 21, strokeCount: 3,
    guidePath: 'M 150 80 Q 100 50 60 80 Q 30 110 60 140 Q 100 160 150 140 Q 170 120 160 100',
    withFathah: 'قَ', withKasrah: 'قِ', withDhammah: 'قُ', withSukun: 'قْ',
    positionForms: {
      isolated: { char: 'ق', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 M 90 110 Q 60 110 40 140 Q 60 180 120 180 Q 180 180 160 140', strokeCount: 3 },
      initial: { char: 'قـ', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 M 90 110 L 40 110', strokeCount: 3 },
      medial: { char: 'ـقـ', guidePath: 'M 200 110 L 160 110 Q 150 80 120 110 Q 150 140 160 110 M 120 110 L 40 110', strokeCount: 3 },
      final: { char: 'ـق', guidePath: 'M 200 110 L 160 110 Q 150 80 120 110 Q 150 140 160 110 M 120 110 Q 60 110 40 140 Q 60 180 120 180 Q 180 180 160 140', strokeCount: 3 }
    },
    canConnect: true
  },
  {
    id: 'kaf', letter: 'ك', name: 'Kaf', nameEn: 'Kaf', transliteration: 'k',
    order: 22, strokeCount: 3,
    guidePath: 'M 150 50 L 150 170 M 150 100 Q 120 80 80 100',
    withFathah: 'كَ', withKasrah: 'كِ', withDhammah: 'كُ', withSukun: 'كْ',
    positionForms: {
      isolated: { char: 'ك', guidePath: 'M 140 40 L 140 140 Q 140 160 80 160 Q 40 160 40 140 M 100 100 L 120 80 L 100 60', strokeCount: 2 },
      initial: { char: 'كـ', guidePath: 'M 140 40 L 100 100 L 140 100 L 40 140', strokeCount: 1 },
      medial: { char: 'ـكـ', guidePath: 'M 200 140 L 160 140 L 120 80 L 160 80 L 80 140 L 40 140', strokeCount: 1 },
      final: { char: 'ـك', guidePath: 'M 200 140 L 140 140 L 140 40 L 140 140 Q 140 160 80 160 Q 40 160 40 140 M 100 100 L 120 80 L 100 60', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'lam', letter: 'ل', name: 'Lam', nameEn: 'Lam', transliteration: 'l',
    order: 23, strokeCount: 1,
    guidePath: 'M 120 30 Q 120 120 80 160 Q 60 170 40 160',
    withFathah: 'لَ', withKasrah: 'لِ', withDhammah: 'لُ', withSukun: 'لْ',
    positionForms: {
      isolated: { char: 'ل', guidePath: 'M 140 40 L 140 140 Q 140 180 80 180 Q 20 180 20 140', strokeCount: 1 },
      initial: { char: 'لـ', guidePath: 'M 140 40 L 140 140 L 40 140', strokeCount: 1 },
      medial: { char: 'ـلـ', guidePath: 'M 200 140 L 140 140 L 140 40 L 140 140 L 40 140', strokeCount: 1 },
      final: { char: 'ـل', guidePath: 'M 200 140 L 140 140 L 140 40 L 140 140 Q 140 180 80 180 Q 20 180 20 140', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'mim', letter: 'م', name: 'Mim', nameEn: 'Mim', transliteration: 'm',
    order: 24, strokeCount: 2,
    guidePath: 'M 100 80 Q 130 60 150 80 Q 160 100 140 120 Q 120 135 100 120 Q 70 105 60 80',
    withFathah: 'مَ', withKasrah: 'مِ', withDhammah: 'مُ', withSukun: 'مْ',
    positionForms: {
      isolated: { char: 'م', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 L 150 180', strokeCount: 1 },
      initial: { char: 'مـ', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 L 40 110', strokeCount: 1 },
      medial: { char: 'ـمـ', guidePath: 'M 200 110 L 160 110 Q 130 140 100 110 Q 130 80 160 110 L 40 110', strokeCount: 1 },
      final: { char: 'ـم', guidePath: 'M 200 110 L 160 110 Q 130 80 100 110 Q 130 140 160 110 L 160 180', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'nun', letter: 'ن', name: 'Nun', nameEn: 'Nun', transliteration: 'n',
    order: 25, strokeCount: 2,
    guidePath: 'M 60 100 Q 100 70 140 100 Q 160 120 140 140 Q 100 160 60 140',
    withFathah: 'نَ', withKasrah: 'نِ', withDhammah: 'نُ', withSukun: 'نْ',
    positionForms: {
      isolated: { char: 'ن', guidePath: 'M 160 100 Q 160 160 100 160 Q 40 160 40 100', strokeCount: 2 },
      initial: { char: 'نـ', guidePath: 'M 160 100 Q 120 100 80 100 L 40 100', strokeCount: 2 },
      medial: { char: 'ـنـ', guidePath: 'M 200 100 L 160 100 Q 120 100 80 100 L 40 100', strokeCount: 2 },
      final: { char: 'ـن', guidePath: 'M 200 100 L 160 100 Q 160 160 100 160 Q 40 160 40 100', strokeCount: 2 }
    },
    canConnect: true
  },
  {
    id: 'waw', letter: 'و', name: 'Waw', nameEn: 'Waw', transliteration: 'w',
    order: 26, strokeCount: 2,
    guidePath: 'M 130 70 Q 160 90 150 120 Q 135 150 110 155 Q 80 155 65 135',
    withFathah: 'وَ', withKasrah: 'وِ', withDhammah: 'وُ', withSukun: 'وْ',
    positionForms: {
      isolated: { char: 'و', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 Q 180 140 160 180 Q 140 200 100 190', strokeCount: 1 },
      initial: { char: 'و', guidePath: 'M 150 110 Q 120 80 90 110 Q 120 140 150 110 Q 180 140 160 180 Q 140 200 100 190', strokeCount: 1 },
      medial: { char: 'ـو', guidePath: 'M 200 110 L 160 110 Q 130 80 100 110 Q 130 140 160 110 Q 190 140 170 180 Q 150 200 110 190', strokeCount: 1 },
      final: { char: 'ـو', guidePath: 'M 200 110 L 160 110 Q 130 80 100 110 Q 130 140 160 110 Q 190 140 170 180 Q 150 200 110 190', strokeCount: 1 }
    },
    canConnect: false
  },
  {
    id: 'ha2', letter: 'ه', name: 'Ha', nameEn: 'Ha', transliteration: 'h',
    order: 27, strokeCount: 3,
    guidePath: 'M 100 80 Q 140 60 160 90 Q 160 110 140 110 Q 100 110 80 120 Q 60 130 70 150 Q 90 170 120 160',
    withFathah: 'هَ', withKasrah: 'هِ', withDhammah: 'هُ', withSukun: 'هْ',
    positionForms: {
      isolated: { char: 'ه', guidePath: 'M 100 110 Q 140 70 180 110 Q 140 150 100 110 M 100 110 Q 60 150 20 110 Q 60 70 100 110', strokeCount: 1 },
      initial: { char: 'هـ', guidePath: 'M 140 110 Q 100 70 60 110 Q 100 150 140 110 L 40 110', strokeCount: 1 },
      medial: { char: 'ـهـ', guidePath: 'M 200 110 L 140 110 Q 120 60 100 110 Q 80 160 60 110 L 20 110', strokeCount: 1 },
      final: { char: 'ـه', guidePath: 'M 200 110 L 140 110 Q 100 70 60 110 Q 100 150 140 110', strokeCount: 1 }
    },
    canConnect: true
  },
  {
    id: 'ya', letter: 'ي', name: "Ya'", nameEn: 'Ya', transliteration: 'y',
    order: 28, strokeCount: 3,
    guidePath: 'M 160 90 Q 110 70 70 90 Q 40 110 60 140 Q 90 170 130 160',
    withFathah: 'يَ', withKasrah: 'يِ', withDhammah: 'يُ', withSukun: 'يْ',
    positionForms: {
      isolated: { char: 'ي', guidePath: 'M 160 60 Q 120 40 90 70 Q 70 100 110 130 Q 150 160 100 190 Q 40 180 30 140', strokeCount: 2 },
      initial: { char: 'يـ', guidePath: 'M 160 60 Q 120 60 80 60 L 40 60', strokeCount: 2 },
      medial: { char: 'ـيـ', guidePath: 'M 200 60 L 160 60 Q 120 60 80 60 L 40 60', strokeCount: 2 },
      final: { char: 'ـي', guidePath: 'M 200 60 L 160 60 Q 120 40 90 70 Q 70 100 110 130 Q 150 160 100 190 Q 40 180 30 140', strokeCount: 2 }
    },
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
    id: 4, phase: 'mad', title: 'Hukum Mad',
    description: 'Pahami bacaan Mad: panjang vokal 2-6 harakat. Termasuk Mad Ashli (Alif, Waw, Ya) dan Mad Far\'i (Hamzah).',
    icon: '🌊', totalLessons: 32, color: '#D97706', path: 'mad'
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

