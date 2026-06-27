import React from 'react';
import { Box, Typography } from '@mui/material';
import EducationCard from '../molecules/EducationCard';
import CertCard from '../molecules/CertCard';

const Education = ({ education, certifications, onPreview }) => {
  return (
    <section id="education" className="education-section reveal active">
      <Box className="section-header" sx={{ textAlign: 'left', mb: '2.5rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Education & Credentials
        </Typography>
      </Box>

      {/* Academic Education Grid */}
      {education && (
        <Box className="education-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: '1.5rem', mb: '4rem' }}>
          {education.map((item, idx) => (
            <EducationCard
              key={idx}
              school={item.school}
              degree={item.degree}
              desc={item.desc}
              date={item.date}
              icon={item.icon}
              featured={item.featured}
            />
          ))}
        </Box>
      )}

      {/* Certifications Sub-Section */}
      {certifications && (
        <Box className="certifications-container" sx={{ textAlign: 'left' }}>
          <Typography variant="h3" className="certifications-title" sx={{ fontSize: '1.4rem', fontWeight: 800, mb: '0.75rem', color: 'var(--text-primary)' }}>
            Professional Certifications
          </Typography>
          <Typography className="section-subtitle" sx={{ color: 'var(--text-secondary)', mb: '3rem', fontSize: '0.92rem' }}>
            Click on any credential card to view the official certificate image.
          </Typography>

          <Box className="certifications-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.25rem' }}>
            {certifications.map((cert) => (
              <CertCard
                key={cert.id}
                file={cert.file}
                title={cert.title}
                org={cert.org}
                orgIcon={cert.orgIcon}
                logo={cert.logo}
                onPreview={onPreview}
              />
            ))}
          </Box>
        </Box>
      )}
    </section>
  );
};

export default Education;
