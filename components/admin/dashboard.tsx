'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AddSongDialog } from './add-song-dialog'
import { AnalyticsSection } from './analytics-section'
import { CategoriesSection } from './categories-section'
import { CommentsSection } from './comments-section'
import { FavoritesSection } from './favorites-section'
import { OverviewSection } from './overview-section'
import { SettingsSection } from './settings-section'
import { Sidebar } from './sidebar'
import { SongsSection } from './songs-section'
import { Topbar } from './topbar'
import { UsersSection } from './users-section'

export type SectionId =
  | 'dashboard'
  | 'songs'
  | 'categories'
  | 'users'
  | 'comments'
  | 'favorites'
  | 'analytics'
  | 'settings'

export function AdminDashboard() {
  const [active, setActive] = useState<SectionId>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [addSongOpen, setAddSongOpen] = useState(false)

  return (
    <div className="relative min-h-svh">
      {/* Ambient background glows to match home page */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-96 w-[42rem] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-96 rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <Sidebar
        active={active}
        onNavigate={setActive}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <motion.div
        animate={{ paddingLeft: collapsed ? 76 + 24 : 256 + 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="relative hidden min-h-svh flex-col px-3 pb-6 pt-0 lg:flex"
      >
        <div className="flex flex-col gap-6">
          <Topbar onMenuClick={() => setMobileOpen(true)} onQuickAdd={() => setAddSongOpen(true)} />
          <SectionContent active={active} onAddSong={() => setAddSongOpen(true)} />
        </div>
      </motion.div>

      {/* Mobile / tablet layout */}
      <div className="relative flex min-h-svh flex-col gap-6 px-3 pb-6 lg:hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} onQuickAdd={() => setAddSongOpen(true)} />
        <SectionContent active={active} onAddSong={() => setAddSongOpen(true)} />
      </div>

      <AddSongDialog open={addSongOpen} onOpenChange={setAddSongOpen} />
    </div>
  )
}

function SectionContent({ active, onAddSong }: { active: SectionId; onAddSong: () => void }) {
  return (
    <main className="min-w-0 flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {active === 'dashboard' && <OverviewSection />}
          {active === 'songs' && <SongsSection onAddSong={onAddSong} />}
          {active === 'categories' && <CategoriesSection />}
          {active === 'users' && <UsersSection />}
          {active === 'comments' && <CommentsSection />}
          {active === 'favorites' && <FavoritesSection />}
          {active === 'analytics' && <AnalyticsSection />}
          {active === 'settings' && <SettingsSection />}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
