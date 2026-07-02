import React, { useState } from 'react';
import './FeaturedProjects.css';
import { ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FeaturedProjects = () => {
  const featured = [
    {
      id: 2,
      title: 'Dada Design Studio',
      category: 'Architecture Website',
      desc: 'A professional architecture portfolio tailored for Dada Design Studio. It features a clean, white and indigo layout with a minimalist project showcase emphasizing structural aesthetics.',
      tech: ['React', 'CSS Modules', 'GSAP Animations'],
      image: '/projects/dada-actual.png',
      link: 'https://www.dadadesignstudio.in/'
    },
    {
      id: 1,
      title: 'Wings Design',
      category: 'Interior Design Website',
      desc: 'An elegant, luxury-themed interior design website focusing on modern UI, sophisticated branding, and seamless user interaction animations to elevate the client digital presence.',
      tech: ['React', 'Vite', 'Framer Motion', 'Modern UI'],
      image: '/projects/wings-actual.png',
      link: 'https://www.thewingsinteriordesign.live/'
    }
  ];

  // Track hover rotation states per project ID
  const [rotations, setRotations] = useState({});

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    // Calculate rotation degree (max 8deg)
    const rotX = (dy / yc) * -8;
    const rotY = (dx / xc) * 8;
    
    setRotations((prev) => ({
      ...prev,
      [id]: { x: rotX, y: rotY }
    }));

    // Spotlight cursor custom variables
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (id) => {
    setRotations((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 }
    }));
  };

  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">Client Work <span className="gold-text">⭐</span></p>
            <h2 className="section-title">Featured Live Projects</h2>
          </div>
        </ScrollReveal>

        <div className="featured-grid">
          {featured.map((project, index) => {
            const rot = rotations[project.id] || { x: 0, y: 0 };
            return (
              <ScrollReveal delay={index * 120} variant={index % 2 === 0 ? 'fade-right' : 'fade-left'} key={project.id}>
                <div 
                  className="featured-card glass-panel spotlight-card"
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  style={{
                    transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.01, 1.01, 1.01)`,
                    transition: 'transform 0.15s ease-out, border-color 0.4s ease'
                  }}
                >
                  <div className="featured-image-container">
                    <div 
                      className="featured-image" 
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                    <div className="featured-overlay">
                      <a href={project.link} className="btn btn-gold btn-view-live">
                        View Live <ExternalLink size={18} style={{marginLeft: '8px'}} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="featured-info">
                    <p className="featured-category indigo-text">{project.category}</p>
                    <h3 className="featured-title">{project.title}</h3>
                    <p className="featured-desc">{project.desc}</p>
                    
                    <div className="featured-tech">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="tech-badge" style={{ transitionDelay: `${idx * 50}ms` }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
