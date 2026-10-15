(() => {
  const pets = [
    ['codex','Codex'],['dewey','Dewey'],['fireball','Fireball'],['hoots','Hoots'],['rocky','Rocky'],
    ['seedy','Seedy'],['stacky','Stacky'],['bsod','BSOD'],['null-signal','Null Signal'],['chimchar','Chimchar']
  ];
  const section = document.createElement('section');
  section.className = 'pet-lounge';
  section.setAttribute('aria-label','Animated coding companions');
  section.innerHTML = `<div class="eyebrow">The coding table / A little company while you explore</div><div class="pet-dock"><div class="pet-dock-controls"><span>10 companions · one coding table</span><button class="pet-pause" aria-pressed="false">Pause</button><button class="pet-toggle" aria-expanded="true">Minimize</button></div><div class="pet-world" role="img" aria-label="Codex, Dewey, Fireball, Hoots, Rocky, Seedy, Stacky, BSOD, Null Signal and Chimchar coding around a round table"><div class="pet-scene"><div class="table-shadow"></div><div class="round-table"><div class="table-code">&lt; build together /&gt;<small>AI · WEB · DATA</small></div></div>${pets.map(([id,name],i)=>`<div class="pet-seat" style="--seat:${i};--x:${(250+Math.cos(i*Math.PI/5-Math.PI/2)*181).toFixed(1)}px;--y:${(156+Math.sin(i*Math.PI/5-Math.PI/2)*95).toFixed(1)}px;z-index:${Math.sin(i*Math.PI/5-Math.PI/2)>0?4:1}"><div class="table-pet ${id==='chimchar'?'custom-pet':''}" style="background-image:url('assets/pets/${id}.webp');--delay:-${i*.13}s"></div><div class="pet-laptop"><i></i></div><span class="pet-name">${name}</span></div>`).join('')}<div class="table-orbit"></div></div></div><button class="pet-restore" hidden>Show coding companions ↗</button></div><p class="pet-caption">A playful corner with my Codex companions. Scroll — they’ll keep you company.</p></div>`;
  document.querySelector('.hero').after(section);
  const dock = section.querySelector('.pet-dock');
  const toggle = section.querySelector('.pet-toggle');
  const restore = section.querySelector('.pet-restore');
  const pause = section.querySelector('.pet-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function minimize(value) { dock.classList.toggle('is-minimized',value);toggle.setAttribute('aria-expanded',String(!value));restore.hidden=!value; }
  toggle.addEventListener('click',()=>minimize(true));
  restore.addEventListener('click',()=>minimize(false));
  pause.addEventListener('click',()=>{const paused=dock.classList.toggle('is-paused');pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-pressed',String(paused))});
  let pending=false;
  function position() {
    pending=false;
    const rect=section.getBoundingClientRect();
    const floating=rect.bottom<100;
    dock.classList.toggle('is-floating',floating);
    const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
    dock.style.setProperty('--stroll',reduced.matches?'0px':`${Math.sin(progress*Math.PI*8)*7}px`);
    dock.style.setProperty('--lean',reduced.matches?'0deg':`${Math.sin(progress*Math.PI*6)*1.2}deg`);
  }
  function onScroll(){if(!pending){pending=true;requestAnimationFrame(position)}}
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  reduced.addEventListener('change',onScroll);
  position();
})();
