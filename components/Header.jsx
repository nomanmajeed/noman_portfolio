'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';

const STATUS_ITEMS = ['React', 'Next.js', 'TypeScript', 'Node.js'];

function FloatingShape({ className, delay = 0, animate }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-[1] hidden md:block ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...animate,
      }}
      transition={{
        opacity: { delay: 0.8 + delay, duration: 1 },
        scale: { delay: 0.8 + delay, duration: 1 },
        y: { duration: 6 + delay * 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      }}
    />
  );
}

export function Header() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black_30%,transparent_100%)]"
          aria-hidden
        />
        <div className="absolute -right-[5%] -top-[10%] h-[500px] w-[500px] animate-pulse rounded-full bg-indigo-500/10 blur-[80px]" />
        <div className="absolute -bottom-[5%] -left-[5%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[80px]" />
        <div className="absolute left-1/2 top-[30%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-pink-500/5 blur-[80px]" />
      </div>

      <FloatingShape
        className="left-[12%] top-[18%] h-12 w-12 rotate-45 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 opacity-15"
        delay={0}
        animate={{ y: [0, -15, 0] }}
      />
      <FloatingShape
        className="right-[15%] top-[25%] h-20 w-20 rounded-full border-[3px] border-indigo-500 opacity-10"
        delay={0.2}
        animate={{ y: [0, -10, 0], rotate: [0, 360] }}
      />
      <FloatingShape
        className="bottom-[25%] left-[8%] h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10"
        delay={0.4}
        animate={{ y: [0, -20, 0] }}
      />

      <motion.div
        className="relative z-[2] flex max-w-2xl flex-col items-center text-center"
        style={{ y, opacity }}
      >
        <motion.div
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 pl-2.5 text-xs font-medium text-zinc-500 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Available for freelance work
        </motion.div>

        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <img
            src={getImgSrc(images.profile)}
            alt={profileData.name}
            className="relative z-[2] h-[110px] w-[110px] rounded-full border-[3px] border-white object-cover shadow-xl md:h-[140px] md:w-[140px]"
          />
          <div className="absolute -inset-1.5 animate-spin rounded-full border-2 border-dashed border-indigo-300 opacity-30 [animation-duration:20s]" />
        </motion.div>

        <motion.h1
          className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight tracking-tight text-zinc-950 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            {profileData.name.split(' ')[0]}
          </span>
          <br />
          <span className="mt-2 block font-[family-name:var(--font-inter)] text-lg font-normal text-zinc-500 md:text-xl">
            Frontend Developer &amp; Designer
          </span>
        </motion.h1>

        <motion.p
          className="mb-8 max-w-lg text-base leading-relaxed text-zinc-500 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {profileData.bio}
        </motion.p>

        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <a
            href={profileData.connectUrl}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L8 3M13 8L8 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={profileData.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-zinc-200 px-7 py-3 text-sm font-medium text-zinc-950 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-500"
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {STATUS_ITEMS.map((item, i) => (
            <motion.span
              key={item}
              className="rounded-full border border-zinc-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-zinc-500 backdrop-blur-sm transition-colors hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 300 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 overflow-hidden rounded-full bg-zinc-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full w-full origin-top rounded-full bg-indigo-500"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
