// Professional Portfolio - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {

  // ===================================
  // Mobile Menu Toggle
  // ===================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');

      // Animate hamburger icon
      const spans = this.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // ===================================
  // Navbar Scroll Effects
  // ===================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  });

  // ===================================
  // Active Navigation Link on Scroll
  // ===================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ===================================
  // Smooth Scroll for Anchor Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // Intersection Observer for Animations
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const animatedElements = document.querySelectorAll(
    '.research-card, .project-card, .publication-item, .skill-category, .contact-item, .education-card'
  );

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // ===================================
  // Parallax Effect for Hero
  // ===================================
  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }

  console.log('Portfolio initialized successfully!');
});
