'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { SectionHeader } from './SectionHeader';

const socials = [
  { icon: AiFillGithub, href: 'https://github.com/nomanmajeed', label: 'GitHub' },
  { icon: AiFillLinkedin, href: 'https://linkedin.com/in/nomanmajeed', label: 'LinkedIn' },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:px-10 md:py-24 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-24 -top-48 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="mb-12 grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              label="Get In Touch"
              title="Let's work together"
              subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
              dark
            />

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="mailto:hello@nomanmajeed.com"
                className="flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <HiOutlineMail className="shrink-0 text-lg text-indigo-300" />
                hello@nomanmajeed.com
              </a>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <HiOutlineLocationMarker className="shrink-0 text-lg text-indigo-300" />
                Pakistan
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-zinc-300 transition-colors hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="min-h-[100px] resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>
            <motion.button
              type="submit"
              className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-indigo-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L8 3M13 8L8 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.form>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Noman Majeed. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500">Built with Next.js &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
