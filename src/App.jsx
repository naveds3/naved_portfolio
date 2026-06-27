import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Modal, Typography, IconButton } from '@mui/material';
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
    return sessionStorage.getItem('portfolio-theme') || 'light';
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
  const [previewGroup, setPreviewGroup] = useState(null); // Array of { src, caption }
  const [previewIndex, setPreviewIndex] = useState(-1);
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
    sessionStorage.setItem('portfolio-theme', themeMode);
  }, [themeMode]);

  // Lock background scroll when preview modal is open (prevent layout shift)
  useEffect(() => {
    if (previewOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [previewOpen]);

  // 3. Scroll Spy for active section indicator
  useEffect(() => {
    if (view !== 'portfolio' || loading || !portfolioData) return;

    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
      const isAtTop = window.scrollY < 50;
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120);

      if (isAtTop) {
        setActiveSection('#home');
        return;
      }

      if (isAtBottom) {
        setActiveSection('#contact');
        return;
      }

      // Focus line is set at 70% down the screen, meaning the tab will highlight
      // as soon as the section's heading is clearly visible in the viewport.
      const focusPoint = window.innerHeight * 0.70;
      let currentActive = null;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= focusPoint && rect.bottom >= focusPoint) {
          currentActive = `#${section.getAttribute('id')}`;
        }
      });

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
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

  const handlePreview = (src, caption, group = null, index = -1) => {
    setPreviewSrc(src);
    setPreviewCaption(caption);
    setPreviewGroup(group);
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewSrc('');
    setPreviewCaption('');
    setPreviewGroup(null);
    setPreviewIndex(-1);
  };

  const handlePrevPreview = () => {
    if (!previewGroup || previewIndex === -1) return;
    const nextIdx = (previewIndex - 1 + previewGroup.length) % previewGroup.length;
    setPreviewIndex(nextIdx);
    setPreviewSrc(previewGroup[nextIdx].src);
    setPreviewCaption(previewGroup[nextIdx].caption);
  };

  const handleNextPreview = () => {
    if (!previewGroup || previewIndex === -1) return;
    const nextIdx = (previewIndex + 1) % previewGroup.length;
    setPreviewIndex(nextIdx);
    setPreviewSrc(previewGroup[nextIdx].src);
    setPreviewCaption(previewGroup[nextIdx].caption);
  };

  // Keyboard navigation for image preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewOpen) return;
      if (e.key === 'ArrowRight' && previewGroup) {
        handleNextPreview();
      } else if (e.key === 'ArrowLeft' && previewGroup) {
        handlePrevPreview();
      } else if (e.key === 'Escape') {
        handleClosePreview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewOpen, previewGroup, previewIndex]);

  const muiTheme = getTheme(themeMode);

  if (loading) {
    const isLight = themeMode === 'light';
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: isLight ? '#faf8f5' : '#080b11', 
        color: isLight ? '#8f6424' : '#c5a358' 
      }}>
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
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: themeMode === 'dark' ? 'rgba(8, 11, 17, 0.65)' : 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
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
              boxShadow: '0 4px 15px var(--accent-glow)',
              zIndex: 11
            }}
          >
            <i className="fa-solid fa-times" />
          </button>
          
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Prev Button */}
            {previewGroup && previewGroup.length > 1 && (
              <IconButton
                onClick={handlePrevPreview}
                aria-label="Previous image"
                sx={{
                  position: 'absolute',
                  left: '1rem',
                  zIndex: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'var(--accent)',
                    color: '#ffffff',
                    borderColor: 'var(--accent)'
                  }
                }}
              >
                <i className="fa-solid fa-chevron-left" />
              </IconButton>
            )}

            <img
              src={previewSrc}
              alt="Preview"
              style={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '70vh',
                margin: '0 auto',
                padding: previewGroup && previewGroup.length > 1 ? '0 4rem' : '0'
              }}
            />

            {/* Next Button */}
            {previewGroup && previewGroup.length > 1 && (
              <IconButton
                onClick={handleNextPreview}
                aria-label="Next image"
                sx={{
                  position: 'absolute',
                  right: '1rem',
                  zIndex: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'var(--accent)',
                    color: '#ffffff',
                    borderColor: 'var(--accent)'
                  }
                }}
              >
                <i className="fa-solid fa-chevron-right" />
              </IconButton>
            )}
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
