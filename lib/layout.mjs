// Shared HTML pieces: <head>, header, footer, icons and helpers.
import { character } from './characters.mjs';

export const SITE = {
  name: 'Tiny Spanish',
  tagline: 'Tiny lessons. Big progress.',
  url: (process.env.SITE_URL || 'https://tiny-spanish.pages.dev').replace(/\/$/, ''),
  base: (process.env.BASE_PATH || '').replace(/\/$/, ''),
  year: 2026,
};
export const href = (p) => SITE.base + p;
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  play: '<path d="M8 5v14l11-7z"/>',
  check: '<path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  sound: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  star: '<path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.6 5.9 21l1.2-6.9-5-4.8L9 8.3z"/>',
  flame: '<path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  search: '<circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  bars: '<path d="M4 20h4v-6H4zm6 0h4V9h-4zm6 0h4V4h-4z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  playcircle: '<circle cx="12" cy="12" r="10"/><path d="M10 8v8l6-4z" fill="#fff"/>',
  bubble: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><circle cx="8" cy="11" r="1.4" fill="#fff"/><circle cx="12" cy="11" r="1.4" fill="#fff"/><circle cx="16" cy="11" r="1.4" fill="#fff"/>',
  instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>',
  youtube: '<path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8zM10 15V9l5.2 3z"/>',
  tiktok: '<path d="M16.6 2h-3.2v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9a6.1 6.1 0 1 0 5.3 6V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.8z"/>',
  pinterest: '<path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1a4.4 4.4 0 0 0-4.6 4.4c0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.2-.6-2-2.4-2-3.8 0-3.1 2.3-6 6.5-6 3.4 0 6.1 2.4 6.1 5.7 0 3.4-2.1 6.1-5.1 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.9-.8 2-1.2 2.6A10 10 0 1 0 12 2z"/>',
  trophy: '<path d="M7 3h10v5a5 5 0 0 1-10 0zM7 5H3c0 4 2 5 4 5m10-5h4c0 4-2 5-4 5M10 14h4v3h3v3H7v-3h3z"/>',
};
export const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

// Social links are shown only when a real URL is provided (env vars at build time).
export const SOCIAL = [
  ['instagram', 'Instagram', process.env.SOCIAL_INSTAGRAM],
  ['youtube', 'YouTube', process.env.SOCIAL_YOUTUBE],
  ['tiktok', 'TikTok', process.env.SOCIAL_TIKTOK],
  ['pinterest', 'Pinterest', process.env.SOCIAL_PINTEREST],
].filter(([, , url]) => url && /^https:\/\//.test(url));

export const NAV = [
  ['home', '/', 'Home'], ['lessons', '/lessons/', 'Lessons'], ['courses', '/courses/', 'Courses'],
  ['about', '/about/', 'About'], ['quizzes', '/quizzes/', 'Quiz'], ['blog', '/blog/', 'Blog'],
];
export const FOOTER_NAV = [
  ['home', '/', 'Home'], ['lessons', '/lessons/', 'Lessons'], ['courses', '/courses/', 'Courses'],
  ['about', '/about/', 'About'], ['blog', '/blog/', 'Blog'], ['contact', '/contact/', 'Contact'],
];
export const EXPLORE = [
  ['vocabulary', '/vocabulary/', 'Vocabulary'], ['grammar', '/grammar/', 'Grammar'], ['quizzes', '/quizzes/', 'Quizzes'], ['progress', '/progress/', 'My progress'],
];

export function logo() {
  return `<a class="logo" href="${href('/')}" aria-label="Tiny Spanish home"><span class="logo-tiny">Tiny<span class="logo-star" aria-hidden="true">★</span></span><span class="logo-spanish">Spanish</span></a>`;
}

export function header(active) {
  const links = NAV.map(([id, p, label]) => `<li><a href="${href(p)}"${id === active ? ' aria-current="page" class="active"' : ''}>${label}</a></li>`).join('');
  return `<header class="site-header">
  <div class="wrap header-inner">
    ${logo()}
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon('menu', 'i-open')}${icon('close', 'i-close')}</button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>${links}</ul>
      <a class="btn btn-primary btn-sm nav-cta" href="${href('/lessons/hola/')}">Start Learning ${icon('arrow')}</a>
    </nav>
    <a class="icon-btn search-btn" href="${href('/vocabulary/#search')}">${icon('search')}<span class="search-label">Search</span></a>
    <a class="streak-chip" href="${href('/progress/')}" data-streak-chip hidden title="Your learning streak">${icon('flame')}<span data-streak-count>0</span><span class="sr-only"> day streak</span></a>
  </div>
</header>`;
}

export function footer() {
  const links = FOOTER_NAV.map(([, p, l]) => `<a href="${href(p)}">${l}</a>`).join('');
  const explore = EXPLORE.map(([, p, l]) => `<a href="${href(p)}">${l}</a>`).join('');
  const social = SOCIAL.length ? `<div class="social">${SOCIAL.map(([i, n, u]) => `<a href="${esc(u)}" rel="noopener" aria-label="${n}">${icon(i)}</a>`).join('')}</div>` : '';
  return `<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">${logo()}</div>
    <nav aria-label="Footer">${links}</nav>
    ${social}
    <p class="footer-tag">Learn Spanish. Have Fun! <span aria-hidden="true">♥</span></p>
    <nav class="footer-explore" aria-label="Explore">${explore}</nav>
    <p class="footer-note">Lessons are drafts written to help beginners practice. Spanish is shown in a neutral Latin American style. Progress is saved only in this browser.</p>
  </div>
</footer>`;
}

export function page({ id, title, description, path, body, scripts = true, jsonld = [], noindex = false, extraHead = '' }) {
  const full = title === SITE.name ? title : `${title} · ${SITE.name}`;
  const url = SITE.url + SITE.base + path;
  const ld = jsonld.length ? `<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld)}</script>` : '';
  return `<!doctype html>
<html lang="en" data-base="${SITE.base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#C8202F">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}${SITE.base}/assets/og.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${href('/assets/favicon.svg')}" type="image/svg+xml">
<link rel="manifest" href="${href('/manifest.webmanifest')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=Caveat+Brush&display=swap">
<link rel="stylesheet" href="${href('/css/styles.css')}">
${extraHead}${ld}
</head>
<body data-page="${id}">
<a class="skip-link" href="#main">Skip to content</a>
${header(id)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
<div class="toast-region" role="status" aria-live="polite" aria-atomic="true"></div>
<noscript><p class="noscript">Tiny Spanish saves your progress and runs quizzes with JavaScript. Please turn it on to track your learning.</p></noscript>
${scripts ? `<script type="module" src="${href('/js/main.js')}"></script>` : ''}
</body>
</html>`;
}

export function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="#C8202F"/><text x="50" y="68" font-size="58" text-anchor="middle" font-family="Fredoka,Arial,sans-serif" font-weight="700" fill="#FFC93C">¡T!</text></svg>`;
}

export function avatar(who, size = '') { return `<span class="avatar avatar-${who} ${size}">${character(who, { head: true, mood: 'smile', label: who === 'emma' ? 'Emma' : 'Mateo' })}</span>`; }

export const levelBadge = (lvl) => `<span class="badge badge-level">${esc(lvl)}</span>`;

// Popular lessons use the scene artwork from the design reference (public/assets/art/card-<slug>.webp).
const CARD_ART = { hola: [222, 154], 'como-estas': [222, 154], libreria: [222, 154], alergico: [222, 154] };
export function lessonCard(l, { compact = false } = {}) {
  const photo = CARD_ART[l.slug];
  const art = photo
    ? `<span class="lesson-art lesson-photo"><img src="${href('/assets/art/card-' + l.slug + '.webp')}" width="${photo[0]}" height="${photo[1]}" alt="" loading="lazy" decoding="async"></span>`
    : `<span class="lesson-art">${character(l.hero, { head: true })}</span>`;
  return `<a class="card lesson-card scene-${l.scene}${photo ? ' has-photo' : ''}" href="${href('/lessons/' + l.slug + '/')}" data-lesson="${l.slug}" data-topic="${esc(l.topic)}">
  <span class="lesson-num">Lesson ${l.n}</span>
  <span class="lesson-done" aria-hidden="true" hidden>${icon('check')}</span>
  ${art}
  <span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(l.subtitle)}</small>
  <span class="play-chip" aria-hidden="true">${icon('play')}</span></span>
  <span class="sr-only" data-done-label></span>
</a>`;
}
