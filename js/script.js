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
        sections.forEach((sec) => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                });
                let targetLink = document.querySelector('header nav a[href="#' + id + '"]');
                if (targetLink) targetLink.classList.add('active');
            }
        });

        let header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        if (window.scrollY > 100 && menuIcon && navbar) {
            menuIcon.classList.remove('open'); // Menutup menu putar otomatis saat scroll
            navbar.classList.remove('active');
        }
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