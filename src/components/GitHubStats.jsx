import React, { useState, useEffect } from 'react';
import { GitFork, Star, Terminal, ExternalLink, Activity } from 'lucide-react';
import { Github } from './Icons';
import ScrollReveal from './ScrollReveal';
import './GitHubStats.css';

const featuredRepos = [
  {
    name: 'pratham-portfolio',
    desc: 'Personal engineering portfolio built with React, clean editorial design system, and verified client deliverables.',
    language: 'JavaScript / React',
    langColor: '#f1e05a',
    stars: 12,
    forks: 4,
    link: 'https://github.com/PRj2903/pratham-portfolio',
  },
  {
    name: 'flutter-luxury-ui-kit',
    desc: 'Cross-platform Flutter components and custom canvas animations for premium mobile and commerce apps.',
    language: 'Dart / Flutter',
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
              <Activity size={15} /> Open Source &amp; Codebases
            </p>
            <h2 className="section-title">GitHub Activity &amp; Repositories</h2>
          </div>
        </ScrollReveal>

        <div className="github-grid">
          {/* Main GitHub Profile Overview Card */}
          <ScrollReveal delay={100} className="github-overview-card glass-panel">
            <div className="github-card-header">
              <div className="github-user-badge">
                <Github size={28} className="indigo-text" />
                <div>
                  <h4 className="github-username">@PRj2903</h4>
                  <span className="github-bio">Pratham Jadwani &bull; Active Developer</span>
                </div>
              </div>
              <a
                href="https://github.com/PRj2903"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline github-follow-btn"
              >
                <span>Follow on GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Metrics */}
            <div className="github-metrics-row">
              <div className="metric-box">
                <span className="metric-val">{profileData?.public_repos || '24+'}</span>
                <span className="metric-lbl">Repositories</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Code Quality Focus</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">Flutter &bull; React</span>
                <span className="metric-lbl">Primary Specialization</span>
              </div>
            </div>

            {/* Clean Contribution Grid */}
            <div className="github-heatmap-container">
              <div className="heatmap-header">
                <span className="heatmap-title">Contribution Pulse</span>
                <span className="heatmap-legend">Daily Commits &amp; Releases</span>
              </div>
              <div className="heatmap-grid">
                {Array.from({ length: 48 }).map((_, i) => {
                  const levels = ['level-0', 'level-1', 'level-2', 'level-3', 'level-4'];
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
                  className="repo-card glass-panel"
                >
                  <div className="repo-header">
                    <div className="repo-name-group">
                      <Terminal size={16} className="indigo-text" />
                      <h4 className="repo-name">{repo.name}</h4>
                    </div>
                    <ExternalLink size={15} className="repo-ext-icon" />
                  </div>

                  <p className="repo-desc">{repo.desc}</p>

                  <div className="repo-footer">
                    <div className="repo-lang">
                      <span className="lang-color-dot" style={{ backgroundColor: repo.langColor }} />
                      <span>{repo.language}</span>
                    </div>
                    <div className="repo-stats">
                      <span className="repo-stat-item"><Star size={13} /> {repo.stars}</span>
                      <span className="repo-stat-item"><GitFork size={13} /> {repo.forks}</span>
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
