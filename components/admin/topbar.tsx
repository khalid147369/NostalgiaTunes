'use client'

import { Bell, Menu, Plus, Search } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/adminUi/avatar'
import { Button } from '@/components/ui/adminUi/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/adminUi/dropdown-menu'
import { Input } from '@/components/ui/adminUi/input'
import AvatarMenu from '../AvatarMenu/AvatarMenu'

interface TopbarProps {
  onMenuClick: () => void
  onQuickAdd: () => void
}

const notifications = [
  { id: 'n1', text: '3 comments awaiting moderation', time: '10m ago' },
  { id: 'n2', text: '"Field of Dreams" hit 666K plays', time: '1h ago' },
  { id: 'n3', text: 'New user: pixel_nostalgia joined', time: '3h ago' },
]

export function Topbar({ onMenuClick, onQuickAdd }: TopbarProps) {
  return (
    <header className="glass sticky top-3 z-30 flex items-center gap-3 rounded-2xl px-4 py-3">
      <Button variant="ghost" size="icon" className="rounded-xl lg:hidden" onClick={onMenuClick} aria-label="Open menu">
        <Menu className="size-5" />
      </Button>

      <div className="relative hidden flex-1 items-center sm:flex md:max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search songs, users, comments..."
          className="h-10 rounded-full border-glass-border bg-secondary/50 pl-10 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          onClick={onQuickAdd}
          className="glow-primary hidden rounded-full bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90 sm:inline-flex"
        >
          <Plus className="size-4" />
          Quick Add Song
        </Button>
        <Button
          onClick={onQuickAdd}
          size="icon"
          className="glow-primary rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:hidden"
          aria-label="Quick add song"
        >
          <Plus className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="relative rounded-full border border-glass-border" aria-label="Notifications" />
            }
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-accent" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass w-72 rounded-2xl border-glass-border p-2">
            <DropdownMenuLabel className="font-heading">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 rounded-xl px-3 py-2.5">
                <span className="text-sm">{n.text}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

            <AvatarMenu/>
     
      </div>
    </header>
  )
}
