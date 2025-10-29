// script.js - behavior for tabs, tiles, and clock
document.addEventListener('DOMContentLoaded', function(){
  // clock
  function updateClock(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    const el = document.querySelector('.clock');
    if(el) el.textContent = `${hh}:${mm}:${ss}`;
  }
  // create clock element if not present
  if(!document.querySelector('.clock')){
    const nameHeader = document.querySelector('.name-header');
    const clock = document.createElement('div');
    clock.className = 'clock';
    clock.setAttribute('aria-hidden','true');
    clock.textContent = '--:--:--';
    nameHeader.appendChild(clock);
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Tab behavior
  const tabs = document.querySelectorAll('.highlight-btn');
  const panels = document.querySelectorAll('.details-panel');

  function showPanel(id){
    panels.forEach(p => {
      if(p.id === id){
        p.hidden = false;
      } else p.hidden = true;
    });
    tabs.forEach(t => {
      t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id ? 'true' : 'false');
    });
    // focus first tile inside shown panel
    const activePanel = document.getElementById(id);
    const firstTile = activePanel ? activePanel.querySelector('.wood-tile') : null;
    if(firstTile) firstTile.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showPanel(tab.getAttribute('aria-controls'));
    });
    tab.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tab.click(); }
    });
  });

  // default: show about
  const aboutBtn = document.getElementById('about-btn');
  if(aboutBtn) aboutBtn.click();

  // tiles expand/collapse
  document.querySelectorAll('.tiles-group .wood-tile, .details-panel > .wood-tile').forEach(tile => {
    tile.setAttribute('role','button');
    tile.addEventListener('click', () => {
      const expanded = tile.getAttribute('aria-expanded') === 'true';
      tile.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      const expl = tile.querySelector('.explanation');
      if(expl) {
        expl.setAttribute('aria-hidden', expanded ? 'true' : 'false');
      }
    });
    tile.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tile.click(); }
      if(e.key === 'Escape') {
        tile.setAttribute('aria-expanded','false');
        const expl = tile.querySelector('.explanation');
        if(expl) expl.setAttribute('aria-hidden','true');
      }
    });
  });

});