import React, { useState } from 'react';
import './Projects.css';
import { PlayCircle, Smartphone, HelpCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const appProjects = [
    {
      id: 1,
      title: 'StudyMate',
      desc: 'A comprehensive educational companion app streamlining study schedules, resources, and progress tracking for students.',
      tech: ['Flutter', 'Spring Boot', 'REST API'],
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Ptunes Music Player',
      desc: 'An aesthetically pleasing, feature-rich music player application with dynamic theming and background play capabilities.',
      tech: ['Flutter', 'Audio Service', 'Hive Database'],
      github: '#',
      demo: null
    },
    {
      id: 3,
      title: 'Flashcard Learning App',
      desc: 'An interactive flashcard application leveraging spaced repetition algorithms and cloud-synced user progression.',
      tech: ['Flutter', 'Firebase', 'Cloud Firestore'],
      github: '#',
      demo: '#'
    },
    {
      id: 'dev',
      isPlaceholder: true,
      title: 'More Projects Under Development',
      desc: 'More premium Android & Flutter applications are in active design and code development stages. Check back soon!',
      tech: ['Android SDK', 'Flutter', 'Kotlin', 'Material 3']
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
    <section id="projects" className="projects-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">App Development</p>
            <h2 className="section-title">Mobile Projects</h2>
          </div>
        </ScrollReveal>

        <div className="app-grid">
          {appProjects.map((project, index) => {
            const rot = rotations[project.id] || { x: 0, y: 0 };
            return (
              <ScrollReveal delay={index * 80} variant="zoom-in" key={project.id}>
                <div 
                  className={`app-card glass-panel spotlight-card ${project.isPlaceholder ? 'placeholder-card' : ''}`}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  style={{
                    transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.02, 1.02, 1.02)`,
                    transition: 'transform 0.15s ease-out, border-color 0.4s ease'
                  }}
                >
                  <div className="app-card-header">
                    <div className="app-icon-wrapper">
                      {project.isPlaceholder ? (
                        <HelpCircle className="gold-text" size={32} style={{ animation: 'spin-slow 10s infinite linear' }} />
                      ) : (
                        <Smartphone className="indigo-text" size={32} />
                      )}
                    </div>
                    {!project.isPlaceholder && (
                      <div className="app-links">
                        {project.github && (
                          <a href={project.github} className="app-link" aria-label="GitHub Repository">
                            <FaGithub size={22} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} className="app-link" aria-label="Live Demo">
                            <PlayCircle size={24} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="app-info">
                    <h3 className="app-title">{project.title}</h3>
                    <p className="app-desc">{project.desc}</p>
                  </div>
                  
                  <div className="app-tech">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
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

export default Projects;
