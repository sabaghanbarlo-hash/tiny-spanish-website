import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { lessons } from '../data/lessons.js';
import { courses } from '../data/courses.js';
import { quizzes } from '../lib/quizzes.mjs';

const dist = path.resolve('dist');
const read = (p) => fs.readFileSync(path.join(dist, p), 'utf8');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

test('lesson data is complete and unique', () => {
  assert.equal(new Set(lessons.map((l) => l.slug)).size, lessons.length);
  for (const l of lessons) {
    assert.ok(l.sentences.length >= 3 && l.vocab.length >= 4, l.slug);
    for (const s of [...l.sentences, ...l.vocab]) { assert.ok(s.es && s.en && s.pron, `${l.slug}: missing field`); }
  }
});

test('every lesson referenced by a course exists, and every A1 lesson is in a unit', () => {
  const slugs = new Set(lessons.map((l) => l.slug));
  const used = courses.flatMap((c) => c.units.flatMap((u) => u.lessons));
  for (const s of used) assert.ok(slugs.has(s), `unknown lesson ${s}`);
  for (const l of lessons) assert.ok(used.includes(l.slug), `${l.slug} not in any unit`);
});

test('quizzes are well-formed', () => {
  assert.equal(new Set(quizzes.map((q) => q.id)).size, quizzes.length);
  for (const q of quizzes) {
    assert.ok(q.questions.length >= 6, q.id);
    for (const x of q.questions) {
      const all = [x.answer, ...x.wrong];
      assert.equal(all.length, 4, `${q.id}: ${x.q}`);
      assert.equal(new Set(all.map((a) => a.toLowerCase())).size, 4, `${q.id}: duplicate choices in "${x.q}"`);
    }
  }
});

test('built site: every internal link and asset resolves', () => {
  const files = walk(dist).filter((f) => f.endsWith('.html'));
  assert.ok(files.length >= 20);
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    assert.match(html, /<title>.+<\/title>/); assert.match(html, /<meta name="description"/); assert.match(html, /<h1[ >]/, f);
    for (const [, u] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
      const target = path.join(dist, u.endsWith('/') ? u + 'index.html' : u);
      assert.ok(fs.existsSync(target), `${path.relative(dist, f)} links to missing ${u}`);
    }
  }
});

test('catalog JSON, sitemap and robots exist', () => {
  assert.equal(JSON.parse(read('data/catalog.json')).lessons.length, lessons.length);
  assert.equal(JSON.parse(read('data/quizzes.json')).length, quizzes.length);
  assert.match(read('sitemap.xml'), /lessons\/hola\//); assert.match(read('robots.txt'), /Sitemap:/);
});
