import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    client: 'Dada Design Studio',
    role: 'Principal Architect & Founder',
    project: 'Architecture Portfolio Platform',
    avatar: 'DD',
    rating: 5,
    quote:
      'Pratham transformed our architectural vision into an exceptional, minimalist digital portfolio. The clean monochrome aesthetic, structural typography, and smooth interaction animations perfectly embody our architectural philosophy.',
    link: 'https://www.dadadesignstudio.in/',
  },
  {
    id: 2,
    client: 'Wings Design',
    role: 'Creative Director',
    project: 'Luxury Interior Design Showcase',
    avatar: 'WD',
    rating: 5,
    quote:
      'The interior design website Pratham engineered elevated our luxury brand presence instantly. The fluid transitions, custom hover effects, and attention to detail give our clients a world-class first impression.',
    link: 'https://www.thewingsinteriordesign.live/',
  },
  {
    id: 3,
    client: 'CHARUSAT Project Review',
    role: 'Senior Faculty & Project Mentor',
    project: 'Full-Stack & Flutter Engineering',
    avatar: 'CH',
    rating: 5,
    quote:
      'Pratham consistently showcases remarkable ability in synthesizing complex backend logic with pixel-perfect client interfaces. His technical execution in cross-platform mobile and web is top-tier.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              Client &amp; Peer Reviews <Sparkles size={16} className="gold-text" />
            </p>
            <h2 className="section-title">What Collaborators Say</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="testimonial-carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="testimonial-card glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Quote Icon Tag */}
              <div className="quote-badge indigo-text">
                <Quote size={28} />
              </div>

              {/* Star Rating */}
              <div className="star-rating">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={18} className="gold-text fill-gold" fill="#f59e0b" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="testimonial-quote">&ldquo;{current.quote}&rdquo;</p>

              {/* Client Info & Project Tag */}
              <div className="testimonial-footer">
                <div className="client-info-group">
                  <div className="client-avatar">{current.avatar}</div>
                  <div>
                    <h4 className="client-name">{current.client}</h4>
                    <p className="client-role">{current.role}</p>
                  </div>
                </div>

                {current.link ? (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline testimonial-link-btn"
                  >
                    View Project
                  </a>
                ) : (
                  <span className="project-tag">{current.project}</span>
                )}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="carousel-controls">
              <button
                onClick={handlePrev}
                className="carousel-btn"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="carousel-dots">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="carousel-btn"
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
