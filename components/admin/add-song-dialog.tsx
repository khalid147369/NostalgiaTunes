"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/adminUi/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/adminUi/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/adminUi/select";
import { CategorySlug, Song, SongDto, SongStatus } from "@/types";
import { useAddSong } from "@/hooks/songs/useAddSong";
import { useUpdateSong } from "@/hooks/songs/useUpdateSong";

const categoryOptions = [
  [CategorySlug.Spacetoon, "Spacetoon"],
  [CategorySlug.Spacepower, "Spacepower"],
  [CategorySlug.CartoonNetwork, "Cartoon Network"],
  [CategorySlug.Anime, "Anime"],
  [CategorySlug.AnotherChannels, "Another Channels"],
  [CategorySlug.MBC3, "MBC3"],
] as const;

const statusOptions: Array<[SongStatus, string]> = [
  ["draft", "DRAFT"],
  ["published", "PUBLISHED"],
  ["archived", "ARCHIVED"],
];

function createInitialForm(): SongDto {
  return {
    title: "",
    cartoon: "",
    category: 0,
    imageFile: new File([], ""),
    audioFile: new File([], ""),
    status: undefined,
  };
}

function createFormFromSong(song: Song): SongDto {
  return {
    title: song.title,
    cartoon: song.cartoon,
    category: song.category,
    imageFile: new File([], ""),
    audioFile: new File([], ""),
    status: song.status,
  };
}

export function AddSongDialog({
  open,
  onOpenChange,
  mode = "add",
  song,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "update";
  song?: Song | null;
}) {
  const [songForm, setSongForm] = useState<SongDto>(createInitialForm);
  const [initialForm, setInitialForm] = useState<SongDto>(createInitialForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutateAsync: addSong, isPending } = useAddSong();
  const { mutateAsync: updateSong, isPending: isUpdating } = useUpdateSong();
  const isUpdateMode = mode === "update" && !!song;
  const isSubmitting = isPending || isUpdating;

  useEffect(() => {
    if (open && isUpdateMode) {
      const form = createFormFromSong(song);
      setSongForm(form);
      setInitialForm(form);
      setImagePreview(song.cover || null);
      return;
    }

    if (open) {
      const form = createInitialForm();
      setSongForm(form);
      setInitialForm(form);
      setImagePreview(null);
    }
  }, [open, isUpdateMode, song]);

  const hasChanges =
    songForm.title !== initialForm.title ||
    songForm.cartoon !== initialForm.cartoon ||
    songForm.category !== initialForm.category ||
    songForm.status !== initialForm.status ||
    songForm.imageFile.size > 0 ||
    songForm.audioFile.size > 0;

  const isFormValid = isUpdateMode
    ? hasChanges
    : songForm.title.trim().length > 0 &&
      songForm.cartoon.trim().length > 0 &&
      songForm.category > 0 &&
      songForm.imageFile.size > 0 &&
      songForm.audioFile.size > 0;

  useEffect(() => {
    if (songForm.imageFile.size === 0) {
      return;
    }

    const previewUrl = URL.createObjectURL(songForm.imageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [songForm.imageFile]);

  function updateField(field: "title" | "cartoon", value: string) {
    setSongForm((current) => ({ ...current, [field]: value }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    const form = new FormData();

    if (isUpdateMode) {
      if (songForm.title !== initialForm.title)
        form.append("title", songForm.title);
      if (songForm.cartoon !== initialForm.cartoon)
        form.append("cartoon", songForm.cartoon);
      if (songForm.category !== initialForm.category)
        form.append("category", String(songForm.category));
      if (songForm.status !== initialForm.status && songForm.status)
        form.append("status", songForm.status.toUpperCase());
      if (songForm.imageFile.size > 0)
        form.append("imageFile", songForm.imageFile);
      if (songForm.audioFile.size > 0)
        form.append("audioFile", songForm.audioFile);
      await updateSong({ id: Number(song.id), song: form });
    } else {
      form.append("title", songForm.title);
      form.append("cartoon", songForm.cartoon);
      form.append("category", String(songForm.category));
      form.append("imageFile", songForm.imageFile);
      form.append("audioFile", songForm.audioFile);
       await addSong(form);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-h-[90vh] overflow-y-auto rounded-2xl border-glass-border sm:max-w-lg">
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {isUpdateMode ? "Edit Memory" : "New Memory"}
          </p>
          <DialogTitle className="font-heading text-xl font-bold">
            {isUpdateMode ? "Update Song" : "Add Song"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Digitize a new theme and add it to the archive.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="image-file">Cover image</Label>

            <label
              htmlFor="image-file"
              className="relative flex h-52 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-glass-border bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-secondary/60"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected cover preview"
                  className="absolute inset-0 size-full object-contain p-2"
                />
              ) : (
                <>
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <ImagePlus className="size-5" />
                  </span>
                  <span className="text-sm font-medium">
                    Drop cover art or click to upload
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PNG or JPG, square, at least 600x600
                  </span>
                </>
              )}

              <input
                id="image-file"
                type="file"
                accept="image/*"
                required={!isUpdateMode}
                onChange={(e) =>
                  setSongForm((current) => ({
                    ...current,
                    imageFile: e.target.files?.[0] ?? current.imageFile,
                  }))
                }
                className="sr-only"
              />
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Cha-La Head-Cha-La"
              value={songForm.title}
              onChange={(e) => updateField("title", e.target.value)}
              required={!isUpdateMode}
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cartoon">Cartoon</Label>
              <Input
                id="cartoon"
                placeholder="e.g. Dragon Warriors"
                value={songForm.cartoon}
                onChange={(e) => updateField("cartoon", e.target.value)}
                required={!isUpdateMode}
                className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={songForm.category ? String(songForm.category) : ""}
                onValueChange={(value) =>
                  setSongForm((current) => ({
                    ...current,
                    category: Number(value),
                  }))
                }
              >
                <SelectTrigger
                  id="category"
                  className="h-10 w-full rounded-xl border-glass-border bg-secondary/50"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass rounded-xl border-glass-border">
                  {categoryOptions.map(([id, name]) => (
                    <SelectItem
                      key={id}
                      value={String(id)}
                      className="rounded-lg"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio-file">Audio file</Label>
            <Input
              id="audio-file"
              type="file"
              accept="audio/*"
              required={!isUpdateMode}
              onChange={(e) =>
                setSongForm((current) => ({
                  ...current,
                  audioFile: e.target.files?.[0] ?? current.audioFile,
                }))
              }
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          {isUpdateMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={songForm.status ?? ""}
                onValueChange={(value) =>
                  setSongForm((current) => ({
                    ...current,
                    status: value as SongStatus,
                  }))
                }
              >
                <SelectTrigger
                  id="status"
                  className="h-10 w-full rounded-xl border-glass-border bg-secondary/50"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="glass rounded-xl border-glass-border">
                  {statusOptions.map(([value, label]) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="rounded-lg"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-full border border-glass-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isPending}
              className="glow-primary rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting
                ? isUpdateMode
                  ? "Updating..."
                  : "Adding..."
                : isUpdateMode
                  ? "Update Song"
                  : "Add Song"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
