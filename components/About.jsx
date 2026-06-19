'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { SectionHeader } from './SectionHeader';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '5+', label: 'Happy Clients' },
];

const tools = [
  { key: 'react', label: 'React' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'node', label: 'Node.js' },
  { key: 'figma', label: 'Figma' },
  { key: 'git', label: 'Git' },
];

function AnimatedStat({ stat, index }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <span className="mb-1.5 block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text font-[family-name:var(--font-playfair)] text-3xl font-bold text-transparent">
        {stat.value}
      </span>
      <span className="text-xs font-medium leading-snug text-zinc-500">{stat.label}</span>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative">
              <img
                src={getImgSrc(images.profile)}
                alt={profileData.name}
                className="relative z-[2] h-[350px] w-full rounded-3xl object-cover md:h-[420px]"
              />
              <div className="absolute -inset-2 -z-[1] rounded-[28px] border-2 border-indigo-500/20" />
              <div className="absolute -bottom-3 -right-3 -z-[1] h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20" />
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SectionHeader
                label="About Me"
                title="Crafting digital experiences with passion & precision"
              />
            </motion.div>

            <motion.p
              className="mb-4 text-base leading-relaxed text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I&apos;m a frontend developer based in Pakistan with a passion for building
              beautiful, performant web applications. I specialize in React and Next.js,
              turning complex problems into simple, elegant interfaces.
            </motion.p>

            <motion.p
              className="mb-8 text-base leading-relaxed text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open source, or designing user interfaces that people love to use.
            </motion.p>

            <div className="mb-10 grid grid-cols-3 gap-6 border-y border-white/10 py-6">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((tool, i) => (
                  <motion.div
                    key={tool.key}
                    className="flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-indigo-500/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.05, type: 'spring', stiffness: 300 }}
                  >
                    <img src={getImgSrc(images[tool.key])} alt={tool.label} className="h-5 w-5 object-contain" />
                    <span className="text-sm font-medium text-zinc-300">{tool.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
