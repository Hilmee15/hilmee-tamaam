document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const openIcon = document.getElementById('iOpen');
  const closeIcon = document.getElementById('iClose');

  if (!burger || !mobileNav) return;

  const setMenuState = (isOpen) => {
    mobileNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));

    if (openIcon && closeIcon) {
      openIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    }
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;

    if (!mobileNav.contains(target) && !burger.contains(target)) {
      setMenuState(false);
    }
  });

  const setActiveLink = () => {
    const path = window.location.hash || '#/';
    document.querySelectorAll('[data-link]').forEach((link) => {
      const isMatch = link.getAttribute('href') === path || link.getAttribute('data-nav') === path.replace('#/', '');
      link.classList.toggle('active', Boolean(isMatch));
    });
  };

  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);
});
