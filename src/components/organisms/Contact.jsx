import React from 'react';
import { Box, Typography } from '@mui/material';

const Contact = ({ personal, onEmailCta }) => {
  if (!personal) return null;

  return (
    <section id="contact" className="contact-section reveal active" style={{ position: 'relative' }}>
      {/* Decorative background blur sphere */}
      <div className="contact-glow-sphere"></div>

      <Box className="section-header" sx={{ position: 'relative', zIndex: 2, textAlign: 'left', mb: '1.5rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Let's Connect
        </Typography>
      </Box>

      <Typography className="contact-subtitle" sx={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '800px', mb: '3rem', position: 'relative', zIndex: 2 }}>
        Open to exciting opportunities in Product Management, Business Analysis, and Digital Transformation across global markets.
      </Typography>

      <Box className="contact-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: '1.25rem', position: 'relative', zIndex: 2 }}>
        
        {/* Card 1: Email */}
        <Box
          className="contact-card"
          id="contact-email-card"
          onClick={onEmailCta}
          title="Click to copy email and send mail"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              borderColor: 'var(--accent)',
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow)',
            },
          }}
        >
          <Box className="contact-card-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box className="contact-card-icon" sx={{ color: 'var(--accent)', fontSize: '1.15rem' }}>
              <i className="fa-solid fa-envelope"></i>
            </Box>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Email
            </Typography>
          </Box>
          <Typography className="contact-card-body" sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, overflowWrap: 'anywhere' }}>
            {personal.email}
          </Typography>
        </Box>

        {/* Card 2: Phone */}
        <Box
          component="a"
          href={`tel:${personal.phone}`}
          className="contact-card"
          title="Click to make a call"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              borderColor: 'var(--accent)',
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow)',
            },
          }}
        >
          <Box className="contact-card-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box className="contact-card-icon" sx={{ color: 'var(--accent)', fontSize: '1.15rem' }}>
              <i className="fa-solid fa-phone"></i>
            </Box>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Phone
            </Typography>
          </Box>
          <Typography className="contact-card-body" sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {personal.phone}
          </Typography>
        </Box>

        {/* Card 3: Location */}
        <Box
          className="contact-card"
          title="Location Details"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            textAlign: 'left',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              borderColor: 'var(--accent)',
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow)',
            },
          }}
        >
          <Box className="contact-card-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box className="contact-card-icon" sx={{ color: 'var(--accent)', fontSize: '1.15rem' }}>
              <i className="fa-solid fa-location-dot"></i>
            </Box>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Location
            </Typography>
          </Box>
          <Typography className="contact-card-body" sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {personal.location}
          </Typography>
        </Box>

        {/* Card 4: LinkedIn */}
        <Box
          component="a"
          href={personal.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          title="Click to view LinkedIn profile"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              borderColor: 'var(--accent)',
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow)',
            },
          }}
        >
          <Box className="contact-card-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box className="contact-card-icon" sx={{ color: 'var(--accent)', fontSize: '1.15rem' }}>
              <i className="fa-brands fa-linkedin-in"></i>
            </Box>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              LinkedIn
            </Typography>
          </Box>
          <Typography className="contact-card-body" sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, overflowWrap: 'anywhere' }}>
            {personal.linkedin}
          </Typography>
        </Box>

      </Box>
    </section>
  );
};

export default Contact;
