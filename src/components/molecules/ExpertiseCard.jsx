import React from 'react';
import { Box, Typography } from '@mui/material';
import CardIcon from '../atoms/CardIcon';

const ExpertiseCard = ({ icon, title, desc, bullets }) => {
  return (
    <Box
      className="expertise-card"
      sx={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'all var(--transition-smooth)',
        '&:hover': {
          borderColor: 'rgba(20, 184, 166, 0.4)',
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
      <CardIcon icon={icon} />

      <Typography
        variant="h3"
        sx={{
          fontSize: '1.25rem',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {desc}
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem',
          marginTop: 'auto',
        }}
      >
        {bullets.map((bullet, idx) => (
          <Box
            component="li"
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
            }}
          >
            <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
            <span>{bullet}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExpertiseCard;
