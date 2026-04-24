import { IQRO_DATA } from './src/lib/iqro-data';
import { HIJAIYAH_LETTERS } from './src/lib/hijaiyah-data';
import * as fs from 'fs';

const hijaiyahIds = HIJAIYAH_LETTERS.map(l => l.id);

const iqroWords: string[] = [];
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
md += 'Buat folder bernama `huruf` di dalam *bucket* `quran-audio` Anda. Rekam pengucapan huruf dengan semua variasi harakatnya.\n\n';

const harakats = [
  { id: 'fathah', name: 'Fathah' },
  { id: 'kasrah', name: 'Kasrah' },
  { id: 'dhammah', name: 'Dhammah' },
  { id: 'sukun', name: 'Sukun' },
  { id: 'fathah_tanwin', name: 'Fathah Tanwin (Fathatain)' },
  { id: 'kasrah_tanwin', name: 'Kasrah Tanwin (Kasratain)' },
  { id: 'dhammah_tanwin', name: 'Dhammah Tanwin (Dhammatain)' }
];

md += '| Huruf | Variasi Harakat | Nama File yang harus dibuat |\n';
md += '|---|---|---|\n';
hijaiyahIds.forEach(id => {
  const letterName = id.charAt(0).toUpperCase() + id.slice(1);
  harakats.forEach(h => {
    md += '| ' + letterName + ' | ' + h.name + ' | `' + id + '-' + h.id + '.mp3` |\n';
  });
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

fs.writeFileSync('checklist.md', md);
console.log('Artifact generated.');
