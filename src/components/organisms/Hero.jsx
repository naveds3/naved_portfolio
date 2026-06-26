import React, { useState, useEffect, useRef } from 'react';

/**
 * ANIMATION CONSTANTS
 * ANIM_THRESHOLD  – virtual scroll px to complete the entrance animation
 * POST_LOCK_COUNT – extra downward scroll events to absorb after animation before unlocking
 */
const ANIM_THRESHOLD  = 600;
const POST_LOCK_COUNT = 2;

// Detect mobile/touch devices — skip the scroll-lock animation on small screens
const isMobile = () => window.innerWidth <= 768 || ('ontouchstart' in window);

const Hero = ({ personal, onEmailCta, onDownloadResume }) => {
  if (!personal) return null;

  const heroRef  = useRef(null);
  const imageRef = useRef(null);

  // On mobile: start at progress = 1 (animation already complete) to skip scroll lock
  const [virtualScroll, setVirtualScroll] = useState(() => isMobile() ? ANIM_THRESHOLD : 0);
  const [offsets, setOffsets]             = useState({ dx: 0, dy: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Mutable refs used inside event handlers to avoid stale-closure issues
  const virtualScrollRef = useRef(0);
  const isLockedRef      = useRef(true);
  const postLockCount    = useRef(0);
  const touchStartY      = useRef(0);

  // ─── 1. Measure image offsets to know how far to translate it ──────────
  useEffect(() => {
    const calculateOffsets = () => {
      if (!imageRef.current || !heroRef.current) return;

      // Temporarily clear transform so getBoundingClientRect returns layout pos
      const saved = imageRef.current.style.transform;
      imageRef.current.style.transform = 'none';
      const rect = imageRef.current.getBoundingClientRect();
      imageRef.current.style.transform = saved;

      const imageCenterX = rect.left + rect.width  / 2;
      const imageCenterY = rect.top  + rect.height / 2;

      const rootStyle = window.getComputedStyle(document.documentElement);
      const padStr    = rootStyle.getPropertyValue('--main-padding-top') || '112px';
      let paddingTop  = 112;
      if (padStr.trim().endsWith('rem')) {
        const fs   = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        paddingTop = parseFloat(padStr) * fs;
      } else if (padStr.trim().endsWith('px')) {
        paddingTop = parseFloat(padStr);
      }

      const vpCX = window.innerWidth  / 2;
      const vpCY = paddingTop + (window.innerHeight - paddingTop) / 2;

      setOffsets({ dx: vpCX - imageCenterX, dy: vpCY - imageCenterY });
      setIsInitialized(true);
    };

    const timer = setTimeout(calculateOffsets, 100);
    window.addEventListener('resize', calculateOffsets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateOffsets);
    };
  }, []);

  // ─── 2. Virtual-scroll engine + page-lock ─────────────────────────────
  useEffect(() => {
    // Skip scroll lock on mobile — no virtual scroll needed
    if (isMobile()) return;

    const unlock = () => {
      isLockedRef.current = false;
      document.documentElement.style.overflow = '';
      document.body.style.overflow             = '';
      // Wait one frame for the overflow change to take effect, then sync scroll position
      requestAnimationFrame(() => {
        window.scrollTo({ top: ANIM_THRESHOLD, behavior: 'instant' });
      });
    };

    const onWheel = (e) => {
      if (!isLockedRef.current) return;
      e.preventDefault();

      const currentProgress = virtualScrollRef.current / ANIM_THRESHOLD;

      if (currentProgress < 1) {
        // Drive animation forward (or back if user scrolls up)
        virtualScrollRef.current = Math.max(0, virtualScrollRef.current + e.deltaY);
        setVirtualScroll(virtualScrollRef.current);
      } else {
        // Animation done — count extra downward events then unlock
        if (e.deltaY > 0) {
          postLockCount.current += 1;
          if (postLockCount.current >= POST_LOCK_COUNT) unlock();
        }
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isLockedRef.current) return;
      e.preventDefault();

      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;

      const currentProgress = virtualScrollRef.current / ANIM_THRESHOLD;

      if (currentProgress < 1) {
        virtualScrollRef.current = Math.max(0, virtualScrollRef.current + deltaY);
        setVirtualScroll(virtualScrollRef.current);
      } else {
        if (deltaY > 5) {
          postLockCount.current += 1;
          if (postLockCount.current >= POST_LOCK_COUNT) unlock();
        }
      }
    };

    // Lock the page immediately on mount
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow             = 'hidden';

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      document.documentElement.style.overflow = '';
      document.body.style.overflow             = '';
    };
  }, []);

  // ─── 3. Derived animation values ──────────────────────────────────────
  const progress = Math.min(virtualScroll / ANIM_THRESHOLD, 1);

  // Image: scale 1.6→1.0, translate from screen-centre to final layout pos
  const scale      = 1 + 0.6 * (1 - progress);
  const translateX = offsets.dx * (1 - progress);
  const translateY = offsets.dy * (1 - progress);

  const imageStyle = {
    transform : `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
    animation : 'none',
    transition: 'none',
  };

  // Text: fade in + slide up from below
  const contentStyle = {
    opacity      : progress,
    transform    : `translate3d(0, ${50 * (1 - progress)}px, 0)`,
    pointerEvents: progress < 0.2 ? 'none' : 'auto',
    animation    : 'none',
    transition   : 'none',
  };

  // Scroll indicator fades out as animation starts
  const indicatorOpacity = Math.max(1 - progress * 4, 0);

  return (
    /* Wrapper gives the sticky section room inside the scroll container */
    <div
      className="hero-scroll-wrapper"
      style={{ height: isMobile() ? 'auto' : `calc(${ANIM_THRESHOLD}px + 100vh)`, position: 'relative', zIndex: 10 }}
    >
      <section
        id="home"
        className="hero"
        ref={heroRef}
        style={{
          opacity   : isInitialized ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          position  : 'sticky',
          top       : 'var(--main-padding-top)',
          height    : 'calc(100vh - var(--main-padding-top))',
          maxHeight : 'calc(100vh - var(--main-padding-top))',
          minHeight : 'auto',
          overflow  : 'hidden',
          zIndex    : 10,
        }}
      >
        {/* ── Hero Text ── */}
        <div className="hero-content" style={contentStyle}>
          <span className="hero-intro">Welcome to my Portfolio</span>
          <h1 className="hero-name">{personal.name}</h1>
          <div className="hero-title">
            Product Lead <span>|</span> Senior Business Analyst
          </div>

          <div className="hero-location">
            <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }}></i> {personal.location}
          </div>

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
              onClick={(e) => { e.preventDefault(); onDownloadResume(); }}
              className="btn btn-secondary"
              id="cv-cta"
            >
              <i className="fa-solid fa-file-pdf"></i> Download Resume
            </a>
          </div>

          {/* Info Bar */}
          <div className="hero-infobar">
            {/* Experience */}
            <div className="info-item" id="experience-stat" tabIndex={0}>
              <span className="info-val">10+</span>
              <span className="info-label">
                Years Exp <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
              </span>
              <div className="experience-inline">
                <span className="experience-btn tarento-btn"><i className="fa-solid fa-briefcase"></i> Tarento Group</span>
                <span className="experience-btn grey-btn"><i className="fa-solid fa-briefcase"></i> Cedcoss Technologies</span>
                <span className="experience-btn grey-btn"><i className="fa-solid fa-briefcase"></i> Sensation Software Solution</span>
                <span className="experience-btn grey-btn"><i className="fa-solid fa-briefcase"></i> Contakt Tech Solution</span>
              </div>
            </div>

            {/* Projects */}
            <div className="info-item" id="projects-stat" tabIndex={0}>
              <span className="info-val">15+</span>
              <span className="info-label">
                Projects <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
              </span>
              <div className="projects-inline">
                <span className="project-btn"><i className="fa-solid fa-warehouse"></i> Cellmark (OMS, WMS, F&amp;O)</span>
                <span className="project-btn"><i className="fa-solid fa-gem"></i> Pandora (IIS)</span>
                <span className="project-btn"><i className="fa-solid fa-store"></i> Lulu Hyper-local eCommerce Store</span>
                <span className="project-btn"><i className="fa-solid fa-file-medical"></i> Health Campaign Management</span>
                <span className="project-btn"><i className="fa-solid fa-landmark"></i> Faecal Sludge Management System - Odisha Government</span>
              </div>
            </div>

            {/* Key Domains */}
            <div className="info-item" id="domains-stat" tabIndex={0}>
              <span className="info-val">3</span>
              <span className="info-label">
                Key Domains <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '2px', opacity: 0.7 }}></i>
              </span>
              <div className="domains-inline">
                <span className="domain-btn"><i className="fa-solid fa-truck-ramp-box"></i> Supply Chain Management</span>
                <span className="domain-btn"><i className="fa-solid fa-cart-shopping"></i> E-Commerce</span>
                <span className="domain-btn"><i className="fa-solid fa-landmark"></i> Government Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Profile Image ── */}
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

        {/* ── Scroll Indicator ── */}
        <div
          className="hero-scroll-indicator"
          style={{
            opacity      : indicatorOpacity,
            pointerEvents: indicatorOpacity < 0.1 ? 'none' : 'auto',
            transition   : 'opacity 0.2s ease-out',
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
