import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SkillCard from '../molecules/SkillCard';
import ToolCard from '../molecules/ToolCard';

const Skills = ({ skills }) => {
  const [activeTab, setActiveTab] = useState('strategy'); // 'strategy' or 'technical'

  if (!skills) return null;

  return (
    <section id="skills" className="skills-section reveal active">
      <Box className="section-header" sx={{ textAlign: 'left', mb: '2.5rem' }}>
        <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Skills & Competencies
        </Typography>
      </Box>

      {/* Switcher Tabs */}
      <Box className="skills-tabs" sx={{ display: 'flex', gap: '1rem', mb: '2.5rem' }}>
        <button
          className={`tab-btn${activeTab === 'strategy' ? ' active' : ''}`}
          onClick={() => setActiveTab('strategy')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <i className="fa-solid fa-brain"></i> Strategy & Business Analysis
        </button>
        <button
          className={`tab-btn${activeTab === 'technical' ? ' active' : ''}`}
          onClick={() => setActiveTab('technical')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <i className="fa-solid fa-laptop-code"></i> Technical & Analytical Suite
        </button>
      </Box>

      {/* Tab 1 Content: Strategy & BA */}
      {activeTab === 'strategy' && (
        <Box className="skills-tab-content active" id="strategy-ba-tab">
          <Box className="skills-functional-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: '2rem' }}>
            
            {/* Column 1: Product Strategy & Leadership */}
            <Box className="skills-column" sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <Typography variant="h3" className="skills-column-title" sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', mb: '0.5rem' }}>
                <i className={skills.strategy.categories[0].icon} style={{ color: 'var(--accent)' }} /> {skills.strategy.categories[0].title}
              </Typography>
              <Box className="skill-list" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {skills.strategy.categories[0].items.map((item, idx) => (
                  <SkillCard key={idx} icon={item.icon} name={item.name} desc={item.desc} />
                ))}
              </Box>
            </Box>

            {/* Column 2: Business Analysis */}
            <Box className="skills-column" sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <Typography variant="h3" className="skills-column-title" sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', mb: '0.5rem' }}>
                <i className={skills.strategy.categories[1].icon} style={{ color: 'var(--accent)' }} /> {skills.strategy.categories[1].title}
              </Typography>
              <Box className="skill-list" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {skills.strategy.categories[1].items.map((item, idx) => (
                  <SkillCard key={idx} icon={item.icon} name={item.name} desc={item.desc} />
                ))}
              </Box>
            </Box>

          </Box>
        </Box>
      )}

      {/* Tab 2 Content: Technical & Analytical */}
      {activeTab === 'technical' && (
        <Box className="skills-tab-content active" id="tech-analytical-tab">
          <Box className="skills-tech-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.5rem' }}>
            {skills.technical.tools.map((tool, idx) => (
              <ToolCard
                key={idx}
                icon={tool.icon}
                name={tool.name}
                category={tool.category}
                desc={tool.desc}
                badges={tool.badges}
              />
            ))}
          </Box>
        </Box>
      )}
    </section>
  );
};

export default Skills;
