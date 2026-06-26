document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Switcher ---
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Load existing preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    let isScrollingFromClick = false;
    let scrollTimeout = null;

    const setLinkClickedActive = (targetLink) => {
        navLinks.forEach(link => {
            if (link === targetLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        isScrollingFromClick = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrollingFromClick = false;
        }, 1000);
    };

    // Close mobile menu and handle active state when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('open');
            }
            if (mobileMenuToggle) {
                const toggleIcon = mobileMenuToggle.querySelector('i');
                if (toggleIcon) {
                    toggleIcon.className = 'fa-solid fa-bars';
                }
            }
            setLinkClickedActive(link);
        });
    });

    // Scroll to top when Home links/logo are clicked
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Update URL hash
            history.pushState(null, null, '#home');
            
            if (navMenu) {
                navMenu.classList.remove('open');
            }
            if (mobileMenuToggle) {
                const toggleIcon = mobileMenuToggle.querySelector('i');
                if (toggleIcon) {
                    toggleIcon.className = 'fa-solid fa-bars';
                }
            }

            const homeNavLink = document.querySelector('.nav-link[href="#home"]');
            if (homeNavLink) {
                setLinkClickedActive(homeNavLink);
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const activeSections = new Set();
    
    const navObserverOptions = {
        root: null,
        threshold: 0,
        rootMargin: "0px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        if (isScrollingFromClick) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSections.add(entry.target);
            } else {
                activeSections.delete(entry.target);
            }
        });

        if (activeSections.size > 0) {
            let activeSection = null;
            const sortedSections = Array.from(activeSections).sort((a, b) => {
                return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
            });

            const isAtTop = window.scrollY < 10;
            const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 15);

            if (isAtTop) {
                activeSection = document.getElementById('home');
            } else if (isAtBottom) {
                activeSection = sortedSections[sortedSections.length - 1] || null;
            } else {
                for (let i = sortedSections.length - 1; i >= 0; i--) {
                    const rect = sortedSections[i].getBoundingClientRect();
                    if (rect.top <= 90 && rect.bottom >= 90) {
                        activeSection = sortedSections[i];
                        break;
                    }
                }
            }

            if (activeSection) {
                const activeId = activeSection.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Copy Email to Clipboard ---
    const emailCta = document.getElementById('email-cta');
    const contactEmailCard = document.getElementById('contact-email-card');
    const toast = document.getElementById('toast');
    
    const copyEmailAndMailto = (e) => {
        e.preventDefault();
        const email = 'naveds3@gmail.com';
        
        navigator.clipboard.writeText(email).then(() => {
            // Show toast notification
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
            
            // Still trigger the mailto in background or after copy
            window.location.href = `mailto:${email}`;
        }).catch(err => {
            // Fallback: just open mailto directly
            window.location.href = `mailto:${email}`;
        });
    };

    if (emailCta) {
        emailCta.addEventListener('click', copyEmailAndMailto);
    }
    if (contactEmailCard) {
        contactEmailCard.addEventListener('click', copyEmailAndMailto);
    }

    // --- Force PDF Download ---
    const cvCta = document.getElementById('cv-cta');
    const footerCvLink = document.querySelector('footer .footer-socials a[title="Download Resume"]');
    
    const triggerDownload = (e, url, filename) => {
        e.preventDefault();
        try {
            // Check if base64 data is loaded
            const base64Data = window.resumeBase64;
            if (!base64Data) {
                throw new Error('Base64 data not loaded');
            }
            
            // Convert Base64 to binary data (Blob)
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            
            // Trigger browser download dialog
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
            // Fallback to traditional fetch download
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

    const cvUrl = 'assets/Naved%20Siddiqui%20-%20Product%20Lead_Business%20Analyst.pdf';
    const cvFilename = 'Naved Siddiqui - Product Lead_Business Analyst.pdf';

    if (cvCta) {
        cvCta.addEventListener('click', (e) => triggerDownload(e, cvUrl, cvFilename));
    }
    if (footerCvLink) {
        footerCvLink.addEventListener('click', (e) => triggerDownload(e, cvUrl, cvFilename));
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Awards Carousel Variables for Modal Sync ---
    let isModalCarouselActive = false;
    let stopModalAwardCarousel = () => {};
    let startAwardCarousel = () => {};

    // --- Modal Slide Preview ---
    const slideModal = document.getElementById('slide-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');
    const previewButtons = document.querySelectorAll('.btn-preview-slide');
    const certCards = document.querySelectorAll('.cert-card');

    const openModal = (imagePath, captionText) => {
        modalImg.src = imagePath;
        modalCaption.textContent = captionText;
        slideModal.style.display = 'flex';
        
        // Timeout to allow DOM updates before active class transition
        setTimeout(() => {
            slideModal.classList.add('active');
        }, 10);
    };

    const closeModal = () => {
        slideModal.classList.remove('active');
        setTimeout(() => {
            slideModal.style.display = 'none';
            modalImg.src = '';
        }, 300);

        if (isModalCarouselActive) {
            isModalCarouselActive = false;
            stopModalAwardCarousel();
            startAwardCarousel();
        }
    };

    previewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slideName = btn.getAttribute('data-slide');
            
            // Format the caption nicely
            const cleanName = slideName
                .replace('.png', '')
                .substring(slideName.indexOf('_') + 1)
                .replace(/-/g, ' ');
                
            openModal(`assets/slides/${slideName}`, `Presentation Slide: ${cleanName}`);
        });
    });

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const certFile = card.getAttribute('data-cert');
            const certTitle = card.getAttribute('data-title');
            openModal(`assets/certifications/${certFile}`, `Credential: ${certTitle}`);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    // Close modal on clicking outside the image container
    slideModal.addEventListener('click', (e) => {
        if (e.target === slideModal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slideModal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Skills Tab Switching ---
    const skillsTabButtons = document.querySelectorAll('.skills-tabs .tab-btn');
    const skillsTabContents = document.querySelectorAll('.skills-tab-content');

    skillsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Remove active class from all buttons
            skillsTabButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Toggle active content
            skillsTabContents.forEach(content => {
                if (content.id === targetId) {
                    content.style.display = 'block';
                    // Micro-timeout to trigger opacity transition
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 20);
                } else {
                    content.classList.remove('active');
                    content.style.display = 'none';
                }
            });
        });
    });

    // --- Tarento Awards Carousel Logic ---
    const awards = [
        { file: 'award_customer_delight_q2_2021.png', title: 'Customer Delight - Q2 2021' },
        { file: 'award_spot_q1_fy25.png', title: 'Spot Award - Q1 FY25' },
        { file: 'award_customer_delight_q2_fy25.png', title: 'Customer Delight - Q2 FY25' },
        { file: 'award_spot_q2_fy25.png', title: 'Spot Award - Q2 FY25' },
        { file: 'award_outstanding_performer_q3_fy25.png', title: 'Outstanding Performer of the Quarter - Q3 FY25' },
        { file: 'award_customer_delight_q1_fy26.png', title: 'Customer Delight - Q1 FY26' }
    ];

    let currentAwardIndex = 0;
    let awardInterval = null;
    let modalAwardInterval = null;

    const awardSlides = document.querySelectorAll('.award-slide');
    const awardDots = document.querySelectorAll('.carousel-dots .dot');
    const awardCaptionText = document.querySelector('.award-caption-text');
    const prevAwardBtn = document.querySelector('.carousel-control.prev');
    const nextAwardBtn = document.querySelector('.carousel-control.next');
    const carouselTrack = document.querySelector('.awards-carousel-container');

    const updateAwardCarousel = (index) => {
        currentAwardIndex = (index + awards.length) % awards.length;
        const prevIndex = (currentAwardIndex - 1 + awards.length) % awards.length;
        const nextIndex = (currentAwardIndex + 1) % awards.length;
        
        // Update slides classes
        awardSlides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev', 'next');
            if (idx === currentAwardIndex) {
                slide.classList.add('active');
            } else if (idx === prevIndex) {
                slide.classList.add('prev');
            } else if (idx === nextIndex) {
                slide.classList.add('next');
            }
        });

        // Update dots
        awardDots.forEach((dot, idx) => {
            if (idx === currentAwardIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update caption
        if (awardCaptionText) {
            awardCaptionText.textContent = awards[currentAwardIndex].title;
        }

        // If modal is currently open for awards, update the modal content as well
        if (isModalCarouselActive) {
            const modalImgEl = document.getElementById('modal-img');
            const modalCaptionEl = document.getElementById('modal-caption');
            if (modalImgEl && modalCaptionEl) {
                modalImgEl.src = `assets/${awards[currentAwardIndex].file}`;
                modalCaptionEl.textContent = `Award: ${awards[currentAwardIndex].title}`;
            }
        }
    };

    startAwardCarousel = () => {
        stopAwardCarousel();
        awardInterval = setInterval(() => {
            updateAwardCarousel(currentAwardIndex + 1);
        }, 3000);
    };

    const stopAwardCarousel = () => {
        if (awardInterval) {
            clearInterval(awardInterval);
            awardInterval = null;
        }
    };

    const startModalAwardCarousel = () => {
        stopModalAwardCarousel();
        modalAwardInterval = setInterval(() => {
            updateAwardCarousel(currentAwardIndex + 1);
        }, 5000);
    };

    stopModalAwardCarousel = () => {
        if (modalAwardInterval) {
            clearInterval(modalAwardInterval);
            modalAwardInterval = null;
        }
    };

    // Button click listeners
    if (prevAwardBtn) {
        prevAwardBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            updateAwardCarousel(currentAwardIndex - 1);
            if (!isModalCarouselActive) {
                startAwardCarousel(); // Reset timer
            } else {
                startModalAwardCarousel(); // Reset modal timer
            }
        });
    }

    if (nextAwardBtn) {
        nextAwardBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            updateAwardCarousel(currentAwardIndex + 1);
            if (!isModalCarouselActive) {
                startAwardCarousel(); // Reset timer
            } else {
                startModalAwardCarousel(); // Reset modal timer
            }
        });
    }

    // Dot click listeners
    awardDots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            updateAwardCarousel(idx);
            if (!isModalCarouselActive) {
                startAwardCarousel();
            } else {
                startModalAwardCarousel();
            }
        });
    });

    // Click handlers for individual slides (prev/next slide to center, active opens preview)
    awardSlides.forEach((slide, idx) => {
        slide.addEventListener('click', (e) => {
            e.stopPropagation();
            if (slide.classList.contains('active')) {
                stopAwardCarousel();
                isModalCarouselActive = true;
                openModal(`assets/${awards[currentAwardIndex].file}`, `Award: ${awards[currentAwardIndex].title}`);
                startModalAwardCarousel();
            } else if (slide.classList.contains('prev')) {
                updateAwardCarousel(currentAwardIndex - 1);
                if (!isModalCarouselActive) {
                    startAwardCarousel();
                } else {
                    startModalAwardCarousel();
                }
            } else if (slide.classList.contains('next')) {
                updateAwardCarousel(currentAwardIndex + 1);
                if (!isModalCarouselActive) {
                    startAwardCarousel();
                } else {
                    startModalAwardCarousel();
                }
            }
        });
    });

    // Start the carousel initially
    if (awardSlides.length > 0) {
        updateAwardCarousel(0);
        startAwardCarousel();
    }
});
