import React, { useState, useEffect } from 'react';
import { GitFork, Star, Code, Terminal, ExternalLink, Sparkles, Activity } from 'lucide-react';
import { Github } from './Icons';
import ScrollReveal from './ScrollReveal';
import './GitHubStats.css';

const featuredRepos = [
  {
    name: 'pratham-portfolio',
    desc: 'Production-ready, highly interactive personal portfolio built with React, Framer Motion, and Glassmorphism design.',
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: 12,
    forks: 4,
    link: 'https://github.com/PRj2903/pratham-portfolio',
  },
  {
    name: 'flutter-luxury-ui-kit',
    desc: 'Cross-platform Flutter components and custom canvas animations for luxury e-commerce and portfolio apps.',
    language: 'Dart',
    langColor: '#00B4AB',
    stars: 18,
    forks: 6,
    link: 'https://github.com/PRj2903',
  },
  {
    name: 'dadadesign-client-web',
    desc: 'Tailored architecture portfolio website built with modern React, GSAP structural animations, and responsive modules.',
    language: 'CSS / React',
    langColor: '#563d7c',
    stars: 8,
    forks: 2,
    link: 'https://github.com/PRj2903',
  },
];

const GitHubStats = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch live public info from GitHub API
    fetch('https://api.github.com/users/PRj2903')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setProfileData(data);
      })
      .catch((err) => console.log('GitHub API fetch bypassed:', err));
  }, []);

  return (
    <section id="github-stats" className="github-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              Open Source &amp; Code <Activity size={16} className="indigo-text" />
            </p>
            <h2 className="section-title">GitHub Activity &amp; Repos</h2>
          </div>
        </ScrollReveal>

        <div className="github-grid">
          {/* Main GitHub Profile Overview Card */}
          <ScrollReveal delay={100} className="github-overview-card glass-panel spotlight-card"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
          >
            <div className="github-card-header">
              <div className="github-user-badge">
                <Github size={32} className="indigo-text" />
                <div>
                  <h4 className="github-username">@PRj2903</h4>
                  <span className="github-bio">Pratham Jadwani • GitHub Creator</span>
                </div>
              </div>
              <a
                href="https://github.com/PRj2903"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline github-follow-btn"
              >
                Follow <ExternalLink size={14} style={{ marginLeft: '6px' }} />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="github-metrics-row">
              <div className="metric-box">
                <span className="metric-val indigo-text">{profileData?.public_repos || '24+'}</span>
                <span className="metric-lbl">Repositories</span>
              </div>
              <div className="metric-box">
                <span className="metric-val gold-text">100%</span>
                <span className="metric-lbl">Clean Code Standard</span>
              </div>
              <div className="metric-box">
                <span className="metric-val indigo-text">Flutter &amp; Web</span>
                <span className="metric-lbl">Core Focus</span>
              </div>
            </div>

            {/* Mock Contribution Graph Grid */}
            <div className="github-heatmap-container">
              <div className="heatmap-header">
                <span className="heatmap-title">Contribution Pulse</span>
                <span className="heatmap-legend">Active Daily Commits</span>
              </div>
              <div className="heatmap-grid">
                {Array.from({ length: 48 }).map((_, i) => {
                  const levels = ['level-0', 'level-1', 'level-2', 'level-3', 'level-4'];
                  // Deterministic vibrant activity pattern
                  const level = levels[(i * 7 + 3) % levels.length];
                  return <div key={i} className={`heatmap-cell ${level}`} />;
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Featured Repositories List */}
          <div className="github-repos-list">
            {featuredRepos.map((repo, idx) => (
              <ScrollReveal delay={150 + idx * 70} key={repo.name}>
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-card glass-panel spotlight-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  <div className="repo-header">
                    <div className="repo-name-group">
                      <Terminal size={18} className="indigo-text" />
                      <h4 className="repo-name">{repo.name}</h4>
                    </div>
                    <ExternalLink size={16} className="repo-ext-icon" />
                  </div>

                  <p className="repo-desc">{repo.desc}</p>

                  <div className="repo-footer">
                    <div className="repo-lang">
                      <span className="lang-color-dot" style={{ backgroundColor: repo.langColor }} />
                      <span>{repo.language}</span>
                    </div>
                    <div className="repo-stats">
                      <span className="repo-stat-item"><Star size={14} /> {repo.stars}</span>
                      <span className="repo-stat-item"><GitFork size={14} /> {repo.forks}</span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
