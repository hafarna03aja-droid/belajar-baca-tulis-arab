import { HIJAIYAH_LETTERS } from './hijaiyah-data'
import { HIJAIYAH_WORDS } from './words-data'

export interface IqroWord {
  content: string
  transliteration: string
  audioUrl?: string
}

export interface PracticeLine {
  arabic: string
  transliteration: string
}

export interface IqroPage {
  id: string
  title: string
  instruction?: string
  rows: IqroWord[][] // Array of rows, each row is an array of words
  practiceLines?: PracticeLine[] // Extra practice rows shown below
}

export interface IqroJilid {
  id: number
  title: string
  pages: IqroPage[]
}

// Helper to chunk array into rows
const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

// ─── Practice Lines per Jilid ────────────────────────────────────────────────

const PRACTICE_JILID_1: PracticeLine[][] = [
  [
    { arabic: 'اَ بَ تَ ثَ جَ حَ', transliteration: 'a - ba - ta - tsa - ja - ha' },
    { arabic: 'خَ دَ ذَ رَ زَ سَ', transliteration: 'kha - da - dza - ra - za - sa' },
    { arabic: 'شَ صَ ضَ طَ ظَ عَ', transliteration: "sya - sha - dha - tha - zha - a'" },
    { arabic: 'غَ فَ قَ كَ لَ مَ', transliteration: 'gha - fa - qa - ka - la - ma' },
    { arabic: 'نَ وَ هَ يَ لاَ', transliteration: 'na - wa - ha - ya - la' },
  ],
  [
    { arabic: 'اَ بَ اَ تَ اَ ثَ', transliteration: 'a - ba - a - ta - a - tsa' },
    { arabic: 'اَ جَ اَ حَ اَ خَ', transliteration: 'a - ja - a - ha - a - kha' },
    { arabic: 'بَ تَ بَ ثَ بَ جَ', transliteration: 'ba - ta - ba - tsa - ba - ja' },
    { arabic: 'تَ ثَ تَ جَ تَ حَ', transliteration: 'ta - tsa - ta - ja - ta - ha' },
    { arabic: 'ثَ جَ ثَ حَ ثَ خَ', transliteration: 'tsa - ja - tsa - ha - tsa - kha' },
  ],
]

const PRACTICE_JILID_2: PracticeLine[][] = [
  [
    { arabic: 'بَتَ تَبَ بَتَ', transliteration: 'bata - taba - bata' },
    { arabic: 'كَتَبَ كَتَبَ كَتَبَ', transliteration: 'kataba - kataba - kataba' },
    { arabic: 'جَلَسَ دَرَسَ ذَهَبَ', transliteration: 'jalasa - darasa - dhahaba' },
    { arabic: 'اَكَلَ شَرَبَ خَرَجَ', transliteration: 'akala - syaraba - kharaja' },
    { arabic: 'دَخَلَ نَصَرَ حَسَنَ', transliteration: 'dakhala - nashara - hasana' },
  ],
]

const PRACTICE_JILID_3: PracticeLine[][] = [
  [
    { arabic: 'بِتِ تِبِ بِتِ', transliteration: 'biti - tibi - biti' },
    { arabic: 'بُتُ تُبُ بُتُ', transliteration: 'butu - tubu - butu' },
    { arabic: 'بَ بِ بُ — تَ تِ تُ', transliteration: 'ba bi bu — ta ti tu' },
    { arabic: 'جَ جِ جُ — حَ حِ حُ', transliteration: 'ja ji ju — ha hi hu' },
    { arabic: 'دَ دِ دُ — رَ رِ رُ', transliteration: 'da di du — ra ri ru' },
  ],
]

const PRACTICE_JILID_4: PracticeLine[][] = [
  [
    { arabic: 'اَكْبَر مَسْجِد اَلْحَمْدُ', transliteration: 'akbar - masjid - alhamdu' },
    { arabic: 'بَيْتٌ قَلَمٌ كِتَابٌ', transliteration: 'baitun - qalamun - kitaabun' },
    { arabic: 'شَمْسٌ قَمَرٌ نُجُومٌ', transliteration: 'syamsun - qamarun - nujuumun' },
    { arabic: 'بَحْرٌ نَهْرٌ جَبَلٌ', transliteration: 'bahrun - nahrun - jabalun' },
    { arabic: 'وَلَدٌ بِنْتٌ اُمٌّ', transliteration: 'waladun - bintun - ummun' },
  ],
]

const PRACTICE_JILID_5: PracticeLine[][] = [
  [
    { arabic: 'قَالَ كَانَ نَادَى', transliteration: 'qaala - kaana - naadaa' },
    { arabic: 'دِينِ قِيلَ فِيهِ', transliteration: 'diini - qiila - fiihi' },
    { arabic: 'نُورِ يَقُولُ تُوبُوا', transliteration: 'nuuri - yaquulu - tuubuu' },
    { arabic: 'كِتَابٌ طَالِبٌ نَافِذَةٌ', transliteration: 'kitaabun - thaalibun - naafidzatun' },
    { arabic: 'عَصِيرٌ بَابٌ فَاكِهَةٌ', transliteration: 'ashiirun - baabun - faakihatun' },
  ],
]

const PRACTICE_JILID_6: PracticeLine[][] = [
  [
    { arabic: 'رَبِّكَ مُحَمَّدٌ جَنَّةٌ', transliteration: 'rabbika - muhammadun - jannatun' },
    { arabic: 'اُمِّى سُكَّرٌ كُرْسِيٌّ', transliteration: 'ummi - sukkarun - kursiyyun' },
    { arabic: 'رَبُّ الْعَالَمِينَ', transliteration: "rabbil 'aalamiin" },
    { arabic: 'اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِينُ', transliteration: "iyyaaka na'budu wa iyyaaka nasta'iin" },
    { arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'bismillaahir rahmaanir rahiim' },
  ],
]

// ─── Jilid 7: Membaca Al-Qur'an ─────────────────────────────────────────────

const PRACTICE_JILID_7_PAGE_1: PracticeLine[] = [
  { arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'Bismillaahir rahmaanir rahiim' },
  { arabic: 'اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ', transliteration: "Alhamdulillaahi rabbil 'aalamiin" },
  { arabic: 'الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'Ar-rahmaanir rahiim' },
  { arabic: 'مٰلِكِ يَوْمِ الدِّينِ', transliteration: 'Maaliki yaumid-diin' },
  { arabic: 'اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِينُ', transliteration: "Iyyaaka na'budu wa iyyaaka nasta'iin" },
  { arabic: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', transliteration: 'Ihdinash-shiraathal mustaqiim' },
  { arabic: 'صِرَاطَ الَّذِينَ اَنْعَمْتَ عَلَيْهِمْ', transliteration: "Shiraathal ladziina an'amta 'alaihim" },
  { arabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', transliteration: 'Ghairil maghdzuubi \'alaihim wa lad-dhoolliin' },
  { arabic: 'اٰمِيْنَ — اَلْفَاتِحَةُ كَامِلَةٌ', transliteration: 'Aamiin — Al-Faatihah selesai' },
]

const PRACTICE_JILID_7_PAGE_2: PracticeLine[] = [
  { arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'Bismillaahir rahmaanir rahiim' },
  { arabic: 'قُلْ هُوَ اللّٰهُ اَحَدٌ', transliteration: 'Qul huwallaahu ahad' },
  { arabic: 'اَللّٰهُ الصَّمَدُ', transliteration: 'Allaahush-shamad' },
  { arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', transliteration: 'Lam yalid wa lam yuulad' },
  { arabic: 'وَلَمْ يَكُنْ لَّهُ كُفُوًا اَحَدٌ', transliteration: 'Wa lam yakul lahuu kufuwan ahad' },
  { arabic: 'قُلْ اَعُوذُ بِرَبِّ النَّاسِ', transliteration: "Qul a'uudzu bi rabbinnaaas" },
  { arabic: 'مَلِكِ النَّاسِ — اِلٰهِ النَّاسِ', transliteration: 'Malikin naas — ilaahin naas' },
  { arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', transliteration: 'Min syarril waswaasil khannaas' },
  { arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', transliteration: 'Alladzii yuwaswisu fii shuduurin naas' },
  { arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', transliteration: 'Minal jinnati wannaas' },
]

const PRACTICE_JILID_7_PAGE_3: PracticeLine[] = [
  { arabic: 'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ', transliteration: 'Allaahu laa ilaaha illaa huu' },
  { arabic: 'اَلْحَيُّ الْقَيُّومُ', transliteration: 'Al-hayyul qayyuum' },
  { arabic: 'لَا تَأْخُذُهُ سِنَةٌ وَّلَا نَوْمٌ', transliteration: "Laa ta'khudzuhuu sinatuw walaa naum" },
  { arabic: 'لَّهُ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِ', transliteration: 'Lahuu maa fis-samaawaati wa maa fil ardh' },
  { arabic: 'مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ اِلَّا بِاِذْنِهِ', transliteration: "Man dzalladzii yasyfa'u 'indahuu illaa bi idznih" },
  { arabic: 'يَعْلَمُ مَا بَيْنَ اَيْدِيهِمْ وَمَا خَلْفَهُمْ', transliteration: "Ya'lamu maa baina aidiihim wa maa khalfahum" },
  { arabic: 'وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَ', transliteration: "Wasi'a kursiyyuhus-samaawaati wal ardh" },
  { arabic: 'وَلَا يَئُودُهُ حِفْظُهُمَا', transliteration: 'Wa laa ya\'uuduhu hifzhuhumaa' },
  { arabic: 'وَهُوَ الْعَلِيُّ الْعَظِيمُ', transliteration: "Wa huwal 'aliyyul 'azhiim" },
]

const PRACTICE_JILID_7_PAGE_4: PracticeLine[] = [
  { arabic: 'اَلنُّونُ السَّاكِنَةُ وَالتَّنْوِينُ', transliteration: 'Hukum Nun Sukun & Tanwin' },
  { arabic: 'اِظْهَارٌ — اِدْغَامٌ — اِقْلَابٌ — اِخْفَاءٌ', transliteration: "Izhaar — Idghaam — Iqlaab — Ikhfaa'" },
  { arabic: 'مَنْ يَشَاءُ — مِنْ نِعْمَةٍ', transliteration: 'may yasyaau — min ni\'mah (Idghaam)' },
  { arabic: 'مِنْ بَعْدِ — اَنْبِئُونِي', transliteration: "mim ba'di — ambi'uunii (Iqlaab)" },
  { arabic: 'مِنْ ثَمَرَةٍ — كُنْتُمْ', transliteration: "min tsamaratin — kuntum (Ikhfaa')" },
  { arabic: 'رَبَّنَا — سَبَّحَ — اَتَمَّ', transliteration: 'rabbana — sabbaha — atamma (Qalqalah)' },
  { arabic: 'الشَّمْسُ — الْقَمَرُ', transliteration: 'asy-syamsu — al-qamaru (Syamsiah / Qamariah)' },
  { arabic: 'مَدُّ الطَّبِيعِي — مَدُّ الْمُتَّصِلِ', transliteration: "Mad Thabii'i — Mad Muttashil" },
  { arabic: 'مَدُّ الْعَارِضِ — مَدُّ الْمُنْفَصِلِ', transliteration: "Mad 'Aaridh — Mad Munfashil" },
  { arabic: 'وَقْفٌ — اِبْتِدَاءٌ — وَصْلٌ', transliteration: "Waqaf — Ibtidaa' — Washal" },
]

// ─── Main IQRO_DATA Export ───────────────────────────────────────────────────

export const IQRO_DATA: IqroJilid[] = [
  {
    id: 1,
    title: 'Jilid 1',
    pages: [
      {
        id: '1-1',
        title: 'Halaman 1: Dasar Fathah',
        instruction: 'Baca dengan pendek dan cepat (A-Ba-Ta)',
        rows: chunk(
          HIJAIYAH_LETTERS.slice(0, 12).map(l => ({
            content: l.withFathah,
            transliteration: l.transliteration + 'a',
          })),
          3
        ),
        practiceLines: PRACTICE_JILID_1[0],
      },
      {
        id: '1-2',
        title: 'Halaman 2: Dasar Fathah (Lanjut)',
        instruction: 'Latih kelancaran pengucapan',
        rows: chunk(
          HIJAIYAH_LETTERS.slice(12, 24).map(l => ({
            content: l.withFathah,
            transliteration: l.transliteration + 'a',
          })),
          3
        ),
        practiceLines: PRACTICE_JILID_1[1],
      },
    ],
  },
  {
    id: 2,
    title: 'Jilid 2',
    pages: [
      {
        id: '2-1',
        title: 'Halaman 1: Bentuk Sambung',
        instruction: 'Kenali huruf saat bergandengan',
        rows: chunk(
          HIJAIYAH_WORDS.slice(0, 12).map(w => ({
            content: w.word,
            transliteration: w.transliteration,
          })),
          3
        ),
        practiceLines: PRACTICE_JILID_2[0],
      },
    ],
  },
  {
    id: 3,
    title: 'Jilid 3',
    pages: [
      {
        id: '3-1',
        title: 'Halaman 1: Kasrah & Dhammah',
        instruction: 'Perhatikan perubahan bunyi i & u',
        rows: chunk(
          HIJAIYAH_WORDS.filter(w => w.category === '2 Huruf')
            .slice(0, 9)
            .map(w => ({ content: w.word, transliteration: w.transliteration })),
          3
        ),
        practiceLines: PRACTICE_JILID_3[0],
      },
    ],
  },
  {
    id: 4,
    title: 'Jilid 4',
    pages: [
      {
        id: '4-1',
        title: 'Halaman 1: Sukun & Tanwin',
        instruction: 'Tekan pada huruf mati',
        rows: chunk(
          HIJAIYAH_WORDS.filter(w => w.category?.includes('Sukun'))
            .slice(0, 9)
            .map(w => ({ content: w.word, transliteration: w.transliteration })),
          3
        ),
        practiceLines: PRACTICE_JILID_4[0],
      },
    ],
  },
  {
    id: 5,
    title: 'Jilid 5',
    pages: [
      {
        id: '5-1',
        title: 'Halaman 1: Mad Ashli',
        instruction: 'Ayunan suara 2 harakat',
        rows: chunk(
          HIJAIYAH_WORDS.filter(w => w.category?.includes('Mad'))
            .slice(0, 9)
            .map(w => ({ content: w.word, transliteration: w.transliteration })),
          3
        ),
        practiceLines: PRACTICE_JILID_5[0],
      },
    ],
  },
  {
    id: 6,
    title: 'Jilid 6',
    pages: [
      {
        id: '6-1',
        title: 'Halaman 1: Tasydid & Idgham',
        instruction: 'Latihan tingkat lanjut',
        rows: chunk(
          HIJAIYAH_WORDS.filter(w => w.category?.includes('Tasydid'))
            .slice(0, 9)
            .map(w => ({ content: w.word, transliteration: w.transliteration })),
          3
        ),
        practiceLines: PRACTICE_JILID_6[0],
      },
    ],
  },
  // ─── Jilid 7: Membaca Al-Qur'an ──────────────────────────────────────────
  {
    id: 7,
    title: 'Jilid 7',
    pages: [
      {
        id: '7-1',
        title: 'Halaman 1: Surah Al-Fatihah',
        instruction: "Baca tartil ayat demi ayat — induk segala surah",
        rows: [
          [{ content: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'Bismillaahir rahmaanir rahiim' }],
          [{ content: 'اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ', transliteration: "Alhamdulillaahi rabbil 'aalamiin" }],
          [{ content: 'الرَّحْمٰنِ الرَّحِيمِ', transliteration: 'Ar-rahmaanir rahiim' }],
          [{ content: 'مٰلِكِ يَوْمِ الدِّينِ', transliteration: 'Maaliki yaumid-diin' }],
        ],
        practiceLines: PRACTICE_JILID_7_PAGE_1,
      },
      {
        id: '7-2',
        title: 'Halaman 2: Al-Ikhlas & An-Nas',
        instruction: 'Surah pendek wajib dikuasai — ulangi hingga hafal',
        rows: [
          [{ content: 'قُلْ هُوَ اللّٰهُ اَحَدٌ', transliteration: 'Qul huwallaahu ahad' }],
          [{ content: 'اَللّٰهُ الصَّمَدُ', transliteration: 'Allaahush-shamad' }],
          [{ content: 'قُلْ اَعُوذُ بِرَبِّ النَّاسِ', transliteration: "Qul a'uudzu bi rabbinnaaas" }],
          [{ content: 'مَلِكِ النَّاسِ — اِلٰهِ النَّاسِ', transliteration: 'Malikin naas — ilaahin naas' }],
        ],
        practiceLines: PRACTICE_JILID_7_PAGE_2,
      },
      {
        id: '7-3',
        title: 'Halaman 3: Ayat Kursi',
        instruction: "Ayat paling agung — baca dengan penghayatan",
        rows: [
          [{ content: 'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ', transliteration: 'Allaahu laa ilaaha illaa huu' }],
          [{ content: 'اَلْحَيُّ الْقَيُّومُ', transliteration: 'Al-hayyul qayyuum' }],
          [{ content: 'وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَ', transliteration: "Wasi'a kursiyyuhus-samaawaati wal ardh" }],
          [{ content: 'وَهُوَ الْعَلِيُّ الْعَظِيمُ', transliteration: "Wa huwal 'aliyyul 'azhiim" }],
        ],
        practiceLines: PRACTICE_JILID_7_PAGE_3,
      },
      {
        id: '7-4',
        title: 'Halaman 4: Ilmu Tajwid Dasar',
        instruction: 'Pelajari hukum bacaan — kunci kesempurnaan tilawah',
        rows: [
          [
            { content: 'اِظْهَارٌ', transliteration: 'Izhaar' },
            { content: 'اِدْغَامٌ', transliteration: 'Idghaam' },
            { content: 'اِقْلَابٌ', transliteration: 'Iqlaab' },
          ],
          [
            { content: 'اِخْفَاءٌ', transliteration: "Ikhfaa'" },
            { content: 'قَلْقَلَةٌ', transliteration: 'Qalqalah' },
            { content: 'غُنَّةٌ', transliteration: 'Ghunnah' },
          ],
          [
            { content: 'مَدُّ طَبِيعِي', transliteration: "Mad Thabii'i" },
            { content: 'مَدُّ مُتَّصِل', transliteration: 'Mad Muttashil' },
            { content: 'مَدُّ مُنْفَصِل', transliteration: 'Mad Munfashil' },
          ],
        ],
        practiceLines: PRACTICE_JILID_7_PAGE_4,
      },
    ],
  },
]
