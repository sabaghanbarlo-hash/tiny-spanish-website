import { $, loadJSON, toast, url, confetti } from '../ui.js';

export async function init(store) {
  const root = $('[data-lesson-page]'); if (!root) return;
  const slug = root.dataset.lessonPage;
  const btn = $('[data-complete]'), label = $('[data-complete-label]'), msg = $('[data-complete-msg]');
  const paint = () => {
    const done = store.isLessonDone(slug);
    label.textContent = done ? 'Completed (tap to undo)' : 'Mark lesson complete';
    btn.classList.toggle('btn-outline', done); btn.classList.toggle('btn-primary', !done); btn.setAttribute('aria-pressed', done);
  };
  paint();
  btn.addEventListener('click', async () => {
    const wasDone = store.isLessonDone(slug);
    const { xp } = store.setLessonDone(slug, !wasDone);
    paint();
    if (!wasDone) {
      toast(`Lesson complete! +${xp} XP 🎉`); confetti(btn.closest('.side-card'));
      const catalog = await loadJSON('catalog'); const i = catalog.lessons.findIndex((l) => l.slug === slug); const next = catalog.lessons[i + 1];
      msg.innerHTML = next ? `Nice work! Next up: <a href="${url('/lessons/' + next.slug + '/')}">${next.title}</a>. Or lock it in with the quiz.` : 'You finished the last A1 lesson!';
    } else msg.textContent = '';
  });
}
