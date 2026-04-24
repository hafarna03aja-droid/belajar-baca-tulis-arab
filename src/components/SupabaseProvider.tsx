'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLearningStore } from '@/store/learningStore'

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { setUserId, setUserName, syncWithSupabase } = useLearningStore()

  useEffect(() => {
    const supabase = createClient()

    // Cek session awal saat web dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id)
        if (session.user.user_metadata?.name) {
          setUserName(session.user.user_metadata.name)
        }
        syncWithSupabase()
      } else {
        setUserId(null)
        setUserName(null)
      }
    })

    // Dengarkan perubahan login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        if (session.user.user_metadata?.name) {
          setUserName(session.user.user_metadata.name)
        }
        syncWithSupabase()
      } else {
        setUserId(null)
        setUserName(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUserId, setUserName, syncWithSupabase])

  return <>{children}</>
}
