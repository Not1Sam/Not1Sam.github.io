import React from 'react';
import './Homelab.css';

const Homelab = () => {
  const services = [
    { name: 'Arch Linux', desc: 'Daily Driver OS (I use Arch btw)' },
    { name: 'Unraid', desc: 'Core Server OS & Storage Array' },
    { name: 'Plex', desc: 'Media Streaming' },
    { name: 'Bitwarden', desc: 'Password Management' },
    { name: 'WireGuard VPN', desc: 'Secure Remote Access' },
    { name: 'Dev Containers', desc: 'Isolated Development' }
  ];

  return (
    <section className="lab-section align-center" id="lab">
      <div className="section-header animate-fade-in">
        <h2 className="section-title brand-font">Self-Hosted Homelab.</h2>
      </div>
      
      <div className="bento-grid lab-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="bento-box lab-description">
          <h3 className="lab-subtitle brand-font">Personal Infrastructure</h3>
          <p>
            I run a dedicated self-hosted server powered by <strong>Unraid</strong>. It acts as the backbone for my digital life and development workflow. 
            By leveraging <strong>Dev Containers</strong>, I can spin up isolated, reproducible environments directly on the server, keeping my local machines clean and lightweight.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Everything is securely tunneled through my own <strong>VPN</strong>, giving me access to my development environment and self-hosted apps from anywhere in the world.
          </p>
        </div>

        <div className="bento-box lab-services-box">
          <h3 className="lab-subtitle brand-font">Active Services</h3>
          <div className="services-list">
            {services.map((service, index) => (
              <div className="service-item" key={index}>
                <span className="service-name">{service.name}</span>
                <span className="service-desc">{service.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homelab;
