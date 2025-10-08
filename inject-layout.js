// /inject-layout.js (요약본)
(() => {
  if (window.__layoutInjected) return;
  window.__layoutInjected = true;

  document.addEventListener('DOMContentLoaded', async () => {
    const baseMeta = document.querySelector('meta[name="site-base"]');
    const BASE = (baseMeta?.content || '').replace(/\/+$/, '');
    const abs = p => (p.startsWith('/') ? BASE + p : p);

    async function load(path) {
      const res = await fetch(abs(path), { cache:'no-cache' });
      if (!res.ok) throw new Error(`Include failed: ${path} (${res.status})`);
      return res.text();
    }

    for (const el of document.querySelectorAll('[data-include]')) {
      try {
        const html = await load(el.getAttribute('data-include') || '');
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        el.replaceWith(...tmp.childNodes);
      } catch (e) { console.warn(e); }
    }

    // 아이콘 렌더
    window.lucide?.createIcons?.();

    // 중복 방지(혹시 다른 푸터가 하드코드로 남아있을 때)
    const dedupe = sel => {
      const nodes = document.querySelectorAll(sel);
      for (let i=1; i<nodes.length; i++) nodes[i].remove();
    };
    dedupe('footer');
  });
})();
