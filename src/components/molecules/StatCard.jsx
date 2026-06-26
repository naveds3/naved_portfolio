import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const StatCard = ({ value, label, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      className="info-item"
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1.5rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all var(--transition-fast)',
        userSelect: 'none',
        '&:hover': {
          borderColor: 'rgba(20, 184, 166, 0.4)',
          transform: 'translateY(-2px)',
          boxShadow: 'var(--shadow)',
        },
      }}
    >
      <Typography
        className="info-val"
        sx={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--accent)',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      <Typography
        className="info-label"
        sx={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '0.25rem',
        }}
      >
        {label} <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ fontSize: '0.7rem', opacity: 0.7 }} />
      </Typography>

      {/* Inline list dropdown */}
      <Box
        sx={{
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '0.5rem',
          position: 'absolute',
          top: '105%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'max-content',
          minWidth: '220px',
          maxWidth: '300px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '0.75rem',
          zIndex: 100,
          boxShadow: 'var(--shadow)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking dropdown elements
      >
        {details.map((detail, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              textAlign: 'left',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          >
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent)', fontSize: '0.75rem' }} />
            <span>{detail}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StatCard;
