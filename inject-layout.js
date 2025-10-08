// /inject-layout.js  (robust include + safe dedupe + cache-busting)
(() => {
  if (window.__layoutInjected) return;
  window.__layoutInjected = true;

  document.addEventListener('DOMContentLoaded', async () => {
    // 1) BASE 계산: <meta name="site-base"> 우선, 없으면 1단계 경로 추측
    const metaBase = document.querySelector('meta[name="site-base"]');
    const guessBase = (() => {
      const seg = location.pathname.split('/').filter(Boolean);
      return seg.length ? '/' + seg[0] : '';
    })();
    const BASE = (metaBase?.content || guessBase || '').replace(/\/+$/, '');

    // 2) 캐시 버전
    const VERSION = 'v4';

    // 3) 경로 유틸: "/..."(루트 절대경로)이면 그대로, 상대경로면 BASE + path
    const abs = (p) => {
      if (!p) return p;
      if (p.startsWith('/')) return p; // 루트 경로는 BASE를 붙이지 않는다
      const joined = (BASE ? BASE + '/' + p : p);
      return joined.replace(/\/{2,}/g, '/');
    };
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
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const path = el.getAttribute('data-include') || '';
      try {
        const html = await load(path);
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        el.replaceWith(...tmp.childNodes);
      } catch (e) {
        el.innerHTML = `<div style="color:#f88;padding:8px 0">Include error: ${path}</div>`;
        console.warn(e);
      }
    }

    // 5) 아이콘 렌더
    try { window.lucide?.createIcons?.(); } catch {}

    // 6) 안전한 중복 제거: 동일 셀렉터가 여러 개면 "마지막 것"만 남김
    function keepLast(selector) {
      const nodes = document.querySelectorAll(selector);
      if (nodes.length <= 1) return;
      for (let i = 0; i < nodes.length - 1; i++) nodes[i].remove();
    }
    // id 우선, 없으면 태그로 폴백 (과격하게 지우지 않음)
    keepLast('#yt-header'); keepLast('header');
    keepLast('#yt-footer'); keepLast('footer');
  });
})();
