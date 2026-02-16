'use client';

import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import './Header.scss';

export function Header() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" />
      <div className="hero__content">
        <motion.div
          className="hero__profile-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={getImgSrc(images.profile)}
            alt={profileData.name}
            className="hero__profile-img"
          />
        </motion.div>
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Hi! I&apos;m <span className="hero__greeting-name">{profileData.name}</span> 👋
        </motion.p>
        <motion.h1
          className="hero__headline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {profileData.tagline}
        </motion.h1>
        <motion.p
          className="hero__bio"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {profileData.bio}
        </motion.p>
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <a href={profileData.connectUrl} className="hero__btn hero__btn--primary">
            connect with me <HiOutlineArrowRight />
          </a>
          <a href={profileData.resumeUrl} className="hero__btn hero__btn--secondary">
            my resume <HiOutlineArrowDown />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
