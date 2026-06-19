'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { images } from '@/constants/images';
import { skillsData, experiencesData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { SectionHeader } from './SectionHeader';

function SkillPill({ skill, index }) {
  return (
    <motion.div
      className="flex cursor-default items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_8px_25px_rgba(99,102,241,0.15)]"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300 }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
        <img
          src={skill.icon ? getImgSrc(images[skill.icon]) : ''}
          alt={skill.name}
          className="h-[18px] w-[18px] object-contain"
        />
      </div>
      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
    </motion.div>
  );
}

function TimelineItem({ experience, index }) {
  return (
    <motion.div
      className="relative pb-8 pl-11 last:pb-0"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute left-2 top-1 flex h-4 w-4 items-center justify-center">
        <div className="h-3 w-3 rounded-full border-[3px] border-zinc-950 bg-indigo-500 shadow-[0_0_0_2px_#6366f1]" />
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:translate-x-1 hover:border-indigo-400/40 hover:bg-white/[0.07]">
        <span className="mb-3 inline-block rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
          {experience.year}
        </span>
        {experience.works.map((work, i) => (
          <div
            key={work.name}
            className={i < experience.works.length - 1 ? 'mb-4 border-b border-white/10 pb-4' : ''}
          >
            <h4 className="text-base font-semibold text-white">{work.name}</h4>
            <p className="mb-1.5 text-sm font-medium text-indigo-300">{work.company}</p>
            <p className="text-sm leading-relaxed text-zinc-400">{work.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const experiences = [...experiencesData].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-black px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Experience"
              title="My Journey & Skills"
              subtitle="A collection of technologies I work with and the path that brought me here."
            />
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h3
              className="mb-6 inline-block border-b-2 border-indigo-500 pb-3 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Tech Stack
            </motion.h3>
            <div className="flex flex-wrap gap-2.5">
              {skillsData.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              className="mb-6 inline-block border-b-2 border-indigo-500 pb-3 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Experience
            </motion.h3>
            <div className="relative">
              <div className="absolute bottom-0 left-[15px] top-0 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-white/10" />
              {experiences.map((exp, i) => (
                <TimelineItem key={exp.year} experience={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
