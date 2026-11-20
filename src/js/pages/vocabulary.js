import { $, $$ } from '../ui.js';

const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function init(store) {
  const input = $('[data-vocab-search]'), count = $('[data-count]'), empty = $('[data-empty]');
  const topics = $$('.vocab-topic'); const cards = $$('.word-card');
  let topic = '';
  // Reflect saved "learned" words.
  for (const c of cards) { const on = store.isWordKnown(c.dataset.word); c.classList.toggle('is-known', on); $('.know', c).setAttribute('aria-pressed', on); }
  const apply = () => {
    const q = fold(input.value.trim()); let shown = 0;
    for (const t of topics) {
      const inTopic = !topic || t.dataset.topic === topic; let any = false;
      for (const c of $$('.word-card', t)) { const ok = inTopic && (!q || fold(c.dataset.search).includes(q)); c.hidden = !ok; if (ok) { any = true; shown++; } }
      t.hidden = !any;
    }
    const known = cards.filter((c) => store.isWordKnown(c.dataset.word)).length;
    count.textContent = `${shown} word${shown === 1 ? '' : 's'} shown · ${known} of ${cards.length} learned`; empty.hidden = shown > 0;
  };
  input.addEventListener('input', apply);
  $('[data-chips="topic"]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', e.currentTarget).forEach((x) => x.classList.toggle('is-on', x === b)); topic = b.dataset.value; apply(); });
  document.addEventListener('click', (e) => {
    const k = e.target.closest('.know'); if (!k) return; const card = k.closest('.word-card');
    const on = store.toggleWord(card.dataset.word); k.setAttribute('aria-pressed', on); card.classList.toggle('is-known', on); apply();
  });
  apply();
}
