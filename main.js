/* ==========================================================================
   MungPhai Trips & Tours — Apple-like Dual Navigation & Multi-Page Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Apple-like Smart Sticky Navigation Controller (Hide on scroll down, show on scroll up)
  const stickyNav = document.getElementById('stickyNav');
  let lastScrollTop = 0;
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';

  if (stickyNav) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (isHomePage) {
        if (scrollTop > 350) {
          stickyNav.classList.add('scrolled-light-bg');
          if (scrollTop > lastScrollTop && scrollTop - lastScrollTop > 10) {
            // Scrolling down -> hide sticky header
            stickyNav.classList.remove('visible');
            stickyNav.classList.add('hidden');
          } else if (lastScrollTop - scrollTop > 10) {
            // Scrolling up -> show sticky header
            stickyNav.classList.add('visible');
            stickyNav.classList.remove('hidden');
          }
        } else {
          // Inside hero -> hide sticky header to let floating hero nav shine
          stickyNav.classList.remove('scrolled-light-bg');
          stickyNav.classList.remove('visible');
          stickyNav.classList.remove('hidden');
        }
      } else {
        // Dedicated subpage -> keep sticky header visible and apply dark text for light background canvas
        stickyNav.classList.add('scrolled-light-bg');
        if (scrollTop > 150 && scrollTop > lastScrollTop && scrollTop - lastScrollTop > 10) {
          stickyNav.classList.remove('visible');
          stickyNav.classList.add('hidden');
        } else if (lastScrollTop - scrollTop > 10 || scrollTop <= 150) {
          stickyNav.classList.add('visible');
          stickyNav.classList.remove('hidden');
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }

  // 3. Mobile Full-Screen Menu Drawer Controller
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const stickyHamburgerToggle = document.getElementById('stickyHamburgerToggle');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (hamburgerToggle) hamburgerToggle.addEventListener('click', openDrawer);
  if (stickyHamburgerToggle) stickyHamburgerToggle.addEventListener('click', openDrawer);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 4. Ambient Cursor Light Follower
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // 5. Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. IntersectionObserver Scroll Reveal


  // 7. Package Filter Tabs Controller (packages.html & index.html)
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const packageRowCards = document.querySelectorAll('.package-row-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      packageRowCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = window.innerWidth <= 900 ? 'flex' : 'grid';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7b. Mobile Package Destinations Expander (+ More)
  function initMobileDestinationExpander() {
    document.querySelectorAll('.package-tags-flex').forEach(container => {
      if (container.querySelector('.tag-pill-more')) return;

      const pills = container.querySelectorAll('.tag-pill');
      if (pills.length > 4) {
        const excess = pills.length - 4;
        const moreBtn = document.createElement('button');
        moreBtn.className = 'tag-pill tag-pill-more';
        moreBtn.type = 'button';
        moreBtn.textContent = '+' + excess + ' More';
        container.appendChild(moreBtn);

        moreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          container.classList.add('expanded');
        });
      }
    });
  }

  initMobileDestinationExpander();

  // 8. Gallery Filter Tabs Controller (gallery.html)
  const galleryTabBtns = document.querySelectorAll('.tab-btn[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-gallery-cat');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 9. Modal Reservation Window Controller
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalPackageInput = document.getElementById('modalPackage');
  const bookBtns = document.querySelectorAll('.trigger-booking');

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package') || 'Northeast Expedition';
      if (modalPackageInput) {
        modalPackageInput.value = packageName;
      }
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 10. Modal Form Submission -> Instant WhatsApp Builder
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const pkg = document.getElementById('modalPackage').value;
      const date = document.getElementById('modalDate').value;

      const text = `Hello MungPhai Trips & Tours!\nI would like to reserve/enquire about:\n- *Trip/Vehicle*: ${pkg}\n- *Name*: ${name}\n- *Phone*: ${phone}\n- *Travel Date*: ${date}`;
      const whatsappUrl = `https://wa.me/918822918687?text=${encodeURIComponent(text)}`;
      
      window.open(whatsappUrl, '_blank');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // 11. Contact Section Form Submission
  const contactForm = document.getElementById('contactSectionForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const phone = document.getElementById('contactPhone').value;
      const destination = document.getElementById('contactDestination').value;
      const date = document.getElementById('contactDate').value;

      const text = `Hello MungPhai Trips & Tours!\nNew Trip Enquiry:\n- *Name*: ${name}\n- *Phone*: ${phone}\n- *Selected*: ${destination}\n- *Travel Date*: ${date}`;
      const whatsappUrl = `https://wa.me/918822918687?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // 11. Fleet Interactive Showcase Controller (Touch Swipe & Car Spawn Animation)
  // 11. Fleet Interactive Showcase Controller (Smooth Fade Content Swapping)
  const fleetDots = document.querySelectorAll('.fleet-dot');
  const fleetTitle = document.getElementById('fleetTitle');
  const fleetCap = document.getElementById('fleetCap');
  const fleetLuggage = document.getElementById('fleetLuggage');
  const fleetMileage = document.getElementById('fleetMileage');
  const fleetEngine = document.getElementById('fleetEngine');
  const fleetDesc = document.getElementById('fleetDesc');
  const fleetImg = document.getElementById('fleetImg');
  const fleetDetailsCol = document.getElementById('fleetDetailsCol');
  const fleetReserveBtn = document.getElementById('fleetReserveBtn');
  const fleetPrevBtn = document.getElementById('fleetPrevBtn');
  const fleetNextBtn = document.getElementById('fleetNextBtn');

  const fleetKeys = ['dzire', 'ertiga', 'innova', 'scorpio', 'traveller'];
  let currentFleetIndex = 2; // Default Innova Crysta
  let isFleetAnimating = false;

  const fleetData = {
    dzire: {
      title: 'Swift Dzire',
      cap: '4+1 Seats',
      luggage: '2 Bags',
      mileage: '22.5 km/l',
      engine: '1.2L Petrol',
      desc: 'The Swift Dzire is an agile, ultra-comfortable executive sedan designed for seamless Guwahati airport transfers and highway drives.',
      imgSrc: 'Photos%20section/fleet_dzire.png',
      package: 'Swift Dzire Cab Booking'
    },
    ertiga: {
      title: 'Maruti Ertiga',
      cap: '6+1 Seats',
      luggage: '3 Bags',
      mileage: '20.5 km/l',
      engine: '1.5L Hybrid',
      desc: 'Spacious and highly reliable family MUV, ideal for family vacations and group road trips to Shillong and Cherrapunji.',
      imgSrc: 'Photos%20section/fleet_ertiga.png',
      package: 'Maruti Ertiga Booking'
    },
    innova: {
      title: 'Toyota Innova Crysta',
      cap: '6+1 / 7+1 Seats',
      luggage: '4 Bags',
      mileage: '15.1 km/l',
      engine: '2.4L Diesel',
      desc: 'The Toyota Innova Crysta is the benchmark for premium road travel. Its refined diesel engine and spacious cabin make it the preferred choice for expeditions.',
      imgSrc: 'Photos%20section/fleet_innova.png',
      package: 'Innova Crysta Booking'
    },
    scorpio: {
      title: 'Mahindra Scorpio Classic',
      cap: '7+1 Seats',
      luggage: '3 Bags',
      mileage: '14.0 km/l',
      engine: '2.2L Diesel',
      desc: 'Built for power, the Scorpio Classic is the ultimate choice for conquering rugged mountain roads and high-altitude passes across the Northeast.',
      imgSrc: 'Photos%20section/fleet_scorpio.png',
      package: 'Mahindra Scorpio Booking'
    },
    traveller: {
      title: 'Force Urbania',
      cap: '12+1 / 17+1 Seats',
      luggage: '10+ Bags',
      mileage: '11.5 km/l',
      engine: '2.6L Diesel',
      desc: 'Executive luxury mini-bus equipped with reclining pushback seating and high ceiling—tailored for large tour groups.',
      imgSrc: 'Photos%20section/fleet_traveller.png',
      package: 'Force Urbania Booking'
    }
  };

  // Preload Images
  const preloadedImages = [];
  fleetKeys.forEach(key => {
    const img = new Image();
    img.src = fleetData[key].imgSrc;
    preloadedImages.push(img);
  });

  function updateFleetShowcase(index) {
    if (isFleetAnimating) return;
    if (index < 0) index = fleetKeys.length - 1;
    if (index >= fleetKeys.length) index = 0;
    currentFleetIndex = index;

    const key = fleetKeys[index];
    const data = fleetData[key];

    if (data) {
      isFleetAnimating = true;

      if (fleetImg) fleetImg.classList.add('fleet-fading-out');
      if (fleetDetailsCol) fleetDetailsCol.classList.add('fleet-fading-out');

      setTimeout(() => {
        if (fleetTitle) fleetTitle.textContent = data.title;
        if (fleetCap) fleetCap.textContent = data.cap;
        if (fleetLuggage) fleetLuggage.textContent = data.luggage;
        if (fleetMileage) fleetMileage.textContent = data.mileage;
        if (fleetEngine) fleetEngine.textContent = data.engine;
        if (fleetDesc) fleetDesc.textContent = data.desc;
        if (fleetReserveBtn) fleetReserveBtn.setAttribute('data-package', data.package);

        if (fleetImg) {
          fleetImg.src = data.imgSrc;
          fleetImg.alt = data.title;
        }

        fleetDots.forEach((dot, idx) => {
          if (idx === currentFleetIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        if (fleetImg) {
          fleetImg.classList.remove('fleet-fading-out');
          fleetImg.classList.add('fleet-fading-in');
        }
        if (fleetDetailsCol) {
          fleetDetailsCol.classList.remove('fleet-fading-out');
          fleetDetailsCol.classList.add('fleet-fading-in');
        }

        setTimeout(() => {
          if (fleetImg) fleetImg.classList.remove('fleet-fading-in');
          if (fleetDetailsCol) fleetDetailsCol.classList.remove('fleet-fading-in');
          isFleetAnimating = false;
        }, 300);
      }, 300);
    }
  }

  fleetDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const newIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(newIndex) && newIndex !== currentFleetIndex) {
        updateFleetShowcase(newIndex);
      }
    });
  });

  if (fleetPrevBtn) {
    fleetPrevBtn.addEventListener('click', () => {
      updateFleetShowcase(currentFleetIndex - 1);
    });
  }

  if (fleetNextBtn) {
    fleetNextBtn.addEventListener('click', () => {
      updateFleetShowcase(currentFleetIndex + 1);
    });
  }

  // Touch Swipe Gesture Listener on Mobile
  const fleetContainer = document.querySelector('.fleet-slider-container');
  if (fleetContainer) {
    let touchStartX = 0;
    let touchEndX = 0;

    fleetContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    fleetContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 40;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped Left -> Next Vehicle
        updateFleetShowcase(currentFleetIndex + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped Right -> Previous Vehicle
        updateFleetShowcase(currentFleetIndex - 1);
      }
    }
  }

  // 12. FAQ Accordion Toggle Controller
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });

  // 12. Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
