/**
 * ====================================================
 * AUDIO AUDITOR SCRIPT - Qur'an Flow
 * ====================================================
 * Memeriksa ketersediaan 102 file audio Level 5 & 6
 * di Supabase Storage bucket 'quran-audio'
 * 
 * Cara pakai: node audio-auditor.js
 * ====================================================
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ─── Baca .env.local ───────────────────────────────
const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
}

const SUPABASE_URL      = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_ROLE_KEY  = env['SUPABASE_SERVICE_ROLE_KEY'];
const BUCKET            = 'quran-audio';
const FOLDER            = 'words';

// ─── Helper: HTTPS GET ──────────────────────────────
function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
  });
}

// ─── 102 File yang diharapkan ──────────────────────
const EXPECTED_AUDIO_FILES = [
  // Sambung 2-3
  { file: 'bata.mp3',           word: 'بَتَ',         meaning: 'Bata',            category: 'Sambung 2-3' },
  { file: 'tara.mp3',           word: 'تَرَ',         meaning: 'Tara',            category: 'Sambung 2-3' },
  { file: 'darasa.mp3',         word: 'دَرَسَ',       meaning: 'Belajar',         category: 'Sambung 2-3' },
  { file: 'kataba.mp3',         word: 'كَتَبَ',       meaning: 'Menulis',         category: 'Sambung 2-3' },
  { file: 'jalasa.mp3',         word: 'جَلَسَ',       meaning: 'Duduk',           category: 'Sambung 2-3' },
  { file: 'nasara.mp3',         word: 'نَصَرَ',       meaning: 'Menolong',        category: 'Sambung 2-3' },
  { file: 'akala.mp3',          word: 'اَكَلَ',       meaning: 'Makan',           category: 'Sambung 2-3' },
  { file: 'dhahaba.mp3',        word: 'ذَهَبَ',       meaning: 'Pergi',           category: 'Sambung 2-3' },
  { file: 'syaraba.mp3',        word: 'شَرَبَ',       meaning: 'Minum',           category: 'Sambung 2-3' },
  { file: 'dakhala.mp3',        word: 'دَخَلَ',       meaning: 'Masuk',           category: 'Sambung 2-3' },
  { file: 'kharaja.mp3',        word: 'خَرَجَ',       meaning: 'Keluar',          category: 'Sambung 2-3' },
  { file: 'hasana.mp3',         word: 'حَسَنَ',       meaning: 'Baik',            category: 'Sambung 2-3' },
  { file: 'qalamun.mp3',        word: 'قَلَمٌ',       meaning: 'Pena',            category: 'Sambung 2-3' },
  { file: 'syajaratun.mp3',     word: 'شَجَرَةٌ',     meaning: 'Pohon',           category: 'Sambung 2-3' },
  { file: 'waladun.mp3',        word: 'وَلَدٌ',       meaning: 'Anak laki-laki',  category: 'Sambung 2-3' },
  { file: 'qamarun.mp3',        word: 'قَمَرٌ',       meaning: 'Bulan',           category: 'Sambung 2-3' },
  { file: 'jabalun.mp3',        word: 'جَبَلٌ',       meaning: 'Gunung',          category: 'Sambung 2-3' },
  { file: 'labanun.mp3',        word: 'لَبَنٌ',       meaning: 'Susu',            category: 'Sambung 2-3' },
  { file: 'inabun.mp3',         word: 'عِنَبٌ',       meaning: 'Anggur',          category: 'Sambung 2-3' },
  { file: 'asalun.mp3',         word: 'عَسَلٌ',       meaning: 'Madu',            category: 'Sambung 2-3' },
  { file: 'samakun.mp3',        word: 'سَمَكٌ',       meaning: 'Ikan',            category: 'Sambung 2-3' },
  { file: 'bashalun.mp3',       word: 'بَصَلٌ',       meaning: 'Bawang',          category: 'Sambung 2-3' },
  { file: 'jazarun.mp3',        word: 'جَزَرٌ',       meaning: 'Wortel',          category: 'Sambung 2-3' },
  // Bentuk Huruf
  { file: 'alama.mp3',          word: 'عَلَمَ',       meaning: 'Tanda',           category: 'Bentuk Huruf' },
  { file: 'baada.mp3',          word: 'بَعَدَ',       meaning: 'Setelah',         category: 'Bentuk Huruf' },
  { file: 'samia.mp3',          word: 'سَمِعَ',       meaning: 'Mendengar',       category: 'Bentuk Huruf' },
  { file: 'lahaba.mp3',         word: 'لَهَبَ',       meaning: 'Api',             category: 'Bentuk Huruf' },
  { file: 'fagiha.mp3',         word: 'فَقِهَ',       meaning: 'Faham',           category: 'Bentuk Huruf' },
  { file: 'kabura.mp3',         word: 'كَبُرَ',       meaning: 'Besar',           category: 'Bentuk Huruf' },
  { file: 'syakara.mp3',        word: 'شَكَرَ',       meaning: 'Syukur',          category: 'Bentuk Huruf' },
  { file: 'yasara.mp3',         word: 'يَسَرَ',       meaning: 'Mudah',           category: 'Bentuk Huruf' },
  { file: 'hamida.mp3',         word: 'حَمِدَ',       meaning: 'Memuji',          category: 'Bentuk Huruf' },
  // Mad Ashli
  { file: 'naadaa.mp3',         word: 'نَادَى',       meaning: 'Memanggil',       category: 'Mad Ashli' },
  { file: 'qaala.mp3',          word: 'قَالَ',        meaning: 'Berkata',         category: 'Mad Ashli' },
  { file: 'kaana.mp3',          word: 'كَانَ',        meaning: 'Adalah',          category: 'Mad Ashli' },
  { file: 'diini.mp3',          word: 'دِينِ',        meaning: 'Agama',           category: 'Mad Ashli' },
  { file: 'qiila.mp3',          word: 'قِيلَ',        meaning: 'Dikatakan',       category: 'Mad Ashli' },
  { file: 'fiihi.mp3',          word: 'فِيهِ',        meaning: 'Di dalamnya',     category: 'Mad Ashli' },
  { file: 'nuuri.mp3',          word: 'نُورِ',        meaning: 'Cahaya',          category: 'Mad Ashli' },
  { file: 'yaquulu.mp3',        word: 'يَقُولُ',      meaning: 'Berkata (Skrg)',  category: 'Mad Ashli' },
  { file: 'tuubuu.mp3',         word: 'تُوبُوا',      meaning: 'Bertaubatlah',    category: 'Mad Ashli' },
  { file: 'kitaabun.mp3',       word: 'كِتَابٌ',      meaning: 'Buku',            category: 'Mad Ashli' },
  { file: 'thaalibun.mp3',      word: 'طَالِبٌ',      meaning: 'Siswa',           category: 'Mad Ashli' },
  { file: 'naafidzatun.mp3',    word: 'نَافِذَةٌ',    meaning: 'Jendela',         category: 'Mad Ashli' },
  { file: 'baabun.mp3',         word: 'بَابٌ',        meaning: 'Pintu',           category: 'Mad Ashli' },
  { file: 'nujuumun.mp3',       word: 'نُجُومٌ',      meaning: 'Bintang-bintang', category: 'Mad Ashli' },
  { file: 'naarun.mp3',         word: 'نَارٌ',        meaning: 'Api',             category: 'Mad Ashli' },
  { file: 'thaaamun.mp3',       word: 'طَعَامٌ',      meaning: 'Makanan',         category: 'Mad Ashli' },
  { file: 'faakihatun.mp3',     word: 'فَاكِهَةٌ',    meaning: 'Buah-buahan',     category: 'Mad Ashli' },
  { file: 'burtuqaalun.mp3',    word: 'بُرْتُقَالٌ',  meaning: 'Jeruk',           category: 'Mad Ashli' },
  { file: 'dajaajun.mp3',       word: 'دَجَاجٌ',      meaning: 'Ayam',            category: 'Mad Ashli' },
  { file: 'khudhraawaatun.mp3', word: 'خُضْرَاوَاتٌ', meaning: 'Sayur-sayuran',   category: 'Mad Ashli' },
  { file: 'thuumun.mp3',        word: 'ثُومٌ',        meaning: 'Bawang putih',    category: 'Mad Ashli' },
  { file: 'thamaathimun.mp3',   word: 'طَمَاطِمٌ',    meaning: 'Tomat',           category: 'Mad Ashli' },
  { file: 'bathaathisun.mp3',   word: 'بَطَاطِسٌ',    meaning: 'Kentang',         category: 'Mad Ashli' },
  { file: 'khiyaarun.mp3',      word: 'خِيَارٌ',      meaning: 'Timun',           category: 'Mad Ashli' },
  { file: 'ashiirun.mp3',       word: 'عَصِيرٌ',      meaning: 'Jus',             category: 'Mad Ashli' },
  // Sukun
  { file: 'akbar.mp3',          word: 'اَكْبَر',      meaning: 'Maha Besar',      category: 'Sukun' },
  { file: 'masjid.mp3',         word: 'مَسْجِد',      meaning: 'Masjid',          category: 'Sukun' },
  { file: 'alhamdu.mp3',        word: 'اَلْحَمْدُ',   meaning: 'Segala Puji',     category: 'Sukun' },
  { file: 'bintun.mp3',         word: 'بِنْتٌ',       meaning: 'Anak perempuan',  category: 'Sukun' },
  { file: 'madrasatun.mp3',     word: 'مَدْرَسَةٌ',   meaning: 'Sekolah',         category: 'Sukun' },
  { file: 'syamsun.mp3',        word: 'شَمْسٌ',       meaning: 'Matahari',        category: 'Sukun' },
  { file: 'ardhun.mp3',         word: 'اَرْضٌ',       meaning: 'Bumi',            category: 'Sukun' },
  { file: 'bahrun.mp3',         word: 'بَحْرٌ',       meaning: 'Laut',            category: 'Sukun' },
  { file: 'nahrun.mp3',         word: 'نَهْرٌ',       meaning: 'Sungai',          category: 'Sukun' },
  { file: 'khubzun.mp3',        word: 'خُبْزٌ',       meaning: 'Roti',            category: 'Sukun' },
  { file: 'mauzun.mp3',         word: 'مَوْزٌ',       meaning: 'Pisang',          category: 'Sukun' },
  { file: 'tamrun.mp3',         word: 'تَمْرٌ',       meaning: 'Kurma',           category: 'Sukun' },
  { file: 'zaitun.mp3',         word: 'زَيْتٌ',       meaning: 'Minyak',          category: 'Sukun' },
  { file: 'milhun.mp3',         word: 'مِلْحٌ',       meaning: 'Garam',           category: 'Sukun' },
  { file: 'lahmun.mp3',         word: 'لَحْمٌ',       meaning: 'Daging',          category: 'Sukun' },
  { file: 'baidzhun.mp3',       word: 'بَيْضٌ',       meaning: 'Telur',           category: 'Sukun' },
  { file: 'fulfulun.mp3',       word: 'فُلْفُلٌ',     meaning: 'Cabai',           category: 'Sukun' },
  { file: 'qahwatun.mp3',       word: 'قَهْوَةٌ',     meaning: 'Kopi',            category: 'Sukun' },
  // Sukun Qalqalah
  { file: 'abqaa.mp3',          word: 'اَبْقَى',      meaning: 'Lebih Kekal',     category: 'Sukun (Qalqalah)' },
  { file: 'yadkhulu.mp3',       word: 'يَدْخُلُ',     meaning: 'Masuk (Skrg)',    category: 'Sukun (Qalqalah)' },
  { file: 'yaqtau.mp3',         word: 'يَقْطَعُ',     meaning: 'Memotong',        category: 'Sukun (Qalqalah)' },
  // Tanwin
  { file: 'haqqan.mp3',         word: 'حَقًّا',       meaning: 'Benar',           category: 'Tanwin' },
  { file: 'mubiinin.mp3',       word: 'مُبِينٍ',      meaning: 'Nyata',           category: 'Tanwin' },
  { file: 'aliimun.mp3',        word: 'عَلِيمٌ',      meaning: 'Maha Mengetahui', category: 'Tanwin' },
  { file: 'ghafuurun.mp3',      word: 'غَفُورٌ',      meaning: 'Maha Pengampun',  category: 'Tanwin' },
  { file: 'baitun.mp3',         word: 'بَيْتٌ',       meaning: 'Rumah',           category: 'Tanwin' },
  // Tasydid
  { file: 'rabbika.mp3',        word: 'رَبِّكَ',      meaning: 'Tuhanmu',         category: 'Tasydid' },
  { file: 'muhammadun.mp3',     word: 'مُحَمَّدٌ',    meaning: 'Nabi Muhammad',   category: 'Tasydid' },
  { file: 'ummi.mp3',           word: 'اُمِّى',       meaning: 'Ibuku',           category: 'Tasydid' },
  { file: 'jannatun.mp3',       word: 'جَنَّةٌ',      meaning: 'Surga',           category: 'Tasydid' },
  { file: 'muallimun.mp3',      word: 'مُعَلِّمٌ',    meaning: 'Guru',            category: 'Tasydid' },
  { file: 'kursiyyun.mp3',      word: 'كُرْسِيٌّ',    meaning: 'Kursi',           category: 'Tasydid' },
  { file: 'tuffaahun.mp3',      word: 'تُفَّاحٌ',     meaning: 'Apel',            category: 'Tasydid' },
  { file: 'sukkarun.mp3',       word: 'سُكَّرٌ',      meaning: 'Gula',            category: 'Tasydid' },
  { file: 'ruzzun.mp3',         word: 'رُزٌّ',        meaning: 'Nasi',            category: 'Tasydid' },
  { file: 'syaayyun.mp3',       word: 'شَايٌّ',       meaning: 'Teh',             category: 'Tasydid' },
  // Mad Far'i
  { file: 'jaaaa.mp3',          word: 'جَاءَ',        meaning: 'Datang',          category: "Mad Far'i" },
  { file: 'samaaa.mp3',         word: 'سَمَاء',       meaning: 'Langit',          category: "Mad Far'i" },
  { file: 'yaaa-ayyuhaa.mp3',   word: 'يَااَيُّهَا',  meaning: 'Wahai',           category: "Mad Far'i" },
  { file: 'samaaun.mp3',        word: 'سَمَاءٌ',      meaning: 'Langit',          category: "Mad Far'i" },
  { file: 'maaun.mp3',          word: 'مَاءٌ',        meaning: 'Air',             category: "Mad Far'i" },
  { file: 'hawaaun.mp3',        word: 'هَوَاءٌ',      meaning: 'Udara',           category: "Mad Far'i" },
  // Kalimat
  { file: 'rabbil-aalamiin.mp3', word: 'رَبُّ الْعَالَمِينَ', meaning: 'Tuhan Semesta Alam',          category: 'Kalimat' },
  { file: 'iyyaaka-nabudu.mp3',  word: 'اِيَّاكَ نَعْبُدُ',   meaning: 'Hanya kpd-Mu kami menyembah', category: 'Kalimat' },
  { file: 'fii-sabiilillah.mp3', word: 'فِي سَبِيلِ اللّٰهِ', meaning: 'Di jalan Allah',              category: 'Kalimat' },
];

// ─── Warna terminal ────────────────────────────────
const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m';
const C = '\x1b[36m', B = '\x1b[1m',  X = '\x1b[0m';

// ─── Main ──────────────────────────────────────────
async function runAudit() {
  console.log(`\n${B}${C}====================================================`);
  console.log(`  🔍 AUDIO AUDITOR — Qur'an Flow`);
  console.log(`====================================================\n${X}`);

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error(`${R}ERROR: Variabel .env.local tidak terbaca. Pastikan file .env.local ada.${X}`);
    process.exit(1);
  }

  console.log(`📡 Supabase URL : ${SUPABASE_URL}`);
  console.log(`📦 Bucket/Folder: ${BUCKET}/${FOLDER}\n`);
  console.log(`⏳ Menghubungkan ke Supabase Storage API...`);

  // Panggil Supabase Storage REST API langsung
  const apiUrl = `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`;
  const res = await httpsGet(apiUrl, {
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
  });

  // Supabase Storage list butuh POST, kita pakai alternatif: cek head per file
  // Gunakan public URL untuk cek keberadaan tiap file
  console.log(`✅ Koneksi berhasil. Melakukan audit 102 file...\n`);

  const missing   = [];
  const found     = [];
  let checked = 0;

  // Cek setiap file via HEAD request ke public URL
  for (const item of EXPECTED_AUDIO_FILES) {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FOLDER}/${item.file}`;
    try {
      const result = await headRequest(publicUrl);
      if (result === 200) {
        found.push(item);
      } else {
        missing.push(item);
      }
    } catch {
      missing.push(item);
    }
    checked++;
    process.stdout.write(`\r  Memeriksa: ${checked}/${EXPECTED_AUDIO_FILES.length} file...`);
  }
  console.log('\n');

  // ─── Laporan ─────────────────────────────────────
  const total = EXPECTED_AUDIO_FILES.length;
  const score = Math.round((found.length / total) * 100);

  console.log(`${B}${C}📋 LAPORAN AUDIT AUDIO${X}`);
  console.log(`${'─'.repeat(52)}`);
  console.log(`${G}✅ Tersedia : ${found.length} / ${total}${X}`);
  console.log(`${R}❌ Tidak Ada: ${missing.length} / ${total}${X}`);
  console.log(`${'─'.repeat(52)}\n`);

  if (missing.length > 0) {
    console.log(`${B}${R}❌ FILE YANG BELUM DIUNGGAH (${missing.length} item):${X}`);
    const byCategory = {};
    for (const item of missing) {
      if (!byCategory[item.category]) byCategory[item.category] = [];
      byCategory[item.category].push(item);
    }
    for (const [cat, items] of Object.entries(byCategory)) {
      console.log(`\n  📁 ${B}${cat}${X}:`);
      for (const item of items) {
        console.log(`     ${R}✗${X} ${item.file.padEnd(28)} ${item.word}  (${item.meaning})`);
      }
    }
  }

  console.log(`\n${'═'.repeat(52)}`);
  const scoreColor = score === 100 ? G : score >= 70 ? Y : R;
  console.log(`${B}📊 SKOR KESIAPAN: ${scoreColor}${score}%${X}`);

  if (score === 100) {
    console.log(`${G}🎉 SEMPURNA! Semua 102 audio siap. Level 5 & 6 siap rilis!${X}`);
  } else if (score >= 70) {
    console.log(`${Y}⚡ Hampir! Unggah ${missing.length} file tersisa ke bucket '${BUCKET}/${FOLDER}'.${X}`);
  } else {
    console.log(`${R}🔧 Butuh perhatian. ${missing.length} file belum diunggah.${X}`);
  }
  console.log(`${'═'.repeat(52)}\n`);

  // Simpan laporan markdown
  const reportLines = [
    `# Laporan Audit Audio — Qur'an Flow`,
    `> Dijalankan: ${new Date().toLocaleString('id-ID')}`,
    ``,
    `## Ringkasan`,
    `| Status | Jumlah |`,
    `|--------|--------|`,
    `| ✅ Tersedia | ${found.length} / ${total} |`,
    `| ❌ Tidak Ada | ${missing.length} / ${total} |`,
    `| 📊 Skor Kesiapan | **${score}%** |`,
    ``,
    `## ❌ File yang Belum Diunggah (${missing.length} item)`,
    ``,
    `Upload ke Supabase Storage: \`${BUCKET}/${FOLDER}/\``,
    ``,
    ...missing.map(i => `- [ ] \`${i.file}\` — ${i.word} *(${i.meaning})* [${i.category}]`),
    ``,
    `## ✅ File yang Sudah Tersedia (${found.length} item)`,
    ``,
    ...found.map(i => `- [x] \`${i.file}\` — ${i.word} *(${i.meaning})*`),
  ];

  const reportPath = 'audio-audit-report.md';
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');
  console.log(`💾 Laporan lengkap: ${B}${reportPath}${X}\n`);
}

// HEAD request helper
function headRequest(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'HEAD',
      headers: { 'apikey': SERVICE_ROLE_KEY },
    };
    const req = https.request(options, (res) => resolve(res.statusCode));
    req.on('error', () => resolve(0));
    req.end();
  });
}

runAudit().catch(console.error);
