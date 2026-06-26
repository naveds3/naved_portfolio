import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Badge from '../atoms/Badge';
import StatCard from '../molecules/StatCard';

const Hero = ({ personal, onEmailCta, onDownloadResume }) => {
  if (!personal) return null;

  return (
    <section id="home" className="hero" style={{ position: 'relative' }}>
      <Box className="hero-content" sx={{ textAlign: 'left' }}>
        <Typography component="span" className="hero-intro" sx={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', mb: '1rem' }}>
          Welcome to my Portfolio
        </Typography>
        
        <Typography variant="h1" className="hero-name" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, mb: '0.5rem' }}>
          {personal.name}
        </Typography>

        <Box className="hero-title" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', mb: '1rem' }}>
          Product Lead <Box component="span" sx={{ color: 'var(--accent)' }}>|</Box> Senior Business Analyst
        </Box>

        <Box className="hero-location" sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem', mb: '1.5rem' }}>
          <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }}></i> {personal.location}
        </Box>

        {/* Badges container */}
        <Box className="badge-container" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', mb: '2rem' }}>
          {personal.badges.map((badge, idx) => (
            <Badge key={idx} icon={badge.icon} text={badge.text} />
          ))}
        </Box>

        <Typography
          sx={{
            color: 'var(--text-secondary)',
            maxWidth: '1100px',
            lineHeight: 1.7,
            textAlign: 'justify',
            fontSize: '0.98rem',
            mb: '2.5rem',
            whiteSpace: 'pre-line'
          }}
        >
          {personal.bio}
        </Typography>

        {/* Action Buttons */}
        <Box className="hero-cta" sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', mb: '3rem' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onEmailCta}
            id="email-cta"
            className="btn btn-primary"
            startIcon={<i className="fa-solid fa-envelope" />}
            sx={{ boxShadow: '0 4px 15px var(--accent-glow)' }}
          >
            {personal.email}
          </Button>

          <Button
            variant="outlined"
            component="a"
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="linkedin-cta"
            className="btn btn-secondary"
            startIcon={<i className="fa-brands fa-linkedin" />}
            sx={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', '&:hover': { borderColor: 'var(--accent)', backgroundColor: 'rgba(20, 184, 166, 0.05)' } }}
          >
            LinkedIn
          </Button>

          <Button
            variant="outlined"
            onClick={onDownloadResume}
            id="cv-cta"
            className="btn btn-secondary"
            startIcon={<i className="fa-solid fa-file-pdf" />}
            sx={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', '&:hover': { borderColor: 'var(--accent)', backgroundColor: 'rgba(20, 184, 166, 0.05)' } }}
          >
            Download Resume
          </Button>
        </Box>

        {/* Stats Section */}
        <Box className="hero-infobar" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '1.5rem', maxWidth: '800px' }}>
          {personal.stats.map((stat) => (
            <StatCard key={stat.id} value={stat.value} label={stat.label} details={stat.details} />
          ))}
        </Box>
      </Box>

      {/* Profile Image container */}
      <Box className="hero-image-container" sx={{ position: 'relative' }}>
        <Box className="profile-glow"></Box>
        <Box className="profile-frame">
          <img src={personal.avatar} alt={`${personal.name} portrait`} id="profile-img" decoding="async" fetchpriority="high" />
        </Box>
      </Box>
    </section>
  );
};

export default Hero;
