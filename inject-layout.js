// /inject-layout.js (robust include + safe dedupe + cache-busting)
(() => {
  // 스크립트가 이미 실행되었다면 중복 실행 방지
  if (window.__layoutInjected) return;
  window.__layoutInjected = true;

  document.addEventListener('DOMContentLoaded', async () => {
    // 1) BASE 경로 계산
    const metaBase = document.querySelector('meta[name="site-base"]');
    const guessBase = (() => {
      const seg = location.pathname.split('/').filter(Boolean);
      return seg.length > 1 ? '/' + seg.slice(0, -1).join('/') : '';
    })();
    const BASE = (metaBase?.content || guessBase || '').replace(/\/+$/, '');

    // 2) 캐시 버전 (파일 수정 시 이 숫자를 올려주세요)
    const VERSION = 'v4';

    // 3) 경로 생성 유틸 함수
    const abs = (p) => {
      if (!p) return p;
      if (p.startsWith('/')) return p; // 루트 절대경로는 그대로 사용
      const joined = (BASE ? `${BASE}/${p}` : p);
      return joined.replace(/\/{2,}/g, '/');
    };
    const withV = (url) => `${url}${url.includes('?') ? '&' : '?'}v=${VERSION}`;

    // 4) fetch 유틸 함수
    async function load(path) {
      const url = withV(abs(path));
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) {
        console.error(`Include failed: ${path} → ${url} (${res.status})`);
        throw new Error(`Include failed: ${path}`);
      }
      return res.text();
    }

    // 5) [data-include] 속성을 가진 모든 요소를 찾아 치환
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const path = el.getAttribute('data-include') || '';
      if (!path) continue;

      try {
        const html = await load(path);
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        // placeholder를 fetched 콘텐츠로 교체
        el.replaceWith(...tmp.childNodes);
      } catch (e) {
        // 에러 발생 시 해당 위치에 에러 메시지 표시
        el.innerHTML = `<div style="color:#f88;padding:8px 0">Include error: ${path}</div>`;
        console.warn(e);
      }
    }

    // 6) 아이콘 렌더링 (Lucide Icons)
    try {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (e) {
      console.warn('Lucide icon rendering failed.', e);
    }
  });
})();
