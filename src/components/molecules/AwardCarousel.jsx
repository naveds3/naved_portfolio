import React, { useRef } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, EmojiEvents } from '@mui/icons-material';

// Swiper core + required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';

// Swiper base + effect styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* ─── Award data ──────────────────────────────────────────────────────── */
const awards = [
  { file: 'award_customer_delight_q2_2021.png',       title: 'Customer Delight',           period: 'Q2 2021'    },
  { file: 'award_spot_q1_fy25.png',                   title: 'Spot Award',                 period: 'Q1 FY25'    },
  { file: 'award_customer_delight_q2_fy25.png',       title: 'Customer Delight',           period: 'Q2 FY25'    },
  { file: 'award_spot_q2_fy25.png',                   title: 'Spot Award',                 period: 'Q2 FY25'    },
  { file: 'award_outstanding_performer_q3_fy25.png',  title: 'Outstanding Performer',      period: 'Q3 FY25'    },
  { file: 'award_customer_delight_q1_fy26.png',       title: 'Customer Delight',           period: 'Q1 FY26'    },
];

/* ─── AwardCarousel component ─────────────────────────────────────────── */
const AwardCarousel = ({ onPreview }) => {
  const swiperRef = useRef(null);

  return (
    <Box
      className="awards-carousel-section"
      sx={{ mt: '3rem', width: '100%' }}
    >
      {/* ── Section heading — left-aligned, matches "Key Contributions" style ── */}
      <Typography
        variant="h3"
        className="contributions-title"
        sx={{
          fontSize: '1.4rem',
          fontWeight: 800,
          mb: '2.5rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontFamily: 'var(--font-heading)',
          width: '100%',
          alignSelf: 'flex-start',
          textAlign: 'left',
        }}
      >
        <EmojiEvents sx={{ color: 'var(--accent)', fontSize: '1.6rem' }} />
        Recognitions &amp; Awards
      </Typography>

      {/* ── Swiper Carousel ─────────────────────────────────────────────── */}
      <Box
        className="awards-swiper-wrapper"
        sx={{
          width: '100%',
          position: 'relative',
          /* Swiper pagination dot overrides scoped here */
          '& .swiper-pagination-bullet': {
            backgroundColor: 'var(--border-color)',
            opacity: 1,
            width: '8px',
            height: '8px',
            transition: 'all 0.3s ease',
          },
          '& .swiper-pagination-bullet-active': {
            backgroundColor: 'var(--accent)',
            width: '24px',
            borderRadius: '4px',
            boxShadow: '0 0 8px var(--accent-glow)',
          },
          '& .swiper-pagination': {
            bottom: '0px',
            position: 'relative',
            mt: '1.25rem',
          },
        }}
      >
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation, A11y]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          slideToClickedSlide={true}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSlideChange={(swiper) => {
            swiper.autoplay.start();
          }}
          pagination={{ clickable: true, el: '.awards-custom-pagination' }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1.2,
            slideShadows: true,
          }}
          style={{ paddingBottom: '0.5rem' }}
          a11y={{ prevSlideMessage: 'Previous award', nextSlideMessage: 'Next award' }}
        >
          {awards.map((award, idx) => (
            <SwiperSlide
              key={idx}
              style={{ width: '280px', cursor: 'pointer' }}
            >
              {({ isActive }) => (
                <Box
                  onClick={() => {
                    if (isActive && onPreview) {
                      const previewGroup = awards.map(a => ({
                        src: `assets/${a.file}`,
                        caption: `Award: ${a.title} — ${a.period}`
                      }));
                      onPreview(`assets/${award.file}`, `Award: ${award.title} — ${award.period}`, previewGroup, idx);
                    }
                  }}
                  sx={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: isActive
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border-color)',
                    boxShadow: isActive
                      ? '0 12px 35px -8px var(--accent-glow), 0 4px 16px rgba(0,0,0,0.35)'
                      : '0 4px 14px rgba(0,0,0,0.2)',
                    backgroundColor: 'var(--bg-secondary)',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Award image */}
                  <Box
                    component="img"
                    src={`assets/${award.file}`}
                    alt={`${award.title} — ${award.period}`}
                    sx={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'contain',
                      backgroundColor: isActive
                        ? 'rgba(197, 163, 88, 0.04)'
                        : 'var(--bg-secondary)',
                      display: 'block',
                      padding: '1rem',
                    }}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Caption bar */}
                  <Box
                    sx={{
                      padding: '0.75rem 1rem',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      backgroundColor: isActive
                        ? 'var(--badge-bg)'
                        : 'transparent',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {award.title}
                    </Typography>
                    <Chip
                      label={award.period}
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        height: '20px',
                        backgroundColor: isActive ? 'var(--accent)' : 'var(--badge-bg)',
                        color: isActive ? '#fff' : 'var(--accent)',
                        border: '1px solid',
                        borderColor: isActive ? 'var(--accent)' : 'var(--badge-border)',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        '& .MuiChip-label': { px: '6px' },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Custom nav arrows ── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            mt: '1.5rem',
          }}
        >
          <IconButton
            aria-label="Previous award"
            onClick={() => swiperRef.current?.slidePrev()}
            size="small"
            sx={{
              width: 36,
              height: 36,
              border: '1px solid var(--badge-border)',
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--accent)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'var(--accent)',
                color: '#fff',
                borderColor: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent-glow)',
              },
            }}
          >
            <KeyboardArrowLeft fontSize="small" />
          </IconButton>

          {/* Custom pagination dots container */}
          <Box
            className="awards-custom-pagination"
            sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          />

          <IconButton
            aria-label="Next award"
            onClick={() => swiperRef.current?.slideNext()}
            size="small"
            sx={{
              width: 36,
              height: 36,
              border: '1px solid var(--badge-border)',
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--accent)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'var(--accent)',
                color: '#fff',
                borderColor: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent-glow)',
              },
            }}
          >
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AwardCarousel;
