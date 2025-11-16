// script.js - interactions for the portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('[data-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected','false'));
      tab.setAttribute('aria-selected','true');
      panels.forEach(p => p.hidden = true);
      const tgt = document.getElementById(tab.dataset.target);
      if (tgt) tgt.hidden = false;
      if (tab.dataset.target === 'skills') animateSkills();
    });
  });

  // progress animation
  function animateSkills() {
    document.querySelectorAll('.progress').forEach(el => {
      const val = el.dataset.val || 0;
      el.style.width = val + '%';
    });
  }

  // animate on scroll: if skills panel comes into view
  const skillsPanel = document.getElementById('skills');
  if ('IntersectionObserver' in window && skillsPanel) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateSkills(); obs.disconnect(); } });
    }, {threshold:0.3});
    obs.observe(skillsPanel);
  }

  // Theme toggle: simple invert / light mode
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-mode');
    themeBtn.setAttribute('aria-pressed', String(isLight));
    if (isLight) {
      document.documentElement.style.setProperty('--bg-1','#f6fafc');
      document.documentElement.style.setProperty('--bg-2','#eef3fb');
      document.documentElement.style.setProperty('--text','#081225');
      document.documentElement.style.setProperty('--muted','rgba(8,18,37,0.6)');
      document.documentElement.style.setProperty('--glass','rgba(8,18,37,0.04)');
    } else {
      document.documentElement.style.removeProperty('--bg-1');
      document.documentElement.style.removeProperty('--bg-2');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--glass');
    }
  });

  // Download resume: opens printable page (placeholder)
  document.getElementById('downloadResume').addEventListener('click', () => {
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Resume - Rosaiah Chowdary</title></head><body style="font-family:Inter,Arial;padding:32px"><h1>Rosaiah Chowdary</h1><h3>Data Engineer & ETL Specialist</h3><p>Email: gummalla.ds@gmail.com</p><hr><p>This is a generated resume placeholder. Replace this with your actual resume PDF link or file.</p></body></html>`);
    win.document.close();
  });

  // Contact button
  document.getElementById('contactMe').addEventListener('click', ()=>{
    window.location.href = 'mailto:gummalla.ds@gmail.com?subject=Inquiry%20from%20portfolio';
  });

  // Projects scroll
  document.getElementById('viewProjects').addEventListener('click', ()=>{
    const section = document.querySelector('section[style*="margin-top:18px"]') || document.querySelector('main > section:nth-last-child(1)');
    if (section) section.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // keyboard-friendly tiles (enter opens reveal)
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') tile.classList.toggle('expanded');
    });
    tile.addEventListener('click', () => tile.classList.toggle('expanded'));
  });

  // small floating parallax with mouse move (subtle)
  const svg = document.querySelector('.floating-svg');
  if (svg) {
    document.addEventListener('mousemove', (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      const nx = (e.clientX - w/2)/w * 8;
      const ny = (e.clientY - h/2)/h * 8;
      svg.style.transform = `translate(${nx}px, ${ny}px)`;
    });
  }
});
