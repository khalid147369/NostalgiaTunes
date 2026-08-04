'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Headphones, Heart, Pencil, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/adminUi/badge'
import { Button } from '@/components/ui/adminUi/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/adminUi/table'
import { formatNumber, songs, type SongStatus } from '@/lib/mock-data'
import { SectionHeader } from './section-header'

const statusStyles: Record<SongStatus, string> = {
  published: 'border-accent/30 bg-accent/10 text-accent',
  draft: 'border-primary/30 bg-primary/15 text-primary-foreground',
  archived: 'border-border bg-secondary/60 text-muted-foreground',
}

export function SongsSection({ onAddSong }: { onAddSong: () => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Library"
        title="Songs Management"
        description="Every theme in the archive. Edit metadata, manage covers, and control what the community hears."
        action={
          <Button onClick={onAddSong} className="glow-primary rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4" />
            Add Song
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="glass overflow-hidden rounded-2xl"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Song</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plays</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Likes</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song) => (
                <TableRow key={song.id} className="border-border transition-colors hover:bg-secondary/40">
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={song.cover || '/placeholder.svg'}
                        alt={`${song.title} cover art`}
                        width={44}
                        height={44}
                        className="size-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{song.title}</p>
                        <p className="truncate text-sm text-muted-foreground">{song.cartoon}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{song.category}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm">
                      <Headphones className="size-3.5 text-muted-foreground" />
                      {formatNumber(song.listens)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm">
                      <Heart className="size-3.5 text-muted-foreground" />
                      {formatNumber(song.likes)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`rounded-full px-2.5 capitalize ${statusStyles[song.status]}`}>
                      {song.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg text-muted-foreground hover:bg-primary/15 hover:text-foreground"
                        aria-label={`Edit ${song.title}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                        aria-label={`Delete ${song.title}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
