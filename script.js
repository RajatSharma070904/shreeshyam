// ==========================================================================
// SHREE SHYAM CREATIVE PORTFOLIO - CORE LOGIC & INTERACTIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const WA_BASE_URL = 'https://wha.life/luckey';

  // ------------------------------------------------------------------------
  // 1. STICKY HEADER & SCROLL BEHAVIOR
  // ------------------------------------------------------------------------
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ------------------------------------------------------------------------
  // 2. MOBILE MENU DRAWER
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. FILTERABLE PORTFOLIO SHOWCASE
  // ------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab styling
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter projects with micro-animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE CASE STUDY MODALS
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalContent = document.getElementById('modalDynamicContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');

  const caseStudiesData = {
    'modal-p1': {
      title: 'Cinematic Brand Narrative & DaVinci Color Grading',
      category: '🎬 Video & Motion Editing',
      badgeClass: 'badge-purple',
      image: 'images/portfolio-editing.jpg',
      challenge: 'The client had raw 4K Log footage that appeared flat and struggled with drop-offs within the first 10 seconds of view time.',
      solution: 'Conducted custom tone curve color grading in DaVinci Resolve, applied film grain emulation, and rebuilt the soundscape with binaural sound effects and acoustic risers.',
      tools: 'DaVinci Resolve Studio, Adobe Premiere Pro, iZotope RX',
      results: '1.4M+ Organic impressions with an exceptional 72% average retention rate and 4x increase in profile visits.',
      topic: 'Cinematic Video Editing'
    },
    'modal-p2': {
      title: 'Next-Gen SaaS Analytics Dashboard & High-Speed Web App',
      category: '💻 Web & Software Development',
      badgeClass: 'badge-cyan',
      image: 'images/portfolio-development.jpg',
      challenge: 'Existing legacy dashboard suffered from 3.8s load times, bloated packages, and broke on mobile tablet viewports.',
      solution: 'Re-engineered from scratch with Next.js and pure modular modern CSS, implemented instant server-side caching, dark glassmorphism UI, and SVG charts.',
      tools: 'Next.js, React, Node.js, WebSockets, REST APIs',
      results: 'Achieved a flawless 99 PageSpeed Mobile Score, reduced initial load time to 0.4 seconds, and boosted user session duration by 180%.',
      topic: 'Web Development Project'
    },
    'modal-p3': {
      title: 'Omni-Channel Customer Acquisition & Revenue Engine',
      category: '📈 Performance Marketing & Growth',
      badgeClass: 'badge-amber',
      image: 'images/portfolio-marketing.jpg',
      challenge: 'Client was experiencing declining ROAS (under 1.7x) on Meta Ads due to ad creative fatigue and poor landing page message matching.',
      solution: 'Created 15 rapid-iteration UGC and cinematic video variations, built a high-converting fast Lander, and deployed dynamic broad audience targeting.',
      tools: 'Meta Ads Manager, Google Ads, GA4, Hotjar, Figma',
      results: 'Achieved an all-time record 4.85x blended ROAS, generating over 12,000 qualified buyer leads with 38% reduction in acquisition cost.',
      topic: 'Performance Marketing'
    },
    'modal-p4': {
      title: 'High-Velocity Short Form Video Engine (Reels & Shorts)',
      category: '🎬 Viral Short-Form Video',
      badgeClass: 'badge-purple',
      image: 'images/shree-shyam-hero.jpg',
      challenge: 'A personal brand creator was stuck at 15K followers with irregular posting cadence and low engagement rates.',
      solution: 'Structured a 30-day viral short-form pipeline with psychological 1.5-second hooks, synchronized kinetic typography, sound layers, and color pops.',
      tools: 'CapCut Pro, Adobe After Effects, Audition',
      results: 'Generated 3.8M+ views across Instagram & YouTube Shorts, driving +45,000 new subscribers in under 45 days.',
      topic: 'Short-Form Reels Editing'
    },
    'modal-p5': {
      title: 'Ultra-Fast Brand Storefront with Instant WhatsApp Checkout',
      category: '💻 E-Commerce & Web Development',
      badgeClass: 'badge-cyan',
      image: 'images/portfolio-development.jpg',
      challenge: 'High cart abandonment rates on standard multistep e-commerce checkout funnels in the Indian and Asian markets.',
      solution: 'Designed and built a 1-tap WhatsApp checkout direct link with pre-populated order carts and instant notification routing.',
      tools: 'HTML5, Modern CSS3, JavaScript ES6+, Webhook Automation',
      results: 'Cart abandonment dropped by 54% and overall conversion rate climbed by +210% within the first two weeks.',
      topic: 'E-Commerce Website Dev'
    },
    'modal-p6': {
      title: 'Direct-Response Funnel Architecture & Retargeting Blitz',
      category: '📈 Performance Marketing',
      badgeClass: 'badge-amber',
      image: 'images/portfolio-marketing.jpg',
      challenge: 'Scaling an e-commerce brand for a festive seasonal blitz without eroding profit margins.',
      solution: 'Constructed an aggressive 3-stage funnel: Top of Funnel video hooks, Middle of Funnel customer proof carousels, and Bottom of Funnel urgency discounts.',
      tools: 'Meta Conversion API, Google Performance Max, Klaviyo',
      results: 'Generated ₹48 Lakhs ($58,000+) in confirmed sales across 14 days with zero ad budget wasted.',
      topic: 'Holiday Ad Campaign Scaling'
    }
  };

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = btn.getAttribute('data-modal');
      const data = caseStudiesData[modalId];

      if (data && modalBackdrop && modalContent) {
        modalContent.innerHTML = `
          <div class="modal-tag ${data.badgeClass}">${data.category}</div>
          <h3>${data.title}</h3>
          
          <div style="border-radius: 12px; overflow: hidden; margin-bottom: 20px; aspect-ratio: 16/9;">
            <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;" />
          </div>

          <div class="modal-section">
            <h4>The Challenge</h4>
            <p>${data.challenge}</p>
          </div>

          <div class="modal-section">
            <h4>The Solution &amp; Execution</h4>
            <p>${data.solution}</p>
          </div>

          <div class="modal-section">
            <h4>Tools &amp; Stack</h4>
            <p style="font-family: var(--font-mono); color: var(--accent-gold);">${data.tools}</p>
          </div>

          <div class="modal-section">
            <h4>Key Impact &amp; Results</h4>
            <p style="font-weight: 700; color: var(--text-primary);">${data.results}</p>
          </div>

          <div class="modal-actions">
            <a href="${WA_BASE_URL}?text=${encodeURIComponent('Hi Shree Shyam! I saw your case study: ' + data.title + '. I want something similar for my brand.')}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="btn primary full">
              💬 Discuss Similar Project on WhatsApp &rarr;
            </a>
          </div>
        `;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ------------------------------------------------------------------------
  // 5. INTERACTIVE PROJECT ESTIMATOR & SCOPE BUILDER
  // ------------------------------------------------------------------------
  const serviceBtns = document.querySelectorAll('#serviceOptions .est-btn');
  const scaleBtns = document.querySelectorAll('#scaleOptions .est-btn');
  const speedBtns = document.querySelectorAll('#speedOptions .est-btn');

  const specText = document.getElementById('estSpecText');
  const priceDisplay = document.getElementById('estPriceDisplay');
  const estWhatsAppTrigger = document.getElementById('estWhatsAppTrigger');

  let currentEst = {
    service: 'editing',
    serviceTitle: 'Video & Motion Editing',
    basePrice: 15000,
    scale: 'starter',
    scaleName: 'Starter / Individual',
    scaleMultiplier: 1.0,
    speed: 'standard',
    speedName: 'Standard (5-7 Days)',
    speedMultiplier: 1.0
  };

  function updateEstimator() {
    const rawPrice = Math.round(currentEst.basePrice * currentEst.scaleMultiplier * currentEst.speedMultiplier);
    const inrFormatted = rawPrice.toLocaleString('en-IN');
    const usdEstimate = Math.round(rawPrice / 83);

    if (specText) {
      specText.textContent = `${currentEst.serviceTitle} • ${currentEst.scaleName} • ${currentEst.speedName}`;
    }

    if (priceDisplay) {
      priceDisplay.textContent = `₹${inrFormatted} / $${usdEstimate}`;
    }

    if (estWhatsAppTrigger) {
      const waMsg = `Hi Shree Shyam! I configured my project scope on your portfolio website:
• Service: ${currentEst.serviceTitle}
• Scale: ${currentEst.scaleName}
• Delivery: ${currentEst.speedName}
• Ballpark Estimate: ₹${inrFormatted} ($${usdEstimate})
Can we discuss feasibility and get started?`;
      estWhatsAppTrigger.href = `${WA_BASE_URL}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEst.service = btn.getAttribute('data-service');
      currentEst.serviceTitle = btn.getAttribute('data-title');
      currentEst.basePrice = parseFloat(btn.getAttribute('data-base')) || 15000;
      updateEstimator();
    });
  });

  scaleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scaleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEst.scale = btn.getAttribute('data-scale');
      currentEst.scaleName = btn.getAttribute('data-scale-name');
      currentEst.scaleMultiplier = parseFloat(btn.getAttribute('data-multiplier')) || 1.0;
      updateEstimator();
    });
  });

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEst.speed = btn.getAttribute('data-speed');
      currentEst.speedName = btn.getAttribute('data-speed-name');
      currentEst.speedMultiplier = parseFloat(btn.getAttribute('data-multiplier')) || 1.0;
      updateEstimator();
    });
  });

  updateEstimator();

  // ------------------------------------------------------------------------
  // 6. CONTACT SECTION PRESET TOPIC BUTTONS
  // ------------------------------------------------------------------------
  const presetBtns = document.querySelectorAll('.preset-btn');
  const directConnectBtn = document.getElementById('directConnectBtn');

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => {
        b.style.borderColor = 'var(--border-light)';
        b.style.background = '#ffffff';
      });
      btn.style.borderColor = 'var(--accent-gold)';
      btn.style.background = '#fef3c7';

      const topic = btn.getAttribute('data-topic');
      if (directConnectBtn) {
        const msg = `Hi Shree Shyam! I would like to consult with you regarding ${topic} for my project.`;
        directConnectBtn.href = `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. FAQ ACCORDION INTERACTION
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 8. FLOATING WHATSAPP BUTTON SMOOTH ENTRANCE
  // ------------------------------------------------------------------------
  const floatingDock = document.getElementById('floatingDock');
  if (floatingDock) {
    floatingDock.style.opacity = '0';
    setTimeout(() => {
      floatingDock.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      floatingDock.style.opacity = '1';
    }, 200);
  }

});
