import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Button, 
  LinearProgress, 
  Tooltip,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const directoryConfigs = {
  cellmark: {
    title: "Cellmark Recycling OMS",
    desc: "CROPS 2.0 Order Management System & IFS ERP Integration",
    logo: "assets/cellmark-logo.png",
    icon: null
  },
  pandora: {
    title: "Pandora SCM",
    desc: "Global Inventory Visibility & Logistics Modernisation",
    logo: null,
    icon: "fa-gem"
  },
  health: {
    title: "Mozambique Health",
    desc: "Digital Campaign Management & Disease Surveillance",
    logo: null,
    icon: "fa-file-medical"
  }
};

const CaseStudyPortal = ({
  projectData,
  activeProject,
  onChangeProject,
  onBackToPortfolio,
  themeMode,
  onToggleTheme,
  onPreview
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const autoplayDuration = 5000;
  const autoplayRef = useRef(null);
  const thumbTrackRef = useRef(null);

  const project = projectData[activeProject];
  const slides = project ? project.slides : [];

  const handleNext = () => {
    setCurrentSlide((prev) => {
      const nextIdx = prev + 1;
      return nextIdx >= slides.length ? 0 : nextIdx;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      const prevIdx = prev - 1;
      return prevIdx < 0 ? slides.length - 1 : prevIdx;
    });
  };

  // Autoplay Logic
  const startAutoplay = () => {
    stopAutoplay();
    if (autoplayActive && slides.length > 1) {
      autoplayRef.current = setInterval(handleNext, autoplayDuration);
    }
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject, autoplayActive, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoplay(); // Reset timer
  };

  // Keyboard navigation for slide switching
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
        startAutoplay(); // Reset timer
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
        startAutoplay(); // Reset timer
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = document.getElementById(`thumb-card-${currentSlide}`);
    if (activeThumb && thumbTrackRef.current) {
      const track = thumbTrackRef.current;
      const trackRect = track.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();

      if (thumbRect.left < trackRect.left || thumbRect.right > trackRect.right) {
        track.scrollTo({
          left: activeThumb.offsetLeft - trackRect.width / 2 + thumbRect.width / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentSlide]);

  if (!project) return null;

  const slide = slides[currentSlide] || {};
  const hasSlideDetails = !!slide.details;

  // Scroll thumbnails left/right buttons
  const scrollThumbnails = (direction) => {
    if (thumbTrackRef.current) {
      const amount = direction === 'left' ? -240 : 240;
      thumbTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <Box id="case-study-portal-wrapper" sx={{ display: 'block', backgroundColor: 'var(--bg-primary)', minHeight: '100vh', transition: 'background-color var(--transition-smooth)' }}>
      {/* Sticky Case Study Header */}
      <Box 
        id="case-study-header" 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 100, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all var(--transition-smooth)'
        }}
        className="header-theme-override"
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            px: { xs: 2, md: 4 }, 
            py: 2, 
            maxWidth: '1440px', 
            margin: '0 auto' 
          }}
        >
          <Button
            onClick={() => onBackToPortfolio('#projects')}
            startIcon={<ArrowBackIcon />}
            sx={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              textTransform: 'none',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              px: 2,
              '&:hover': {
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'var(--badge-bg)'
              }
            }}
          >
            Back to Portfolio
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Theme Toggle */}
            <IconButton 
              onClick={onToggleTheme} 
              sx={{ 
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                '&:hover': {
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)'
                }
              }}
              aria-label="Toggle dark/light theme"
            >
              {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>

            {/* Branding Logo */}
            <Box 
              onClick={() => onBackToPortfolio('#home')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              <Avatar src="assets/naved_profile.png" alt="Naved Siddiqui" sx={{ width: 40, height: 40, border: '2px solid var(--accent)' }} />
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  Naved Siddiqui
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Case Study Portal
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Container */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, maxWidth: '1440px', margin: '0 auto' }}>
        {/* Case Study Directory Selection */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, mb: 1, color: 'var(--text-primary)', textAlign: 'left' }}>
            Case Study Directory
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3, textAlign: 'left' }}>
            Select a project below to load its full case study details and presentation deck.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: '1.5rem' }}>
            {Object.keys(directoryConfigs).map((key) => {
              const config = directoryConfigs[key];
              const isActive = activeProject === key;
              return (
                <Card 
                  key={key}
                  onClick={() => {
                    if (activeProject !== key) {
                      setCurrentSlide(0);
                      onChangeProject(key);
                    }
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    cursor: 'pointer',
                    borderRadius: '16px',
                    backgroundColor: isActive 
                      ? (themeMode === 'light' ? 'rgba(143, 100, 36, 0.04)' : 'rgba(197, 163, 88, 0.05)') 
                      : 'var(--bg-card)',
                    border: isActive ? '2px solid var(--accent)' : '2px solid var(--border-color)',
                    boxShadow: isActive ? '0 8px 30px var(--accent-glow)' : 'var(--shadow)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'var(--accent)',
                      boxShadow: '0 8px 30px var(--accent-glow)',
                      backgroundColor: themeMode === 'light' ? 'rgba(143, 100, 36, 0.02)' : 'rgba(197, 163, 88, 0.02)'
                    }
                  }}
                >
                  <Box sx={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    p: config.logo ? 0.5 : 1.5,
                    border: '1px solid var(--border-color)'
                  }}>
                    {config.logo ? (
                      <img src={config.logo} alt={`${config.title} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <i className={`fa-solid ${config.icon}`} style={{ fontSize: '1.5rem', color: 'var(--accent)' }}></i>
                    )}
                  </Box>
                  <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {config.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 1, lineHeight: 1.3 }}>
                      {config.desc}
                    </Typography>
                    <Box 
                      component="span"
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '30px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: isActive ? 'var(--badge-bg)' : 'rgba(0,0,0,0.05)',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)'
                      }}
                    >
                      {isActive ? 'Active Case Study' : 'Click to Load'}
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ height: '1px', backgroundColor: 'var(--border-color)', my: 5 }} />

        {/* Slides Presentation Viewer */}
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h5" sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, mb: 1, color: 'var(--text-primary)' }}>
            Case Study Slide Deck
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 4 }}>
            Browse the complete project showcase presentation below.
          </Typography>

          {/* Presentation Slide Canvas & Details Card */}
          <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.8fr 1.2fr' }, gap: '2rem' }}>
            {/* Slide Canvas Grid */}
            <Box 
              className="slide-canvas-outer"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: themeMode === 'light' ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    transition: 'all 0.3s ease',
                    '&:hover .slide-hover-control': {
                      opacity: 1
                    }
                  }}
                >
                  {/* Canvas Area for active slide */}
                  <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexGrow: 1, minHeight: '400px' }}>
                    {/* Floating Left Arrow */}
                    {slides.length > 1 && (
                      <IconButton
                        className="slide-hover-control"
                        onClick={handlePrev}
                        sx={{
                          position: 'absolute',
                          left: '1.5rem',
                          zIndex: 10,
                          backgroundColor: 'rgba(11, 15, 25, 0.75)',
                          backdropFilter: 'blur(4px)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.1)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s',
                          '&:hover': {
                            backgroundColor: 'var(--accent)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                    )}

                    {/* Slide Image */}
                    <Box 
                      component="img"
                      src={slide.src}
                      alt={slide.title}
                      onClick={() => onPreview(slide.src, slide.title)}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '60vh',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.01)'
                        }
                      }}
                    />

                    {/* Floating Right Arrow */}
                    {slides.length > 1 && (
                      <IconButton
                        className="slide-hover-control"
                        onClick={handleNext}
                        sx={{
                          position: 'absolute',
                          right: '1.5rem',
                          zIndex: 10,
                          backgroundColor: 'rgba(11, 15, 25, 0.75)',
                          backdropFilter: 'blur(4px)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.1)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s',
                          '&:hover': {
                            backgroundColor: 'var(--accent)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    )}

                    {/* Expand Fullscreen Button */}
                    <Tooltip title="Expand image">
                      <IconButton
                        className="slide-hover-control"
                        onClick={() => onPreview(slide.src, slide.title)}
                        sx={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          zIndex: 10,
                          backgroundColor: 'rgba(11, 15, 25, 0.75)',
                          backdropFilter: 'blur(4px)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.1)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s',
                          '&:hover': {
                            backgroundColor: 'var(--accent)',
                            transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <FullscreenIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Progress Bar & Autoplay Panel */}
                <Box sx={{ position: 'relative', width: '100%', backgroundColor: 'rgba(0,0,0,0.03)', px: 3, py: 1.8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, borderTop: '1px solid var(--border-color)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {slides.length > 1 && (
                      <IconButton 
                        onClick={() => setAutoplayActive(!autoplayActive)}
                        size="small"
                        sx={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--accent)',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            backgroundColor: 'var(--accent)',
                            color: '#ffffff',
                            borderColor: 'var(--accent)'
                          }
                        }}
                        aria-label={autoplayActive ? "Pause autoplay" : "Start autoplay"}
                      >
                        {autoplayActive ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                      </IconButton>
                    )}
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                      Slide {currentSlide + 1} of {slides.length}
                    </Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'var(--font-heading)', maxWidth: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {slide.title}
                  </Typography>

                  {/* Linear Progress */}
                  {slides.length > 1 && (
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={((currentSlide + 1) / slides.length) * 100}
                        sx={{
                          height: '4px',
                          backgroundColor: 'rgba(0,0,0,0.06)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'var(--accent)'
                          }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>

            {/* Narrative Panel Grid */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* If project has slide-level details */}
              {hasSlideDetails ? (
                slide.details && (
                  <Card 
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow)',
                      p: 3,
                      textAlign: 'left',
                      height: '100%',
                      minHeight: '400px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, color: 'var(--accent)' }}>
                        <i className={`fa-solid ${slide.details.icon}`} style={{ fontSize: '1.4rem' }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                          {slide.details.title}
                        </Typography>
                      </Box>
                      <Box 
                        className="card-body" 
                        dangerouslySetInnerHTML={{ __html: slide.details.body }} 
                        sx={{
                          flexGrow: 1,
                          overflowY: 'auto',
                          '& ul': {
                            paddingLeft: 0,
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.85rem',
                            margin: 0
                          },
                          '& li': {
                            position: 'relative',
                            paddingLeft: '1.75rem',
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5
                          },
                          '& li::before': {
                            content: '"\\2713"',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            color: 'var(--accent)',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                )
              ) : (
                /* Otherwise, render project-level narrative grid list stacked */
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, maxHeight: '68vh', overflowY: 'auto', pr: 1 }}>
                  {project.narrative && project.narrative.map((narrativeCard, nIdx) => (
                    <Card 
                      key={nIdx}
                      sx={{
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        p: 2.5,
                        textAlign: 'left'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'var(--accent)' }}>
                        <i className={`fa-solid ${narrativeCard.icon}`} style={{ fontSize: '1.1rem' }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                          {narrativeCard.title}
                        </Typography>
                      </Box>
                      <Box 
                        className="card-body" 
                        dangerouslySetInnerHTML={{ __html: narrativeCard.body }} 
                        sx={{
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.45,
                          '& ul': {
                            paddingLeft: 0,
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            margin: 0
                          },
                          '& li': {
                            position: 'relative',
                            paddingLeft: '1.25rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                          },
                          '& li::before': {
                            content: '"\\2713"',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            color: 'var(--accent)',
                            fontWeight: 'bold'
                          }
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              )}
              </Box>
          </Box>

        {/* Thumbnail Strip */}
        {slides.length > 1 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3 }}>
            <IconButton 
              onClick={() => scrollThumbnails('left')}
              sx={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)'
                }
              }}
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeftIcon />
            </IconButton>
            
            <Box 
              ref={thumbTrackRef}
              sx={{
                flexGrow: 1,
                display: 'flex',
                gap: 1.5,
                overflowX: 'auto',
                py: 1,
                px: 0.5,
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            >
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <Box
                    key={index}
                    id={`thumb-card-${index}`}
                    onClick={() => goToSlide(index)}
                    sx={{
                      flex: '0 0 160px',
                      aspectRatio: '16/9',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: isActive ? '2px solid var(--accent)' : '2px solid var(--border-color)',
                      boxShadow: isActive ? '0 4px 12px var(--accent-glow)' : 'none',
                      transform: isActive ? 'scale(1.02)' : 'none',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.6,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 0.9,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    title={slide.title}
                  >
                    <Box 
                      component="img"
                      src={slide.src} 
                      alt={`Thumb ${index + 1}`} 
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                );
              })}
            </Box>

            <IconButton 
              onClick={() => scrollThumbnails('right')}
              sx={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)'
                }
              }}
              aria-label="Scroll thumbnails right"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);
};

export default CaseStudyPortal;
