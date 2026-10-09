import React from 'react';
import './Projects.css';
import { Smartphone, Sparkles, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

const Projects = ({ onOpenProject }) => {
  const appProjects = [
    {
      id: 'studymate',
      title: 'StudyMate',
      category: 'Education & Productivity',
      desc: 'A student companion application streamlining academic schedules, study timers, and course progress tracking backed by a robust Spring Boot REST API.',
      tech: ['Flutter', 'Spring Boot', 'REST API', 'Provider'],
      github: 'https://github.com/PRj2903',
      hasCaseStudy: true,
      demo: null
    },
    {
      id: 'ptunes-player',
      title: 'Ptunes Music Player',
      category: 'Audio Streaming & Offline Player',
      desc: 'An aesthetically refined mobile music player featuring dynamic audio visualizers, background playback service, and offline local caching.',
      tech: ['Flutter', 'Audio Service', 'SQLite', 'BLoC'],
      github: 'https://github.com/PRj2903',
      hasCaseStudy: true,
      demo: null
    },
    {
      id: 'flashcard-app',
      title: 'Flashcard Learning App',
      category: 'EdTech & Spaced Repetition',
      desc: 'An interactive spaced repetition learning tool with customizable flashcard decks, cloud sync, and memory retention analytics.',
      tech: ['Flutter', 'Firebase Firestore', 'Cloud Sync'],
      github: 'https://github.com/PRj2903',
      hasCaseStudy: true,
      demo: null
    },
    {
      id: 'upcoming-apps',
      isPlaceholder: true,
      title: 'Upcoming Flutter & Android Apps',
      category: 'In Active Development',
      desc: 'New cross-platform mobile apps featuring Material 3 theming, offline-first architectures, and high-performance canvas UI are currently in engineering.',
      tech: ['Android SDK', 'Flutter', 'Kotlin', 'Material 3'],
      github: 'https://github.com/PRj2903',
      hasCaseStudy: false,
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

                  <div className="app-actions-row">
                    {project.hasCaseStudy && (
                      <button
                        type="button"
                        className="btn-app-case-study"
                        onClick={() => onOpenProject && onOpenProject(project.id)}
                        title={`View ${project.title} Architecture & Details`}
                      >
                        <Layers size={14} />
                        <span>Case Study</span>
                      </button>
                    )}

                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="app-source-link"
                        title="View Source on GitHub"
                      >
                        <FaGithub size={14} />
                        <span>Source</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
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

export default Projects;
