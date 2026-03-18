import React, { useState, useEffect } from 'react';
import GithubActivity from './GithubActivity';
import './Hero.css';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Not1Sam')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const fullTitle = "[ software\n  engineer ]";
  const fullSubtitle = "building dry, structured software. homelab enthusiast.";

  useEffect(() => {
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      setTitleText(fullTitle.substring(0, titleIndex));
      titleIndex++;
      if (titleIndex > fullTitle.length) {
        clearInterval(titleInterval);
        
        // Start subtitle after title finishes
        let subIndex = 0;
        const subInterval = setInterval(() => {
          setSubtitleText(fullSubtitle.substring(0, subIndex));
          subIndex++;
          if (subIndex > fullSubtitle.length) clearInterval(subInterval);
        }, 30);
      }
    }, 80);
    
    return () => clearInterval(titleInterval);
  }, []);

  return (
    <section className="hero-container animate-fade-in">
      <div className="hero-content">
        <h1 className="hero-title brand-font">
          {titleText.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
          <span className="cursor-blink">_</span>
        </h1>
        <p className="hero-subtitle">{subtitleText}</p>
        <a href="https://github.com/Not1Sam" target="_blank" rel="noreferrer" className="hero-cta">
          Let's Connect →
        </a>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : profile ? (
        <div className="bento-grid hero-stats">
          <div className="bento-box stat-box">
            <span className="stat-label">Location</span>
            <span className="stat-value">Morocco 🇲🇦</span>
          </div>
          <div className="bento-box stat-box">
            <span className="stat-label">Currently building</span>
            <span className="stat-value">Open Source · Next Gen Tools</span>
          </div>
          <div className="bento-box stat-box">
            <span className="stat-label">Repositories</span>
            <span className="stat-value">{profile.public_repos}+ Projects</span>
          </div>
          <div className="bento-box stat-box">
            <span className="stat-label">Followers</span>
            <span className="stat-value">{profile.followers} Connections</span>
          </div>
        </div>
      ) : null}

      <GithubActivity />
    </section>
  );
};

export default Hero;
