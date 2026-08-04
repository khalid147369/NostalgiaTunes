"use client";

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
import { Textarea } from "@/components/ui/adminUi/textarea";
import { categories } from "@/lib/mock-data";

export function AddSongDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-h-[90vh] overflow-y-auto rounded-2xl border-glass-border sm:max-w-lg">
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            New Memory
          </p>
          <DialogTitle className="font-heading text-xl font-bold">
            Add Song
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Digitize a new theme and add it to the archive.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="cover">Cover image</Label>
            <label
              htmlFor="cover"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-glass-border bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-secondary/60"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                <ImagePlus className="size-5" />
              </span>
              <span className="text-sm font-medium">
                Drop cover art or click to upload
              </span>
              <span className="text-xs text-muted-foreground">
                PNG or JPG, square, at least 600x600
              </span>
              <input
                id="cover"
                type="file"
                accept="image/*"
                className="sr-only"
              />
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Cha-La Head-Cha-La"
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cartoon">Cartoon</Label>
              <Input
                id="cartoon"
                placeholder="e.g. Dragon Warriors"
                className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger
                  id="category"
                  className="h-10 w-full rounded-xl border-glass-border bg-secondary/50"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass rounded-xl border-glass-border">
                  {categories.map((c) => (
                    <SelectItem
                      key={c.id}
                      value={c.name}
                      className="rounded-lg"
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What memory does this song bring back?"
              rows={3}
              className="rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio-url">Audio URL</Label>
            <Input
              id="audio-url"
              type="url"
              placeholder="https://cdn.nostalgiasongs.com/audio/..."
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

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
              className="glow-primary rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              Add Song
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
