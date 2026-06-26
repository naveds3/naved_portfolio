import React from 'react';
import { Box } from '@mui/material';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const DashboardTemplate = ({
  view,
  themeMode,
  onToggleTheme,
  activeSection,
  onSectionClick,
  onDownloadResume,
  portfolioContent,
  caseStudyContent
}) => {
  if (view === 'casestudy') {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color var(--transition-smooth), color var(--transition-smooth)' }}>
        {caseStudyContent}
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color var(--transition-smooth), color var(--transition-smooth)' }}>
      <Header
        activeSection={activeSection}
        onSectionClick={onSectionClick}
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
      />
      <main id="portfolio-main-view">
        {portfolioContent}
      </main>
      <Footer
        onDownloadResume={onDownloadResume}
        onSectionClick={onSectionClick}
      />
    </Box>
  );
};

export default DashboardTemplate;
