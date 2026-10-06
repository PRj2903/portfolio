import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Printer,
  Sparkles,
  FileText,
  Eye,
  GraduationCap,
  Code2,
  Briefcase,
  Smartphone,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { useToast } from './Toast';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  // On mobile screens, default to 'summary' for immediate rich readability; on desktop, default to 'pdf'
  const [viewTab, setViewTab] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'summary';
    }
    return 'pdf';
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 768) {
      setViewTab('summary');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Pratham_Jadwani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerConfetti();
    addToast({
      title: 'Resume Downloaded!',
      message: 'Pratham_Jadwani_Resume.pdf downloaded successfully.',
      type: 'sparkle',
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('/resume.pdf', '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div
        className="resume-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-header-main">
            <div className="resume-header-left">
              <div className="resume-icon-badge">
                <FileText size={18} className="indigo-text" />
              </div>
              <div>
                <h3 className="resume-modal-title">Pratham Jadwani &mdash; Resume</h3>
                <p className="resume-modal-sub">
                  Flutter Developer &bull; CHARUSAT CS &bull; 8.89 CGPA
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="resume-close-btn"
              aria-label="Close Resume Viewer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Controls Row */}
          <div className="resume-header-actions">
            <div className="resume-tab-switcher">
              <button
                className={`resume-tab-btn ${viewTab === 'summary' ? 'active' : ''}`}
                onClick={() => setViewTab('summary')}
              >
                <Sparkles size={13} /> Interactive Overview
              </button>
              <button
                className={`resume-tab-btn ${viewTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setViewTab('pdf')}
              >
                <Eye size={13} /> PDF Viewer
              </button>
            </div>

            <div className="resume-quick-tools">
              <button
                onClick={handleDownload}
                className="btn btn-primary resume-action-btn"
                title="Download PDF"
              >
                <Download size={15} /> <span>Download</span>
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="resume-tool-btn"
                title="Open PDF in New Window"
                aria-label="Open in New Tab"
              >
                <ExternalLink size={16} />
              </a>

              <button
                onClick={handlePrint}
                className="resume-tool-btn desktop-tool"
                title="Print Resume"
                aria-label="Print"
              >
                <Printer size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="resume-modal-body">
          {viewTab === 'summary' ? (
            /* Interactive Summary Tab */
            <div className="resume-summary-container">
              <div className="summary-grid">
                {/* Academic & Objective */}
                <div className="summary-card">
                  <div className="summary-card-header">
                    <GraduationCap className="gold-text" size={18} />
                    <h4>Education &amp; Background</h4>
                  </div>
                  <div className="summary-list-item">
                    <span className="summary-item-title">B.Tech Computer Science &amp; Engineering</span>
                    <span className="summary-item-sub">Charotar University of Science &amp; Technology (CHARUSAT)</span>
                  </div>
                  <div className="summary-list-item">
                    <div className="summary-cgpa-row">
                      <span className="summary-cgpa-val">8.89</span>
                      <span className="summary-item-sub">Diploma CS Foundation (Top Academic Honors)</span>
                    </div>
                  </div>
                </div>

                {/* Core Technical Strengths */}
                <div className="summary-card">
                  <div className="summary-card-header">
                    <Code2 className="indigo-text" size={18} />
                    <h4>Core Specialties &amp; Stack</h4>
                  </div>
                  <div className="summary-skills-chips">
                    <span className="skill-chip">Flutter</span>
                    <span className="skill-chip">Dart</span>
                    <span className="skill-chip">React.js</span>
                    <span className="skill-chip">JavaScript (ES6+)</span>
                    <span className="skill-chip">Node.js</span>
                    <span className="skill-chip">Express</span>
                    <span className="skill-chip">REST APIs</span>
                    <span className="skill-chip">Hive DB</span>
                    <span className="skill-chip">Firebase</span>
                    <span className="skill-chip">UI/UX Craft</span>
                  </div>
                </div>

                {/* Featured Client & App Deliverables */}
                <div className="summary-card summary-card-span2">
                  <div className="summary-card-header">
                    <Briefcase className="indigo-text" size={18} />
                    <h4>Production Client &amp; Mobile Deliverables</h4>
                  </div>
                  <div className="summary-projects-row">
                    <div className="summary-proj-box">
                      <h5>Dada Design Studio</h5>
                      <p>Full-scale architecture portfolio platform with structural minimalism and responsive animations.</p>
                      <span className="summary-proj-tag">React.js &bull; Live Client Platform</span>
                    </div>
                    <div className="summary-proj-box">
                      <h5>StudyMate &amp; Ptunes</h5>
                      <p>Cross-platform educational suite &amp; native audio player featuring dynamic theming and offline Hive DB.</p>
                      <span className="summary-proj-tag">Flutter &bull; Mobile Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PDF Viewer Tab */
            <div className="resume-pdf-container">
              <iframe
                src="/resume.pdf#view=FitH&toolbar=0&navpanes=0"
                title="Pratham Jadwani Resume PDF"
                className="resume-iframe"
              />
              <div className="resume-mobile-pdf-notice">
                <p>Viewing on a mobile device? If inline PDF preview doesn&apos;t load, tap below:</p>
                <div className="resume-notice-actions">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink size={15} style={{ marginRight: '6px' }} /> Open Fullscreen PDF
                  </a>
                  <button onClick={handleDownload} className="btn btn-outline">
                    <Download size={15} style={{ marginRight: '6px' }} /> Download File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="resume-modal-footer">
          <div className="resume-footer-contact">
            <a href="mailto:Jpratham9716@gmail.com"><Mail size={13} /> Jpratham9716@gmail.com</a>
            <a href="tel:+919722768555"><Phone size={13} /> +91 9722768555</a>
          </div>
          <div className="resume-footer-actions">
            <button onClick={handleDownload} className="btn btn-primary resume-footer-btn">
              <Download size={14} style={{ marginRight: '6px' }} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
