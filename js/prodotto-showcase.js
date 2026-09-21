(function () {
  const data = window.PRODOTTO_CONTENT || [];
  const filtersEl = document.getElementById('productFilters');
  const groupsEl = document.getElementById('productGroups');
  const viewerEl = document.getElementById('productViewer');
  if (!filtersEl || !groupsEl || !viewerEl || !data.length) return;

  const categories = [
    { id: 'realtime', label: 'Circolazione real-time' },
    { id: 'operations', label: 'Gestione operativa' },
    { id: 'ground-onboard', label: 'Comunicazione terra-bordo' },
    { id: 'mobile', label: 'App mobile' },
    { id: 'analytics', label: 'KPI e analisi' },
    { id: 'ai', label: 'Intelligenza artificiale' },
    { id: 'skills', label: 'Gestione competenze' },
    { id: 'platform', label: 'Piattaforma e configurazione' }
  ];
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  const viewerTitleEl = document.getElementById('viewerTitle');
  const viewerCategoryEl = document.getElementById('viewerCategory');
  const viewerDescriptionEl = document.getElementById('viewerDescription');
  const viewerMediaEl = document.getElementById('viewerMedia');
  const viewerCounterEl = document.getElementById('viewerCounter');
  const viewerHintEl = document.getElementById('viewerHint');
  const viewerThumbsEl = document.getElementById('viewerThumbs');
  const viewerSlideLabelEl = document.getElementById('viewerSlideLabel');
  const viewerPrevEl = document.getElementById('viewerPrev');
  const viewerNextEl = document.getElementById('viewerNext');
  const viewerCloseEl = document.getElementById('viewerClose');

  let activeFilter = 'realtime';
  let activeEntry = null;
  let activeSlide = 0;
  let lastFocused = null;
  let touchStartX = 0;

  function mediaItems(entry) {
    if (entry.type === 'group') return entry.items;
    return [{ label: entry.title, src: entry.src, type: entry.type }];
  }

  function previewFor(entry) {
    return entry.type === 'group' ? entry.items[0] : entry;
  }

  function mediaBadge(entry) {
    if (entry.type === 'group') return entry.items.length + ' immagini';
    return entry.type === 'video' ? 'Video' : 'Immagine';
  }

  function createPreview(entry) {
    const preview = previewFor(entry);
    if (entry.type === 'video') {
      const placeholder = document.createElement('span');
      placeholder.className = 'feature-video-preview';
      placeholder.textContent = '▶';
      placeholder.setAttribute('aria-hidden', 'true');
      return placeholder;
    }
    const image = document.createElement('img');
    image.src = preview.src;
    image.alt = '';
    image.loading = 'lazy';
    return image;
  }

  function createCard(entry) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'feature-card';
    card.setAttribute('aria-label', 'Esplora ' + entry.title + ', ' + mediaBadge(entry));

    const thumb = document.createElement('span');
    thumb.className = 'feature-thumb';
    thumb.appendChild(createPreview(entry));

    const badge = document.createElement('span');
    badge.className = 'feature-kind';
    badge.textContent = mediaBadge(entry);
    thumb.appendChild(badge);

    const body = document.createElement('span');
    body.className = 'feature-body';
    const title = document.createElement('span');
    title.className = 'feature-title';
    title.textContent = entry.title;
    const description = document.createElement('span');
    description.className = 'feature-desc';
    description.textContent = entry.desc || '';
    const open = document.createElement('span');
    open.className = 'feature-open';
    open.textContent = 'Esplora funzionalità →';
    body.append(title, description, open);
    card.append(thumb, body);
    card.addEventListener('click', () => openViewer(entry, card));
    return card;
  }

  function renderGroups() {
    groupsEl.innerHTML = '';
    categories
      .filter((category) => activeFilter === 'all' || category.id === activeFilter)
      .forEach((category) => {
        const entries = data.filter((entry) => entry.category === category.id);
        if (!entries.length) return;

        const section = document.createElement('section');
        section.className = 'product-group';
        section.dataset.category = category.id;
        const head = document.createElement('div');
        head.className = 'product-group-head';
        const title = document.createElement('h3');
        title.className = 'product-group-title';
        title.textContent = category.label;
        const count = document.createElement('span');
        count.className = 'product-group-count';
        count.textContent = entries.length + (entries.length === 1 ? ' funzionalità' : ' funzionalità');
        head.append(title, count);

        const grid = document.createElement('div');
        grid.className = 'product-grid';
        entries.forEach((entry) => grid.appendChild(createCard(entry)));
        section.append(head, grid);
        groupsEl.appendChild(section);
      });
  }

  function renderFilters() {
    filtersEl.innerHTML = '';
    [...categories, { id: 'all', label: 'Tutte (' + data.length + ')' }].forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'product-filter' + (category.id === activeFilter ? ' active' : '');
      button.textContent = category.label;
      button.setAttribute('aria-pressed', String(category.id === activeFilter));
      button.addEventListener('click', () => {
        activeFilter = category.id;
        renderFilters();
        renderGroups();
      });
      filtersEl.appendChild(button);
    });
  }

  function renderViewerMedia() {
    const items = mediaItems(activeEntry);
    const item = items[activeSlide];
    const oldAsset = viewerMediaEl.querySelector('.viewer-asset');
    if (oldAsset) oldAsset.remove();

    let asset;
    if ((item.type || activeEntry.type) === 'video') {
      asset = document.createElement('video');
      asset.controls = true;
      asset.preload = 'metadata';
      asset.src = item.src;
    } else {
      asset = document.createElement('img');
      asset.src = item.src;
      asset.alt = activeEntry.title + (item.label ? ' — ' + item.label : '');
    }
    asset.className = 'viewer-asset';
    viewerMediaEl.insertBefore(asset, viewerPrevEl);

    const hasMultiple = items.length > 1;
    viewerPrevEl.hidden = !hasMultiple;
    viewerNextEl.hidden = !hasMultiple;
    viewerHintEl.hidden = !hasMultiple;
    viewerCounterEl.textContent = hasMultiple ? (activeSlide + 1) + ' di ' + items.length : mediaBadge(activeEntry);
    viewerSlideLabelEl.textContent = hasMultiple ? item.label : '';

    viewerThumbsEl.innerHTML = '';
    viewerThumbsEl.hidden = !hasMultiple;
    if (hasMultiple) {
      items.forEach((thumbItem, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'viewer-thumb' + (index === activeSlide ? ' active' : '');
        button.setAttribute('aria-label', 'Mostra ' + thumbItem.label);
        button.setAttribute('aria-pressed', String(index === activeSlide));
        const image = document.createElement('img');
        image.src = thumbItem.src;
        image.alt = '';
        button.appendChild(image);
        button.addEventListener('click', () => goToSlide(index));
        viewerThumbsEl.appendChild(button);
      });
    }
  }

  function openViewer(entry, trigger) {
    activeEntry = entry;
    activeSlide = 0;
    lastFocused = trigger;
    const category = categoryById.get(entry.category);
    viewerTitleEl.textContent = entry.title;
    viewerCategoryEl.textContent = category ? category.label : '';
    viewerDescriptionEl.textContent = entry.desc || '';
    renderViewerMedia();
    viewerEl.classList.add('open');
    document.body.classList.add('viewer-open');
    viewerCloseEl.focus();
  }

  function closeViewer() {
    const video = viewerMediaEl.querySelector('video');
    if (video) video.pause();
    viewerEl.classList.remove('open');
    document.body.classList.remove('viewer-open');
    if (lastFocused) lastFocused.focus();
  }

  function goToSlide(index) {
    const items = mediaItems(activeEntry);
    activeSlide = (index + items.length) % items.length;
    renderViewerMedia();
  }

  viewerPrevEl.addEventListener('click', () => goToSlide(activeSlide - 1));
  viewerNextEl.addEventListener('click', () => goToSlide(activeSlide + 1));
  viewerCloseEl.addEventListener('click', closeViewer);
  viewerEl.addEventListener('click', (event) => {
    if (event.target === viewerEl) closeViewer();
  });
  viewerMediaEl.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  viewerMediaEl.addEventListener('touchend', (event) => {
    if (!activeEntry || mediaItems(activeEntry).length < 2) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) goToSlide(activeSlide + (distance < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (!viewerEl.classList.contains('open')) return;
    if (event.key === 'Escape') closeViewer();
    else if (event.key === 'ArrowRight' && mediaItems(activeEntry).length > 1) goToSlide(activeSlide + 1);
    else if (event.key === 'ArrowLeft' && mediaItems(activeEntry).length > 1) goToSlide(activeSlide - 1);
  });

  renderFilters();
  renderGroups();
})();
