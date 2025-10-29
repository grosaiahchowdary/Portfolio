// Responsive tab and clock behavior
document.addEventListener('DOMContentLoaded', function(){
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

  const tabs = document.querySelectorAll('.highlight-btn');
  const panels = document.querySelectorAll('.details-panel');
  function showPanel(id){
    panels.forEach(p => p.hidden = p.id !== id);
    tabs.forEach(t => t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id));
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => showPanel(tab.getAttribute('aria-controls')));
  });
  const aboutBtn = document.getElementById('about-btn');
  if(aboutBtn) aboutBtn.click();
});
