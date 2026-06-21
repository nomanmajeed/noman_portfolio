'use client';

import { ImageOff } from 'lucide-react';

export function ProjectPreviewPlaceholder({ title, compact = false }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand/10 via-foreground/5 to-brand/5 px-6 text-center"
      role="img"
      aria-label={title ? `No preview available for ${title}` : 'No preview available'}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-background/60 shadow-sm backdrop-blur-sm">
        <ImageOff className="h-6 w-6 text-muted-foreground/70" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60">
          No preview available
        </p>
        {!compact && title && (
          <p className="mt-1 max-w-[16rem] truncate text-sm text-muted-foreground/80">{title}</p>
        )}
      </div>
    </div>
  );
}
