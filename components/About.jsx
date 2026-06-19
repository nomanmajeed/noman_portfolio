'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cloud,
  Code2,
  GraduationCap,
  MapPin,
  Server,
  Sparkles,
} from 'lucide-react';
import { images } from '@/constants/images';
import { aboutsData, profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { SectionHeader } from './SectionHeader';

const PROFILE_FALLBACK =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

const serviceIcons = {
  'Backend Engineering': Server,
  'AI & LLM Integration': Sparkles,
  'Full-Stack Development': Code2,
  'Cloud & DevOps': Cloud,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function BentoCard({ className = '', children, delay = 0 }) {
  return (
    <motion.div
      variants={itemVariants}
      custom={delay}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-indigo-400/30 hover:bg-white/[0.06] ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100"
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

function StatCard({ stat }) {
  return (
    <BentoCard className="flex flex-col justify-center text-center">
      <span className="mb-1 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text font-[family-name:var(--font-playfair)] text-3xl font-bold text-transparent md:text-4xl">
        {stat.value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {stat.label}
      </span>
    </BentoCard>
  );
}

function ServiceCard({ service }) {
  const Icon = serviceIcons[service.title] ?? Sparkles;

  return (
    <BentoCard className="flex flex-col gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 ring-1 ring-indigo-500/20">
        <Icon className="h-5 w-5 text-indigo-300" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="mb-2 text-base font-semibold text-white">{service.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{service.description}</p>
      </div>
    </BentoCard>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const profileImage = getImgSrc(images.profile) || PROFILE_FALLBACK;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <SectionHeader
            label="About Me"
            title="Building reliable systems at scale"
            subtitle="Senior Software Engineer specializing in Python backends, AI integration, and full-stack product delivery."
            centered
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm md:min-h-[480px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-60" />
              <img
                src={profileImage}
                alt={profileData.name}
                className="relative z-[1] h-full min-h-[340px] w-full rounded-2xl object-cover md:min-h-[456px]"
              />
              <div className="absolute inset-3 rounded-2xl ring-1 ring-inset ring-white/10" />

              <div className="absolute bottom-6 left-6 right-6 z-[2] flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-sm font-semibold text-white">{profileData.name}</p>
                  <p className="text-xs text-zinc-400">{profileData.tagline}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/25">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <BentoCard>
              <p className="mb-4 text-base leading-relaxed text-zinc-300">{profileData.bio}</p>
              <p className="text-base leading-relaxed text-zinc-400">{profileData.bioExtended}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
                  <MapPin className="h-3.5 w-3.5 text-indigo-300" />
                  {profileData.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
                  <GraduationCap className="h-3.5 w-3.5 text-indigo-300" />
                  {profileData.education}
                </span>
                {profileData.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300"
                  >
                    <Code2 className="h-3.5 w-3.5 text-indigo-300" />
                    {lang}
                  </span>
                ))}
              </div>
            </BentoCard>

            <div className="grid grid-cols-3 gap-4">
              {profileData.stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {aboutsData.map((service) => (
            <div key={service.title} className="md:col-span-1 lg:col-span-3">
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
