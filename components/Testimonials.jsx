'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { testimonialsData } from '@/data';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';
import { SectionHeader } from './SectionHeader';

export function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const testimonials = testimonialsData;
  if (!testimonials.length) return null;

  const columnSize = Math.ceil(testimonials.length / 3);
  const firstColumn = testimonials.slice(0, columnSize);
  const secondColumn = testimonials.slice(columnSize, columnSize * 2);
  const thirdColumn = testimonials.slice(columnSize * 2);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <SectionHeader
            label="Testimonials"
            title="What People Say"
            subtitle="See what clients and collaborators have to say about working together."
            centered
          />
        </motion.div>

        <div className="mx-auto flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          {secondColumn.length > 0 && (
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
          )}
          {thirdColumn.length > 0 && (
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          )}
        </div>
      </div>
    </section>
  );
}
