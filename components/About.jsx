'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import { images } from '@/constants/images';
import { profileData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import './About.scss';

const tools = [
  { key: 'react', label: 'React' },
  { key: 'node', label: 'Node.js' },
  { key: 'graphql', label: 'GraphQL' },
  { key: 'figma', label: 'Figma' },
  { key: 'javascript', label: 'JavaScript' },
];

function AboutContent() {
  return (
    <section id="about" className="about-section">
      <p className="about__subheading">Introduction</p>
      <h2 className="about__title">About me</h2>
      <div className="about__content">
        <motion.img
          src={getImgSrc(images.profile)}
          alt={profileData.name}
          className="about__profile-img"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />
        <motion.p
          className="about__description"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          I am an experienced Frontend Developer with professional expertise in the field.
          Throughout my career, I have had the privilege of collaborating with organizations,
          contributing to their success and growth.
        </motion.p>
      </div>
      <div className="about__cards">
        <motion.div
          className="about__card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HiCode className="about__card-icon" />
          <h3 className="about__card-title">Languages</h3>
          {profileData.languages.map((line, i) => (
            <p key={i} className="about__card-text">
              {line}
            </p>
          ))}
        </motion.div>
        <motion.div
          className="about__card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HiAcademicCap className="about__card-icon" />
          <h3 className="about__card-title">Education</h3>
          <p className="about__card-text">{profileData.education}</p>
        </motion.div>
        <motion.div
          className="about__card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HiBriefcase className="about__card-icon" />
          <h3 className="about__card-title">Projects</h3>
          <p className="about__card-text">{profileData.projectsCount}</p>
        </motion.div>
      </div>
      <h3 className="about__tools-title">Tools i use</h3>
      <div className="about__tools">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.key}
            className="about__tool-icon"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img src={getImgSrc(images[tool.key])} alt={tool.label} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <div id="about" className="app__container app__whitebg">
      <div className="app__wrapper app__flex" style={{ padding: 0 }}>
        <AboutContent />
      </div>
    </div>
  );
}
