
const fs = require('fs');

const content = fs.readFileSync('d:/belajar baca tulis Al Qur\'an/quran-flow/src/lib/words-data.ts', 'utf8');

// More robust regex to handle escaped quotes
const regex = /\{ id: '(.+?)', word: '(.+?)', letters: \[(.*?)\], transliteration: '(.*?)', meaning: '(.*?)', category: '(.*?)' \}/g;
let match;
const words = [];
while ((match = regex.exec(content)) !== null) {
    words.push({
        id: match[1],
        word: match[2],
        trans: match[4].replace(/\\'/g, "'"),
        meaning: match[5],
        cat: match[6]
    });
}

let md = '# Daftar Lengkap Audio: Level 5 & 6 (102 Item)\n\n';
md += 'Berikut adalah daftar lengkap seluruh kata dan kalimat untuk Level 5 (Membaca) dan Level 6 (Menulis).\n\n';

const categories = [...new Set(words.map(w => w.cat))];

categories.forEach(cat => {
    md += `## Kategori: ${cat}\n\n`;
    md += '| No | Arab | Transliterasi | Arti | Nama File |\n';
    md += '|---|---|---|---|---|\n';
    
    const catWords = words.filter(w => w.cat === cat);
    catWords.forEach((w, index) => {
        // Clean filename: remove ' and other non-alphanumeric chars
        const fileName = w.trans.toLowerCase()
            .replace(/['’]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
        md += `| ${index + 1} | ${w.word} | ${w.trans} | ${w.meaning} | \`${fileName}.mp3\` |\n`;
    });
    md += '\n---\n\n';
});

md += `**Total Item: ${words.length}**\n\n`;
md += '**Catatan:** Gunakan ekstensi `.mp3` (huruf kecil) saat mengunggah.';

fs.writeFileSync('d:/belajar baca tulis Al Qur\'an/quran-flow/list-audio-2-3.md', md);
console.log(`Success! Written ${words.length} items to list-audio-2-3.md`);
