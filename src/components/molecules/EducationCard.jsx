import React from 'react';
import { Box, Typography } from '@mui/material';

const EducationCard = ({ school, degree, desc, date, icon, featured }) => {
  return (
    <Box className={`edu-card ${featured ? 'featured' : 'standard'}`}>
      <Box className="edu-card-icon-box">
        <i className={icon} />
      </Box>
      <Box className="edu-card-content">
        <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', mb: '0.25rem' }}>
          {school}
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--accent)', mb: '0.5rem' }}>
          {degree}
        </Typography>
        <Typography className="edu-meta" sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', mb: '0.75rem', lineHeight: 1.5 }}>
          {desc}
        </Typography>
        <span className="edu-date" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {date}
        </span>
      </Box>
    </Box>
  );
};

export default EducationCard;
