'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Reply, Send } from 'lucide-react'

interface Comment {
  id: string
  username: string
  initials: string
  date: string
  text: string
  likes: number
}

const initialComments: Comment[] = [
  {
    id: 'cm1',
    username: 'retro_kid_98',
    initials: 'RK',
    date: '3 days ago',
    text: 'This opening still gives me chills. Instant time travel to 1998.',
    likes: 214,
  },
  {
    id: 'cm2',
    username: 'saturday_morning',
    initials: 'SM',
    date: '1 week ago',
    text: 'I used to hum this on the way to school every single day. My whole childhood in one melody.',
    likes: 156,
  },
  {
    id: 'cm3',
    username: 'vhs_dreamer',
    initials: 'VD',
    date: '2 weeks ago',
    text: 'The moment the guitar kicks in... nobody does openings like this anymore.',
    likes: 98,
  },
]

export function CommentsSection() {
  const [comments, setComments] = useState(initialComments)
  const [draft, setDraft] = useState('')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    setComments((prev) => [
      {
        id: `cm-${Date.now()}`,
        username: 'you',
        initials: 'YO',
        date: 'Just now',
        text,
        likes: 0,
      },
      ...prev,
    ])
    setDraft('')
  }

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section aria-label="Comments" className="relative z-10 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Memories &amp; comments
            </h2>
            <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-muted-foreground">
              {comments.length}
            </span>
          </div>

          {/* Write a comment */}
          <div className="glass rounded-3xl p-5 md:p-6">
            <label htmlFor="comment-box" className="sr-only">
              Write a comment
            </label>
            <textarea
              id="comment-box"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder="What memory does this song bring back?"
              rows={3}
              className="w-full resize-none rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <motion.button
                type="button"
                onClick={submit}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={!draft.trim()}
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                Post comment
              </motion.button>
            </div>
          </div>

          {/* Comments list */}
          <ul className="flex flex-col gap-4">
            {comments.map((comment, i) => {
              const liked = likedIds.has(comment.id)
              return (
                <motion.li
                  key={comment.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass flex gap-4 rounded-3xl p-5 md:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold text-primary"
                  >
                    {comment.initials}
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold">
                        @{comment.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {comment.text}
                    </p>
                    <div className="mt-1 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleLike(comment.id)}
                        aria-pressed={liked}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                          liked
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${liked ? 'fill-primary' : ''}`}
                        />
                        {comment.likes + (liked ? 1 : 0)}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Reply className="h-3.5 w-3.5" />
                        Reply
                      </button>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
