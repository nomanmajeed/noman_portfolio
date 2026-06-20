'use client';

import dynamic from 'next/dynamic';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';

const PortfolioHero = dynamic(
  () => import('@/components/ui/portfolio-hero').then((mod) => mod.PortfolioHero),
  {
    ssr: false,
    loading: () => (
      <div id="home" className="min-h-[100dvh] bg-background" aria-label="Loading hero" />
    ),
  }
);

export function Header() {
  return (
    <PortfolioHero
      badge="Open to new opportunities"
      title="Build"
      titleEmphasis="AI-powered systems"
      titleSuffix="from idea to production"
      subtitle="Senior Software Engineer. Python, FastAPI, Django, AI/LLM. 6+ years shipping backend systems for 2M+ users."
      primaryCta={{ label: 'View My Work', href: profileData.connectUrl }}
      secondaryCta={{ label: 'Download CV', href: profileData.resumeUrl }}
      avatarUrl={
        getImgSrc(images.profileHero) ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
      avatarAlt={profileData.name}
    />
  );
}
