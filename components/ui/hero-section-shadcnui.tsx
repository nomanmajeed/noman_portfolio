"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export interface HeroSectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  bio?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  avatarUrl?: string;
  avatarAlt?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const defaultStats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Happy Clients" },
];

export function HeroSection({
  badge = "Available for freelance work",
  title = "Hi, I'm Noman",
  titleHighlight = "Frontend Developer",
  subtitle = "Based in Pakistan",
  bio = "I build modern, performant web applications with React, Next.js, and TypeScript.",
  primaryCta = { label: "View My Work", href: "#contact" },
  secondaryCta = { label: "Download CV", href: "#" },
  stats = defaultStats,
  avatarUrl,
  avatarAlt = "Profile photo",
}: HeroSectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-[500px] flex-col items-center justify-center px-4 pb-20 pt-12 text-center md:pb-28 md:pt-16"
    >
      {avatarUrl && (
        <motion.div variants={itemVariants} className="relative mb-6">
          <Image
            src={avatarUrl}
            alt={avatarAlt}
            width={110}
            height={110}
            className="relative z-[2] h-[110px] w-[110px] rounded-full border-[3px] border-background object-cover shadow-xl md:h-[120px] md:w-[120px]"
            priority
          />
          <div className="absolute -inset-1.5 animate-spin rounded-full border-2 border-dashed border-indigo-300/40 [animation-duration:20s]" />
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          {badge}
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mb-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
      >
        {title}
        <br />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="mb-3 text-sm text-muted-foreground md:text-base"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.p
        variants={itemVariants}
        className="mb-6 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base"
      >
        {bio}
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
        <Button
          size="default"
          className="gap-1.5 rounded-full px-5"
          onClick={() => {
            window.location.href = primaryCta.href;
          }}
        >
          {primaryCta.label}
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          size="default"
          variant="outline"
          className="rounded-full px-5"
          onClick={() => {
            window.location.href = secondaryCta.href;
          }}
        >
          {secondaryCta.label}
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground md:gap-8"
      >
        {stats.map((stat, index) => (
          <Fragment key={stat.label}>
            {index > 0 ? (
              <div className="hidden h-6 w-px bg-border sm:block" aria-hidden />
            ) : null}
            <div className="text-center">
              <div className="text-lg font-bold text-foreground md:text-xl">{stat.value}</div>
              <div className="text-xs md:text-sm">{stat.label}</div>
            </div>
          </Fragment>
        ))}
      </motion.div>
    </motion.div>
  );
}
