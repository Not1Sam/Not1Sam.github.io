import React from 'react';
import '../styles/Landing.css'; // Inheriting footer styles

const Footer = () => {
  return (
    <footer className="footer-cta animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h2 className="cta-title brand-font">[ have a project in mind? ]</h2>
      <div className="cta-links">
          <a href="https://linktr.ee/not1sam" className="cta-primary">Let's talk →</a>
          <a href="https://github.com/Not1Sam" target="_blank" rel="noreferrer" className="cta-secondary">Browse GitHub →</a>
      </div>
      
      <div className="footer-bottom">
          <p className="brand-font" style={{ opacity: 0.5, letterSpacing: '2px' }}>[ Houssam Belkassaoui ] © {new Date().getFullYear()}</p>
          <p className="brand-font" style={{ opacity: 0.7, letterSpacing: '2px' }}>Version {__APP_VERSION__}</p>

      </div>
    </footer>
  );
};

export default Footer;
