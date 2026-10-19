
// Theme System - Pagi / Malam
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

function setTheme(t){
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if(themeToggle){
    const knob = themeToggle.querySelector('.knob');
    if(knob) knob.textContent = t === 'dark' ? '🌙' : '☀️';
  }
}
if(themeToggle){
  const cur = html.getAttribute('data-theme');
  const knob = themeToggle.querySelector('.knob');
  if(knob) knob.textContent = cur === 'dark' ? '🌙' : '☀️';
  themeToggle.addEventListener('click', ()=>{
    const cur = html.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
}

// Navbar scroll
const header = document.querySelector('header');
let scrolled = false;
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  if(y > 20 && !scrolled){
    header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
    scrolled = true;
  } else if(y <= 20 && scrolled){
    header.style.boxShadow = 'none';
    scrolled = false;
  }
});

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
    }
  });
},{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Mobile menu - FIXED OVERLAP BUG
const mobileBtn = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');
if(mobileBtn && mobileMenu){
  const toggleMenu = ()=>{
    const isHidden = mobileMenu.classList.contains('hidden');
    if(isHidden){
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('menu-open');
      mobileBtn.textContent = '✕';
      mobileBtn.setAttribute('aria-expanded','true');
    } else {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('menu-open');
      mobileBtn.textContent = '☰';
      mobileBtn.setAttribute('aria-expanded','false');
    }
  };
  mobileBtn.addEventListener('click', toggleMenu);
  // Close when link clicked
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('menu-open');
      mobileBtn.textContent = '☰';
    });
  });
  // Close on escape
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && !mobileMenu.classList.contains('hidden')){
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('menu-open');
      mobileBtn.textContent = '☰';
    }
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// YT drag scroll
const ytTrack = document.getElementById('ytTrack');
let isDown = false, startX, scrollLeft;
if(ytTrack){
  ytTrack.addEventListener('mousedown', (e)=>{
    isDown = true;
    ytTrack.classList.add('cursor-grabbing');
    startX = e.pageX - ytTrack.offsetLeft;
    scrollLeft = ytTrack.scrollLeft;
  });
  ytTrack.addEventListener('mouseleave', ()=>{ isDown=false; ytTrack.classList.remove('cursor-grabbing'); });
  ytTrack.addEventListener('mouseup', ()=>{ isDown=false; ytTrack.classList.remove('cursor-grabbing'); });
  ytTrack.addEventListener('mousemove', (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - ytTrack.offsetLeft;
    const walk = (x - startX) * 2;
    ytTrack.scrollLeft = scrollLeft - walk;
  });
}
