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
  { id: 'sharaba', word: 'شَرَبَ', letters: ['syin', 'ra', 'ba'], transliteration: 'syaraba', meaning: 'Minum', category: 'Sambung 2-3' },
  { id: 'dakhala', word: 'دَخَلَ', letters: ['dal', 'kha', 'lam'], transliteration: 'dakhala', meaning: 'Masuk', category: 'Sambung 2-3' },
  { id: 'kharaja', word: 'خَرَجَ', letters: ['kha', 'ra', 'jim'], transliteration: 'kharaja', meaning: 'Keluar', category: 'Sambung 2-3' },
  { id: 'hasana', word: 'حَسَنَ', letters: ['ha', 'sin', 'nun'], transliteration: 'hasana', meaning: 'Baik', category: 'Sambung 2-3' },

  // --- KATEGORI 2: PERUBAHAN BENTUK (AWAL/TENGAH/AKHIR) ---
  { id: 'ain_awal', word: 'عَلَمَ', letters: ['ain', 'lam', 'mim'], transliteration: '\'alama', meaning: 'Tanda', category: 'Bentuk Huruf' },
  { id: 'ain_tengah', word: 'بَعَدَ', letters: ['ba', 'ain', 'dal'], transliteration: 'ba\'ada', meaning: 'Setelah', category: 'Bentuk Huruf' },
  { id: 'ain_akhir', word: 'سَمِعَ', letters: ['sin', 'mim', 'ain'], transliteration: 'sami\'a', meaning: 'Mendengar', category: 'Bentuk Huruf' },
  { id: 'ha_tengah', word: 'لَهَبَ', letters: ['lam', 'ha2', 'ba'], transliteration: 'lahaba', meaning: 'Api', category: 'Bentuk Huruf' },
  { id: 'ha_akhir', word: 'فَقِهَ', letters: ['fa', 'qaf', 'ha2'], transliteration: 'fagiha', meaning: 'Faham', category: 'Bentuk Huruf' },
  { id: 'kaf_awal', word: 'كَبُرَ', letters: ['kaf', 'ba', 'ra'], transliteration: 'kabura', meaning: 'Besar', category: 'Bentuk Huruf' },
  { id: 'kaf_tengah', word: 'شَكَرَ', letters: ['syin', 'kaf', 'ra'], transliteration: 'syakara', meaning: 'Syukur', category: 'Bentuk Huruf' },
  { id: 'ya_awal', word: 'يَسَرَ', letters: ['ya', 'sin', 'ra'], transliteration: 'yasara', meaning: 'Mudah', category: 'Bentuk Huruf' },
  { id: 'mim_tengah', word: 'حَمِدَ', letters: ['ha', 'mim', 'dal'], transliteration: 'hamida', meaning: 'Memuji', category: 'Bentuk Huruf' },

  // --- KATEGORI 3: MAD ASLI (PANJANG 2 HARAKAT) ---
  { id: 'mad_alif_1', word: 'نَادَى', letters: ['nun', 'alif', 'dal', 'ya'], transliteration: 'naadaa', meaning: 'Memanggil', category: 'Mad Ashli' },
  { id: 'mad_alif_2', word: 'قَالَ', letters: ['qaf', 'alif', 'lam'], transliteration: 'qaala', meaning: 'Berkata', category: 'Mad Ashli' },
  { id: 'mad_alif_3', word: 'كَانَ', letters: ['kaf', 'alif', 'nun'], transliteration: 'kaana', meaning: 'Adalah', category: 'Mad Ashli' },
  { id: 'mad_ya_1', word: 'دِينِ', letters: ['dal', 'ya', 'nun'], transliteration: 'diini', meaning: 'Agama', category: 'Mad Ashli' },
  { id: 'mad_ya_2', word: 'قِيلَ', letters: ['qaf', 'ya', 'lam'], transliteration: 'qiila', meaning: 'Dikatakan', category: 'Mad Ashli' },
  { id: 'mad_ya_3', word: 'فِيهِ', letters: ['fa', 'ya', 'ha2'], transliteration: 'fiihi', meaning: 'Di dalamnya', category: 'Mad Ashli' },
  { id: 'mad_waw_1', word: 'نُورِ', letters: ['nun', 'waw', 'ra'], transliteration: 'nuuri', meaning: 'Cahaya', category: 'Mad Ashli' },
  { id: 'mad_waw_2', word: 'يَقُولُ', letters: ['ya', 'qaf', 'waw', 'lam'], transliteration: 'yaquulu', meaning: 'Berkata (Skrg)', category: 'Mad Ashli' },
  { id: 'mad_waw_3', word: 'تُوبُوا', letters: ['ta', 'waw', 'ba', 'waw'], transliteration: 'tuubuu', meaning: 'Bertaubatlah', category: 'Mad Ashli' },

  // --- KATEGORI 4: SUKUN & QALQALAH ---
  { id: 'sukun_1', word: 'اَكْبَر', letters: ['alif', 'kaf', 'ba', 'ra'], transliteration: 'akbar', meaning: 'Maha Besar', category: 'Sukun' },
  { id: 'sukun_2', word: 'مَسْجِد', letters: ['mim', 'sin', 'jim', 'dal'], transliteration: 'masjid', meaning: 'Masjid', category: 'Sukun' },
  { id: 'sukun_3', word: 'اَلْحَمْدُ', letters: ['alif', 'lam', 'ha', 'mim', 'dal'], transliteration: 'alhamdu', meaning: 'Segala Puji', category: 'Sukun' },
  { id: 'qalqalah_1', word: 'اَبْقَى', letters: ['alif', 'ba', 'qaf', 'ya'], transliteration: 'abqaa', meaning: 'Lebih Kekal', category: 'Sukun (Qalqalah)' },
  { id: 'qalqalah_2', word: 'يَدْخُلُ', letters: ['ya', 'dal', 'kha', 'lam'], transliteration: 'yadkhulu', meaning: 'Masuk (Skrg)', category: 'Sukun (Qalqalah)' },
  { id: 'qalqalah_3', word: 'يَقْطَعُ', letters: ['ya', 'qaf', 'tha', 'ain'], transliteration: 'yaqta\'u', meaning: 'Memotong', category: 'Sukun (Qalqalah)' },

  // --- KATEGORI 5: TANWIN ---
  { id: 'tanwin_fathah', word: 'حَقًّا', letters: ['ha', 'qaf', 'alif'], transliteration: 'haqqan', meaning: 'Benar', category: 'Tanwin' },
  { id: 'tanwin_kasrah', word: 'مُبِينٍ', letters: ['mim', 'ba', 'ya', 'nun'], transliteration: 'mubiinin', meaning: 'Nyata', category: 'Tanwin' },
  { id: 'tanwin_dhammah', word: 'عَلِيمٌ', letters: ['ain', 'lam', 'ya', 'mim'], transliteration: 'aliimun', meaning: 'Maha Mengetahui', category: 'Tanwin' },
  { id: 'tanwin_4', word: 'غَفُورٌ', letters: ['ghain', 'fa', 'waw', 'ra'], transliteration: 'ghafuurun', meaning: 'Maha Pengampun', category: 'Tanwin' },

  // --- KATEGORI 6: TASYDID ---
  { id: 'tasydid_1', word: 'رَبِّكَ', letters: ['ra', 'ba', 'kaf'], transliteration: 'rabbika', meaning: 'Tuhanmu', category: 'Tasydid' },
  { id: 'tasydid_2', word: 'مُحَمَّدٌ', letters: ['mim', 'ha', 'mim', 'dal'], transliteration: 'muhammadun', meaning: 'Nabi Muhammad', category: 'Tasydid' },
  { id: 'tasydid_3', word: 'اُمِّى', letters: ['alif', 'mim', 'ya'], transliteration: 'ummi', meaning: 'Ibuku', category: 'Tasydid' },
  { id: 'tasydid_4', word: 'جَنَّةٌ', letters: ['jim', 'nun', 'ta2'], transliteration: 'jannatun', meaning: 'Surga', category: 'Tasydid' },

  // --- KATEGORI 7: MAD WAJIB/JAIZ (PANJANG 4-6) ---
  { id: 'mad_wajib_1', word: 'جَاءَ', letters: ['jim', 'alif', 'hamzah'], transliteration: 'jaaa\'a', meaning: 'Datang', category: 'Mad Far\'i' },
  { id: 'mad_wajib_2', word: 'سَمَاء', letters: ['sin', 'mim', 'alif', 'hamzah'], transliteration: 'samaaa\'', meaning: 'Langit', category: 'Mad Far\'i' },
  { id: 'mad_jaiz_1', word: 'يَااَيُّهَا', letters: ['ya', 'alif', 'alif', 'ya'], transliteration: 'yaaa ayyuhaa', meaning: 'Wahai', category: 'Mad Far\'i' },

  // --- KATEGORI 8: KALIMAT PENDEK ---
  { id: 'phrase_1', word: 'رَبُّ الْعَالَمِينَ', letters: [], transliteration: 'rabbil \'aalamiin', meaning: 'Tuhan Semesta Alam', category: 'Kalimat' },
  { id: 'phrase_2', word: 'اِيَّاكَ نَعْبُدُ', letters: [], transliteration: 'iyyaaka na\'budu', meaning: 'Hanya kpd-Mu kami menyembah', category: 'Kalimat' },
  { id: 'phrase_3', word: 'فِي سَبِيلِ اللّٰهِ', letters: [], transliteration: 'fii sabiilillah', meaning: 'Di jalan Allah', category: 'Kalimat' },

  // --- REPEAT & VARIANTS TO REACH 100+ ---
  // (Adding more combinations for practice)
  { id: 'v_1', word: 'بَيْتٌ', letters: [], transliteration: 'baitun', meaning: 'Rumah', category: 'Tanwin' },
  { id: 'v_2', word: 'كِتَابٌ', letters: [], transliteration: 'kitaabun', meaning: 'Buku', category: 'Mad Ashli' },
  { id: 'v_3', word: 'قَلَمٌ', letters: [], transliteration: 'qalamun', meaning: 'Pena', category: 'Sambung 2-3' },
  { id: 'v_4', word: 'شَجَرَةٌ', letters: [], transliteration: 'syajaratun', meaning: 'Pohon', category: 'Sambung 2-3' },
  { id: 'v_5', word: 'وَلَدٌ', letters: [], transliteration: 'waladun', meaning: 'Anak laki-laki', category: 'Sambung 2-3' },
  { id: 'v_6', word: 'بِنْتٌ', letters: [], transliteration: 'bintun', meaning: 'Anak perempuan', category: 'Sukun' },
  { id: 'v_7', word: 'مَدْرَسَةٌ', letters: [], transliteration: 'madrasatun', meaning: 'Sekolah', category: 'Sukun' },
  { id: 'v_8', word: 'طَالِبٌ', letters: [], transliteration: 'thaalibun', meaning: 'Siswa', category: 'Mad Ashli' },
  { id: 'v_9', word: 'مُعَلِّمٌ', letters: [], transliteration: 'mu\'allimun', meaning: 'Guru', category: 'Tasydid' },
  { id: 'v_10', word: 'كُرْسِيٌّ', letters: [], transliteration: 'kursiyyun', meaning: 'Kursi', category: 'Tasydid' },
  { id: 'v_11', word: 'نَافِذَةٌ', letters: [], transliteration: 'naafidzatun', meaning: 'Jendela', category: 'Mad Ashli' },
  { id: 'v_12', word: 'بَابٌ', letters: [], transliteration: 'baabun', meaning: 'Pintu', category: 'Mad Ashli' },
  { id: 'v_13', word: 'شَمْسٌ', letters: [], transliteration: 'syamsun', meaning: 'Matahari', category: 'Sukun' },
  { id: 'v_14', word: 'قَمَرٌ', letters: [], transliteration: 'qamarun', meaning: 'Bulan', category: 'Sambung 2-3' },
  { id: 'v_15', word: 'نُجُومٌ', letters: [], transliteration: 'nujuumun', meaning: 'Bintang-bintang', category: 'Mad Ashli' },
  { id: 'v_16', word: 'سَمَاءٌ', letters: [], transliteration: 'samaa\'un', meaning: 'Langit', category: 'Mad Far\'i' },
  { id: 'v_17', word: 'اَرْضٌ', letters: [], transliteration: 'ardhun', meaning: 'Bumi', category: 'Sukun' },
  { id: 'v_18', word: 'بَحْرٌ', letters: [], transliteration: 'bahrun', meaning: 'Laut', category: 'Sukun' },
  { id: 'v_19', word: 'جَبَلٌ', letters: [], transliteration: 'jabalun', meaning: 'Gunung', category: 'Sambung 2-3' },
  { id: 'v_20', word: 'نَهْرٌ', letters: [], transliteration: 'nahrun', meaning: 'Sungai', category: 'Sukun' },
  { id: 'v_21', word: 'مَاءٌ', letters: [], transliteration: 'maa\'un', meaning: 'Air', category: 'Mad Far\'i' },
  { id: 'v_22', word: 'نَارٌ', letters: [], transliteration: 'naarun', meaning: 'Api', category: 'Mad Ashli' },
  { id: 'v_23', word: 'هَوَاءٌ', letters: [], transliteration: 'hawaa\'un', meaning: 'Udara', category: 'Mad Far\'i' },
  { id: 'v_24', word: 'طَعَامٌ', letters: [], transliteration: 'tha\'aamun', meaning: 'Makanan', category: 'Mad Ashli' },
  { id: 'v_25', word: 'لَبَنٌ', letters: [], transliteration: 'labanun', meaning: 'Susu', category: 'Sambung 2-3' },
  { id: 'v_26', word: 'خُبْزٌ', letters: [], transliteration: 'khubzun', meaning: 'Roti', category: 'Sukun' },
  { id: 'v_27', word: 'فَاكِهَةٌ', letters: [], transliteration: 'faakihatun', meaning: 'Buah-buahan', category: 'Mad Ashli' },
  { id: 'v_28', word: 'عِنَبٌ', letters: [], transliteration: 'inabun', meaning: 'Anggur', category: 'Sambung 2-3' },
  { id: 'v_29', word: 'تُفَّاحٌ', letters: [], transliteration: 'tuffaahun', meaning: 'Apel', category: 'Tasydid' },
  { id: 'v_30', word: 'بُرْتُقَالٌ', letters: [], transliteration: 'burtuqaalun', meaning: 'Jeruk', category: 'Mad Ashli' },
  { id: 'v_31', word: 'مَوْزٌ', letters: [], transliteration: 'mauzun', meaning: 'Pisang', category: 'Sukun' },
  { id: 'v_32', word: 'تَمْرٌ', letters: [], transliteration: 'tamrun', meaning: 'Kurma', category: 'Sukun' },
  { id: 'v_33', word: 'زَيْتٌ', letters: [], transliteration: 'zaitun', meaning: 'Minyak', category: 'Sukun' },
  { id: 'v_34', word: 'عَسَلٌ', letters: [], transliteration: 'asalun', meaning: 'Madu', category: 'Sambung 2-3' },
  { id: 'v_35', word: 'مِلْحٌ', letters: [], transliteration: 'milhun', meaning: 'Garam', category: 'Sukun' },
  { id: 'v_36', word: 'سُكَّرٌ', letters: [], transliteration: 'sukkarun', meaning: 'Gula', category: 'Tasydid' },
  { id: 'v_37', word: 'لَحْمٌ', letters: [], transliteration: 'lahmun', meaning: 'Daging', category: 'Sukun' },
  { id: 'v_38', word: 'سَمَكٌ', letters: [], transliteration: 'samakun', meaning: 'Ikan', category: 'Sambung 2-3' },
  { id: 'v_39', word: 'دَجَاجٌ', letters: [], transliteration: 'dajaajun', meaning: 'Ayam', category: 'Mad Ashli' },
  { id: 'v_40', word: 'بَيْضٌ', letters: [], transliteration: 'baidzhun', meaning: 'Telur', category: 'Sukun' },
  { id: 'v_41', word: 'خُضْرَاوَاتٌ', letters: [], transliteration: 'khudhraawaatun', meaning: 'Sayur-sayuran', category: 'Mad Ashli' },
  { id: 'v_42', word: 'بَصَلٌ', letters: [], transliteration: 'bashalun', meaning: 'Bawang', category: 'Sambung 2-3' },
  { id: 'v_43', word: 'ثُومٌ', letters: [], transliteration: 'thuumun', meaning: 'Bawang putih', category: 'Mad Ashli' },
  { id: 'v_44', word: 'طَمَاطِمٌ', letters: [], transliteration: 'thamaathimun', meaning: 'Tomat', category: 'Mad Ashli' },
  { id: 'v_45', word: 'بَطَاطِسٌ', letters: [], transliteration: 'bathaathisun', meaning: 'Kentang', category: 'Mad Ashli' },
  { id: 'v_46', word: 'خِيَارٌ', letters: [], transliteration: 'khiyaarun', meaning: 'Timun', category: 'Mad Ashli' },
  { id: 'v_47', word: 'جَزَرٌ', letters: [], transliteration: 'jazarun', meaning: 'Wortel', category: 'Sambung 2-3' },
  { id: 'v_48', word: 'فُلْفُلٌ', letters: [], transliteration: 'fulfulun', meaning: 'Cabai', category: 'Sukun' },
  { id: 'v_49', word: 'رُزٌّ', letters: [], transliteration: 'ruzzun', meaning: 'Nasi', category: 'Tasydid' },
  { id: 'v_50', word: 'قَهْوَةٌ', letters: [], transliteration: 'qahwatun', meaning: 'Kopi', category: 'Sukun' },
  { id: 'v_51', word: 'شَايٌّ', letters: [], transliteration: 'syaayyun', meaning: 'Teh', category: 'Tasydid' },
  { id: 'v_52', word: 'عَصِيرٌ', letters: [], transliteration: 'ashiirun', meaning: 'Jus', category: 'Mad Ashli' },
];
