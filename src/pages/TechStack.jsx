import React from 'react';
import '../styles/TechStack.css';

const TechStack = () => {
  const stack = {
    languages: ["JavaScript", "TypeScript", "C++", "Python", "PHP", "C"],
    frontend: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Prisma ORM", "REST APIs"],
    devops_tools: ["Docker", "Unraid", "Nginx", "Git", "Dev Containers"]
  };

  return (
    <div className="stack-container">
      <section className="stack-content animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="section-header">
          <h1 className="stack-title brand-font">Tech <br/>Stack.</h1>
          <p className="stack-subtitle">The languages, frameworks, and tools powering my projects.</p>
        </div>

        <div className="bento-grid stack-grid">
          
          <div className="bento-box stack-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="stack-category brand-font">Languages</h3>
            <div className="badge-list">
              {stack.languages.map(tech => (
                <span className="pill-badge tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="bento-box stack-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="stack-category brand-font">Frontend</h3>
            <div className="badge-list">
              {stack.frontend.map(tech => (
                <span className="pill-badge tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="bento-box stack-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="stack-category brand-font">Backend & DB</h3>
            <div className="badge-list">
              {stack.backend.map(tech => (
                <span className="pill-badge tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="bento-box stack-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="stack-category brand-font">Infrastructure & Tools</h3>
            <div className="badge-list">
              {stack.devops_tools.map(tech => (
                <span className="pill-badge tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TechStack;
