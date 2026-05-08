/**
 * Utility to resolve audio URLs for the Quran Flow platform.
 * Supports Supabase Storage and future CDN integration.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const AUDIO_BUCKET = 'quran-audio';

export type AudioCategory = 'huruf' | 'words' | 'ui';

/**
 * Resolves the full URL for an audio asset.
 * @param category The category of the audio (e.g., 'huruf', 'words')
 * @param fileName The name of the file including extension (e.g., 'alif-fathah.mp3')
 * @returns The resolved URL string
 */
export function resolveAudioUrl(category: AudioCategory, fileName: string): string {
  // Logic to switch between Supabase and CDN could go here
  // For now, default to Supabase Storage
  if (!SUPABASE_URL) return '';
  
  // Ensure fileName is lowercase as per project standards
  const normalizedFileName = fileName.toLowerCase();
  
  return `${SUPABASE_URL}/storage/v1/object/public/${AUDIO_BUCKET}/${category}/${normalizedFileName}`;
}

/**
 * Helper to get the letter audio URL
 */
export function getLetterAudioUrl(letterId: string, harakatId: string): string {
  return resolveAudioUrl('huruf', `${letterId}-${harakatId}.mp3`);
}

/**
 * Helper to get word audio URL
 */
export function getWordAudioUrl(wordId: string): string {
  return resolveAudioUrl('words', `${wordId}.mp3`);
}
