// Builds the full quiz catalog: hand-written grammar quizzes + auto-generated lesson and vocabulary quizzes.
import { lessons } from '../data/lessons.js';
import { vocabTopics } from '../data/vocabulary.js';
import { customQuizzes } from '../data/quizzes.js';

function rng(seedStr) {
  let h = 2166136261;
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0), (h >>> 0) / 4294967296);
}
const shuffle = (arr, r) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const strip = (t) => t.replace(/[.!?]+$/, '');
const norm = (s) => s.toLowerCase().replace(/[.!?¡¿]/g, '').trim();

function pickDistractors(pool, answer, count, r) {
  const seen = new Set([norm(answer)]);
  const out = [];
  for (const item of shuffle(pool, r)) {
    if (!seen.has(norm(item))) { seen.add(norm(item)); out.push(item); }
    if (out.length === count) break;
  }
  return out;
}

const allWords = lessons.flatMap((l) => l.vocab).concat(vocabTopics.flatMap((t) => t.words));
const wordPoolEn = [...new Set(allWords.map((w) => w.en))];
const wordPoolEs = [...new Set(allWords.map((w) => w.es))];
const sentencePoolEn = lessons.flatMap((l) => l.sentences.map((s) => s.en));

function lessonQuiz(l) {
  const r = rng('lesson-' + l.slug);
  const questions = [];
  for (const w of shuffle(l.vocab, r).slice(0, 5)) {
    questions.push({ q: `What does “${w.es}” mean?`, answer: w.en, wrong: pickDistractors(wordPoolEn, w.en, 3, r), explain: `“${strip(w.es)}” means “${strip(w.en)}”. Say it: ${w.pron}.` });
  }
  for (const s of shuffle(l.sentences, r).slice(0, 3)) {
    questions.push({ q: `Which is the English for “${s.es}”?`, answer: s.en, wrong: pickDistractors(sentencePoolEn, s.en, 3, r), explain: `“${strip(s.es)}” means “${strip(s.en)}”. Say it: ${s.pron}.` });
  }
  return { id: `lesson-${l.slug}`, kind: 'lesson', level: l.level, lesson: l.slug, title: l.title, emoji: '🎬', desc: `Check what you learned in “${l.title}”.`, questions };
}

function vocabQuiz(t) {
  const r = rng('vocab-' + t.id);
  const questions = shuffle(t.words, r).slice(0, 8).map((w, i) => {
    if (i % 2 === 0) return { q: `What does “${w.es}” mean?`, answer: w.en, wrong: pickDistractors(wordPoolEn, w.en, 3, r), explain: `“${w.es}” (${w.pron}) means “${w.en}”.` };
    return { q: `How do you say “${w.en}” in Spanish?`, answer: w.es, wrong: pickDistractors(wordPoolEs, w.es, 3, r), explain: `“${w.en}” is “${w.es}” (${w.pron}).` };
  });
  return { id: `vocab-${t.id}`, kind: 'vocab', level: 'A1', title: t.title, emoji: t.emoji, desc: `Words about ${t.title.toLowerCase()}.`, questions };
}

export const quizzes = [
  ...lessons.map(lessonQuiz),
  ...customQuizzes,
  ...vocabTopics.map(vocabQuiz),
];
