import React, { useEffect, useState } from 'react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'purple', label: 'Purple' }
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const activeIndex = themes.findIndex(t => t.id === theme) !== -1 ? themes.findIndex(t => t.id === theme) : 0;

  return (
    <div className="theme-slider-container">
      <div 
        className="theme-slider-thumb" 
        style={{ transform: `translateX(${activeIndex * 100}%)` }} 
      />
      {themes.map((t) => (
        <button 
          key={t.id}
          className={`theme-slider-btn ${theme === t.id ? 'active' : ''}`}
          onClick={() => setTheme(t.id)}
          aria-label={`${t.label} Theme`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
