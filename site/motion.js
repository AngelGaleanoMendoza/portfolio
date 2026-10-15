(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'code-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const context = canvas.getContext('2d');
  const snippets = ['const app =', 'await deploy()', 'SELECT * FROM', 'AI.workflow()', '{ api: true }', 'git release', 'return data;', 'db.connect()', 'async build()', 'version: 2.0'];
  let columns = [], width = 0, height = 0, frame = 0, last = 0;
  function resize() {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    columns = Array.from({length: Math.ceil(width / 155)}, (_, i) => ({x: i * 155 + 12, y: Math.random() * height, speed: 12 + Math.random() * 19, offset: i % snippets.length}));
  }
  function draw(time) {
    frame = 0;
    if (!context || preference.matches || document.hidden) return;
    const elapsed = Math.min((time - last) / 1000 || 0, .05);
    last = time;
    context.clearRect(0, 0, width, height);
    context.font = '11px Consolas, monospace';
    columns.forEach((column, i) => {
      column.y += column.speed * elapsed;
      if (column.y > height + 200) column.y = -30;
      for (let line = 0; line < 7; line++) {
        context.fillStyle = `rgba(${i % 2 ? '130,170,255' : '199,146,234'},${.18 * (1 - line / 7)})`;
        context.fillText(snippets[(column.offset + line) % snippets.length], column.x, column.y - line * 27);
      }
    });
    frame = requestAnimationFrame(draw);
  }
  function update() {
    cancelAnimationFrame(frame);
    context?.clearRect(0, 0, width, height);
    if (!preference.matches && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(draw); }
  }
  resize();
  update();
  addEventListener('resize', resize, {passive: true});
  document.addEventListener('visibilitychange', update);
  preference.addEventListener('change', update);
  const elements = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lead, .hero .actions, .hero-foot, .section-head, .project-jump, .service, .about-grid > div, .job, .contact-expanded, footer');
  if ('IntersectionObserver' in window && !preference.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); observer.unobserve(entry.target); }
    }), {threshold: .08});
    elements.forEach((element, index) => { element.classList.add('motion-reveal'); element.style.setProperty('--reveal-delay', `${index % 4 * 65}ms`); observer.observe(element); });
    preference.addEventListener('change', () => { if (preference.matches) elements.forEach(element => element.classList.add('motion-visible')); });
  }
})();
