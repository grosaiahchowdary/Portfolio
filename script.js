// Lightweight script to manage tabs, accessibility, and tile interactions

document.addEventListener('DOMContentLoaded', () => {
  const panels = Array.from(document.querySelectorAll('.details-panel'));
  const buttons = {
    about: document.getElementById('about-btn'),
    skills: document.getElementById('skills-btn'),
    roles: document.getElementById('roles-btn')
  };

  function showPanel(panelId, setFocus = false) {
    panels.forEach(p => {
      if (p.id === panelId) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });

    // Update buttons ARIA state and visual active class
    Object.entries(buttons).forEach(([key, btn]) => {
      if (key === panelId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    if (setFocus) {
      const firstPanel = document.getElementById(panelId);
      if (firstPanel) firstPanel.focus();
    }
  }

  // wire buttons
  buttons.about.addEventListener('click', () => showPanel('about'));
  buttons.skills.addEventListener('click', () => showPanel('skills'));
  buttons.roles.addEventListener('click', () => showPanel('roles'));

  // keyboard nav for tablist (Left/Right or Up/Down)
  const tablist = document.querySelector('.button-group');
  tablist.addEventListener('keydown', (e) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const btns = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const currentIndex = btns.findIndex(b => b.classList.contains('active'));
    let nextIndex = 0;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + btns.length) % btns.length;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % btns.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = btns.length - 1;
        break;
    }
    btns[nextIndex].focus();
    btns[nextIndex].click();
  });

  // Tile expand/collapse, accessible via keyboard (Enter/Space) and click
  document.querySelectorAll('.wood-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      toggleTile(tile);
    });
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTile(tile);
      } else if (e.key === 'Escape') {
        // collapse on escape
        if (tile.getAttribute('aria-expanded') === 'true') toggleTile(tile, false);
      }
    });
  });

  function toggleTile(tile, force) {
    const isExpanded = tile.getAttribute('aria-expanded') === 'true';
    const newState = typeof force === 'boolean' ? force : !isExpanded;
    tile.setAttribute('aria-expanded', newState ? 'true' : 'false');
    const expl = tile.querySelector('.explanation');
    if (expl) expl.setAttribute('aria-hidden', newState ? 'false' : 'true');
  }

  // Initialize - show about by default
  showPanel('about');
});