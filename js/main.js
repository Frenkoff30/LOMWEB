/* =========================================================
   LOM SRNÍ — interakce
   ========================================================= */
(function () {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Rok v patičce ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header: stav po odscrollování ---- */
  const header = document.getElementById("header");
  const onScrollHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---- Mobilní menu ---- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otevřít menu");
  };
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Scrollspy — aktivní odkaz v navigaci ---- */
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(nav.querySelectorAll("a"));
  const linkFor = (id) => navLinks.find((a) => a.getAttribute("href") === "#" + id);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("active"));
            const link = linkFor(entry.target.id);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Count-up pro statistiky v hero ---- */
  const counters = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || target === 0) {
      el.textContent = target;
      return;
    }
    const start = target > 100 ? target - 30 : 0;
    const duration = 1200;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(runCount);
  }

  /* ---- Bublinky v hero ---- */
  const bubbles = document.getElementById("bubbles");
  if (bubbles && !reduceMotion) {
    const count = window.innerWidth < 700 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("span");
      b.className = "bubble";
      const size = 4 + Math.random() * 16;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 7 + Math.random() * 9 + "s";
      b.style.animationDelay = -Math.random() * 12 + "s";
      bubbles.appendChild(b);
    }
  }

  /* ---- Mořský sediment (marine snow) ---- */
  const snow = document.getElementById("snow");
  if (snow && !reduceMotion) {
    const n = window.innerWidth < 700 ? 32 : 64;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "snowflake";
      const sz = 1 + Math.random() * 2.6;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = 11 + Math.random() * 16 + "s";
      s.style.animationDelay = -Math.random() * 22 + "s";
      snow.appendChild(s);
    }
  }

  /* ---- Ambientní bublinky přes celý web ---- */
  const ambient = document.getElementById("ambientBubbles");
  if (ambient && !reduceMotion) {
    const n = window.innerWidth < 700 ? 10 : 20;
    for (let i = 0; i < n; i++) {
      const b = document.createElement("span");
      b.className = "bubble";
      const size = 3 + Math.random() * 12;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 13 + Math.random() * 15 + "s";
      b.style.animationDelay = -Math.random() * 24 + "s";
      ambient.appendChild(b);
    }
  }

  /* ---- Ryby plující pod hladinou přes celý web ---- */
  const fishBox = document.getElementById("ambientFish");
  if (fishBox && !reduceMotion) {
    const fishSvg =
      '<svg viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M2 8 Q 12 1 22 8 Q 12 15 2 8 Z"/>' +
      '<path d="M22 8 L 31 2.5 L 31 13.5 Z"/>' +
      '<circle cx="7" cy="6.6" r="1.1" fill="#02141d"/></svg>';
    const n = window.innerWidth < 700 ? 4 : 9;
    for (let i = 0; i < n; i++) {
      const f = document.createElement("span");
      f.innerHTML = fishSvg;
      const w = 26 + Math.random() * 74;
      f.style.width = w + "px";
      f.style.height = w * 0.5 + "px";
      f.style.top = 4 + Math.random() * 90 + "%";
      f.style.color = "rgba(16, 60, 82, " + (0.4 + Math.random() * 0.42).toFixed(2) + ")";
      f.style.animationName = Math.random() > 0.5 ? "swim" : "swimFlip";
      f.style.animationDuration = 18 + Math.random() * 26 + "s";
      f.style.animationDelay = -Math.random() * 42 + "s";
      fishBox.appendChild(f);
    }
  }

  /* ---- Klesající sediment přes celý web (pocit sestupu do hloubky) ---- */
  const ambientSnow = document.getElementById("ambientSnow");
  if (ambientSnow && !reduceMotion) {
    const n = window.innerWidth < 700 ? 26 : 50;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "snowflake";
      const sz = 1 + Math.random() * 2.4;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = 16 + Math.random() * 20 + "s";
      s.style.animationDelay = -Math.random() * 30 + "s";
      ambientSnow.appendChild(s);
    }
  }

  /* ---- Jemný parallax v hero ---- */
  const glow = document.querySelector(".hero__glow");
  const heroInner = document.querySelector(".hero__inner");
  if (!reduceMotion && glow) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > window.innerHeight) return;
        if (!ticking) {
          requestAnimationFrame(() => {
            const y = window.scrollY;
            glow.style.transform = "translateY(" + y * 0.25 + "px)";
            if (heroInner) heroInner.style.transform = "translateY(" + y * 0.12 + "px)";
            heroInner.style.opacity = String(Math.max(1 - y / (window.innerHeight * 0.8), 0));
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---- Demo kontaktní formulář ---- */
  const form = document.getElementById("contactForm");
  const formOk = document.getElementById("formOk");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      formOk.classList.add("show");
      form.reset();
      setTimeout(() => formOk.classList.remove("show"), 6000);
    });
  }

  /* ---- Lightbox (aktivní jen pokud má dlaždice reálnou fotku) ---- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".gphoto").forEach((tile) => {
    tile.addEventListener("click", () => {
      const img = tile.querySelector("img");
      if (!img) return; // placeholder bez fotky
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const closeLb = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  };
  if (lightboxClose) lightboxClose.addEventListener("click", closeLb);
  if (lightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });

  /* ---- Rotující slovo v hero ---- */
  const rotator = document.getElementById("rotator");
  if (rotator) {
    const words = ["rodiny", "plavce", "potápěče", "kempaře", "dobrodruhy"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      rotator.classList.add("swap");
      setTimeout(() => {
        rotator.textContent = words[i];
        rotator.classList.remove("swap");
      }, 300);
    }, 2400);
  }

  /* ---- Hloubkoměr — kolik metrů jsi „klesl" (lom je hluboký 33 m) ---- */
  const depthValue = document.getElementById("depthValue");
  const toTop = document.getElementById("toTop");
  if (depthValue || toTop) {
    const maxDepth = 33;
    let dTick = false;
    const onDepthScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const frac = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      if (depthValue) depthValue.textContent = Math.round(frac * maxDepth) + " m";
      if (toTop) toTop.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
      dTick = false;
    };
    onDepthScroll();
    window.addEventListener("scroll", () => {
      if (!dTick) { requestAnimationFrame(onDepthScroll); dTick = true; }
    }, { passive: true });
  }
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---- Hero — prolínání fotek hladiny ---- */
  const slides = Array.from(document.querySelectorAll(".hero__slide"));
  if (slides.length > 1 && !reduceMotion) {
    let si = 0;
    setInterval(() => {
      slides[si].classList.remove("is-active");
      si = (si + 1) % slides.length;
      slides[si].classList.add("is-active");
    }, 5000);
  }
})();
