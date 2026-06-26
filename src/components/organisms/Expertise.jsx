import React from 'react';
import { Box, Typography } from '@mui/material';
import ExpertiseCard from '../molecules/ExpertiseCard';

const Expertise = ({ expertise }) => {
  if (!expertise) return null;

  return (
    <section id="expertise" className="expertise-section reveal active">
      <Box className="section-header" sx={{ textAlign: 'left', mb: '2rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', position: 'relative', display: 'inline-block' }}>
          Domain Expertise
        </Typography>
      </Box>

      <Typography className="section-intro-text" sx={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '900px', mb: '3rem' }}>
        Deep cross-domain expertise spanning e-commerce, supply chain, government digitisation, healthcare, and enterprise digital transformation — enabling the delivery of solutions that are both technically sound and business-relevant.
      </Typography>

      <Box className="expertise-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.5rem' }}>
        {expertise.map((item, idx) => (
          <ExpertiseCard
            key={idx}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            bullets={item.bullets}
          />
        ))}
      </Box>
    </section>
  );
};

export default Expertise;
