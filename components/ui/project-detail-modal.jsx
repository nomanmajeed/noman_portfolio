'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AiFillGithub } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { images } from '@/constants/images';
import { getImgSrc } from '@/lib/imageUtils';
import { techStack } from '@/lib/tech-stack';
import { TechIconCircle } from './tech-icon-circle';

function resolveGallery(work) {
  if (work.images?.length) return work.images;
  if (work.imgUrl) return [getImgSrc(images[work.imgUrl])];
  if (work.company?.logo) return [work.company.logo];
  return [];
}

export function ProjectDetailModal({ work, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = work ? resolveGallery(work) : [];

  useEffect(() => {
    setActiveImage(0);
  }, [work]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [work, gallery.length, onClose]);

  const stackItems = (work?.stack ?? [])
    .map((id) => techStack.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex max-h-[44rem] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl md:h-[40rem] md:flex-row"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-64 w-full shrink-0 overflow-hidden bg-foreground/5 md:h-full md:w-1/2">
              {gallery.length > 0 && (
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={work.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full object-cover"
                />
              )}

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        aria-label={`Show image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeImage ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2 md:p-8">
              {work.company && (
                <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
                  <Building2 className="h-3 w-3" />
                  Built at {work.company.name}
                </div>
              )}

              <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground md:text-3xl">
                {work.title}
              </h2>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {work.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand/20 px-2.5 py-0.5 text-xs font-semibold text-brand"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{work.description}</p>

              {work.highlights?.length > 0 && (
                <ul className="mb-6 space-y-2">
                  {work.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {stackItems.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2.5">
                  {stackItems.map((item) => (
                    <TechIconCircle key={item.id} item={item} size="sm" />
                  ))}
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
