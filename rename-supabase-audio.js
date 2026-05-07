// require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Anda memerlukan SERVICE_ROLE_KEY untuk mengubah file. 
// Dapatkan di Supabase Dashboard -> Project Settings -> API -> service_role secret
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_KEY_ANDA_DISINI';

if (SUPABASE_SERVICE_KEY === 'PASTE_SERVICE_ROLE_KEY_ANDA_DISINI') {
  console.error("❌ Error: Anda belum memasukkan SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Silakan paste key tersebut ke dalam script ini atau di file .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const BUCKET_NAME = 'quran-audio';
const FOLDER_NAME = 'huruf';

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
