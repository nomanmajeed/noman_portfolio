"use client";

import { images } from "@/constants/images";
import { getImgSrc } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

export type SkillBadgeData = {
  name: string;
  icon?: string;
  iconUrl?: string;
  bgColor: string;
  /** Only for icons that clash with the brand tint (same-color logos or white-on-white). */
  iconBg?: "light" | "dark";
};

type SkillBadgeProps = {
  skill: SkillBadgeData;
  className?: string;
};

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const iconSrc =
    skill.iconUrl || (skill.icon ? getImgSrc(images[skill.icon as keyof typeof images]) : "");

  return (
    <div
      className={cn(
        "flex shrink-0 cursor-default items-center gap-2.5 rounded-full border border-border bg-foreground/[0.06] py-1.5 pl-1.5 pr-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-foreground/10 hover:shadow-[0_8px_25px_hsl(var(--brand-foreground)/0.12)]",
        className
      )}
    >
      <div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-1.5 ring-1 ring-foreground/10"
        style={{
          backgroundColor: `color-mix(in srgb, ${skill.bgColor} 40%, transparent)`,
        }}
      >
        {skill.iconBg ? (
          <div
            className={cn(
              "absolute inset-1 flex items-center justify-center rounded-full",
              skill.iconBg === "dark" ? "bg-zinc-900/90" : "bg-white/90"
            )}
          />
        ) : null}
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={skill.name}
            className="relative z-[1] h-full w-full object-contain"
            loading="lazy"
          />
        ) : null}
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">{skill.name}</span>
    </div>
  );
}
