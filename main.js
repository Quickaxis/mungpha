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
  const packageRowCards = document.querySelectorAll('.premium-package-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      packageRowCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
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
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const bookBtns = document.querySelectorAll('.trigger-booking');

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package') || 'Northeast Expedition';
      
      if (modalWhatsappBtn) {
        const text = `Hello MungPhai Trips & Tours,\n\nI am interested in the package:\n\n${packageName}\n\nPlease share the itinerary, pricing, and availability.`;
        modalWhatsappBtn.href = `https://wa.me/918822918687?text=${encodeURIComponent(text)}`;
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
  // 11. Fleet Interactive Showcase Controller (Smooth Categorized Swapping)
  const fleetCategoryChips = document.querySelectorAll('.fleet-chip');
  const fleetTitle = document.getElementById('fleetTitle');
  const fleetDesc = document.getElementById('fleetDesc');
  const fleetImg = document.getElementById('fleetImg');
  const fleetDetailsCol = document.querySelector('.fleet-details-box');
  const fleetIndexText = document.getElementById('currentVehicleIndex');
  const fleetTotalText = document.getElementById('totalVehicleCount');
  const fleetClassTag = document.querySelector('.fleet-class-tag');
  const fleetReserveBtn = document.getElementById('fleetReserveBtn');
  const fleetPrevBtn = document.getElementById('fleetPrevBtn');
  const fleetNextBtn = document.getElementById('fleetNextBtn');

  const categorizedFleetData = {
    hatchback: [
      {
        title: 'Maruti Fronx',
        desc: 'Sleek and modern hatchback perfect for comfortable city tours and smooth highway cruising.',
        imgSrc: 'Photos section/fronxcarfixed.png',
        package: 'Maruti Fronx Booking'
      },
      {
        title: 'Maruti Swift',
        desc: 'Compact, reliable, and highly maneuverable. Excellent for quick transfers and solo travelers.',
        imgSrc: 'Photos section/swiftcarfixed.jpg',
        package: 'Maruti Swift Booking',
        imgPos: 'center 70%'
      }
    ],
    sedan: [
      {
        title: 'Maruti Dzire',
        desc: 'The Maruti Dzire is an agile, ultra-comfortable executive sedan designed for seamless Guwahati airport transfers and highway drives.',
        imgSrc: 'Photos section/Dezirecarfixed.png',
        package: 'Maruti Dzire Booking'
      },
      {
        title: 'Hyundai Aura',
        desc: 'Premium sedan offering a smooth ride, excellent legroom, and superior comfort for long road trips.',
        imgSrc: 'Photos section/whiteauracarfixed.png',
        package: 'Hyundai Aura Booking'
      }
    ],
    muv: [
      {
        title: 'Maruti Ertiga',
        desc: 'Spacious and highly reliable family MUV, ideal for family vacations and group road trips to Shillong and Cherrapunji.',
        imgSrc: 'Photos section/ertigacarfixed.png',
        package: 'Maruti Ertiga Booking',
        imgPos: 'center 70%'
      },
      {
        title: 'Toyota Innova Crysta',
        desc: 'The benchmark for premium road travel across Northeast India. Its refined engine and spacious cabin make it the preferred choice for expeditions.',
        imgSrc: 'Photos section/innovacarfixed.png',
        package: 'Innova Crysta Booking'
      }
    ],
    fleet: [
      {
        title: 'Force Traveller',
        desc: 'Up to 17-seater capacity designed for comfortable long-distance group tours and large family trips across the mountains.',
        imgSrc: 'Photos section/forcetraveller.png',
        package: 'Force Traveller Booking'
      },
      {
        title: 'Force Urbania',
        desc: 'Executive luxury mini-bus with reclining pushback seating, high ceilings, and premium comfort for corporate travel and large groups.',
        imgSrc: 'Photos section/forceurbaniacarfixed.png',
        package: 'Force Urbania Booking'
      }
    ]
  };

  let currentCategory = 'hatchback';
  let currentVehicleIndex = 0;
  let isFleetAnimating = false;

  // Preload all fleet images
  const preloadedFleetImages = [];
  Object.values(categorizedFleetData).forEach(cat => {
    cat.forEach(vehicle => {
      if (vehicle.imgSrc) {
        const img = new Image();
        img.src = vehicle.imgSrc;
        preloadedFleetImages.push(img);
      }
    });
  });

  function updateFleetShowcase(cat, index) {
    if (isFleetAnimating) return;
    
    const categoryArray = categorizedFleetData[cat];
    if (!categoryArray) return;

    if (index < 0) index = categoryArray.length - 1;
    if (index >= categoryArray.length) index = 0;
    
    currentCategory = cat;
    currentVehicleIndex = index;

    const data = categoryArray[currentVehicleIndex];

    if (data) {
      isFleetAnimating = true;

      // Update text details instantly (no fade on the entire card)
      if (fleetTitle) fleetTitle.textContent = data.title;
      if (fleetDesc) fleetDesc.textContent = data.desc;
      if (fleetReserveBtn) fleetReserveBtn.setAttribute('data-package', data.package);
      
      if (fleetIndexText) {
        fleetIndexText.textContent = String(currentVehicleIndex + 1).padStart(2, '0');
      }
      if (fleetTotalText) {
        fleetTotalText.textContent = String(categoryArray.length).padStart(2, '0');
      }
      
      if (fleetClassTag) {
        let catName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        if (currentCategory === 'muv') catName = 'MUV';
        fleetClassTag.textContent = catName + ' Class';
      }

      fleetCategoryChips.forEach(chip => {
        if (chip.getAttribute('data-category') === currentCategory) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });

      // Smoothly transition image only
      if (fleetImg) {
        fleetImg.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
        fleetImg.style.opacity = '0';
        
        setTimeout(() => {
          fleetImg.src = data.imgSrc;
          fleetImg.alt = data.title;
          fleetImg.style.objectPosition = data.imgPos || 'center center';
          
          // Force reflow
          void fleetImg.offsetWidth;
          
          fleetImg.style.opacity = '1';
          
          setTimeout(() => {
            isFleetAnimating = false;
          }, 300);
        }, 300);
      } else {
        isFleetAnimating = false;
      }
    }
  }

  fleetCategoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-category');
      if (cat !== currentCategory) {
        updateFleetShowcase(cat, 0);
      }
    });
  });

  if (fleetPrevBtn) {
    fleetPrevBtn.addEventListener('click', () => {
      updateFleetShowcase(currentCategory, currentVehicleIndex - 1);
    });
  }

  if (fleetNextBtn) {
    fleetNextBtn.addEventListener('click', () => {
      updateFleetShowcase(currentCategory, currentVehicleIndex + 1);
    });
  }
  
  // Initial load
  updateFleetShowcase('hatchback', 0);

  // Touch swipe listener removed as per requirements

  // 12. FAQ Accordion Toggle Controller
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
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

  // 13. Contact Modal Logic
  const contactModal = document.getElementById('contactModal');
  const contactModalClose = document.getElementById('contactModalClose');
  const triggerContactBtns = document.querySelectorAll('.trigger-contact-modal');

  if (contactModal) {
    // Open modal
    triggerContactBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      });
    });

    // Close on X button
    if (contactModalClose) {
      contactModalClose.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on outside click
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

});
/* ==========================================================================
   TRAVEL MEMORIES GALLERY LOGIC
   ========================================================================== */
window.swapGalleryImage = function(clickedElement, newImageSrc) {
  const mainImage = document.getElementById('tm-main-image');
  
  // Only animate if the image is actually changing
  if (mainImage && !mainImage.src.includes(newImageSrc)) {
    // 1. Add fade-out class
    mainImage.classList.add('fade-out');
    
    // 2. Wait for opacity transition (0.4s matching CSS)
    setTimeout(() => {
      // Swap source
      mainImage.src = newImageSrc;
      
      // Remove fade-out class to fade back in
      mainImage.classList.remove('fade-out');
    }, 400); // 400ms delay matches CSS transition duration
  }

  // 3. Update active thumbnail state
  const thumbs = document.querySelectorAll('.tm-thumb');
  thumbs.forEach(thumb => thumb.classList.remove('active-thumb'));
  clickedElement.classList.add('active-thumb');
};
