"use client";

import { isCurrentColorIcon, type TechStackItem } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

type TechIconCircleSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeStyles: Record<
  TechIconCircleSize,
  { circle: string; icon: string; pad: string }
> = {
  xs: { circle: "h-8 w-8", icon: "h-4 w-4", pad: "p-1" },
  sm: { circle: "h-9 w-9", icon: "h-4 w-4", pad: "p-1.5" },
  md: { circle: "h-11 w-11", icon: "h-5 w-5", pad: "p-1.5" },
  lg: { circle: "h-14 w-14", icon: "h-7 w-7", pad: "p-2" },
  xl: { circle: "h-24 w-24", icon: "h-12 w-12", pad: "p-3" },
};

type TechIconCircleProps = {
  item: TechStackItem;
  size?: TechIconCircleSize;
  className?: string;
  glow?: boolean;
};

export function TechIconCircle({
  item,
  size = "sm",
  className,
  glow = false,
}: TechIconCircleProps) {
  const { Icon, color, name } = item;
  const themeAware = isCurrentColorIcon(color);
  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-md",
        styles.circle,
        styles.pad,
        glow && "shadow-[0_0_40px_hsl(var(--brand-foreground)/0.25)]",
        className
      )}
      title={name}
    >
      <Icon
        className={cn(styles.icon, themeAware && "text-foreground")}
        style={themeAware ? undefined : { color }}
        aria-hidden
      />
    </div>
  );
}
