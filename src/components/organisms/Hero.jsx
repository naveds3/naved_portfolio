import React, { useState, useEffect, useRef } from 'react';

/**
 * ANIMATION CONSTANTS
 * ANIM_THRESHOLD  – virtual scroll px to complete the entrance animation
 * POST_LOCK_COUNT – extra downward scroll events to absorb after animation before unlocking
 */
const ANIM_THRESHOLD  = 600;
const POST_LOCK_COUNT = 2;

// Detect mobile/touch devices — skip the scroll-lock animation on small/tablet screens
const isMobile = () => window.innerWidth <= 1024;

const Hero = ({ personal, onEmailCta, onDownloadResume }) => {
  const heroRef  = useRef(null);
  const imageRef = useRef(null);

  const shouldSkipAnimation = () => {
    return isMobile() || (window.location.hash && window.location.hash !== '#home');
  };

  // On mobile/deep-link: start at progress = 1 (animation already complete) to skip scroll lock
  const [virtualScroll, setVirtualScroll] = useState(() => shouldSkipAnimation() ? ANIM_THRESHOLD : 0);
  const [offsets, setOffsets]             = useState({ dx: 0, dy: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Mutable refs used inside event handlers to avoid stale-closure issues
  const virtualScrollRef = useRef(shouldSkipAnimation() ? ANIM_THRESHOLD : 0);
  const isLockedRef      = useRef(!shouldSkipAnimation());
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
      const mainPaddingTop = parseInt(rootStyle.getPropertyValue('--main-padding-top')) || 0;

      const viewportWidth  = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // In the stacked mobile layout, translation is disabled
      if (isMobile()) {
        setOffsets({ dx: 0, dy: 0 });
        setVirtualScroll(ANIM_THRESHOLD);
        setIsInitialized(true);
        return;
      }

      const dx = (viewportWidth / 2) - imageCenterX;
      const dy = ((viewportHeight - mainPaddingTop) / 2) - (imageCenterY - mainPaddingTop);

      setOffsets({ dx, dy });
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
    // Skip scroll lock on mobile or when hash requires it — no virtual scroll needed
    if (shouldSkipAnimation()) return;

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

    // Unlock dynamically if screen is resized below tablet threshold
    const handleResize = () => {
      if (isMobile()) {
        unlock();
      }
    };

    // Lock the page immediately on mount
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow             = 'hidden';

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('resize',     handleResize);

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('resize',     handleResize);
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

  if (!personal) return null;

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
