import { Suspense } from 'react'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import WritingWordsClient from './WritingWordsClient'

export async function generateStaticParams() {
  return HIJAIYAH_WORDS.map((word) => ({
    wordId: word.id,
  }))
}

export default async function Page({ params }: { params: Promise<{ wordId: string }> }) {
  return (
    <Suspense fallback={null}>
      <WritingWordsClient params={params} />
    </Suspense>
  )
}
