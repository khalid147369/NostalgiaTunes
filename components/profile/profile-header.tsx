"use client";

import { motion } from "framer-motion";
import { Pencil, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, User } from "@/lib/mock-data";
import { UserDTO } from "@/types";

export function ProfileHeader({ user }: { user: UserDTO }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-labelledby="profile-heading"
      className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:gap-10 md:text-left"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative shrink-0"
      >
        <div
          className="absolute -inset-3 rounded-full bg-primary/30 blur-2xl"
          aria-hidden="true"
        />
        <img
          src={
            user.fotoPerfil
              ? user.fotoPerfil || "/placeholder.svg"
              : profile.avatar
          }
          alt={`${user.nombre} avatar`}
          className="relative size-32 rounded-full border-2 border-primary/50 object-cover shadow-[0_0_48px_-8px] shadow-primary md:size-40"
        />
      </motion.div>

      <div className="flex flex-1 flex-col items-center gap-3 md:items-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          <Sparkles className="size-3.5" aria-hidden="true" />
          The soundtrack of a generation
        </span>
        <h1
          id="profile-heading"
          className="text-4xl font-bold tracking-tight text-balance md:text-5xl"
        >
          {user?.nombre}
        </h1>
        <p className="text-sm font-medium text-primary">@{user.nombre}</p>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
          {user.descreption?user.descreption:profile.bio}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <Button className="rounded-full px-6 shadow-[0_0_24px_-6px] shadow-primary">
            <Pencil className="size-4" aria-hidden="true" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-border bg-secondary/50 px-6 backdrop-blur hover:bg-secondary"
          >
            <Share2 className="size-4" aria-hidden="true" />
            Share Profile
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
