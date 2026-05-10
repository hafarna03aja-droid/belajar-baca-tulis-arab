import { HIJAIYAH_WORDS } from '@/lib/words-data'
import MadClient from './MadClient'

export async function generateStaticParams() {
  const madWords = HIJAIYAH_WORDS.filter(
    (w) => w.category === 'Mad Ashli' || w.category === 'Mad Far\'i'
  )
  return madWords.map((word) => ({
    wordId: word.id,
  }))
}

export default function MadPage({ params }: { params: Promise<{ wordId: string }> }) {
  return <MadClient params={params} />
}
