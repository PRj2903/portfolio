import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, MonitorPlay } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import prathamImg from '../assets/pratham.jpg';
import './Hero.css';

const Hero = () => {
  const words = ['Flutter Developer', 'Creative Web Designer', 'CS Engineer', 'UI/UX Creator'];
  const [wordIdx, setWordIdx] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIdx];
    
    const tick = () => {
      if (!isDeleting) {
        setSubText(currentWord.substring(0, subText.length + 1));
        if (subText.length + 1 === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        setSubText(currentWord.substring(0, subText.length - 1));
        if (subText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    };

    if (!timer) {
      timer = setTimeout(tick, 100);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, wordIdx]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="gradient-sphere sphere-primary"></div>
        <div className="gradient-sphere sphere-gold"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <p className="hero-greeting indigo-text">Hi, I am</p>
          <h1 className="hero-title">
            Pratham Jadwani
          </h1>
          <h2 className="hero-subtitle">
            <span className="text-typing">{subText}</span>
            <span className="typing-cursor">|</span>
          </h2>
          <p className="hero-description">
            Bridging the gap between high-performance mobile applications and premium, real-world client websites. I deliver production-ready, beautifully crafted digital experiences.
          </p>
          
          <div className="hero-cta-group">
            <a href="#featured" className="btn btn-primary cta-btn">
              View Projects <ArrowRight className="btn-icon" size={18} />
            </a>
            <a href="/resume.pdf" download="Pratham_Jadwani_Resume.pdf" className="btn btn-outline cta-btn" rel="noreferrer">
              Download Resume <Download className="btn-icon" size={18} />
            </a>
            <a href="#featured" className="btn btn-gold cta-btn">
              View Live Work <MonitorPlay className="btn-icon" size={18} />
            </a>
          </div>

          <div className="social-links-hero mt-4">
            <a href="https://github.com/PRj2903" target="_blank" rel="noreferrer" className="social-link"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/pratham-jadwani-a5b19225a" target="_blank" rel="noreferrer" className="social-link"><FaLinkedin size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link"><FaTwitter size={24} /></a>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in">
          <div className="glass-card portrait-card spotlight-card"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
          >
            {/* Mock IDE/Terminal */}
            <div className="mock-terminal-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="terminal-title">developer_profile.json</span>
            </div>
            <div className="mock-terminal-body">
              <pre>
                <code>
{`{
  "name": `}<span className="code-string">"Pratham Jadwani"</span>{`,
  "role": `}<span className="code-string">"Developer"</span>{`,
  "specialties": [
    `}<span className="code-string">"Flutter Mobile App"</span>{`,
    `}<span className="code-string">"Premium Web UI"</span>
  {`],
  "cgpa": `}<span className="code-number">8.89</span>{`,
  "status": `}<span className="code-string">"Active"</span>
{`}`}
                </code>
              </pre>
            </div>
            
            <div className="portrait-inner">
              <img src={prathamImg} alt="Pratham Jadwani" className="portrait-img" />
            </div>
            
            <div className="floating-badge badge-1 glass-panel">
              <span className="indigo-text">Flutter</span> Expert
            </div>
            <div className="floating-badge badge-2 glass-panel">
              <span className="gold-text">Web</span> Designer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
