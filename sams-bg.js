
addEventListener('DOMContentLoaded',()=>{var e=document.querySelector('.hub-note');if(e)e.textContent='كل منصة بتفتح في تبويب جديد، والمنصة الرئيسية بتفضل معاك.'});
(function(){function nav(){var d=document,b=d.body;if(!b||d.getElementById('platform-home-nav'))return;var root='https://capwv.github.io/SAMS-Compass/';var hub=root+'platforms.html';var logo=root+'assets/logo.webp';var isHub=!!d.querySelector('.hub-shell');var s=d.createElement('style');s.textContent='#platform-home-nav{position:relative;z-index:45;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:10px 16px;background:rgba(7,11,18,.94);border-bottom:1px solid rgba(96,165,250,.25);font:700 13px Cairo,sans-serif;color:#cbd5e1}#platform-home-nav a{display:inline-flex;align-items:center;gap:8px;color:#93c5fd;text-decoration:none;min-height:36px;padding:0 12px;border:1px solid #334968;border-radius:10px}#platform-home-nav a:hover{background:#17253d}#platform-home-nav a:focus-visible{outline:2px solid #7dd3fc;outline-offset:3px}.hub-main-brand{display:flex;align-items:center;gap:12px;color:#eef4ff;text-decoration:none}.hub-main-brand img{width:70px;height:52px;object-fit:contain}.hub-main-brand strong{font-size:18px}.hub-main-brand small{display:block;color:#94a3b8;font-size:11px;margin-top:3px}.hub-main-logo{display:block;width:220px;max-width:65%;height:auto;margin:0 auto 24px}.hub-nav{justify-content:center!important}@media(max-width:560px){#platform-home-nav{gap:5px;padding:7px 12px;font-size:12px}.hub-main-brand strong{font-size:16px}.hub-main-logo{width:180px;margin-bottom:18px}}';d.head.appendChild(s);if(isHub){var n=d.querySelector('.hub-nav');if(n)n.innerHTML='<div class="hub-main-brand"><img src="'+logo+'" alt="Infinity Team"><div><strong dir="ltr">Platforms &amp; Tools</strong><small>المنصة الرئيسية · Infinity Team</small></div></div>';d.querySelectorAll('.home-return').forEach(function(e){e.remove()});var h=d.querySelector('.hub-hero');if(h){var i=d.createElement('img');i.src=logo;i.alt='Infinity University Activity';i.className='hub-main-logo';h.prepend(i)}var e=d.querySelector('.eyebrow');if(e)e.textContent='كل منصاتك وأدواتك في مكان واحد';d.title='Platforms & Tools | Infinity Team';}else{var bar=d.createElement('nav');bar.id='platform-home-nav';bar.setAttribute('aria-label','المنصة الرئيسية');bar.innerHTML='<span>جزء من Platforms &amp; Tools</span><a href="'+hub+'">← رجوع للمنصة الرئيسية</a>';b.prepend(bar);}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',nav);else nav();})();/* Unified SAMS-MIS constellation background, shared by all platforms */
(function(){
  if (window.__samsBg) return;
  window.__samsBg = true;
  function boot(){
    try {
      var body = document.body;
      if (!body || document.getElementById('bgfx') && document.getElementById('bgfx').dataset.sams) return;
      var hasShapes = !!document.querySelector('.bg-shapes');
      var hasHub = !!document.querySelector('.hub-shell');
      var glowEl = document.querySelector('.glow');
      var auroraEl = document.querySelector('.aurora');
      var old = document.getElementById('bgfx');
      if (old) old.remove();
      var cur = document.getElementById('cursorGlow');
      if (cur) cur.remove();
      var cells = document.getElementById('cells');
      if (cells) cells.remove();
      var css = '#bgfx{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;opacity:.85;z-index:' + (hasShapes ? '-1' : '0') + ';}';
      if (hasHub) css += '.wrap{position:relative;z-index:1;}';
      if (!auroraEl && !glowEl) css += '.aurora{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(820px 420px at 50% -12%,rgba(59,130,246,.20),transparent 68%),radial-gradient(560px 340px at 88% 8%,rgba(139,92,246,.10),transparent 70%),radial-gradient(560px 340px at 8% 22%,rgba(56,189,248,.08),transparent 70%);}';
      var st = document.createElement('style');
      st.textContent = css;
      document.head.appendChild(st);
      var anchor = auroraEl || glowEl;
      if (!anchor) {
        anchor = document.createElement('div');
        anchor.className = 'aurora';
        anchor.setAttribute('aria-hidden', 'true');
        body.insertBefore(anchor, body.firstChild);
      }
      var ncv = document.createElement('canvas');
      ncv.id = 'bgfx';
      ncv.setAttribute('aria-hidden', 'true');
      ncv.dataset.sams = '1';
      if (anchor.parentNode) anchor.parentNode.insertBefore(ncv, anchor.nextSibling);
      else body.insertBefore(ncv, body.firstChild);
      var cv = document.getElementById('bgfx'); if (!cv) return;
      var ctx = cv.getContext('2d');
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var W = 0, H = 0, dpr = 1, pts = [], raf = 0;
      var mouse = { x:-9999, y:-9999, on:false };
      var LINK = 125, MR = 190;
      function resize(){
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = innerWidth; H = innerHeight;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.max(30, Math.min(90, Math.floor(W * H / 16000)));
        pts = Array.from({length:n}, function(){ return { x:Math.random()*W, y:Math.random()*H,
          vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.4+.6 }; });
      }
      function frame(){
        ctx.clearRect(0, 0, W, H);
        if (mouse.on) {
          var g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MR);
          g.addColorStop(0, 'rgba(59,130,246,.16)'); g.addColorStop(1, 'rgba(59,130,246,0)');
          ctx.fillStyle = g; ctx.fillRect(mouse.x - MR, mouse.y - MR, MR * 2, MR * 2);
        }
        for (var pi = 0; pi < pts.length; pi++) {
          var p = pts[pi];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          if (mouse.on) {
            var dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
            if (d < MR && d > 1) { var f = (1 - d / MR) * .035; p.x += dx * f; p.y += dy * f; }
          }
        }
        ctx.lineWidth = 1;
        for (var i = 0; i < pts.length; i++) {
          var a = pts[i];
          for (var j = i + 1; j < pts.length; j++) {
            var b = pts[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
            if (dd < LINK) {
              ctx.strokeStyle = 'rgba(96,150,246,' + ((1 - dd / LINK) * .30) + ')';
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
          if (mouse.on) {
            var dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
            if (dm < MR) {
              ctx.strokeStyle = 'rgba(147,180,255,' + ((1 - dm / MR) * .7) + ')';
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
          }
          ctx.fillStyle = 'rgba(178,200,248,.75)';
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
        }
        raf = requestAnimationFrame(frame);
      }
      function start(){ if (!raf && !reduce) raf = requestAnimationFrame(frame); }
      function stop(){ if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      addEventListener('pointermove', function(e){ mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, {passive:true});
      document.addEventListener('mouseleave', function(){ mouse.on = false; });
      addEventListener('touchend', function(){ mouse.on = false; }, {passive:true});
      addEventListener('resize', resize);
      document.addEventListener('visibilitychange', function(){ document.hidden ? stop() : start(); });
      resize();
      if (reduce) { frame(); stop(); } else start();
    } catch (e) {}
  }
  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
