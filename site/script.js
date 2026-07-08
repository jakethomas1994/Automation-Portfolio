// Jake Thomas — portfolio interactions. Progressive enhancement: the site
// is fully readable with JS disabled; this just adds polish.

(function () {
  'use strict';

  // --- Current year in footer ---
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Theme toggle (respects system default, persists choice) ---
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}

  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // --- Mobile menu ---
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // --- Optional real images (portrait + app screenshots) ---
  // Elements with data-shot="path/base" get an <img> injected only if
  // path/base.jpg|.png|.webp actually exists — so the SVG illustrations
  // remain the fallback and there are never broken-image states.
  function probeImage(base, onFound) {
    var exts = ['.jpg', '.png', '.webp'];
    (function tryNext(i) {
      if (i >= exts.length) return;
      var probe = new Image();
      probe.onload = function () { onFound(base + exts[i]); };
      probe.onerror = function () { tryNext(i + 1); };
      probe.src = base + exts[i];
    })(0);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-shot]'), function (el) {
    probeImage(el.getAttribute('data-shot'), function (src) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = el.getAttribute('data-alt') || '';
      if (el.classList.contains('hero__portrait')) {
        el.appendChild(img);
        el.removeAttribute('hidden');
        var grid = el.closest('.hero__grid');
        if (grid) grid.classList.add('has-portrait');
      } else if (el.classList.contains('band__media')) {
        el.appendChild(img);
        el.removeAttribute('hidden');
        var band = el.closest('.band');
        if (band) band.classList.add('band--has-media');
      } else if (el.classList.contains('phone')) {
        img.className = 'phone__shot';
        el.appendChild(img);
      } else {
        img.className = 'tile__shot';
        el.appendChild(img);
      }
    });
  });

  var supportsIO = 'IntersectionObserver' in window;

  // --- Reveal on scroll ---
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (supportsIO && !reduceMotion && revealEls.length) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Reveal when any part enters the viewport — or if it was scrolled
        // past entirely (fast scrolls can skip intersection frames).
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: [0, 0.1], rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) {
      // Anything already above the fold at load time shows immediately.
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-visible');
      else revealer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // --- Active section highlight in nav ---
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (supportsIO && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
