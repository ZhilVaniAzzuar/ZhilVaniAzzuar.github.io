// PROTEKSI UTAMA: Bungkus semua kode agar berjalan SETELAH html siap digambar browser!
document.addEventListener("DOMContentLoaded", () => {

    // ==================== TOGGLE ICON NAVBAR ====================
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('open'); // Memicu transisi putar CSS
            navbar.classList.toggle('active'); 
        };
    }

    // ==================== SCROLL SECTIONS ACTIVE LINK ====================
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                // Aktifin navbar
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
                
                // AKTIFKAN ANIMASI DI SINI!
                sec.classList.add('show-animate');
            } else {
                // Kalau mau animasinya ulang terus tiap di-scroll ke atas/bawah, buka baris ini:
                // sec.classList.remove('show-animate');
            }
        });

        // Sticky header
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);
    };

    // ==================== SCROLL REVEAL (Eksklusif Non-About) ====================
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            distance: '80px',
            duration: 2000,
            delay: 200
        });
        
        // KUNCI AMAN: Mengeluarkan komponen section About dari target ScrollReveal bawaan
        ScrollReveal().reveal('.home-content, #home .heading, #portfolio .heading', { origin: 'top' });
        ScrollReveal().reveal('.portfolio-container, .portfolio-box', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .profile-card-container', { origin: 'left' });
        ScrollReveal().reveal('.home-content p', { origin: 'right' });
    }

    // ==================== ANIMASI TYPED JS ====================
    if (document.querySelector('.typed') && typeof Typed !== 'undefined') {
        new Typed('.typed', {
            strings: ['Video Editor'],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 1500,
            loop: true
        });
    }

    // ==================== 3D CARD HOVER & FLIP ENGAGEMENT ====================
    const container = document.querySelector('.profile-card-container'); 
    const cardEl = document.querySelector('.profile-card'); 

    let isFlipped = false;

    if (container && cardEl) {
        // 1. DETEKTOR KLIK
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.social-media')) return;
            
            isFlipped = !isFlipped;
            cardEl.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            cardEl.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });

        // 2. EFEK MOUSEMOVE PARALLAX
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

        // 3. MOUSE LEAVE
        container.addEventListener('mouseleave', () => {
            cardEl.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardEl.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });
    }

    // ==================== INTERSECTION OBSERVER FOR ABOUT SECTION ====================
    const aboutSection = document.querySelector('.about');

    if (aboutSection) {
        const observerOptions = {
            root: null,
            threshold: 0.15 // Memulai sequence animasi ketika 15% area About terlihat
        };

        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('active-view');
                    observer.unobserve(entry.target); // Cukup mentrigger sekali jalan
                }
            });
        }, observerOptions);

        aboutObserver.observe(aboutSection);
    }

    const skillSection = document.querySelector('.skill');

    // Setup observer buat ngeliat apakah section skill udah masuk layar
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pas user scroll & section keliatan, tambahin class show-animate
                skillSection.classList.add('show-animate');
            } else {
                // Opsional: hapus baris di bawah ini kalau gamau animasinya ke-reset pas di-scroll menjauh
                skillSection.classList.remove('show-animate');
            }
        });
    }, {
        threshold: 0.25 // Animasi jalan pas 25% area section udah masuk layar
    });

    // Jalankan observer
    if(skillSection) {
        skillObserver.observe(skillSection);
    }

    const sectionsToAnimate = document.querySelectorAll('.skill, .projek');

    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            }
        });
    }, {
        threshold: 0.15 // Sengaja diturunin dikit biar pas scroll langsung ke-trigger smooth
    });

    sectionsToAnimate.forEach(section => {
        if(section) contentObserver.observe(section);
    });
});

// ==================== CODES REBUILT: HYPER-LUXURY 3D TWO-WAY SCROLL ENGINE ====================
    // Tembak secara presisi berdasarkan selector asli di file HTML lu bro!
    const ultimatePremiumElements = document.querySelectorAll([
        '.home-content', 
        '.card-appear-animate', 
        '.about-content', 
        '.about-timeline-side', 
        '.skill-glow-card',
        '.skill .heading',        /* <-- TARGET HEADING SKILL LU */
        '.projek .heading',
        '.sub-projects-title',   /* Judul Section Brand */
        '.sub-project-filter',   /* <--- FIX CODES! Ini Selector Menu Tab "ALL, CHEMICAL, PHARMACY" di HTML lu */
        '.sub-project-card',     /* Semua Card Portofolio Brand */
        '.studio-header',        /* Judul Section Studio Video */
        '.studio-card'           /* Semua Card Video Studio (Baik gambar maupun iframe) */
    ].join(','));

    let lastEngineScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Cek bagian Intersection Observer di script.js kamu, perbarui logika callback-nya:

        const engineObserverOptions = {
            root: null,
            threshold: 0.15, // Pemicu aktif saat 15% elemen masuk layar
            rootMargin: "0px 0px -50px 0px" // Memberikan ruang napas di bagian bawah layar
        };

        const ultimateScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;

                if (entry.isIntersecting) {
                    // KONDISI MASUK (Dari atas maupun dari bawah): Bersihkan semua class exit, pasang active!
                    element.classList.add('reveal-active');
                    element.classList.remove('reveal-exit-top', 'reveal-exit-bottom');
                } else {
                    // KONDISI KELUAR
                    element.classList.remove('reveal-active');

                    // Perbaikan Deteksi Arah: Menggunakan boundingClientRect agar akurat saat scroll balik
                    if (entry.boundingClientRect.top < 0) {
                        // Elemen lolos ke atas layar (User scroll ke bawah / arah ke Work)
                        element.classList.add('reveal-exit-top');
                        element.classList.remove('reveal-exit-bottom');
                    } else {
                        // Elemen tenggelam ke bawah layar (User scroll ke atas / arah balik ke Skill)
                        element.classList.add('reveal-exit-bottom');
                        element.classList.remove('reveal-exit-top');
                    }
                }
            });
        }, engineObserverOptions);

    // Daftarkan seluruh elemen inti ke sistem mesin animasi
    ultimatePremiumElements.forEach(element => {
        element.classList.add('scroll-animate-premium');
        ultimateScrollObserver.observe(element);
    });


// ============================================================
// PERFECT ENGINE: TAB FILTER ANTI-STUCK & CLEAN TRANSITION + TESTIMONI
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FILTER ENGINE (GABUNGAN & FIX BUG)
    const filterButtons = document.querySelectorAll('.project-filter .filter-btn, .filter-btn');
    const projectCards = document.querySelectorAll('.project-grid-container .project-box, .project-box');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Cari tombol yang aktif di kelompoknya, lalu hapus class active
                const currentActive = button.parentElement.querySelector('.filter-btn.active') || document.querySelector('.filter-btn.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                
                // FIX: Pakai classList.add secara benar!
                button.classList.add('active');

                const selectedFilter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    // Fade-out halus dulu sebelum dipilah
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(10px)';
                    card.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

                    setTimeout(() => {
                        if (selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter) {
                            card.style.display = 'block';
                            
                            // Fade-in kembali secara elegant
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // 2. AUTO-HIGHLIGHT ENGINE UNTUK TESTIMONI (LOOPING AUTOMATIC AMAN)
    const testiCards = document.querySelectorAll('.testimonial-card');
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

    // 3. SISTEM HOVER VIDEO PREVIEW
    const projectVideos = document.querySelectorAll('.project-video-preview');
    if (projectVideos.length > 0) {
        projectVideos.forEach(video => {
            const cardParent = video.closest('.project-box');
            if (cardParent) {
                cardParent.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
                cardParent.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
            }
        });
    }
});
