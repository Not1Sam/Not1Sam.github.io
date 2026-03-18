import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container animate-fade-in">
      <div className="bento-box notfound-box">
        <h1 className="notfound-title brand-font">404</h1>
        <h2 className="notfound-subtitle brand-font">Signal Lost.</h2>
        <p className="notfound-text">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="notfound-btn brand-font">
          Return to INIT →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
