document.addEventListener('DOMContentLoaded', () => {
  /* Scroll Reveal Animation */
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(
    entries,
    observer
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  /* Smooth Scrolling for Anchor Links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        // Calculate header offset for smooth scrolling
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* Navbar Background Blur effect on Scroll */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(18, 18, 18, 0.8)';
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(18, 18, 18, 0.6)';
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.boxShadow = 'none';
    }
  });

  /* Form Submission Mock */
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn');
      const originalText = btn.innerHTML;
      
      // Simulate sending
      btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
      lucide.createIcons();
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="check-circle"></i> Sent Successfully';
        lucide.createIcons();
        btn.style.background = '#10b981'; /* Success Green */
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          lucide.createIcons();
          btn.style.background = '';
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'all';
        }, 3000);
      }, 1500);
    });
  }

  /* Custom Cursor Logic */
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category');

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '12px';
      cursorDot.style.height = '12px';
      cursorDot.style.backgroundColor = '#10b981'; // emerald green
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    });

    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorDot.style.backgroundColor = 'var(--accent-blue)';
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.borderColor = 'rgba(0, 112, 243, 0.5)';
      
      // Reset magnetic effect if applied
      if(el.classList.contains('magnetic')) {
        el.style.transform = `translate(0px, 0px)`;
      }
    });
  });

  /* Magnetic Effect Physics */
  const magneticItems = document.querySelectorAll('.magnetic');
  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const position = item.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      const strength = 0.3; // tweak for more/less pull
      item.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  });

  /* Parallax Scroll Effect */
  const parallaxShapes = document.querySelectorAll('.floating-shape');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxShapes.forEach(shape => {
      const speed = shape.getAttribute('data-speed');
      const yPos = -(scrollY * speed * 0.1);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  });

  /* Horizontal Scroll Timeline (Process Section) */
  const processSection = document.querySelector('.process');
  const processTrack = document.querySelector('.process-track');
  const processCards = document.querySelectorAll('.process-card');
  const connectionPath = document.querySelector('.connection-path');
  
  // Scramble text characters
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  const scrambleText = (el) => {
    if (el.dataset.scrambling === 'true') return;
    el.dataset.scrambling = 'true';
    
    const originalText = el.dataset.text;
    let iteration = 0;
    
    const interval = setInterval(() => {
      el.innerText = originalText.split('').map((letter, index) => {
        if(index < iteration) {
           return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
      if(iteration >= originalText.length){
        clearInterval(interval);
        el.dataset.scrambling = 'false';
      }
      iteration += 1 / 3;
    }, 30);
  };

  if (processSection && processTrack) {
    // Setup SVG Line
    if(connectionPath) {
      const pathLength = connectionPath.getTotalLength();
      connectionPath.style.strokeDasharray = pathLength;
      connectionPath.style.strokeDashoffset = pathLength;
    }

    window.addEventListener('scroll', () => {
      const sectionTop = processSection.offsetTop;
      const sectionHeight = processSection.offsetHeight;
      const scrollY = window.scrollY;
      
      let progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const maxTranslateX = processTrack.scrollWidth - window.innerWidth;
      processTrack.style.transform = `translateX(-${progress * maxTranslateX}px)`;

      // Animate SVG Line
      if(connectionPath) {
        const pathLength = connectionPath.getTotalLength();
        connectionPath.style.strokeDashoffset = pathLength - (progress * pathLength);
      }

      // 3D Tilt and Scramble Logic
      processCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + (rect.width / 2);
        const windowCenter = window.innerWidth / 2;
        
        // Distance from center (-1 to 1 roughly)
        const distFromCenter = (cardCenter - windowCenter) / window.innerWidth;
        
        // Tilt intensity based on distance from center
        const rotateY = distFromCenter * 45; // Max 45 deg tilt
        const scale = 1 - Math.abs(distFromCenter * 0.4); // Scale down on edges
        const opacity = 1 - Math.abs(distFromCenter * 1.2);

        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${Math.max(0.6, scale)})`;
        card.style.opacity = Math.max(0.2, opacity);

        // Center element active state
        if (Math.abs(distFromCenter) < 0.2) {
          if (!card.classList.contains('active-center')) {
             card.classList.add('active-center');
             const heading = card.querySelector('.scramble-text');
             if(heading) scrambleText(heading);
          }
        } else {
          card.classList.remove('active-center');
        }
      });
    });
  }

});
