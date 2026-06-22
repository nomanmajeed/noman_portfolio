'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Maximize2 } from 'lucide-react';
import { AiFillGithub } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { worksData } from '@/data';
import { ExpandableGallery } from '@/components/ui/expandable-gallery';
import { ProjectDetailModal } from '@/components/ui/project-detail-modal';
import { ProjectMedia } from '@/components/ui/project-media';
import {
  ProjectFilters,
  buildFilterOptions,
  matchesMultiFilters,
} from '@/components/ui/project-filters';
import { TechIconCircle } from '@/components/ui/tech-icon-circle';
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

function GlowSection({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="brand-glow pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-3xl" />
      <div className="brand-glow pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full blur-3xl" />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}

export function Work() {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const featuredWorks = worksData.filter((w) => w.featured);
  const allProjects = worksData.filter((w) => !w.featured);
  const filterOptions = buildFilterOptions(allProjects);

  const filteredProjects = useMemo(
    () =>
      allProjects.filter((work) =>
        matchesMultiFilters(work, {
          domains: selectedDomains,
          tags: selectedTags,
          skills: selectedSkills,
        })
      ),
    [allProjects, selectedDomains, selectedTags, selectedSkills]
  );

  const filterKey = `${selectedDomains.join('-')}|${selectedTags.join('-')}|${selectedSkills.join('-')}`;

  const clearFilters = () => {
    setSelectedDomains([]);
    setSelectedTags([]);
    setSelectedSkills([]);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="relative z-[2] mx-auto max-w-6xl px-6 md:px-10 lg:px-24">
        <div className="mb-8 md:mb-10">
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
      </div>

      <GlowSection className="pt-2 pb-4">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-24">
          <motion.div
            className="relative mb-6 flex items-center gap-3 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <span className="h-px flex-1 bg-border" />
            All Projects
            <span className="h-px flex-1 bg-border" />
          </motion.div>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ProjectFilters
              options={filterOptions}
              selectedDomains={selectedDomains}
              selectedTags={selectedTags}
              selectedSkills={selectedSkills}
              onDomainsChange={setSelectedDomains}
              onTagsChange={setSelectedTags}
              onSkillsChange={setSelectedSkills}
              onClearAll={clearFilters}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <ExpandableGallery
              key={filterKey}
              works={filteredProjects}
              expandedCount={featuredWorks.length + filteredProjects.length}
              expandedSlot={
                featuredWorks.length > 0 ? (
                  <>
                    <div className="flex items-center gap-3 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60">
                      <span className="h-px flex-1 bg-border" />
                      Featured
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    {featuredWorks.map((work, index) => (
                      <FeaturedProjectCard
                        key={work.title}
                        work={work}
                        index={index}
                        onOpenDetail={() => setSelectedWork(work)}
                      />
                    ))}
                  </>
                ) : undefined
              }
              onSelectWork={setSelectedWork}
            />
          </motion.div>
        </div>
      </GlowSection>

      <ProjectDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}
