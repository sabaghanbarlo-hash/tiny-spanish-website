import { $, $$, loadJSON, url, esc, toast } from '../ui.js';
import { computeBadges, dayKey } from '../store.js';

export async function init(store) {
  const catalog = await loadJSON('catalog'); const quizInfo = Object.fromEntries(catalog.quizzes.map((q) => [q.id, q])); const lessonInfo = Object.fromEntries(catalog.lessons.map((l) => [l.slug, l]));

  const render = () => {
    const st = store.state; const s = store.streak(); const done = Object.keys(st.lessons).filter((k) => lessonInfo[k]);
    const results = Object.entries(st.quizzes).filter(([id]) => quizInfo[id]);
    const avg = results.length ? Math.round(results.reduce((a, [, r]) => a + (r.best / r.total) * 100, 0) / results.length) : null;
    const set = (k, v) => { const el = $(`[data-stat="${k}"]`); if (el) el.textContent = v; };
    set('streak', s.current); set('longest', `Best: ${s.longest} day${s.longest === 1 ? '' : 's'}`); set('lessons', done.length); set('lessons-of', `of ${catalog.lessons.length} in A1`);
    set('xp', st.xp); set('level', `Level ${store.level()}`); set('avg', avg === null ? '–' : avg + '%'); set('quizzes', `${results.length} quiz${results.length === 1 ? '' : 'zes'} taken`);

    $('[data-course-progress]').innerHTML = catalog.courses.map((c) => {
      if (!c.lessons.length) return `<div class="cp-row"><div><span>${c.level} ${esc(c.title)}</span><span class="muted">Coming soon</span></div><div class="progress"><span style="width:0"></span></div></div>`;
      const n = c.lessons.filter((x) => st.lessons[x]).length; const pct = Math.round((n / c.lessons.length) * 100);
      return `<div class="cp-row"><div><span>${c.level} ${esc(c.title)}</span><span>${n}/${c.lessons.length}</span></div><div class="progress" role="progressbar" aria-label="${c.level} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div></div>`;
    }).join('');

    const heat = $('[data-heat]'); const today = new Date(); let on = 0; heat.innerHTML = '';
    for (let d = 27; d >= 0; d--) { const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d); const k = dayKey(dt); const i = document.createElement('i'); const active = !!st.days[k]; if (active) { i.className = 'on'; on++; } if (d === 0) i.classList.add('today'); i.title = `${k}${active ? ': learned' : ''}`; heat.append(i); }
    heat.setAttribute('aria-label', `${on} of the last 28 days active`);

    $('[data-badges]').innerHTML = computeBadges(st, catalog, s).map((b) => `<li class="${b.on ? '' : 'locked'}"><span class="b-emoji" aria-hidden="true">${b.emoji}</span><strong>${b.title}</strong><small>${b.on ? 'Earned!' : b.text}</small></li>`).join('');

    $('[data-scores]').innerHTML = results.length
      ? `<div class="table-wrap"><table class="score-table"><thead><tr><th scope="col">Quiz</th><th scope="col">Best</th><th scope="col">Last</th><th scope="col">Tries</th></tr></thead><tbody>${results.map(([id, r]) => `<tr><th scope="row">${esc(quizInfo[id].title)}</th><td>${r.best}/${r.total}</td><td>${r.last}/${r.total}</td><td>${r.attempts}</td></tr>`).join('')}</tbody></table></div>`
      : `<p class="muted">No quizzes yet. <a href="${url('/quizzes/')}">Take your first quiz</a>.</p>`;

    $('[data-done]').innerHTML = done.length
      ? `<ul class="unit-lessons">${done.map((k) => `<li><a class="is-done" href="${url('/lessons/' + k + '/')}"><span class="dot"></span>${esc(lessonInfo[k].title)}</a></li>`).join('')}</ul>`
      : `<p class="muted">Nothing here yet. <a href="${url('/lessons/hola/')}">Start with ¡Hola!</a></p>`;
  };
  render(); store.on(render);

  $('[data-export]').addEventListener('click', () => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([store.export()], { type: 'application/json' })); a.download = `tiny-spanish-progress-${dayKey(new Date())}.json`; a.click(); URL.revokeObjectURL(a.href); toast('Backup downloaded');
  });
  $('[data-import]').addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { store.import(await f.text()); toast('Progress restored'); } catch { toast('That file could not be imported'); }
    e.target.value = '';
  });
  $('[data-reset]').addEventListener('click', () => { if (confirm('Reset all progress on this device? This cannot be undone.')) { store.reset(); toast('Progress reset'); } });
}
