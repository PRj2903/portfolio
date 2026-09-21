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
import BackgroundCanvas from './components/BackgroundCanvas';
import MouseGlow from './components/MouseGlow';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import { ToastProvider } from './components/Toast';
import MobileNavDock from './components/MobileNavDock';
import ResumeModal from './components/ResumeModal';
import './App.css';

function MainContent() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Set up global mousemove tracking for card spotlight styling
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleCustomOpenCmd = () => {
      setCmdOpen(true);
    };

    const handleCustomOpenResume = () => {
      setResumeOpen(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('open-command-palette', handleCustomOpenCmd);
    document.addEventListener('open-resume-modal', handleCustomOpenResume);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('open-command-palette', handleCustomOpenCmd);
      document.removeEventListener('open-resume-modal', handleCustomOpenResume);
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <BackgroundCanvas />
      <MouseGlow />
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
      <main style={{ position: 'relative', zIndex: 2 }}>
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
