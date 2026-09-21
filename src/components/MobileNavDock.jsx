import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Code2, Mail, Search, Moon, Sun } from 'lucide-react';
import './MobileNavDock.css';

const MobileNavDock = ({ theme, toggleTheme, onOpenCommandPalette }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide bottom dock when scrolling down fast, show on scroll up
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY < 50) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ['home', 'featured', 'projects', 'skills', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} />, href: '#home' },
    { id: 'featured', label: 'Work', icon: <Briefcase size={18} />, href: '#featured' },
    { id: 'skills', label: 'Skills', icon: <Code2 size={18} />, href: '#skills' },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  return (
    <div className={`mobile-nav-dock ${isVisible ? 'dock-visible' : 'dock-hidden'}`} aria-label="Mobile Navigation Dock">
      <div className="mobile-dock-inner">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`dock-btn ${isActive ? 'active' : ''}`}
              aria-label={item.label}
              onClick={() => setActiveSection(item.id)}
            >
              <div className="dock-icon-wrapper">
                {item.icon}
                {isActive && <span className="dock-active-glow" />}
              </div>
              <span className="dock-label">{item.label}</span>
            </a>
          );
        })}

        <div className="dock-divider" />

        {/* Quick Search Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="dock-btn dock-search-btn"
          aria-label="Open Command Palette (Search)"
          title="Search"
        >
          <div className="dock-icon-wrapper">
            <Search size={18} />
          </div>
          <span className="dock-label">Search</span>
        </button>

        {/* Quick Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="dock-btn dock-theme-btn"
          aria-label="Toggle Light/Dark Theme"
          title="Theme"
        >
          <div className="dock-icon-wrapper">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <span className="dock-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavDock;
