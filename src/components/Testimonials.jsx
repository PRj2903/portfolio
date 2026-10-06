import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
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
    client: 'CHARUSAT Academic Review',
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
    }, 7000);
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
              <MessageSquareQuote size={15} /> Verified Feedback
            </p>
            <h2 className="section-title">Client &amp; Collaborator Reviews</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="testimonial-card-frame glass-panel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="testimonial-header-row">
              <div className="quote-mark-badge">
                <Quote size={20} className="indigo-text" />
              </div>
              <div className="star-rating">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#b45309" color="#b45309" />
                ))}
              </div>
            </div>

            <p className="testimonial-body serif-italic">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="testimonial-footer-row">
              <div className="author-meta">
                <div className="author-avatar">{current.avatar}</div>
                <div>
                  <h4 className="author-name">{current.client}</h4>
                  <p className="author-role">{current.role} &bull; <span className="author-project">{current.project}</span></p>
                </div>
              </div>

              {current.link && (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline testimonial-link-btn"
                >
                  Visit Client Project
                </a>
              )}
            </div>

            {/* Controls */}
            <div className="testimonial-nav-bar">
              <button onClick={handlePrev} className="test-nav-btn" aria-label="Previous review">
                <ChevronLeft size={18} />
              </button>
              <div className="test-dots">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`test-dot ${idx === currentIndex ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="test-nav-btn" aria-label="Next review">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
