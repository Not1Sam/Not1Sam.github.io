import React from 'react';
import '../styles/Landing.css'; // Inheriting footer styles

const Footer = () => {
  return (
    <footer className="footer-cta animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h2 className="cta-title brand-font">[ have a project<br/>in mind? ]</h2>
      <div className="cta-links">
          <a href="mailto:contact@not1sam.dev" className="cta-primary">[ let's talk ]</a>
          <a href="https://github.com/Not1Sam" target="_blank" rel="noreferrer" className="cta-secondary">[ browse github ]</a>
      </div>
      
      <div className="footer-bottom">
          <p className="brand-font" style={{ opacity: 0.5, letterSpacing: '2px' }}>[ not1sam ] © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
