import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { ToastProvider } from './components/Toast';
import MobileNavDock from './components/MobileNavDock';
import ResumeModal from './components/ResumeModal';
import ProjectModal from './components/ProjectModal';
import { projectsData } from './data/projectsData';
import './App.css';

function MainContent() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored) return stored;
    }
    return 'light'; // Clean light theme default
  });

  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (projectIdOrObject) => {
    if (typeof projectIdOrObject === 'string') {
      const found = projectsData.find((p) => p.id === projectIdOrObject);
      if (found) setSelectedProject(found);
    } else if (projectIdOrObject && typeof projectIdOrObject === 'object') {
      setSelectedProject(projectIdOrObject);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleCustomOpenCmd = () => {
      setCmdOpen(true);
    };

    const handleCustomOpenResume = () => {
      setResumeOpen(true);
    };

    const handleCustomOpenProject = (e) => {
      if (e.detail) {
        handleOpenProject(e.detail);
      }
    };

    document.addEventListener('open-command-palette', handleCustomOpenCmd);
    document.addEventListener('open-resume-modal', handleCustomOpenResume);
    document.addEventListener('open-project-modal', handleCustomOpenProject);

    return () => {
      document.removeEventListener('open-command-palette', handleCustomOpenCmd);
      document.removeEventListener('open-resume-modal', handleCustomOpenResume);
      document.removeEventListener('open-project-modal', handleCustomOpenProject);
    };
  }, []);

  return (
    <div className="app-container">
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseProject}
      />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
        onOpenProject={handleOpenProject}
      />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About onOpenResume={() => setResumeOpen(true)} />
        <FeaturedProjects onOpenProject={handleOpenProject} />
        <Testimonials />
        <Projects onOpenProject={handleOpenProject} />
        <GitHubStats />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <MobileNavDock
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <MainContent />
    </ToastProvider>
  );
}

export default App;
