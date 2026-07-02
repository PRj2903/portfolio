import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="logo">
              PRATHAM<span className="indigo-text">.</span>
            </a>
            <p className="footer-bio">
              Flutter Developer & Creative Web Designer. Delivering production-ready apps and premium websites.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-links">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#projects" className="footer-link">Projects</a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-heading">Social</h4>
            <div className="footer-links">
              <a href="https://github.com/PRj2903" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href="https://www.linkedin.com/in/pratham-jadwani-a5b19225a" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Pratham Jadwani. All rights reserved.
          </p>
          
          <button className="scroll-top-btn" onClick={scrollToTop}>
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
