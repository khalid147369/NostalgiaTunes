'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/adminUi/avatar'
import { Badge } from '@/components/ui/adminUi/badge'
import { Button } from '@/components/ui/adminUi/button'
import { comments as initialComments } from '@/lib/mock-data'
import { SectionHeader } from './section-header'

export function CommentsSection() {
  const [comments, setComments] = useState(initialComments)

  const approve = (id: string) =>
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'approved' as const } : c)))
  const remove = (id: string) => setComments((prev) => prev.filter((c) => c.id !== id))

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Moderation"
        title="Comments"
        description="Keep the nostalgia wholesome. Review, approve, or remove community comments."
      />

      <div className="space-y-3">
        {comments.map((comment, i) => (
          <motion.article
            key={comment.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
            className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"
          >
            <Avatar className="size-10 shrink-0">
              <AvatarFallback className="bg-primary/20 text-xs font-bold text-foreground">{comment.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-xs text-muted-foreground">on</span>
                <span className="text-sm font-medium text-accent">{comment.song}</span>
                <span className="text-xs text-muted-foreground">· {comment.date}</span>
                <Badge
                  variant="outline"
                  className={
                    comment.status === 'approved'
                      ? 'rounded-full border-accent/30 bg-accent/10 px-2.5 capitalize text-accent'
                      : 'rounded-full border-primary/40 bg-primary/15 px-2.5 capitalize text-primary-foreground'
                  }
                >
                  {comment.status}
                </Badge>
              </div>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{comment.content}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {comment.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => approve(comment.id)}
                  className="rounded-full bg-accent px-4 text-accent-foreground hover:bg-accent/90"
                >
                  <Check className="size-4" />
                  Approve
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => remove(comment.id)}
                className="rounded-full border border-glass-border px-4 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </motion.article>
        ))}
        {comments.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
            All caught up. No comments left to moderate.
          </div>
        )}
      </div>
    </div>
  )
}
