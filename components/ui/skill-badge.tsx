"use client";

import { images } from "@/constants/images";
import { getImgSrc } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

export type SkillBadgeData = {
  name: string;
  icon?: string;
  iconUrl?: string;
  bgColor: string;
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
        "flex shrink-0 cursor-default items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-white/10 hover:shadow-[0_8px_25px_rgba(99,102,241,0.12)]",
        className
      )}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-1.5"
        style={{ backgroundColor: skill.bgColor }}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={skill.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : null}
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-zinc-100">{skill.name}</span>
    </div>
  );
}
