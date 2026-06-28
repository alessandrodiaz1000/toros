// Entrata in scena delle sezioni allo scroll, stato attivo nella nav, toggle del menu
// mobile. Niente dipendenze esterne — coerente con la scelta "sito statico semplice".

document.addEventListener('DOMContentLoaded', () => {
  // La rosa: render delle card da roster.js (ROSTER_PLAYERS / ROSTER_STAFF), filtri per
  // ruolo e modal tesserino. Tutto generato via JS cosi' basta editare roster.js per
  // aggiungere/cambiare persone e foto (campo imageUrl).
  const rosterGrid = document.getElementById('roster-grid');
  const staffGrid = document.getElementById('roster-staff-grid');
  const staffBlock = document.getElementById('roster-staff-block');
  const filters = document.getElementById('roster-filters');
  const modal = document.getElementById('roster-modal');
  const modalClose = document.getElementById('roster-modal-close');
  const modalPhoto = document.getElementById('roster-modal-photo');
  const modalNum = document.getElementById('roster-modal-num');
  const modalName = document.getElementById('roster-modal-name');
  const modalRole = document.getElementById('roster-modal-role');

  if (rosterGrid && typeof ROSTER_PLAYERS !== 'undefined') {
    const buildCard = (person, index) => {
      const card = document.createElement('div');
      card.className = 'roster-card';
      card.dataset.category = person.category;
      card.style.animationDelay = `${index * 0.05}s`;

      const photoHtml = person.imageUrl
        ? `<img class="roster-card-photo" src="${person.imageUrl}" alt="${person.name}">`
        : `<div class="roster-card-watermark"><img src="assets/logo.svg" alt=""></div>`;

      card.innerHTML = `
        ${photoHtml}
        ${person.num ? `<span class="roster-card-num">${String(person.num).padStart(2, '0')}</span>` : ''}
        <div class="roster-card-bottom">
          <p class="roster-card-name">${person.name}</p>
          <p class="roster-card-role">${person.role}</p>
        </div>
      `;

      card.addEventListener('click', () => openRosterModal(person));
      return card;
    };

    ROSTER_PLAYERS.forEach((p, i) => rosterGrid.appendChild(buildCard(p, i)));
    if (staffGrid && typeof ROSTER_STAFF !== 'undefined') {
      ROSTER_STAFF.forEach((p, i) => staffGrid.appendChild(buildCard(p, i)));
    }
  }

  function openRosterModal(person) {
    if (!modal) return;
    modalPhoto.innerHTML = person.imageUrl
      ? `<img src="${person.imageUrl}" alt="${person.name}">`
      : '';
    modalNum.textContent = person.num ? String(person.num).padStart(2, '0') : '';
    modalName.textContent = person.name;
    modalRole.textContent = person.role;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeRosterModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modal) {
    modalClose.addEventListener('click', closeRosterModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeRosterModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeRosterModal();
    });
  }

  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.roster-filter');
      if (!btn) return;
      filters.querySelectorAll('.roster-filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const showPlayers = filter === 'tutti' || ['portiere', 'difensore', 'centrocampista', 'attaccante'].includes(filter);
      const showStaff = filter === 'tutti' || filter === 'staff';

      rosterGrid.hidden = !showPlayers;
      if (staffBlock) staffBlock.hidden = !showStaff;

      rosterGrid.querySelectorAll('.roster-card').forEach((card) => {
        card.hidden = filter !== 'tutti' && filter !== 'staff' && card.dataset.category !== filter;
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => revealObserver.observe(el));

  const navLinks = document.querySelectorAll('.navbar-links a');
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((el) => navObserver.observe(el));

  // Numeri: count-up animato quando la sezione entra in viewport.
  const counters = document.querySelectorAll('.stat-value[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => countObserver.observe(el));

  // Unisciti a noi: apre il client email con i dati del form (no backend).
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = joinForm.name.value.trim();
      const contact = joinForm.contact.value.trim();
      const role = joinForm.role.value;
      const message = joinForm.message.value.trim();
      const subject = `Candidatura Toros — ${role} — ${name}`;
      const body = `Nome: ${name}\nContatto: ${contact}\nRuolo: ${role}\n\nMessaggio:\n${message}`;
      window.location.href = `mailto:infotoros@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const toggle = document.getElementById('navbar-toggle');
  const links = document.querySelector('.navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
