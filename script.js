document.addEventListener("DOMContentLoaded", function () {
    // --- Navigasi Aktif saat Scroll ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            // Cek jika href link mengandung id section yang aktif
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // --- Smooth Scroll untuk Navigasi ---
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // --- Animasi Fade-in saat Section Muncul ---
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll("section").forEach((section) => {
        section.classList.add("fade-in");
        observer.observe(section);
    });

    // --- Hover Effect pada Skill Card ---
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("scale-105", "shadow-lg", "bg-[#232323]");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("scale-105", "shadow-lg", "bg-[#232323]");
        });
    });

    // --- Hover Effect pada Project Card ---
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("scale-105", "shadow-xl");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("scale-105", "shadow-xl");
        });
    });

    // --- Logika Formulir Kontak (Contact Form) ---
    const form = document.getElementById("contact-form");
    const result = document.getElementById("form-result");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        // Hapus class warna sebelumnya
        result.classList.remove("text-green-600", "text-red-600");

        if (response.ok) {
            result.textContent = "Pesan berhasil dikirim!";
            result.classList.add("text-green-600"); // hijau
            form.reset();
        } else {
            result.textContent = "Terjadi kesalahan. Coba lagi.";
            result.classList.add("text-red-600"); // merah
        }
    });

    // bg
    const canvas = document.getElementById('neonCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Hanya 2 warna neon agar elegan
  const neonColors = [
    '#00ffff', // Neon Cyan
    '#bf00ff'  // Neon Purple
  ];

  class Bubble {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 40 + 60; // Lebih besar radius
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, this.color + '66'); // center agak transparan
      gradient.addColorStop(1, this.color + '00'); // fade out

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (
        this.x < -this.radius || this.x > width + this.radius ||
        this.y < -this.radius || this.y > height + this.radius
      ) {
        this.reset();
        this.y = Math.random() > 0.5 ? -this.radius : height + this.radius;
      }
    }
  }

  const bubbles = Array.from({ length: 25 }, () => new Bubble()); // Lebih sedikit, biar soft

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter'; // Glow effect
    bubbles.forEach(bubble => {
      bubble.update();
      bubble.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
