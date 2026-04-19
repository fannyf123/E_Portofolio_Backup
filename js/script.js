/* ============================================
   E-PORTFOLIO — JAVASCRIPT
   Interactions, Animations & UX
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Typed Text Effect ----------
  const typedTextEl = document.getElementById("typedText");
  const phrases = [
    "Guru Teknik Manufaktur",
    "Peserta PPG Prajabatan 2026",
    "Pendidik yang Berdedikasi",
    "Pembelajar Sepanjang Hayat",
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
      typingSpeed = 2000; // pause at end
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
  const navbar = document.getElementById("navbar");

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });

  // ---------- Active Nav Link ----------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });

  // ---------- Hamburger ----------
  const hamburger = document.getElementById("hamburger");
  const navLinksEl = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinksEl.classList.toggle("open");
  });

  // Close mobile nav on link click
  navLinksEl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinksEl.classList.remove("open");
    });
  });

  // ---------- Dark / Light Mode Toggle ----------
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("theme");

  // Apply saved preference or default to light
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark") {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll(".bar-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
        }
      });
    },
    { threshold: 0.3 },
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ---------- Portfolio Filter ----------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      portfolioCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "";
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ---------- Back to Top ----------
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    },
    { passive: true },
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- Contact Form (basic) ----------
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector(".form-submit");
    const originalText = btn.textContent;
    btn.textContent = "✅ Pesan Terkirim!";
    btn.style.background = "linear-gradient(135deg, #6BCB77, #2EC4B6)";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      contactForm.reset();
    }, 3000);
  });

  // ---------- Smooth anchor scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ---------- Modal Logic ----------
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalContent = document.getElementById("modalContent");
  const modalTriggers = document.querySelectorAll(".btn-modal");

  // Modal Data — Artefak Siklus 1
  const artifactData = {
    "modal-rpp1": {
      title: "RPP Siklus 1 — Gambar Teknik Manufaktur (Deep Learning)",
      type: "RPP & Modul Ajar (Fase F / Kelas XI TPM)",
      context:
        'RPP ini disusun untuk kelas XI Teknik Pemesinan (TPM) di SMK Negeri 2 Depok Sleman pada materi "Perancangan Gambar Rakitan Kompleks (Assembly) Menggunakan Aplikasi Teknologi CAD". Latar belakang penyusunan didasarkan pada hasil asesmen diagnostik di mana mayoritas siswa memiliki gaya belajar visual-kinestetik dan sudah menguasai dasar 3D Part Modeling (.ipt).',
      purpose:
        "Menerapkan Perencanaan Pembelajaran Mendalam (Deep Learning) untuk memfasilitasi kebutuhan belajar siswa yang beragam, membimbing mereka dari merakit komponen fisik di bengkel hingga mahir merakit secara virtual (Assembly) di Autodesk Inventor.",
      pros: [
        "Menerapkan scaffolding (panduan bertahap) bagi murid yang butuh panduan ekstra.",
        "Menyediakan pengayaan eksplorasi fitur lanjut bagi siswa yang lebih cepat paham.",
        "Sangat relevan dengan dunia kerja industri manufaktur karena fokus pada visualisasi 3D realistis.",
      ],
      cons: [
        "Membutuhkan ketersediaan perangkat komputer yang memadai untuk menjalankan software CAD yang berat.",
        "Alokasi waktu (24 JP) harus dikelola ketat agar semua siswa mencapai target kompetensi perakitan kompleks.",
      ],
      theory:
        "Pembelajaran ini didasarkan pada teori Konstruktivisme Vygotsky dengan penerapan Scaffolding. Pendekatan Diferensiasi (Tomlinson) juga diterapkan dengan membedakan proses belajar antara kelompok yang butuh panduan bertahap dengan kelompok yang siap untuk eksplorasi mandiri.",
      fileLinks: [
        { label: "📄 RPP Siklus 1 (DOCX)", url: "Siklus%201/RPP%20Siklus%201_FIX%20.docx" },
      ],
    },
    "modal-materi1": {
      title: "Bahan Ajar & Materi Siklus 1 — Assembly Tool Post",
      type: "Bahan Ajar Cetak & Digital (Fase F / Kelas XI TPM)",
      context:
        'Bahan ajar ini dirancang khusus untuk Siklus 1, materi "Perancangan Gambar Rakitan Kompleks". Disusun berdasarkan Capaian Pembelajaran Fase F dan dilengkapi materi per pertemuan (P1–P3).',
      purpose:
        "Menyediakan panduan sistematis bagi siswa untuk merakit 8 komponen utama Tool Post (menetapkan Grounded Component, constraint Mate, Flush, Insert) hingga mencapai derajat kebebasan (DOF) = 0.",
      pros: [
        "Terstruktur secara runtut mulai dari tujuan hingga referensi.",
        "Dilengkapi bagian Panduan Troubleshooting Error Umum yang sangat praktis bagi siswa SMK.",
        "Menyertakan Glosarium Istilah CAD untuk memperkaya kosakata keteknikan siswa.",
      ],
      cons: [
        "Teks instruksional dalam format dokumen kurang interaktif dibandingkan video tutorial.",
        "Biaya cetak yang cukup tinggi jika memperbanyak modul berhalaman tebal secara fisik.",
      ],
      theory:
        "Pengembangan bahan ajar ini didasarkan pada prinsip Cognitive Load Theory (Sweller) yang berusaha mengurangi extraneous cognitive load dengan menyajikan informasi esensial seperti daftar komponen dan troubleshooting secara ringkas dan terfokus.",
      fileLinks: [
        { label: "📘 Bahan Ajar Siklus 1 (DOCX)", url: "Siklus%201/Materi/BahanAjar_Siklus1_TFLM_XI.docx" },
        { label: "📄 Materi Pertemuan 1 (DOCX)", url: "Siklus%201/Materi/Materi_Siklus-1_P1.docx" },
        { label: "📄 Materi Pertemuan 2 (DOCX)", url: "Siklus%201/Materi/Materi_Siklus-1_P2.docx" },
        { label: "📄 Materi Pertemuan 3 (DOCX)", url: "Siklus%201/Materi/Materi_Siklus-1_P3.docx" },
      ],
    },
    "modal-media1": {
      title: "Media Presentasi (PPT) — Assembly Tool Post",
      type: "Media Pembelajaran (Slide Interaktif)",
      context:
        "Disusun sebagai pendamping visualisasi bagi siswa di awal pertemuan sebelum mereka turun praktik merakit komponen menggunakan komputer.",
      purpose:
        "Memvisualisasikan bentuk akhir dari Tool Post secara 3D untuk memancing atensi (hook) serta menjelaskan langkah krusial seperti perbedaan constraint Mate dan Flush.",
      pros: [
        "Sangat efektif menarik perhatian awal kelas.",
        "Mempermudah penjelasan konsep abstrak (seperti DOF) melalui representasi visual.",
      ],
      cons: [
        "Bersifat komunikasi satu arah.",
        "Masih membutuhkan demonstrasi software langsung agar siswa benar-benar paham alur klik pada mouse.",
      ],
      theory:
        "Desain media ini bertumpu pada Dual Coding Theory (Paivio), di mana integrasi stimulasi verbal (penjelasan guru) dan gambar (slide PPT) terbukti lebih mudah diingat dalam working memory siswa.",
      fileLinks: [
        { label: "📊 PPT Pertemuan 1 (PPTX)", url: "Siklus%201/Media%20Pembelajaran/PPT_P1_Siklus1.pptx" },
      ],
    },
    "modal-asesmen1": {
      title: "Perangkat Asesmen Terpadu — Siklus 1",
      type: "Instrumen Asesmen (Diagnostik, Formatif, Sumatif)",
      context:
        "Dikembangkan untuk memantau kemajuan siswa dari sebelum hingga sesudah pembelajaran. Memuat instrumen Asesmen Awal, Lembar Observasi Guru, Exit Ticket per pertemuan, dan Rubrik Sumatif.",
      purpose:
        "Memetakan tingkat pemahaman awal siswa (untuk pengelompokan scaffolding) dan mengevaluasi ketercapaian perakitan Tool Post secara autentik.",
      pros: [
        "Sangat komprehensif dan berkelanjutan (mulai dari pra-pembelajaran hingga akhir).",
        "Exit ticket (seperti pertanyaan mengapa Tool Holder harus di-grounded) sangat efektif mengecek pemahaman konsep.",
        "Rubrik jelas untuk mengkategorikan siswa: mandiri, butuh panduan, atau butuh scaffolding penuh.",
      ],
      cons: [
        "Lembar observasi manual memakan banyak waktu guru jika diterapkan pada kelas dengan jumlah siswa >30 orang.",
      ],
      theory:
        "Asesmen ini mengimplementasikan konsep Assessment for Learning dan Assessment as Learning (Earl, 2003). Rubrik unjuk kerjanya berlandaskan prinsip Asesmen Autentik (Wiggins) di mana siswa dinilai melalui performa praktik yang menyerupai standar industri manufaktur sesungguhnya.",
      fileLinks: [
        { label: "📋 Asesmen Siklus 1 (DOCX)", url: "Siklus%201/Asesmen/Asesmen_Siklus1_FIX.docx" },
      ],
    },
    "modal-lkm1": {
      title: "Lembar Kerja Murid (LKM) Siklus 1",
      type: "LKM Pertemuan 1–3 (Kelas XI TPM)",
      context:
        "LKM dirancang khusus untuk memandu siswa tahap demi tahap selama tiga pertemuan. Setiap LKM dilengkapi kolom screenshot hasil kerja pada tahap-tahap krusial perakitan di Autodesk Inventor.",
      purpose:
        "Merekam proses dan rekam jejak praktik (portofolio) setiap siswa secara individu, sekaligus melatih kedisiplinan dan prosedur kerja operasional software CAD.",
      pros: [
        'Terdapat kolom "Self-Assessment" dan "Refleksi/Kendala" yang melatih kemandirian siswa.',
        "Tugas didokumentasikan rapi sebagai portofolio belajar dari pertemuan 1 hingga 3.",
        "Instruksi bertahap memudahkan siswa mengikuti alur perakitan tanpa kebingungan.",
      ],
      cons: [
        "Ada risiko siswa sekadar meniru screenshot teman bila guru tidak memonitor layar mereka satu-per-satu.",
        "Format cetak LKM memerlukan biaya pengadaan tambahan jika jumlah siswa banyak.",
      ],
      theory:
        "Fitur self-assessment dan refleksi di dalam LKM ini merepresentasikan implementasi Self-Regulated Learning (Zimmerman), di mana siswa diajak secara sadar mengevaluasi progres dan kendala yang mereka hadapi dalam merakit.",
      fileLinks: [
        { label: "📝 LKM Pertemuan 1 (DOCX)", url: "Siklus%201/LKM/LKM_Siklus-1_P1.docx" },
        { label: "📝 LKM Pertemuan 2 (DOCX)", url: "Siklus%201/LKM/LKM_Siklus-1_P2.docx" },
        { label: "📝 LKM Pertemuan 3 (DOCX)", url: "Siklus%201/LKM/LKM_Siklus-1_P3.docx" },
      ],
    },
    "modal-toolpost": {
      title: "Gambar Teknik Tool Post — Revisi",
      type: "Gambar Rakitan Teknik (PDF)",
      context:
        "File PDF ini merupakan gambar rakitan Tool Post hasil revisi yang digunakan sebagai objek referensi utama dalam praktik Assembly di Siklus 1. Tool Post adalah komponen pemegang pahat pada mesin bubut yang terdiri dari 8 part utama.",
      purpose:
        "Menyediakan gambar kerja terstandar sebagai acuan siswa dalam merakit komponen secara virtual di Autodesk Inventor, sekaligus melatih kemampuan membaca gambar teknik manufaktur.",
      pros: [
        "Gambar rakitan lengkap memuat 8 komponen dengan dimensi yang terstandar.",
        "Format PDF memudahkan distribusi dan tampilan di layar maupun cetak.",
        "Menjadi jembatan antara gambar 2D di kertas dengan model 3D Assembly di CAD.",
      ],
      cons: [
        "File PDF statis tidak dapat langsung dimanipulasi siswa, perlu dikonversi ke format CAD terlebih dahulu.",
        "Resolusi gambar perlu dijaga kualitasnya agar detail dimensi tetap terbaca jelas.",
      ],
      theory:
        "Penggunaan gambar teknik sebagai media pembelajaran mengacu pada teori Representasi Ganda (Multiple Representation) yang memperkuat pemahaman konseptual siswa melalui hubungan antara gambar proyeksi 2D dan visualisasi 3D yang mereka bangun di software CAD.",
      pdfPreview: "Siklus%201/Tool%20Post%20Rev.pdf",
      fileLinks: [
        { label: "📐 Tool Post Rev (PDF)", url: "Siklus%201/Tool%20Post%20Rev.pdf" },
      ],
    },
  };

  function openModal(modalId) {
    const data = artifactData[modalId];
    if (!data) return;

    const prosHtml = data.pros.map((p) => `<li>✅ ${p}</li>`).join("");
    const consHtml = data.cons.map((c) => `<li>⚠️ ${c}</li>`).join("");

    const fileLinksHtml = data.fileLinks && data.fileLinks.length
      ? `<div class="modal-files">
           <h4>📂 File Artefak</h4>
           <div class="modal-file-list">
             ${data.fileLinks.map((f) =>
               `<a class="modal-file-btn" href="${f.url}" target="_blank" rel="noopener noreferrer">${f.label}</a>`
             ).join("")}
           </div>
         </div>`
      : "";

    const pdfPreviewHtml = data.pdfPreview
      ? `<div class="modal-pdf-preview">
           <h4>🖼️ Preview Dokumen</h4>
           <div class="pdf-embed-wrapper">
             <object data="${data.pdfPreview}" type="application/pdf" class="pdf-embed" aria-label="Preview ${data.title}">
               <div class="pdf-fallback">
                 <span>🗂️</span>
                 <p>Preview tidak tersedia di browser ini.</p>
                 <a href="${data.pdfPreview}" target="_blank" rel="noopener noreferrer" class="modal-file-btn">Buka File PDF</a>
               </div>
             </object>
           </div>
         </div>`
      : "";

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3>${data.title}</h3>
        <p class="modal-type-badge">${data.type}</p>
      </div>
      <div class="modal-body">
        <h4>📌 Konteks Pembuatan</h4>
        <p>${data.context}</p>

        <h4>🎯 Tujuan</h4>
        <p>${data.purpose}</p>

        <h4>📈 Kelebihan & Kekurangan</h4>
        <ul>
          ${prosHtml}
          ${consHtml}
        </ul>

        <h4>📖 Kajian Teori</h4>
        <p>${data.theory}</p>

        ${pdfPreviewHtml}
        ${fileLinksHtml}
      </div>
    `;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(btn.getAttribute("data-modal"));
    });
    // Keyboard accessibility for div-based triggers
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(btn.getAttribute("data-modal"));
      }
    });
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});

// Fade-in keyframe (used by filter)
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ============================================
   PARTICLE ANIMATION SYSTEM
   Enhanced with mouse interaction & click effects
   ============================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let ripples = [];
  let burstParticles = [];
  let animationId;
  let width, height;
  let mouseX = -1000,
    mouseY = -1000;

  const colors = [
    { r: 255, g: 107, b: 107 },
    { r: 46, g: 196, b: 182 },
    { r: 155, g: 114, b: 207 },
    { r: 255, g: 179, b: 71 },
    { r: 86, g: 204, b: 242 },
    { r: 107, g: 203, b: 119 },
    { r: 255, g: 111, b: 145 },
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function getParticleCount() {
    if (width < 768) return 35;
    if (width < 1024) return 50;
    return 70;
  }

  function createParticle(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    return {
      x: x !== undefined ? x : Math.random() * width,
      y: y !== undefined ? y : Math.random() * height,
      size: Math.random() * 5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.4 - 0.15,
      color: color,
      alpha: isDark ? Math.random() * 0.2 + 0.1 : Math.random() * 0.3 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      origSpeedX: 0,
      origSpeedY: 0,
    };
  }

  function initParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.origSpeedX = p.speedX;
      p.origSpeedY = p.speedY;
      particles.push(p);
    }
  }

  // --- Click Ripple Effect ---
  function createRipple(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: 150 + Math.random() * 80,
      alpha: 0.4,
      color,
    });
    ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: 80 + Math.random() * 60,
      alpha: 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    // Burst mini particles
    for (let i = 0; i < 12; i++) {
      const angle = ((Math.PI * 2) / 12) * i + Math.random() * 0.3;
      const speed = 2 + Math.random() * 3;
      const bColor = colors[Math.floor(Math.random() * colors.length)];
      burstParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        alpha: 0.8,
        color: bColor,
        life: 1,
        decay: 0.015 + Math.random() * 0.015,
      });
    }
  }

  function drawRipples() {
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += 3;
      r.alpha -= 0.006;
      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${r.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function drawBurstParticles() {
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const b = burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.96;
      b.vy *= 0.96;
      b.life -= b.decay;
      b.alpha = b.life * 0.8;
      if (b.life <= 0) {
        burstParticles.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * b.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`;
      ctx.fill();

      // Trailing glow
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * b.life * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 0.15})`;
      ctx.fill();
    }
  }

  // --- Draw main particles with mouse repulsion ---
  function drawParticle(p) {
    const pulseFactor = Math.sin(p.pulse) * 0.3 + 0.7;
    const alpha = p.alpha * pulseFactor;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
    ctx.fill();

    if (p.size > 2.5) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    const connectionDistance = 120;
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const maxAlpha = isDark ? 0.04 : 0.06;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * maxAlpha;
          const p = particles[i];
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const mouseRadius = 120;

    particles.forEach((p) => {
      // Mouse repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius && dist > 0) {
        const force = (mouseRadius - dist) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * 2.5;
        p.y += Math.sin(angle) * force * 2.5;
      } else {
        // Gradually return to original speed
        p.speedX += (p.origSpeedX - p.speedX) * 0.01;
        p.speedY += (p.origSpeedY - p.speedY) * 0.01;
      }

      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      drawParticle(p);
    });

    drawConnections();
    drawRipples();
    drawBurstParticles();

    animationId = requestAnimationFrame(animate);
  }

  // Mouse tracking
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener("mouseleave", () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  // Click ripple
  document.addEventListener("click", (e) => {
    createRipple(e.clientX, e.clientY);
  });

  // Initialize
  resize();
  initParticles();
  animate();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initParticles();
    }, 200);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
})();

/* ============================================
   STAGGERED SCROLL REVEAL
   Cards animate in one by one with delay
   ============================================ */
(function () {
  // Stagger children inside grids
  const grids = document.querySelectorAll(
    ".portfolio-grid, .skills-grid, .cert-grid, .philosophy-pillars, .about-stats",
  );

  grids.forEach((grid) => {
    const cards = grid.querySelectorAll(".reveal");
    cards.forEach((card, idx) => {
      card.style.transitionDelay = `${idx * 0.1}s`;
    });
  });

  // Parallax-lite for floating shapes on scroll
  const shapes = document.querySelector(".floating-shapes");
  if (shapes) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        shapes.style.transform = `translateY(${scrollY * 0.08}px)`;
      },
      { passive: true },
    );
  }

  // Counter animation for stat numbers
  const statNumbers = document.querySelectorAll(".about-stat .number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = "true";
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(\+?)$/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = match[2] || "";
    let current = 0;
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Tilt effect on hover for cards
  const tiltCards = document.querySelectorAll(
    ".portfolio-card, .pillar-card, .skill-card, .cert-card",
  );
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.4s ease";
      setTimeout(() => {
        card.style.transition = "";
      }, 400);
    });
  });
})();
