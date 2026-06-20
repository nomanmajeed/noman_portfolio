'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Cloud, Code2, Server, Sparkles } from 'lucide-react';
import { images } from '@/constants/images';
import { aboutsData, profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { StackFeatureSection } from '@/components/ui/stack-feature-section';
import { SectionHeader } from './SectionHeader';

const PROFILE_FALLBACK =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

const serviceIcons = {
  'Backend Engineering': Server,
  'AI & LLM Integration': Sparkles,
  'Full-Stack Development': Code2,
  'Cloud & DevOps': Cloud,
};

const serviceTags = {
  'Backend Engineering': 'svc/backend',
  'AI & LLM Integration': 'svc/ai-llm',
  'Full-Stack Development': 'svc/full-stack',
  'Cloud & DevOps': 'svc/cloud',
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

const TYPE_SPEED_MS = 32;
const PAUSE_BEFORE_OUTPUT_MS = 240;
const PAUSE_AFTER_OUTPUT_MS = 420;

function useTerminalSequence(commandTexts, { active, instant }) {
  const [typed, setTyped] = useState(() => commandTexts.map(() => ''));
  const [revealed, setRevealed] = useState(() => commandTexts.map(() => false));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (instant) {
      setTyped(commandTexts);
      setRevealed(commandTexts.map(() => true));
      setFinished(true);
      return;
    }

    let cancelled = false;
    const timeouts = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    async function run() {
      for (let i = 0; i < commandTexts.length; i += 1) {
        const cmd = commandTexts[i];
        for (let c = 1; c <= cmd.length; c += 1) {
          await wait(TYPE_SPEED_MS);
          if (cancelled) return;
          setTyped((prev) => {
            const next = [...prev];
            next[i] = cmd.slice(0, c);
            return next;
          });
        }
        if (cancelled) return;
        await wait(PAUSE_BEFORE_OUTPUT_MS);
        if (cancelled) return;
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        await wait(PAUSE_AFTER_OUTPUT_MS);
      }
      if (!cancelled) setFinished(true);
    }

    run();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, instant]);

  return { typed, revealed, finished };
}

function TerminalConsole({ isInView, reducedMotion }) {
  const commands = [
    {
      cmd: 'whoami',
      output: (
        <div>
          <p className="text-sm font-semibold text-white md:text-base">{profileData.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">{profileData.titleHighlight}</p>
        </div>
      ),
    },
    {
      cmd: 'cat bio.md',
      output: (
        <div>
          <p className="text-sm leading-relaxed text-zinc-300">{profileData.bio}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{profileData.bioExtended}</p>
        </div>
      ),
    },
    {
      cmd: 'cat profile.json',
      output: (
        <pre className="whitespace-pre-wrap break-words text-[12.5px] leading-relaxed">
          <code>
            <span className="text-zinc-500">{'{'}</span>
            {'\n  '}
            <span className="text-indigo-300">"location"</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-300">"{profileData.location}"</span>
            <span className="text-zinc-500">,</span>
            {'\n  '}
            <span className="text-indigo-300">"education"</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-300">"{profileData.education}"</span>
            <span className="text-zinc-500">,</span>
            {'\n  '}
            <span className="text-indigo-300">"languages"</span>
            <span className="text-zinc-500">: [</span>
            {profileData.languages.map((lang, i) => (
              <span key={lang}>
                {'\n    '}
                <span className="text-emerald-300">"{lang}"</span>
                {i < profileData.languages.length - 1 && <span className="text-zinc-500">,</span>}
              </span>
            ))}
            {'\n  '}
            <span className="text-zinc-500">]</span>
            {'\n'}
            <span className="text-zinc-500">{'}'}</span>
          </code>
        </pre>
      ),
    },
  ];

  const commandTexts = commands.map((c) => c.cmd);
  const { typed, revealed, finished } = useTerminalSequence(commandTexts, {
    active: isInView,
    instant: reducedMotion,
  });

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-purple-500/[0.04]" />

      <div className="relative z-[1] flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden />
        <span className="ml-3 font-[family-name:var(--font-data)] text-xs text-zinc-500">
          noman@portfolio — zsh
        </span>
      </div>

      <div className="relative z-[1] flex-1 px-5 py-5 font-[family-name:var(--font-data)] md:px-6 md:py-6">
        {commands.map((c, i) => {
          if (i > 0 && !revealed[i - 1]) return null;

          return (
            <div key={c.cmd} className="mb-4">
              <div className="flex items-center gap-2 text-[13px] text-zinc-300">
                <span className="text-indigo-300">❯</span>
                <span>{typed[i]}</span>
                {!revealed[i] && typed[i].length < c.cmd.length && (
                  <span
                    className="inline-block h-3.5 w-[7px] translate-y-[1px] bg-indigo-300/80 [animation:caret-blink_1s_infinite]"
                    aria-hidden
                  />
                )}
              </div>
              {revealed[i] && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="ml-4 mt-2 border-l border-white/10 pl-4"
                >
                  {c.output}
                </motion.div>
              )}
            </div>
          );
        })}

        {finished && (
          <div className="flex items-center gap-2 text-[13px] text-zinc-300">
            <span className="text-indigo-300">❯</span>
            <span
              className="inline-block h-3.5 w-[7px] translate-y-[1px] bg-zinc-400 [animation:caret-blink_1s_infinite]"
              aria-hidden
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileCard({ profileImage }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-60" />
      <div className="relative h-44 overflow-hidden rounded-2xl md:h-52">
        <img
          src={profileImage}
          alt={profileData.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

        {[
          'left-2 top-2 border-l border-t',
          'right-2 top-2 border-r border-t',
          'left-2 bottom-2 border-l border-b',
          'right-2 bottom-2 border-r border-b',
        ].map((pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute h-4 w-4 ${pos} border-white/40`}
            aria-hidden
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-2 py-3">
        <div>
          <p className="text-sm font-semibold text-white">{profileData.name}</p>
          <p className="text-xs text-zinc-400">{profileData.tagline}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-[family-name:var(--font-data)] text-[10px] font-medium uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-500/25">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          open_to_work
        </span>
      </div>
    </div>
  );
}

function MetricsRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {profileData.stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center backdrop-blur-sm"
        >
          <span className="mb-1 block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text font-[family-name:var(--font-playfair)] text-2xl font-bold text-transparent md:text-3xl">
            {stat.value}
          </span>
          <span className="flex items-center justify-center gap-1.5 font-[family-name:var(--font-data)] text-[9.5px] uppercase tracking-wider text-zinc-500">
            <span className="h-1 w-1 rounded-full bg-emerald-400/80" aria-hidden />
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CapabilityRow({ service }) {
  const Icon = serviceIcons[service.title] ?? Sparkles;
  const tag = serviceTags[service.title] ?? 'svc/general';

  return (
    <div className="group flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-5 md:px-6">
      <div className="flex items-center gap-3 sm:w-[15rem] sm:shrink-0">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 ring-1 ring-indigo-500/20 transition-transform group-hover:scale-105">
          <Icon className="h-4 w-4 text-indigo-300" strokeWidth={1.75} />
        </div>
        <h3 className="text-sm font-semibold text-white">{service.title}</h3>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-zinc-400">{service.description}</p>
      <span className="shrink-0 font-[family-name:var(--font-data)] text-[11px] text-zinc-500 sm:text-right">
        {tag}
      </span>
    </div>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

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
          className="grid grid-cols-1 gap-4 lg:grid-cols-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <TerminalConsole isInView={isInView} reducedMotion={reducedMotion} />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 lg:col-span-5">
            <ProfileCard profileImage={profileImage} />
            <MetricsRow />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-12">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 md:px-6">
                <span className="font-[family-name:var(--font-data)] text-xs text-zinc-500">
                  systemctl status — core capabilities
                </span>
                <span className="hidden font-[family-name:var(--font-data)] text-xs text-zinc-600 sm:inline">
                  4 active
                </span>
              </div>
              <div className="divide-y divide-white/10">
                {aboutsData.map((service) => (
                  <CapabilityRow key={service.title} service={service} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-12">
            <StackFeatureSection
              title="Engineering at every layer"
              description="From Python backends and AI pipelines to Next.js frontends — I ship full-stack products built for scale, speed, and real-world impact."
              primaryCta={{ label: 'View My Work', href: profileData.connectUrl }}
              secondaryCta={{ label: 'Download CV', href: profileData.resumeUrl }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
