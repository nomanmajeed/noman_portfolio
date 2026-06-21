'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { experiencesData, profileData } from '@/data';
import { SectionHeader } from './SectionHeader';

function CompanyLogo({ company, logo }) {
  const [failed, setFailed] = useState(false);
  const initial = company.charAt(0).toUpperCase();

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={`${company} logo`}
        className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white object-contain p-1.5"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-brand/30 to-brand/15 text-sm font-bold text-foreground">
      {initial}
    </div>
  );
}

function getCertFallbackInitial(cert) {
  if (/comsats/i.test(cert.issuer)) return 'C';
  if (/dice/i.test(cert.issuer)) return 'D';
  if (/jsm/i.test(cert.issuer)) return 'J';
  return cert.issuer.charAt(0).toUpperCase();
}

function CertificationLogo({ cert }) {
  const [failed, setFailed] = useState(false);
  const initial = getCertFallbackInitial(cert);

  if (cert.logo && !failed) {
    return (
      <img
        src={cert.logo}
        alt={`${cert.issuer} logo`}
        className="h-11 w-11 shrink-0 rounded-xl border border-border bg-white object-contain p-1.5 shadow-sm"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-brand/30 to-brand/15 text-sm font-bold text-foreground">
      {initial}
    </div>
  );
}

function ExperienceCard({ job, index, isExpanded, onToggle }) {
  const hasDetails =
    (job.highlights?.length ?? 0) > 0 ||
    (job.techStack?.length ?? 0) > 0 ||
    job.summary.length > 120;

  return (
    <motion.div
      className="relative pb-5 pl-11 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="absolute left-2 top-6 flex h-4 w-4 items-center justify-center">
        <div className="h-3 w-3 rounded-full border-[3px] border-background bg-brand shadow-[0_0_0_2px_hsl(var(--brand-foreground))]" />
      </div>

      <div
        className={`flex min-h-[9.5rem] flex-col rounded-2xl border border-border bg-foreground/5 p-4 backdrop-blur-sm transition-all md:p-5 ${
          isExpanded
            ? 'border-brand/40 bg-foreground/[0.07] shadow-[0_8px_30px_hsl(var(--brand-foreground)/0.08)]'
            : 'hover:border-brand/30 hover:bg-foreground/[0.06]'
        }`}
      >
        <div className="mb-3 flex gap-3">
          <CompanyLogo company={job.company} logo={job.logo} />
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
              <h4 className="text-sm font-semibold leading-snug text-foreground md:text-base">
                {job.title}
              </h4>
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground/70 md:text-xs">
                {job.startDate} – {job.endDate}
              </span>
            </div>
            {job.companyUrl ? (
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-brand transition-colors hover:text-brand/80 md:text-sm"
              >
                {job.company}
                <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
              </a>
            ) : (
              <p className="text-xs font-medium text-brand md:text-sm">{job.company}</p>
            )}
            {job.location && (
              <p className="mt-0.5 text-[11px] text-muted-foreground/70 md:text-xs">{job.location}</p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <p
            className={`text-xs leading-relaxed text-muted-foreground md:text-sm ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {job.summary}
          </p>

          {isExpanded && job.highlights?.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
              {job.highlights.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex gap-2 text-xs leading-relaxed text-muted-foreground md:text-sm"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {isExpanded && job.techStack?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
              {job.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/90 md:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {hasDetails && (
            <button
              type="button"
              onClick={() => onToggle(job.id)}
              aria-expanded={isExpanded}
              className="mt-auto inline-flex items-center gap-1 self-start pt-3 text-xs font-medium text-brand transition-colors hover:text-brand/80"
            >
              {isExpanded ? 'Show less' : 'Read more'}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineColumn({ jobs, startIndex, expandedId, onToggle }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[15px] top-0 w-0.5 rounded-full bg-gradient-to-b from-brand to-border" />
      {jobs.map((job, i) => (
        <ExperienceCard
          key={job.id}
          job={job}
          index={startIndex + i}
          isExpanded={expandedId === job.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedId, setExpandedId] = useState(null);

  const jobs = useMemo(() => experiencesData, []);

  const midpoint = Math.ceil(jobs.length / 2);
  const leftColumn = jobs.slice(0, midpoint);
  const rightColumn = jobs.slice(midpoint);

  const handleToggle = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-background px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="brand-glow pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-3xl" />
      <div className="brand-glow pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full blur-3xl" />

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
            className="mb-6 inline-block border-b-2 border-brand pb-3 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Work History
          </motion.h3>

          <div className="grid gap-8 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
            <TimelineColumn
              jobs={leftColumn}
              startIndex={0}
              expandedId={expandedId}
              onToggle={handleToggle}
            />
            <TimelineColumn
              jobs={rightColumn}
              startIndex={leftColumn.length}
              expandedId={expandedId}
              onToggle={handleToggle}
            />
          </div>
        </div>

        {profileData.certifications?.length > 0 && (
          <motion.div
            className="mt-10 rounded-3xl border border-border bg-foreground/[0.03] p-6 backdrop-blur-sm md:mt-12 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-5 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
              Certifications & Training
            </h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {profileData.certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="group flex items-start gap-3.5 rounded-2xl border border-border bg-foreground/[0.02] p-4 transition-colors hover:border-brand/30 hover:bg-foreground/[0.05]"
                >
                  <CertificationLogo cert={cert} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                      {cert.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-foreground/80">{cert.issuer}</p>
                    <p className="mt-0.5 font-[family-name:var(--font-data)] text-[11px] tabular-nums text-muted-foreground/70">
                      {cert.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
