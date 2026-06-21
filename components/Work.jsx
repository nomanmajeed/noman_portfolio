'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Maximize2 } from 'lucide-react';
import { AiFillGithub } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { images } from '@/constants/images';
import { worksData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { TechIconCircle } from '@/components/ui/tech-icon-circle';
import { ProjectDetailModal } from '@/components/ui/project-detail-modal';
import { techStack } from '@/lib/tech-stack';
import { SectionHeader } from './SectionHeader';

function DetailButton({ onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      aria-label="View project details"
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 ${className}`}
    >
      <Maximize2 className="h-4 w-4" />
    </button>
  );
}

function CompanyBadge({ company }) {
  return (
    <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
      <Building2 className="h-3 w-3" />
      Built at {company.name}
    </div>
  );
}

function ProjectMedia({ work, imgClassName }) {
  if (work.previewImage) {
    return <img src={work.previewImage} alt={work.title} className={imgClassName} />;
  }

  if (work.images?.length) {
    return <img src={work.images[0]} alt={work.title} className={imgClassName} />;
  }

  if (work.imgUrl) {
    return (
      <img
        src={getImgSrc(images[work.imgUrl])}
        alt={work.title}
        className={imgClassName}
      />
    );
  }

  if (work.company) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/15 via-foreground/5 to-brand/5">
        <img
          src={work.company.logo}
          alt={work.company.name}
          className="h-20 w-20 rounded-2xl border border-border bg-white object-contain p-3 shadow-lg"
        />
      </div>
    );
  }

  return null;
}

function FeaturedProjectCard({ work, index, onOpenDetail }) {
  const reversed = index % 2 === 1;
  const stackItems = (work.stack ?? [])
    .map((id) => techStack.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <motion.div
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] backdrop-blur-sm lg:flex-row ${
        reversed ? 'lg:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onDoubleClick={onOpenDetail}
    >
      <div className="relative flex w-full flex-col lg:w-3/5">
        <div className="flex items-center gap-2 border-b border-border bg-foreground/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden />
          <span className="ml-2 font-[family-name:var(--font-data)] text-xs text-muted-foreground/70">
            {work.title} — preview
          </span>
        </div>
        <div className="relative h-64 flex-1 overflow-hidden md:h-80">
          <ProjectMedia
            work={work}
            imgClassName="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <DetailButton onOpen={onOpenDetail} className="absolute right-3 top-3" />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center p-8 lg:w-2/5 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-[family-name:var(--font-data)] text-[10px] font-medium uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            featured
          </span>
          {work.company && <CompanyBadge company={work.company} />}
        </div>
        <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground md:text-3xl">
          {work.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {work.description}
        </p>

        {stackItems.length > 0 && (
          <div className="mb-7 flex flex-wrap gap-2.5">
            {stackItems.map((item) => (
              <TechIconCircle key={item.id} item={item} size="xs" />
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {work.projectLink && (
            <a
              href={work.projectLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              <HiOutlineExternalLink className="text-base" />
              View Live
            </a>
          )}
          {work.codeLink && (
            <a
              href={work.codeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <AiFillGithub className="text-base" />
              Source
            </a>
          )}
          {!work.projectLink && !work.codeLink && work.company && (
            <a
              href={work.company.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <HiOutlineExternalLink className="text-base" />
              Company
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TiltCard({ work, index, onOpenDetail }) {
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

  const stackItems = (work.stack ?? [])
    .map((id) => techStack.find((item) => item.id === id))
    .filter(Boolean);

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
      className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors will-change-transform hover:border-brand/40 hover:bg-foreground/[0.07] hover:shadow-[0_20px_60px_hsl(var(--brand-foreground)/0.12)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onDoubleClick={onOpenDetail}
    >
      <div className="relative h-60 overflow-hidden md:h-64">
        <ProjectMedia
          work={work}
          imgClassName="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <DetailButton onOpen={onOpenDetail} className="absolute right-3 top-3 z-10" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {work.projectLink && (
            <a
              href={work.projectLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-black transition-all hover:scale-105 hover:bg-brand hover:text-foreground"
            >
              <HiOutlineExternalLink className="text-sm" />
              Preview
            </a>
          )}
          {work.codeLink && (
            <a
              href={work.codeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-black transition-all hover:scale-105 hover:bg-brand hover:text-foreground"
            >
              <AiFillGithub className="text-sm" />
              Code
            </a>
          )}
          {!work.projectLink && !work.codeLink && work.company && (
            <a
              href={work.company.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-black transition-all hover:scale-105 hover:bg-brand hover:text-foreground"
            >
              <HiOutlineExternalLink className="text-sm" />
              Company
            </a>
          )}
        </div>
      </div>

      <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
        {work.company && <CompanyBadge company={work.company} />}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/20 px-2.5 py-0.5 text-xs font-semibold text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
          {work.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{work.description}</p>

        {stackItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {stackItems.map((item) => (
              <TechIconCircle key={item.id} item={item} size="xs" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

const allTags = [
  'All',
  'Web App',
  'Full Stack',
  'Django',
  'FastAPI',
  'Next.js',
  'React',
  'MERN',
  'E-Commerce',
  'FinTech',
  'AI/LLM',
  'Analytics',
  'Microservices',
];

export function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedWork, setSelectedWork] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const featuredWorks = worksData.filter((w) => w.featured);

  const filteredWorks =
    activeFilter === 'All'
      ? worksData
      : worksData.filter((w) => w.tags.includes(activeFilter));

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
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
              title="Projects & Client Work"
              subtitle="Personal builds alongside production work shipped for clients and teams."
            />
          </motion.div>
        </div>

        {featuredWorks.length > 0 && (
          <div className="mb-14 flex flex-col gap-6">
            {featuredWorks.map((work, index) => (
              <FeaturedProjectCard
                key={work.title}
                work={work}
                index={index}
                onOpenDetail={() => setSelectedWork(work)}
              />
            ))}
          </div>
        )}

        <motion.div
          className="mb-6 flex items-center gap-3 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span className="h-px flex-1 bg-border" />
          All Projects
          <span className="h-px flex-1 bg-border" />
        </motion.div>

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
                  ? 'border-foreground bg-foreground text-background hover:opacity-90'
                  : 'border-border bg-foreground/5 text-muted-foreground hover:border-brand/50 hover:text-foreground'
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {filteredWorks.map((work, index) => (
            <TiltCard
              key={work.title}
              work={work}
              index={index}
              onOpenDetail={() => setSelectedWork(work)}
            />
          ))}
        </div>
      </div>

      <ProjectDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}
