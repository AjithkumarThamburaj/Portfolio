const navbar = document.getElementById("navbar");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const toTop = document.getElementById("toTop");

// Navbar background and back-to-top button on scroll
function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("visible", y > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// Mobile menu
function setMenu(open) {
  menu.classList.toggle("open", open);
  navbar.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
}
menuToggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Highlight the nav link for the section in view
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // Fade cards in as they scroll into view
  const revealTargets = document.querySelectorAll(".job, .project, .skill-group, .edu, .about-card");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
