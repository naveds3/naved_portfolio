import React from 'react';
import { Box, Typography } from '@mui/material';

const ProjectCard = ({ id, title, date, category, banner, logo, illustration, description, bullets, initiatives, onViewCaseStudy }) => {
  const isOneColumn = !illustration;

  return (
    <Box className="project-showcase-container" sx={{ mb: '4rem' }}>
      {/* Banner Header */}
      {banner && (
        <Box className="project-banner-header">
          <img src={banner} alt={title} className="project-banner-img" loading="lazy" decoding="async" />
          <div className="banner-gradient-overlay"></div>
          {logo && (
            <div className="project-banner-logo-container">
              <img src={logo} alt="Project Logo" className="project-banner-logo" loading="lazy" decoding="async" />
            </div>
          )}
        </Box>
      )}

      <Box className="project-columns-grid" sx={{ display: 'grid', gridTemplateColumns: isOneColumn ? '1fr' : { xs: '1fr', lg: '1.2fr 0.8fr' }, gap: '2.5rem', p: { xs: '1.5rem', md: '2.5rem' } }}>
        {/* Left Column: Details */}
        <Box className="project-details-column" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {!banner && logo && (
            <Box className="project-brand-logo" sx={{ mb: '0.5rem' }}>
              <img src={logo} alt="Brand Logo" style={{ height: '38px', objectFit: 'contain', display: 'block' }} loading="lazy" decoding="async" />
            </Box>
          )}

          <Box className="project-meta-badges" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <span className="detail-badge date-badge">{date}</span>
            <span className="detail-badge title-badge">{category}</span>
            
            {/* View Case Study Button */}
            <a
              href={`?project=${id}`}
              onClick={(e) => {
                e.preventDefault();
                onViewCaseStudy(id);
              }}
              className={`project-case-study-btn ${id}-case-study-btn`}
              title={`View ${title} Case Study`}
            >
              {logo && <img src={logo} alt="Logo" className="btn-logo" loading="lazy" decoding="async" style={{ height: '14px', objectFit: 'contain' }} />}
              <span className="btn-text" data-default="Click to view Case Study" data-hover={`${id.charAt(0).toUpperCase() + id.slice(1)} - Case Study`}></span>
            </a>
          </Box>

          <Typography variant="h3" className="project-showcase-title" sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 800, color: 'var(--text-primary)', mt: '0.5rem' }}>
            {title}
          </Typography>

          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {description}
          </Typography>

          {/* Simple bullet points if provided */}
          {bullets && bullets.length > 0 && (
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', mt: '0.5rem' }}>
              {bullets.map((bullet, idx) => (
                <Box component="li" key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '4px' }} />
                  <span>{bullet}</span>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right Column: Visual illustration if provided */}
        {!isOneColumn && (
          <Box className="project-visual-column" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: { xs: '1rem', lg: 0 } }}>
            <Box className="visual-img-container diagram-container" sx={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: 'transparent' }}>
              <img src={illustration} alt="Project Illustration" className="visual-showcase-img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" decoding="async" />
              <div className="visual-glow-halo"></div>
            </Box>
          </Box>
        )}
      </Box>

      {/* Initiatives / Highlights Grid at Bottom */}
      {initiatives && initiatives.length > 0 && (
        <Box className="project-highlights-container" sx={{ p: { xs: '1.5rem', md: '0 2.5rem 2.5rem 2.5rem' } }}>
          <Box className="initiatives-stack" sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))', gap: '1.25rem' }}>
            {initiatives.map((item, idx) => (
              <Box
                key={idx}
                className="initiative-card"
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                  '&:hover': {
                    borderColor: 'rgba(20, 184, 166, 0.35)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  className="initiative-icon-box"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(20, 184, 166, 0.05)',
                    border: '1px solid rgba(20, 184, 166, 0.15)',
                    color: 'var(--accent)',
                    fontSize: '1.1rem',
                  }}
                >
                  <i className={`fa-solid ${item.icon}`} />
                </Box>
                <Box className="initiative-content">
                  <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', mb: '0.25rem' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProjectCard;
