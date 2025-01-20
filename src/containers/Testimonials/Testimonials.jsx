import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { client, urlFor } from "../../client";
import "./Testimonials.scss";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';

    client
      .fetch(query)
      .then((data) => {
        console.log("Fetched Testimonials:", data);
        setTestimonials(data.map((t, index) => ({ ...t, order: index + 1 })));
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getTestimonialClass = (index) => {
    if (index === currentIndex) return "app__testimonial-item active";
    return "app__testimonial-item";
  };

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
                key={testimonial._id}
                className={getTestimonialClass(index)}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="app__testimonial-marker">
                  {testimonial.order}
                </div>

                <div className="app__testimonial-content">
                  <p className="p-text">{testimonial.feedback}</p>
                </div>

                <div className="app__testimonial-profile">
                  <img
                    src={testimonial.imgurl && urlFor(testimonial.imgurl)}
                    alt={testimonial.name}
                  />
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
          <button
            className="slider-btn prev"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
          >
            <HiChevronLeft />
          </button>
          <button
            className="slider-btn next"
            onClick={handleNext}
            aria-label="Next Testimonial"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
