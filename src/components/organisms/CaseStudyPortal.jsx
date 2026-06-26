import React, { useState, useEffect, useRef } from 'react';

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
  const [autoplayActive] = useState(true);
  const autoplayDuration = 5000;
  const autoplayRef = useRef(null);
  const thumbTrackRef = useRef(null);

  const project = projectData[activeProject];
  const slides = project ? project.slides : [];
  
  // Group slides by 2 for the slideshow columns
  const getSlideGroups = () => {
    const groups = [];
    for (let i = 0; i < slides.length; i += 2) {
      groups.push(slides.slice(i, i + 2));
    }
    return groups;
  };
  const slideGroups = getSlideGroups();

  const handleNext = () => {
    setCurrentSlide((prev) => {
      const nextIdx = prev + 1;
      return nextIdx >= slideGroups.length ? 0 : nextIdx;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      const prevIdx = prev - 1;
      return prevIdx < 0 ? slideGroups.length - 1 : prevIdx;
    });
  };

  // Autoplay Logic
  const startAutoplay = () => {
    stopAutoplay();
    if (autoplayActive) {
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
  }, [activeProject, autoplayActive, slideGroups.length]);

  const goToSlideGroup = (index) => {
    setCurrentSlide(index);
    startAutoplay(); // Reset timer
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = document.querySelector('.thumbnail-card.active');
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

  // Render details / narrative blocks
  const group = slideGroups[currentSlide] || [];
  const hasSlideDetails = group.some(s => s.details);

  // Floating slide counter details
  let counterText = "";
  if (group.length === 2) {
    const idx1 = slides.indexOf(group[0]) + 1;
    const idx2 = slides.indexOf(group[1]) + 1;
    counterText = `Slides ${idx1}-${idx2} of ${slides.length}`;
  } else if (group.length === 1) {
    const idx = slides.indexOf(group[0]) + 1;
    counterText = `Slide ${idx} of ${slides.length}`;
  }
  const activeSlideTitles = group.map(s => s.title).join(' & ');

  // Scroll thumbnails left/right buttons
  const scrollThumbnails = (direction) => {
    if (thumbTrackRef.current) {
      const amount = direction === 'left' ? -240 : 240;
      thumbTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div id="case-study-portal-wrapper" style={{ display: 'block' }}>
      {/* Sticky Case Study Header */}
      <div id="case-study-header">
        <div className="header-container">
          <a
            href="index.html#projects"
            onClick={(e) => {
              e.preventDefault();
              onBackToPortfolio('#projects');
            }}
            className="btn btn-secondary back-btn"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
          </a>

          <div className="header-actions">
            {/* Theme Toggle */}
            <button className="theme-toggle-btn" id="case-study-theme-toggle" onClick={onToggleTheme} aria-label="Toggle dark/light theme">
              <i className="fa-solid fa-moon"></i>
              <i className="fa-solid fa-sun"></i>
            </button>

            {/* Branding Logo */}
            <a
              href="index.html"
              onClick={(e) => {
                e.preventDefault();
                onBackToPortfolio('#home');
              }}
              className="header-back-link"
              title="Back to main portfolio"
            >
              <img src="assets/naved_profile.png" alt="Naved Siddiqui" className="header-profile-img" decoding="async" />
              <div className="header-branding" style={{ textAlign: 'left' }}>
                <span className="branding-name">Naved Siddiqui</span>
                <span className="branding-title">Case Study Portal</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="case-study-main">
        {/* Case Study Directory Selection */}
        <section className="case-study-directory-section">
          <h2 className="directory-section-title">Case Study Directory</h2>
          <p className="directory-section-desc">Select a project below to load its full case study details and presentation deck.</p>

          <div className="directory-grid">
            {/* Cellmark */}
            <div
              className={`directory-card${activeProject === 'cellmark' ? ' active' : ''}`}
              onClick={() => {
                if (activeProject !== 'cellmark') {
                  setCurrentSlide(0);
                  onChangeProject('cellmark');
                }
              }}
            >
              <div className="card-logo-container">
                <img src="assets/cellmark-logo.png" alt="Cellmark Logo" className="card-logo-img" loading="lazy" decoding="async" />
              </div>
              <div className="card-text-container" style={{ textAlign: 'left' }}>
                <h3 className="card-project-title">Cellmark Recycling OMS</h3>
                <p className="card-project-desc">CROPS 2.0 Order Management System & IFS ERP Integration</p>
                <span className={`card-project-badge${activeProject === 'cellmark' ? ' active-badge' : ' coming-soon-badge'}`}>
                  {activeProject === 'cellmark' ? 'Active Case Study' : 'Click to Load'}
                </span>
              </div>
            </div>

            {/* Pandora */}
            <div
              className={`directory-card${activeProject === 'pandora' ? ' active' : ''}`}
              onClick={() => {
                if (activeProject !== 'pandora') {
                  setCurrentSlide(0);
                  onChangeProject('pandora');
                }
              }}
            >
              <div
                className="card-logo-container"
                style={{ background: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
              >
                <i className="fa-solid fa-gem" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}></i>
              </div>
              <div className="card-text-container" style={{ textAlign: 'left' }}>
                <h3 className="card-project-title">Pandora SCM</h3>
                <p className="card-project-desc">Global Inventory Visibility & Logistics Modernisation</p>
                <span className={`card-project-badge${activeProject === 'pandora' ? ' active-badge' : ' coming-soon-badge'}`}>
                  {activeProject === 'pandora' ? 'Active Case Study' : 'Click to Load'}
                </span>
              </div>
            </div>

            {/* Health Mozambique */}
            <div
              className={`directory-card${activeProject === 'health' ? ' active' : ''}`}
              onClick={() => {
                if (activeProject !== 'health') {
                  setCurrentSlide(0);
                  onChangeProject('health');
                }
              }}
            >
              <div
                className="card-logo-container"
                style={{ background: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
              >
                <i className="fa-solid fa-file-medical" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}></i>
              </div>
              <div className="card-text-container" style={{ textAlign: 'left' }}>
                <h3 className="card-project-title">Mozambique Health</h3>
                <p className="card-project-desc">Digital Campaign Management & Disease Surveillance</p>
                <span className={`card-project-badge${activeProject === 'health' ? ' active-badge' : ' coming-soon-badge'}`}>
                  {activeProject === 'health' ? 'Active Case Study' : 'Click to Load'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Slides Presentation Viewer */}
        <section className="presentation-viewer-section">
          <div className="viewer-header">
            <div className="viewer-title-area" style={{ textAlign: 'left' }}>
              <h2 className="viewer-section-title">Case Study Slide Deck</h2>
              <p className="viewer-section-desc">Browse the complete project showcase presentation below.</p>
            </div>
          </div>

          {/* Slide Canvas Wrapper */}
          <div className="presentation-canvas-container" id="presentation-container">
            {/* Navigation Arrows */}
            <button className="nav-arrow nav-prev" id="slide-prev" onClick={handlePrev} aria-label="Previous Slide">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="nav-arrow nav-next" id="slide-next" onClick={handleNext} aria-label="Next Slide">
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Viewport */}
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  display: 'flex',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: `${slideGroups.length * 100}%`
                }}
              >
                {slideGroups.map((groupItems, gIndex) => {
                  const isSingle = groupItems.length === 1;
                  return (
                    <div
                      key={gIndex}
                      className={`carousel-group${isSingle ? ' single-slide' : ''}${!hasSlideDetails ? ' project-narrative-group' : ''}`}
                      style={{ width: `${100 / slideGroups.length}%`, display: 'flex', flexGrow: 1 }}
                    >
                      {hasSlideDetails ? (
                        groupItems.map((slide, sIndex) => (
                          <div key={sIndex} className="carousel-slide-col" style={{ flex: 1 }}>
                            <img
                              src={slide.src}
                              alt={slide.title}
                              className="carousel-slide-img"
                              style={{ cursor: 'pointer' }}
                              onClick={() => onPreview(slide.src, slide.title)}
                            />
                            {slide.details && (
                              <div className={`narrative-card${slide.details.cardClass ? ` ${slide.details.cardClass}` : ''}`} style={{ textAlign: 'left' }}>
                                <div className="card-icon-header">
                                  <i className={`fa-solid ${slide.details.icon}`} />
                                  <h3>{slide.details.title}</h3>
                                </div>
                                <div className="card-body" dangerouslySetInnerHTML={{ __html: slide.details.body }} />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="carousel-slide-col project-narrative-slide">
                            {groupItems.map((slide, sIndex) => (
                              <img
                                key={sIndex}
                                src={slide.src}
                                alt={slide.title}
                                className="carousel-slide-img"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onPreview(slide.src, slide.title)}
                              />
                            ))}
                          </div>
                          {project.narrative && (
                            <div className="narrative-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', flex: 1, height: 'max-content' }}>
                              {project.narrative.map((narrativeCard, nIdx) => (
                                <div key={nIdx} className={`narrative-card${narrativeCard.cardClass ? ` ${narrativeCard.cardClass}` : ''}`} style={{ textAlign: 'left', minHeight: 'auto' }}>
                                  <div className="card-icon-header">
                                    <i className={`fa-solid ${narrativeCard.icon}`} />
                                    <h3>{narrativeCard.title}</h3>
                                  </div>
                                  <div className="card-body" dangerouslySetInnerHTML={{ __html: narrativeCard.body }} />
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Slide Counter */}
            <div className="slide-floating-info">
              <span id="slide-index-counter">{counterText}</span>
              <span id="slide-title-label">{activeSlideTitles}</span>
            </div>

            {/* Progress Bar */}
            <div className="slide-progress-bar-container">
              <div
                className="slide-progress-bar"
                id="slide-progress"
                style={{ width: `${((currentSlide + 1) / slideGroups.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Thumbnails Outer Track */}
          <div className="thumbnails-outer-container">
            <button className="thumbnail-scroll-arrow scroll-left" onClick={() => scrollThumbnails('left')} aria-label="Scroll thumbnails left">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="thumbnails-track-container" id="thumbnails-track" ref={thumbTrackRef}>
              {slides.map((slide, index) => {
                const gIndex = Math.floor(index / 2);
                const isActive = gIndex === currentSlide;
                return (
                  <div
                    key={index}
                    className={`thumbnail-card${isActive ? ' active' : ''}`}
                    onClick={() => goToSlideGroup(gIndex)}
                    title={slide.title}
                  >
                    <img src={slide.src} alt={`Thumb ${index + 1}`} className="thumbnail-img" />
                  </div>
                );
              })}
            </div>
            <button className="thumbnail-scroll-arrow scroll-right" onClick={() => scrollThumbnails('right')} aria-label="Scroll thumbnails right">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyPortal;
