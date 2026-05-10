'use client'

import { useEffect } from 'react'
import { useLearningStore } from '@/store/learningStore'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useLearningStore((state) => state.theme)

  useEffect(() => {
    // Apply theme on mount and when theme changes
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
