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
    // basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill all fields.' });
      return;
    }
    setStatus({ type: 'loading', message: 'Sending...' });
    setTimeout(() => setStatus({ type: 'success', message: 'Message sent. We will reply soon.' }), 900);
  }

  return (
    <div className="contact container">
      <h2>Contact Us</h2>
      <p>Have questions or need help planning your trek? Send us a message.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={handleChange} rows={6} />
        </label>

        <div className="actions">
          <button type="submit">Send Message</button>
        </div>

        {status && <div className={`status ${status.type}`}>{status.message}</div>}
      </form>
    </div>
  );
}

export default Contact;
