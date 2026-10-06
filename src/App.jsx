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

    document.addEventListener('open-command-palette', handleCustomOpenCmd);
    document.addEventListener('open-resume-modal', handleCustomOpenResume);

    return () => {
      document.removeEventListener('open-command-palette', handleCustomOpenCmd);
      document.removeEventListener('open-resume-modal', handleCustomOpenResume);
    };
  }, []);

  return (
    <div className="app-container">
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About onOpenResume={() => setResumeOpen(true)} />
        <FeaturedProjects />
        <Testimonials />
        <Projects />
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
