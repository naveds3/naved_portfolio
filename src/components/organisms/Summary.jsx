import React from 'react';
import { Box, Typography } from '@mui/material';

const Summary = ({ summary }) => {
  if (!summary) return null;

  return (
    <section id="summary" className="summary-section reveal active">
      <Box className="section-header" sx={{ textAlign: 'left', mb: '2rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Professional Summary
        </Typography>
      </Box>

      <Box className="summary-container" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' }, gap: '3rem' }}>
        {/* Left Side: Bio Text and SCM Pillar Cards */}
        <Box className="summary-left" sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
          <Box className="summary-text" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {summary.paragraphs.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </Box>

          {/* SCM Pillars Grid */}
          <Box className="scm-pillars-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: '1.25rem' }}>
            {summary.pillars.map((pillar, idx) => (
              <Box
                key={idx}
                className="scm-pillar-card"
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  transition: 'all var(--transition-fast)',
                  '&:hover': {
                    borderColor: 'var(--accent)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  className="pillar-icon"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--badge-bg)',
                    border: '1px solid var(--badge-border)',
                    color: 'var(--accent)',
                    fontSize: '1.1rem',
                  }}
                >
                  <i className={pillar.icon} />
                </Box>
                <Box className="pillar-content">
                  <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', mb: '0.25rem' }}>
                    {pillar.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {pillar.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Side: Core Strengths and visual network card */}
        <Box className="summary-right" sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <Box className="strengths-card" sx={{ p: '2rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <Box className="strengths-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', mb: '1.5rem' }}>
              <i className="fa-solid fa-gem strengths-icon" style={{ color: 'var(--accent)', fontSize: '1.25rem' }}></i>
              <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Core Strengths
              </Typography>
            </Box>
            <Box component="ul" className="strengths-list" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {summary.strengths.map((strength, idx) => (
                <Box component="li" key={idx} sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent)' }}></i>
                  <span>{strength}</span>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Logo Showcase */}
          <Box className="logos-card" sx={{ p: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <Box className="logos-header" sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', mb: '1.25rem' }}>
              <i className="fa-solid fa-handshake-angle logos-icon" style={{ color: 'var(--accent)', fontSize: '1.25rem' }}></i>
              <Typography variant="h3" sx={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Key SCM Engagements
              </Typography>
            </Box>
            <Box className="logos-grid" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {summary.engagements.map((eng, idx) => (
                <Box
                  key={idx}
                  className="logo-item-wrapper"
                  sx={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    transition: 'all var(--transition-fast)',
                    '&:hover': {
                      borderColor: 'var(--accent)',
                      backgroundColor: 'var(--badge-bg)',
                    },
                  }}
                >
                  <img
                    src={eng.logo}
                    alt={`${eng.name} Logo`}
                    className="client-logo"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', opacity: 0.85, filter: 'grayscale(30%)' }}
                    loading="lazy"
                    decoding="async"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Summary;
