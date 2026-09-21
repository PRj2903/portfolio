import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Search, Command } from 'lucide-react';
import Magnetic from './Magnetic';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Featured UI', href: '#featured' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Apps', href: '#projects' },
    { name: 'GitHub', href: '#github-stats' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="container nav-content">
        <a href="#home" className="logo">
          PRATHAM<span className="logo-dot">.</span>
        </a>

        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          
          {/* Command Palette Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            className="cmd-trigger-btn"
            title="Search & Quick Actions (Ctrl+K / ⌘K)"
            aria-label="Open Command Palette"
          >
            <Search size={14} />
            <span className="cmd-trigger-text">Search</span>
            <kbd className="cmd-trigger-kbd">⌘K</kbd>
          </button>

          <div className="nav-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme" title="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Magnetic strength={12}>
              <a href="#contact" className="btn btn-primary nav-btn">Let&apos;s Talk</a>
            </Magnetic>
          </div>
        </div>

        <div className="mobile-only mobile-controls">
          <button
            onClick={onOpenCommandPalette}
            className="theme-toggle-btn"
            aria-label="Open Command Palette"
            title="Search"
          >
            <Search size={18} />
          </button>
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Menu &amp; Navigation</span>
            <span className="mobile-status-chip">
              <span className="mobile-status-dot" /> Online
            </span>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="mobile-cmd-btn"
          >
            <Search size={16} /> Quick Search &amp; Actions (⌘K)
          </button>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                <span className="mobile-nav-arrow">→</span>
              </a>
            ))}
          </div>

          {/* Quick Action Dock Inside Drawer */}
          <div className="mobile-drawer-footer">
            <a
              href="https://wa.me/919722768555?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-action-btn wa-drawer-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              WhatsApp Direct
            </a>
            <a 
              href="#contact" 
              className="btn btn-primary drawer-talk-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
