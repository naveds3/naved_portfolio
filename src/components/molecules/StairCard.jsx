import React from 'react';
import { Box, Typography } from '@mui/material';

const StairCard = ({ role, company, date, summary, bullets, isCurrent }) => {
  return (
    <Box className="stair-item">
      <Box className={`stair-card${isCurrent ? ' current' : ''}`}>
        <Box className="stair-badge">
          {role}
        </Box>
        <Typography className="stair-date" sx={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>
          {date}
        </Typography>
        <Typography variant="h4" className="company-name" sx={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          {company}
        </Typography>
        <Typography className="role-summary" sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
          {summary}
        </Typography>
        <Box component="ul" className="role-bullets" sx={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {bullets.map((bullet, idx) => (
            <Box component="li" key={idx} sx={{ position: 'relative', paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, '&::before': { content: '""', position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' } }}>
              {bullet}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StairCard;
