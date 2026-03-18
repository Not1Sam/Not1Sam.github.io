import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('custom_blogs') || '[]');
    setBlogs(saved);
  }, []);

  return (
    <main className="blog-container">
      <section className="blog-content animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="section-header">
          <h1 className="blog-title brand-font">Dev<br/>Logs.</h1>
          <p className="blog-subtitle">Thoughts, tutorials, and engineering rants.</p>
        </div>

        {blogs.length === 0 ? (
          <div className="bento-box empty-blog">
            <p>No transmissions found. Head to the <a href="/admin" className="fluo-text">Admin panel</a> to write the first log.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((b, index) => (
              <article key={b.id} className="bento-box blog-card animate-fade-in" style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}>
                <span className="blog-date fluo-text">{b.date}</span>
                <h2 className="blog-post-title brand-font">{b.title}</h2>
                <p className="blog-excerpt">{b.excerpt}</p>
                <button className="read-more-btn">Read full log →</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;
