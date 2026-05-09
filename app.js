// ===================== NAVBAR — Student 1 =====================

const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');

// 1. Hamburger toggle (mobile)
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// 2. Close menu when a link is clicked (mobile UX)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// 3. Shrink/blur navbar on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 4. Highlight active link based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===================== END NAVBAR =====================

