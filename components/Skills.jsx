'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiencesData, profileData } from '@/data';
import { SectionHeader } from './SectionHeader';

function TimelineItem({ experience, index, compact = false }) {
  return (
    <motion.div
      className={`relative pl-11 ${compact ? 'pb-6 last:pb-0' : 'pb-8 last:pb-0'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="absolute left-2 top-1 flex h-4 w-4 items-center justify-center">
        <div className="h-3 w-3 rounded-full border-[3px] border-zinc-950 bg-indigo-500 shadow-[0_0_0_2px_#6366f1]" />
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-indigo-400/40 hover:bg-white/[0.07] md:p-5">
        <span className="mb-2 inline-block rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
          {experience.year}
        </span>
        {experience.works.map((work, i) => (
          <div
            key={`${experience.year}-${work.name}`}
            className={i < experience.works.length - 1 ? 'mb-3 border-b border-white/10 pb-3' : ''}
          >
            <h4 className="text-sm font-semibold text-white md:text-base">{work.name}</h4>
            <p className="mb-1 text-xs font-medium text-indigo-300 md:text-sm">{work.company}</p>
            <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">{work.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TimelineColumn({ experiences, startIndex = 0 }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[15px] top-0 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-white/10" />
      {experiences.map((exp, i) => (
        <TimelineItem key={exp.year} experience={exp} index={startIndex + i} compact />
      ))}
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const experiences = [...experiencesData].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  const midpoint = Math.ceil(experiences.length / 2);
  const leftColumn = experiences.slice(0, midpoint);
  const rightColumn = experiences.slice(midpoint);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-black px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Experience"
              title="My Journey & Skills"
              subtitle="6+ years across AI, fintech, healthcare, and SaaS — from Django backends to Next.js full-stack products."
              centered
            />
          </motion.div>
        </div>

        <div>
          <motion.h3
            className="mb-6 inline-block border-b-2 border-indigo-500 pb-3 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Work History
          </motion.h3>

          <div className="grid gap-8 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
            <TimelineColumn experiences={leftColumn} startIndex={0} />
            <TimelineColumn experiences={rightColumn} startIndex={leftColumn.length} />
          </div>
        </div>

        {profileData.certifications?.length > 0 && (
          <motion.div
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:mt-12 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-5 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
              Certifications & Training
            </h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {profileData.certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
