import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HIJAIYAH_LETTERS } from '@/lib/hijaiyah-data'
import { HIJAIYAH_WORDS } from '@/lib/words-data'
import { createClient } from '@/lib/supabase/client'

interface LessonProgress {
  lessonId: string
  completed: boolean
  accuracyScore: number
  completedAt: string
}

interface LearningStore {
  // User progress
  currentLevel: number
  completedLessons: Record<string, LessonProgress>
  streakDays: number
  lastActivity: string | null
  totalXP: number
  userId: string | null
  userName: string | null

  // Current session
  currentLetterIndex: number
  sessionAccuracy: number[]

  // Actions
  completeLesson: (lessonId: string, score: number) => void
  setCurrentLetterIndex: (index: number) => void
  addSessionAccuracy: (score: number) => void
  resetSession: () => void
  updateStreak: () => void
  isLessonCompleted: (lessonId: string) => boolean
  getLevelProgress: (levelId: number, totalLessons: number) => number
  forceUnlockAll: () => void
  setUserId: (id: string | null) => void
  setUserName: (name: string | null) => void
  syncWithSupabase: () => Promise<void>
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      currentLevel: 1,
      completedLessons: {},
      streakDays: 0,
      lastActivity: null,
      totalXP: 0,
      userId: null,
      userName: null,
      currentLetterIndex: 0,
      sessionAccuracy: [],

      completeLesson: (lessonId, score) => {
        const state = get()
        const xpGained = Math.floor(score / 10) * 5 + 10

        const newCompleted = {
          ...state.completedLessons,
          [lessonId]: {
            lessonId,
            completed: true,
            accuracyScore: score,
            completedAt: new Date().toISOString(),
          },
        }

        let newLevel = state.currentLevel
        const completedInCurrentLevel = Object.keys(newCompleted).filter(k => k.startsWith(`${state.currentLevel}-`)).length
        const totalRequired = state.currentLevel === 7 ? 10 : (state.currentLevel >= 5 ? 100 : 28)

        if (completedInCurrentLevel >= totalRequired && state.currentLevel < 7) {
          newLevel = state.currentLevel + 1
        }

        set({
          completedLessons: newCompleted,
          totalXP: state.totalXP + xpGained,
          currentLevel: newLevel
        })

        get().updateStreak()

        // Sync with Supabase if logged in
        if (state.userId) {
          const supabase = createClient()
          supabase.from('profiles').upsert({
            id: state.userId,
            completed_lessons: newCompleted,
            total_xp: state.totalXP + xpGained,
            current_jilid: newLevel,
          }).then(({ error }) => {
            if (error) console.error('Error syncing to Supabase:', error)
          })
        }
      },

      forceUnlockAll: () => {
         const allLessons: Record<string, LessonProgress> = {}
         // Auto-complete all lessons for 6 levels
         ;[1, 2, 3, 4].forEach(levelId => {
           HIJAIYAH_LETTERS.forEach(l => {
               const id = `${levelId}-${l.id}`
               allLessons[id] = {
                   lessonId: id,
                   completed: true,
                   accuracyScore: 90,
                   completedAt: new Date().toISOString()
               }
           })
         })
         ;[5, 6].forEach(levelId => {
           HIJAIYAH_WORDS.forEach(w => {
               const id = `${levelId}-${w.id}`
               allLessons[id] = {
                   lessonId: id,
                   completed: true,
                   accuracyScore: 90,
                   completedAt: new Date().toISOString()
               }
           })
         })
         set({
            currentLevel: 7,
            totalXP: 9999,
            streakDays: 30,
            completedLessons: allLessons
         })
      },

      setCurrentLetterIndex: (index) => set({ currentLetterIndex: index }),

      addSessionAccuracy: (score) =>
        set((state) => ({
          sessionAccuracy: [...state.sessionAccuracy, score],
        })),

      resetSession: () => set({ sessionAccuracy: [] }),

      updateStreak: () => {
        const state = get()
        const today = new Date().toDateString()
        const lastActivity = state.lastActivity

        if (lastActivity === today) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const wasYesterday = lastActivity === yesterday.toDateString()

        set({
          streakDays: wasYesterday ? state.streakDays + 1 : 1,
          lastActivity: today,
        })
      },

      isLessonCompleted: (lessonId) => {
        return !!get().completedLessons[lessonId]?.completed
      },

      getLevelProgress: (levelId, totalLessons) => {
        const state = get()
        const completedInLevel = Object.keys(state.completedLessons).filter(
          (k) => k.startsWith(`${levelId}-`) && state.completedLessons[k].completed
        ).length
        return Math.min(100, Math.floor((completedInLevel / totalLessons) * 100))
      },

      setUserId: (id) => set({ userId: id }),
      setUserName: (name) => set({ userName: name }),

      syncWithSupabase: async () => {
        const state = get()
        if (!state.userId) return

        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, completed_lessons, total_xp, current_jilid')
          .eq('id', state.userId)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching progress from Supabase:', error)
          return
        }

        if (data) {
          // Merge remote data with local data (remote wins)
          set({
            userName: data.full_name || state.userName,
            completedLessons: data.completed_lessons || state.completedLessons,
            totalXP: data.total_xp || state.totalXP,
            currentLevel: data.current_jilid || state.currentLevel,
          })
        } else {
          // If profile doesn't exist yet, push local progress
          await supabase.from('profiles').insert({
            id: state.userId,
            completed_lessons: state.completedLessons,
            total_xp: state.totalXP,
            current_jilid: state.currentLevel,
          })
        }
      },
    }),
    {
      name: 'quran-flow-learning',
    }
  )
)
