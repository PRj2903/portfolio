import React, { useRef, useState } from 'react';
import './Contact.css';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Copy, Check, Send, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ScrollReveal from './ScrollReveal';
import { triggerConfetti } from '../utils/confetti';
import { useToast } from './Toast';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { addToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Jpratham9716@gmail.com');
    setCopiedEmail(true);
    addToast({
      title: 'Email Copied',
      message: 'Jpratham9716@gmail.com copied to clipboard',
      type: 'success',
    });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+919722768555');
    setCopiedPhone(true);
    addToast({
      title: 'Phone Copied',
      message: '+91 9722768555 copied to clipboard',
      type: 'success',
    });
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const [lastSubmission, setLastSubmission] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(form.current);
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    setLastSubmission(data);

    // 8-second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus('success');
        form.current.reset();
        setLastSubmission(null);
        triggerConfetti();
        addToast({
          title: 'Message Delivered',
          message: 'Your inquiry has been sent directly to Pratham.',
          type: 'sparkle',
          duration: 6000,
        });
        setTimeout(() => setStatus(''), 8000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Server is unavailable.');
        addToast({
          title: 'Direct Dispatch Ready',
          message: 'Click below to send via your Email app or WhatsApp.',
          type: 'error',
          duration: 6000,
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('API submission notice:', error);
      setStatus('error');
      setErrorMessage(error.name === 'AbortError' ? 'Connection timed out.' : 'Server offline.');
      addToast({
        title: 'Direct Dispatch Ready',
        message: 'Click below to send via your Email app or WhatsApp.',
        type: 'error',
        duration: 6000,
      });
    }
  };

  const openDirectEmail = () => {
    if (!lastSubmission) return;
    const { user_name, user_email, subject, message } = lastSubmission;
    const bodyText = `Hi Pratham,\n\n${message}\n\nFrom: ${user_name}\nEmail: ${user_email}`;
    const mailtoUrl = `mailto:Jpratham9716@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(bodyText)}`;
    window.open(mailtoUrl, '_blank');
  };

  const openDirectWhatsApp = () => {
    if (!lastSubmission) return;
    const { user_name, user_email, subject, message } = lastSubmission;
    const text = `Hi Pratham, I reached out via your portfolio:\n*Name:* ${user_name}\n*Email:* ${user_email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const waUrl = `https://wa.me/919722768555?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <ScrollReveal variant="fade-down">
          <div className="section-header">
            <p className="section-subtitle">
              <Sparkles size={15} /> Open Communications
            </p>
            <h2 className="section-title">Let&apos;s Build Something Extraordinary</h2>
          </div>
        </ScrollReveal>

        <div className="contact-content-grid">
          {/* Left: Contact Channels */}
          <ScrollReveal className="contact-info-panel">
            <div className="contact-info-inner">
              <h3 className="contact-panel-title">Direct Reach &amp; Inquiry</h3>
              <p className="contact-panel-desc">
                Whether you are looking to build a high-performance <strong>Flutter mobile app</strong>, architect a bespoke <strong>client website</strong>, or discuss engineering roles, feel free to reach out.
              </p>

              <div className="contact-methods-stack">
                {/* Email Item */}
                <div className="contact-channel-card glass-panel">
                  <div className="channel-icon-box">
                    <Mail size={18} className="indigo-text" />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Email Direct</span>
                    <a href="mailto:Jpratham9716@gmail.com" className="channel-value">
                      Jpratham9716@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="copy-channel-btn"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                  </button>
                </div>

                {/* WhatsApp & Phone Item */}
                <div className="contact-channel-card glass-panel">
                  <div className="channel-icon-box">
                    <Phone size={18} className="indigo-text" />
                  </div>
                  <div className="channel-text">
                    <div className="channel-label-row">
                      <span className="channel-label">Phone &amp; WhatsApp</span>
                      <span className="wa-chip">
                        <FaWhatsapp size={11} /> Fast Reply
                      </span>
                    </div>
                    <a href="tel:+919722768555" className="channel-value">
                      +91 9722768555
                    </a>
                  </div>
                  <div className="channel-actions">
                    <a
                      href="https://wa.me/919722768555?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="copy-channel-btn wa-btn"
                      title="Chat on WhatsApp"
                      aria-label="Chat on WhatsApp"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="copy-channel-btn"
                      title="Copy Phone"
                      aria-label="Copy Phone"
                    >
                      {copiedPhone ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>

                {/* Location Item */}
                <div className="contact-channel-card glass-panel">
                  <div className="channel-icon-box">
                    <MapPin size={18} className="indigo-text" />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Location</span>
                    <p className="channel-value">Surat, Gujarat, India (Open to Remote)</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal delay={100} className="contact-form-panel">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="editorial-form glass-panel"
            >
              <div className="form-fields-row">
                <div className="form-field-group">
                  <label htmlFor="user_name">Your Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
                <div className="form-field-group">
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

              <div className="form-field-group">
                <label htmlFor="subject">Subject / Project Scope</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Mobile App / Client Website Project"
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe your project vision, timeline, or engineering inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-channel-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  'Dispatching...'
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-status-alert success">
                  <CheckCircle size={16} /> Message sent successfully! I will get back to you promptly.
                </div>
              )}

              {status === 'error' && (
                <div className="form-status-alert error">
                  <div className="error-alert-header">
                    <AlertCircle size={16} /> {errorMessage || 'Server unreachable'}. Dispatch directly:
                  </div>
                  <div className="fallback-actions-row">
                    <button
                      type="button"
                      onClick={openDirectEmail}
                      className="fallback-dispatch-btn"
                    >
                      <Mail size={14} /> Open in Mail App
                    </button>
                    <button
                      type="button"
                      onClick={openDirectWhatsApp}
                      className="fallback-dispatch-btn"
                    >
                      <FaWhatsapp size={14} /> Send via WhatsApp
                    </button>
                  </div>
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
