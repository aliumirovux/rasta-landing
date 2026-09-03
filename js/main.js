/* Rasta landing — main.js
   Bitta joyda sozlanadi: Telegram havolasi. */
(function () {
  'use strict';

  // ---- Sozlamalar -------------------------------------------------------
  var TELEGRAM_URL = 'https://t.me/USERNAME'; // ← Telegram username'ni shu yerga yozing

  var html = document.documentElement;
  html.classList.add('js');

  // Telegram havolalari (data-tg)
  document.querySelectorAll('[data-tg]').forEach(function (a) {
    if (TELEGRAM_URL.indexOf('USERNAME') === -1) {
      a.setAttribute('href', TELEGRAM_URL);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    } else if (a.getAttribute('href') === '#') {
      a.setAttribute('href', '#boglanish');
    }
  });

  // Yil
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // ---- Reveal (IntersectionObserver) -----------------------------------
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var vh = window.innerHeight || html.clientHeight;
  // Birinchi kadrda koʻrinib turganlarni darhol ochamiz (flash boʻlmasin)
  reveals.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < vh * 0.95 && r.bottom > 0) el.classList.add('is-in');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Nav holati (scroll listener oʻrniga sentinel) ---------------------
  var nav = document.getElementById('nav');
  var sentinel = document.querySelector('.nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  // ---- Mobil menyu -------------------------------------------------------
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    html.style.overflow = open ? 'hidden' : '';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  // ---- Mobil sticky CTA: hero koʻrinmay qolganda chiqadi ----------------
  var sticky = document.getElementById('sticky');
  var heroCta = document.querySelector('.hero__cta');
  var contact = document.getElementById('boglanish');
  if (sticky && heroCta && 'IntersectionObserver' in window) {
    var heroVisible = true, contactVisible = false;
    function updateSticky() {
      var on = !heroVisible && !contactVisible;
      sticky.classList.toggle('is-on', on);
      sticky.setAttribute('aria-hidden', on ? 'false' : 'true');
      sticky.querySelector('a').tabIndex = on ? 0 : -1;
    }
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; updateSticky(); }, { threshold: 0 }).observe(heroCta);
    if (contact) new IntersectionObserver(function (en) { contactVisible = en[0].isIntersecting; updateSticky(); }, { threshold: 0.2 }).observe(contact);
  }

  // ---- FAQ: bittasi ochilsa, qolganlari yopiladi -----------------------
  var items = document.querySelectorAll('.faq__item');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d && o.open) o.open = false; });
    });
  });
})();
