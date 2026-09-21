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
  const [viewTab, setViewTab] = useState('pdf'); // 'pdf' | 'summary'
  const { addToast } = useToast();

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
      message: 'Pratham_Jadwani_Resume.pdf has been downloaded to your device.',
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
        className="resume-modal glass-panel spotlight-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-header-left">
            <div className="resume-icon-badge indigo-text">
              <FileText size={20} />
            </div>
            <div>
              <div className="resume-title-row">
                <h3 className="resume-modal-title">Pratham Jadwani — Resume</h3>
                <span className="resume-status-badge">
                  <span className="resume-dot-pulse" /> Verified 2025/2026
                </span>
              </div>
              <p className="resume-modal-sub">
                Flutter Developer &amp; Creative Web Designer &bull; CHARUSAT CS
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="resume-header-actions">
            {/* View Switcher on Mobile/Desktop */}
            <div className="resume-tab-switcher">
              <button
                className={`resume-tab-btn ${viewTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setViewTab('pdf')}
              >
                <Eye size={14} /> PDF Viewer
              </button>
              <button
                className={`resume-tab-btn ${viewTab === 'summary' ? 'active' : ''}`}
                onClick={() => setViewTab('summary')}
              >
                <Sparkles size={14} /> Highlights
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="btn btn-primary resume-action-btn"
              title="Download PDF"
            >
              <Download size={16} /> <span>Download</span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="resume-tool-btn"
              title="Open in New Tab"
              aria-label="Open PDF in New Tab"
            >
              <ExternalLink size={17} />
            </a>

            <button
              onClick={handlePrint}
              className="resume-tool-btn"
              title="Print Resume"
              aria-label="Print Resume"
            >
              <Printer size={17} />
            </button>

            <button
              onClick={onClose}
              className="resume-close-btn"
              aria-label="Close Resume Viewer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="resume-modal-body">
          {viewTab === 'pdf' ? (
            <div className="resume-pdf-container">
              <iframe
                src="/resume.pdf#view=FitH&toolbar=0&navpanes=0"
                title="Pratham Jadwani Resume PDF"
                className="resume-iframe"
              />
              <div className="resume-mobile-pdf-notice">
                <p>Viewing on mobile device? If PDF doesn&apos;t load, switch to <strong>Highlights</strong> or tap below:</p>
                <div className="resume-notice-actions">
                  <button onClick={() => setViewTab('summary')} className="btn btn-outline">
                    View Interactive Highlights
                  </button>
                  <button onClick={handleDownload} className="btn btn-primary">
                    <Download size={14} style={{ marginRight: '6px' }} /> Download File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Summary Tab */
            <div className="resume-summary-container">
              <div className="summary-grid">
                {/* Academic & Objective */}
                <div className="summary-card glass-panel">
                  <div className="summary-card-header">
                    <GraduationCap className="gold-text" size={20} />
                    <h4>Education &amp; Background</h4>
                  </div>
                  <div className="summary-list-item">
                    <span className="summary-item-title">B.Tech Computer Science &amp; Engineering</span>
                    <span className="summary-item-sub">Charotar University of Science and Technology (CHARUSAT)</span>
                  </div>
                  <div className="summary-list-item">
                    <div className="summary-cgpa-row">
                      <span className="summary-cgpa-val gold-text">8.89 CGPA</span>
                      <span className="summary-item-sub">Diploma CS Foundation</span>
                    </div>
                  </div>
                </div>

                {/* Core Technical Strengths */}
                <div className="summary-card glass-panel">
                  <div className="summary-card-header">
                    <Code2 className="indigo-text" size={20} />
                    <h4>Core Specialties</h4>
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
                    <span className="skill-chip">UI/UX Design</span>
                  </div>
                </div>

                {/* Featured Client & App Deliverables */}
                <div className="summary-card glass-panel summary-card-span2">
                  <div className="summary-card-header">
                    <Briefcase className="indigo-text" size={20} />
                    <h4>Delivered Client &amp; Mobile Projects</h4>
                  </div>
                  <div className="summary-projects-row">
                    <div className="summary-proj-box">
                      <h5>Dada Design Studio</h5>
                      <p>Architecture portfolio platform with minimalist aesthetics and smooth transitions.</p>
                      <span className="summary-proj-tag">React &bull; Live Client</span>
                    </div>
                    <div className="summary-proj-box">
                      <h5>Wings Design</h5>
                      <p>Luxury interior design portfolio featuring bespoke branding and fluid animations.</p>
                      <span className="summary-proj-tag">Vite &bull; Live Client</span>
                    </div>
                    <div className="summary-proj-box">
                      <h5>StudyMate &amp; Ptunes</h5>
                      <p>Cross-platform Flutter educational and media player applications with dynamic theming.</p>
                      <span className="summary-proj-tag">Flutter &bull; Mobile App</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="resume-modal-footer">
          <div className="resume-footer-contact">
            <span><Mail size={14} /> Jpratham9716@gmail.com</span>
            <span><Phone size={14} /> +91 9722768555</span>
          </div>
          <div className="resume-footer-actions">
            <button onClick={handleDownload} className="btn btn-primary resume-footer-btn">
              <Download size={15} style={{ marginRight: '6px' }} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
