import { IQRO_DATA } from './src/lib/iqro-data.js';
import { HIJAIYAH_LETTERS } from './src/lib/hijaiyah-data.js';
import * as fs from 'fs';

const hijaiyahIds = HIJAIYAH_LETTERS.map(l => l.id);

let iqroWords = [];
IQRO_DATA.forEach(jilid => {
  if (jilid.id < 7) {
    jilid.pages.forEach(page => {
      page.rows.forEach(row => {
        row.forEach(word => {
          if (word.transliteration) {
            iqroWords.push(word.transliteration);
          }
        });
      });
    });
  }
});

let md = '# Panduan Rekaman Audio Qur\'an Flow\n\n';
md += 'Gunakan daftar ini sebagai contekan (checklist) saat merekam suara. Pastikan nama file MP3 yang Anda simpan **sama persis** dengan yang ada di kolom "Nama File" agar sistem bisa otomatis membacanya.\n\n';

md += '## 1. Folder: `huruf`\n';
md += 'Buat folder bernama `huruf` di dalam *bucket* `quran-audio` Anda. Rekam pengucapan huruf dasar.\n\n';
md += '| Huruf | Cara Baca | Nama File yang harus dibuat |\n';
md += '|---|---|---|\n';
hijaiyahIds.forEach(id => {
  md += '| ' + id.charAt(0).toUpperCase() + id.slice(1) + ' | ' + id + ' | `' + id + '.mp3` |\n';
});

md += '\n## 2. Folder: `iqro`\n';
md += 'Buat folder bernama `iqro` di dalam *bucket* `quran-audio` Anda. Rekam pengucapan kata untuk tiap tingkat (hanya sampai Jilid 6, karena Jilid 7 tanpa audio).\n\n';
md += '| Kata (Cara Baca) | Nama File yang harus dibuat |\n';
md += '|---|---|\n';

const uniqueWords = [...new Set(iqroWords)];
uniqueWords.forEach(word => {
  const fileName = word.toLowerCase().replace(/\s+/g, '-');
  md += '| ' + word + ' | `' + fileName + '.mp3` |\n';
});

fs.writeFileSync('audio-checklist.md', md);
console.log('File audio-checklist.md generated with TS output.');
