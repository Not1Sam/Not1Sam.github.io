import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to our 'backend' (localStorage)
    const newMessage = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toLocaleString()
    };
    const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    localStorage.setItem('contact_messages', JSON.stringify([newMessage, ...existing]));

    // Simulate network delay
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <main className="contact-container">
      <section className="contact-content animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="section-header">
          <h1 className="contact-title brand-font">Let's Talk.</h1>
          <p className="contact-subtitle">Have a project in mind, or just want to say hi? Drop a message below.</p>
        </div>

        <div className="bento-box contact-box animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {submitted ? (
            <div className="success-message">
              <h3 className="brand-font fluo-text">Message Protocol Initiated.</h3>
              <p>Thanks for reaching out! I'll get back to you as soon as my compiler finishes.</p>
              <button className="submit-btn" onClick={() => setSubmitted(false)}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group message-group">
                <label htmlFor="message">MESSAGE</label>
                <textarea 
                  id="message" 
                  required 
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn brand-font">
                SEND TRANSMISSION →
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;
