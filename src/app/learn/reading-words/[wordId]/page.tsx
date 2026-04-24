import { Suspense } from 'react'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import ReadingWordsClient from './ReadingWordsClient'

export async function generateStaticParams() {
  return HIJAIYAH_WORDS.map((word) => ({
    wordId: word.id,
  }))
}

export default async function Page({ params }: { params: Promise<{ wordId: string }> }) {
  return (
    <Suspense fallback={null}>
      <ReadingWordsClient params={params} />
    </Suspense>
  )
}
