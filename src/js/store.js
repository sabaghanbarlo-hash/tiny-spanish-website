// Progress store: everything lives in localStorage under one key. No servers, no accounts.
// createStore() takes an injectable storage + clock so it can be unit-tested (see tests/store.test.mjs).
const KEY = 'tinyspanish.v1';
export const XP = { lesson: 20, quizPoint: 5, perfect: 10 };

export const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const emptyState = () => ({ v: 1, lessons: {}, quizzes: {}, words: {}, days: {}, xp: 0, prefs: { pron: true, en: true } });

function memoryStorage() { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; }
function browserStorage() {
  try { const t = '__ts'; localStorage.setItem(t, '1'); localStorage.removeItem(t); return localStorage; } catch { return memoryStorage(); } // private mode / blocked storage
}

export function createStore(storage = browserStorage(), now = () => new Date()) {
  const listeners = new Set();
  let state;
  const load = () => {
    try { const raw = storage.getItem(KEY); state = raw ? { ...emptyState(), ...JSON.parse(raw) } : emptyState(); } catch { state = emptyState(); }
    state.prefs = { ...emptyState().prefs, ...state.prefs };
  };
  const save = () => { try { storage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked: keep working in memory */ } listeners.forEach((fn) => fn(state)); };
  const touch = () => { state.days[dayKey(now())] = true; };
  load();

  const streak = () => {
    const days = Object.keys(state.days).sort();
    const today = now(); const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let current = 0; const cur = new Date(t0);
    if (!state.days[dayKey(cur)]) cur.setDate(cur.getDate() - 1); // today not done yet: streak is still alive until midnight
    while (state.days[dayKey(cur)]) { current++; cur.setDate(cur.getDate() - 1); }
    let longest = 0, run = 0, prev = null;
    for (const k of days) {
      const [y, m, d] = k.split('-').map(Number); const dt = new Date(y, m - 1, d);
      run = prev && Math.round((dt - prev) / 86400000) === 1 ? run + 1 : 1; prev = dt; longest = Math.max(longest, run);
    }
    return { current, longest, doneToday: !!state.days[dayKey(t0)] };
  };

  return {
    get state() { return state; },
    on(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    isLessonDone: (slug) => !!state.lessons[slug],
    setLessonDone(slug, done) {
      const was = !!state.lessons[slug]; let xp = 0;
      if (done && !was) { state.lessons[slug] = dayKey(now()); state.xp += XP.lesson; xp = XP.lesson; touch(); }
      if (!done && was) { delete state.lessons[slug]; state.xp = Math.max(0, state.xp - XP.lesson); }
      save(); return { changed: done !== was, xp };
    },
    recordQuiz(id, score, total) {
      const q = state.quizzes[id] || { best: 0, total, attempts: 0, history: [] };
      const prevBest = q.best || 0; const improved = score > prevBest;
      let xp = improved ? (score - prevBest) * XP.quizPoint : 0;
      if (score === total && prevBest !== total) xp += XP.perfect;
      q.best = Math.max(prevBest, score); q.total = total; q.last = score; q.attempts += 1;
      q.history = [...q.history, { s: score, t: total, at: dayKey(now()) }].slice(-10);
      state.quizzes[id] = q; state.xp += xp; touch(); save();
      return { xp, improved, best: q.best };
    },
    toggleWord(es, on) { if (on ?? !state.words[es]) state.words[es] = true; else delete state.words[es]; save(); return !!state.words[es]; },
    isWordKnown: (es) => !!state.words[es],
    setPref(k, v) { state.prefs[k] = !!v; save(); },
    streak,
    level: () => Math.floor(state.xp / 100) + 1,
    export: () => JSON.stringify(state, null, 2),
    import(json) {
      const data = JSON.parse(json);
      if (!data || typeof data !== 'object' || data.v !== 1 || typeof data.lessons !== 'object' || typeof data.quizzes !== 'object') throw new Error('Not a Tiny Spanish backup file');
      state = { ...emptyState(), ...data }; save();
    },
    reset() { state = emptyState(); try { storage.removeItem(KEY); } catch { /* ignore */ } listeners.forEach((fn) => fn(state)); },
  };
}

export function computeBadges(state, catalog, streak) {
  const done = Object.keys(state.lessons).length;
  const a1 = catalog.courses.find((c) => c.id === 'a1');
  const a1Done = a1 ? a1.lessons.every((s) => state.lessons[s]) : false;
  const quizzes = Object.values(state.quizzes);
  return [
    { id: 'first', emoji: '🌱', title: 'First steps', text: 'Complete a lesson', on: done >= 1 },
    { id: 'five', emoji: '📚', title: 'Bookworm', text: 'Complete 5 lessons', on: done >= 5 },
    { id: 'a1', emoji: '🏆', title: 'A1 graduate', text: 'Finish every A1 lesson', on: a1Done },
    { id: 'quiz', emoji: '✏️', title: 'Quiz time', text: 'Finish a quiz', on: quizzes.length >= 1 },
    { id: 'perfect', emoji: '💯', title: 'Perfect score', text: 'Score 100% on a quiz', on: quizzes.some((q) => q.best === q.total) },
    { id: 'streak3', emoji: '🔥', title: '3-day streak', text: 'Learn 3 days in a row', on: streak.longest >= 3 },
    { id: 'streak7', emoji: '🌟', title: 'Week warrior', text: 'Learn 7 days in a row', on: streak.longest >= 7 },
    { id: 'words', emoji: '🗣️', title: 'Word collector', text: 'Mark 10 words as learned', on: Object.keys(state.words).length >= 10 },
  ];
}
