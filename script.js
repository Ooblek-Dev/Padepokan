
document.addEventListener('DOMContentLoaded', function(){
  const header = document.querySelector('header');
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  window.addEventListener('scroll', function(){
    if(window.scrollY > 20){
      header.classList.add('bg-[#0A0A0B]/80','backdrop-blur-2xl','shadow-[0_8px_32px_rgba(0,0,0,0.4)]');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-[#0A0A0B]/80','backdrop-blur-2xl','shadow-[0_8px_32px_rgba(0,0,0,0.4)]');
      header.classList.add('bg-transparent');
    }
  });
  
  if(mobileBtn && mobileMenu){
    mobileBtn.addEventListener('click', function(){
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          if(mobileMenu) mobileMenu.classList.add('hidden');
        }
      }
    });
  });
});
