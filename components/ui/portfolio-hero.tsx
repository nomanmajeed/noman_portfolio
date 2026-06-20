"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

export interface PortfolioHeroProps {
  badge?: string;
  title?: string;
  titleEmphasis?: string;
  titleSuffix?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  avatarUrl?: string;
  avatarAlt?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const SPRING = { stiffness: 110, damping: 24, mass: 0.5 };
const CURSOR_SPRING = { stiffness: 55, damping: 22, mass: 0.7 };

function HighlightBadge({ label }: { label: string }) {
  return (
    <div className="relative mb-6 inline-flex rounded-full p-px">
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute -inset-[100%] motion-safe:animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,hsl(var(--brand-foreground)/0.9)_20%,hsl(var(--brand-foreground)/0.5)_45%,hsl(var(--brand-foreground)/0.8)_70%,transparent_100%)]" />
      </div>
      <div
        aria-hidden
        className="brand-glow absolute -inset-2 rounded-full blur-lg motion-safe:animate-[badge-glow_3s_ease-in-out_infinite]"
      />
      <span className="relative inline-flex items-center gap-2 rounded-full border border-brand/25 bg-background/80 px-3.5 py-1.5 shadow-[0_0_20px_hsl(var(--brand-foreground)/0.3)] backdrop-blur-md">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-brand opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_hsl(var(--brand-foreground)/0.9)]" />
        </span>
        <span className="text-xs font-medium tracking-wide text-foreground">{label}</span>
      </span>
    </div>
  );
}

function AmbientLoopGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[55%] top-[45%] h-[min(520px,90vw)] w-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[orbit-glow_20s_linear_infinite]">
        <div className="brand-glow absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="absolute left-[40%] top-[50%] h-[min(400px,75vw)] w-[min(400px,75vw)] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[orbit-glow_28s_linear_infinite_reverse]">
        <div className="brand-glow absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="absolute left-[65%] top-[55%] h-[min(300px,60vw)] w-[min(300px,60vw)] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[orbit-glow_14s_linear_infinite]">
        <div className="brand-glow absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl" />
      </div>
    </div>
  );
}

function CursorGlow({
  x,
  y,
  opacity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-[1] mix-blend-multiply dark:mix-blend-screen"
      style={{ left: x, top: y, x: "-50%", y: "-50%", opacity }}
    >
      <div className="relative h-0 w-0">
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/70 blur-[2px]" />
        <div className="brand-glow absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
        <div className="brand-glow absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="brand-glow absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />
      </div>
    </motion.div>
  );
}

export function PortfolioHero({
  badge = "Open to new opportunities",
  title = "Build",
  titleEmphasis = "AI-powered systems",
  titleSuffix = "from idea to production",
  subtitle,
  primaryCta = { label: "View My Work", href: "#work" },
  secondaryCta = { label: "Download CV", href: "#" },
  avatarUrl,
  avatarAlt = "Profile photo",
}: PortfolioHeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);
  const smoothCursorX = useSpring(cursorX, CURSOR_SPRING);
  const smoothCursorY = useSpring(cursorY, CURSOR_SPRING);
  const smoothGlowOpacity = useSpring(glowOpacity, { stiffness: 120, damping: 28 });

  const textX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const photoRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const photoRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const photoX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const ringX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const ringY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
    glowOpacity.set(1);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    glowOpacity.set(0);
  };

  const motionProps = reduceMotion
    ? { initial: false, animate: "visible" }
    : { initial: "hidden", animate: "visible" };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-background"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => !reduceMotion && glowOpacity.set(1)}
      onPointerLeave={handlePointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,hsl(var(--brand-foreground)/0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      {!reduceMotion && <AmbientLoopGlow />}

      {!reduceMotion && (
        <CursorGlow x={smoothCursorX} y={smoothCursorY} opacity={smoothGlowOpacity} />
      )}

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-10 px-6 pb-16 pt-24 md:px-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-16 lg:pb-20">
        <motion.div
          variants={containerVariants}
          {...motionProps}
          className="max-w-xl"
          style={reduceMotion ? undefined : { x: textX, y: textY }}
        >
          {badge && (
            <motion.div variants={itemVariants}>
              <HighlightBadge label={badge} />
            </motion.div>
          )}

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-semibold tracking-tighter text-foreground md:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            {title}{" "}
            <span className="italic text-brand">{titleEmphasis}</span>
            <br />
            {titleSuffix}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={primaryCta.href}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/5"
            >
              <Download className="h-4 w-4" />
              {secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>

        {avatarUrl && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto lg:max-w-md"
            style={
              reduceMotion
                ? undefined
                : {
                    x: photoX,
                    y: photoY,
                    rotateX: photoRotateX,
                    rotateY: photoRotateY,
                    transformPerspective: 1200,
                  }
            }
          >
            <div className="brand-glow pointer-events-none absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl" />

            <div className="relative aspect-[4/5] w-full">
              <motion.div
                aria-hidden
                className="absolute -inset-3 rounded-[2rem] border border-dashed border-foreground/10 motion-safe:animate-spin [animation-duration:24s]"
                style={reduceMotion ? undefined : { x: ringX, y: ringY }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src={avatarUrl}
                  alt={avatarAlt}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 384px, 448px"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default PortfolioHero;
