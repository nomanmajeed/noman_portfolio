'use client';

import { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#skills' },
  { label: 'Projects', href: '#work' },
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

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-10 lg:px-24 ${
        scrolled
          ? 'border-b border-white/10 bg-black/70 py-3 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <a
        href="#home"
        className="z-10 font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight text-white"
      >
        N<span className="text-indigo-300">.</span>
      </a>

      <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-xl lg:block">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`relative block cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
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
        className="z-10 hidden cursor-pointer items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-indigo-100 lg:inline-flex"
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
        className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-xl text-white backdrop-blur-sm lg:hidden"
        onClick={() => setToggle(true)}
        aria-label="Open menu"
      >
        <HiMenuAlt4 />
      </button>

      <AnimatePresence>
        {toggle && (
          <>
            <motion.div
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggle(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[120] flex w-[min(380px,85vw)] flex-col border-l border-white/10 bg-zinc-950 p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                  N<span className="text-indigo-300">.</span>
                </span>
                <button
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
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
                    className="border-b border-white/10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="flex cursor-pointer items-center gap-4 py-5 text-lg font-medium text-white transition-colors hover:text-indigo-300"
                      onClick={() => setToggle(false)}
                    >
                      <span className="text-xs font-semibold tabular-nums text-zinc-500">
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
                  className="flex w-full cursor-pointer items-center justify-center rounded-full bg-white px-5 py-4 text-base font-medium text-black transition-colors hover:bg-indigo-100"
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
