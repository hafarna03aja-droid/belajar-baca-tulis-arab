const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually load .env.local
const envPath = path.join(__dirname, '.env.local');
let SUPABASE_URL, SUPABASE_SERVICE_KEY;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      envVars[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
    }
  });
  SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
  SUPABASE_SERVICE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;
} catch (err) {
  console.error("❌ Gagal membaca .env.local:", err.message);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Error: SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const BUCKET_NAME = 'quran-audio';
const FOLDER_NAME = 'iqro';

async function renameAudioFiles() {
  console.log(`🔍 Memeriksa file di bucket '${BUCKET_NAME}', folder '${FOLDER_NAME}'...`);
  
  // Ambil daftar file
  const { data: files, error: listError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list(FOLDER_NAME, {
      limit: 500,
      offset: 0,
    });

  if (listError) {
    console.error("❌ Gagal mengambil daftar file:", listError.message);
    return;
  }

  const mp3Files = files.filter(file => file.name.endsWith('.MP3'));
  
  if (mp3Files.length === 0) {
    console.log("✅ Tidak ada file berakhiran .MP3 (huruf besar). Semua sudah konsisten!");
    return;
  }

  console.log(`Menemukan ${mp3Files.length} file dengan ekstensi .MP3. Memulai proses rename...`);

  let successCount = 0;
  let failCount = 0;

  for (const file of mp3Files) {
    const oldPath = `${FOLDER_NAME}/${file.name}`;
    // Replace .MP3 dengan .mp3
    const newName = file.name.substring(0, file.name.length - 4) + '.mp3';
    const newPath = `${FOLDER_NAME}/${newName}`;

    console.log(`🔄 Mengganti: ${oldPath} -> ${newPath}`);

    const { error: moveError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .move(oldPath, newPath);

    if (moveError) {
      console.error(`  ❌ Gagal mengganti ${file.name}:`, moveError.message);
      failCount++;
    } else {
      console.log(`  ✅ Berhasil!`);
      successCount++;
    }
  }

  console.log("\n🎉 PROSES SELESAI!");
  console.log(`✅ Berhasil diubah: ${successCount} file`);
  if (failCount > 0) console.log(`❌ Gagal diubah: ${failCount} file`);
}

renameAudioFiles();
