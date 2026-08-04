"use client"

import Link from "next/link"
import { Disc3 } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "../logo/logo"
import { Avatar } from "@base-ui/react"
import AvatarMenu from "../AvatarMenu/AvatarMenu"

const links = ["Home", "Categories", "Trending", "Favorites"]

export function ProfileNav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-primary/20 bg-background/70 px-5 py-3 shadow-[0_0_40px_-12px] shadow-primary/40 backdrop-blur-xl">
        <Logo/>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
        <AvatarMenu/>
      </nav>
    </motion.header>
  )
}
