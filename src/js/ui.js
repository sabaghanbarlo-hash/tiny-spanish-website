// Shared UI helpers: navigation, toasts, text-to-speech, data loading, card hydration.
export const BASE = document.documentElement.dataset.base || '';
export const url = (p) => BASE + p;
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const cache = {};
export function loadJSON(name) { return (cache[name] ||= fetch(url(`/data/${name}.json`)).then((r) => { if (!r.ok) throw new Error(name); return r.json(); })); }

export function toast(msg, ms = 3200) {
  const region = $('.toast-region'); if (!region) return;
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; region.append(el);
  setTimeout(() => el.remove(), ms);
}

export function initNav() {
  const btn = $('.nav-toggle'), nav = $('#site-nav'); if (!btn || !nav) return;
  const set = (open) => { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); btn.focus(); } });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
}

/* ---- Text-to-speech (free, built into the browser). Optional audio files: see data/lessons.js ---- */
let voice = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices(); if (!vs.length) return;
  const pref = ['es-MX', 'es-US', 'es-419', 'es-CO', 'es-AR', 'es-CL'];
  voice = pref.map((l) => vs.find((v) => v.lang.replace('_', '-') === l)).find(Boolean) || vs.find((v) => /^es/i.test(v.lang) && !/ES$/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null;
}
export function speak(text, { slow = false, onend } = {}) {
  if (!('speechSynthesis' in window)) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ', '));
  u.lang = voice?.lang || 'es-MX'; if (voice) u.voice = voice; u.rate = slow ? 0.55 : 0.85;
  u.onend = u.onerror = () => onend?.();
  speechSynthesis.speak(u); return true;
}
export function initSpeech() {
  if (!('speechSynthesis' in window)) { document.documentElement.classList.add('no-speech'); return; }
  pickVoice(); speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-speak]'); if (!b) return;
    $$('.speak.is-playing').forEach((x) => x.classList.remove('is-playing'));
    b.classList.add('is-playing');
    const done = () => b.classList.remove('is-playing');
    const tts = () => { if (!speak(b.dataset.speak, { slow: !!b.dataset.slow, onend: done })) done(); };
    if (b.dataset.audio) { // recorded audio file if the lesson provides one, else fall back to text-to-speech
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      const a = new Audio(b.dataset.audio); a.onended = done; a.onerror = tts; a.play().catch(tts);
    } else tts();
  });
}

/* ---- Streak chip in the header + display preferences ---- */
export function initChrome(store) {
  const chip = $('[data-streak-chip]');
  const paint = () => { const s = store.streak(); if (chip) { chip.hidden = s.current < 1; $('[data-streak-count]', chip).textContent = s.current; } document.body.classList.toggle('hide-pron', !store.state.prefs.pron); document.body.classList.toggle('hide-en', !store.state.prefs.en); };
  paint(); store.on(paint);
  $$('[data-toggle]').forEach((cb) => { cb.checked = !!store.state.prefs[cb.dataset.toggle]; cb.addEventListener('change', () => store.setPref(cb.dataset.toggle, cb.checked)); });
}

/* ---- Mark completed lessons on any page that lists them ---- */
export function hydrateLessonLinks(store) {
  const paint = () => {
    $$('.lesson-card[data-lesson]').forEach((a) => { const done = store.isLessonDone(a.dataset.lesson); $('.lesson-done', a).hidden = !done; $('[data-done-label]', a).textContent = done ? 'Completed' : ''; });
    $$('[data-course-lesson]').forEach((a) => a.classList.toggle('is-done', store.isLessonDone(a.dataset.courseLesson)));
  };
  paint(); store.on(paint);
}

export function confetti(host) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = document.createElement('div'); box.className = 'confetti'; box.setAttribute('aria-hidden', 'true');
  const colors = ['#C8202F', '#FFC93C', '#2FB5A5', '#F58A33', '#6B4FA8', '#FF8AA0'];
  for (let i = 0; i < 46; i++) { const p = document.createElement('i'); p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % 6]};animation-duration:${1.6 + Math.random() * 1.6}s;animation-delay:${Math.random() * 0.5}s`; box.append(p); }
  host.append(box); setTimeout(() => box.remove(), 4000);
}

export function nextLessonSlug(store, catalog) { return catalog.lessons.find((l) => !store.isLessonDone(l.slug)); }
