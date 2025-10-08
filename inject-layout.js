// /inject-layout.js  (cache-busting + base-path auto)
(() => {
  if (window.__layoutInjected) return;
  window.__layoutInjected = true;

  document.addEventListener('DOMContentLoaded', async () => {
    // 1) 프로젝트 페이지 지원: <meta name="site-base" content="/레포명"> 우선
    //    없으면 현 URL에서 '/레포명' 자동 추측
    const metaBase = document.querySelector('meta[name="site-base"]');
    const guessBase = (() => {
      const seg = location.pathname.split('/').filter(Boolean);
      return seg.length ? '/' + seg[0] : '';
    })();
    const BASE = (metaBase?.content || guessBase).replace(/\/+$/, '');

    // 2) 캐시 버전 (배포 때 숫자만 올려주면 즉시 반영)
    const VERSION = 'v3';

    const abs = p => (p.startsWith('/') ? (BASE + p) : p);
    const withV = url => url + (url.includes('?') ? '&' : '?') + 'v=' + VERSION;

    async function load(path) {
      const url = withV(abs(path));
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`Include failed: ${url} (${res.status})`);
      return res.text();
    }

    // 3) include 치환
    for (const el of document.querySelectorAll('[data-include]')) {
      try {
        const html = await load(el.getAttribute('data-include') || '');
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        el.replaceWith(...tmp.childNodes);
      } catch (e) {
        console.warn(e);
      }
    }

    // 4) 아이콘 렌더 + 중복 방지(혹시 하드코드 남아있을 때)
    window.lucide?.createIcons?.();
    const dedupe = sel => { const nodes = document.querySelectorAll(sel); for (let i=1;i<nodes.length;i++) nodes[i].remove(); };
    dedupe('footer'); dedupe('header');
  });
})();
