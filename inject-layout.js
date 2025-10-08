// /inject-layout.js  (cache-busting + base-path auto + cookie banner)
(() => {
  if (window.__layoutInjected) return;
  window.__layoutInjected = true;

  document.addEventListener('DOMContentLoaded', async () => {
    // 1) BASE 경로 계산
    //    - <meta name="site-base" content="https://tools.yuchani.com"> 이 있으면 우선 사용
    //    - 없으면 현재 URL에서 1단계 경로를 추측(프로젝트 페이지 대비)
    const metaBase = document.querySelector('meta[name="site-base"]');
    const guessBase = (() => {
      const seg = location.pathname.split('/').filter(Boolean);
      return seg.length ? '/' + seg[0] : '';
    })();
    const BASE = (metaBase?.content || guessBase).replace(/\/+$/, ''); // 끝 슬래시 제거

    // 2) 캐시 버전 (배포 시 숫자만 올려서 강제 새로고침)
    const VERSION = 'v3';

    // 3) 경로/URL 유틸
    //    - "/..."(루트 절대경로)이면 BASE를 붙이지 않고 그대로 사용
    //    - 상대경로("partials/...")면 BASE + 상대경로
    const abs = (p) => (p.startsWith('/') ? p : (BASE ? (BASE + '/' + p).replace(/\/+/g, '/') : p));
    const withV = (url) => url + (url.includes('?') ? '&' : '?') + 'v=' + VERSION;

    async function load(path) {
      const url = withV(abs(path));
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) {
        console.error(`Include failed: ${path} → ${url} (${res.status})`);
        throw new Error(`Include failed: ${path}`);
      }
      return res.text();
    }

    // 4) include 치환
    for (const el of document.querySelectorAll('[data-include]')) {
      const path = el.getAttribute('data-include') || '';
      try {
        const html = await load(path);
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        el.replaceWith(...tmp.childNodes);
      } catch (e) {
        // 실패 시 화면에도 표기(디버그용). 운영에선 아래 두 줄 지워도 됨.
        el.innerHTML = `<div style="color:#f88;padding:8px 0">Include error: ${path}</div>`;
        console.warn(e);
      }
    }

    // 5) 아이콘 렌더 + 중복 방지
    window.lucide?.createIcons?.();
    const dedupe = (sel) => {
      const nodes = document.querySelectorAll(sel);
      for (let i = 1; i < nodes.length; i++) nodes[i].remove();
    };
    dedupe('footer');
    dedupe('header');
  });
})();

// --- Cookie banner (동의/거부) ------------------------------
(function cookieBanner() {
  const KEY = 'yt_cookie_consent_v1'; // 버전 바꾸면 재동의
  if (localStorage.getItem(KEY)) return;

  // 실제 쿠키정책 경로에 맞춰 조정하세요.
  // 예) privacy 폴더: '/privacy/cookie-policy.html'
  //    legal  폴더: '/legal/cookie-policy.html'
  const COOKIE_POLICY_URL = '/privacy/cookie-policy.html';

  const bar = document.createElement('div');
  bar.innerHTML = `
    <div style="
      position:fixed;left:0;right:0;bottom:0;z-index:9999;
      background:#0B0C0F;color:#fff;border-top:1px solid rgba(255,255,255,.08);
      padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap
    ">
      <span style="opacity:.85">쿠키를 사용합니다. 더 나은 사용 경험을 위해 동의해 주세요.</span>
      <a href="${COOKIE_POLICY_URL}" style="color:#93c5fd;text-decoration:underline">자세히</a>
      <div style="display:flex;gap:8px">
        <button id="yt-cookie-decline" style="padding:8px 12px;border:1px solid #475569;background:transparent;color:#fff;border-radius:10px">거부</button>
        <button id="yt-cookie-accept" style="padding:8px 12px;background:#22c55e;color:#000;border-radius:10px;font-weight:700">동의</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  const close = (accepted) => {
    if (accepted) localStorage.setItem(KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    bar.remove();
  };
  bar.querySelector('#yt-cookie-accept').addEventListener('click', () => close(true));
  bar.querySelector('#yt-cookie-decline').addEventListener('click', () => close(false));
})();

<div data-include="/partials/footer.html"></div>
<script src="/inject-layout.js" defer></script>
