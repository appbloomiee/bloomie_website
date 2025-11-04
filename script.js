document.querySelector('.nav-toggle').addEventListener('click',()=>{
  const nav=document.querySelector('.nav');
  nav.style.display=nav.style.display==='flex'?'none':'flex';
  
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get menu elements
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  
  // Check if elements exist
  if (menuToggle && navbar) {
    
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navbar.classList.toggle('open');
      
      // Change icon when menu is open
      if (navbar.classList.contains('open')) {
        menuToggle.textContent = '✕';
      } else {
        menuToggle.textContent = '☰';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navbar.classList.remove('open');
        menuToggle.textContent = '☰';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    });
    
  }
  
  // Scroll animations for features page and other fade elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  
  // Observe all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  
});
