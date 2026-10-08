(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  requestAnimationFrame(function () { root.classList.add('ready'); });


  /* Marquees: repeat the items until one group is wider than the screen,
     then double the group so the -50% loop never shows a gap */
  d.querySelectorAll('.mq div').forEach(function (m) {
    var base = m.innerHTML, w = Math.max(screen.width, innerWidth) * 1.2, guard = 0;
    while (m.offsetWidth < w && guard++ < 30) m.innerHTML += base;
    m.innerHTML += m.innerHTML;
  });

  /* Mobile menu */
  var burger = d.getElementById('burger'), open = false;
  function setMenu(o) {
    open = o; root.classList.toggle('menu-open', o);
    burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    d.body.style.overflow = o ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!open); });
  d.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Scroll progress + hide header on scroll down */
  var bar = d.getElementById('bar'), head = d.getElementById('head'), lastY = 0, busy = false;
  function onScroll() {
    var y = scrollY, h = root.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    head.classList.toggle('hide', y > lastY && y > 240 && !open);
    lastY = y; busy = false;
  }
  addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* Reveal on scroll */
  var items = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Project hover preview that trails the cursor */
  var list = d.getElementById('list'), pv = d.getElementById('pv');
  if (list && pv && fine && !rm) {
    var img = pv.querySelector('img'), label = pv.querySelector('span');
    var tx = 0, ty = 0, cx = 0, cy = 0, on = false;
    function loop() {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      pv.style.transform = 'translate3d(' + (cx + 40) + 'px,' + (cy - 60) + 'px,0)';
      if (on) requestAnimationFrame(loop);
    }
    list.querySelectorAll('.row').forEach(function (row) {
      row.addEventListener('mouseenter', function (e) {
        var src = row.getAttribute('data-img');
        pv.style.background = row.getAttribute('data-c') || '#e8e8e8';
        img.style.display = src ? 'block' : 'none';
        if (src) img.src = src;
        label.textContent = src ? '' : row.querySelector('h3').firstChild.textContent;
        tx = cx = e.clientX; ty = cy = e.clientY;
        list.classList.add('hov'); pv.classList.add('show');
        if (!on) { on = true; loop(); }
      });
      row.addEventListener('mouseleave', function () {
        list.classList.remove('hov'); pv.classList.remove('show'); on = false;
      });
    });
    list.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
  }

  /* Copy email */
  var copy = d.querySelector('.copy-email');
  if (copy) copy.addEventListener('click', function () {
    var mail = copy.getAttribute('data-email'), txt = copy.textContent;
    function done(ok) { copy.textContent = ok ? 'Copied ✓' : mail; setTimeout(function () { copy.textContent = txt; }, 1800); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(mail).then(function () { done(true); }, function () { done(false); });
    else done(false);
  });

})();