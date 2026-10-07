(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     PROJECT DATA — rendered into the existing .project-card markup
     ============================================================ */
  var PROJECTS = [
    {
      year: '2025', cat: 'Mobile app · Client work', title: 'Rumah Kue Hany',
      sub: 'A Flutter app and companion static website for a cake business',
      tags: ['Flutter', 'Dart', 'HTML/CSS', 'WhatsApp'],
      desc: 'A website and companion Flutter app for a cake business in Kayuagung, OKI. Orders flow straight into WhatsApp with the cart pre-written, so the owner never had to learn a dashboard.',
      links: [['Live demo', '#'], ['Source', '#']],
      kind: 'Shipped to a real business',
      note: 'The brief was one sentence: “people should be able to order without calling me.” Everything else followed from that.',
      ph: 'Add a 16:9 screenshot'
    },
    {
      year: '2026', cat: 'Computer vision · Full-stack', title: 'Deepfake Detector',
      sub: 'A React and Node.js frontend over a Python YOLO inference service, wrapped in a Flask API.',
      tags: ['React', 'Node.js', 'YOLO', 'Flask', 'Docker'],
      desc: 'A React and Node.js frontend over a Python YOLO inference service, wrapped in a Flask API and orchestrated with docker-compose so it runs identically on any machine.',
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/DeepfakeDetectorWeb']],
      kind: 'Hardest debugging of the year',
      note: 'The model worked in a notebook and failed in a container. Two missing shared libraries and a curl-less base image were the whole story.',
      img: 'images/deepfake/deepfakeHome.png'
    },
    {
      year: '2026', cat: 'Web app · Laravel', title: 'E-Archive',
      sub: 'A document archive with nested folders, multi-file upload, a soft-delete trash and public share links.',
      tags: ['Laravel 11', 'PHP', 'MySQL', 'Vanilla JS'],
      desc: 'A document archive with nested folders, multi-file upload, a soft-delete trash and public share links. No build step at all — the frontend is hand-written CSS and JS, because the target server has no Node.',
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/e-archive']],
      kind: 'Constraint-driven',
      note: "Dropping the build step wasn't nostalgia — it was the only way this could live on the hosting the client already pays for.",
      img: 'images/e-archive/e-archiveHome.jpeg'
    },
    {
      year: '2026', cat: 'Mobile app · Personal product', title: 'Waypoint',
      sub: 'Name a thing, name a weekly amount, and it tells you the finish date.',
      tags: ['Flutter', 'Dart', 'Flutter Web', 'Notifications'],
      desc: 'A cross-platform tracker built from scratch. Each goal holds a title, price, weekly saving amount, an optional deadline and a product link; the app derives weeks remaining and money still needed.',
      links: [['Live demo', '#'], ['Source', 'https://github.com/Hilmee15/waypoint']],
      kind: 'Built for myself first',
      note: 'Started as a spreadsheet. Became an app the moment I wanted the reminder on my phone rather than in a tab.',
      ph: 'Add a 16:9 screenshot'
    },
    {
      year: '2026', cat: 'Research · Networking', title: 'VANET-NDN Caching',
      sub: 'What happens to content delivery when the routers are moving cars.',
      tags: ['NDN', 'VANET', 'Python', 'Simulation'],
      desc: 'A research paper on named-data networking in vehicular networks, analysing how in-network caching changes retrieval latency and redundant transmissions as topology churns.',
      links: [['Read the paper', '#'], ['Figures', '#']],
      kind: 'Academic work',
      note: 'Most of the effort went into the figures. A caching policy nobody can picture is a caching policy nobody adopts.',
      ph: 'Add a topology diagram'
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function linkHTML(l) {
    var external = /^https?:/.test(l[1]);
    return '<a href="' + esc(l[1]) + '"' + (external ? ' target="_blank" rel="noreferrer"' : '') + '>' +
      esc(l[0]) + ' <span>→</span></a>';
  }

  function cardHTML(p) {
    var media = p.img
      ? '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy" />'
      : '<div class="project-placeholder">' + esc(p.cat.split(' · ')[0]) + '<small>' + esc(p.ph || '') + '</small></div>';

    return '' +
      '<article class="project-card">' +
        '<div class="project-media">' + media + '</div>' +
        '<div class="project-body">' +
          '<div class="project-kicker">' + esc(p.cat) + '</div>' +
          '<h3 class="project-title">' + esc(p.title) + '</h3>' +
          '<div class="project-sub">' + esc(p.sub) + '</div>' +
          '<div class="project-tags">' + p.tags.map(function (t) {
            return '<span class="project-tag">' + esc(t) + '</span>';
          }).join('') + '</div>' +
          '<p class="project-desc">' + esc(p.desc) + '</p>' +
        '</div>' +
        '<div class="project-meta">' +
          '<div class="project-year">' + esc(p.year) + '</div>' +
          '<div class="project-kind">' + esc(p.kind) + '</div>' +
          '<p>' + esc(p.note) + '</p>' +
          '<div class="project-links">' + p.links.map(linkHTML).join('') + '</div>' +
        '</div>' +
      '</article>';
  }

  var timeline = document.querySelector('.timeline');
  if (timeline) timeline.innerHTML = PROJECTS.map(cardHTML).join('');

  /* ============================================================
     NAV — hash links scroll to sections, active state follows
     ============================================================ */
  var navLinks = document.querySelectorAll('[data-nav]');

  function parseRoute() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    if (h.indexOf('projects') === 0) return 'projects';
    if (h.indexOf('contact') === 0) return 'contact';
    return 'home';
  }

  function render(route, instant) {
    var behavior = (reduce || instant) ? 'auto' : 'smooth';
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === route);
    });
    var target = route === 'home' ? null : document.getElementById(route);
    if (target) target.scrollIntoView({ behavior: behavior, block: 'start' });
    else window.scrollTo({ top: 0, behavior: behavior });
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mobileNav');

  function setMenu(open) {
    mnav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', function () { setMenu(!mnav.classList.contains('open')); });
  document.querySelectorAll('[data-link]').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  window.addEventListener('hashchange', function () { render(parseRoute(), false); });
  render(parseRoute(), true);
})();