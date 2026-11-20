import { $, $$, loadJSON, url } from '../ui.js';

export async function init(store) {
  const catalog = await loadJSON('catalog');
  const paint = () => {
    for (const card of $$('[data-course]')) {
      const c = catalog.courses.find((x) => x.id === card.dataset.course); if (!c || !c.lessons.length) continue;
      const done = c.lessons.filter((s) => store.isLessonDone(s)).length; const pct = Math.round((done / c.lessons.length) * 100);
      const bar = $('[data-progressbar]', card); bar.setAttribute('aria-valuenow', pct); $('span', bar).style.width = pct + '%';
      $('[data-progress-text]', card).textContent = `${done} of ${c.lessons.length} lessons complete`;
      const next = c.lessons.find((s) => !store.isLessonDone(s)); const cta = $('[data-course-cta]', card);
      cta.firstChild.textContent = done === 0 ? `Start ${c.level} ` : next ? `Continue ${c.level} ` : `Review ${c.level} `;
      cta.href = url('/lessons/' + (next || c.lessons[0]) + '/');
    }
  };
  paint(); store.on(paint);
  if (location.hash) $(location.hash)?.scrollIntoView();
}
