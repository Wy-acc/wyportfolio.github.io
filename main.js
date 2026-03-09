/**
 * Portfolio — Main JavaScript
 * ============================
 * 1. Navbar scroll effect
 * 2. Mobile menu toggle
 * 3. Scroll-to-top button
 * 4. Scroll fade-in animations
 * 5. Active nav link highlight
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------
     DOM REFERENCES
     --------------------------------------------------- */
  const navbar      = document.getElementById("navbar");
  const navToggle   = document.getElementById("navToggle");
  const navMenu     = document.getElementById("navMenu");
  const scrollTopBtn = document.getElementById("scrollTop");
  const fadeElements = document.querySelectorAll(".fade-in");
  const navLinks     = document.querySelectorAll(".navbar__menu a");
  const sections     = document.querySelectorAll(".section, .hero");

  /* ---------------------------------------------------
     1. NAVBAR — Shrink & blur on scroll
     --------------------------------------------------- */
  function handleNavbarScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  /* ---------------------------------------------------
     2. MOBILE MENU — Open / close
     --------------------------------------------------- */
  function toggleMenu() {
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    navMenu.classList.remove("active");
  }

  /* ---------------------------------------------------
     3. SCROLL-TO-TOP — Show / hide button
     --------------------------------------------------- */
  function handleScrollTopVisibility() {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------------------------------------------
     4. FADE-IN ON SCROLL — Intersection Observer
     --------------------------------------------------- */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);       // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* ---------------------------------------------------
     5. ACTIVE NAV LINK — Highlight on scroll
     --------------------------------------------------- */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------------------------------------------
     EVENT LISTENERS
     --------------------------------------------------- */
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleScrollTopVisibility();
  });

  navToggle.addEventListener("click", toggleMenu);

  // Close mobile menu when any link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  scrollTopBtn.addEventListener("click", scrollToTop);

  // Close mobile menu on outside click
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
});
