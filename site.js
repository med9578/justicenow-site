  const root = document.documentElement;
  const LANGS = ['en', 'ckb', 'kmr'];
  const enBtn = document.querySelector('.lang > button[data-lang="en"]');
  const kuWrap = document.querySelector('.lang-ku');
  const kuToggle = kuWrap.querySelector('.lang-toggle');
  const kuLabel = kuToggle.querySelector('.lt-label');
  const kuItems = kuWrap.querySelectorAll('.lang-menu button');
  // What the Kurdish button says, per active language
  const KU_LABEL = { en: 'Kurdish', ckb: 'کوردی', kmr: 'Kurdî' };
  function closeMenu() { kuWrap.classList.remove('open'); kuToggle.setAttribute('aria-expanded', 'false'); }
  function setLang(lang) {
    if (!LANGS.includes(lang)) lang = 'en';
    root.lang = lang;
    root.dir = lang === 'ckb' ? 'rtl' : 'ltr';
    enBtn.setAttribute('aria-pressed', lang === 'en');
    kuToggle.classList.toggle('active', lang !== 'en');
    kuLabel.textContent = KU_LABEL[lang];
    kuItems.forEach(b => b.setAttribute('aria-checked', b.dataset.lang === lang));
    try { localStorage.setItem('jn-lang', lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem('jn-lang'); } catch (e) {}
  // ?lang=en | ku / ckb (Central Kurdish) | kmr (Northern Kurdish)
  const fromUrl = { en: 'en', ku: 'ckb', ckb: 'ckb', kmr: 'kmr' }[new URLSearchParams(location.search).get('lang')];
  setLang(fromUrl || saved || 'en');
  enBtn.addEventListener('click', () => setLang('en'));
  kuToggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = kuWrap.classList.toggle('open');
    kuToggle.setAttribute('aria-expanded', open);
  });
  kuItems.forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang); closeMenu(); }));
  document.addEventListener('click', e => { if (!kuWrap.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // Open a statement when its link (#id) is visited directly
  const target = location.hash && document.querySelector('details' + location.hash);
  if (target) target.open = true;
