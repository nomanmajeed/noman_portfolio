"use client";

import React from "react";
import { motion } from "motion/react";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

type TestimonialsColumnProps = {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
};

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }) => (
              <div
                key={`${name}-${index}`}
                className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-indigo-500/10 backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-zinc-300">{text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-5 tracking-tight text-white">
                      {name}
                    </span>
                    <span className="text-sm leading-5 tracking-tight text-zinc-500">
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
}
