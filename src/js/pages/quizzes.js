import { $, $$, loadJSON, url, esc, toast, confetti } from '../ui.js';

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export async function init(store) {
  const quizzes = await loadJSON('quizzes');
  const byId = Object.fromEntries(quizzes.map((q) => [q.id, q]));
  const list = $('[data-quiz-list]'), stage = $('[data-quiz-stage]');
  let keyHandler = null;

  const paintBest = () => {
    for (const card of $$('[data-quiz]')) {
      const r = store.state.quizzes[card.dataset.quiz]; const el = $('[data-best]', card);
      if (r) { el.hidden = false; el.textContent = `Best ${r.best}/${r.total}`; } else el.hidden = true;
    }
  };
  paintBest();

  const stop = () => { if (keyHandler) { document.removeEventListener('keydown', keyHandler); keyHandler = null; } };
  const showList = () => { stop(); stage.hidden = true; stage.innerHTML = ''; list.hidden = false; paintBest(); };
  const open = (id) => {
    const quiz = byId[id]; if (!quiz) return showList();
    list.hidden = true; stage.hidden = false; start(quiz); stage.scrollIntoView({ block: 'start' }); stage.focus?.();
  };

  function start(quiz) {
    stop();
    const qs = shuffle(quiz.questions).map((q) => ({ ...q, choices: shuffle([q.answer, ...q.wrong]) }));
    let i = 0, score = 0, answered = false; const missed = [];

    const back = `<button class="btn btn-ghost btn-sm" type="button" data-back>← All quizzes</button>`;
    const render = () => {
      answered = false; const q = qs[i];
      stage.innerHTML = `<div class="q-top">${back}<span class="q-title">${esc(quiz.title)}</span><span aria-live="off">${i + 1} / ${qs.length}</span></div>
        <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${i}"><span style="width:${(i / qs.length) * 100}%"></span></div>
        <div class="card q-card" style="margin-top:1rem"><h2 class="q-text" id="q-text" tabindex="-1">${esc(q.q)}</h2>
        <div class="choices" role="group" aria-labelledby="q-text">${q.choices.map((c, k) => `<button class="choice" type="button" data-choice="${esc(c)}"><span class="key" aria-hidden="true">${k + 1}</span><span>${esc(c)}</span></button>`).join('')}</div>
        <div data-feedback aria-live="polite"></div><div class="q-next" hidden><button class="btn btn-primary" type="button" data-next>${i + 1 === qs.length ? 'See my score' : 'Next question'}</button></div></div>`;
      $('#q-text').focus({ preventScroll: true });
    };

    const answer = (btn) => {
      if (answered) return; answered = true; const q = qs[i]; const right = btn.dataset.choice === q.answer;
      $$('.choice', stage).forEach((b) => { b.disabled = true; if (b.dataset.choice === q.answer) b.classList.add('is-correct'); });
      if (right) score++; else { btn.classList.add('is-wrong'); missed.push(q); }
      $('[data-feedback]', stage).innerHTML = `<div class="feedback ${right ? 'ok' : 'no'}">${right ? '✔ Correct! Great job.' : `✘ Not quite. The answer is “${esc(q.answer.replace(/[.!?]+$/, ''))}”.`}<p>${esc(q.explain)}</p></div>`;
      const nx = $('.q-next', stage); nx.hidden = false; $('[data-next]', stage).focus();
    };

    const finish = () => {
      stop(); const total = qs.length; const pct = Math.round((score / total) * 100); const res = store.recordQuiz(quiz.id, score, total);
      const stars = pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
      const msg = pct === 100 ? '¡Perfecto! Flawless!' : pct >= 70 ? '¡Muy bien! Great work.' : pct >= 40 ? 'Good try. A little more practice and you’ve got it.' : 'Keep going. Every attempt helps you learn.';
      const tpl = pct >= 70 ? ($('#tpl-emma-happy').innerHTML + $('#tpl-mateo-happy').innerHTML) : $('#tpl-emma-try').innerHTML;
      stage.innerHTML = `<div class="card result"><div style="display:flex;justify-content:center;gap:.5rem">${tpl}</div>
        <p class="score-big" aria-live="polite">${score} / ${total}</p><p class="stars" aria-label="${stars} out of 3 stars">${[0, 1, 2].map((s) => `<span class="${s < stars ? '' : 'off'}">★</span>`).join('')}</p>
        <p><strong>${msg}</strong></p><p class="muted">${res.xp ? `+${res.xp} XP earned. ` : ''}Best score: ${res.best}/${total}</p>
        <div class="btn-row"><button class="btn btn-primary" type="button" data-retry>Try again</button>${quiz.lesson ? `<a class="btn btn-outline" href="${url('/lessons/' + quiz.lesson + '/')}">Back to lesson</a>` : ''}<button class="btn btn-outline" type="button" data-back>All quizzes</button></div>
        ${missed.length ? `<div class="review"><h3>Review these</h3><ul>${missed.map((m) => `<li><strong>${esc(m.q)}</strong><br>${esc(m.answer)}</li>`).join('')}</ul></div>` : ''}</div>`;
      if (pct >= 80) confetti($('.result', stage)); if (store.streak().current === 1 && res.xp) toast('Streak started! Come back tomorrow 🔥');
    };

    stage.onclick = (e) => {
      const c = e.target.closest('[data-choice]'); if (c) return answer(c);
      if (e.target.closest('[data-next]')) { i++; return i < qs.length ? render() : finish(); }
      if (e.target.closest('[data-retry]')) return start(quiz);
      if (e.target.closest('[data-back]')) { location.hash = ''; showList(); history.replaceState(null, '', location.pathname); }
    };
    keyHandler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return; const n = Number(e.key);
      if (n >= 1 && n <= 4 && !answered) { $$('.choice', stage)[n - 1]?.click(); }
    };
    document.addEventListener('keydown', keyHandler);
    render();
  }

  list.addEventListener('click', (e) => { const c = e.target.closest('[data-quiz]'); if (c) { history.pushState(null, '', '#' + c.dataset.quiz); open(c.dataset.quiz); } });
  window.addEventListener('popstate', () => (location.hash.length > 1 ? open(location.hash.slice(1)) : showList()));
  window.addEventListener('hashchange', () => (location.hash.length > 1 ? open(location.hash.slice(1)) : showList()));
  if (location.hash.length > 1) open(location.hash.slice(1));
}
