import React, { useState, useEffect } from 'react';
import './About.css';
import {
  Smartphone,
  GraduationCap,
  Clock,
  MapPin,
  Sparkles,
  FileText,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About = ({ onOpenResume }) => {
  const [timeString, setTimeString] = useState('');

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

  const techStack = [
    'Flutter', 'Dart', 'React.js', 'JavaScript (ES6+)',
    'Node.js', 'Express', 'REST APIs', 'MySQL',
    'MongoDB', 'Firebase', 'Tailwind CSS', 'Figma', 'Git'
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              <span>OVERVIEW // 02</span>
            </p>
            <h2 className="section-title">ABOUT &amp; ENGINEERING</h2>
          </div>
        </ScrollReveal>

        <div className="studio-bento-grid">
          {/* Bento 1: Main Story */}
          <ScrollReveal delay={50} className="studio-bento-2">
            <div className="bento-box bento-story-box glass-panel">
              <div className="bento-stamp-header">
                <span className="stamp-num">[01] MISSION</span>
                <span className="stamp-tag">ENGINEERING &amp; CRAFT</span>
              </div>

              <h3 className="bento-story-title">
                BUILDING HIGH-PERFORMANCE MOBILE &amp; WEB PRODUCTS WITH MATHEMATICAL RIGOR.
              </h3>

              <p className="bento-story-text">
                Computer Science Engineer passionate about bridge-building between performance engineering and contemporary visual craft. From architecting 60fps cross-platform <strong>Flutter</strong> mobile systems to shipping client websites like <em>Dada Design Studio</em>, every solution is built to scale.
              </p>

              <div className="bento-story-actions">
                <button onClick={onOpenResume} className="btn btn-primary">
                  <FileText size={16} />
                  <span>VIEW RESUME</span>
                </button>
                <a href="#contact" className="btn btn-outline">
                  <span>CONTACT STUDIO</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 2: Academic */}
          <ScrollReveal delay={100} className="studio-bento-1">
            <div className="bento-box bento-academic-box glass-panel">
              <div className="bento-stamp-header">
                <span className="stamp-num">[02] EDUCATION</span>
                <span className="stamp-tag">CHARUSAT</span>
              </div>

              <div className="bento-score-display">
                <div className="score-main-group">
                  <span className="score-big">7.58</span>
                  <span className="score-label">B.TECH CSE CGPA</span>
                </div>
                <div className="bento-sub-score">
                  <span className="score-medium">8.89</span>
                  <span className="score-label">DIPLOMA CGPA</span>
                </div>
              </div>

              <h4 className="academic-name">B.Tech Computer Science</h4>
              <p className="academic-uni">CHARUSAT University</p>
            </div>
          </ScrollReveal>

          {/* Bento 3: Time & Location */}
          <ScrollReveal delay={150} className="studio-bento-1">
            <div className="bento-box bento-loc-box glass-panel">
              <div className="bento-stamp-header">
                <span className="stamp-num">[03] FROM THE CITY</span>
              </div>

              <div className="bento-loc-body">
                <span className="loc-label">LOCATION</span>
                <h4 className="loc-city">Surat, Gujarat, IN</h4>
                <span className="loc-coords">21.1702° N, 72.8311° E</span>
              </div>

              <div className="studio-time-card">
                <span className="time-lbl">IST TIME</span>
                <span className="time-live">{timeString || 'IST (UTC+5:30)'}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento 4: Stack Cloud */}
          <ScrollReveal delay={200} className="studio-bento-2">
            <div className="bento-box bento-stack-box glass-panel">
              <div className="bento-stamp-header">
                <span className="stamp-num">[04] TOOLKIT</span>
                <span className="stamp-tag">CORE FRAMEWORKS</span>
              </div>

              <div className="studio-stack-wrap">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="studio-stack-tag">
                    <span className="tag-index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="tag-title">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
