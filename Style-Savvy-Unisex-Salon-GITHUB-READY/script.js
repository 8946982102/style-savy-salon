(function(){
  const header=document.getElementById('header'), nav=document.getElementById('navLinks'), overlay=document.getElementById('navOverlay'), burger=document.getElementById('hamburgerBtn');
  const burgerIcon=burger?.querySelector('i');
  function setBurger(open){
    if(burgerIcon){
      burgerIcon.classList.toggle('fa-bars',!open);
      burgerIcon.classList.toggle('fa-xmark',open);
    }
    burger?.setAttribute('aria-expanded',String(open));
    burger?.setAttribute('aria-label',open?'Close menu':'Open menu');
  }
  function closeMenu(){nav.classList.remove('open');overlay.classList.remove('show');header.classList.remove('menu-open');setBurger(false);document.body.style.overflow='';}
  function openMenu(){nav.classList.add('open');overlay.classList.add('show');header.classList.add('menu-open');setBurger(true);document.body.style.overflow='hidden';}
  burger.addEventListener('click',()=>nav.classList.contains('open')?closeMenu():openMenu()); overlay.addEventListener('click',closeMenu); nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()}); window.addEventListener('resize',()=>{if(innerWidth>960)closeMenu()});
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});
  const marquee=document.getElementById('marquee'); marquee.innerHTML += marquee.innerHTML;

  function initBA(slider,before,handle){if(!slider||!before||!handle)return;let pct=50,drag=false;
    const set=(p)=>{pct=Math.max(2,Math.min(98,p));before.style.width=pct+'%';handle.style.left=pct+'%';slider.setAttribute('aria-valuenow',String(Math.round(pct)));};
    const point=e=>{const r=slider.getBoundingClientRect();const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;set(x/r.width*100);};
    slider.addEventListener('pointerdown',e=>{drag=true;slider.setPointerCapture?.(e.pointerId);point(e)});window.addEventListener('pointermove',e=>{if(drag)point(e)});window.addEventListener('pointerup',()=>drag=false);
    slider.addEventListener('touchstart',point,{passive:true});slider.addEventListener('touchmove',e=>{point(e)},{passive:true});
    slider.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();set(pct-5)}if(e.key==='ArrowRight'){e.preventDefault();set(pct+5)}if(e.key==='Home'){e.preventDefault();set(2)}if(e.key==='End'){e.preventDefault();set(98)}});
    set(50);
  }
  initBA(document.getElementById('baSlider'),document.getElementById('baBefore'),document.getElementById('baHandle'));
  initBA(document.getElementById('baSlider2'),document.getElementById('baBefore2'),document.getElementById('baHandle2'));

  const date=document.getElementById('bDate'); if(date) date.min=new Date().toISOString().split('T')[0];
  document.getElementById('bookSubmit').addEventListener('click',function(e){e.preventDefault();
    const get=id=>document.getElementById(id).value.trim();
    const fields=[['bName','Please enter your name.'],['bPhone','Please enter your phone number.'],['bService','Please select a service.'],['bDate','Please select a preferred date.'],['bTime','Please select a preferred time.']];
    for(const [id,msg] of fields){const el=document.getElementById(id);if(!el.value.trim()){el.focus();alert(msg);return;}}
    const phone=get('bPhone').replace(/\D/g,''); if(phone.length<10){alert('Please enter a valid phone number.');document.getElementById('bPhone').focus();return;}
    const msg='Hello Style Savvy Unisex Salon! I would like to book an appointment.\n\n👤 Name: '+get('bName')+'\n📞 Phone: '+get('bPhone')+'\n💇 Service: '+get('bService')+'\n📅 Date: '+get('bDate')+'\n🕐 Time: '+get('bTime')+(get('bNote')?'\n📝 Special Request: '+get('bNote'):'');
    window.open('https://wa.me/919045849675?text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
