import React from 'react';
import { Box, Typography } from '@mui/material';

const CertCard = ({ file, title, org, orgIcon, logo, onPreview }) => {
  return (
    <Box
      className="cert-card"
      onClick={() => onPreview(`assets/certifications/${file}`, `Credential: ${title} (${org})`)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all var(--transition-smooth)',
        '&:hover': {
          borderColor: 'var(--cert-hover-border)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px var(--cert-hover-glow)',
          backgroundColor: 'var(--cert-hover-bg)',
          '& .cert-view-badge': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      }}
    >
      <Box
        className="cert-icon"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: logo ? '#ffffff' : 'var(--badge-bg)',
          border: '1px solid var(--border-color)',
          fontSize: '1rem',
          color: 'var(--text-muted)',
          overflow: 'hidden',
          transition: 'all var(--transition-fast)',
          flexShrink: 0,
        }}
      >
        {logo ? (
          <Box
            component="img"
            src={logo}
            alt={`${org} logo`}
            sx={{
              width: '65%',
              height: '65%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <i className="fa-solid fa-award" />
        )}
      </Box>
      <Box className="cert-info" sx={{ flexGrow: 1, textAlign: 'left' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '0.92rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            mb: '0.2rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          className="cert-org"
          sx={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {orgIcon && <i className={orgIcon} />} {org}
        </Typography>
      </Box>

      {/* Hover View Badge */}
      <Box
        className="cert-view-badge"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          backgroundColor: 'var(--cert-hover-text)',
          color: '#ffffff',
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          opacity: 0,
          transform: 'translateX(10px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <i className="fa-solid fa-eye" />
        <span>View</span>
      </Box>
    </Box>
  );
};

export default CertCard;
