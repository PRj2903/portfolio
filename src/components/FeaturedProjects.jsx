import React from 'react';
import './FeaturedProjects.css';
import { ExternalLink, ArrowUpRight, CheckCircle2, Globe, Layers, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FeaturedProjects = () => {
  const featured = [
    {
      id: 'dada-design',
      index: '01',
      title: 'DADA DESIGN STUDIO',
      clientType: 'Architecture & Spatial Design Practice',
      tagline: 'A bespoke digital monograph reflecting minimalist structural aesthetics.',
      desc: 'Architected and engineered a comprehensive, production-deployed portfolio for Dada Design Studio. Emphasizes structural minimalism, architectural grid hierarchy, and fluid transitions tailored for high-end clientele.',
      highlights: [
        'Curated spatial project galleries with responsive grid transitions',
        'Refined monochromatic typography tailored for design discerning clientele',
        'Blazing fast performance with custom CSS layout engineering'
      ],
      tech: ['REACT.JS', 'CSS MODULES', 'GSAP MOTION', 'RESPONSIVE UI'],
      image: '/projects/dada-actual.png',
      link: 'https://www.dadadesignstudio.in/'
    }
  ];

  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              <span>CASE STUDIES // 01</span>
            </p>
            <h2 className="section-title">FEATURED CLIENT WORK</h2>
          </div>
        </ScrollReveal>

        <div className="studio-showcase-grid">
          {featured.map((project) => (
            <ScrollReveal delay={100} key={project.id}>
              <div className="studio-case-card glass-panel">
                <div className="case-card-header">
                  <div className="case-index-pill">
                    <span>PROJECT {project.index}</span>
                  </div>
                  <div className="case-status-stamp">
                    <span>● PRODUCTION DEPLOYED</span>
                  </div>
                </div>

                <div className="studio-case-content">
                  {/* Left Specs */}
                  <div className="case-specs-col">
                    <h3 className="case-project-title">{project.title}</h3>
                    <p className="case-client-subtitle">{project.clientType}</p>
                    <p className="case-project-desc">{project.desc}</p>

                    <div className="case-specs-points">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="spec-point">
                          <span className="spec-arrow">→</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="case-tech-badges">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="studio-tech-badge">{t}</span>
                      ))}
                    </div>

                    <div className="case-footer-actions">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-primary case-visit-btn"
                      >
                        <span>VISIT LIVE CLIENT WORK</span>
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>

                  {/* Right Media Frame */}
                  <div className="case-media-frame">
                    <div className="media-browser-bar">
                      <div className="media-dots">
                        <span className="media-dot" />
                        <span className="media-dot" />
                        <span className="media-dot" />
                      </div>
                      <span className="media-url">dadadesignstudio.in</span>
                    </div>
                    <div className="media-image-holder">
                      <img src={project.image} alt={project.title} className="media-preview-img" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
