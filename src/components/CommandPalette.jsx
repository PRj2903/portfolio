import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Download,
  Copy,
  Moon,
  Sun,
  ExternalLink,
  Code2,
  Smartphone,
  Layers,
  User,
  Mail,
  Phone,
  Sparkles,
  Command,
  Star,
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { FaWhatsapp } from 'react-icons/fa6';
import { useToast } from './Toast';
import { triggerConfetti } from '../utils/confetti';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, onClose, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { addToast } = useToast();

  const commands = [
    // Navigation
    {
      id: 'nav-home',
      group: 'Navigation',
      title: 'Home / Top',
      subtitle: 'Jump to hero section & profile intro',
      icon: <User size={18} />,
      action: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-about',
      group: 'Navigation',
      title: 'About Me (Bento Grid)',
      subtitle: 'Background, education, and credentials',
      icon: <Layers size={18} />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-featured',
      group: 'Navigation',
      title: 'Featured Client Projects',
      subtitle: 'Dada Design Studio & Wings Design',
      icon: <Star size={18} />,
      action: () => {
        document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-projects',
      group: 'Navigation',
      title: 'Mobile Apps & Web Systems',
      subtitle: 'Flutter cross-platform & full-stack applications',
      icon: <Smartphone size={18} />,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-skills',
      group: 'Navigation',
      title: 'Skills & Tech Stack',
      subtitle: 'Flutter, Dart, React, Node.js, UI/UX tools',
      icon: <Code2 size={18} />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-contact',
      group: 'Navigation',
      title: 'Contact Form & Inquiries',
      subtitle: 'Send a message or proposal directly',
      icon: <Mail size={18} />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },

    // Actions
    {
      id: 'act-resume',
      group: 'Actions',
      title: 'Download Resume PDF',
      subtitle: 'Get Pratham Jadwani\'s latest resume',
      icon: <Download size={18} />,
      badge: 'PDF',
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Pratham_Jadwani_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        triggerConfetti();
        addToast({
          title: 'Resume Downloaded',
          message: 'Pratham_Jadwani_Resume.pdf download started!',
          type: 'sparkle',
        });
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      group: 'Actions',
      title: 'Copy Email Address',
      subtitle: 'Jpratham9716@gmail.com',
      icon: <Copy size={18} />,
      badge: 'Copy',
      action: () => {
        navigator.clipboard.writeText('Jpratham9716@gmail.com');
        addToast({
          title: 'Email Copied!',
          message: 'Jpratham9716@gmail.com copied to clipboard',
          type: 'success',
        });
        onClose();
      },
    },
    {
      id: 'act-whatsapp',
      group: 'Actions',
      title: 'Chat on WhatsApp',
      subtitle: '+91 9722768555 (Direct Chat)',
      icon: <FaWhatsapp size={18} style={{ color: '#25D366' }} />,
      badge: 'WhatsApp',
      action: () => {
        window.open('https://wa.me/919722768555?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', '_blank');
        onClose();
      },
    },
    {
      id: 'act-copy-phone',
      group: 'Actions',
      title: 'Copy Phone Number',
      subtitle: '+91 9722768555',
      icon: <Phone size={18} />,
      badge: 'Copy',
      action: () => {
        navigator.clipboard.writeText('+919722768555');
        addToast({
          title: 'Phone Copied!',
          message: '+91 9722768555 copied to clipboard',
          type: 'success',
        });
        onClose();
      },
    },
    {
      id: 'act-theme',
      group: 'Actions',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: `Current theme: ${theme}`,
      icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />,
      badge: 'Theme',
      action: () => {
        toggleTheme();
        addToast({
          title: 'Theme Updated',
          message: `Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`,
          type: 'info',
        });
        onClose();
      },
    },

    // External Profiles & Work
    {
      id: 'ext-github',
      group: 'Links & Socials',
      title: 'GitHub Profile (@PRj2903)',
      subtitle: 'Explore repositories & open-source code',
      icon: <Github size={18} />,
      badge: 'External',
      action: () => {
        window.open('https://github.com/PRj2903', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      group: 'Links & Socials',
      title: 'LinkedIn Profile',
      subtitle: 'Connect with Pratham Jadwani on LinkedIn',
      icon: <Linkedin size={18} />,
      badge: 'External',
      action: () => {
        window.open('https://www.linkedin.com/in/pratham-jadwani-a5b19225a', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-dada',
      group: 'Links & Socials',
      title: 'Dada Design Studio (Live Project)',
      subtitle: 'Architecture portfolio website',
      icon: <ExternalLink size={18} />,
      badge: 'Live',
      action: () => {
        window.open('https://www.dadadesignstudio.in/', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-wings',
      group: 'Links & Socials',
      title: 'Wings Design (Live Project)',
      subtitle: 'Luxury interior design website',
      icon: <ExternalLink size={18} />,
      badge: 'Live',
      action: () => {
        window.open('https://www.thewingsinteriordesign.live/', '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          document.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div
        className="cmd-modal glass-panel spotlight-card"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }}
      >
        {/* Search Header */}
        <div className="cmd-header">
          <Search size={20} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, project, or section... (e.g. Resume, Flutter)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="cmd-list">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty">
              <Sparkles size={24} className="cmd-empty-icon" />
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <span>Try searching for &quot;Resume&quot;, &quot;Theme&quot;, or &quot;Projects&quot;</span>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="cmd-item-icon">{cmd.icon}</div>
                  <div className="cmd-item-text">
                    <span className="cmd-item-title">{cmd.title}</span>
                    <span className="cmd-item-subtitle">{cmd.subtitle}</span>
                  </div>
                  {cmd.badge && <span className="cmd-item-badge">{cmd.badge}</span>}
                  {isSelected && <ArrowRight size={16} className="cmd-item-arrow" />}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="cmd-footer">
          <div className="cmd-shortcut-hint">
            <span><kbd className="cmd-sub-kbd">↑</kbd><kbd className="cmd-sub-kbd">↓</kbd> Navigate</span>
            <span><kbd className="cmd-sub-kbd">↵</kbd> Select</span>
            <span><kbd className="cmd-sub-kbd">esc</kbd> Close</span>
          </div>
          <div className="cmd-footer-brand">
            <Command size={14} /> Pratham&apos;s Portfolio
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
