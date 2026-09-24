(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(hover: none)').matches;

  /* ============================================================
     PROJECT DATA — one source of truth for both views
     ============================================================ */
  var PROJECTS = [
    {
      id: 'kue', featured: true, year: '2025',
      cat: 'Mobile app · Client work', title: 'Rumah Kue Hany',
      sub: "A Flutter app and companion static website for a cake business",
      tags: ['Flutter', 'Dart', 'HTML/CSS', 'WhatsApp'],
      desc: 'A website and companion Flutter app for a cake business in Kayuagung, OKI. Orders flow straight into WhatsApp with the cart pre-written, so the owner never had to learn a dashboard.',
      facts: [['Role', 'Sole developer & designer'], ['Year', '2025'], ['Stack', 'Flutter, Dart, static web']],
      bullets: ['Animated splash and multi-screen navigation shell', 'Filterable menu catalogue driven by a local JSON source', 'Deep-linked WhatsApp ordering with a formatted message'],
      links: [['Live demo', '#'], ['Source', '#']],
      kind: 'Shipped to a real business',
      note: 'The brief was one sentence: “people should be able to order without calling me.” Everything else followed from that.',
      ph: 'Replace with a 16:9 screenshot'
    },
    {
      id: 'deepfake', featured: true, year: '2026',
      cat: 'Computer vision · Full-stack', title: 'Deepfake Detector',
      sub: 'A React and Node.js frontend over a Python YOLO inference service, wrapped in a Flask API and orchestrated with docker-compose.',
      tags: ['React', 'Node.js', 'YOLO', 'Flask', 'Docker'],
      desc: 'A React and Node.js frontend over a Python YOLO inference service, wrapped in a Flask API and orchestrated with docker-compose so it runs identically on any machine.',
      facts: [['Role', 'Frontend + infrastructure'], ['Year', '2026'], ['Stack', 'React, Node, Python, Docker']],
      bullets: ['Flask wrapper turning model output into a stable JSON contract', 'Pinned OpenCV system libraries after silent import failures', 'Container healthchecks so compose waits for the model, not the port'],
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/DeepfakeDetectorWeb']],
      kind: 'Hardest debugging of the year',
      note: 'The model worked in a notebook and failed in a container. Two missing shared libraries and a curl-less base image were the whole story.',
      img: 'images/deepfake/deepfakeHome.png',
      ph: 'Replace with a 16:9 screenshot'
    },
    {
      id: 'earchive', featured: true, year: '2026',
      cat: 'Web app · Laravel', title: 'E-Archive',
      sub: 'A document archive with nested folders, multi-file upload, a soft-delete trash and public share links.',
      tags: ['Laravel 11', 'PHP', 'MySQL', 'Vanilla JS'],
      desc: 'A document archive with nested folders, multi-file upload, a soft-delete trash and public share links. No build step at all — the frontend is hand-written CSS and JS, because the target server has no Node.',
      facts: [['Role', 'Sole developer'], ['Year', '2026'], ['Stack', 'Laravel 11, MySQL, vanilla JS']],
      bullets: ['Recursive folder tree with breadcrumb navigation', 'Soft deletes with a restorable trash view', 'Signed public links with optional expiry'],
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/e-archive']],
      kind: 'Constraint-driven',
      note: "Dropping the build step wasn't nostalgia — it was the only way this could live on the hosting the client already pays for.",
      img: 'images/e-archive/e-archiveHome.jpeg',
      ph: 'Replace with a 16:9 screenshot'
    },
    {
      id: 'savings', featured: false, year: '2026',
      cat: 'Mobile app · Personal product', title: 'Waypoint',
      sub: 'Name a thing, name a weekly amount, and it tells you the finish date.',
      tags: ['Flutter', 'Dart', 'Flutter Web', 'Notifications'],
      desc: 'A cross-platform tracker built from scratch. Each goal holds a title, price, weekly saving amount, an optional deadline and a product link; the app derives weeks remaining and money still needed.',
      facts: [['Role', 'Sole developer'], ['Year', '2026'], ['Stack', 'Flutter (web + mobile)']],
      bullets: ['Single codebase running on web and Android', 'Daily local reminder scheduled per goal', 'Progress maths recalculated on every edit, never stored stale'],
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/waypoint']],
      kind: 'Built for myself first',
      note: 'Started as a spreadsheet. Became an app the moment I wanted the reminder on my phone rather than in a tab.',
      ph: 'Replace with a 16:9 screenshot'
    },
    {
      id: 'vanet', featured: false, year: '2026',
      cat: 'Research · Networking', title: 'VANET-NDN Caching',
      sub: 'What happens to content delivery when the routers are moving cars.',
      tags: ['NDN', 'VANET', 'Python', 'Simulation'],
      desc: 'A research paper on named-data networking in vehicular networks, analysing how in-network caching changes retrieval latency and redundant transmissions as topology churns.',
      facts: [['Role', 'Author'], ['Year', '2026'], ['Output', 'Paper + diagram set']],
      bullets: ['Topology diagrams built as clean vector figures', 'Annotated cache hit/miss flow illustrations', 'Comparison of caching strategies against hit ratio and latency'],
      links: [['Read the paper', '#'], ['Figures', '#']],
      kind: 'Academic work',
      note: 'Most of the effort went into the figures. A caching policy nobody can picture is a caching policy nobody adopts.',
      ph: 'Replace with a topology diagram'
    },
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function thumbHTML(p) {
    if (p.img) {
      return '<div class="thumb thumb--photo"><img src="' + esc(p.img) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy" /></div>';
    }
    return '<div class="thumb"><div class="frame"></div><div class="ph">Image placeholder<small>' + esc(p.ph) + '</small></div></div>';
  }

  function cardHTML(p) {
    return '' +
      '<div class="flip reveal" tabindex="0" role="group" aria-label="' + esc(p.title) + ' — flip for details">' +
      '<div class="flip-inner">' +
      '<div class="face face-front">' +
      thumbHTML(p) +
      '<div class="body">' +
      '<p class="cat">' + esc(p.cat) + '</p>' +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p class="sub">' + esc(p.sub) + '</p>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '</div>' +
      '<div class="face face-back">' +
      '<div class="body">' +
      '<p class="cat">Detail</p>' +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p class="desc">' + esc(p.desc) + '</p>' +
      '<dl class="facts">' + p.facts.map(function (f) { return '<dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd>'; }).join('') + '</dl>' +
      '<ul class="bullets">' + p.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
      '<div class="links">' + p.links.map(function (l) { return '<a href="' + esc(l[1]) + '">' + esc(l[0]) + ' <span>→</span></a>'; }).join('') + '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function itemHTML(p, i) {
    return '' +
      '<article class="item' + (i % 2 === 1 ? ' flip-side' : '') + '">' +
      '<div class="slot-card">' + cardHTML(p) + '</div>' +
      '<div class="marker" aria-hidden="true"></div>' +
      '<div class="slot-note"><div class="note reveal">' +
      '<p class="year">' + esc(p.year) + '</p>' +
      '<p class="kind">' + esc(p.kind) + '</p>' +
      '<p>' + esc(p.note) + '</p>' +
      '</div></div>' +
      '</article>';
  }

  /* Render both timelines */
  document.querySelectorAll('.timeline').forEach(function (tl) {
    var set = tl.getAttribute('data-projects') === 'featured'
      ? PROJECTS.filter(function (p) { return p.featured; })
      : PROJECTS;
    tl.insertAdjacentHTML('beforeend', set.map(itemHTML).join(''));
  });

  /* ============================================================
     FLIP INTERACTION
     ============================================================ */
  document.querySelectorAll('.flip').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (!coarse) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
      if (e.key === 'Escape') { card.classList.remove('flipped'); card.blur(); }
    });
  });

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  var io = null;
  if ('IntersectionObserver' in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: .2, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.item').forEach(function (i) { io.observe(i); });
  } else {
    document.querySelectorAll('.item').forEach(function (i) { i.classList.add('in-view'); });
  }

  /* ============================================================
     RAIL PROGRESS
     ============================================================ */
  var ticking = false;
  function drawRails() {
    ticking = false;
    document.querySelectorAll('.view.active .timeline').forEach(function (tl) {
      var fill = tl.querySelector('.rail-fill'); if (!fill) return;
      var r = tl.getBoundingClientRect();
      var progress = (window.innerHeight * 0.55 - r.top) / r.height;
      progress = Math.max(0, Math.min(1, progress));
      fill.style.height = (progress * r.height) + 'px';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(drawRails); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ============================================================
     ROUTER — #/ , #/projects , #/contact (bottom of home)
     ============================================================ */
  var views = { home: document.getElementById('view-home'), projects: document.getElementById('view-projects') };
  var navLinks = document.querySelectorAll('[data-nav]');

  function parseRoute() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    if (h.indexOf('projects') === 0) return 'projects';
    if (h.indexOf('contact') === 0) return 'contact';
    return 'home';
  }

  function render(route, instant) {
    var view = route === 'projects' ? 'projects' : 'home';
    Object.keys(views).forEach(function (k) { views[k].classList.toggle('active', k === view); });
    navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === route); });
    document.title = view === 'projects' ? 'Projects — Ahmad Hilmi Tamaam' : 'Ahmad Hilmi Tamaam — Full-Stack & Mobile Developer';

    if (route === 'contact') {
      var target = document.getElementById('contact');
      if (target) target.scrollIntoView({ behavior: (reduce || instant) ? 'auto' : 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: (reduce || instant) ? 'auto' : 'smooth' });
    }
    /* Newly shown items need their observer refreshed */
    requestAnimationFrame(function () {
      if (io) { document.querySelectorAll('.view.active .item:not(.in-view)').forEach(function (i) { io.observe(i); }); }
      drawRails();
    });
  }

  window.addEventListener('hashchange', function () { render(parseRoute(), false); });
  document.querySelectorAll('[data-link]').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  render(parseRoute(), true);

  /* ============================================================
     MENU / COPY / YEAR
     ============================================================ */
  var burger = document.getElementById('burger'), mnav = document.getElementById('mobileNav'),
    iOpen = document.getElementById('iOpen'), iClose = document.getElementById('iClose');
  function setMenu(open) {
    mnav.classList.toggle('open', open);
    iOpen.style.display = open ? 'none' : 'block';
    iClose.style.display = open ? 'block' : 'none';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!mnav.classList.contains('open')); });

  var toast = document.getElementById('toast'), timer;
  function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(timer); timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  document.querySelectorAll('.copy-email').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        showToast(ok ? 'Email copied' : 'Copy failed — the address is ' + email);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () { showToast('Email copied'); }).catch(fallback);
      } else { fallback(); }
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();