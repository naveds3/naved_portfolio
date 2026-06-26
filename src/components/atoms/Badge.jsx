import React from 'react';
import { Box } from '@mui/material';

const Badge = ({ icon, text, sx = {} }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '50px',
        backgroundColor: 'var(--badge-bg)',
        border: '1px solid var(--badge-border)',
        color: 'var(--accent)',
        fontSize: '0.85rem',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        transition: 'all var(--transition-fast)',
        ...sx,
      }}
    >
      {icon && <i className={icon} />}
      <span>{text}</span>
    </Box>
  );
};

export default Badge;
