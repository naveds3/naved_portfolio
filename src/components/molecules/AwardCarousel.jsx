import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const awards = [
  { file: 'award_customer_delight_q2_2021.png', title: 'Customer Delight - Q2 2021' },
  { file: 'award_spot_q1_fy25.png', title: 'Spot Award - Q1 FY25' },
  { file: 'award_customer_delight_q2_fy25.png', title: 'Customer Delight - Q2 FY25' },
  { file: 'award_spot_q2_fy25.png', title: 'Spot Award - Q2 FY25' },
  { file: 'award_outstanding_performer_q3_fy25.png', title: 'Outstanding Performer of the Quarter - Q3 FY25' },
  { file: 'award_customer_delight_q1_fy26.png', title: 'Customer Delight - Q1 FY26' }
];

const AwardCarousel = ({ onPreview }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % awards.length);
    }, 3000);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + awards.length) % awards.length);
    startAutoplay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % awards.length);
    startAutoplay();
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveIndex(index);
    startAutoplay();
  };

  const handleSlideClick = (e, idx) => {
    e.stopPropagation();
    if (idx === activeIndex) {
      onPreview(`assets/${awards[idx].file}`, `Award: ${awards[idx].title}`);
    } else {
      setActiveIndex(idx);
      startAutoplay();
    }
  };

  const prevIndex = (activeIndex - 1 + awards.length) % awards.length;
  const nextIndex = (activeIndex + 1) % awards.length;

  return (
    <Box className="awards-carousel-section" sx={{ mt: '3rem' }}>
      <Typography variant="h4" className="awards-carousel-title" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
        <i className="fa-solid fa-trophy" style={{ color: 'var(--accent)' }} /> Recognitions & Awards
      </Typography>

      <Box className="awards-carousel-wrapper" sx={{ position: 'relative', maxWidth: '650px', margin: '0 auto' }}>
        <Box
          className="awards-carousel-container"
          sx={{
            position: 'relative',
            height: '240px',
            overflow: 'hidden',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box className="awards-carousel-track" sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {awards.map((award, idx) => {
              let className = 'award-slide';
              if (idx === activeIndex) className += ' active';
              else if (idx === prevIndex) className += ' prev';
              else if (idx === nextIndex) className += ' next';

              return (
                <Box
                  key={idx}
                  className={className}
                  onClick={(e) => handleSlideClick(e, idx)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.65)',
                    width: '320px',
                    height: '200px',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    zIndex: 1,
                    '&.active': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      opacity: 1,
                      visibility: 'visible',
                      zIndex: 3,
                    },
                    '&.prev': {
                      transform: 'translate(-95%, -50%) scale(0.8)',
                      opacity: 0.4,
                      visibility: 'visible',
                      zIndex: 2,
                    },
                    '&.next': {
                      transform: 'translate(-5%, -50%) scale(0.8)',
                      opacity: 0.4,
                      visibility: 'visible',
                      zIndex: 2,
                    },
                  }}
                >
                  <img
                    src={`assets/${award.file}`}
                    alt={award.title}
                    className="award-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      border: idx === activeIndex ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      boxShadow: idx === activeIndex ? '0 10px 25px rgba(20, 184, 166, 0.25)' : 'none',
                      backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Controls */}
          <button className="carousel-control prev" onClick={handlePrev} aria-label="Previous Award">
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button className="carousel-control next" onClick={handleNext} aria-label="Next Award">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </Box>

        <Box className="award-caption-box" sx={{ textAlign: 'center', mt: '1rem', height: '1.5rem' }}>
          <Typography className="award-caption-text" sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {awards[activeIndex].title}
          </Typography>
        </Box>

        {/* Dots */}
        <Box className="carousel-dots" sx={{ display: 'flex', justifyContent: 'center', gap: '8px', mt: '0.75rem' }}>
          {awards.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === activeIndex ? ' active' : ''}`}
              onClick={(e) => handleDotClick(e, idx)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AwardCarousel;
