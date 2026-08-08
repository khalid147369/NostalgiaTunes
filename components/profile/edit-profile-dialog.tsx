"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { CategorySlug, UserDTO, UserReqDto } from "@/types";

type EditableProfile = Omit<
  Pick<UserDTO, "nombre" | "email" | "descreption" | "fotoPerfil">,
  "fotoPerfil"
> & {
  category: CategorySlug;
  fotoPerfil?: string | File;
};

const categoryOptions = [
  [CategorySlug.Spacetoon, "Spacetoon"],
  [CategorySlug.Spacepower, "Spacepower"],
  [CategorySlug.CartoonNetwork, "Cartoon Network"],
  [CategorySlug.Anime, "Anime"],
  [CategorySlug.AnotherChannels, "Another Channels"],
  [CategorySlug.MBC3, "MBC3"],
] as const;

function getCategorySlug(categoryName: string): CategorySlug {
  const numericCategory = Number(categoryName);
  if (categoryOptions.some(([id]) => id === numericCategory)) {
    return numericCategory as CategorySlug;
  }

  const category = categoryOptions.find(
    ([, name]) => name.toLowerCase() === categoryName.toLowerCase(),
  );

  return category?.[0] ?? CategorySlug.Spacetoon;
}

export function EditProfileDialog({
  user,
  open,
  onOpenChange,
  onSave,
}: {
  user: UserDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (profile: UserReqDto) => Promise<UserDTO> | Promise<void>;
}) {
  const [form, setForm] = useState<UserReqDto>(() => ({
    nombre: user.nombre,
    email: user.email,
    descreption: user.descreption ?? "",
    category: getCategorySlug(user.categoryName ?? ""),
    fotoPerfil: user.fotoPerfil ? String(user.fotoPerfil) : "",
  }));
  const [initialForm, setInitialForm] = useState<UserReqDto>(() => ({
    nombre: user.nombre,
    email: user.email,
    descreption: user.descreption ?? "",
    category: getCategorySlug(user.categoryName ?? ""),
    fotoPerfil: user.fotoPerfil ? String(user.fotoPerfil) : "",
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.fotoPerfil ? String(user.fotoPerfil) : null,
  );
  useEffect(() => {
    if (!open) return;

    const nextForm: UserReqDto = {
      nombre: user.nombre,
      email: user.email,
      descreption: user.descreption ?? "",
      category: getCategorySlug(user.categoryName ?? ""),
      fotoPerfil: user.fotoPerfil ? String(user.fotoPerfil) : "",
    };

    setForm(nextForm);
    setInitialForm(nextForm);
    setAvatarPreview(user.fotoPerfil ? String(user.fotoPerfil) : null);
  }, [open, user]);

  const isDirty =
    form.nombre !== initialForm.nombre ||
    form.email !== initialForm.email ||
    form.descreption !== initialForm.descreption ||
    form.category !== initialForm.category ||
    form.fotoPerfil !== initialForm.fotoPerfil;

  function updateField(
    field: "nombre" | "email" | "descreption" | "fotoPerfil",
    value: string | File,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    updateField("fotoPerfil", file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isDirty || isSaving) return;

    setIsSaving(true);

    try {
      const data = await onSave?.(form);

      if (data) {
        const nextForm: UserReqDto = {
          nombre: data.nombre,
          email: data.email,
          descreption: data.descreption ?? "",
          category: getCategorySlug(data.categoryName ?? "Spacetoon"),
          fotoPerfil: data.fotoPerfil ? String(data.fotoPerfil) : "",
        };

        setForm(nextForm);
        setInitialForm(nextForm);
        setAvatarPreview(data.fotoPerfil ? String(data.fotoPerfil) : null);
      }

      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-h-[90vh] overflow-y-auto rounded-2xl border-glass-border sm:max-w-lg">
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Your memory
          </p>
          <DialogTitle className="font-heading text-xl font-bold">
            Edit profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Keep your corner of the archive up to date.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              value={form.nombre}
              onChange={(event) => updateField("nombre", event.target.value)}
              placeholder="Your name"
              required
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              required
              className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-avatar">Profile image</Label>
            <label
              htmlFor="profile-avatar"
              className="group relative mx-auto flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/50 bg-secondary/60 text-primary transition-colors hover:border-primary hover:bg-primary/10"
            >
              {form.fotoPerfil ? (
                <img
                  src={avatarPreview ?? ""}
                  alt="Profile preview"
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlus className="size-8" aria-hidden="true" />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-background/80 py-1 text-center text-[10px] font-semibold uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100">
                Add image
              </span>
              <input
                id="profile-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="sr-only"
              />
            </label>
            <p className="text-center text-xs text-muted-foreground">
              Choose a square image for your avatar.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-category">Favorite category</Label>
            <Select
              value={String(form.category)}
              onValueChange={(value) => {
                setForm((current) => ({
                  ...current,
                  category: Number(value) as CategorySlug,
                }));
              }}
            >
              <SelectTrigger
                id="profile-category"
                className="h-10 w-full rounded-xl border-glass-border bg-secondary/50"
              >
                <SelectValue placeholder="Select a category" />
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
            <p className="text-xs text-muted-foreground">
              The selected category is sent as its database id.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-description">About you</Label>
            <Textarea
              id="profile-description"
              value={form.descreption}
              onChange={(event) =>
                updateField("descreption", event.target.value)
              }
              placeholder="Tell the archive something about you..."
              rows={3}
              className="rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
            />
          </div>

          <DialogFooter className="gap-2 pt-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
              className="rounded-full border border-glass-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !isDirty}
              className="glow-primary rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
