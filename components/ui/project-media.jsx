'use client';

import { useEffect, useMemo, useState } from 'react';
import { images } from '@/constants/images';
import { getImgSrc } from '@/lib/imageUtils';
import { ProjectPreviewPlaceholder } from './project-preview-placeholder';

export function resolveProjectImageSrc(work) {
  if (work.previewImage) return work.previewImage;
  if (work.images?.length) return work.images[0];
  if (work.imgUrl) return getImgSrc(images[work.imgUrl]);
  if (work.company?.logo) return work.company.logo;
  return null;
}

export function resolveProjectGallery(work) {
  const rest = (work.images ?? []).filter((img) => img !== work.previewImage);
  const gallery = work.previewImage ? [work.previewImage, ...rest] : rest;
  if (gallery.length) return gallery;
  if (work.imgUrl) return [getImgSrc(images[work.imgUrl])];
  if (work.company?.logo) return [work.company.logo];
  return [];
}

function isCompanyLogoFallback(work) {
  return !work.previewImage && !work.images?.length && !work.imgUrl && Boolean(work.company?.logo);
}

function useImageLoadStatus(src) {
  const [status, setStatus] = useState(() => (src ? 'loading' : 'error'));

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    let cancelled = false;
    const probe = new window.Image();

    probe.onload = () => {
      if (!cancelled) setStatus('loaded');
    };
    probe.onerror = () => {
      if (!cancelled) setStatus('error');
    };
    probe.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return status;
}

function PreviewLoadingState() {
  return <div className="h-full w-full animate-pulse bg-foreground/5" aria-hidden />;
}

export function ProjectMedia({ work, imgClassName, placeholderCompact = false }) {
  const src = useMemo(() => resolveProjectImageSrc(work), [work]);
  const status = useImageLoadStatus(src);
  const showCompanyLogo = isCompanyLogoFallback(work);

  if (!src || status === 'error') {
    return <ProjectPreviewPlaceholder title={work.title} compact={placeholderCompact} />;
  }

  if (status === 'loading') {
    return <PreviewLoadingState />;
  }

  if (showCompanyLogo) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/15 via-foreground/5 to-brand/5">
        <img
          src={src}
          alt={work.company.name}
          className="h-20 w-20 rounded-2xl border border-border bg-white object-contain p-3 shadow-lg"
        />
      </div>
    );
  }

  return <img src={src} alt={work.title} className={imgClassName} />;
}

export function ProjectGalleryImage({ src, alt, className }) {
  const status = useImageLoadStatus(src);

  if (!src || status === 'error') {
    return <ProjectPreviewPlaceholder title={alt} />;
  }

  if (status === 'loading') {
    return <PreviewLoadingState />;
  }

  return <img src={src} alt={alt} className={className} />;
}
