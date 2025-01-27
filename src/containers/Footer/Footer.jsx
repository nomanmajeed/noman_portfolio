import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer app__flex">
      <div className="footer__content">
        <div className="footer__text">
          <p> {new Date().getFullYear()} Noman Majeed</p>
          <p>Built with React & Passion</p>
        </div>
        <div className="footer__socials">
          <a
            href="https://github.com/nomanmajeed"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nomanmajeed"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
