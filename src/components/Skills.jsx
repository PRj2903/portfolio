import React from 'react';
import './Skills.css';
import { Smartphone, Layout, Server, Sparkles, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Skills = () => {
  const skillDomains = [
    {
      category: 'Mobile & Cross-Platform',
      icon: <Smartphone size={22} className="indigo-text" />,
      desc: 'Architecting 60fps native performance mobile experiences with robust state management.',
      skills: [
        { name: 'Flutter Framework', level: 'Production Expert' },
        { name: 'Dart Language', level: 'Advanced' },
        { name: 'State Management (BLoC / Provider)', level: 'Advanced' },
        { name: 'Local DBs (SQLite, Room)', level: 'Advanced' },
        { name: 'Custom Canvas & Shaders', level: 'Intermediate' },
      ],
    },
    {
      category: 'Frontend & Creative UI',
      icon: <Layout size={22} className="indigo-text" />,
      desc: 'Building bespoke editorial web layouts with meticulous typographic hierarchy and smooth motion.',
      skills: [
        { name: 'React.js & Hooks', level: 'Production Expert' },
        { name: 'Modern JavaScript (ES6+)', level: 'Advanced' },
        { name: 'Responsive Vanilla CSS & Modules', level: 'Advanced' },
        { name: 'UI/UX & Figma Prototyping', level: 'Advanced' },
        { name: 'Micro-Animations (GSAP / Transitions)', level: 'Intermediate' },
      ],
    },
    {
      category: 'Backend, APIs & Cloud',
      icon: <Server size={22} className="indigo-text" />,
      desc: 'Designing scalable RESTful endpoints, persistent datastores, and cloud sync services.',
      skills: [
        { name: 'Node.js & Express.js', level: 'Proficient' },
        { name: 'RESTful API Architecture', level: 'Advanced' },
        { name: 'MongoDB & Cloud Datastores', level: 'Proficient' },
        { name: 'Firebase & Firestore Sync', level: 'Advanced' },
        { name: 'Git, GitHub CI/CD & Deployments', level: 'Advanced' },
      ],
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              <Sparkles size={15} /> Technical Proficiency
            </p>
            <h2 className="section-title">Skills &amp; Engineering Disciplines</h2>
          </div>
        </ScrollReveal>

        <div className="skills-domains-grid">
          {skillDomains.map((domain, index) => (
            <ScrollReveal delay={index * 100} key={domain.category}>
              <div className="skill-domain-card glass-panel">
                <div className="domain-header">
                  <div className="domain-icon-box">{domain.icon}</div>
                  <h3 className="domain-title">{domain.category}</h3>
                  <p className="domain-desc">{domain.desc}</p>
                </div>

                <div className="domain-skills-list">
                  {domain.skills.map((s, idx) => (
                    <div key={idx} className="skill-item-row">
                      <div className="skill-name-wrap">
                        <CheckCircle2 size={15} className="skill-check-icon" />
                        <span className="skill-title-text">{s.name}</span>
                      </div>
                      <span className="skill-level-badge">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
