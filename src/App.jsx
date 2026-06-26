import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Modal, Typography } from '@mui/material';
import { getTheme } from './theme';
import DashboardTemplate from './components/templates/DashboardTemplate';

// Organisms
import Hero from './components/organisms/Hero';
import Expertise from './components/organisms/Expertise';
import Summary from './components/organisms/Summary';
import Career from './components/organisms/Career';
import Projects from './components/organisms/Projects';
import Skills from './components/organisms/Skills';
import Education from './components/organisms/Education';
import Contact from './components/organisms/Contact';
import CaseStudyPortal from './components/organisms/CaseStudyPortal';

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  
  const [view, setView] = useState('portfolio'); // 'portfolio' or 'casestudy'
  const [activeProject, setActiveProject] = useState(null); // 'cellmark', 'pandora', 'health'
  const [activeSection, setActiveSection] = useState('#home');
  
  // Dynamic JSON data
  const [portfolioData, setPortfolioData] = useState(null);
  const [caseStudiesData, setCaseStudiesData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global Preview Modal & Toast Alert
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [previewCaption, setPreviewCaption] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 1. Fetch Dynamic Data & Init Route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, caseStudiesRes] = await Promise.all([
          fetch('/api/portfolio.json'),
          fetch('/api/case-studies.json')
        ]);
        
        const portfolioJson = await portfolioRes.json();
        const caseStudiesJson = await caseStudiesRes.json();
        
        setPortfolioData(portfolioJson);
        setCaseStudiesData(caseStudiesJson);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load portfolio dynamic endpoints:', err);
        setLoading(false);
      }
    };

    fetchData();

    // Check URL parameters for initial route
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  // 2. Handle theme sync on data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('portfolio-theme', themeMode);
  }, [themeMode]);

  // 3. Scroll Spy for active section indicator
  useEffect(() => {
    if (view !== 'portfolio' || loading || !portfolioData) return;

    const sections = document.querySelectorAll('section');
    const activeSections = new Set();

    const navObserver = new IntersectionObserver((entries) => {

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSections.add(entry.target);
        } else {
          activeSections.delete(entry.target);
        }
      });

      if (activeSections.size > 0) {
        let currentActive = null;
        const sortedSections = Array.from(activeSections).sort((a, b) => {
          return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        });

        const isAtTop = window.scrollY < 10;
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 15);

        if (isAtTop) {
          currentActive = '#home';
        } else if (isAtBottom) {
          const lastSec = sortedSections[sortedSections.length - 1];
          currentActive = lastSec ? `#${lastSec.getAttribute('id')}` : '#home';
        } else {
          for (let i = sortedSections.length - 1; i >= 0; i--) {
            const rect = sortedSections[i].getBoundingClientRect();
            if (rect.top <= 95 && rect.bottom >= 95) {
              currentActive = `#${sortedSections[i].getAttribute('id')}`;
              break;
            }
          }
        }

        if (currentActive) {
          setActiveSection(currentActive);
        }
      }
    }, { root: null, threshold: 0, rootMargin: '0px' });

    sections.forEach(section => navObserver.observe(section));

    return () => {
      sections.forEach(section => navObserver.unobserve(section));
    };
  }, [view, loading, portfolioData]);

  // 4. Scroll Reveal observer for fade-in animations
  useEffect(() => {
    if (view !== 'portfolio' || loading || !portfolioData) return;

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, [view, loading, portfolioData]);

  const handleRoute = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get('project');
    if (project) {
      setView('casestudy');
      setActiveProject(project);
    } else {
      setView('portfolio');
      setActiveProject(null);
      if (window.location.hash) {
        setActiveSection(window.location.hash);
        // Timeout to let layout load before scrolling
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSectionClick = (target) => {
    setActiveSection(target);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, target);
    }
  };

  const handleViewCaseStudy = (projectId) => {
    window.history.pushState({ project: projectId }, '', `?project=${projectId}`);
    setView('casestudy');
    setActiveProject(projectId);
    window.scrollTo(0, 0);
  };

  const handleBackToPortfolio = (hash) => {
    window.history.pushState({ project: null }, '', window.location.pathname + hash);
    setView('portfolio');
    setActiveProject(null);
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleEmailCta = (e) => {
    if (e) e.preventDefault();
    const email = 'naveds3@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setToastMessage('Email Copied to Clipboard!');
      setToastOpen(true);
      setTimeout(() => setToastOpen(false), 3000);
      window.location.href = `mailto:${email}`;
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  const handleDownloadResume = () => {
    const filename = 'Naved Siddiqui - Product Lead_Business Analyst.pdf';
    const url = 'assets/Naved%20Siddiqui%20-%20Product%20Lead_Business%20Analyst.pdf';
    try {
      const base64Data = window.resumeBase64;
      if (!base64Data) throw new Error('Base64 data not loaded');
      
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.setAttribute('download', filename);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.warn('Base64 download failed, falling back to direct network fetch:', error);
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.blob();
        })
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const tempLink = document.createElement('a');
          tempLink.href = blobUrl;
          tempLink.setAttribute('download', filename);
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
          console.error('All download methods failed, opening direct link:', err);
          window.open(url, '_blank');
        });
    }
  };

  const handlePreview = (src, caption) => {
    setPreviewSrc(src);
    setPreviewCaption(caption);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewSrc('');
    setPreviewCaption('');
  };

  const muiTheme = getTheme(themeMode);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0f19', color: '#f8fafc' }}>
        <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
          Loading Portfolio...
        </Typography>
      </Box>
    );
  }

  // Render components for portfolio view
  const renderPortfolioContent = () => (
    <>
      <Hero
        personal={portfolioData?.personal}
        onEmailCta={handleEmailCta}
        onDownloadResume={handleDownloadResume}
      />
      <Expertise expertise={portfolioData?.expertise} />
      <Summary summary={portfolioData?.summary} />
      <Career
        career={portfolioData?.career}
        onPreview={handlePreview}
      />
      <Projects
        notableProjects={portfolioData?.notableProjects}
        onViewCaseStudy={handleViewCaseStudy}
      />
      <Skills skills={portfolioData?.skills} />
      <Education
        education={portfolioData?.education}
        certifications={portfolioData?.certifications}
        onPreview={handlePreview}
      />
      <Contact
        personal={portfolioData?.personal}
        onEmailCta={handleEmailCta}
      />
    </>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <DashboardTemplate
        view={view}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        onDownloadResume={handleDownloadResume}
        portfolioContent={renderPortfolioContent()}
        caseStudyContent={
          <CaseStudyPortal
            projectData={caseStudiesData}
            activeProject={activeProject}
            onChangeProject={setActiveProject}
            onBackToPortfolio={handleBackToPortfolio}
            themeMode={themeMode}
            onToggleTheme={handleToggleTheme}
            onPreview={handlePreview}
          />
        }
      />

      {/* Global Image Preview Modal */}
      <Modal
        open={previewOpen}
        onClose={handleClosePreview}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Box
          onClick={handleClosePreview}
          sx={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '85%',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            outline: 'none'
          }}
        >
          {/* Close Button */}
          <button
            className="modal-close"
            onClick={handleClosePreview}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '-1rem',
              right: '-1rem',
              background: 'var(--accent)',
              border: 'none',
              color: '#ffffff',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 15px var(--accent-glow)'
            }}
          >
            <i className="fa-solid fa-times" />
          </button>
          
          <Box
            sx={{
              width: '100%',
              overflow: 'auto',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#000000'
            }}
          >
            <img
              src={previewSrc}
              alt="Preview"
              style={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '70vh',
                margin: '0 auto'
              }}
            />
          </Box>
          <Typography
            sx={{
              mt: '1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            {previewCaption}
          </Typography>
        </Box>
      </Modal>

      {/* Toast Alert */}
      <div id="toast" className={`toast${toastOpen ? ' show' : ''}`}>
        {toastMessage}
      </div>
    </ThemeProvider>
  );
}

export default App;
