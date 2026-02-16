'use client';

import { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { HiOutlineMoon } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import './Navbar.scss';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About me', href: '#about' },
  { label: 'Services', href: '#work' },
  { label: 'My work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="navbar">
      <a href="#home" className="navbar__logo">
        Noman<span className="navbar__logo-dot" aria-hidden />
      </a>
      <div className="navbar__links-wrap">
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={link.label === 'Home' ? 'active' : ''}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar__actions">
        <button className="navbar__theme-btn" aria-label="Toggle dark mode">
          <HiOutlineMoon />
        </button>
        <a href="#contact" className="navbar__connect-btn">
          Connect <HiOutlineArrowUpRight />
        </a>
      </div>

      <div className="navbar__menu">
        <button
          className="navbar__menu-trigger"
          onClick={() => setToggle(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt4 />
        </button>
        {toggle && (
          <motion.div
            className="navbar__menu-overlay"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="navbar__menu-close"
              onClick={() => setToggle(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setToggle(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
