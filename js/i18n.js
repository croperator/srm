(function () {
  const STORAGE_KEY = 'srm.locale';
  const SUPPORTED_LOCALES = ['it', 'en'];
  const DEFAULT_LOCALE = 'it';
  const dictionaries = window.SRM_TRANSLATIONS || {};
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get('lang');
  let storedLocale = null;

  try {
    storedLocale = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('SRM i18n: localStorage non disponibile.', error);
  }

  const locale = SUPPORTED_LOCALES.includes(requestedLocale)
    ? requestedLocale
    : (SUPPORTED_LOCALES.includes(storedLocale) ? storedLocale : DEFAULT_LOCALE);
  const missing = new Set();

  if (SUPPORTED_LOCALES.includes(requestedLocale)) {
    try {
      window.localStorage.setItem(STORAGE_KEY, requestedLocale);
    } catch (error) {
      console.warn('SRM i18n: impossibile sincronizzare la lingua richiesta.', error);
    }
  }

  function preserveWhitespace(source, translated) {
    const start = source.match(/^\s*/)[0];
    const end = source.match(/\s*$/)[0];
    return start + translated + end;
  }

  function translatePattern(source) {
    let match = source.match(/^Tutte \((\d+)\)$/);
    if (match) return 'All (' + match[1] + ')';

    match = source.match(/^(\d+) funzionalità$/);
    if (match) return match[1] + (match[1] === '1' ? ' feature' : ' features');

    match = source.match(/^(\d+) immagini$/);
    if (match) return match[1] + ' images';

    match = source.match(/^(\d+) di (\d+)$/);
    if (match) return match[1] + ' of ' + match[2];

    match = source.match(/^Fase (\d+(?:\.\d+)?)$/);
    if (match) return 'Phase ' + match[1];

    match = source.match(/^Esplora (.+), (Video|Immagine|(?:\d+ immagini))$/);
    if (match) return 'Explore ' + translate(match[1]) + ', ' + translate(match[2]);

    match = source.match(/^Mostra (.+)$/);
    if (match) return 'Show ' + translate(match[1]);

    match = source.match(/^Dipende da: (.+)$/);
    if (match) return 'Depends on: ' + translate(match[1]);

    match = source.match(/^dipende da: (.+)$/);
    if (match) return 'depends on: ' + translate(match[1]);

    if (source.includes(' · ')) {
      const parts = source.split(' · ');
      const translatedParts = parts.map((part) => translate(part));
      if (translatedParts.some((part, index) => part !== parts[index])) {
        return translatedParts.join(' · ');
      }
    }

    return null;
  }

  function translate(source) {
    if (locale === DEFAULT_LOCALE || typeof source !== 'string') return source;
    const value = source.trim();
    if (!value) return source;

    const dictionary = dictionaries[locale] || {};
    const translated = dictionary[value] || translatePattern(value);
    if (translated) return translated;

    missing.add(value);
    return source;
  }

  function translateAttribute(element, attribute) {
    if (!element.hasAttribute(attribute)) return;
    const source = element.getAttribute(attribute);
    const translated = translate(source);
    if (translated !== source) element.setAttribute(attribute, translated);
  }

  // Immagini localizzate: assets/img/nome.jpg|png -> assets/img/nome_en.png.
  // Se la versione nella lingua richiesta non esiste, torna all'immagine italiana.
  const LOCALIZED_IMAGE = /^(.*assets\/img\/[^/?#]+?)\.(?:jpe?g|png)$/i;

  function localizeImage(image) {
    if (locale === DEFAULT_LOCALE || image.dataset.i18nSrc) return;
    const source = image.getAttribute('src');
    const match = source && source.match(LOCALIZED_IMAGE);
    if (!match || match[1].endsWith('_' + locale)) return;

    image.dataset.i18nSrc = source;
    image.addEventListener('error', function fallback() {
      image.removeEventListener('error', fallback);
      image.src = source;
    });
    image.setAttribute('src', match[1] + '_' + locale + '.png');
  }

  function translateElement(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.closest('[data-i18n-ignore]')) return;

    const ignoredTags = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA']);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ignoredTags.has(parent.tagName) || parent.closest('[data-i18n-ignore]')) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const translated = translate(node.nodeValue);
      if (translated !== node.nodeValue) {
        node.nodeValue = preserveWhitespace(node.nodeValue, translated);
      }
    });

    const elements = [root, ...root.querySelectorAll('*')];
    elements.forEach((element) => {
      if (element.closest('[data-i18n-ignore]')) return;
      ['title', 'aria-label', 'placeholder', 'alt'].forEach((attribute) => {
        translateAttribute(element, attribute);
      });
      if (element instanceof HTMLImageElement) localizeImage(element);
      if (locale !== DEFAULT_LOCALE && element instanceof HTMLInputElement && element.value) {
        const translated = translate(element.value);
        if (translated !== element.value) element.value = translated;
      }
    });
  }

  function setLocale(nextLocale) {
    if (!SUPPORTED_LOCALES.includes(nextLocale) || nextLocale === locale) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch (error) {
      console.warn('SRM i18n: impossibile salvare la lingua.', error);
    }

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', nextLocale);
    window.location.assign(nextUrl.toString());
  }

  function createSwitcher() {
    if (params.get('embed') === '1') return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.dataset.i18nIgnore = '';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', locale === 'it' ? 'Seleziona lingua' : 'Select language');

    SUPPORTED_LOCALES.forEach((language) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.lang = language;
      button.textContent = language.toUpperCase();
      button.className = language === locale ? 'active' : '';
      button.setAttribute('aria-pressed', String(language === locale));
      button.setAttribute(
        'aria-label',
        language === 'it' ? 'Italiano' : 'English'
      );
      button.addEventListener('click', () => setLocale(language));
      switcher.appendChild(button);
    });

    document.body.appendChild(switcher);
  }

  function synchronizeFrames() {
    document.querySelectorAll('iframe').forEach((frame) => {
      const notify = () => {
        if (frame.contentWindow) {
          frame.contentWindow.postMessage({ type: 'srm-locale', locale }, '*');
        }
      };
      frame.addEventListener('load', notify);
      notify();
    });
  }

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .language-switcher{position:fixed;top:12px;right:14px;z-index:120;display:flex;padding:3px;
        border:1px solid rgba(120,120,112,.3);border-radius:20px;background:rgba(255,255,255,.92);
        box-shadow:0 3px 14px rgba(0,0,0,.08);backdrop-filter:blur(8px)}
      .language-switcher button{min-width:34px;border:0;border-radius:16px;padding:5px 8px;background:transparent;
        color:#686860;font:700 11px 'Segoe UI',system-ui,sans-serif;letter-spacing:.05em;cursor:pointer}
      .language-switcher button.active{background:#1f5fa6;color:#fff}
      .language-switcher button:focus-visible{outline:3px solid rgba(31,95,166,.3);outline-offset:2px}
      @media(max-width:900px){.language-switcher{top:12px;right:12px}}
    `;
    document.head.appendChild(style);
  }

  function initialize() {
    document.documentElement.lang = locale;
    document.title = translate(document.title);
    translateElement(document.body);
    addStyles();
    createSwitcher();
    synchronizeFrames();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
          if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
            translateElement(node.parentElement);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.SRM_I18N = {
    locale,
    supportedLocales: SUPPORTED_LOCALES.slice(),
    t: translate,
    setLocale,
    getMissingTranslations: () => Array.from(missing).sort()
  };

  window.addEventListener('message', (event) => {
    if (window.parent !== window && event.source === window.parent &&
        event.data && event.data.type === 'srm-locale') {
      setLocale(event.data.locale);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
