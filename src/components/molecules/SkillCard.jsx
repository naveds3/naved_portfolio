import React from 'react';
import { Box, Typography } from '@mui/material';

const SkillCard = ({ icon, name, desc }) => {
  return (
    <Box
      className="skill-card"
      sx={{
        display: 'flex',
        gap: '1.25rem',
        padding: '1.25rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        transition: 'all var(--transition-fast)',
        '&:hover': {
          borderColor: 'rgba(20, 184, 166, 0.35)',
          transform: 'translateY(-2px)',
          boxShadow: 'var(--shadow)',
          '& .skill-card-icon': {
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            boxShadow: '0 4px 15px var(--accent-glow)',
          },
        },
      }}
    >
      <Box
        className="skill-card-icon"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          minWidth: '3rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(20, 184, 166, 0.05)',
          border: '1px solid rgba(20, 184, 166, 0.15)',
          color: 'var(--accent)',
          fontSize: '1.2rem',
          transition: 'all var(--transition-fast)',
        }}
      >
        <i className={icon} />
      </Box>
      <Box className="skill-card-info" sx={{ textAlign: 'left' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '1.05rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            mb: '0.35rem',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default SkillCard;
