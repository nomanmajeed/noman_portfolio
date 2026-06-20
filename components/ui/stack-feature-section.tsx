"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaAws,
  FaDocker,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiDjango,
  SiFastapi,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconConfig = {
  Icon: IconType;
  color: string;
  label: string;
};

const iconConfigs: IconConfig[] = [
  { Icon: FaPython, color: "#3776AB", label: "Python" },
  { Icon: SiFastapi, color: "#009688", label: "FastAPI" },
  { Icon: SiDjango, color: "currentColor", label: "Django" },
  { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  { Icon: FaReact, color: "#61DAFB", label: "React" },
  { Icon: SiNextdotjs, color: "currentColor", label: "Next.js" },
  { Icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  { Icon: SiRedis, color: "#DC382D", label: "Redis" },
  { Icon: FaDocker, color: "#2496ED", label: "Docker" },
  { Icon: FaAws, color: "#FF9900", label: "AWS" },
  { Icon: SiGraphql, color: "#E10098", label: "GraphQL" },
  { Icon: SiSupabase, color: "#3ECF8E", label: "Supabase" },
  { Icon: SiGit, color: "#F05032", label: "Git" },
];

const orbitDurations = ["12s", "18s", "24s"];

type StackFeatureSectionProps = {
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export function StackFeatureSection({
  title = "Engineering at every layer",
  description = "From Python backends and AI pipelines to Next.js frontends — I build full-stack products that scale to millions of users.",
  primaryCta = { label: "View My Work", href: "#work" },
  secondaryCta = { label: "Download CV", href: "/Noman_Majeed_CV.pdf" },
  className,
}: StackFeatureSectionProps) {
  const orbitCount = 3;
  const orbitGap = 8;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section
      className={cn(
        "relative flex min-h-[28rem] flex-col overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] backdrop-blur-sm lg:h-[30rem] lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" />

      <div className="relative z-10 w-full p-8 md:p-10 lg:w-1/2 lg:pl-10">
        <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={primaryCta.href}>
            <Button className="">{primaryCta.label}</Button>
          </Link>
          <Link href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="">
              {secondaryCta.label}
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative flex h-[22rem] w-full items-center justify-start overflow-hidden lg:h-full lg:w-1/2">
        <div className="relative flex h-[42rem] w-[42rem] translate-x-[15%] items-center justify-center sm:translate-x-[25%] lg:translate-x-[50%]">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-background shadow-[0_0_40px_hsl(var(--brand-foreground)/0.25)]">
            <FaPython className="h-12 w-12 text-[#3776AB]" aria-hidden />
          </div>

          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-foreground/20"
                style={{
                  width: size,
                  height: size,
                  animation: `orbit-spin ${orbitDurations[orbitIdx]} linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = Number((50 + 50 * Math.cos(angle)).toFixed(4));
                    const y = Number((50 + 50 * Math.sin(angle)).toFixed(4));
                    const Icon = cfg.Icon;
                    const isCurrentColor = cfg.color === "currentColor";

                    return (
                      <div
                        key={cfg.label}
                        className="absolute rounded-full border border-border bg-background p-1.5 shadow-md"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={cfg.label}
                      >
                        <Icon
                          className={cn("h-7 w-7", isCurrentColor && "text-foreground")}
                          style={isCurrentColor ? undefined : { color: cfg.color }}
                          aria-hidden
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
