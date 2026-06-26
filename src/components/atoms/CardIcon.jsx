import React from 'react';
import { Box } from '@mui/material';

const CardIcon = ({ icon, sx = {} }) => {
  return (
    <Box
      className="card-icon-wrapper"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(20, 184, 166, 0.05)',
        border: '1px solid rgba(20, 184, 166, 0.15)',
        color: 'var(--accent)',
        fontSize: '1.5rem',
        transition: 'all var(--transition-fast)',
        ...sx,
      }}
    >
      <i className={icon} />
    </Box>
  );
};

export default CardIcon;
