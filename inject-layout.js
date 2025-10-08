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


(function cookieBanner() {
  const KEY = 'yt_cookie_consent_v1'; // 버전 바꾸면 재동의 받음
  if (localStorage.getItem(KEY)) return;

  const bar = document.createElement('div');
  bar.innerHTML = `
    <div style="
      position:fixed;left:0;right:0;bottom:0;z-index:9999;
      background:#0B0C0F;color:#fff;border-top:1px solid rgba(255,255,255,.08);
      padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap
    ">
      <span style="opacity:.85">쿠키를 사용합니다. 더 나은 사용 경험을 위해 동의해 주세요.</span>
      <a href="/legal/cookies.html" style="color:#93c5fd;text-decoration:underline">자세히</a>
      <div style="display:flex;gap:8px">
        <button id="yt-cookie-decline" style="padding:8px 12px;border:1px solid #475569;background:transparent;color:#fff;border-radius:10px">거부</button>
        <button id="yt-cookie-accept" style="padding:8px 12px;background:#22c55e;color:#000;border-radius:10px;font-weight:700">동의</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  const close = (accepted) => {
    if (accepted) localStorage.setItem(KEY, JSON.stringify({ accepted:true, ts:Date.now() }));
    bar.remove();
  };
  bar.querySelector('#yt-cookie-accept').addEventListener('click', () => close(true));
  bar.querySelector('#yt-cookie-decline').addEventListener('click', () => close(false));
})();

