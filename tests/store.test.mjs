import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore, dayKey, computeBadges } from '../src/js/store.js';

const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) }; };
const at = (s) => () => new Date(s + 'T12:00:00');

test('completing a lesson awards XP once and is undoable', () => {
  const st = createStore(mem(), at('2026-11-20'));
  assert.equal(st.setLessonDone('hola', true).xp, 20);
  assert.equal(st.setLessonDone('hola', true).xp, 0);
  assert.equal(st.state.xp, 20);
  st.setLessonDone('hola', false);
  assert.equal(st.state.xp, 0); assert.equal(st.isLessonDone('hola'), false);
});

test('quiz XP only rewards improvement; perfect bonus once', () => {
  const st = createStore(mem(), at('2026-11-20'));
  assert.equal(st.recordQuiz('q', 5, 8).xp, 25);
  assert.equal(st.recordQuiz('q', 4, 8).xp, 0);
  assert.equal(st.recordQuiz('q', 8, 8).xp, 15 + 10);
  assert.equal(st.recordQuiz('q', 8, 8).xp, 0);
  assert.equal(st.state.quizzes.q.best, 8); assert.equal(st.state.quizzes.q.attempts, 4);
});

test('streak counts consecutive days and survives until midnight', () => {
  const store = mem(); let day = '2026-11-17';
  const st = createStore(store, () => new Date(day + 'T09:00:00'));
  for (const d of ['2026-11-17', '2026-11-18', '2026-11-19']) { day = d; st.setLessonDone('l' + d, true); }
  day = '2026-11-20'; // not studied yet today: streak still alive
  assert.deepEqual(st.streak(), { current: 3, longest: 3, doneToday: false });
  day = '2026-11-22'; // missed a day: streak broken, longest remembered
  assert.equal(st.streak().current, 0); assert.equal(st.streak().longest, 3);
});

test('state persists, exports, imports and resets', () => {
  const store = mem();
  const a = createStore(store, at('2026-11-20')); a.setLessonDone('hola', true); a.toggleWord('hola');
  const b = createStore(store, at('2026-11-20'));
  assert.ok(b.isLessonDone('hola')); assert.ok(b.isWordKnown('hola'));
  const backup = b.export(); b.reset(); assert.equal(Object.keys(b.state.lessons).length, 0);
  b.import(backup); assert.ok(b.isLessonDone('hola'));
  assert.throws(() => b.import('{"v":2}'));
  assert.throws(() => b.import('not json'));
});

test('corrupt storage falls back to a clean state', () => {
  const s = mem(); s.setItem('tinyspanish.v1', '{oops'); assert.equal(createStore(s).state.xp, 0);
});

test('badges unlock from state', () => {
  const st = createStore(mem(), at('2026-11-20')); st.setLessonDone('hola', true); st.recordQuiz('q', 8, 8);
  const cat = { courses: [{ id: 'a1', lessons: ['hola', 'x'] }] };
  const on = computeBadges(st.state, cat, st.streak()).filter((b) => b.on).map((b) => b.id);
  assert.deepEqual(on, ['first', 'quiz', 'perfect']);
  assert.equal(dayKey(new Date(2026, 0, 5)), '2026-01-05');
});
