/**
 * A1 A/C Service — Vanilla JavaScript Interactions
 * Domain: a1acservice.store | Phone: +12395178873
 * Vanilla JS — Zero dependencies, works locally offline & on hosting
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // -----------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -----------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  function openMobileNav() {
    document.body.classList.add('mobile-nav-open');
    if (mobileDrawer) mobileDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileNav() {
    document.body.classList.remove('mobile-nav-open');
    if (mobileDrawer) mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileNav);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileNav);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-open')) {
      closeMobileNav();
    }
  });

  // -----------------------------------------------------------------
  // 2. FAQ Accordion
  // -----------------------------------------------------------------
  const faqButtons = document.querySelectorAll('.faq-question-btn');

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-active');

      // Optional: Close others in the same accordion group
      const parentAccordion = item.closest('.faq-accordion');
      if (parentAccordion) {
        const allItems = parentAccordion.querySelectorAll('.faq-item');
        allItems.forEach(function (otherItem) {
          if (otherItem !== item && otherItem.classList.contains('is-active')) {
            otherItem.classList.remove('is-active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
            }
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-active');
        answer.style.maxHeight = null;
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -----------------------------------------------------------------
  // 3. Sticky Header Scroll Effect
  // -----------------------------------------------------------------
  const mainHeader = document.querySelector('.main-header');
  if (mainHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        mainHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
      } else {
        mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.07)';
      }
    }, { passive: true });
  }

  // -----------------------------------------------------------------
  // 4. Contact Form Handler (Client-side validation & feedback)
  // -----------------------------------------------------------------
  const contactForm = document.getElementById('contact-service-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const name = contactForm.querySelector('[name="name"]');
      const phone = contactForm.querySelector('[name="phone"]');
      const email = contactForm.querySelector('[name="email"]');
      const service = contactForm.querySelector('[name="service"]');
      const message = contactForm.querySelector('[name="message"]');

      if (!name.value.trim() || !phone.value.trim()) {
        alert('Please provide your name and phone number so our team can assist you.');
        return;
      }

      // Display clear, honest acknowledgment
      const successBox = document.getElementById('form-feedback');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.innerHTML = `
          <div style="background-color: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <strong>Thank you, ${name.value.trim()}!</strong><br>
            Your inquiry for <em>${service ? service.value : 'HVAC Service'}</em> has been prepared. For immediate dispatch or emergency service, please call our direct hotline at <a href="tel:+12395178873" style="color: #ea580c; font-weight: bold;">+12395178873</a>.
          </div>
        `;
        contactForm.reset();
      } else {
        alert('Thank you! For immediate 24/7 service, please call +12395178873.');
        contactForm.reset();
      }
    });
  }

  // -----------------------------------------------------------------
  // 5. Dual Compatibility Link Engine (file:// vs live http/https)
  // Ensures links work seamlessly whether opened directly offline
  // or hosted with clean URLs on Apache/Hostinger.
  // -----------------------------------------------------------------
  if (window.location.protocol === 'file:') {
    const internalLinks = document.querySelectorAll('a[href]');
    internalLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      // If href is a relative clean URL without extension or hash or scheme
      if (href && !href.includes(':') && !href.startsWith('#') && !href.endsWith('.html') && !href.includes('.')) {
        if (href === '/' || href === '') {
          link.setAttribute('href', 'index.html');
        } else {
          // Remove leading slash if present for local relative navigation
          const clean = href.startsWith('/') ? href.slice(1) : href;
          link.setAttribute('href', clean + '.html');
        }
      }
    });
  }
});
