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
import './App.css';

function MainContent() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [cmdOpen, setCmdOpen] = useState(false);

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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('open-command-palette', handleCustomOpenCmd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('open-command-palette', handleCustomOpenCmd);
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <BackgroundCanvas />
      <MouseGlow />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <FeaturedProjects />
        <Testimonials />
        <Projects />
        <GitHubStats />
        <Skills />
        <Contact />
      </main>
      <Footer />
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
