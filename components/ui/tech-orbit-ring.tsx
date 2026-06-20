"use client";

import { TechIconCircle } from "@/components/ui/tech-icon-circle";
import { techStack, type TechStackItem } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

const ORBIT_DURATIONS = ["12s", "18s", "24s"] as const;

type TechOrbitRingProps = {
  items?: TechStackItem[];
  orbitCount?: number;
  orbitGap?: number;
  className?: string;
  ringClassName?: string;
};

export function TechOrbitRing({
  items = techStack,
  orbitCount = 3,
  orbitGap = 8,
  className,
  ringClassName,
}: TechOrbitRingProps) {
  const iconsPerOrbit = Math.ceil(items.length / orbitCount);
  const centerItem = items.find((item) => item.id === "python") ?? items[0];

  return (
    <div
      className={cn(
        "relative flex h-[22rem] w-full items-center justify-center overflow-hidden lg:h-full",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-[42rem] w-[42rem] translate-x-[15%] items-center justify-center sm:translate-x-[25%] lg:translate-x-[50%]",
          ringClassName
        )}
      >
        <TechIconCircle item={centerItem} size="xl" glow />

        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `${12 + orbitGap * (orbitIdx + 1)}rem`;
          const angleStep = (2 * Math.PI) / iconsPerOrbit;

          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border-2 border-dotted border-foreground/20"
              style={{
                width: orbitSize,
                height: orbitSize,
                animation: `orbit-spin ${ORBIT_DURATIONS[orbitIdx]} linear infinite`,
              }}
            >
              {items
                .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                .map((item, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={item.id}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <TechIconCircle item={item} size="md" />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
