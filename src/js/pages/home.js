import { $, loadJSON, url, esc } from '../ui.js';

export async function init(store) {
  const catalog = await loadJSON('catalog');

  // Word of the day: same word all day, changes at local midnight.
  const now = new Date(); const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const [es, en, pron] = catalog.words[doy % catalog.words.length];
  const box = $('[data-wotd]');
  if (box) { box.innerHTML = `<span class="wotd-es" lang="es">${esc(es)}</span><span class="wotd-pron">${esc(pron)}</span><span class="wotd-en">${esc(en)}</span>`; }
  const sp = $('[data-wotd-speak]'); if (sp) { sp.dataset.speak = es; sp.setAttribute('data-speak', es); }

  // "Keep going" card for returning learners.
  const render = () => {
    const done = Object.keys(store.state.lessons).length; const played = Object.keys(store.state.quizzes).length;
    const sec = $('#continue'); if (!sec) return;
    if (!done && !played) { sec.hidden = true; return; }
    const next = catalog.lessons.find((l) => !store.isLessonDone(l.slug));
    const s = store.streak();
    $('[data-continue]').innerHTML = `<div><strong>${done} of ${catalog.lessons.length} lessons complete</strong><p class="muted" style="margin:0">${s.current ? `🔥 ${s.current}-day streak. ` : ''}${next ? `Up next: ${esc(next.title)}` : 'You finished every A1 lesson. Amazing!'}</p></div>
      <div class="btn-row" style="margin:0 0 0 auto">${next ? `<a class="btn btn-primary" href="${url('/lessons/' + next.slug + '/')}">Continue</a>` : `<a class="btn btn-primary" href="${url('/quizzes/')}">Review with a quiz</a>`}<a class="btn btn-outline" href="${url('/progress/')}">My progress</a></div>`;
    sec.hidden = false;
  };
  render(); store.on(render);
}
