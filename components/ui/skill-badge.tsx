"use client";

import { TechIconCircle } from "@/components/ui/tech-icon-circle";
import type { TechStackItem } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  skill: TechStackItem;
  className?: string;
};

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 cursor-default items-center gap-2.5 rounded-full border border-border bg-foreground/[0.06] py-1.5 pl-1.5 pr-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-foreground/10 hover:shadow-[0_8px_25px_hsl(var(--brand-foreground)/0.12)]",
        className
      )}
    >
      <TechIconCircle item={skill} size="sm" />
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {skill.name}
      </span>
    </div>
  );
}

export type { TechStackItem as SkillBadgeData };
