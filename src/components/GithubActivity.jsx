import React, { useEffect, useState } from 'react';
import './GithubActivity.css';

const GithubActivity = () => {
  const [profile, setProfile] = useState(null);
  const [commits, setCommits] = useState('...');
  const [prs, setPrs] = useState('...');
  const [activityDays, setActivityDays] = useState(Array(60).fill(0));
  
  useEffect(() => {
    // 1. Fetch Profile (Repos, Followers)
    fetch('https://api.github.com/users/Not1Sam')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(console.error);

    // 2. Fetch Total Commits using Search API
    fetch('https://api.github.com/search/commits?q=author:Not1Sam', {
      headers: { 'Accept': 'application/vnd.github.cloak-preview' }
    })
      .then(res => res.json())
      .then(data => setCommits(data.total_count || 0))
      .catch(console.error);

    // 3. Fetch Total PRs using Search API
    fetch('https://api.github.com/search/issues?q=author:Not1Sam+type:pr')
      .then(res => res.json())
      .then(data => setPrs(data.total_count || 0))
      .catch(console.error);

    // 4. Fetch Events for the Heatmap (last 90 days usually returned, we just want frequency)
    fetch('https://api.github.com/users/Not1Sam/events/public?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        
        // Create an array of 60 days
        const heatmap = Array(60).fill(0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        data.forEach(event => {
          const eventDate = new Date(event.created_at);
          eventDate.setHours(0,0,0,0);
          
          // Calculate difference in days from today
          const diffTime = Math.abs(today - eventDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays < 60) {
            // Map the past 60 days to our 60-cell grid (index 59 is today, 0 is 60 days ago)
            const mapIndex = 59 - diffDays;
            heatmap[mapIndex] += 1; // Increase activity intensity
          }
        });

        // Normalize the heatmap to 0-4 levels for CSS classes
        const maxActivity = Math.max(...heatmap, 1);
        const normalizedHeatmap = heatmap.map(val => {
          if (val === 0) return 0;
          return Math.ceil((val / maxActivity) * 4);
        });

        setActivityDays(normalizedHeatmap);
      })
      .catch(console.error);

  }, []);

  return (
    <div className="github-activity-container animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="activity-header">
        <span className="activity-label fluo-text">ACTIVITY MONITOR</span>
        <h2 className="activity-title brand-font">GitHub.</h2>
      </div>

      <div className="bento-box activity-map-box">
        <div className="map-top">
          <div className="real-time-badge fluo-text">
            <span className="fluo-dot pulse"></span>
            REAL-TIME ACTIVITY
          </div>
          <div className="days-label">LAST 60 DAYS</div>
        </div>

        <div className="heatmap-grid">
          {activityDays.map((level, i) => (
            <div 
              key={i} 
              className={`heatmap-cell level-${level} ${i === 59 ? 'highlighted-cell' : ''}`} 
            ></div>
          ))}
        </div>

        <div className="map-legend">
          <span className="legend-label">MORE INACTIVE</span>
          <div className="legend-swatches">
            <div className="heatmap-cell level-1"></div>
            <div className="heatmap-cell level-2"></div>
            <div className="heatmap-cell level-3"></div>
            <div className="heatmap-cell level-4"></div>
          </div>
          <span className="legend-label">MORE ACTIVE</span>
        </div>
      </div>

      <div className="activity-stats-grid">
        <div className="bento-box stats-box">
          <span className="stats-label">TOTAL COMMITS</span>
          <span className="stats-value brand-font">{commits}</span>
        </div>
        <div className="bento-box stats-box">
          <span className="stats-label">PULL REQUESTS</span>
          <span className="stats-value brand-font">{prs}</span>
        </div>
        <div className="bento-box stats-box">
          <span className="stats-label">REPOSITORIES</span>
          <span className="stats-value brand-font">{profile ? profile.public_repos : '...'}</span>
        </div>
        <div className="bento-box stats-box">
          <span className="stats-label">FOLLOWERS</span>
          <span className="stats-value brand-font">{profile ? profile.followers : '...'}</span>
        </div>
      </div>
    </div>
  );
};

export default GithubActivity;
