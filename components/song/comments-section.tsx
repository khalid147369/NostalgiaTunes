"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Reply, Send } from "lucide-react";
import { useGetComments } from "@/hooks/comments/useComment";
import { Comment, Song } from "@/types";
import { useSendComment } from "@/hooks/comments/useSendComment";
import { timeAgo } from "@/lib/utils";
import { useUser } from "@/hooks/auth/useUser";
import { useRouter } from "next/navigation";

export function CommentsSection({ song }: { song: Song }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const {user} = useUser();
  const router = useRouter()
  const { mutateAsync: getCommentsAsync } = useGetComments();
  const { mutateAsync: sendCommentsAsync } = useSendComment();
  useEffect(() => {
    const getComments = async () => {
      const { data } = await getCommentsAsync(Number(song.id));

      console.log("Comments: ", data);

      setComments(data);
    };
    getComments();
  }, []);

  const submit = async () => {
      if (!user) {
      router.push("/register");
      return;
    }
    const text = draft.trim();
    if (!text) return;
    let comment = {
      id: Number(song.id),
      text: { text },
    };
    const { data } = await sendCommentsAsync(comment);
    const newComment :Comment=data;
    console.log("Comment sended: ", data);
    setComments((prev) => [
      {
        id: Number(newComment.id),
        creator: newComment.creator,
        initials: newComment.creator.substring(0,2),
        date: "Just now",
        text,
        likes: 0,
      } as Comment,
      ...prev,
    ]);
    setDraft("");
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section aria-label="Comments" className="relative z-10 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault();
                  submit();
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
              const liked = likedIds.has(comment.id.toString());
              return (
                <motion.li
                  key={comment.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass flex gap-4 rounded-3xl p-5 md:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold text-primary"
                  >
                    {comment.avatar ?? comment.creator.substring(0,2)}
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold">@{comment.creator}</span>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(comment.date)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {comment.text}
                    </p>
                    <div className="mt-1 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleLike(comment.id.toString())}
                        aria-pressed={liked}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                          liked
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${liked ? "fill-primary" : ""}`}
                        />
                        {comment.likes ?? 0 + (liked ? 1 : 0)}
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
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
