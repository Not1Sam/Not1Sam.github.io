import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('blogs');

  // States for Blog Form
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  
  const [message, setMessage] = useState('');
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('admin_token') === 'true') {
      setIsAuthenticated(true);
      loadInbox();
    }
  }, []);

  const loadInbox = () => {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setInbox(messages);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_token', 'true');
      setLoginError('');
      loadInbox();
    } else {
      setLoginError('ACCESS DENIED. INVALID CREDENTIALS.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      title: blogTitle,
      excerpt: blogExcerpt,
      content: blogContent,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    const existing = JSON.parse(localStorage.getItem('custom_blogs') || '[]');
    localStorage.setItem('custom_blogs', JSON.stringify([newBlog, ...existing]));
    
    setBlogTitle(''); setBlogExcerpt(''); setBlogContent('');
    setMessage('Blog post added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <main className="admin-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="bento-box login-box" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 className="brand-font" style={{ marginBottom: '1rem' }}>Admin System.</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Authentication Required</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter passcode..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
            {loginError && <span style={{ color: 'red', fontSize: '0.85rem' }}>{loginError}</span>}
            <button className="submit-btn brand-font" type="submit" style={{ width: '100%' }}>LOGIN →</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-container animate-fade-in">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-title brand-font">System Admin.</h1>
          <p className="admin-subtitle fluo-text">Local Storage CMS</p>
        </div>
        <button onClick={handleLogout} className="submit-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', marginTop: '0' }}>LOGOUT</button>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'blogs' ? 'active-tab' : ''}`} onClick={() => setActiveTab('blogs')}>Blogs</button>
        <button className={`tab-btn ${activeTab === 'inbox' ? 'active-tab' : ''}`} onClick={() => { setActiveTab('inbox'); loadInbox(); }}>
          Inbox {inbox.length > 0 && <span style={{ color: 'var(--accent-fluo)' }}>({inbox.length})</span>}
        </button>
      </div>

      {message && <div className="admin-toast fluo-text">{message}</div>}

      <div className="bento-box admin-box">
        {activeTab === 'blogs' && (
          <form className="admin-form" onSubmit={handleAddBlog}>
            <h2 className="brand-font">Publish Blog Post</h2>
            <div className="form-group">
              <label>POST TITLE</label>
              <input type="text" required value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>SHORT EXCERPT</label>
              <textarea required rows="2" value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>FULL CONTENT (Markdown allowed)</label>
              <textarea required rows="10" value={blogContent} onChange={e => setBlogContent(e.target.value)}></textarea>
            </div>
            <button type="submit" className="submit-btn brand-font">PUBLISH POST</button>
          </form>
        )}

        {activeTab === 'inbox' && (
          <div className="inbox-container">
            <h2 className="brand-font" style={{ marginBottom: '2rem' }}>Incoming Transmissions</h2>
            {inbox.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No messages found in the databanks.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {inbox.map((msg) => (
                  <div key={msg.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '0px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <strong className="brand-font" style={{ textTransform: 'uppercase' }}>{msg.name}</strong>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className="fluo-text" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{msg.date}</span>
                        <button 
                          onClick={() => {
                            const newInbox = inbox.filter(m => m.id !== msg.id);
                            localStorage.setItem('contact_messages', JSON.stringify(newInbox));
                            setInbox(newInbox);
                          }}
                          style={{ background: 'transparent', color: 'red', border: '1px solid red', padding: '0.2rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'monospace' }}
                        >
                          [ DELETE ]
                        </button>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'monospace' }}>{msg.email}</p>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.9rem' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
