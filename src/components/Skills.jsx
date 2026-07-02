import React from 'react';
import './Skills.css';
import { Terminal, Lightbulb, Wrench } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Terminal size={26} />,
      skills: [
        { name: 'C++', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'SQL', level: 75 }
      ]
    },
    {
      title: 'Frameworks & Tech',
      icon: <Lightbulb size={26} />,
      skills: [
        { name: 'Flutter', level: 95 },
        { name: 'Firebase', level: 90 },
        { name: 'React', level: 85 }
      ]
    },
    {
      title: 'Tools',
      icon: <Wrench size={26} />,
      skills: [
        { name: 'VS Code', level: 95 },
        { name: 'IntelliJ', level: 90 },
        { name: 'Git', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header center-header">
            <p className="section-subtitle justify-center">Technical Toolkit</p>
            <h2 className="section-title">My Skills</h2>
          </div>
        </ScrollReveal>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <ScrollReveal delay={idx * 120} variant="zoom-in" key={idx}>
              <div 
                className="skill-category-card glass-panel spotlight-card" 
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <div className="category-header">
                  <div className="category-icon indigo-text">
                    {category.icon}
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                
                <div className="skills-list">
                  {category.skills.map((skill, sIdx) => (
                    <div className="skill-progress-item" key={sIdx}>
                      <div className="skill-info-row">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="progress-bar-track">
                        <div 
                          className="progress-bar-fill"
                          style={{ '--fill-width': `${skill.level}%` }}
                        />
                      </div>
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
