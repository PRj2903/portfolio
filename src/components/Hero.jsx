import React from 'react';
import { ArrowUpRight, FileText, Sparkles, Terminal, Globe } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import prathamImg from '../assets/pratham.jpg';
import Magnetic from './Magnetic';
import './Hero.css';

const Hero = ({ onOpenResume }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <div className="studio-index-tag">
            <span className="studio-dot"></span>
            <span>PRATHAM JADWANI // 2026 PORTFOLIO</span>
          </div>

          <h1 className="hero-title">
            FLUTTER DEVELOPER &amp; <span className="highlight-text">CREATIVE DESIGNER.</span>
          </h1>

          <p className="hero-description">
            Computer Science Engineer building precision mobile applications (Flutter, 60fps) and bespoke, high-conversion web platforms like <em>Dada Design Studio</em>.
          </p>
          
          <div className="hero-cta-group">
            <Magnetic strength={10}>
              <a href="#featured" className="btn btn-primary cta-btn">
                <span>EXPLORE WORK</span>
                <ArrowUpRight size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={10}>
              <button
                onClick={onOpenResume}
                className="btn btn-outline cta-btn"
                title="Preview Verified Resume"
              >
                <FileText size={16} />
                <span>RESUME (PDF)</span>
              </button>
            </Magnetic>
            <Magnetic strength={10}>
              <a href="#contact" className="btn btn-gold cta-btn">
                <span>LET&apos;S TALK</span>
              </a>
            </Magnetic>
          </div>

          <div className="studio-meta-bar">
            <div className="studio-meta-col">
              <span className="meta-head">DISCIPLINES</span>
              <span className="meta-val">Mobile App &bull; Web Architecture</span>
            </div>
            <div className="studio-meta-col">
              <span className="meta-head">ACADEMICS</span>
              <span className="meta-val">B.Tech 7.58 &bull; Diploma 8.89</span>
            </div>
            <div className="studio-meta-col">
              <span className="meta-head">AVAILABILITY</span>
              <span className="meta-val text-available">● OPEN FOR ROLES</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in">
          <div className="studio-portrait-card">
            <div className="card-studio-header">
              <span className="studio-serial">ID #PRJ-2903</span>
              <span className="studio-badge-pill">SURAT, IN</span>
            </div>

            <div className="studio-img-container">
              <img src={prathamImg} alt="Pratham Jadwani" className="studio-img" />
              <div className="studio-stamp-badge">
                <span>ENGINEER</span>
              </div>
            </div>

            <div className="card-studio-bottom">
              <div className="studio-deliverable-box">
                <span className="box-label">LIVE DELIVERABLE</span>
                <a href="https://www.dadadesignstudio.in/" target="_blank" rel="noreferrer" className="box-title">
                  <span>Dada Design Studio</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="studio-social-row">
                <a href="https://github.com/PRj2903" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/pratham-jadwani-a5b19225a" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={18} />
                </a>
                <a href="https://wa.me/919722768555" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
