import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Smartphone,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll when modal is active
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="project-modal-dialog glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="project-modal-header">
          <div className="project-modal-badge-group">
            <span className={`modal-status-badge ${project.badgeType || 'default'}`}>
              <span className="modal-pulse-dot" />
              {project.badge || 'Case Study'}
            </span>
            <span className="modal-category-badge">{project.category}</span>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Project Modal"
            title="Press Esc to close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="project-modal-content">
          {/* Main Title Section */}
          <div className="modal-hero-block">
            <h2 className="modal-project-title">{project.title}</h2>
            <p className="modal-project-subtitle">{project.subtitle}</p>
            <p className="modal-project-role">
              <strong>Role / Context:</strong> {project.role}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="modal-actions-bar">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary modal-action-btn"
              >
                <Globe size={16} />
                <span>Visit Live Website</span>
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline modal-action-btn"
              >
                <FaGithub size={16} />
                <span>View Source Code</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          {/* Project Preview Media if Available */}
          {project.image && (
            <div className="modal-media-frame">
              <div className="modal-browser-bar">
                <div className="modal-browser-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="modal-browser-url">
                  {project.liveUrl ? new URL(project.liveUrl).hostname : 'production-app'}
                </span>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="modal-preview-img"
              />
            </div>
          )}

          {/* Overview Grid */}
          <div className="modal-section">
            <div className="modal-section-title">
              <BookOpen size={18} className="modal-icon-accent" />
              <h3>Project Overview</h3>
            </div>
            <p className="modal-overview-text">{project.overview}</p>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="modal-section">
            <div className="modal-section-title">
              <Cpu size={18} className="modal-icon-accent" />
              <h3>Architecture &amp; Tech Stack</h3>
            </div>
            {project.architectureOverview && (
              <p className="modal-arch-desc">{project.architectureOverview}</p>
            )}

            <div className="modal-tech-grid">
              {project.techStack?.map((tech, idx) => (
                <div key={idx} className="modal-tech-card">
                  <span className="modal-tech-name">{tech.name}</span>
                  <span className="modal-tech-role">{tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Grid */}
          {project.features && project.features.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">
                <Zap size={18} className="modal-icon-accent" />
                <h3>Core Features &amp; Capabilities</h3>
              </div>
              <div className="modal-features-grid">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="modal-feature-card">
                    <div className="feature-icon-wrapper">
                      <CheckCircle2 size={16} className="feature-check-icon" />
                    </div>
                    <div className="feature-info">
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-desc">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">
                <ShieldCheck size={18} className="modal-icon-accent" />
                <h3>Engineering Highlights &amp; Decisions</h3>
              </div>
              <ul className="modal-highlights-list">
                {project.technicalHighlights.map((highlight, idx) => (
                  <li key={idx} className="modal-highlight-item">
                    <span className="highlight-bullet">⚡</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="project-modal-footer">
          <span className="modal-footer-note">
            Press <kbd>Esc</kbd> or click outside to dismiss
          </span>
          <button className="btn btn-outline modal-close-action" onClick={onClose}>
            Close Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
