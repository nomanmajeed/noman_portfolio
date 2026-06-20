"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TechOrbitRing } from "@/components/ui/tech-orbit-ring";
import { cn } from "@/lib/utils";

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
        <TechOrbitRing className="lg:h-full" />
      </div>
    </section>
  );
}
