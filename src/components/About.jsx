import React, { useState, useEffect } from 'react';
import './About.css';
import {
  Smartphone,
  Globe,
  GraduationCap,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Code2,
  Cpu,
  Layers,
  Palette,
  CheckCircle2
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';
import { triggerConfetti } from '../utils/confetti';
import { useToast } from './Toast';

const About = () => {
  const [timeString, setTimeString] = useState('');
  const { addToast } = useToast();

  // Dynamic live clock for IST (India)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const techBadges = [
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Dart', category: 'Language' },
    { name: 'React.js', category: 'Frontend' },
    { name: 'JavaScript (ES6+)', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Design' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'UI/UX Design', category: 'Design' },
    { name: 'Figma', category: 'Tool' },
    { name: 'Git / GitHub', category: 'Tool' },
    { name: 'MongoDB', category: 'Database' },
  ];

  const handleResumeDownload = () => {
    triggerConfetti();
    addToast({
      title: 'Resume Downloaded!',
      message: 'Pratham_Jadwani_Resume.pdf download started',
      type: 'sparkle',
    });
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">Behind The Code <Sparkles size={16} className="gold-text" /></p>
            <h2 className="section-title">About &amp; Overview</h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* Bento 1: Main Story Card (Large) */}
          <ScrollReveal delay={50} className="bento-col-span-2">
            <div
              className="bento-card bento-card-main glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="bento-header-badge">
                <span className="status-dot-pulse"></span>
                <span>Available for Freelance &amp; High-Impact Roles</span>
              </div>

              <h3 className="bento-main-title">
                Engineering <span className="gradient-text">high-performance mobile apps</span> &amp; luxury client websites.
              </h3>

              <p className="bento-main-desc">
                I am a Computer Science Engineer and Developer passionate about bridging engineering rigor with exceptional design. From Architecting robust cross-platform <strong>Flutter</strong> applications to delivering real-world production web platforms like <em>Dada Design Studio</em> and <em>Wings Design</em>, I build digital experiences that scale and mesmerize.
              </p>

              <div className="bento-main-actions">
                <Magnetic strength={15}>
                  <a
                    href="/resume.pdf"
                    download="Pratham_Jadwani_Resume.pdf"
                    onClick={handleResumeDownload}
                    className="btn btn-primary"
                  >
                    Download Resume <Download size={16} style={{ marginLeft: '8px' }} />
                  </a>
                </Magnetic>
                <Magnetic strength={15}>
                  <a href="#contact" className="btn btn-outline">
                    Let&apos;s Connect
                  </a>
                </Magnetic>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 2: Live Location & Time Card */}
          <ScrollReveal delay={120}>
            <div
              className="bento-card bento-card-location glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="bento-icon-tag indigo-text">
                <MapPin size={22} />
              </div>
              <span className="bento-label">Location &amp; Local Time</span>
              <h4 className="bento-location-title">Surat, Gujarat, India</h4>
              <p className="bento-geo-tag">21.1702° N, 72.8311° E</p>

              <div className="bento-clock-container">
                <Clock size={16} className="indigo-text" />
                <span className="bento-clock-time">{timeString || 'IST'}</span>
                <span className="bento-clock-zone">(UTC+5:30)</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 3: Academic Excellence */}
          <ScrollReveal delay={180}>
            <div
              className="bento-card bento-card-edu glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="bento-icon-tag gold-text">
                <GraduationCap size={22} />
              </div>
              <span className="bento-label">Academic Pedigree</span>

              <div className="edu-item">
                <div className="edu-badge">BTech Computer Science</div>
                <p className="edu-sub">CHARUSAT University</p>
              </div>

              <div className="edu-divider" />

              <div className="edu-item">
                <div className="edu-score-row">
                  <span className="edu-score gold-text">8.89</span>
                  <span className="edu-score-label">Diploma CGPA</span>
                </div>
                <p className="edu-sub">Top academic performance in CS foundation</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 4: Interactive Tech Stack Cloud */}
          <ScrollReveal delay={240} className="bento-col-span-2">
            <div
              className="bento-card bento-card-stack glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="bento-stack-header">
                <div className="bento-icon-tag indigo-text">
                  <Code2 size={22} />
                </div>
                <div>
                  <span className="bento-label">Interactive Toolkit</span>
                  <h4 className="bento-stack-title">Technologies &amp; Frameworks</h4>
                </div>
              </div>

              <div className="bento-tech-cloud">
                {techBadges.map((badge, idx) => (
                  <div key={idx} className="bento-tech-pill">
                    <span className="tech-pill-dot"></span>
                    <span className="tech-pill-name">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 5: Core Pillars / Strengths */}
          <ScrollReveal delay={300} className="bento-col-span-3">
            <div
              className="bento-card bento-card-pillars glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="pillars-grid">
                <div className="pillar-item">
                  <div className="pillar-icon indigo-text"><Smartphone size={20} /></div>
                  <h5>Flutter Mastery</h5>
                  <p>Cross-platform apps with 60fps animations and clean architecture.</p>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon gold-text"><Palette size={20} /></div>
                  <h5>Luxury Web UI</h5>
                  <p>Bespoke typography, smooth scrolling, and immersive micro-interactions.</p>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon indigo-text"><Cpu size={20} /></div>
                  <h5>Engineering Rigor</h5>
                  <p>State management, secure REST endpoints, and optimized performance.</p>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon gold-text"><CheckCircle2 size={20} /></div>
                  <h5>Client Ready</h5>
                  <p>Delivering on-time, production-deployed solutions with real business value.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
