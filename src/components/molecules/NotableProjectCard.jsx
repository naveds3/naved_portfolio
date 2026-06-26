import React from 'react';
import { Box, Typography } from '@mui/material';
import CardIcon from '../atoms/CardIcon';

const NotableProjectCard = ({ icon, title, date, desc, tags }) => {
  return (
    <Box
      className="contribution-card highlights-po"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: tags ? '310px' : '250px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        transition: 'all var(--transition-smooth)',
        '&:hover': {
          borderColor: 'var(--accent)',
          transform: 'translateY(-5px)',
          boxShadow: 'var(--shadow)',
          '& .card-icon-wrapper': {
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            boxShadow: '0 4px 15px var(--accent-glow)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <CardIcon icon={icon} sx={{ width: '3rem', height: '3rem', fontSize: '1.25rem' }} />
        <span className="detail-badge date-badge" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>
          {date}
        </span>
      </Box>

      <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
        <Box sx={{ mb: tags ? '1rem' : 0 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.15rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              mb: '0.75rem',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            {desc}
          </Typography>
        </Box>

        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {tags.map((tag, idx) => (
              <Box
                component="span"
                key={idx}
                sx={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  color: 'var(--text-muted)',
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NotableProjectCard;
