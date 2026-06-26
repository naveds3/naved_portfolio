import React, { useState, useEffect, useRef } from 'react';

const Hero = ({ personal, onEmailCta, onDownloadResume }) => {
  if (!personal) return null;

  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [offsets, setOffsets] = useState({ dx: 0, dy: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const calculateOffsets = () => {
      if (!imageRef.current || !heroRef.current) return;

      // Temporarily clear transform to measure the untransformed layout position
      const savedTransform = imageRef.current.style.transform;
      imageRef.current.style.transform = 'none';

      // Measure layout position
      const imgRect = imageRef.current.getBoundingClientRect();
      
      // Restore transform immediately
      imageRef.current.style.transform = savedTransform;

      // Calculate layout center relative to document (independent of scroll)
      const imageCenterX = imgRect.left + window.scrollX + imgRect.width / 2;
      const imageCenterY = imgRect.top + window.scrollY + imgRect.height / 2;

      // Get current computed padding-top of main container
      const rootStyle = window.getComputedStyle(document.documentElement);
      const paddingTopStr = rootStyle.getPropertyValue('--main-padding-top') || '112px';
      let paddingTop = 112;
      if (paddingTopStr.trim().endsWith('rem')) {
        const remValue = parseFloat(paddingTopStr);
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        paddingTop = remValue * rootFontSize;
      } else if (paddingTopStr.trim().endsWith('px')) {
        paddingTop = parseFloat(paddingTopStr);
      }

      // Center of the visible viewport area of the hero section
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = paddingTop + (window.innerHeight - paddingTop) / 2;

      // Delta required to translate the image to the exact center of the screen
      const dx = viewportCenterX - imageCenterX;
      const dy = viewportCenterY - imageCenterY;

      setOffsets({ dx, dy });
      setIsInitialized(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateOffsets);
    
    // Slight timeout to make sure elements are positioned in DOM
    const timer = setTimeout(calculateOffsets, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateOffsets);
      clearTimeout(timer);
    };
  }, []);

  const threshold = 350; // Scroll range of the entrance animation
  const progress = Math.min(scrollY / threshold, 1);

  // Profile image calculations
  // Scales down from 1.6 to 1.0; shifts from viewport center to final layout position on scroll
  const scale = 1 + 0.6 * (1 - progress);
  const translateX = offsets.dx * (1 - progress);
  const translateY = offsets.dy * (1 - progress);

  // Left-side hero content styles (fades and translates from bottom)
  const contentStyle = {
    opacity: progress,
    transform: `translate3d(0, ${50 * (1 - progress)}px, 0)`,
    pointerEvents: progress < 0.2 ? 'none' : 'auto',
    animation: 'none', // Disable CSS fadeInUp animation to prevent load flashes
  };

  // Profile image container transform styles
  const imageStyle = {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
    animation: 'none', // Disable CSS fadeIn animation to prevent centering conflicts
  };

  // Scroll down guide opacity (fades out rapidly as scroll progresses)
  const indicatorOpacity = Math.max(1 - progress * 4, 0);

  return (
    <div className="hero-scroll-wrapper" style={{ height: '160vh', position: 'relative' }}>
      <section 
        id="home" 
        className="hero" 
        ref={heroRef}
        style={{ 
          opacity: isInitialized ? 1 : 0, 
          transition: 'opacity 0.4s ease-in-out',
          position: 'sticky',
          top: 'var(--main-padding-top)',
          height: 'calc(100vh - var(--main-padding-top))',
          minHeight: 'auto',
          overflow: 'hidden'
        }}
      >
      {/* Hero Text and CTA content */}
      <div className="hero-content" style={contentStyle}>
        <span className="hero-intro">Welcome to my Portfolio</span>
        <h1 className="hero-name">{personal.name}</h1>
        <div className="hero-title">
          Product Lead <span>|</span> Senior Business Analyst
        </div>

        <div className="hero-location">
          <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }}></i> {personal.location}
        </div>

        {/* Badges matching the design page 1 */}
        <div className="badge-container">
          {personal.badges.map((badge, idx) => (
            <div className="badge" key={idx}>
              <i className={badge.icon}></i> {badge.text}
            </div>
          ))}
        </div>

        <p className="hero-desc">
          As a Senior Business Analyst and Product Lead with over a decade of experience, I specialize in
          delivering high-impact solutions across Supply Chain Management, E-Commerce, and Government
          Services.
          <br />
          I am deeply passionate about modernizing legacy processes through AI-enhanced features. My focus is
          on guiding cross-functional teams through the complete SDLC to ensure products are not only
          functional but intelligent and data-driven—a methodology I recently applied to successfully launch a
          Inhouse OMS and Inventory planning platform integrated with predictive behavioral algorithms and
          compliant data architectures.
        </p>

        {/* Call to Action buttons */}
        <div className="hero-cta">
          <a
            href={`mailto:${personal.email}`}
            onClick={onEmailCta}
            className="btn btn-primary"
            id="email-cta"
          >
            <i className="fa-solid fa-envelope"></i> {personal.email}
          </a>
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            id="linkedin-cta"
          >
            <i className="fa-brands fa-linkedin"></i> LinkedIn
          </a>
          <a
            href={personal.cvUrl}
            onClick={(e) => {
              e.preventDefault();
              onDownloadResume();
            }}
            className="btn btn-secondary"
            id="cv-cta"
          >
            <i className="fa-solid fa-file-pdf"></i> Download Resume
          </a>
        </div>

        {/* Dynamic metrics / Info Bar */}
        <div className="hero-infobar">
          {/* Experience Stat */}
          <div className="info-item" id="experience-stat" tabIndex={0}>
            <span className="info-val">10+</span>
            <span className="info-label">
              Years Exp <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
            </span>
            <div className="experience-inline">
              <span className="experience-btn tarento-btn">
                <i className="fa-solid fa-briefcase"></i> Tarento Group
              </span>
              <span className="experience-btn grey-btn">
                <i className="fa-solid fa-briefcase"></i> Cedcoss Technologies
              </span>
              <span className="experience-btn grey-btn">
                <i className="fa-solid fa-briefcase"></i> Sensation Software Solution
              </span>
              <span className="experience-btn grey-btn">
                <i className="fa-solid fa-briefcase"></i> Contakt Tech Solution
              </span>
            </div>
          </div>

          {/* Projects Stat */}
          <div className="info-item" id="projects-stat" tabIndex={0}>
            <span className="info-val">15+</span>
            <span className="info-label">
              Projects <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
            </span>
            <div className="projects-inline">
              <span className="project-btn">
                <i className="fa-solid fa-warehouse"></i> Cellmark (OMS, WMS, F&O)
              </span>
              <span className="project-btn">
                <i className="fa-solid fa-gem"></i> Pandora (IIS)
              </span>
              <span className="project-btn">
                <i className="fa-solid fa-store"></i> Lulu Hyper-local eCommerce Store
              </span>
              <span className="project-btn">
                <i className="fa-solid fa-file-medical"></i> Health Campaign Management
              </span>
              <span className="project-btn">
                <i className="fa-solid fa-landmark"></i> Faecal Sludge Management System - Odisha Government
              </span>
            </div>
          </div>

          {/* Key Domains Stat */}
          <div className="info-item" id="domains-stat" tabIndex={0}>
            <span className="info-val">3</span>
            <span className="info-label">
              Key Domains <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
            </span>
            <div className="domains-inline">
              <span className="domain-btn">
                <i className="fa-solid fa-truck-ramp-box"></i> Supply Chain Management
              </span>
              <span className="domain-btn">
                <i className="fa-solid fa-cart-shopping"></i> E-Commerce
              </span>
              <span className="domain-btn">
                <i className="fa-solid fa-landmark"></i> Government Services
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Container */}
      <div className="hero-image-container" ref={imageRef} style={imageStyle}>
        <div className="profile-glow"></div>
        <div className="profile-frame">
          <img
            src={personal.avatar}
            alt={`${personal.name} portrait`}
            id="profile-img"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>

      {/* Floating Scroll Indicator (Luxury onboarding chevron) */}
      <div 
        className="hero-scroll-indicator" 
        style={{ 
          opacity: indicatorOpacity,
          pointerEvents: indicatorOpacity < 0.1 ? 'none' : 'auto',
          transition: 'opacity 0.2s ease-out'
        }}
      >
        <span className="scroll-indicator-text">Scroll Down to Explore</span>
        <div className="scroll-indicator-mouse">
          <div className="mouse-wheel"></div>
        </div>
        <i className="fa-solid fa-chevron-down scroll-indicator-chevron"></i>
      </div>
      </section>
    </div>
  );
};

export default Hero;
