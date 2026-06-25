document.addEventListener('DOMContentLoaded', () => {

    // Dynamic Multi-Project Case Study Data
    const projectData = {
        cellmark: {
            title: "CROPS 2.0 Project Case Study",
            subtitle: "A Collaborative Modernization of Global Supply Chain Management",
            badges: [
                { text: "Client: Cellmark", class: "client-badge" },
                { text: "Implementation Partner: Tarento Group", class: "partner-badge" }
            ],
            illustration: "assets/cellmark-case-study/cargo-ship-illustration.png",
            slides: [
                {
                    src: 'assets/cellmark-case-study/1_CROPS-20-Project-Case-Study.png',
                    title: '01. CROPS 2.0 Project Case Study',
                    details: {
                        icon: "fa-compass",
                        title: "01. Project Initiation & Overview",
                        body: `<ul>
                                   <li><strong>Initiative:</strong> Re-engineering legacy Order Management System (OMS) as <strong>CROPS 2.0</strong>.</li>
                                   <li><strong>Collaboration:</strong> Deep integration between Cellmark Recycling and partner Tarento Group.</li>
                                   <li><strong>Goal:</strong> Replace manual Excel workflows with real-time OMS and IFS ERP systems.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/2_Executive-Summary.png',
                    title: '02. Executive Summary',
                    details: {
                        icon: "fa-bullseye",
                        title: "02. Executive Summary",
                        body: `<ul>
                                   <li><strong>Methodology:</strong> Agile-driven cross-functional coordination and sprint planning.</li>
                                   <li><strong>Core Deliverable:</strong> Highly flexible, scalable Order Management System fully integrated with IFS.</li>
                                   <li><strong>Business Value:</strong> Enhanced operational efficiency, financial transparency, and real-time visibility.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/3_Project-Background-and-Business-Challenge.png',
                    title: '03. Project Background & Challenge',
                    details: {
                        icon: "fa-circle-exclamation",
                        title: "03. The Core Challenges",
                        cardClass: "challenge-card",
                        body: `<ul>
                                   <li><strong>Flexibility:</strong> Europe's combined invoicing rules were unsupported.</li>
                                   <li><strong>Workarounds:</strong> Spreadsheet reliance for costing and data uploads.</li>
                                   <li><strong>Granularity:</strong> Bundled ocean freight charges hid true margins.</li>
                                   <li><strong>Usability:</strong> Legacy search workflows were slow and inefficient.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/4_The-Project-Team-and-Agile-Approach.png',
                    title: '04. Project Team & Agile Approach',
                    details: {
                        icon: "fa-people-group",
                        title: "04. Agile Team & Roles",
                        body: `<p>Agile sprint team composition and core workflow responsibilities:</p>
                               <div class="roles-grid">
                                   <div class="role-item"><strong>Project Management:</strong> Sprints, risk mitigation, and roadmaps.</div>
                                   <div class="role-item"><strong>Business Analysis (Naved):</strong> BRD/FRD definition, user stories, workshops.</div>
                                   <div class="role-item"><strong>Development:</strong> Custom engine, tax billing, and API integrations.</div>
                                   <div class="role-item"><strong>Quality Assurance:</strong> Automated scripts and comprehensive regression runs.</div>
                               </div>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/5_Solution-Highlights-and-Collaborative-Execution.png',
                    title: '05. Solution Highlights & Execution',
                    details: {
                        icon: "fa-layer-group",
                        title: "05. Solution Blueprint",
                        body: `<ul>
                                   <li><strong>Combined Invoicing:</strong> Custom logic for cross-border European VAT orders.</li>
                                   <li><strong>Ocean Freight:</strong> Cost disaggregation for ledger-level profit transparency.</li>
                                   <li><strong>Vendor Payments:</strong> Interactive settlement screens with manual tax buffers.</li>
                                   <li><strong>Usability Updates:</strong> Enterprise ERP migration, customs HS codes, and stock filters.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/6_European-Domestic-Combined-Invoicing.png',
                    title: '06. European Combined Invoicing',
                    details: {
                        icon: "fa-file-invoice-dollar",
                        title: "06. Domestic Combined Invoicing (Solution A)",
                        body: `<ul>
                                   <li><strong>Challenge:</strong> Combining multiple container bookings into single VAT invoicing blocks.</li>
                                   <li><strong>BAs Input:</strong> Mapped regional European VAT workflows and exception boundaries.</li>
                                   <li><strong>Solution:</strong> Two-step posting workflow (MTS to AR) with automatic transactional rollbacks.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/7_Granular-Financial-Posting-for-Ocean-Freight.png',
                    title: '07. Ocean Freight Financial Posting',
                    details: {
                        icon: "fa-anchor",
                        title: "07. Granular Ocean Freight Posting (Solution B)",
                        body: `<ul>
                                   <li><strong>Challenge:</strong> Bundled logistics charges obscured gross margins and multi-currency AP matching.</li>
                                   <li><strong>BAs Input:</strong> Held accounting workshops to map granular costing lines.</li>
                                   <li><strong>Solution:</strong> Engine disaggregation of Freight Rate, BAF, CAF, and local fees.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/8_Enhanced-Vendor-Payment-and-Tax-Adjustment.png',
                    title: '08. Vendor Payment & Tax Adjustment',
                    details: {
                        icon: "fa-calculator",
                        title: "08. Vendor Payment & Tax Adjustment (Solution C)",
                        body: `<ul>
                                   <li><strong>Challenge:</strong> Rounding discrepancies locked payment settlements due to static tax rules.</li>
                                   <li><strong>BAs Input:</strong> Specified a secure tax override workflow with validation ranges.</li>
                                   <li><strong>Solution:</strong> Editable payment tax fields allowing manual adjustments within set tolerances.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/9_Data-Management-and-Usability-Improvements.png',
                    title: '09. Data & Usability Improvements',
                    details: {
                        icon: "fa-database",
                        title: "09. Data & Usability Improvements (Solution D)",
                        body: `<ul>
                                   <li><strong>ERP Migration:</strong> Clean cutover from legacy Microsoft Great Plains to IFS platform.</li>
                                   <li><strong>Customs Compliance:</strong> Integrated standard HS Code compliance to order lines.</li>
                                   <li><strong>Data Upload:</strong> Revamped Ocean Freight Excel template and backend parser.</li>
                                   <li><strong>Inventory UX:</strong> Upgraded stock search filters based on daily user surveys.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/10_A-Pivotal-Challenge-The-Inventory-Demo-Session.png',
                    title: '10. The Inventory Demo Session',
                    details: {
                        icon: "fa-users-gear",
                        title: "10. Overcoming the Inventory Demo Hurdle",
                        cardClass: "highlighted-card",
                        body: `<ul>
                                   <li><strong>Crucial Block:</strong> Regional users identified sync mismatches between OMS and 3PL ledgers.</li>
                                   <li><strong>Product Leadership:</strong> Naved coordinated mapping reviews and schema alignments.</li>
                                   <li><strong>Resolution:</strong> Prompt db sync update and hotfix deployment, securing user buy-in.</li>
                               </ul>`
                    }
                },
                {
                    src: 'assets/cellmark-case-study/11_Outcomes-and-Business-Impact.png',
                    title: '11. Outcomes & Business Impact',
                    details: {
                        icon: "fa-chart-line",
                        title: "11. Outcomes & Business Impact",
                        cardClass: "impact-card",
                        body: `<div class="metrics-grid">
                                   <div class="metric-item"><span class="metric-num">99%</span> <span class="metric-label">Reduction in Billing Errors</span></div>
                                   <div class="metric-item"><span class="metric-num">Hours</span> <span class="metric-label">vs. Days for Freight Posting</span></div>
                                   <div class="metric-item"><span class="metric-num">Real-time</span> <span class="metric-label">3PL Stock Reconciliation</span></div>
                                   <div class="metric-item"><span class="metric-num">100%</span> <span class="metric-label">Cross-Border VAT Compliance</span></div>
                               </div>`
                    }
                }
            ]
        },
        pandora: {
            title: "Pandora SCM: Global Supply Chain Modernisation",
            subtitle: "Real-time stock visibility and logistics management across regional distribution networks.",
            badges: [
                { text: "Client: Pandora", class: "client-badge" },
                { text: "Implementation Partner: Tarento Group", class: "partner-badge" }
            ],
            illustration: "assets/scm_network_visualization.png",
            slides: [
                { src: 'assets/slides/7_Pandora-SCM-Global-Supply-Chain-Modernisation.png', title: '01. Pandora SCM Modernisation Summary' }
            ],
            narrative: [
                {
                    icon: "fa-compass",
                    title: "01. Project Background & Context",
                    body: `<p><strong>Pandora</strong>, the world's largest jewelry brand, required a highly scalable and modern supply chain architecture to track stock movements across global distribution networks. Naved worked as a Business Analyst within the Inventory Visibility (IIS) team, focusing on mapping data flows and APIs.</p>
                           <p>The goal was to replace fragmented tracking tools with a unified, real-time inventory system that provides instant visibility into stock levels across multiple global logistics hubs.</p>`
                },
                {
                    icon: "fa-gears",
                    title: "02. Core Business Workflows",
                    body: `<ul>
                            <li><strong>Real-time Stock Synchronization:</strong> Designed integration contracts and API schema mappings connecting regional Warehouse Management Systems (WMS) with centralized inventory databases.</li>
                            <li><strong>Logistics Operations Mapping:</strong> Documented end-to-end user stories and functional specifications for order routing and inventory allocation rules.</li>
                            <li><strong>Automated Exception Handling:</strong> Structured workflows for handling order routing errors and stock discrepancies, reducing manual recovery efforts.</li>
                           </ul>`
                },
                {
                    icon: "fa-people-group",
                    title: "03. Collaborative Execution",
                    body: `<p>Collaborated closely with global engineering, logistics, and data mapping teams in multiple time zones. Maintained a clear, prioritized product backlog and organized dynamic mapping sessions to resolve data contract inconsistencies.</p>
                           <p>Fostered strong alignment between technical developers and business stakeholders to ensure successful sprint deliveries.</p>`
                },
                {
                    icon: "fa-chart-line",
                    title: "04. Business Value & Outcomes",
                    body: `<p>The Inventory Visibility solution improved logistics performance and visibility metrics:</p>
                           <ul>
                            <li><strong>Global Visibility:</strong> Enabled trading and inventory planners to check real-time stock availability globally.</li>
                            <li><strong>Reduced Discrepancies:</strong> Minimized mismatch errors between retail channels and warehouse logs.</li>
                            <li><strong>Enhanced Scalability:</strong> Modern database API contracts supported high holiday sales volumes without service degradation.</li>
                           </ul>`
                }
            ]
        },
        health: {
            title: "Health Campaign Management: Mozambique",
            subtitle: "Digitising manual healthcare operations and real-time campaign surveillance on the DIGIT platform.",
            badges: [
                { text: "Client: Mozambique Ministry of Health", class: "client-badge" },
                { text: "Platform: DIGIT Open Source Platform", class: "partner-badge" }
            ],
            illustration: "assets/digit-campaign-ground.png",
            slides: [
                { src: 'assets/slides/9_Health-Campaign-Management-Mozambique.png', title: '01. Mozambique Health Campaign Summary' }
            ],
            narrative: [
                {
                    icon: "fa-compass",
                    title: "01. Project Background & Context",
                    body: `<p>The <strong>Mozambique Ministry of Health</strong> sought to digitise their large-scale health campaigns (including vaccine distributions and disease therapies). Using the open-source <strong>DIGIT platform</strong>, the project aimed to streamline field health logistics and reporting.</p>
                           <p>Naved led business analysis and product management, coordinating requirements gathering with local health administrators and digital platform engineers.</p>`
                },
                {
                    icon: "fa-gears",
                    title: "02. Core Business Workflows",
                    body: `<ul>
                            <li><strong>Field Survey Mobilisation:</strong> Designed simple offline-first mobile workflows for field health workers to register citizens and record vaccine administrations.</li>
                            <li><strong>Inventory Distribution Tracking:</strong> Built ledger models to track vaccine and drug stocks from central cold rooms to local clinics, reducing spoilage risks.</li>
                            <li><strong>Disease Surveillance Dashboards:</strong> Designed administrative reporting screens tracking campaign completion rates and supply consumption metrics.</li>
                           </ul>`
                },
                {
                    icon: "fa-people-group",
                    title: "03. Stakeholder Policy Alignment",
                    body: `<p>Managed a complex group of stakeholders, including non-governmental health organisations, local clinic directors, and software developers.</p>
                           <p>Conducted field research to understand network constraints in rural areas, ensuring the offline data sync mechanism was resilient and easy to use.</p>`
                },
                {
                    icon: "fa-chart-line",
                    title: "04. Business Value & Outcomes",
                    body: `<p>The digital transformation of Mozambique health campaigns established a foundation for data-driven healthcare policy:</p>
                           <ul>
                            <li><strong>Real-time Surveillance:</strong> Allowed health officials to track campaign coverages dynamically instead of waiting weeks for manual paper logs.</li>
                            <li><strong>Optimised Logistics:</strong> Reduced clinic stock-outs through automated reorder alerts.</li>
                            <li><strong>Offline Resilience:</strong> Field workers successfully recorded data in areas without cellular coverage, sync-matching entries upon returning to network range.</li>
                           </ul>`
                }
            ]
        }
    };

    let activeProject = 'cellmark';
    let currentSlide = 0;
    let autoplayInterval = null;
    const autoplayDuration = 5000; // 5 seconds per slide

    // DOM Elements - SPA wrappers
    const mainHeader = document.getElementById('site-header');
    const portfolioMainView = document.getElementById('portfolio-main-view');
    const caseStudyWrapper = document.getElementById('case-study-portal-wrapper');

    // DOM Elements - Selection Directory
    const directoryCards = document.querySelectorAll('.directory-card');

    // DOM Elements - Presentation Viewer
    const carouselTrack = document.getElementById('carousel-track');
    const slideCounter = document.getElementById('slide-index-counter');
    const slideTitle = document.getElementById('slide-title-label');
    const slideProgress = document.getElementById('slide-progress');
    const thumbnailsTrack = document.getElementById('thumbnails-track');

    const btnPrev = document.getElementById('slide-prev');
    const btnNext = document.getElementById('slide-next');

    const thumbScrollLeft = document.getElementById('thumb-scroll-left');
    const thumbScrollRight = document.getElementById('thumb-scroll-right');
    const themeToggle = document.getElementById('case-study-theme-toggle');

    // SPA View Toggles & Routing Logic
    const showCaseStudy = (projectId) => {
        activeProject = projectId;
        loadProjectData(projectId);

        // Update active class on directory cards
        directoryCards.forEach(card => {
            if (card.getAttribute('data-project') === activeProject) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Hide portfolio, show case study
        if (mainHeader) mainHeader.style.display = 'none';
        if (portfolioMainView) portfolioMainView.style.display = 'none';
        if (caseStudyWrapper) caseStudyWrapper.style.display = 'block';

        window.scrollTo(0, 0);
        resetAutoplay();
    };

    const showPortfolio = (hash) => {
        // Hide case study, show portfolio
        if (caseStudyWrapper) caseStudyWrapper.style.display = 'none';
        if (mainHeader) mainHeader.style.display = 'block';
        if (portfolioMainView) portfolioMainView.style.display = 'block';

        stopAutoplay();

        // Scroll to target hash or top
        if (hash) {
            const targetEl = document.querySelector(hash);
            if (targetEl) {
                // Short timeout to let layout settle when showing main view
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 10);
            }
        } else {
            window.scrollTo(0, 0);
        }
    };

    const handleRoute = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const project = urlParams.get('project');
        if (project && projectData[project]) {
            showCaseStudy(project);
        } else {
            showPortfolio(window.location.hash);
        }
    };

    // Helper to get active slides list
    const getActiveSlides = () => projectData[activeProject].slides;

    // Helper to group slides by 2
    const getActiveGroups = () => {
        const slides = projectData[activeProject].slides;
        const groups = [];
        for (let i = 0; i < slides.length; i += 2) {
            groups.push(slides.slice(i, i + 2));
        }
        return groups;
    };

    // Render the carousel track dynamically
    const renderCarousel = () => {
        carouselTrack.innerHTML = '';
        const currentGroups = getActiveGroups();
        const p = projectData[activeProject];

        currentGroups.forEach((group, gIndex) => {
            const groupEl = document.createElement('div');
            groupEl.className = 'carousel-group' + (group.length === 1 ? ' single-slide' : '');
            groupEl.setAttribute('data-group-index', gIndex);

            // Check if any slide in the group has details
            const hasSlideDetails = group.some(slide => slide.details);

            if (hasSlideDetails) {
                group.forEach(slide => {
                    const colEl = document.createElement('div');
                    colEl.className = 'carousel-slide-col';

                    const img = document.createElement('img');
                    img.src = slide.src;
                    img.alt = slide.title;
                    img.className = 'carousel-slide-img';
                    img.decoding = 'async';
                    colEl.appendChild(img);

                    if (slide.details) {
                        const cardEl = document.createElement('div');
                        cardEl.className = 'narrative-card' + (slide.details.cardClass ? ' ' + slide.details.cardClass : '');
                        cardEl.innerHTML = `
                            <div class="card-icon-header">
                                <i class="fa-solid ${slide.details.icon}"></i>
                                <h3>${slide.details.title}</h3>
                            </div>
                            <div class="card-body">
                                ${slide.details.body}
                            </div>
                        `;
                        colEl.appendChild(cardEl);
                    }
                    groupEl.appendChild(colEl);
                });
            } else {
                // If there are no slide-wise details, but there is a project-level narrative array (Pandora / Health)
                groupEl.classList.add('project-narrative-group');
                
                const slideCol = document.createElement('div');
                slideCol.className = 'carousel-slide-col project-narrative-slide';
                
                group.forEach(slide => {
                    const img = document.createElement('img');
                    img.src = slide.src;
                    img.alt = slide.title;
                    img.className = 'carousel-slide-img';
                    img.decoding = 'async';
                    slideCol.appendChild(img);
                });
                groupEl.appendChild(slideCol);

                if (p.narrative && p.narrative.length > 0) {
                    const gridEl = document.createElement('div');
                    gridEl.className = 'narrative-grid';
                    p.narrative.forEach(card => {
                        const cardEl = document.createElement('div');
                        cardEl.className = 'narrative-card' + (card.cardClass ? ' ' + card.cardClass : '');
                        cardEl.innerHTML = `
                            <div class="card-icon-header">
                                <i class="fa-solid ${card.icon}"></i>
                                <h3>${card.title}</h3>
                            </div>
                            <div class="card-body">
                                ${card.body}
                            </div>
                        `;
                        gridEl.appendChild(cardEl);
                    });
                    groupEl.appendChild(gridEl);
                }
            }

            carouselTrack.appendChild(groupEl);
        });
    };

    // -------------------------------------------------------------
    // 1. Theme Synchronization Logic
    // -------------------------------------------------------------
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // -------------------------------------------------------------
    // 2. Build Thumbnails Track
    // -------------------------------------------------------------
    const renderThumbnails = () => {
        thumbnailsTrack.innerHTML = '';
        const currentSlides = getActiveSlides();
        currentSlides.forEach((slide, index) => {
            const thumb = document.createElement('div');
            // Check if this slide's group is currently active
            const gIndex = Math.floor(index / 2);
            thumb.className = `thumbnail-card ${gIndex === currentSlide ? 'active' : ''}`;
            thumb.setAttribute('data-index', index);
            thumb.setAttribute('title', slide.title);

            thumb.innerHTML = `
                <img src="${slide.src}" alt="Thumb ${index + 1}" class="thumbnail-img" loading="lazy">
            `;

            thumb.addEventListener('click', () => {
                goToSlide(Math.floor(index / 2));
            });

            thumbnailsTrack.appendChild(thumb);
        });
    };

    // -------------------------------------------------------------
    // 3. Slides Engine Logic
    // -------------------------------------------------------------
    const updateSlideDisplay = () => {
        const currentGroups = getActiveGroups();
        if (currentGroups.length === 0) return;

        // Slide the track smoothly
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update slide index counter and title labels
        const group = currentGroups[currentSlide];
        let counterText = "";
        if (group.length === 2) {
            const idx1 = projectData[activeProject].slides.indexOf(group[0]) + 1;
            const idx2 = projectData[activeProject].slides.indexOf(group[1]) + 1;
            counterText = `Slides ${idx1}-${idx2} of ${projectData[activeProject].slides.length}`;
        } else {
            const idx = projectData[activeProject].slides.indexOf(group[0]) + 1;
            counterText = `Slide ${idx} of ${projectData[activeProject].slides.length}`;
        }
        slideCounter.textContent = counterText;
        slideTitle.textContent = group.map(s => s.title).join(' & ');

        // Progress Bar
        const percent = ((currentSlide + 1) / currentGroups.length) * 100;
        slideProgress.style.width = `${percent}%`;

        // Active state in thumbnails
        const thumbs = thumbnailsTrack.querySelectorAll('.thumbnail-card');
        thumbs.forEach((t, i) => {
            const gIndex = Math.floor(i / 2);
            if (gIndex === currentSlide) {
                t.classList.add('active');
                if (i === currentSlide * 2) {
                    scrollActiveThumbnail(t);
                }
            } else {
                t.classList.remove('active');
            }
        });
    };

    const scrollActiveThumbnail = (activeThumb) => {
        const trackRect = thumbnailsTrack.getBoundingClientRect();
        const thumbRect = activeThumb.getBoundingClientRect();

        const isLeftOfTrack = thumbRect.left < trackRect.left;
        const isRightOfTrack = thumbRect.right > trackRect.right;

        if (isLeftOfTrack || isRightOfTrack) {
            thumbnailsTrack.scrollTo({
                left: activeThumb.offsetLeft - (trackRect.width / 2) + (thumbRect.width / 2),
                behavior: 'smooth'
            });
        }
    };

    const goToSlide = (index) => {
        const currentGroups = getActiveGroups();
        if (index < 0) {
            currentSlide = currentGroups.length - 1;
        } else if (index >= currentGroups.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        updateSlideDisplay();
        resetAutoplay();
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    // -------------------------------------------------------------
    // 4. Dynamic Project Loading Logic
    // -------------------------------------------------------------
    const loadProjectData = (projectId) => {
        const p = projectData[projectId];
        if (!p) return;

        // Reload Slide viewer
        currentSlide = 0;
        renderCarousel();
        renderThumbnails();
        updateSlideDisplay();
    };

    // Directory Card Clicks
    directoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const project = card.getAttribute('data-project');
            if (project === activeProject) return;

            // Update active states in directory cards
            directoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            activeProject = project;
            // Push history state to URL when clicking directory cards in SPA view
            history.pushState({ project }, '', `?project=${project}`);
            loadProjectData(project);
        });
    });

    // -------------------------------------------------------------
    // 5. Navigation & Action Events
    // -------------------------------------------------------------
    btnPrev.addEventListener('click', () => {
        prevSlide();
    });

    btnNext.addEventListener('click', () => {
        nextSlide();
    });

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Thumbnails Scroll arrows
    if (thumbScrollLeft) {
        thumbScrollLeft.addEventListener('click', () => {
            thumbnailsTrack.scrollBy({ left: -240, behavior: 'smooth' });
        });
    }
    if (thumbScrollRight) {
        thumbScrollRight.addEventListener('click', () => {
            thumbnailsTrack.scrollBy({ left: 240, behavior: 'smooth' });
        });
    }

    // -------------------------------------------------------------
    // 6. Autoplay Slideshow Cycle
    // -------------------------------------------------------------
    const startAutoplay = () => {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(nextSlide, autoplayDuration);
    };

    const stopAutoplay = () => {
        if (!autoplayInterval) return;
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    };

    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // -------------------------------------------------------------
    // 7. SPA Interceptors and Popstate routing
    // -------------------------------------------------------------
    
    // Intercept navigation links
    document.addEventListener('click', (e) => {
        // 1. Intercept case study buttons click
        const caseStudyBtn = e.target.closest('.project-case-study-btn');
        if (caseStudyBtn) {
            e.preventDefault();
            const href = caseStudyBtn.getAttribute('href');
            const url = new URL(href, window.location.href);
            const project = url.searchParams.get('project');
            if (project && projectData[project]) {
                history.pushState({ project }, '', `?project=${project}`);
                showCaseStudy(project);
            }
            return;
        }

        // 2. Intercept back buttons click
        const backBtn = e.target.closest('.back-btn, .header-back-link');
        if (backBtn && caseStudyWrapper && caseStudyWrapper.style.display !== 'none') {
            e.preventDefault();
            const href = backBtn.getAttribute('href');
            const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
            history.pushState({ project: null }, '', window.location.pathname + hash);
            showPortfolio(hash);
            return;
        }

        // 3. Intercept footer logo click
        const footerLogo = e.target.closest('.footer-logo');
        if (footerLogo && caseStudyWrapper && caseStudyWrapper.style.display !== 'none') {
            e.preventDefault();
            history.pushState({ project: null }, '', window.location.pathname);
            showPortfolio('');
            return;
        }
    });

    // Listen to popstate event for browser back/forward buttons navigation
    window.addEventListener('popstate', handleRoute);

    // -------------------------------------------------------------
    // Init Calls
    // -------------------------------------------------------------
    // Initial routing on page load
    handleRoute();
});
