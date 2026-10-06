import React from 'react';
import './Projects.css';
import { Smartphone, Sparkles, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const appProjects = [
    {
      id: 1,
      title: 'StudyMate',
      category: 'Education & Productivity',
      desc: 'A student companion application streamlining academic schedules, study timers, and course progress tracking with clean state architecture.',
      tech: ['Flutter', 'Spring Boot', 'REST API', 'Provider'],
      github: 'https://github.com/PRj2903',
      demo: null
    },
    {
      id: 2,
      title: 'Ptunes Music Player',
      category: 'Audio Streaming & Offline Player',
      desc: 'An aesthetically refined mobile music player featuring dynamic audio visualizers, background playback service, and offline Hive local caching.',
      tech: ['Flutter', 'Audio Service', 'Hive DB', 'BLoC'],
      github: 'https://github.com/PRj2903',
      demo: null
    },
    {
      id: 3,
      title: 'Flashcard Learning App',
      category: 'EdTech & Spaced Repetition',
      desc: 'An interactive spaced repetition learning tool with customizable flashcard decks, cloud sync, and retention analytics.',
      tech: ['Flutter', 'Firebase Firestore', 'Cloud Sync'],
      github: 'https://github.com/PRj2903',
      demo: null
    },
    {
      id: 4,
      isPlaceholder: true,
      title: 'Upcoming Flutter & Android Apps',
      category: 'In Active Development',
      desc: 'New cross-platform mobile apps featuring Material 3 theming, offline-first architectures, and high-performance canvas UI are currently in engineering.',
      tech: ['Android SDK', 'Flutter', 'Kotlin', 'Material 3'],
      github: 'https://github.com/PRj2903',
      demo: null
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              <Smartphone size={15} /> Mobile Engineering Portfolio
            </p>
            <h2 className="section-title">Flutter &amp; Mobile Applications</h2>
          </div>
        </ScrollReveal>

        <div className="app-grid">
          {appProjects.map((project, index) => (
            <ScrollReveal delay={index * 80} variant="fade-up" key={project.id}>
              <div className={`app-card glass-panel ${project.isPlaceholder ? 'placeholder-card' : ''}`}>
                <div className="app-card-top">
                  <div className="app-icon-box">
                    {project.isPlaceholder ? (
                      <Sparkles size={18} className="gold-text" />
                    ) : (
                      <Smartphone size={18} className="indigo-text" />
                    )}
                  </div>
                  <span className="app-category-pill">{project.category}</span>
                </div>
                
                <div className="app-card-body">
                  <h3 className="app-title">{project.title}</h3>
                  <p className="app-desc">{project.desc}</p>
                </div>
                
                <div className="app-card-footer">
                  <div className="app-tech-list">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  {project.github && (
                    <div className="app-actions-row">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="app-source-link"
                        title="View Source on GitHub"
                      >
                        <FaGithub size={15} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
