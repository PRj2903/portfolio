import React from 'react';
import './About.css';
import { Smartphone, Monitor, Layout, PenTool } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const highlights = [
    { title: 'Flutter App Dev', icon: <Smartphone />, desc: 'Building seamless cross-platform mobile apps.' },
    { title: 'Real-world Webbings', icon: <Monitor />, desc: 'Delivering production-ready client websites with premium UI/UX.' },
    { title: 'UI/UX Design', icon: <PenTool />, desc: 'Crafting pixel-perfect, engaging digital aesthetics.' },
    { title: 'Responsive Layouts', icon: <Layout />, desc: 'Ensuring flawlessly rendered experiences on all devices.' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">Behind The Code</p>
            <h2 className="section-title">About Me</h2>
          </div>
        </ScrollReveal>

        <div className="about-content">
          <ScrollReveal delay={100} variant="fade-right" className="about-text-container">
            <p className="about-text">
              I am a meticulous Computer Science student and Developer driven by the challenge of transforming complex problems into elegant, real-world solutions. With a robust background in both engineering logic and creative design, I specialize in crafting digital experiences that perform flawlessly and look exceptional.
            </p>
            <p className="about-text">
              My expertise spans <strong>Flutter App Development</strong>, creating seamless cross-platform applications, to engineering <strong>Real-world Client Websites</strong> characterized by high-end typography, glassmorphism, and dynamic animations. I hold a BTech in Computer Science from CHARUSAT, continuing my strong academic run from my Diploma, where I achieved an 8.89 CGPA.
            </p>
            <div className="stats-container">
              <div 
                className="stat-item glass-panel spotlight-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <h3 className="stat-number indigo-text">BTech</h3>
                <p className="stat-label">Computer Science<br/>(CHARUSAT)</p>
              </div>
              <div 
                className="stat-item glass-panel spotlight-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <h3 className="stat-number indigo-text">8.89</h3>
                <p className="stat-label">Diploma CGPA</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="skills-container wrapper">
            {highlights.map((item, index) => (
              <ScrollReveal delay={150 + index * 50} variant="fade-left" key={index}>
                <div 
                  className="skill-card glass-panel spotlight-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div className="skill-icon indigo-text">{item.icon}</div>
                  <h4 className="skill-title">{item.title}</h4>
                  <p className="skill-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
