// Static site generator: node build.mjs  ->  dist/
// Env: SITE_URL (canonical origin, for sitemap/OG), BASE_PATH (e.g. /tiny-spanish-website for GitHub Pages project sites).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessons } from './data/lessons.js';
import { courses } from './data/courses.js';
import { vocabTopics } from './data/vocabulary.js';
import { quizzes } from './lib/quizzes.mjs';
import { page, SITE, favicon } from './lib/layout.mjs';
import * as P from './lib/pages.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });

const write = (rel, content) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const copyDir = (from, to) => {
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, path.join(dist, to), { recursive: true });
};

// 1. Pages
const pages = [P.home(), P.lessonsIndex(), P.coursesPage(), P.vocabularyPage(), P.grammarPage(), P.quizzesPage(), P.progressPage(),
  ...lessons.map((l, i) => P.lessonPage(l, i))];
for (const p of pages) write(p.path === '/' ? 'index.html' : `${p.path.replace(/^\//, '')}index.html`, page(p));
const nf = P.notFound();
write('404.html', page(nf));

// 2. Client data (small JSON the browser fetches)
const catalog = {
  lessons: lessons.map(({ slug, n, title, subtitle, topic, course, minutes }) => ({ slug, n, title, subtitle, topic, course, minutes })),
  courses: courses.map((c) => ({ id: c.id, level: c.level, title: c.title, status: c.status, lessons: c.units.flatMap((u) => u.lessons) })),
  quizzes: quizzes.map((q) => ({ id: q.id, title: q.title, kind: q.kind, lesson: q.lesson || null, count: q.questions.length })),
  words: vocabTopics.flatMap((t) => t.words.map((w) => [w.es, w.en, w.pron])),
};
write('data/catalog.json', JSON.stringify(catalog));
write('data/quizzes.json', JSON.stringify(quizzes.map(({ id, title, kind, lesson, emoji, desc, questions }) => ({ id, title, kind, lesson, emoji, desc, questions }))));

// 3. Static assets
copyDir(path.join(root, 'src/css'), 'css');
copyDir(path.join(root, 'src/js'), 'js');
copyDir(path.join(root, 'public'), '');
write('assets/favicon.svg', favicon());
write('manifest.webmanifest', JSON.stringify({ name: 'Tiny Spanish', short_name: 'Tiny Spanish', start_url: SITE.base + '/', display: 'standalone', background_color: '#FFF6EA', theme_color: '#C8202F', icons: [{ src: SITE.base + '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.url}${SITE.base}/sitemap.xml\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}${SITE.base}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
write('_headers', '/css/*\n  Cache-Control: public, max-age=3600\n/js/*\n  Cache-Control: public, max-age=3600\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');

console.log(`Built ${pages.length + 1} pages, ${quizzes.length} quizzes -> dist/`);
