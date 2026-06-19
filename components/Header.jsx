'use client';

import dynamic from 'next/dynamic';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';

const EtherealBeamsHero = dynamic(
  () => import('@/components/ui/ethereal-beams-hero').then((mod) => mod.EtherealBeamsHero),
  {
    ssr: false,
    loading: () => <div id="home" className="min-h-screen bg-black" aria-label="Loading hero" />,
  }
);

export function Header() {
  return (
    <EtherealBeamsHero
      badge="Available for freelance work"
      title={`Hi, I'm ${profileData.name.split(' ')[0]}`}
      titleHighlight="Frontend Developer & Designer"
      subtitle={profileData.tagline}
      bio={profileData.bio}
      primaryCta={{ label: 'View My Work', href: profileData.connectUrl }}
      secondaryCta={{ label: 'Download CV', href: profileData.resumeUrl }}
      avatarUrl={
        getImgSrc(images.profile) ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
      avatarAlt={profileData.name}
      stats={[
        { value: '3+', label: 'Years Experience' },
        { value: '10+', label: 'Projects' },
        { value: '5+', label: 'Happy Clients' },
      ]}
    />
  );
}
