'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Disc3,
  FolderOpen,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Music,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SectionId } from './dashboard'
import Logo from '../logo/logo'

const navItems: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'songs', label: 'Songs', icon: Music },
  { id: 'categories', label: 'Categories', icon: FolderOpen },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ active, onNavigate, collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 76 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="glass fixed inset-y-3 left-3 z-50 hidden flex-col overflow-hidden rounded-2xl lg:flex"
        style={{ width: collapsed ? 76 : 256 }}
      >
        <SidebarContent
          active={active}
          collapsed={collapsed}
          onNavigate={(id) => {
            onNavigate(id)
            onMobileClose()
          }}
          onToggle={onToggle}
        />
      </motion.aside>

      {/* Mobile drawer */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="glass fixed inset-y-3 left-3 z-50 flex w-64 flex-col overflow-hidden rounded-2xl lg:hidden"
      >
        <SidebarContent
          active={active}
          collapsed={false}
          onNavigate={(id) => {
            onNavigate(id)
            onMobileClose()
          }}
          onToggle={onMobileClose}
        />
      </motion.aside>
    </>
  )
}

function SidebarContent({
  active,
  collapsed,
  onNavigate,
  onToggle,
}: {
  active: SectionId
  collapsed: boolean
  onNavigate: (id: SectionId) => void
  onToggle: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      
      <div className={cn('flex items-center gap-3 px-4 pt-5 pb-6', collapsed && 'justify-center px-0')}>
       <Logo/>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="glow-primary absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 size-[18px] shrink-0" />
              {!collapsed && <span className="relative z-10">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="px-3 pb-4 pt-2">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground',
            collapsed && 'justify-center px-0',
          )}
        >
          {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )
}
