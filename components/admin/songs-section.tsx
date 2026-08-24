"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Headphones,
  Heart,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/adminUi/badge";
import { Button } from "@/components/ui/adminUi/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/adminUi/table";
import { formatNumber, type SongStatus } from "@/lib/mock-data";
import { SectionHeader } from "./section-header";
import { useSongs } from "@/hooks/songs/useSong";
import { useDeleteSong } from "@/hooks/songs/useDeleteSong";
import { Song } from "@/types";
import { PageBar } from "@/components/ui/page-bar";
import { Input } from "@/components/ui/adminUi/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/adminUi/dialog";

const statusStyles: Record<SongStatus, string> = {
  published: "border-accent/30 bg-accent/10 text-accent",
  draft: "border-primary/30 bg-primary/15 text-primary-foreground",
  archived: "border-border bg-secondary/60 text-muted-foreground",
};

const PAGE_SIZE = 10;

export function SongsSection({
  onAddSong,
  onEditSong,
}: {
  onAddSong: () => void;
  onEditSong: (song: Song) => void;
}) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isFetching } = useSongs(PAGE_SIZE, page, searchQuery);
  const { mutate: deleteSong, isPending: isDeleting } = useDeleteSong();
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const songs: Song[] = data?.data.content ?? [];
  const totalPages = data?.data.totalPages ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      setSearchQuery(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleDelete(song: Song) {
    setSongToDelete(song);
  }

  function confirmDelete() {
    if (!songToDelete) return;

    deleteSong(Number(songToDelete.id), {
      onSuccess: () => setSongToDelete(null),
    });
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Library"
        title="Songs Management"
        description="Every theme in the archive. Edit metadata, manage covers, and control what the community hears."
        action={
          <Button
            onClick={onAddSong}
            className="glow-primary rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Song
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass overflow-hidden rounded-2xl"
      >
        <div className="border-b border-border p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder=" Search by song or cartoon..."
              aria-label="Search songs"
              className="h-10 rounded-xl pl-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Song
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Plays
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Likes
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song) => (
                <TableRow
                  key={song.id}
                  className="border-border transition-colors hover:bg-secondary/40"
                >
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={song.cover || "/placeholder.svg"}
                        alt={`${song.title} cover art`}
                        width={44}
                        height={44}
                        className="size-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{song.title}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {song.cartoon}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {song.category}
                  </TableCell>
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
                    <Badge
                      variant="outline"
                      className={`rounded-full px-2.5 capitalize ${statusStyles[song.status]}`}
                    >
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
                        onClick={() => onEditSong(song)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                        aria-label={`Delete ${song.title}`}
                        onClick={() => handleDelete(song)}
                        disabled={isDeleting}
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

      <PageBar
        page={data?.data.number ?? page}
        totalPages={totalPages}
        onPageChange={setPage}
        disabled={isFetching || isDeleting}
      />

      <Dialog
        open={songToDelete !== null}
        onOpenChange={(open) => !open && !isDeleting && setSongToDelete(null)}
      >
        <DialogContent className="glass rounded-2xl border-glass-border p-0 sm:max-w-md">
          <DialogHeader className="p-6 pb-2">
            <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-destructive/15 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle className="font-heading text-xl font-bold">
              Delete this memory?
            </DialogTitle>
            <DialogDescription className="leading-relaxed text-muted-foreground">
              You are about to permanently delete{" "}
              <span className="font-semibold text-foreground">
                {songToDelete?.title}
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-glass-border bg-secondary/30 p-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSongToDelete(null)}
              disabled={isDeleting}
              className="rounded-full border border-glass-border"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-full"
            >
              <Trash2 className="size-4" />
              {isDeleting ? "Deleting..." : "Delete Song"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
