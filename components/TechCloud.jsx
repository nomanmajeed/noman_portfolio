'use client';

import AutoScroll from 'embla-carousel-auto-scroll';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skillsData } from '@/data';

export function TechCloud() {
  return (
    <section
      className="relative overflow-hidden border-y border-border bg-background py-12 md:py-16"
      aria-label="Technologies I work with"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-foreground)/0.08),transparent_60%)]" />

      <div className="relative z-[2] container mx-auto flex flex-col items-center px-6 text-center">
        <p className="mb-2 text-sm font-medium tracking-tight text-muted-foreground md:text-base">
          Tech I work on
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Tools & frameworks behind my builds
        </h2>
      </div>

      <div className="relative z-[2] pt-8 md:pt-10">
        <div className="relative mx-auto max-w-6xl">
          <Carousel
            opts={{ loop: true, align: 'start', dragFree: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.8,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {skillsData.map((skill) => (
                <CarouselItem
                  key={skill.name}
                  className="basis-auto pl-0 pr-3 sm:pr-4"
                >
                  <SkillBadge skill={skill} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />
        </div>
      </div>
    </section>
  );
}
