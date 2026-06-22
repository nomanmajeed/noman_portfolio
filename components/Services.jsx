'use client';

import { createElement, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, CloudCog, Globe, Server } from 'lucide-react';
import { servicesData } from '@/data';
import { ServiceTabs } from '@/components/ui/service-tabs';
import { SectionHeader } from './SectionHeader';

const iconMap = {
  saas: CloudCog,
  ai: Bot,
  web: Globe,
  backend: Server,
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const tabs = useMemo(
    () =>
      servicesData.tabs.map((tab) => ({
        ...tab,
        icon: createElement(iconMap[tab.icon] ?? Globe, {
          strokeWidth: 1.75,
        }),
      })),
    []
  );

  return (
    <section
      id="services"
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
              label="Services"
              title="What I can build for you"
              subtitle="SaaS platforms, AI automation, web applications, and production-grade APIs — delivered end-to-end with 6+ years of backend and full-stack experience."
              centered
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ServiceTabs tabs={tabs} />
        </motion.div>
      </div>
    </section>
  );
}
