import React from 'react';
import { Box, Typography } from '@mui/material';

const ToolCard = ({ icon, name, category, desc, badges }) => {
  return (
    <Box
      className="tech-tool-card"
      sx={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'all var(--transition-fast)',
        '&:hover': {
          borderColor: 'rgba(20, 184, 166, 0.35)',
          transform: 'translateY(-4px)',
          boxShadow: 'var(--shadow)',
          '& .tech-tool-icon': {
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            boxShadow: '0 4px 15px var(--accent-glow)',
          },
        },
      }}
    >
      <Box className="tech-tool-header" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Box
          className="tech-tool-icon"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '8px',
            backgroundColor: 'rgba(20, 184, 166, 0.05)',
            border: '1px solid rgba(20, 184, 166, 0.15)',
            color: 'var(--accent)',
            fontSize: '1.15rem',
            transition: 'all var(--transition-fast)',
          }}
        >
          <i className={icon} />
        </Box>
        <Box className="tech-tool-title" sx={{ textAlign: 'left' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            {name}
          </Typography>
          <Typography
            className="tool-category"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginTop: '2px',
            }}
          >
            {category}
          </Typography>
        </Box>
      </Box>

      <Typography
        className="tech-tool-desc"
        sx={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          textAlign: 'left',
        }}
      >
        {desc}
      </Typography>

      <Box
        className="tech-tool-badges"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginTop: 'auto',
        }}
      >
        {badges.map((badge, idx) => (
          <Box
            component="span"
            className="tool-badge"
            key={idx}
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '0.25rem 0.5rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-muted)',
            }}
          >
            {badge}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ToolCard;
