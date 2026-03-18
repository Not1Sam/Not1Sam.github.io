import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Not1Sam/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        const filteredData = data.filter(repo => !repo.fork);
        setProjects(filteredData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner"></div>;

  return (
    <section className="projects-section" id="projects">
      <div className="section-header animate-fade-in">
        <h2 className="section-title brand-font">Selected Work.</h2>
        <a href="https://github.com/Not1Sam" target="_blank" rel="noreferrer" className="section-link">All projects →</a>
      </div>
      
      <div className="projects-grid bento-layout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
