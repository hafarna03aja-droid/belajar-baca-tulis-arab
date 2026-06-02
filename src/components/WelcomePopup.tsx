'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomePopup() {
  const [show, setShow] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Cek apakah user sudah melihat popup di sesi ini
    const hasSeen = sessionStorage.getItem('hasSeenWelcome')
    if (!hasSeen) {
      setShow(true)
    }
  }, [])

  const handleStart = () => {
    // Putar audio
    const audio = new Audio('/audio/bismillah.mp3')
    audio.play().catch(e => console.error("Audio play failed:", e))
    
    // Simpan ke sessionStorage agar tidak muncul lagi selama tab masih aktif
    sessionStorage.setItem('hasSeenWelcome', 'true')
    
    // Tutup popup
    setShow(false)
  }

  // Hindari hydration mismatch
  if (!isMounted) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-[#0F172A] p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-emerald-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 text-6xl md:text-8xl font-arabic text-emerald-500/5 pointer-events-none -rotate-12">ب</div>
            
            <h2 className="text-4xl md:text-5xl font-arabic text-[#064E3B] dark:text-emerald-400 mb-6 font-bold leading-relaxed mt-4">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium leading-relaxed">
              Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.
            </p>
            
            <button
              onClick={handleStart}
              className="btn-primary w-full py-4 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-1 bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold"
            >
              Mulai Perjalanan Belajar <span>✨</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
