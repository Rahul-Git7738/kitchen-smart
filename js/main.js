/**
 * KITCHEN SMART INDIA - Main Vanilla JS Script
 * Powers layout switcher, material studio, 2026 collection, and interactive studio modals.
 */

const STORE_WHATSAPP = '919833493984';
const STORE_PHONE = '+91 98334 93984';


const COLLECTION_MODALS = {
  wutongvibe: {
    name: 'WutongVibe Series',
    award: "A' Design Award Bronze 2026 Winner",
    category: 'Award Winners',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    desc: 'Harmony of fluted natural timber, illuminated glass vitrines, and brushed champagne brass profiles. Recognized internationally by European design juries.',
    highlights: ['Acoustic fluted slats', 'Warm perimeter halo lighting', 'Motorized servo drawers', 'Blum® Austrian hinges standard']
  },
  urbanglow: {
    name: 'UrbanGlow Collection',
    award: 'Best Minimalist 2026',
    category: 'Modern Minimalist',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    desc: 'Ultra-refined handleless cabinetry in velvet-matte anthracite with hidden flush induction surfaces and integrated waterfall quartz cantilevers.',
    highlights: ['Beveled 45° J-pull doors', 'Matte zero-fingerprint finish', 'Seamless sink undermount', '10-Year Indian warranty']
  },
  zeroverge: {
    name: 'Zero Verge Monolith',
    award: 'New 2026 Release',
    category: 'Modern Minimalist',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
    desc: 'Seamless monolithic porcelain block island, hidden sliding prep covers, and recessed concealed cooktop burners.',
    highlights: ['Continuous porcelain vein match', 'Floating cantilever breakfast bar', 'Motorized pop-up sockets', 'Heat proof to 1200°C']
  },
  seville: {
    name: 'Seville Heritage',
    award: 'Classic Luxury',
    category: 'Classic Shaker',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    desc: 'Classic British shaker reinterpreted for luxury Indian villas and bungalows. Raised molding details, rich cashmere paint tones, and knurled antique brass hardware.',
    highlights: ['5-coat moisture-cure paint', 'Solid hardwood face frames', 'Hand-knurled brass pulls', 'Blum soft-close slides']
  },
  maha: {
    name: 'MAHA Orient Villa',
    award: 'Haute Living',
    category: 'Villa Luxury',
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=80',
    desc: 'Infused with subtle geometric arabesque screen inserts, rich smoked eucalyptus veneer, and bookmatched Statuario marble backsplashes.',
    highlights: ['Custom geometric vitrines', 'Smoked eucalyptus veneer', 'Integrated prep pantry', 'German Blum heavy-duty slides']
  },
  lumihaven: {
    name: 'LumiHaven Illuminata',
    award: 'Architectural Feature',
    category: 'Villa Luxury',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    desc: 'Featuring backlit translucent onyx worktops, soft mood glow sensors, and smoked bronze glass cabinetry with interior velvet lining.',
    highlights: ['Backlit translucent onyx', 'Interior LED shelf illumination', 'Dark smoked glass vitrines', '10-Year manufacturer warranty']
  }
};

function initKitchenSmartApp() {
  if (window.__KITCHEN_SMART_INITIALIZED__) return;
  window.__KITCHEN_SMART_INITIALIZED__ = true;

  // 0. Hero Section Swiper 11 Luxury Slider (Resilient polling initializer)
  function initHeroSlider() {
    const heroSwiperEl = document.querySelector('.hero-swiper');
    if (!heroSwiperEl) return;

    if (typeof Swiper === 'undefined') {
      let attempts = 0;
      const retryTimer = setInterval(() => {
        attempts++;
        if (typeof Swiper !== 'undefined') {
          clearInterval(retryTimer);
          initHeroSlider();
        } else if (attempts > 50) {
          clearInterval(retryTimer);
        }
      }, 50);
      return;
    }

    if (heroSwiperEl.classList.contains('swiper-initialized')) return;

    const heroCurrentSlide = document.getElementById('heroCurrentSlide');
    const heroProgressFill = document.getElementById('heroProgressFill');
    const heroPillBtns = document.querySelectorAll('.hero-pill-btn');
    const AUTOPLAY_TIME = 6000;

    let progressInterval = null;
    let progressStart = Date.now();

    function startProgress() {
      if (!heroProgressFill) return;
      if (progressInterval) clearInterval(progressInterval);
      progressStart = Date.now();
      heroProgressFill.style.transition = 'none';
      heroProgressFill.style.width = '0%';

      progressInterval = setInterval(() => {
        const elapsed = Date.now() - progressStart;
        const pct = Math.min((elapsed / AUTOPLAY_TIME) * 100, 100);
        heroProgressFill.style.width = pct + '%';
        if (pct >= 100) {
          clearInterval(progressInterval);
        }
      }, 50);
    }

    function resetProgress() {
      if (progressInterval) clearInterval(progressInterval);
      startProgress();
    }

    function updatePills(index) {
      heroPillBtns.forEach(btn => {
        const btnIndex = parseInt(btn.getAttribute('data-slide-index'), 10);
        btn.classList.toggle('active', btnIndex === index);
      });
    }

    function syncHeroSlideHeights() {
      const slides = heroSwiperEl.querySelectorAll('.hero-slide');
      if (!slides.length) return;
      let maxHeight = 0;
      slides.forEach(s => {
        s.style.minHeight = '82vh';
        s.style.height = 'auto';
        const h = s.offsetHeight;
        if (h > maxHeight) maxHeight = h;
      });
      if (maxHeight > 0) {
        slides.forEach(s => {
          s.style.height = maxHeight + 'px';
        });
        const wrapper = heroSwiperEl.querySelector('.swiper-wrapper');
        if (wrapper) {
          wrapper.style.height = maxHeight + 'px';
        }
      }
    }

    syncHeroSlideHeights();
    window.addEventListener('resize', syncHeroSlideHeights);

    let heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 1000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: AUTOPLAY_TIME,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '#heroNextBtn',
        prevEl: '#heroPrevBtn'
      },
      on: {
        init: function() {
          if (heroCurrentSlide) {
            heroCurrentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
          }
          updatePills(this.realIndex);
          syncHeroSlideHeights();
          startProgress();
        },
        slideChange: function() {
          if (heroCurrentSlide) {
            heroCurrentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
          }
          updatePills(this.realIndex);
          syncHeroSlideHeights();
          resetProgress();
        }
      }
    });

    // Pill Button Click Navigation
    heroPillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-slide-index'), 10);
        if (!isNaN(idx) && heroSwiper) {
          heroSwiper.slideToLoop(idx);
        }
      });
    });

    // Hover pauses progress
    heroSwiperEl.addEventListener('mouseenter', () => {
      if (progressInterval) clearInterval(progressInterval);
    });
    heroSwiperEl.addEventListener('mouseleave', () => {
      resetProgress();
    });
  }

  initHeroSlider();

  // 0b. Google Reviews Swiper Slider
  function initReviewsSlider() {
    const reviewsSwiperEl = document.querySelector('.reviews-swiper');
    if (!reviewsSwiperEl) return;

    if (typeof Swiper === 'undefined') {
      let attempts = 0;
      const retryTimer = setInterval(() => {
        attempts++;
        if (typeof Swiper !== 'undefined') {
          clearInterval(retryTimer);
          initReviewsSlider();
        } else if (attempts > 50) {
          clearInterval(retryTimer);
        }
      }, 50);
      return;
    }

    if (reviewsSwiperEl.classList.contains('swiper-initialized')) return;

    new Swiper('.reviews-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 650,
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.reviews-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.reviews-next-btn',
        prevEl: '.reviews-prev-btn',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.25,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 28,
        }
      }
    });
  }

  initReviewsSlider();

  // 1. Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar-luxury');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Materials Studio Category Tabs
  const matCategoryTabs = document.querySelectorAll('.mat-tab-btn');
  const matPanels = {
    cabinets: document.getElementById('mat-panel-cabinets'),
    countertops: document.getElementById('mat-panel-countertops'),
    hardware: document.getElementById('mat-panel-hardware')
  };

  matCategoryTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      matCategoryTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      Object.keys(matPanels).forEach(key => {
        if (matPanels[key]) {
          matPanels[key].classList.toggle('d-none', key !== cat);
        }
      });
    });
  });

  // Material Studio Live Pairing Preview
  let currentPairingCabinet = 'Bespoke PU Painted Shaker';
  let currentPairingCabinetFinish = 'Smooth Polyurethane Matte / Satin';
  let currentPairingCountertop = 'Calacatta Gold Engineered Quartz';

  const pairTitle = document.getElementById('pair-title');
  const pairDesc = document.getElementById('pair-desc');
  const pairCabinetLabel = document.getElementById('pair-cabinet-label');
  const pairCountertopLabel = document.getElementById('pair-countertop-label');
  const pairWaBtn = document.getElementById('pair-wa-btn');

  function updatePairingUI() {
    if (pairTitle) {
      pairTitle.textContent = `${currentPairingCabinet} + ${currentPairingCountertop}`;
    }
    if (pairDesc) {
      pairDesc.innerHTML = `A bespoke architectural pairing combining the rich texture of <strong>${currentPairingCabinetFinish}</strong> with the high-durability performance of <strong>${currentPairingCountertop}</strong>. Ideal for luxury Indian residences.`;
    }
    if (pairCabinetLabel) pairCabinetLabel.textContent = `Cabinet: ${currentPairingCabinet}`;
    if (pairCountertopLabel) pairCountertopLabel.textContent = `Slab: ${currentPairingCountertop}`;
    if (pairWaBtn) {
      const msg = encodeURIComponent(
        `Hi Kitchen Smart India! I love the pairing of ${currentPairingCabinet} with ${currentPairingCountertop}. Please send me material swatches.`
      );
      pairWaBtn.href = `https://wa.me/${STORE_WHATSAPP}?text=${msg}`;
    }
  }

  document.querySelectorAll('.cabinet-card-pick').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cabinet-card-pick').forEach(c => c.classList.remove('selected-active'));
      card.classList.add('selected-active');
      currentPairingCabinet = card.getAttribute('data-name');
      currentPairingCabinetFinish = card.getAttribute('data-finish');
      updatePairingUI();
    });
  });

  document.querySelectorAll('.countertop-card-pick').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.countertop-card-pick').forEach(c => c.classList.remove('selected-active'));
      card.classList.add('selected-active');
      currentPairingCountertop = card.getAttribute('data-name');
      updatePairingUI();
    });
  });

  // 4. 2026 Collection Filter & Modal Lightbox
  const collectionFilterBtns = document.querySelectorAll('.filter-btn-pill');
  const collectionCards = document.querySelectorAll('.collection-item-card');

  collectionFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      collectionFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      collectionCards.forEach(card => {
        if (cat === 'All' || card.getAttribute('data-category') === cat) {
          card.classList.remove('d-none');
        } else {
          card.classList.add('d-none');
        }
      });
    });
  });

  // Modal Open Handlers for Collection
  window.openCollectionModal = function(id) {
    const item = COLLECTION_MODALS[id];
    if (!item) return;

    document.getElementById('collection-modal-img').src = item.image;
    document.getElementById('collection-modal-award').textContent = item.award;
    document.getElementById('collection-modal-category').textContent = item.category;
    document.getElementById('collection-modal-title').textContent = item.name;
    document.getElementById('collection-modal-desc').textContent = item.desc;

    const highlightsList = document.getElementById('collection-modal-highlights');
    if (highlightsList) {
      highlightsList.innerHTML = item.highlights
        .map(h => `<li><span class="text-gold me-2">✓</span><span>${h}</span></li>`)
        .join('');
    }

    const waBtn = document.getElementById('collection-modal-wa-btn');
    if (waBtn) {
      const msg = encodeURIComponent(
        `Hi Kitchen Smart India! I'm interested in the ${item.name} (${item.award}). Please send me full specifications and 3D renders.`
      );
      waBtn.href = `https://wa.me/${STORE_WHATSAPP}?text=${msg}`;
    }

    const modal = new bootstrap.Modal(document.getElementById('collectionDetailModal'));
    modal.show();
  };

  // 5. Consultation Booking Form Submission
  const bookingForm = document.getElementById('consultationBookingForm');
  const bookingSuccess = document.getElementById('consultationBookingSuccess');

  if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name').value;
      const phone = document.getElementById('book-phone').value;
      const community = document.getElementById('book-community').value;
      const propType = document.getElementById('book-property-type').value;
      const service = document.getElementById('book-service').value;

      document.getElementById('success-user-name').textContent = name;
      document.getElementById('success-user-phone').textContent = `+91 ${phone}`;
      document.getElementById('success-user-community').textContent = community;

      const directWa = document.getElementById('success-wa-link');
      if (directWa) {
        const msg = encodeURIComponent(
          `Hi Kitchen Smart India! I booked a consultation:\n- Name: ${name}\n- Phone: +91 ${phone}\n- City/Locality: ${community}\n- Property: ${propType}\n- Request: ${service}`
        );
        directWa.href = `https://wa.me/${STORE_WHATSAPP}?text=${msg}`;
      }

      bookingForm.classList.add('d-none');
      bookingSuccess.classList.remove('d-none');
    });
  }

  // 6. Instagram Reel Floating Mini-Player & Modal Controller
  const reelWidget = document.getElementById('floatingReelWidget');
  const floatingVideo = document.getElementById('floatingReelVideo');
  const btnMinimize = document.getElementById('reelBtnMinimize');
  const btnClose = document.getElementById('reelBtnClose');
  const btnExpand = document.getElementById('reelBtnExpand');
  const badgeRestore = document.getElementById('reelMinimizedBadge');

  const reelModal = document.getElementById('instagramReelModal');
  const modalVideo = document.getElementById('instagramNativeVideo');
  const modalIframe = document.getElementById('instagramReelIframe');
  const videoWrap = document.getElementById('reelModalVideoWrap');
  const iframeWrap = document.getElementById('reelModalIframeWrap');
  const tabVideoBtn = document.getElementById('reelTabVideoBtn');
  const tabEmbedBtn = document.getElementById('reelTabEmbedBtn');
  const closeReelBtn = document.getElementById('closeReelModalBtn');

  const REEL_EMBED_URL = 'https://www.instagram.com/reel/DSflwGggnD0/embed/';

  window.switchReelTab = function (tab) {
    if (tab === 'video') {
      if (tabVideoBtn) tabVideoBtn.classList.add('active');
      if (tabEmbedBtn) tabEmbedBtn.classList.remove('active');
      if (videoWrap) videoWrap.classList.remove('d-none');
      if (iframeWrap) iframeWrap.classList.add('d-none');
      if (modalVideo) {
        modalVideo.play().catch(() => {});
      }
    } else {
      if (tabEmbedBtn) tabEmbedBtn.classList.add('active');
      if (tabVideoBtn) tabVideoBtn.classList.remove('active');
      if (videoWrap) videoWrap.classList.add('d-none');
      if (iframeWrap) iframeWrap.classList.remove('d-none');
      if (modalVideo) {
        modalVideo.pause();
      }
      if (modalIframe && (!modalIframe.src || modalIframe.src === 'about:blank')) {
        modalIframe.src = REEL_EMBED_URL;
      }
    }
  };

  // Minimize action: shrinks window down to compact floating pill
  if (btnMinimize && reelWidget) {
    btnMinimize.addEventListener('click', (e) => {
      e.stopPropagation();
      reelWidget.classList.add('is-minimized');
      if (floatingVideo) floatingVideo.pause();
      try {
        sessionStorage.setItem('ks_reel_minimized', '1');
      } catch (err) {}
    });
  }

  // Restore action: expands pill back to playing small window
  if (badgeRestore && reelWidget) {
    badgeRestore.addEventListener('click', (e) => {
      e.stopPropagation();
      reelWidget.classList.remove('is-minimized');
      reelWidget.classList.remove('is-hidden');
      try {
        sessionStorage.removeItem('ks_reel_minimized');
      } catch (err) {}
      if (floatingVideo) {
        floatingVideo.play().catch(() => {});
      }
    });
  }

  // Close action: completely hides widget & terminates playback
  if (btnClose && reelWidget) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      reelWidget.classList.add('is-hidden');
      if (floatingVideo) {
        floatingVideo.pause();
      }
      try {
        sessionStorage.setItem('ks_reel_closed', '1');
      } catch (err) {}
    });
  }

  // Expand action: opens the large centered modal dialog
  if (btnExpand) {
    btnExpand.addEventListener('click', (e) => {
      e.stopPropagation();
      openModalView();
    });
  }

  function openModalView() {
    // Reset to native video tab by default for instant smooth playback
    window.switchReelTab('video');
    if (floatingVideo) {
      floatingVideo.pause();
    }
    if (modalVideo) {
      modalVideo.currentTime = 0;
      modalVideo.play().catch(() => {});
    }
    if (reelModal && typeof bootstrap !== 'undefined') {
      const modal = bootstrap.Modal.getOrCreateInstance(reelModal);
      modal.show();
    }
  }

  function stopModalIframe() {
    if (modalVideo) {
      modalVideo.pause();
    }
    if (modalIframe) {
      modalIframe.src = '';
    }
  }

  if (reelModal) {
    reelModal.addEventListener('hidden.bs.modal', stopModalIframe);
  }

  if (closeReelBtn) {
    closeReelBtn.addEventListener('click', stopModalIframe);
  }

  // Global window functions for inline onclick handlers
  window.minimizeReelWidget = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (reelWidget) {
      reelWidget.classList.add('is-minimized');
      if (floatingVideo) floatingVideo.pause();
      try { sessionStorage.setItem('ks_reel_minimized', '1'); } catch (err) {}
    }
  };

  window.restoreReelWidget = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (reelWidget) {
      reelWidget.classList.remove('is-minimized');
      reelWidget.classList.remove('is-hidden');
      try { sessionStorage.removeItem('ks_reel_minimized'); } catch (err) {}
      if (floatingVideo) {
        floatingVideo.play().catch(() => {});
      }
    }
  };

  window.closeReelWidget = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (reelWidget) {
      reelWidget.classList.add('is-hidden');
      if (floatingVideo) floatingVideo.pause();
      try { sessionStorage.setItem('ks_reel_closed', '1'); } catch (err) {}
    }
  };

  window.expandReelWidget = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    openModalView();
  };

  // Global trigger for CTA buttons across the page
  window.openInstagramReel = function () {
    openModalView();
  };

  // Helper to normalize any media path to a clean relative URL
  function resolveMediaSrc(src) {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
    return src.replace(/^\/+/, '');
  }

  // ==========================================================================
  // 5. MODERN ANIMATED GALLERY & VIDEO LIGHTBOX CONTROLLER (215+ REAL ITEMS)
  // ==========================================================================
  function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    let rawData = window.KITCHEN_SMART_GALLERY || [];
    if (!rawData.length) {
      // 1. Polling fallback if manifest script is still resolving
      let pollCount = 0;
      const pollTimer = setInterval(() => {
        pollCount++;
        if (window.KITCHEN_SMART_GALLERY && window.KITCHEN_SMART_GALLERY.length) {
          clearInterval(pollTimer);
          initGallery();
        } else if (pollCount > 25) {
          clearInterval(pollTimer);
        }
      }, 80);

      // 2. Async fetch fallback for http/https environments if script tag was delayed
      if (window.location.protocol.startsWith('http')) {
        fetch('gallery/gallery-data.json')
          .catch(() => fetch('public/gallery/gallery-data.json'))
          .then(res => res && res.ok ? res.json() : null)
          .then(data => {
            if (data && data.length) {
              window.KITCHEN_SMART_GALLERY = data;
              initGallery();
            }
          })
          .catch(() => {});
      }
      return;
    }

    let currentCategory = 'all';
    let searchQuery = '';
    let displayedCount = 16;
    const batchSize = 16;

    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const searchInput = document.getElementById('gallerySearchInput');
    const loadMoreBtn = document.getElementById('galleryLoadMoreBtn');
    const viewAllBtn = document.getElementById('galleryViewAllBtn');
    const loadMoreContainer = document.getElementById('galleryLoadMoreContainer');
    const progressFill = document.getElementById('galleryProgressFill');
    const progressText = document.getElementById('galleryProgressText');
    const videoSpotlightScroll = document.getElementById('videoSpotlightScroll');

    // Lightbox modal elements
    const lightboxModalEl = document.getElementById('galleryLightboxModal');
    const lightboxModal = lightboxModalEl && typeof bootstrap !== 'undefined'
      ? bootstrap.Modal.getOrCreateInstance(lightboxModalEl)
      : null;
    const lightboxStage = document.getElementById('lightboxStage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxWaBtn = document.getElementById('lightboxWaBtn');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    let currentFilteredList = [];
    let currentLightboxIndex = 0;

    // 1. Render Video Spotlight Reel (Top 11 walkthrough videos) with ultra-fast poster images
    const videoItems = rawData.filter(item => item.type === 'video');
    if (videoSpotlightScroll && videoItems.length > 0) {
      videoSpotlightScroll.innerHTML = videoItems.map((v, i) => {
        const posterSrc = resolveMediaSrc(v.poster || `gallery/images/kitchen-smart-project-${String(i + 1).padStart(3, '0')}.jpeg`);
        return `
        <div class="video-spotlight-item" data-id="${v.id}">
          <div class="video-spotlight-preview">
            <img src="${posterSrc}" alt="${v.title}" loading="lazy" decoding="async" class="video-spotlight-poster" width="280" height="180">
            <div class="video-play-pulse-btn"><i class="bi bi-play-fill"></i></div>
            <span class="position-absolute top-0 end-0 m-2 badge bg-danger text-white small" style="font-size:0.68rem; z-index:3;">Video Tour #${i + 1}</span>
          </div>
          <div class="p-3">
            <h5 class="text-white small fw-bold mb-1 text-truncate">${v.title}</h5>
            <span class="text-gold" style="font-size:0.75rem;"><i class="bi bi-play-circle me-1"></i> Watch Walkthrough</span>
          </div>
        </div>
      `;
      }).join('');

      videoSpotlightScroll.querySelectorAll('.video-spotlight-item').forEach(el => {
        el.addEventListener('click', () => {
          const id = el.getAttribute('data-id');
          openLightboxById(id);
        });
      });
    }

    // 2. Compute category counts and update filter badges
    const counts = {
      all: rawData.length,
      video: rawData.filter(i => i.type === 'video').length,
      kitchen: rawData.filter(i => i.category === 'kitchen').length,
      wardrobe: rawData.filter(i => i.category === 'wardrobe').length,
      details: rawData.filter(i => i.category === 'details').length
    };

    filterBtns.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      const countEl = btn.querySelector('.gallery-filter-count');
      if (countEl && counts[cat] !== undefined) {
        countEl.textContent = counts[cat];
      }

      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = cat;
        displayedCount = 16;
        renderGrid();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        displayedCount = 16;
        renderGrid();
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        displayedCount += batchSize;
        renderGrid(true);
      });
    }

    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        displayedCount = currentFilteredList.length;
        renderGrid(false);
      });
    }

    function getFilteredItems() {
      return rawData.filter(item => {
        const matchesCategory = currentCategory === 'all'
          ? true
          : (currentCategory === 'video' ? item.type === 'video' : item.category === currentCategory);

        const matchesSearch = !searchQuery
          ? true
          : (item.title.toLowerCase().includes(searchQuery) ||
             item.categoryLabel.toLowerCase().includes(searchQuery) ||
             (item.badge && item.badge.toLowerCase().includes(searchQuery)));

        return matchesCategory && matchesSearch;
      });
    }

    function buildCardHtml(item, index) {
      const isVideo = item.type === 'video';
      const tagClass = isVideo ? 'badge-video' : (item.category === 'wardrobe' ? 'badge-wardrobe' : (item.category === 'details' ? 'badge-details' : 'badge-kitchen'));
      const tagIcon = isVideo ? '<i class="bi bi-play-circle-fill me-1"></i> Video Tour' : `<i class="bi bi-image me-1"></i> ${item.categoryLabel}`;
      const cleanSrc = resolveMediaSrc(item.src);
      const posterSrc = isVideo
        ? resolveMediaSrc(item.poster || `gallery/images/kitchen-smart-project-${String((index % 11) + 1).padStart(3, '0')}.jpeg`)
        : cleanSrc;

      return `
        <div class="col-sm-6 col-md-4 col-lg-3 gallery-item-anim" style="animation-delay: ${(index % 8) * 0.03}s">
          <div class="gallery-card" data-gallery-index="${index}" data-id="${item.id}">
            <div class="gallery-thumb-wrap">
              <img src="${posterSrc}" alt="${item.title}" loading="lazy" decoding="async" width="400" height="240" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='public/'+this.getAttribute('src');}">
              <span class="gallery-type-tag ${tagClass}">
                ${tagIcon}
              </span>
              <div class="gallery-overlay">
                <div class="gallery-zoom-badge">
                  <i class="bi ${isVideo ? 'bi-play-fill fs-3' : 'bi-arrows-fullscreen'}"></i>
                </div>
              </div>
            </div>
            <div class="gallery-card-body">
              <h4 class="gallery-card-title">${item.title}</h4>
              <div class="gallery-card-meta">
                <span><i class="bi bi-geo-alt text-gold me-1"></i> Mumbai</span>
                <span class="text-gold fw-semibold">${isVideo ? 'Play Video' : 'View Design'} <i class="bi bi-arrow-right"></i></span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function bindCardClicks(container) {
      container.querySelectorAll('.gallery-card:not([data-bound="1"])').forEach(card => {
        card.setAttribute('data-bound', '1');
        card.addEventListener('click', () => {
          const idx = parseInt(card.getAttribute('data-gallery-index'), 10);
          openLightboxByIndex(idx);
        });
      });
    }

    function renderGrid(isAppended = false) {
      currentFilteredList = getFilteredItems();
      const total = currentFilteredList.length;
      const visibleItems = currentFilteredList.slice(0, displayedCount);

      if (total === 0) {
        galleryGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-search text-gold display-4 mb-3 d-block"></i>
            <h4 class="text-dark">No gallery items match "${searchQuery}"</h4>
            <p class="text-muted-ks">Try another search term or click "All Media".</p>
          </div>
        `;
        if (loadMoreContainer) loadMoreContainer.classList.add('d-none');
        return;
      }

      if (isAppended) {
        const existingCount = galleryGrid.querySelectorAll('.gallery-card').length;
        const newItems = visibleItems.slice(existingCount);
        const newHtml = newItems.map((item, relIndex) => buildCardHtml(item, existingCount + relIndex)).join('');
        galleryGrid.insertAdjacentHTML('beforeend', newHtml);
      } else {
        galleryGrid.innerHTML = visibleItems.map((item, index) => buildCardHtml(item, index)).join('');
      }

      bindCardClicks(galleryGrid);

      // Update progress & button states
      const shown = Math.min(displayedCount, total);
      if (progressText) {
        progressText.textContent = `Showing ${shown} of ${total} projects`;
      }
      if (progressFill) {
        const pct = Math.round((shown / total) * 100);
        progressFill.style.width = pct + '%';
      }

      if (loadMoreContainer) {
        if (shown >= total) {
          loadMoreContainer.classList.add('d-none');
        } else {
          loadMoreContainer.classList.remove('d-none');
          if (loadMoreBtn) {
            const remaining = total - shown;
            const nextBatch = Math.min(remaining, batchSize);
            loadMoreBtn.innerHTML = `<i class="bi bi-plus-circle"></i> Load More Projects (${nextBatch} More)`;
          }
        }
      }
    }

    function openLightboxById(id) {
      const idx = currentFilteredList.findIndex(item => item.id === id);
      if (idx !== -1) {
        openLightboxByIndex(idx);
      } else {
        const rawIdx = rawData.findIndex(item => item.id === id);
        if (rawIdx !== -1) {
          currentFilteredList = rawData;
          openLightboxByIndex(rawIdx);
        }
      }
    }

    function openLightboxByIndex(index) {
      if (!currentFilteredList.length) return;
      if (index < 0) index = currentFilteredList.length - 1;
      if (index >= currentFilteredList.length) index = 0;
      currentLightboxIndex = index;

      const item = currentFilteredList[index];
      if (!item) return;

      const cleanSrc = resolveMediaSrc(item.src);

      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCategory) lightboxCategory.textContent = item.categoryLabel;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${currentFilteredList.length}`;

      if (lightboxStage) {
        if (item.type === 'video') {
          const posterSrc = resolveMediaSrc(item.poster || '');
          lightboxStage.innerHTML = `
            <video src="${cleanSrc}" controls autoplay playsinline preload="auto" poster="${posterSrc}" style="max-width: 100%; max-height: 70vh;">
              Your browser does not support the video tag.
            </video>
          `;
        } else {
          lightboxStage.innerHTML = `
            <img src="${cleanSrc}" alt="${item.title}" style="max-width: 100%; max-height: 70vh; object-fit: contain;" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='public/'+this.getAttribute('src');}">
          `;
        }
      }

      if (lightboxWaBtn) {
        const msg = encodeURIComponent(
          `Hi Kitchen Smart India! I saw this project in your gallery and loved the design:\n"${item.title}" (${cleanSrc})\nPlease provide an estimate and material details.`
        );
        lightboxWaBtn.href = `https://wa.me/${STORE_WHATSAPP}?text=${msg}`;
      }

      if (lightboxModal) {
        lightboxModal.show();
      }
    }

    if (lightboxPrevBtn) {
      lightboxPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightboxByIndex(currentLightboxIndex - 1);
      });
    }

    if (lightboxNextBtn) {
      lightboxNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightboxByIndex(currentLightboxIndex + 1);
      });
    }

    // Pause video when modal is closed
    if (lightboxModalEl) {
      lightboxModalEl.addEventListener('hidden.bs.modal', () => {
        if (lightboxStage) {
          const video = lightboxStage.querySelector('video');
          if (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
          }
          lightboxStage.innerHTML = '';
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxModalEl || !lightboxModalEl.classList.contains('show')) return;
      if (e.key === 'ArrowLeft') {
        openLightboxByIndex(currentLightboxIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openLightboxByIndex(currentLightboxIndex + 1);
      }
    });

    // Initial render
    renderGrid();
  }

  // Initialize Gallery
  initGallery();
}

// Auto-run when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKitchenSmartApp);
} else {
  initKitchenSmartApp();
}


