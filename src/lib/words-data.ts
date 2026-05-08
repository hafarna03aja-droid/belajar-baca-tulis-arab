export interface HijaiyahWord {
  id: string;
  word: string;
  letters: string[];
  transliteration: string;
  meaning: string;
  category: string;
}

export const HIJAIYAH_WORDS: HijaiyahWord[] = [
  // --- KATEGORI 1: SAMBUNG 2-3 HURUF (DASAR) ---
  { id: 'bata', word: 'بَتَ', letters: ['ba', 'ta'], transliteration: 'bata', meaning: 'Bata', category: 'Sambung 2-3' },
  { id: 'tara', word: 'تَرَ', letters: ['ta', 'ra'], transliteration: 'tara', meaning: 'Tara', category: 'Sambung 2-3' },
  { id: 'darasa', word: 'دَرَسَ', letters: ['dal', 'ra', 'sin'], transliteration: 'darasa', meaning: 'Belajar', category: 'Sambung 2-3' },
  { id: 'kataba', word: 'كَتَبَ', letters: ['kaf', 'ta', 'ba'], transliteration: 'kataba', meaning: 'Menulis', category: 'Sambung 2-3' },
  { id: 'jalasa', word: 'جَلَسَ', letters: ['jim', 'lam', 'sin'], transliteration: 'jalasa', meaning: 'Duduk', category: 'Sambung 2-3' },
  { id: 'nasara', word: 'نَصَرَ', letters: ['nun', 'shad', 'ra'], transliteration: 'naṣara', meaning: 'Menolong', category: 'Sambung 2-3' },
  { id: 'akala', word: 'اَكَلَ', letters: ['alif', 'kaf', 'lam'], transliteration: 'akala', meaning: 'Makan', category: 'Sambung 2-3' },
  { id: 'dhahaba', word: 'ذَهَبَ', letters: ['dzal', 'ha2', 'ba'], transliteration: 'dhahaba', meaning: 'Pergi', category: 'Sambung 2-3' },
  { id: 'syaraba', word: 'شَرَبَ', letters: ['syin', 'ra', 'ba'], transliteration: 'syaraba', meaning: 'Minum', category: 'Sambung 2-3' },
  { id: 'dakhala', word: 'دَخَلَ', letters: ['dal', 'kha', 'lam'], transliteration: 'dakhala', meaning: 'Masuk', category: 'Sambung 2-3' },
  { id: 'kharaja', word: 'خَرَجَ', letters: ['kha', 'ra', 'jim'], transliteration: 'kharaja', meaning: 'Keluar', category: 'Sambung 2-3' },
  { id: 'hasana', word: 'حَسَنَ', letters: ['ha', 'sin', 'nun'], transliteration: 'hasana', meaning: 'Baik', category: 'Sambung 2-3' },

  // --- KATEGORI 2: PERUBAHAN BENTUK (AWAL/TENGAH/AKHIR) ---
  { id: 'alama', word: 'عَلَمَ', letters: ['ain', 'lam', 'mim'], transliteration: '\'alama', meaning: 'Tanda', category: 'Bentuk Huruf' },
  { id: 'baada', word: 'بَعَدَ', letters: ['ba', 'ain', 'dal'], transliteration: 'ba\'ada', meaning: 'Setelah', category: 'Bentuk Huruf' },
  { id: 'samia', word: 'سَمِعَ', letters: ['sin', 'mim', 'ain'], transliteration: 'sami\'a', meaning: 'Mendengar', category: 'Bentuk Huruf' },
  { id: 'lahaba', word: 'لَهَبَ', letters: ['lam', 'ha2', 'ba'], transliteration: 'lahaba', meaning: 'Api', category: 'Bentuk Huruf' },
  { id: 'fagiha', word: 'فَقِهَ', letters: ['fa', 'qaf', 'ha2'], transliteration: 'fagiha', meaning: 'Faham', category: 'Bentuk Huruf' },
  { id: 'kabura', word: 'كَبُرَ', letters: ['kaf', 'ba', 'ra'], transliteration: 'kabura', meaning: 'Besar', category: 'Bentuk Huruf' },
  { id: 'syakara', word: 'شَكَرَ', letters: ['syin', 'kaf', 'ra'], transliteration: 'syakara', meaning: 'Syukur', category: 'Bentuk Huruf' },
  { id: 'yasara', word: 'يَسَرَ', letters: ['ya', 'sin', 'ra'], transliteration: 'yasara', meaning: 'Mudah', category: 'Bentuk Huruf' },
  { id: 'hamida', word: 'حَمِدَ', letters: ['ha', 'mim', 'dal'], transliteration: 'hamida', meaning: 'Memuji', category: 'Bentuk Huruf' },

  // --- KATEGORI 3: MAD ASLI (PANJANG 2 HARAKAT) ---
  { id: 'naadaa', word: 'نَادَى', letters: ['nun', 'alif', 'dal', 'ya'], transliteration: 'naadaa', meaning: 'Memanggil', category: 'Mad Ashli' },
  { id: 'qaala', word: 'قَالَ', letters: ['qaf', 'alif', 'lam'], transliteration: 'qaala', meaning: 'Berkata', category: 'Mad Ashli' },
  { id: 'kaana', word: 'كَانَ', letters: ['kaf', 'alif', 'nun'], transliteration: 'kaana', meaning: 'Adalah', category: 'Mad Ashli' },
  { id: 'diini', word: 'دِينِ', letters: ['dal', 'ya', 'nun'], transliteration: 'diini', meaning: 'Agama', category: 'Mad Ashli' },
  { id: 'qiila', word: 'قِيلَ', letters: ['qaf', 'ya', 'lam'], transliteration: 'qiila', meaning: 'Dikatakan', category: 'Mad Ashli' },
  { id: 'fiihi', word: 'فِيهِ', letters: ['fa', 'ya', 'ha2'], transliteration: 'fiihi', meaning: 'Di dalamnya', category: 'Mad Ashli' },
  { id: 'nuuri', word: 'نُورِ', letters: ['nun', 'waw', 'ra'], transliteration: 'nuuri', meaning: 'Cahaya', category: 'Mad Ashli' },
  { id: 'yaquulu', word: 'يَقُولُ', letters: ['ya', 'qaf', 'waw', 'lam'], transliteration: 'yaquulu', meaning: 'Berkata (Skrg)', category: 'Mad Ashli' },
  { id: 'tuubuu', word: 'تُوبُوا', letters: ['ta', 'waw', 'ba', 'waw'], transliteration: 'tuubuu', meaning: 'Bertaubatlah', category: 'Mad Ashli' },
  { id: 'kitaabun', word: 'كِتَابٌ', letters: [], transliteration: 'kitaabun', meaning: 'Buku', category: 'Mad Ashli' },
  { id: 'thaalibun', word: 'طَالِبٌ', letters: [], transliteration: 'thaalibun', meaning: 'Siswa', category: 'Mad Ashli' },
  { id: 'naafidzatun', word: 'نَافِذَةٌ', letters: [], transliteration: 'naafidzatun', meaning: 'Jendela', category: 'Mad Ashli' },
  { id: 'baabun', word: 'بَابٌ', letters: [], transliteration: 'baabun', meaning: 'Pintu', category: 'Mad Ashli' },
  { id: 'nujuumun', word: 'نُجُومٌ', letters: [], transliteration: 'nujuumun', meaning: 'Bintang-bintang', category: 'Mad Ashli' },
  { id: 'naarun', word: 'نَارٌ', letters: [], transliteration: 'naarun', meaning: 'Api', category: 'Mad Ashli' },
  { id: 'thaaamun', word: 'طَعَامٌ', letters: [], transliteration: 'tha\'aamun', meaning: 'Makanan', category: 'Mad Ashli' },
  { id: 'faakihatun', word: 'فَاكِهَةٌ', letters: [], transliteration: 'faakihatun', meaning: 'Buah-buahan', category: 'Mad Ashli' },
  { id: 'burtuqaalun', word: 'بُرْتُقَالٌ', letters: [], transliteration: 'burtuqaalun', meaning: 'Jeruk', category: 'Mad Ashli' },
  { id: 'dajaajun', word: 'دَجَاجٌ', letters: [], transliteration: 'dajaajun', meaning: 'Ayam', category: 'Mad Ashli' },
  { id: 'khudhraawaatun', word: 'خُضْرَاوَاتٌ', letters: [], transliteration: 'khudhraawaatun', meaning: 'Sayur-sayuran', category: 'Mad Ashli' },
  { id: 'thuumun', word: 'ثُومٌ', letters: [], transliteration: 'thuumun', meaning: 'Bawang putih', category: 'Mad Ashli' },
  { id: 'thamaathimun', word: 'طَمَاطِمٌ', letters: [], transliteration: 'thamaathimun', meaning: 'Tomat', category: 'Mad Ashli' },
  { id: 'bathaathisun', word: 'بَطَاطِسٌ', letters: [], transliteration: 'bathaathisun', meaning: 'Kentang', category: 'Mad Ashli' },
  { id: 'khiyaarun', word: 'خِيَارٌ', letters: [], transliteration: 'khiyaarun', meaning: 'Timun', category: 'Mad Ashli' },
  { id: 'ashiirun', word: 'عَصِيرٌ', letters: [], transliteration: 'ashiirun', meaning: 'Jus', category: 'Mad Ashli' },

  // --- KATEGORI 4: SUKUN & QALQALAH ---
  { id: 'akbar', word: 'اَكْبَر', letters: ['alif', 'kaf', 'ba', 'ra'], transliteration: 'akbar', meaning: 'Maha Besar', category: 'Sukun' },
  { id: 'masjid', word: 'مَسْجِد', letters: ['mim', 'sin', 'jim', 'dal'], transliteration: 'masjid', meaning: 'Masjid', category: 'Sukun' },
  { id: 'alhamdu', word: 'اَلْحَمْدُ', letters: ['alif', 'lam', 'ha', 'mim', 'dal'], transliteration: 'alhamdu', meaning: 'Segala Puji', category: 'Sukun' },
  { id: 'bintun', word: 'بِنْتٌ', letters: [], transliteration: 'bintun', meaning: 'Anak perempuan', category: 'Sukun' },
  { id: 'madrasatun', word: 'مَدْرَسَةٌ', letters: [], transliteration: 'madrasatun', meaning: 'Sekolah', category: 'Sukun' },
  { id: 'syamsun', word: 'شَمْسٌ', letters: [], transliteration: 'syamsun', meaning: 'Matahari', category: 'Sukun' },
  { id: 'ardhun', word: 'اَرْضٌ', letters: [], transliteration: 'ardhun', meaning: 'Bumi', category: 'Sukun' },
  { id: 'bahrun', word: 'بَحْرٌ', letters: [], transliteration: 'bahrun', meaning: 'Laut', category: 'Sukun' },
  { id: 'nahrun', word: 'نَهْرٌ', letters: [], transliteration: 'nahrun', meaning: 'Sungai', category: 'Sukun' },
  { id: 'khubzun', word: 'خُبْزٌ', letters: [], transliteration: 'khubzun', meaning: 'Roti', category: 'Sukun' },
  { id: 'mauzun', word: 'مَوْزٌ', letters: [], transliteration: 'mauzun', meaning: 'Pisang', category: 'Sukun' },
  { id: 'tamrun', word: 'تَمْرٌ', letters: [], transliteration: 'tamrun', meaning: 'Kurma', category: 'Sukun' },
  { id: 'zaitun', word: 'زَيْتٌ', letters: [], transliteration: 'zaitun', meaning: 'Minyak', category: 'Sukun' },
  { id: 'milhun', word: 'مِلْحٌ', letters: [], transliteration: 'milhun', meaning: 'Garam', category: 'Sukun' },
  { id: 'lahmun', word: 'لَحْمٌ', letters: [], transliteration: 'lahmun', meaning: 'Daging', category: 'Sukun' },
  { id: 'baidzhun', word: 'بَيْضٌ', letters: [], transliteration: 'baidzhun', meaning: 'Telur', category: 'Sukun' },
  { id: 'fulfulun', word: 'فُلْفُلٌ', letters: [], transliteration: 'fulfulun', meaning: 'Cabai', category: 'Sukun' },
  { id: 'qahwatun', word: 'قَهْوَةٌ', letters: [], transliteration: 'qahwatun', meaning: 'Kopi', category: 'Sukun' },

  { id: 'abqaa', word: 'اَبْقَى', letters: ['alif', 'ba', 'qaf', 'ya'], transliteration: 'abqaa', meaning: 'Lebih Kekal', category: 'Sukun (Qalqalah)' },
  { id: 'yadkhulu', word: 'يَدْخُلُ', letters: ['ya', 'dal', 'kha', 'lam'], transliteration: 'yadkhulu', meaning: 'Masuk (Skrg)', category: 'Sukun (Qalqalah)' },
  { id: 'yaqtau', word: 'يَقْطَعُ', letters: ['ya', 'qaf', 'tha', 'ain'], transliteration: 'yaqta\'u', meaning: 'Memotong', category: 'Sukun (Qalqalah)' },

  // --- KATEGORI 5: TANWIN ---
  { id: 'haqqan', word: 'حَقًّا', letters: ['ha', 'qaf', 'alif'], transliteration: 'haqqan', meaning: 'Benar', category: 'Tanwin' },
  { id: 'mubiinin', word: 'مُبِينٍ', letters: ['mim', 'ba', 'ya', 'nun'], transliteration: 'mubiinin', meaning: 'Nyata', category: 'Tanwin' },
  { id: 'aliimun', word: 'عَلِيمٌ', letters: ['ain', 'lam', 'ya', 'mim'], transliteration: 'aliimun', meaning: 'Maha Mengetahui', category: 'Tanwin' },
  { id: 'ghafuurun', word: 'غَفُورٌ', letters: ['ghain', 'fa', 'waw', 'ra'], transliteration: 'ghafuurun', meaning: 'Maha Pengampun', category: 'Tanwin' },
  { id: 'baitun', word: 'بَيْتٌ', letters: [], transliteration: 'baitun', meaning: 'Rumah', category: 'Tanwin' },

  // --- KATEGORI 6: TASYDID ---
  { id: 'rabbika', word: 'رَبِّكَ', letters: ['ra', 'ba', 'kaf'], transliteration: 'rabbika', meaning: 'Tuhanmu', category: 'Tasydid' },
  { id: 'muhammadun', word: 'مُحَمَّدٌ', letters: ['mim', 'ha', 'mim', 'dal'], transliteration: 'muhammadun', meaning: 'Nabi Muhammad', category: 'Tasydid' },
  { id: 'ummi', word: 'اُمِّى', letters: ['alif', 'mim', 'ya'], transliteration: 'ummi', meaning: 'Ibuku', category: 'Tasydid' },
  { id: 'jannatun', word: 'جَنَّةٌ', letters: ['jim', 'nun', 'ta2'], transliteration: 'jannatun', meaning: 'Surga', category: 'Tasydid' },
  { id: 'muallimun', word: 'مُعَلِّمٌ', letters: [], transliteration: 'mu\'allimun', meaning: 'Guru', category: 'Tasydid' },
  { id: 'kursiyyun', word: 'كُرْسِيٌّ', letters: [], transliteration: 'kursiyyun', meaning: 'Kursi', category: 'Tasydid' },
  { id: 'tuffaahun', word: 'تُفَّاحٌ', letters: [], transliteration: 'tuffaahun', meaning: 'Apel', category: 'Tasydid' },
  { id: 'sukkarun', word: 'سُكَّرٌ', letters: [], transliteration: 'sukkarun', meaning: 'Gula', category: 'Tasydid' },
  { id: 'ruzzun', word: 'رُزٌّ', letters: [], transliteration: 'ruzzun', meaning: 'Nasi', category: 'Tasydid' },
  { id: 'syaayyun', word: 'شَايٌّ', letters: [], transliteration: 'syaayyun', meaning: 'Teh', category: 'Tasydid' },

  // --- KATEGORI 7: MAD WAJIB/JAIZ (PANJANG 4-6) ---
  { id: 'jaaaa', word: 'جَاءَ', letters: ['jim', 'alif', 'hamzah'], transliteration: 'jaaa\'a', meaning: 'Datang', category: 'Mad Far\'i' },
  { id: 'samaaa', word: 'سَمَاء', letters: ['sin', 'mim', 'alif', 'hamzah'], transliteration: 'samaaa\'', meaning: 'Langit', category: 'Mad Far\'i' },
  { id: 'yaaa-ayyuhaa', word: 'يَااَيُّهَا', letters: ['ya', 'alif', 'alif', 'ya'], transliteration: 'yaaa ayyuhaa', meaning: 'Wahai', category: 'Mad Far\'i' },
  { id: 'samaaun', word: 'سَمَاءٌ', letters: [], transliteration: 'samaa\'un', meaning: 'Langit', category: 'Mad Far\'i' },
  { id: 'maaun', word: 'مَاءٌ', letters: [], transliteration: 'maa\'un', meaning: 'Air', category: 'Mad Far\'i' },
  { id: 'hawaaun', word: 'هَوَاءٌ', letters: [], transliteration: 'hawaa\'un', meaning: 'Udara', category: 'Mad Far\'i' },

  // --- KATEGORI 8: KALIMAT PENDEK ---
  { id: 'rabbil-aalamiin', word: 'رَبُّ الْعَالَمِينَ', letters: [], transliteration: 'rabbil \'aalamiin', meaning: 'Tuhan Semesta Alam', category: 'Kalimat' },
  { id: 'iyyaaka-nabudu', word: 'اِيَّاكَ نَعْبُدُ', letters: [], transliteration: 'iyyaaka na\'budu', meaning: 'Hanya kpd-Mu kami menyembah', category: 'Kalimat' },
  { id: 'fii-sabiilillah', word: 'فِي سَبِيلِ اللّٰهِ', letters: [], transliteration: 'fii sabiilillah', meaning: 'Di jalan Allah', category: 'Kalimat' },

  // Helper mapping for single words used in other categories
  { id: 'qalamun', word: 'قَلَمٌ', letters: [], transliteration: 'qalamun', meaning: 'Pena', category: 'Sambung 2-3' },
  { id: 'syajaratun', word: 'شَجَرَةٌ', letters: [], transliteration: 'syajaratun', meaning: 'Pohon', category: 'Sambung 2-3' },
  { id: 'waladun', word: 'وَلَدٌ', letters: [], transliteration: 'waladun', meaning: 'Anak laki-laki', category: 'Sambung 2-3' },
  { id: 'qamarun', word: 'قَمَرٌ', letters: [], transliteration: 'qamarun', meaning: 'Bulan', category: 'Sambung 2-3' },
  { id: 'jabalun', word: 'جَبَلٌ', letters: [], transliteration: 'jabalun', meaning: 'Gunung', category: 'Sambung 2-3' },
  { id: 'labanun', word: 'لَبَنٌ', letters: [], transliteration: 'labanun', meaning: 'Susu', category: 'Sambung 2-3' },
  { id: 'inabun', word: 'عِنَبٌ', letters: [], transliteration: 'inabun', meaning: 'Anggur', category: 'Sambung 2-3' },
  { id: 'asalun', word: 'عَسَلٌ', letters: [], transliteration: 'asalun', meaning: 'Madu', category: 'Sambung 2-3' },
  { id: 'samakun', word: 'سَمَكٌ', letters: [], transliteration: 'samakun', meaning: 'Ikan', category: 'Sambung 2-3' },
  { id: 'bashalun', word: 'بَصَلٌ', letters: [], transliteration: 'bashalun', meaning: 'Bawang', category: 'Sambung 2-3' },
  { id: 'jazarun', word: 'جَزَرٌ', letters: [], transliteration: 'jazarun', meaning: 'Wortel', category: 'Sambung 2-3' },
];
