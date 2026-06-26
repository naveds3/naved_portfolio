import React from 'react';
import { Box, Typography } from '@mui/material';
import StairCard from '../molecules/StairCard';
import AwardCarousel from '../molecules/AwardCarousel';

const Career = ({ career, onPreview, onViewCaseStudy }) => {
  if (!career) return null;

  return (
    <section id="career" className="career-section reveal active">
      <Box className="section-header" sx={{ textAlign: 'left', mb: '2.5rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Career Journey
        </Typography>
      </Box>

      {/* Stairs Timeline */}
      <Box className="stairs-container">
        {career.steps.map((step, idx) => (
          <StairCard
            key={idx}
            role={step.role}
            company={step.company}
            date={step.date}
            summary={step.summary}
            bullets={step.bullets}
            isCurrent={step.isCurrent}
          />
        ))}
      </Box>

      {/* Detailed Current Role Highlight (Tarento Group) */}
      <Box className="current-role-details" sx={{ textAlign: 'left' }}>
        <Box className="role-details-header" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: '1rem', mb: '1.5rem' }}>
          <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Tarento Group
          </Typography>
          <Box className="role-details-badges" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="detail-badge date-badge">April 2020 – Present</span>
            <span className="detail-badge title-badge">Product Lead | Senior Business Analyst</span>
          </Box>
        </Box>

        <Typography className="role-details-intro" sx={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7, mb: '2rem' }}>
          Led diverse projects across e-commerce, real estate, government services, and healthcare – with a strong focus on <strong>Supply Chain Management (SCM) domain leadership</strong>, delivering OMS/ERP modernisation and global supply chain transformation across complex environments.
        </Typography>

        {/* Detailed Projects Grid */}
        <Box className="role-projects-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: '1.5rem', mb: '3rem' }}>
          {/* Project 1: Cellmark */}
          <Box className="project-detail-card" sx={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-left-border"></div>
            <Box className="project-card-content" sx={{ p: '1.5rem', flexGrow: 1 }}>
              <Typography variant="h4" className="project-title" sx={{ fontSize: '1.1rem', fontWeight: 700, mb: '0.35rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
                Cellmark Recycling - OMS <span className="project-date" style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>Nov 2023 – Feb 2025</span>
              </Typography>
              <Typography variant="h5" className="project-subtitle" sx={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', mb: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Order Management System & IFS & Inventory ERP Integration
              </Typography>
              <Box component="ul" className="project-bullets" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Led end-to-end delivery of a custom <strong>Order Management System (OMS)</strong> for a global recycling commodities trader</span>
                </Box>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Managed warehouse and inventory management workflows, from inbound stock to dispatch and reconciliation</span>
                </Box>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Drove integration with <strong>IFS ERP</strong>, aligning operational data across procurement, logistics, and finance</span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Project 2: Pandora */}
          <Box className="project-detail-card" sx={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-left-border"></div>
            <Box className="project-card-content" sx={{ p: '1.5rem', flexGrow: 1 }}>
              <Typography variant="h4" className="project-title" sx={{ fontSize: '1.1rem', fontWeight: 700, mb: '0.35rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
                Pandora - Global Supply Chain <span className="project-date" style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>March 2026 – Present</span>
              </Typography>
              <Typography variant="h5" className="project-subtitle" sx={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', mb: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                IIS Team | Unicorn / HERO / Gemini Initiatives
              </Typography>
              <Box component="ul" className="project-bullets" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Embedded within Pandora's global supply chain as part of the <strong>IIS (Integrated Information Systems)</strong> team</span>
                </Box>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Contributing to strategic initiatives including <strong>Unicorn, HERO, and Gemini</strong> — focused on supply chain modernisation</span>
                </Box>
                <Box component="li" sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent)', marginTop: '3px' }} />
                  <span>Applying SCM domain expertise to complex, multi-region logistics and fulfilment challenges</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Awards Carousel Integration */}
        <AwardCarousel onPreview={onPreview} />
      </Box>

      {/* Key Contributions Section */}
      <Box className="key-contributions-section" sx={{ mt: '4rem', textAlign: 'left' }}>
        <Typography variant="h3" className="contributions-title" sx={{ fontSize: '1.4rem', fontWeight: 800, mb: '2rem', color: 'var(--text-primary)' }}>
          Key Contributions at <Box component="span" className="tarento-highlight">Tarento Group</Box>
        </Typography>

        <Box className="contributions-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.25rem' }}>
          {career.tarentoContributions.map((c, idx) => (
            <Box
              key={idx}
              className="contribution-card highlights-po"
              sx={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                transition: 'all var(--transition-fast)',
                '&:hover': {
                  borderColor: 'rgba(20, 184, 166, 0.35)',
                  transform: 'translateY(-2px)',
                  '& .contribution-icon-wrapper': {
                    backgroundColor: 'var(--accent)',
                    color: '#ffffff',
                  },
                },
              }}
            >
              <Box
                className="contribution-icon-wrapper"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  minWidth: '2.5rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(20, 184, 166, 0.05)',
                  border: '1px solid rgba(20, 184, 166, 0.15)',
                  color: 'var(--accent)',
                  fontSize: '1.1rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <i className={c.icon} />
              </Box>
              <Box className="contribution-content">
                <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', mb: '0.35rem' }}>
                  {c.title}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: c.desc }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default Career;
