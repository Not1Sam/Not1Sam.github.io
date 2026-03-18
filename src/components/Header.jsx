import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="header-nav animate-fade-in">
      <div className="nav-header-row">
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>[ not1sam ]</Link>
        </div>
        <button 
          className="mobile-menu-btn brand-font" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '[ close ]' : '[ menu ]'}
        </button>
      </div>
      
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ThemeSwitcher />
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >[ init ]</NavLink>
        <NavLink
          to="/stack"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >[ stack ]</NavLink>
        <NavLink
          to="/projects"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >[ projects ]</NavLink>
        <NavLink
          to="/blog"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >[ logs ]</NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >[ contact ]</NavLink>
        <Link to="/admin" onClick={closeMenu} className={isActive('/admin')} style={{ marginLeft: '1rem', color: 'var(--text-secondary)' }}>⚙️</Link>
      </div>
    </nav>
  );
};

export default Header;