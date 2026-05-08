'use client'

import { ALL_BADGES, Badge, BadgeCheckState, computeBadgeState, getUnlockedBadges } from '@/lib/badges-data'
import { useLearningStore } from '@/store/learningStore'
import { useMemo, useState } from 'react'

type FilterCategory = 'all' | 'xp' | 'streak' | 'mastery' | 'accuracy' | 'special'

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  all:      'Semua',
  xp:       'XP',
  streak:   'Streak',
  mastery:  'Level',
  accuracy: 'Akurasi',
  special:  'Spesial',
}

function BadgeCard({ badge, unlocked }: { badge: Badge; unlocked: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 cursor-default
        ${unlocked
          ? `bg-gradient-to-br ${badge.color} border-white/10 shadow-lg ${hovered ? badge.glow + ' shadow-xl scale-105' : ''}`
          : 'bg-[#0F172A] border-[#1E293B] opacity-50 grayscale'
        }`}
    >
      {/* Lock / Unlock indicator */}
      {unlocked && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      {!unlocked && (
        <div className="absolute top-3 right-3 text-[#334155] text-sm">🔒</div>
      )}

      {/* Icon */}
      <div className={`text-4xl transition-transform duration-300 ${hovered && unlocked ? 'scale-125' : ''}`}>
        {badge.icon}
      </div>

      {/* Name */}
      <div>
        <p className={`text-[11px] font-extrabold uppercase tracking-widest mb-1 ${unlocked ? 'text-white' : 'text-[#475569]'}`}>
          {badge.name}
        </p>
        {badge.nameAr && (
          <p className={`font-arabic text-base leading-none ${unlocked ? 'text-[#F59E0B]' : 'text-[#334155]'}`}>
            {badge.nameAr}
          </p>
        )}
      </div>

      {/* Description */}
      <p className={`text-[10px] leading-relaxed ${unlocked ? 'text-[#94A3B8]' : 'text-[#334155]'}`}>
        {badge.description}
      </p>

      {/* Glow ring saat unlocked + hovered */}
      {unlocked && hovered && (
        <div className={`absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none`} />
      )}
    </div>
  )
}

export default function BadgesPanel() {
  const { totalXP, streakDays, completedLessons, currentLevel } = useLearningStore()
  const [filter, setFilter] = useState<FilterCategory>('all')

  const badgeState: BadgeCheckState = useMemo(() =>
    computeBadgeState(totalXP, streakDays, completedLessons, currentLevel),
    [totalXP, streakDays, completedLessons, currentLevel]
  )

  const unlockedIds = useMemo(() =>
    new Set(getUnlockedBadges(badgeState).map(b => b.id)),
    [badgeState]
  )

  const displayed = useMemo(() =>
    filter === 'all' ? ALL_BADGES : ALL_BADGES.filter(b => b.category === filter),
    [filter]
  )

  const totalUnlocked = unlockedIds.size
  const total = ALL_BADGES.length
  const pct = Math.round((totalUnlocked / total) * 100)

  return (
    <section id="badges-panel" className="bento-card p-6 col-span-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">🏅</span>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-white">
              Koleksi Lencana
            </h2>
          </div>
          <p className="text-[11px] text-[#64748B] font-medium pl-9">
            {totalUnlocked} dari {total} lencana telah diraih
          </p>
        </div>

        {/* Progress bar + percentage */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="flex-1 h-2 rounded-full bg-[#1E293B] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#3B82F6] transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[12px] font-extrabold text-[#F59E0B] tabular-nums min-w-[3rem] text-right">{pct}%</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(CATEGORY_LABELS) as FilterCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all duration-200
              ${filter === cat
                ? 'bg-[#F59E0B] border-[#F59E0B] text-[#0F172A]'
                : 'bg-transparent border-[#334155] text-[#64748B] hover:border-[#F59E0B] hover:text-[#F59E0B]'
              }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayed.map(badge => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            unlocked={unlockedIds.has(badge.id)}
          />
        ))}
      </div>

      {/* Footer hint */}
      {totalUnlocked === total && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 text-center">
          <p className="text-[#F59E0B] font-extrabold text-sm">🎉 Luar Biasa! Semua lencana sudah diraih. Anda adalah Khatim Qur'an Flow!</p>
        </div>
      )}
    </section>
  )
}
