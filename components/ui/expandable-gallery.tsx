'use client';

import { useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectPreviewPlaceholder } from '@/components/ui/project-preview-placeholder';
import { resolveProjectImageSrc } from '@/components/ui/project-media';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

const STACK_LAYOUT = [
  { rotation: -15, x: -90, y: 10, zIndex: 10 },
  { rotation: -3, x: -10, y: -15, zIndex: 20 },
  { rotation: 12, x: 75, y: 5, zIndex: 30 },
] as const;

const transition = {
  type: 'spring',
  stiffness: 160,
  damping: 18,
  mass: 1,
} as const;

export type GalleryWork = {
  slug?: string;
  title: string;
  description?: string;
  previewImage?: string;
  images?: string[];
  imgUrl?: string;
  company?: { logo?: string; name?: string };
  tags?: string[];
  featured?: boolean;
};

type GalleryItem = GalleryWork & {
  id: string;
  src: string | null;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
};

export type ExpandableGalleryProps = {
  works: GalleryWork[];
  /** Full-width content shown above the grid when expanded (e.g. featured spotlight cards). */
  expandedSlot?: React.ReactNode;
  heading?: React.ReactNode;
  expandLabel?: string;
  expandedCount?: number;
  onSelectWork?: (work: GalleryWork) => void;
  onExpandedChange?: (expanded: boolean) => void;
};

function GalleryImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return <ProjectPreviewPlaceholder title={alt} compact />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover select-none pointer-events-none"
      sizes="(max-width: 1024px) 50vw, 33vw"
    />
  );
}

function toGalleryItems(works: GalleryWork[], withStackLayout = true): GalleryItem[] {
  return works.map((work, index) => {
    const layout = withStackLayout ? STACK_LAYOUT[index] : undefined;
    return {
      ...work,
      id: work.slug ?? work.title,
      src: resolveProjectImageSrc(work),
      rotation: layout?.rotation,
      x: layout?.x,
      y: layout?.y,
      zIndex: layout?.zIndex,
    };
  });
}

export function ExpandableGallery({
  works,
  expandedSlot,
  heading,
  expandLabel = 'View all projects',
  expandedCount,
  onSelectWork,
  onExpandedChange,
}: ExpandableGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const stackItems = useMemo(() => toGalleryItems(works), [works]);
  const gridItems = useMemo(() => toGalleryItems(works, false), [works]);
  const displayItems = isExpanded ? gridItems : stackItems;
  const totalCount = expandedCount ?? works.length;
  const canExpand = Boolean(expandedSlot) || works.length > 3;

  const setExpanded = (value: boolean) => {
    setIsExpanded(value);
    onExpandedChange?.(value);
  };

  useOutsideClick(containerRef, () => {
    if (isExpanded) {
      setExpanded(false);
    }
  });

  if (!works.length && !expandedSlot) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No projects match these filters.
      </p>
    );
  }

  const handleCardClick = (item: GalleryItem) => {
    if (isExpanded) {
      onSelectWork?.(item);
      return;
    }
    setExpanded(true);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <div className="mb-2 flex h-12 w-full items-center justify-between px-1">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setExpanded(false)}
                  className="group z-50 flex items-center gap-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <div className="rounded-full bg-muted p-2 text-foreground transition-colors group-hover:bg-accent">
                    <ArrowLeft className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Go back</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={cn(
              'relative w-full',
              isExpanded
                ? 'grid grid-cols-2 gap-4 px-1 md:gap-6 lg:grid-cols-3'
                : 'flex flex-col items-center justify-start pt-2'
            )}
            transition={transition}
          >
            {isExpanded && expandedSlot ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-full mb-4 w-full space-y-6 md:mb-8"
              >
                {expandedSlot}
              </motion.div>
            ) : null}

            {isExpanded && expandedSlot && works.length > 0 ? (
              <div className="col-span-full mb-6 flex items-center gap-3 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60">
                <span className="h-px flex-1 bg-border" />
                More Projects
                <span className="h-px flex-1 bg-border" />
              </div>
            ) : null}

            <div
              className={cn(
                'relative',
                isExpanded
                  ? 'contents'
                  : stackItems.length > 0
                    ? 'mb-8 flex h-[450px] w-full items-center justify-center'
                    : 'mb-4'
              )}
            >
              {displayItems.map((item, index) => {
                const isPrimary = index < 3;
                if (!isExpanded && !isPrimary) return null;

                return (
                  <motion.div
                    key={`card-${item.id}`}
                    layoutId={isExpanded || isPrimary ? `card-container-${item.id}` : undefined}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: !isExpanded ? item.rotation || 0 : 0,
                      x: !isExpanded ? item.x || 0 : 0,
                      y: !isExpanded ? item.y || 0 : 0,
                      zIndex: !isExpanded ? item.zIndex || index : 10,
                    }}
                    transition={transition}
                    whileHover={
                      !isExpanded
                        ? {
                            scale: 1.05,
                            y: (item.y || 0) - 15,
                            rotate: (item.rotation || 0) * 0.8,
                            zIndex: 50,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                        : { scale: 1.02 }
                    }
                    className={cn(
                      'cursor-pointer overflow-hidden bg-muted',
                      isExpanded
                        ? 'relative aspect-square rounded-[2rem] border-4 border-background shadow-lg md:rounded-[2.5rem] md:border-[6px]'
                        : 'absolute h-44 w-44 rounded-[2.5rem] border-[6px] border-background shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:h-60 md:w-60'
                    )}
                    onClick={() => handleCardClick(item)}
                  >
                    <motion.div
                      layoutId={isExpanded || isPrimary ? `image-inner-${item.id}` : undefined}
                      layout="position"
                      className="relative h-full w-full"
                      transition={transition}
                    >
                      <GalleryImage src={item.src} alt={item.title} />
                      {isExpanded && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 pt-10">
                          <p className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-white md:text-base">
                            {item.title}
                          </p>
                          {item.tags?.length ? (
                            <p className="mt-1 text-xs text-white/75">
                              {item.tags.slice(0, 2).join(' · ')}
                            </p>
                          ) : null}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-2xl space-y-8 text-center"
                >
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-normal leading-tight tracking-tight text-foreground/90 md:text-4xl">
                    {heading ?? (
                      <>
                        Production systems and personal builds —{' '}
                        <span className="italic text-brand">shipped end to end.</span>
                      </>
                    )}
                  </h2>

                  {canExpand && (
                    <div className="flex justify-center">
                      <Button
                        variant="default"
                        onClick={() => setExpanded(true)}
                        className="group cursor-pointer rounded-full border-border/40 px-8 py-6 font-normal"
                      >
                        {expandLabel}
                        <span className="ml-1 font-[family-name:var(--font-data)] text-xs text-primary-foreground/80">
                          ({totalCount})
                        </span>
                        <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
}

export default ExpandableGallery;
