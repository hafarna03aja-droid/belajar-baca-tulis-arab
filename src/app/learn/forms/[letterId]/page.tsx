import { Suspense } from 'react'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import FormsClient from './FormsClient'

export async function generateStaticParams() {
  return HIJAIYAH_LETTERS.map((letter) => ({
    letterId: letter.id,
  }))
}

export default async function Page({ params }: { params: Promise<{ letterId: string }> }) {
  return (
    <Suspense fallback={null}>
      <FormsClient params={params} />
    </Suspense>
  )
}
