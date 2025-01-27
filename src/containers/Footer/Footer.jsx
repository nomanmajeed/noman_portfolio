import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer app__flex">
      <div className="footer__content">
        <div className="footer__left">
          <p className="p-text">Built with React & SCSS</p>
        </div>
        
        <div className="footer__right">
          <p className="p-text">© {new Date().getFullYear()} Noman Majeed. All rights reserved.</p>
        </div>
      </div>
      <div className="copyright">
        <p className="p-text">@2023 NOMAN</p>
        <p className="p-text">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;