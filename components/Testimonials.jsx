'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { images } from '@/constants/images';
import { testimonialsData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import { SectionHeader } from './SectionHeader';

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const testimonials = testimonialsData;
  if (!testimonials.length) return null;

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const item = testimonials[current];

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-16 md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader label="Testimonials" title="What People Say" centered />
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="relative z-[1] mb-[-2rem] font-[family-name:var(--font-playfair)] text-8xl leading-none text-indigo-500/20">
            &ldquo;
          </div>

          <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[250px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute w-full"
              >
                <p className="mx-auto mb-8 max-w-xl text-lg italic leading-relaxed text-zinc-400 md:text-xl">
                  {item.feedback}
                </p>
                <div className="flex items-center justify-center gap-4">
                  {item.imgurl && (
                    <img
                      src={getImgSrc(images[item.imgurl])}
                      alt={item.name}
                      className="h-12 w-12 rounded-full border-2 border-indigo-500/30 object-cover"
                    />
                  )}
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-white">{item.name}</h4>
                    <p className="text-sm text-zinc-500">{item.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition-all hover:scale-105 hover:border-white hover:bg-white hover:text-black"
              onClick={() => navigate(-1)}
              aria-label="Previous"
            >
              <HiChevronLeft />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-indigo-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition-all hover:scale-105 hover:border-white hover:bg-white hover:text-black"
              onClick={() => navigate(1)}
              aria-label="Next"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
