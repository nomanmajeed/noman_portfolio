import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__left">
          <p>Built with React & SCSS</p>
        </div>
        
        <div className="footer__right">
          <p>© {new Date().getFullYear()} Noman Majeed. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;