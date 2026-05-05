/* ============================================
   E-PORTFOLIO — MAIN JS
   Core interactions, nav, theme, scroll reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Loading Screen ----------
  const loadingScreen = document.getElementById('loadingScreen');

  const hideLoadingScreen = () => {
    if (!loadingScreen) return;
    loadingScreen.classList.add('hidden');
    loadingScreen.setAttribute('aria-hidden', 'true');
  };

  if (loadingScreen) {
    const minLoadingTime = 1400;

    if (document.readyState === 'complete') {
      setTimeout(hideLoadingScreen, minLoadingTime);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hideLoadingScreen, minLoadingTime);
      }, { once: true });
      setTimeout(hideLoadingScreen, 3000);
    }
  }

  // ---------- Intro Screen (Two-Phase) ----------
  const introTear = document.getElementById('introTear');
  let introOpened = false;

  const completeIntro = () => {
    if (!introTear) return;
    introTear.classList.add('is-complete');
    document.body.classList.add('intro-ready', 'intro-opened');
  };

  if (introTear && !window.location.hash) {
    // Phase 1: Loading bar runs via CSS animation (~1.5s)
    // After page load, transition to Phase 2: "Scroll to view"
    try { window.history.scrollRestoration = 'manual'; } catch (_) {}
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const minLoaderTime = 1200;
    const maxLoaderTime = 2400;
    const startedAt = performance.now();
    let loaderDone = false;

    const showPrompt = () => {
      if (loaderDone) return;
      loaderDone = true;
      const elapsed = performance.now() - startedAt;
      const delay = Math.max(0, minLoaderTime - elapsed);
      setTimeout(() => {
        introTear.classList.add('loader-complete');
        // Phase 2: Wait for user interaction to open
        addIntroListeners();
      }, delay);
    };

    if (document.readyState === 'complete') {
      showPrompt();
    } else {
      window.addEventListener('load', showPrompt, { once: true });
      setTimeout(showPrompt, maxLoaderTime);
    }

    // Phase 2: Listen for scroll/touch/keyboard to open the intro
    const openKeys = new Set(['ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter']);

    const openIntro = () => {
      if (introOpened || !introTear.classList.contains('loader-complete')) return;
      introOpened = true;
      removeIntroListeners();
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      // Tear-open animation
      introTear.classList.add('is-opening');
      setTimeout(completeIntro, 1000);
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= 1) return;
      e.preventDefault();
      openIntro();
    };
    const onTouch = () => openIntro();
    const onKey = (e) => {
      if (!openKeys.has(e.key)) return;
      e.preventDefault();
      openIntro();
    };
    const onScroll = () => { if (window.scrollY > 2) openIntro(); };

    function addIntroListeners() {
      if (introOpened) return;
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouch, { passive: true });
      window.addEventListener('keydown', onKey);
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    function removeIntroListeners() {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    }
  } else {
    // No intro needed (hash in URL or no introTear element)
    if (introTear) completeIntro();
    document.body.classList.add('intro-ready');
  }

  // ---------- Scroll Progress Bar ----------
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ---------- Typed Text Effect ----------
  const typedTextEl = document.getElementById('typedText');
  const phrases = [
    'Guru Teknik Manufaktur',
    'Peserta PPG Prajabatan 2026',
    'Pengajar Autodesk Inventor',
    'Pendidik yang Berdedikasi'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      typedTextEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typedTextEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedTextEl) typeEffect();

  // ---------- Navbar Scroll ----------
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Active Nav Link ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    // Trigger highlight when section reaches the upper third of the screen
    const scrollPos = window.scrollY + (window.innerHeight / 3);

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- Hamburger ----------
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });

  // ---------- Dark / Light Mode Toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll('.bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---------- Portfolio Filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  const portfolioGridWrapper = document.getElementById('portfolioGridWrapper');
  const portfolioGridInner = document.getElementById('portfolioGridInner');

  function getActiveSiklus() {
    const activeTab = document.querySelector('.tab-btn.active');
    return activeTab ? activeTab.getAttribute('data-tab') : 'siklus1';
  }

  function getActiveFilter() {
    const activeFilter = document.querySelector('.filter-btn.active');
    return activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
  }

  function applyFilters(siklus, filter) {
    portfolioCards.forEach(card => {
      const cardSiklus = card.getAttribute('data-siklus') || 'siklus1';
      const cardCategory = card.getAttribute('data-category');
      const matchesSiklus = (cardSiklus === siklus);
      const matchesFilter = (filter === 'all' || cardCategory === filter);
      if (matchesSiklus && matchesFilter) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.5s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('active');
      
      filterBtns.forEach(b => b.classList.remove('active'));

      if (isActive) {
        // Toggle off (Collapse everything with animation)
        if (portfolioGridWrapper && portfolioGridInner) {
          portfolioGridWrapper.style.gridTemplateRows = '0fr';
          portfolioGridInner.style.opacity = '0';
          portfolioGridInner.style.marginTop = '-20px';
        } else {
          portfolioCards.forEach(card => card.style.display = 'none');
        }
      } else {
        // Toggle on (Expand with animation)
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        applyFilters(getActiveSiklus(), filter);

        // Buka wrapper dengan animasi
        if (portfolioGridWrapper && portfolioGridInner) {
          portfolioGridWrapper.style.gridTemplateRows = '1fr';
          portfolioGridInner.style.opacity = '1';
          portfolioGridInner.style.marginTop = '0';
        }
      }
    });
  });

  // ---------- Back to Top ----------
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formSuccess = document.getElementById('formSuccess');
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = '⏳ Mengirim...';
      btn.disabled = true;
      setTimeout(() => {
        btn.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
        setTimeout(() => {
          btn.style.display = '';
          btn.textContent = 'Kirim Pesan 🚀';
          btn.disabled = false;
          if (formSuccess) formSuccess.style.display = 'none';
          contactForm.reset();
        }, 3000);
      }, 1000);
    });
  }

  // ---------- Smooth anchor scrolling ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getAnchorScrollOffset() {
    const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const extraGap = window.innerWidth <= 768 ? 6 : 8;
    return Math.ceil(navHeight + extraGap);
  }

  function scrollToAnchor(target) {
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const scrollTop = Math.max(0, targetTop - getAnchorScrollOffset());

    window.scrollTo({
      top: scrollTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        scrollToAnchor(target);
        hamburger.classList.remove('active');
        navLinksEl.classList.remove('open');
      }
    });
  });

  // ---------- Count-up Animation ----------
  const statNumbers = document.querySelectorAll('.about-stat .number');

  function countUp(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const text = entry.target.textContent;
        const num = parseInt(text);
        const suffix = text.includes('+') ? '+' : '';
        countUp(entry.target, num, suffix);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));

  // ---------- Portfolio Siklus Tabs ----------
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      applyFilters(tab, getActiveFilter());
    });
  });

  // ---------- Skills Tabs ----------
  const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');
  skillsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('skills-' + btn.getAttribute('data-skills-tab'));
      if (target) target.classList.add('active');
    });
  });

  // ---------- Accordion ----------
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        header.setAttribute('aria-expanded', 'true');
        header.nextElementSibling.classList.add('open');
      }
    });
  });

  // ---------- Pillar Progress Animation ----------
  const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.pillar-progress-fill');
        if (fill) {
          const styleAttr = fill.getAttribute('style') || '';
          const match = styleAttr.match(/--progress:\s*([^;"]+)/);
          const width = match ? match[1].trim() : '80%';
          fill.style.width = width;
        }
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.pillar-card').forEach(card => pillarObserver.observe(card));

  // ---------- Gallery Accordion Interaction ----------
  const galleryItems = document.querySelectorAll('.gallery-accordion .gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all
      galleryItems.forEach(el => el.classList.remove('active'));
      // Add active to clicked
      item.classList.add('active');
    });
  });

}); // End DOMContentLoaded

// Fade-in keyframe (used by filter)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
