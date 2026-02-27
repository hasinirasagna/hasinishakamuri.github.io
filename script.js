// ================= Smooth Scrolling for Section Links =================
// Only targets links in sidebar that start with "#" (for index.html sections)
const sectionLinks = document.querySelectorAll('.sidebar a[href^="#"]');

sectionLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // prevent default only for internal section links
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================= Highlight Active Section in Sidebar =================
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  sectionLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ================= Sidebar Active Link Highlight Across Pages =================
// Highlight sidebar link based on current page
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

const currentPage = window.location.pathname.split("/").pop().toLowerCase(); // "resume.html", "index.html"

sidebarLinks.forEach(link => {
  const linkHref = link.getAttribute('href').split("/").pop().toLowerCase();

  if (linkHref === currentPage || (linkHref === "index.html" && currentPage === "")) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ================= Hero Section Typed Text Animation =================
const typedTextEl = document.querySelector('.typed-text');
const roles = [
  "Data Engineer",
  "Cloud Engineer",
  "Data Analyst",
  "Business Intelligence Analyst",
  "Data Science Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  if (!typedTextEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1000); // pause at end
      return;
    }
  } else {
    typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500); // pause before typing next role
      return;
    }
  }

  setTimeout(typeRole, isDeleting ? 50 : 150);
}

// Start the typing animation
typeRole();