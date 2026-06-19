'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { images } from '@/constants/images';
import { worksData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { SectionHeader } from './SectionHeader';

function TiltCard({ work, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors will-change-transform hover:border-indigo-400/40 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative h-60 overflow-hidden md:h-64">
        <img
          src={work.imgUrl ? getImgSrc(images[work.imgUrl]) : ''}
          alt={work.title}
          className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={work.projectLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-black transition-all hover:scale-105 hover:bg-indigo-400 hover:text-white"
          >
            <HiOutlineExternalLink className="text-sm" />
            Preview
          </a>
          <a
            href={work.codeLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-black transition-all hover:scale-105 hover:bg-indigo-400 hover:text-white"
          >
            <AiFillGithub className="text-sm" />
            Code
          </a>
        </div>
      </div>

      <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
          {work.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400">{work.description}</p>
      </div>
    </motion.div>
  );
}

const allTags = ['All', 'Web App', 'Mobile App', 'UI/UX', 'React JS'];

export function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredWorks =
    activeFilter === 'All'
      ? worksData
      : worksData.filter((w) => w.tags.includes(activeFilter));

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Portfolio"
              title="Selected Projects"
              subtitle="A showcase of projects that reflect my skills and creative problem-solving."
            />
          </motion.div>
        </div>

        <motion.div
          className="mb-12 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === tag
                  ? 'border-white bg-white text-black hover:border-indigo-300 hover:bg-indigo-100'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-indigo-400/50 hover:text-white'
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {filteredWorks.map((work, index) => (
            <TiltCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
