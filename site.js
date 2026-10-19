  const root = document.documentElement;
  function setLang(lang) {
    root.lang = lang;
    root.dir = lang === 'ckb' ? 'rtl' : 'ltr';
    try { localStorage.setItem('jn-lang', lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem('jn-lang'); } catch (e) {}
  const fromUrl = new URLSearchParams(location.search).get('lang');
  setLang(fromUrl === 'ku' ? 'ckb' : fromUrl === 'en' ? 'en' : saved || 'en');
  document.querySelector('.lang').addEventListener('click', () => setLang(root.lang === 'en' ? 'ckb' : 'en'));

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
