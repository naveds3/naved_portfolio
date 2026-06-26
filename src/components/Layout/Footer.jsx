import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = ({ onDownloadResume, onSectionClick }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    onSectionClick('#home');
  };

  return (
    <footer>
      <div className="footer-container">
        <a href="#home" className="footer-logo" onClick={handleLogoClick}>
          <span>N</span>S.
        </a>
        <div className="footer-socials">
          <a href="mailto:naveds3@gmail.com" className="social-link" title="Email Naved">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/naved-siddiqui-16b8981a/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn Profile">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="assets/Naved%20Siddiqui%20-%20Product%20Lead_Business%20Analyst.pdf"
            onClick={(e) => {
              e.preventDefault();
              onDownloadResume();
            }}
            className="social-link"
            title="Download Resume"
          >
            <i className="fa-solid fa-file-pdf"></i>
          </a>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Naved Siddiqui. All rights & information reserved.<br />
          Built from concept to deployment using AI. As a Product Lead, I focus on vision and execution—leveraging cutting-edge technology to turn ideas into reality without needing to write a single line of code.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
