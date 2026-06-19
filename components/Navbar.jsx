'use client';

import { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#skills' },
  { label: 'Projects', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onHero = !scrolled;

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-10 lg:px-24 ${
        onHero
          ? 'bg-transparent'
          : 'border-b border-zinc-200/60 bg-zinc-50/80 py-3 backdrop-blur-xl'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <a
        href="#home"
        className={`z-10 font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight ${
          onHero ? 'text-white' : 'text-zinc-950'
        }`}
      >
        N<span className={onHero ? 'text-indigo-300' : 'text-indigo-500'}>.</span>
      </a>

      <div
        className={`absolute left-1/2 hidden -translate-x-1/2 rounded-full px-2 py-1 backdrop-blur-xl lg:block ${
          onHero
            ? 'border border-white/10 bg-white/5'
            : 'border border-zinc-200/60 bg-white/75 shadow-sm'
        }`}
      >
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    onHero
                      ? isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                      : isActive
                        ? 'text-zinc-950'
                        : 'text-zinc-500 hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className={`absolute inset-0 -z-10 rounded-full ${
                        onHero ? 'bg-white/10' : 'bg-zinc-100'
                      }`}
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <a
        href="#contact"
        className={`z-10 hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all lg:inline-flex ${
          onHero
            ? 'bg-white text-zinc-950 hover:-translate-y-0.5 hover:bg-indigo-100'
            : 'bg-zinc-950 text-white hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
        }`}
      >
        Let&apos;s Talk
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 13L13 1M13 1H3M13 1V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <button
        className={`z-10 flex h-10 w-10 items-center justify-center rounded-xl text-xl lg:hidden ${
          onHero ? 'bg-white/10 text-white backdrop-blur-sm' : 'bg-zinc-950 text-white'
        }`}
        onClick={() => setToggle(true)}
        aria-label="Open menu"
      >
        <HiMenuAlt4 />
      </button>

      <AnimatePresence>
        {toggle && (
          <>
            <motion.div
              className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggle(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[120] flex w-[min(380px,85vw)] flex-col bg-zinc-50 p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-zinc-950">
                  N<span className="text-indigo-500">.</span>
                </span>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xl transition-colors hover:bg-zinc-200"
                  onClick={() => setToggle(false)}
                  aria-label="Close menu"
                >
                  <HiX />
                </button>
              </div>
              <ul className="flex-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    className="border-b border-zinc-200"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-4 py-5 text-lg font-medium text-zinc-950 transition-colors hover:text-indigo-500"
                      onClick={() => setToggle(false)}
                    >
                      <span className="text-xs font-semibold tabular-nums text-zinc-400">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-6">
                <a
                  href="#contact"
                  className="flex w-full items-center justify-center rounded-full bg-zinc-950 px-5 py-4 text-base font-medium text-white transition-colors hover:bg-indigo-500"
                  onClick={() => setToggle(false)}
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
