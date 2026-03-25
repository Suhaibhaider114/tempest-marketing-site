(function(){
  'use strict';

  /* ── NAV SCROLL ── */
  var nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, {passive:true});
  }

  /* ── MOBILE HAMBURGER ── */
  var hb  = document.getElementById('hb');
  var nl  = document.getElementById('nl');
  var body = document.body;

  if(hb && nl){

    function isDesktop(){
      return window.innerWidth >= 768;
    }

    function closeMenu(){
      nl.classList.remove('open');
      hb.setAttribute('aria-expanded','false');
      hb.classList.remove('is-open');
      body.style.overflow = '';
      body.style.position = '';
    }

    function openMenu(){
      nl.classList.add('open');
      hb.setAttribute('aria-expanded','true');
      hb.classList.add('is-open');
      // Lock body scroll on mobile
      body.style.overflow = 'hidden';
    }

    function toggleMenu(){
      if(nl.classList.contains('open')){ closeMenu(); }
      else { openMenu(); }
    }

    // Animate hamburger spans via CSS class
    hb.addEventListener('click', function(e){
      e.stopPropagation();
      toggleMenu();
    });

    // Close when a nav link is tapped
    nl.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        closeMenu();
      });
    });

    // Close when tapping outside the menu
    document.addEventListener('click', function(e){
      if(nl.classList.contains('open') &&
         !nl.contains(e.target) &&
         !hb.contains(e.target)){
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function(){
      if(isDesktop()){ closeMenu(); }
    }, {passive:true});

    // Escape key closes menu
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && nl.classList.contains('open')){
        closeMenu();
        hb.focus();
      }
    });
  }

  /* ── SCROLL REVEAL ── */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },{threshold:0.06, rootMargin:'0px 0px -20px 0px'});
    document.querySelectorAll('.sr').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.sr').forEach(function(el){ el.classList.add('in'); });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
      });
      if(!isOpen){ item.classList.add('open'); }
    });
  });

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      var target = document.querySelector(id);
      if(target){
        e.preventDefault();
        var navH = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h')
        ) || 60;
        var y = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({top:y, behavior:'smooth'});
      }
    });
  });

})();
