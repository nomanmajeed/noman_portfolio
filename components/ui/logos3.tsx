"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

export interface Logos3Props {
  heading?: string;
  subheading?: string;
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  {
    id: "react",
    description: "React",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "nextjs",
    description: "Next.js",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "typescript",
    description: "TypeScript",
    image: "https://svgl.app/library/typescript.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "tailwind",
    description: "Tailwind CSS",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
    className: "h-4 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "figma",
    description: "Figma",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "nodejs",
    description: "Node.js",
    image: "https://svgl.app/library/nodejs.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "vercel",
    description: "Vercel",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
  {
    id: "graphql",
    description: "GraphQL",
    image: "https://svgl.app/library/graphql.svg",
    className: "h-7 w-auto opacity-70 dark:brightness-0 dark:invert",
  },
];

export function Logos3({
  heading = "Tech I work on",
  subheading = "Tools & frameworks behind my builds",
  logos = defaultLogos,
  className,
}: Logos3Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-white/5 bg-black py-12 md:py-16",
        className
      )}
      aria-label="Technologies I work with"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative z-[2] container mx-auto flex flex-col items-center px-6 text-center">
        <p className="mb-2 text-sm font-medium tracking-tight text-zinc-400 md:text-base">
          {heading}
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-white md:text-2xl">
          {subheading}
        </h2>
      </div>

      <div className="relative z-[2] pt-8 md:pt-10">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-6 flex shrink-0 items-center justify-center md:mx-10">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent md:w-16" />
        </div>
      </div>
    </section>
  );
}
