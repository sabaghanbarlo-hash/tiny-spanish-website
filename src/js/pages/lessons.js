import { $, $$ } from '../ui.js';

export function init(store) {
  const cards = $$('[data-lesson-grid] .lesson-card'); const count = $('[data-count]'); const empty = $('[data-empty]');
  let topic = '', status = '';
  const apply = () => {
    let shown = 0;
    for (const c of cards) {
      const done = store.isLessonDone(c.dataset.lesson);
      const ok = (!topic || c.dataset.topic === topic) && (!status || (status === 'done' ? done : !done));
      c.hidden = !ok; if (ok) shown++;
    }
    count.textContent = `${shown} lesson${shown === 1 ? '' : 's'}`; empty.hidden = shown > 0;
  };
  $('[data-chips="topic"]').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', e.currentTarget).forEach((x) => x.classList.toggle('is-on', x === b)); topic = b.dataset.value; apply();
  });
  $('[data-status-filter]').addEventListener('change', (e) => { status = e.target.value; apply(); });
  store.on(apply);
}
