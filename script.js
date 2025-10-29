// script.js - tabs, clock and tile expand behavior
document.addEventListener('DOMContentLoaded', function(){
  // Clock
  function updateClock(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    const el = document.querySelector('.clock');
    if(el) el.textContent = `${hh}:${mm}:${ss}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');
  function showPanel(id){
    panels.forEach(p => {
      if(p.id === id) p.hidden = false;
      else p.hidden = true;
    });
    tabButtons.forEach(b => b.setAttribute('aria-selected', b.getAttribute('aria-controls') === id));
  }
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => showPanel(btn.getAttribute('aria-controls')));
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });
  // default
  const defaultBtn = document.getElementById('tab-about');
  if(defaultBtn) defaultBtn.click();

  // Tiles expand/collapse
  document.querySelectorAll('.tile').forEach(tile => {
    tile.setAttribute('role','button');
    tile.addEventListener('click', () => {
      const expanded = tile.getAttribute('aria-expanded') === 'true';
      tile.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    tile.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tile.click(); }
      if(e.key === 'Escape') tile.setAttribute('aria-expanded','false');
    });
  });
});
