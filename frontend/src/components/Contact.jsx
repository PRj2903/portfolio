import React, { useRef, useState } from 'react';
import './Contact.css';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('API submission failed:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-subtitle">Get In Touch</p>
            <h2 className="section-title">Let's Work Together</h2>
          </div>
        </ScrollReveal>

        <div className="contact-content">
          <ScrollReveal className="contact-info">
            <div>
              <h3 className="contact-subtitle">Contact Information</h3>
              <p className="contact-desc">
                Whether you have a specific project in mind, want to explore a potential collaboration, or simply say hello, I am always open to discussing new opportunities.
              </p>
              
              <div className="contact-methods">
                <div className="method-item">
                  <div className="method-icon indigo-text"><Mail size={24} /></div>
                  <div>
                    <h4 className="method-title">Email</h4>
                    <a href="mailto:Jpratham9716@gmail.com" className="method-value hover-effect">Jpratham9716@gmail.com</a>
                  </div>
                </div>
                
                <div className="method-item">
                  <div className="method-icon indigo-text"><Phone size={24} /></div>
                  <div>
                    <h4 className="method-title">Phone</h4>
                    <a href="tel:+919722768555" className="method-value hover-effect">+91 9722768555</a>
                  </div>
                </div>
                
                <div className="method-item">
                  <div className="method-icon indigo-text"><MapPin size={24} /></div>
                  <div>
                    <h4 className="method-title">Location</h4>
                    <p className="method-value">Surat, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="contact-form-wrapper">
            <form 
              ref={form} 
              onSubmit={sendEmail} 
              className="contact-form glass-panel spotlight-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name">Name</label>
                  <input type="text" id="user_name" name="user_name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Email</label>
                  <input type="email" id="user_email" name="user_email" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="status-msg success">
                  <CheckCircle size={18} /> Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="status-msg error">
                  <AlertCircle size={18} /> Something went wrong. Please try again.
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
