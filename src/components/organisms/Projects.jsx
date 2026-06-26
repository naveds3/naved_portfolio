import React from 'react';
import { Box, Typography } from '@mui/material';
import ProjectCard from '../molecules/ProjectCard';
import NotableProjectCard from '../molecules/NotableProjectCard';

const Projects = ({ notableProjects, onViewCaseStudy }) => {
  // Main projects display specs
  const mainProjects = [
    {
      id: 'pandora',
      title: 'Pandora (SCM): Global Supply Chain Modernisation',
      category: 'Inventory Information System',
      date: 'March 2026 – Present',
      banner: 'assets/Pandora-header.jpg',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Pandora_logo_2025.svg/1280px-Pandora_logo_2025.svg.png',
      illustration: 'assets/pandora_problems.png',
      description: "As Business Analyst within the IIS team at Pandora — the world's largest jewellery brand — driving analysis across three major global initiatives to modernise supply chain and inventory at scale.",
      bullets: [
        "Unicorn: Transitioning global store networks to modern, unified commerce and POS platforms.",
        "HERO: Enhancing inventory visibility to feed smart planning tools so stores never run out of customer favourites.",
        "Gemini: Powering seamless e-commerce and 3PL integrations in critical expanding regions like Brazil."
      ]
    },
    {
      id: 'cellmark',
      title: 'Cellmark Recycling (OMS): Order Management & ERP System',
      category: 'Supply Chain Operations · ERP Integration',
      date: 'November 2023 – February 2025',
      banner: 'assets/cellmark-recycling-paper.png',
      logo: 'assets/cellmark-logo.png',
      description: "Led end-to-end delivery of a custom Order Management System (OMS) for a global recycling commodities trader. Mapped complex logistical workflows and integrated data pipelines directly into accounting systems.",
      initiatives: [
        { icon: "fa-link", title: "Full ERP Integration", desc: "Integrated with IFS Accounting for financial reconciliation and reporting." },
        { icon: "fa-warehouse", title: "Warehouse & Inventory", desc: "Custom warehouse operations and inventory tracking management." },
        { icon: "fa-box-open", title: "Order Lifecycle", desc: "End-to-end order lifecycle management from intake to fulfilment." },
        { icon: "fa-recycle", title: "Trading Workflows", desc: "Commodity trading workflow automation for recycling operations." },
        { icon: "fa-file-lines", title: "Documentation", desc: "LC, Customer Invoice, BOL Instruction, and Shipping Docs logic implemented." }
      ]
    },
    {
      id: 'health',
      title: 'Health Campaign Management: Mozambique',
      category: 'Public Health · DIGIT Platform',
      date: 'February 2023 – October 2023',
      logo: 'assets/digit-logo.png',
      illustration: 'assets/digit-campaign-ground.png',
      description: "DIGIT is an open-source platform designed to enhance global public health capabilities, alleviating diseases of poverty through digital tools. Managed the digital transformation of local health campaigns in Mozambique to streamline planning, coordination, and field execution.",
      bullets: [
        "DIGIT Platform Deployment: Scalable public health campaign execution.",
        "SMC Operations: Optimized seasonal malaria chemoprevention delivery across Nampula province.",
        "Stakeholder Collaboration: Partnered with Mozambique's Ministry of Health and the Malaria Consortium.",
        "Real-Time Surveillance: Provided meticulous monitoring, tracking campaign progress and identifying coverage gaps.",
        "Field Digitisation: Enabled offline-first data entry for community health workers on the ground."
      ]
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <section id="projects" className="projects-section reveal active">
        <Box className="section-header" sx={{ textAlign: 'left', mb: '2.5rem' }}>
          <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            Key Projects
          </Typography>
        </Box>

        {mainProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            category={project.category}
            date={project.date}
            banner={project.banner}
            logo={project.logo}
            illustration={project.illustration}
            description={project.description}
            bullets={project.bullets}
            initiatives={project.initiatives}
            onViewCaseStudy={onViewCaseStudy}
          />
        ))}
      </section>

      {/* Section: Other Notable Projects */}
      {notableProjects && (
        <section id="other-projects" className="projects-section reveal active">
          <Box className="section-header" sx={{ textAlign: 'left', mb: '2.5rem' }}>
            <Typography variant="h2" className="section-title" sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Other Notable Projects
            </Typography>
          </Box>

          <Box className="additional-projects-section" sx={{ mt: '3rem' }}>
            {/* E-Commerce Group */}
            <Box className="project-group-container" sx={{ mb: '4.5rem' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  mb: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i> E-Commerce Engagements
              </Typography>
              <Box className="contributions-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.25rem' }}>
                {notableProjects.ecommerce.map((project, idx) => (
                  <NotableProjectCard
                    key={idx}
                    icon={project.icon}
                    title={project.title}
                    date={project.date}
                    desc={project.desc}
                  />
                ))}
              </Box>
            </Box>

            {/* Enterprise / Gov Group */}
            <Box className="project-group-container">
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  mb: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <i className="fa-solid fa-folder-open"></i> Enterprise & Public Sector Initiatives
              </Typography>
              <Box className="contributions-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '1.25rem' }}>
                {notableProjects.enterprise.map((project, idx) => (
                  <NotableProjectCard
                    key={idx}
                    icon={project.icon}
                    title={project.title}
                    date={project.date}
                    desc={project.desc}
                    tags={project.tags}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </section>
      )}
    </Box>
  );
};

export default Projects;
