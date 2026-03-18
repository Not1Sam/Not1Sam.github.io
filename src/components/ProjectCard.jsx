import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  return (
    <a 
      href={project.html_url} 
      target="_blank" 
      rel="noreferrer" 
      className="bento-box project-card animate-fade-in"
      style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
    >
      <div className="project-content">
        <h3 className="project-title brand-font">{project.name}</h3>
        <p className="project-description">
          {project.description || "No description provided. Check out the repository for more details."}
        </p>
      </div>
      
      <div className="project-footer">
        {project.language && (
          <span className="pill-badge project-language">
            {project.language}
          </span>
        )}
        <span className="project-stars pill-badge">
          ★ {project.stargazers_count}
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
