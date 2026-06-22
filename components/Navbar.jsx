'use client';

import { useEffect, useState } from 'react';
import { HiMenuAlt4, HiOutlineMoon, HiOutlineSun, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#work' },
];

function ThemeToggle({ className = '' }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={className} aria-hidden />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-foreground/5 text-lg text-foreground transition-colors hover:bg-foreground/10 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
}

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
          ? 'border-b border-border bg-background/70 py-3 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <a
        href="#home"
        className="z-10 font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight text-foreground"
      >
        N<span className="text-brand">.</span>
      </a>

      <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-foreground/5 px-2 py-1 backdrop-blur-xl lg:block">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`relative block cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
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

      <div className="z-10 hidden items-center gap-3 lg:flex">
        <ThemeToggle />
        <a
          href="#contact"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:opacity-90"
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
      </div>

      <div className="z-10 flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <button
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-foreground/10 text-xl text-foreground backdrop-blur-sm"
          onClick={() => setToggle(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt4 />
        </button>
      </div>

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
              className="fixed inset-y-0 right-0 z-[120] flex w-[min(380px,85vw)] flex-col border-l border-border bg-background p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                  N<span className="text-brand">.</span>
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-foreground/10 text-xl text-foreground transition-colors hover:bg-foreground/20"
                    onClick={() => setToggle(false)}
                    aria-label="Close menu"
                  >
                    <HiX />
                  </button>
                </div>
              </div>
              <ul className="flex-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    className="border-b border-border"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="flex cursor-pointer items-center gap-4 py-5 text-lg font-medium text-foreground transition-colors hover:text-brand"
                      onClick={() => setToggle(false)}
                    >
                      <span className="text-xs font-semibold tabular-nums text-muted-foreground/70">
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
                  className="flex w-full cursor-pointer items-center justify-center rounded-full bg-foreground px-5 py-4 text-base font-medium text-background transition-colors hover:opacity-90"
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
