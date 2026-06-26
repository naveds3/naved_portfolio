import React, { useState } from 'react';
import { Box } from '@mui/material';

const Header = ({ activeSection, onSectionClick, themeMode, onToggleTheme }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { label: 'Home', target: '#home' },
    { label: 'Domain Expertise', target: '#expertise' },
    { label: 'Summary', target: '#summary' },
    { label: 'Career Journey', target: '#career' },
    { label: 'Projects', target: '#projects' },
    { label: 'Skills', target: '#skills' },
    { label: 'Education', target: '#education' },
    { label: 'Contact', target: '#contact' },
  ];

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setIsMobileOpen(false);
    onSectionClick(target);
  };

  return (
    <header id="site-header">
      <div className="nav-container">
        <a href="#home" className="logo-profile-container" id="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <img src="assets/naved_profile.png" alt="Naved Siddiqui" className="header-logo-img" decoding="async" />
        </a>

        <ul className={`nav-menu${isMobileOpen ? ' open' : ''}`} id="nav-menu">
          {menuItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <li key={item.target}>
                <a
                  href={item.target}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.target)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle */}
          <button className="theme-toggle-btn" id="theme-toggle" onClick={onToggleTheme} aria-label="Toggle dark/light theme">
            <i className={`fa-solid ${themeMode === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <i className={`fa-solid ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
