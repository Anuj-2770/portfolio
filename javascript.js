document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page');
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const themeToggle = document.getElementById('theme-toggle');

  function showSection(id) {
    sections.forEach((section) => {
      section.classList.toggle('active', section.id === id);
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    navMenu.classList.remove('open');
    window.scrollTo(0, 0);
  }

  // Intercept every in-page anchor link (nav links, hero buttons, scroll cue)
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection && targetSection.classList.contains('page')) {
        e.preventDefault();
        showSection(targetId);
        history.replaceState(null, '', `#${targetId}`);
      }
    });
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Show section based on URL hash on load, default to home
  const initialId = window.location.hash ? window.location.hash.slice(1) : 'home';
  const initialSection = document.getElementById(initialId);
  showSection(initialSection && initialSection.classList.contains('page') ? initialId : 'home');

  // ----- Theme toggle (dark / light), remembers choice -----
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    }
  });

  // ----- Typewriter effect for hero role -----
  const typewriterEl = document.getElementById('typewriter');
  const roles = ['Backend Developer', 'Java & Spring Boot', 'API Builder'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, deleting ? 40 : 70);
  }

  if (typewriterEl) {
    typeLoop();
  }
});