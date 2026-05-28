/* ==========================================================================
   CORE ENGINE: BUNGKUS SEMUA AGAR BERJALAN SETELAH DOM SIAP DRAWING (SINGLE ENTRY)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {

    // ==================== 1. NAVBAR TOGGLE & DROPDOWN ENGINE ====================
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const navDropdown = document.querySelector('.nav-dropdown');
    const header = document.querySelector('header');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('open'); 
            navbar.classList.toggle('active'); 
            
            if(!navbar.classList.contains('active') && navDropdown) {
                navDropdown.classList.remove('mobile-active');
            }
        };
    }

    // Engine Klik Dropdown "More Account Handle" (Support Desktop, Mobile & Icon Chevron)
    if (dropdownTrigger && navDropdown) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Biar gak ketutup otomatis karena click handler dokumen di bawah
            navDropdown.classList.toggle('mobile-active');
            
            // Putar ikon panah pas menu mekar
            const chevron = dropdownTrigger.querySelector('.bx-chevron-down');
            if (chevron) {
                chevron.style.transform = navDropdown.classList.contains('mobile-active') ? 'rotate(180deg)' : 'rotate(0deg)';
                chevron.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            }
        });

        // Tutup laci dropdown akun otomatis kalau user klik area kosong di mana saja
        document.addEventListener('click', () => {
            navDropdown.classList.remove('mobile-active');
            const chevron = dropdownTrigger.querySelector('.bx-chevron-down');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });
    }


    // ==================== 2. ACTIVE NAVBAR LINK ON SCROLL & STICKY HEADER ====================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    const targetLink = document.querySelector(`header nav a[href*=${id}]`);
                    if (targetLink) targetLink.classList.add('active');
                });
                
                sec.classList.add('show-animate');
            }
        });

        // Sticky Header Effect
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
    }, { passive: true }); // Mengoptimalkan performa scroll browser mobile


    // ==================== 3. SCROLL REVEAL (Eksklusif Elemen Statis Non-Grid) ====================
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            distance: '80px',
            duration: 2000,
            delay: 200
        });
        
        ScrollReveal().reveal('.home-content, #home .heading, #portfolio .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-content h1, .profile-card-container', { origin: 'left' });
        ScrollReveal().reveal('.home-content p', { origin: 'right' });
    }


    // ==================== 4. ANIMASI TYPED JS ====================
    if (document.querySelector('.typed') && typeof Typed !== 'undefined') {
        new Typed('.typed', {
            strings: ['Video Editor'],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 1500,
            loop: true
        });
    }


    // ==================== 5. 3D CARD HOVER & FLIP ENGAGEMENT ====================
    const container = document.querySelector('.profile-card-container'); 
    const cardEl = document.querySelector('.profile-card'); 
    let isFlipped = false;

    if (container && cardEl) {
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.social-media')) return;
            
            isFlipped = !isFlipped;
            cardEl.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            cardEl.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });

        container.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; 

            cardEl.style.transition = 'none';
            const rect = container.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((centerY - (e.clientY - rect.top)) / centerY) * 12;
            const rotateY = (((e.clientX - rect.left) - centerX) / centerX) * 12;
            
            const finalY = isFlipped ? (180 - rotateY) : rotateY;
            cardEl.style.transform = `rotateX(${rotateX}deg) rotateY(${finalY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            cardEl.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardEl.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });
    }


    // ==================== 6. HYPER-LUXURY 3D TWO-WAY SCROLL ENGINE (INTERSECTION OBSERVER) ====================
    const ultimatePremiumElements = document.querySelectorAll([
        '.home-content', 
        '.card-appear-animate', 
        '.about-content', 
        '.about-timeline-side', 
        '.skill-glow-card',
        '.skill .heading', 
        '.projek .heading',
        '.premium-project-card', /* Ditambahkan untuk mengontrol kartu testimonial/projek secara halus */
        '.sub-projects-title',   
        '.sub-project-filter',   
        '.sub-project-card',     
        '.studio-header',        
        '.studio-card'           
    ].join(','));

    if (ultimatePremiumElements.length > 0) {
        const ultimateScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;

                // Cegah intervensi paksa pada area review slider
                if (element.classList.contains('premium-review-section')) return;

                if (entry.isIntersecting) {
                    element.classList.add('reveal-active');
                    element.classList.remove('reveal-exit-top', 'reveal-exit-bottom');
                } else {
                    element.classList.remove('reveal-active');

                    if (entry.boundingClientRect.top < 0) {
                        element.classList.add('reveal-exit-top');
                        element.classList.remove('reveal-exit-bottom');
                    } else {
                        element.classList.add('reveal-exit-bottom');
                        element.classList.remove('reveal-exit-top');
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        ultimatePremiumElements.forEach(element => {
            element.classList.add('scroll-animate-premium');
            ultimateScrollObserver.observe(element);
        });
    }


    // ==================== 7. TAB FILTER ENGINE (DYNAMIC RESOLUTION COUPLING) ====================
    const filterContainers = document.querySelectorAll('.project-filter, .sub-project-filter');
    
    filterContainers.forEach(container => {
        const buttons = container.querySelectorAll('.filter-btn');
        // Cari grid target terdekat dari container filternya
        const sectionTarget = container.closest('section');
        const cards = sectionTarget ? sectionTarget.querySelectorAll('.project-box, .sub-project-card, .premium-project-card') : [];

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const currentActive = container.querySelector('.filter-btn.active');
                if (currentActive) currentActive.classList.remove('active');
                
                button.classList.add('active');
                const selectedFilter = button.getAttribute('data-filter');

                cards.forEach(card => {
                    // Fade-out animasi transisi awal singkat
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(12px)';
                    card.style.transition = 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)';

                    setTimeout(() => {
                        const isMatch = selectedFilter === 'all' || 
                                        card.getAttribute('data-category') === selectedFilter || 
                                        card.classList.contains(selectedFilter);

                        if (isMatch) {
                            card.classList.remove('hide-smooth-patch');
                            card.classList.add('show-smooth-patch');
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                            }, 50);
                        } else {
                            card.classList.remove('show-smooth-patch');
                            card.classList.add('hide-smooth-patch');
                        }
                    }, 350);
                });
            });
        });
    });


    // ==================== 8. HYPER-INTERACTIVE CLIENT REVIEW ENGINE (SLIDER) ====================
    const reviewSection = document.querySelector('.premium-review-section');
    const reviewTrack = document.querySelector('.premium-review-track');
    const reviewCards = document.querySelectorAll('.premium-review-card');
    const reviewDots = document.querySelectorAll('.review-dot');

    if (reviewSection && reviewTrack && reviewCards.length > 0) {
        let currentReviewIndex = 0;
        let reviewAutoplayTimer;

        const reviewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    reviewSection.classList.add('active-scroll');
                    
                    setTimeout(() => {
                        updateReviewSlider(0);
                        startReviewAutoplay();
                    }, 800);

                    reviewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        reviewObserver.observe(reviewSection);

        function updateReviewSlider(index) {
            if (index < 0) index = reviewCards.length - 1;
            if (index >= reviewCards.length) index = 0;

            currentReviewIndex = index;

            const containerWidth = reviewTrack.parentElement.offsetWidth;
            const cardWidth = reviewCards[0].offsetWidth;
            const gap = 50; 

            const centerOffset = (containerWidth / 2) - (cardWidth / 2);
            const targetX = -(currentReviewIndex * (cardWidth + gap)) + centerOffset;

            reviewTrack.style.transform = `translate3d(${targetX}px, 0px, 0px)`;

            reviewCards.forEach((card, i) => {
                if (i === currentReviewIndex) {
                    card.classList.add('active-card');
                } else {
                    card.classList.remove('active-card');
                }
            });

            reviewDots.forEach((dot, i) => {
                if (i === currentReviewIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function startReviewAutoplay() {
            clearInterval(reviewAutoplayTimer);
            reviewAutoplayTimer = setInterval(() => {
                updateReviewSlider(currentReviewIndex + 1);
            }, 5000);
        }

        function stopReviewAutoplay() {
            clearInterval(reviewAutoplayTimer);
        }

        reviewDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopReviewAutoplay();
                updateReviewSlider(index);
                startReviewAutoplay();
            });
        });

        reviewSection.addEventListener('mouseenter', stopReviewAutoplay);
        reviewSection.addEventListener('mouseleave', startReviewAutoplay);

        window.addEventListener('resize', () => {
            updateReviewSlider(currentReviewIndex);
        });

        reviewCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }


    // ==================== 9. OLD TESTIMONIAL AUTOMATIC LOOP (FALLBACK COUPLING) ====================
    const testiCards = document.querySelectorAll('.premium-project-card');
    let currentHighlightIndex = 0;
    let testimonialInterval;

    function highlightNextTestimonial() {
        if (testiCards.length === 0) return;
        testiCards.forEach(card => card.classList.remove('highlighted'));
        testiCards[currentHighlightIndex].classList.add('highlighted');
        currentHighlightIndex = (currentHighlightIndex + 1) % testiCards.length;
    }

    if (testiCards.length > 0) {
        highlightNextTestimonial();
        testimonialInterval = setInterval(highlightNextTestimonial, 4000);

        testiCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
                testiCards.forEach(c => c.classList.remove('highlighted'));
                card.classList.add('highlighted');
                currentHighlightIndex = index;
            });

            card.addEventListener('mouseleave', () => {
                currentHighlightIndex = (currentHighlightIndex + 1) % testiCards.length;
                testimonialInterval = setInterval(highlightNextTestimonial, 4000);
            });
        });
    }


    // ==================== 10. HOVER AUTOPLAY VIDEO PREVIEW ====================
    const projectVideos = document.querySelectorAll('.project-video-preview');
    if (projectVideos.length > 0) {
        projectVideos.forEach(video => {
            const cardParent = video.closest('.project-box, .sub-project-card, .studio-card, .premium-project-card');
            if (cardParent) {
                cardParent.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
                cardParent.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
            }
        });
    }


    // ==================== 11. VIDEO POPUP MODAL SYSTEM (ANTI MULTI-TRIGGER & BUBBLING FIX) ====================
    // Diubah selektornya ke pemicu play ring tombol murni agar tidak ter-trigger tidak sengaja saat filter di klik
    const playTriggers = document.querySelectorAll(".premium-play-trigger, .studio-card .premium-play-trigger");
    const videoModal = document.getElementById("videoModal") || document.querySelector(".premium-video-modal-overlay");
    const modalVideo = document.getElementById("modalVideo") || document.getElementById("modal-video-target");
    const closeBtn = document.querySelector(".close-modal") || document.querySelector(".modal-close-trigger");

    if (videoModal && modalVideo) {
        // Deteksi jika modal memakai target kontainer iframe terpisah
        const targetIframe = modalVideo.tagName === 'IFRAME' ? modalVideo : modalVideo.querySelector('iframe');

        function openModal(videoSrc) {
            if (targetIframe) {
                targetIframe.src = videoSrc + "?autoplay=1&rel=0";
            } else {
                modalVideo.src = videoSrc + "?autoplay=1&rel=0";
            }
            videoModal.classList.add("modal-active");
            document.body.classList.add("active-lightbox"); // Sembunyikan navbar otomatis via CSS penanda
            document.body.style.overflow = "hidden"; 
        }

        function closeModal() {
            videoModal.classList.remove("modal-active");
            if (targetIframe) {
                targetIframe.src = "";
            } else {
                modalVideo.src = "";
            }
            document.body.classList.remove("active-lightbox");
            document.body.style.overflow = "auto"; 
        }

        playTriggers.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation(); // Amankan klik dari penularan event card
                
                // Cari video link dari data atribut tombol atau naik ke parent card terdekatnya
                const parentCard = this.closest('.project-box, .studio-card, .premium-project-card');
                const targetSrc = this.getAttribute("data-video") || (parentCard ? parentCard.getAttribute("data-video") : null);
                                  
                if (targetSrc) {
                    openModal(targetSrc);
                }
            });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        
        videoModal.addEventListener("click", function(e) {
            if (e.target === videoModal || e.target.classList.contains('premium-video-modal-overlay')) closeModal();
        });
        
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && videoModal.classList.contains("modal-active")) {
                closeModal();
            }
        });
    }


    // ==================== 12. DISCORD AUTO COPY MESSAGE DRAFT ====================
    const discordLink = document.getElementById('discord-link');
    if (discordLink) {
        discordLink.addEventListener('click', (e) => {
            e.preventDefault(); // Menghentikan redirect instan agar proses copy aman berjalan
            const pesanDraft = "Halo Zhilvani, saya melihat portofolio kamu dan tertarik untuk berdiskusi seputar project video editing!";
            
            navigator.clipboard.writeText(pesanDraft).then(() => {
                alert("Draf pesan otomatis berhasil disalin! Silakan paste (Ctrl+V) langsung di DM Discord nanti.");
            }).catch(err => {
                console.error('Gagal menyalin teks: ', err);
            });
        });
    }
});