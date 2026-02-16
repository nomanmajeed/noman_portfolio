'use client';

import { motion } from 'framer-motion';
import { AppWrap } from './AppWrap';
import { MotionWrap } from './MotionWrap';
import { images } from '@/constants/images';
import { aboutsData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import './About.scss';

function AboutContent() {
  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      {aboutsData.length > 0 && (
        <div className="app__profiles">
          {aboutsData.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={about.title + index}
            >
              <img src={getImgSrc(images[about.imgUrl])} alt={about.title} />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {about.title}
              </h2>
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

export const About = AppWrap(MotionWrap(AboutContent, 'app__about'), 'about', 'app__whitebg');
