import React from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill all fields.' });
      return;
    }
    setStatus({ type: 'loading', message: 'Sending...' });
    setTimeout(() => setStatus({ type: 'success', message: 'Message sent! We will reply within 24 hours.' }), 900);
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>📧 Contact Us</h1>
          <p>Have questions or need help planning your trek? We're here to help!</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Whether you need trek recommendations, have questions about our AI features, or want to share feedback, we'd love to hear from you.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <h3>📧 Email</h3>
                <p>hello@trekmate.com</p>
              </div>
              <div className="contact-method">
                <h3>💬 Response Time</h3>
                <p>Within 24 hours</p>
              </div>
              <div className="contact-method">
                <h3>🌍 Coverage</h3>
                <p>Worldwide trek support</p>
              </div>
            </div>

            <div className="faq-section">
              <h3>Quick Questions?</h3>
              <ul>
                <li>Try our AI Assistant for instant help</li>
                <li>Check our About page for feature details</li>
                <li>Browse treks to see what we offer</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send us a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  id="name"
                  name="name" 
                  type="text"
                  value={form.name} 
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  name="email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  name="message" 
                  value={form.message} 
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={status?.type === 'loading'}>
                {status?.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <div className={`status status--${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
