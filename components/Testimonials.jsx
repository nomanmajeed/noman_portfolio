'use client';

import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { images } from '@/constants/images';
import { testimonialsData } from '@/data';
import { getImgSrc } from '@/lib/imageUtils';
import './Testimonials.scss';

export function Testimonials() {
  const testimonials = testimonialsData.map((t, index) => ({
    ...t,
    order: index + 1,
  }));

  return (
    <div className="app__testimonials" id="testimonials">
      <div className="app__testimonials-heading">
        <h2>Voices of Collaboration</h2>
      </div>

      {testimonials.length > 0 && (
        <div className="app__testimonials-timeline">
          <div className="app__testimonials-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name + index}
                className="app__testimonial-item"
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="app__testimonial-marker">
                  {testimonial.order}
                </div>

                <div className="app__testimonial-content">
                  <p className="p-text">{testimonial.feedback}</p>
                </div>

                <div className="app__testimonial-profile">
                  {testimonial.imgurl && (
                    <img
                      src={getImgSrc(images[testimonial.imgurl])}
                      alt={testimonial.name}
                    />
                  )}
                  <div className="app__testimonial-name">
                    {testimonial.name}
                  </div>
                  <div className="app__testimonial-role">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {testimonials.length > 1 && (
        <div className="app__testimonials-controls">
          <button className="slider-btn prev" aria-label="Previous Testimonial">
            <HiChevronLeft />
          </button>
          <button className="slider-btn next" aria-label="Next Testimonial">
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
