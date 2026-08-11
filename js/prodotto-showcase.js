// Controller per la sezione "Il prodotto": rail di navigazione a sinistra,
// stage (immagine singola / gruppo di immagini / video) a destra, con lightbox
// per lo zoom. I contenuti arrivano da window.PRODOTTO_CONTENT (content/prodotto.js).
(function () {
  const data = window.PRODOTTO_CONTENT || [];
  const railEl = document.getElementById('pshowRail');
  const mediaEl = document.getElementById('pshowMedia');
  const capEl = document.getElementById('pshowCap');
  const counterEl = document.getElementById('pshowCounter');
  const prevBtn = document.getElementById('pshowPrev');
  const nextBtn = document.getElementById('pshowNext');
  if (!railEl || !data.length) return;

  // elenco piatto delle immagini "zoomabili", nell'ordine di visualizzazione,
  // usato dalla lightbox condivisa (#lb) per prev/next
  const zoomList = [];
  data.forEach((entry) => {
    if (entry.type === 'image') {
      zoomList.push({ src: entry.src, title: entry.title });
    } else if (entry.type === 'group') {
      entry.items.forEach((it) => {
        zoomList.push({ src: it.src, title: entry.title + ' — ' + it.label });
      });
    }
  });

  let active = 0;

  const TYPE_ICON = { image: '▧', video: '▶', group: '▦' };
  const TYPE_LABEL = { image: 'Immagine', video: 'Video', group: 'Galleria immagini' };

  function renderRail() {
    railEl.innerHTML = '';
    data.forEach((entry, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pshow-item' + (i === active ? ' active' : '');
      b.title = TYPE_LABEL[entry.type] || '';
      const ic = document.createElement('span');
      ic.className = 'pshow-item-ic';
      ic.textContent = TYPE_ICON[entry.type] || '';
      ic.setAttribute('aria-hidden', 'true');
      const lbl = document.createElement('span');
      lbl.className = 'pshow-item-lbl';
      lbl.textContent = entry.title;
      b.appendChild(ic);
      b.appendChild(lbl);
      b.addEventListener('click', () => { active = i; render(); });
      railEl.appendChild(b);
    });
  }

  function figureFor(src, title, subLabel) {
    const fig = document.createElement('figure');
    fig.className = 'shot';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = title || '';
    fig.appendChild(img);
    if (subLabel) {
      const fc = document.createElement('figcaption');
      const st = document.createElement('span');
      st.className = 'st';
      st.textContent = subLabel;
      fc.appendChild(st);
      fig.appendChild(fc);
    }
    fig.addEventListener('click', () => {
      const idx = zoomList.findIndex((z) => z.src === src);
      if (idx > -1) openLb(idx);
    });
    return fig;
  }

  function renderMedia(entry) {
    mediaEl.innerHTML = '';
    mediaEl.classList.toggle('is-multi', entry.type === 'group');
    if (entry.type === 'image') {
      mediaEl.appendChild(figureFor(entry.src, entry.title));
    } else if (entry.type === 'video') {
      const wrap = document.createElement('div');
      wrap.className = 'vid';
      const v = document.createElement('video');
      v.controls = true;
      v.preload = 'metadata';
      const source = document.createElement('source');
      source.src = entry.src;
      source.type = 'video/mp4';
      v.appendChild(source);
      wrap.appendChild(v);
      mediaEl.appendChild(wrap);
    } else if (entry.type === 'group') {
      const grid = document.createElement('div');
      grid.className = 'pshow-grid' + (entry.items.length === 2 ? ' cols-2' : '');
      entry.items.forEach((it) => grid.appendChild(figureFor(it.src, entry.title + ' — ' + it.label, it.label)));
      mediaEl.appendChild(grid);
    }
  }

  function renderCap(entry) {
    capEl.innerHTML = '';
    const t = document.createElement('span');
    t.className = 'cap-t';
    t.textContent = entry.title;
    const d = document.createElement('span');
    d.className = 'cap-d';
    d.textContent = entry.desc || '';
    capEl.appendChild(t);
    capEl.appendChild(d);
  }

  function render() {
    const entry = data[active];
    renderRail();
    renderMedia(entry);
    renderCap(entry);
    counterEl.textContent = (active + 1) + ' / ' + data.length;
    prevBtn.disabled = active === 0;
    nextBtn.disabled = active === data.length - 1;
    const activeItem = railEl.children[active];
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function goTo(i) {
    active = Math.max(0, Math.min(data.length - 1, i));
    render();
  }

  prevBtn.addEventListener('click', () => goTo(active - 1));
  nextBtn.addEventListener('click', () => goTo(active + 1));

  const pshow = document.getElementById('pshow');
  pshow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); goTo(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); goTo(active - 1); }
  });

  // lightbox: riusa il markup condiviso #lb / #lbImg / #lbCap già presente in pagina
  let lbIndex = 0;
  function openLb(i) {
    const z = zoomList[i];
    if (!z) return;
    lbIndex = i;
    document.getElementById('lbImg').src = z.src;
    document.getElementById('lbCap').textContent = z.title;
    document.getElementById('lb').classList.add('open');
  }
  function closeLb() {
    document.getElementById('lb').classList.remove('open');
  }
  function navLb(d) {
    lbIndex = (lbIndex + d + zoomList.length) % zoomList.length;
    openLb(lbIndex);
  }
  // i pulsanti della lightbox nel markup usano onclick="closeLb()" / onclick="nav(-1|1)"
  window.closeLb = closeLb;
  window.nav = navLb;
  document.getElementById('lb').addEventListener('click', (e) => {
    if (e.target.id === 'lb') closeLb();
  });
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lb').classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') navLb(1);
    if (e.key === 'ArrowLeft') navLb(-1);
  });

  render();
})();
