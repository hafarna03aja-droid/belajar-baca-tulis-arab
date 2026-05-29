'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLearningStore } from '@/store/learningStore'

interface SubscriptionData {
  status: 'active' | 'pending' | 'expired' | 'failed' | null
  planType: 'monthly' | 'yearly' | null
  endDate: string | null
}

interface UseSubscriptionReturn {
  isPremium: boolean
  isLoading: boolean
  subscription: SubscriptionData | null
  refresh: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const { userId } = useLearningStore()
  const [isLoading, setIsLoading] = useState(true)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)

  const fetchSubscription = async () => {
    if (!userId) {
      setIsLoading(false)
      setSubscription(null)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status, plan_type, end_date')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gte('end_date', new Date().toISOString())
        .order('end_date', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error('Error fetching subscription:', error)
        setSubscription(null)
        return
      }

      if (data) {
        setSubscription({
          status: data.status,
          planType: data.plan_type,
          endDate: data.end_date,
        })
      } else {
        setSubscription(null)
      }
    } catch (err) {
      console.error('Subscription fetch error:', err)
      setSubscription(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const isPremium = subscription?.status === 'active' &&
    !!subscription?.endDate &&
    new Date(subscription.endDate) > new Date()

  return {
    isPremium,
    isLoading,
    subscription,
    refresh: fetchSubscription,
  }
}
