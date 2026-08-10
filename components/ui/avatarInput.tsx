"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AvatarUpload({
  onChange,
  inputId = "avatar-upload",
}: {
  onChange?: (file: File | null) => void;
  inputId?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      onChange?.(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    onChange?.(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Choose a profile image"
        className="group relative size-28 overflow-hidden rounded-full border-2 border-primary/50 bg-secondary/70 shadow-[0_0_28px_-8px] shadow-primary transition hover:border-primary hover:shadow-[0_0_32px_-6px]"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition group-hover:text-foreground">
            <span className="text-2xl" aria-hidden="true">+</span>
            Add photo
          </span>
        )}
        {preview && (
          <span className="absolute inset-x-0 bottom-0 bg-background/80 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-foreground opacity-0 transition group-hover:opacity-100">
            Change
          </span>
        )}
      </button>

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      <p className="max-w-full truncate text-xs text-muted-foreground">
        {fileName ?? "Click to add an avatar"}
      </p>
    </div>
  );
}