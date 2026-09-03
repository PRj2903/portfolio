import React, { useRef, useState } from 'react';
import './Contact.css';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Copy, Check, Send, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';
import { triggerConfetti } from '../utils/confetti';
import { useToast } from './Toast';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { addToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Jpratham9716@gmail.com');
    setCopiedEmail(true);
    addToast({
      title: 'Email Copied!',
      message: 'Jpratham9716@gmail.com copied to clipboard',
      type: 'success',
    });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+919722768555');
    setCopiedPhone(true);
    addToast({
      title: 'Phone Number Copied!',
      message: '+91 9722768555 copied to clipboard',
      type: 'success',
    });
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(form.current);
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus('success');
        form.current.reset();
        triggerConfetti();
        addToast({
          title: 'Message Sent Successfully!',
          message: 'Thank you for reaching out. I will get back to you shortly.',
          type: 'sparkle',
          duration: 6000,
        });
        setTimeout(() => setStatus(''), 6000);
      } else {
        setStatus('error');
        addToast({
          title: 'Submission Error',
          message: result.error || 'Failed to send message. Please try emailing directly.',
          type: 'error',
        });
        setTimeout(() => setStatus(''), 6000);
      }
    } catch (error) {
      console.error('API submission failed:', error);
      setStatus('error');
      addToast({
        title: 'Network / Server Error',
        message: 'Unable to reach the server. Please email directly at Jpratham9716@gmail.com',
        type: 'error',
      });
      setTimeout(() => setStatus(''), 6000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              Get In Touch <Sparkles size={16} className="gold-text" />
            </p>
            <h2 className="section-title">Let&apos;s Build Something Great</h2>
          </div>
        </ScrollReveal>

        <div className="contact-content">
          {/* Left: Contact Info & Quick Copy Badges */}
          <ScrollReveal className="contact-info">
            <div>
              <h3 className="contact-subtitle">Direct Reach &amp; Information</h3>
              <p className="contact-desc">
                Whether you need a full-scale <strong>Flutter mobile application</strong>, a luxury bespoke <strong>client website</strong>, or an engineering collaboration, my inbox is always open.
              </p>

              <div className="contact-methods">
                {/* Email Item with 1-click copy */}
                <div className="method-item glass-panel spotlight-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  <div className="method-icon indigo-text"><Mail size={22} /></div>
                  <div className="method-text-group">
                    <h4 className="method-title">Email Address</h4>
                    <a href="mailto:Jpratham9716@gmail.com" className="method-value">
                      Jpratham9716@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="copy-badge-btn"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Phone & WhatsApp Item with 1-click WhatsApp & copy */}
                <div className="method-item glass-panel spotlight-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  <div className="method-icon indigo-text"><Phone size={22} /></div>
                  <div className="method-text-group">
                    <div className="method-title-row">
                      <h4 className="method-title">Phone &amp; WhatsApp</h4>
                      <span className="whatsapp-tag">
                        <FaWhatsapp size={12} style={{ marginRight: '4px' }} /> WhatsApp
                      </span>
                    </div>
                    <a href="tel:+919722768555" className="method-value">
                      +91 9722768555
                    </a>
                  </div>
                  <div className="method-actions">
                    <a
                      href="https://wa.me/919722768555?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="copy-badge-btn whatsapp-action-btn"
                      title="Chat on WhatsApp (+91 9722768555)"
                      aria-label="Chat on WhatsApp"
                    >
                      <FaWhatsapp size={18} />
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="copy-badge-btn"
                      title="Copy Phone Number"
                      aria-label="Copy Phone Number"
                    >
                      {copiedPhone ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* Location Item */}
                <div className="method-item glass-panel spotlight-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  <div className="method-icon indigo-text"><MapPin size={22} /></div>
                  <div className="method-text-group">
                    <h4 className="method-title">Location</h4>
                    <p className="method-value">Surat, Gujarat, India (Open to Remote)</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Contact Form */}
          <ScrollReveal delay={100} className="contact-form-wrapper">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact-form glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name">Your Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Your Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    placeholder="rahul@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Mobile App Project / Client Website Inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe your project vision, timeline, or requirements..."
                  required
                ></textarea>
              </div>

              <Magnetic strength={20}>
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    'Sending Transmission...'
                  ) : (
                    <>
                      Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
              </Magnetic>

              {status === 'success' && (
                <div className="status-msg success">
                  <CheckCircle size={18} /> Message sent successfully! I will reply soon.
                </div>
              )}

              {status === 'error' && (
                <div className="status-msg error">
                  <AlertCircle size={18} /> Something went wrong. Click <a href="mailto:Jpratham9716@gmail.com" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 600 }}>here</a> to email directly.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
