// Page bodies. Each function returns { id, title, description, path, body, jsonld }.
import { lessons } from '../data/lessons.js';
import { courses } from '../data/courses.js';
import { vocabTopics } from '../data/vocabulary.js';
import { grammar } from '../data/grammar.js';
import { quizzes } from './quizzes.mjs';
import { character, art, skyline, buildings, flag, cityLights } from './characters.mjs';
import { testimonials } from '../data/testimonials.js';
import { SITE, href, esc, icon, avatar, levelBadge, lessonCard } from './layout.mjs';

const bySlug = Object.fromEntries(lessons.map((l) => [l.slug, l]));
const POPULAR = ['hola', 'como-estas', 'libreria', 'alergico'];
const speakBtn = (text, label = 'Listen', slow = false, audio = '') =>
  `<button class="speak" type="button" data-speak="${esc(text)}"${slow ? ' data-slow="1"' : ''}${audio && !slow ? ` data-audio="${esc(href(audio))}"` : ''} aria-label="${label}: ${esc(text)}">${icon('sound')}<span class="sr-only">${label}</span></button>`;

/* ---------------- Home ---------------- */
export function home() {
  const popular = POPULAR.map((s) => lessonCard(bySlug[s])).join('');
  const courseCards = courses.map((c) => `
    <a class="card course-mini course-${c.color}${c.status === 'soon' ? ' is-soon' : ''}" href="${href('/courses/#' + c.id)}">
      <span class="course-level">${c.level}</span><strong>${esc(c.title)}</strong><small>${esc(c.tagline)}</small>
      <span class="course-state">${c.status === 'open' ? `${c.units.flatMap((u) => u.lessons).length} lessons` : 'Coming soon'}</span>
    </a>`).join('');
  const benefits = [
    ['playcircle', 'Fun lessons', 'Short, story-based lessons with Emma and Mateo.'],
    ['bars', 'Beginner friendly', 'Start from zero with clear steps.'],
    ['bubble', 'Real-life Spanish', 'Useful phrases for cafés, shops and travel.'],
    ['trophy', 'Track your progress', 'Streaks, scores and badges saved on your device.'],
  ].map(([i, t, d]) => `<li><span class="feat-icon">${icon(i)}</span><strong>${t}</strong><span>${d}</span></li>`).join('');
  const stars = (n) => `<span class="stars" role="img" aria-label="${n} out of 5 stars">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span>`;
  const reviews = testimonials.length ? `
<section class="wrap section" aria-labelledby="rev-h">
  <h2 id="rev-h" class="section-title"><span class="spark" aria-hidden="true"></span>What our learners say<span class="spark flip" aria-hidden="true"></span></h2>
  <div class="carousel">
    <button class="car-btn" type="button" data-car="-1" aria-label="Previous review">‹</button>
    <ul class="tlist" data-tlist>${testimonials.map((t) => `<li class="card tcard"><span class="tavatar" aria-hidden="true">${esc(t.name.trim()[0] || '?')}</span>${stars(t.stars || 5)}<blockquote>“${esc(t.quote)}”</blockquote><cite>${esc(t.name)}</cite></li>`).join('')}</ul>
    <button class="car-btn" type="button" data-car="1" aria-label="Next review">›</button>
  </div>
</section>` : '';
  const wave = (cls, fill) => `<svg class="wave ${cls}" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 40 C180 90 360 0 540 30 S900 80 1080 36 S1340 10 1440 40 V80 H0Z" fill="${fill}"/></svg>`;
  const body = `
<section class="hero">
  <div class="hero-sky" aria-hidden="true">
    <span class="cloud c1"></span><span class="cloud c2"></span><span class="cloud c3"></span>
    <span class="sparkle s1">✦</span><span class="sparkle s2">✦</span><span class="sparkle s3">✦</span>
    <div class="hero-bld">${buildings()}</div>
    <div class="hero-skyline">${skyline()}</div>
    <div class="hero-flag">${flag()}</div>
  </div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <h1>Learn Spanish <span>with <em>Emma</em> &amp; <em>Mateo</em>!</span></h1>
      <p class="hero-tag">Tiny lessons. Big progress. <span class="heart" aria-hidden="true">♥</span></p>
      <div class="hero-cta">
        <a class="btn btn-primary btn-lg" href="${href('/lessons/hola/')}">Start Your Free Lesson ${icon('arrow')}</a>
        <span class="sparkle cta-spark" aria-hidden="true">✦</span>
      </div>
    </div>
    <div class="hero-chars">
      ${art('hero-duo', 480, 342, { cls: 'hero-duo', label: 'Emma waving a peace sign and Mateo giving a thumbs up' })}
    </div>
  </div>
  ${wave('hero-wave', '#FFF8EC')}
</section>

<section class="wrap feat-strip" aria-label="Why learners love Tiny Spanish"><span class="fstar f1" aria-hidden="true">★</span><span class="fstar f2" aria-hidden="true">★</span><ul class="feat-list">${benefits}</ul></section>

<section class="wrap section" id="continue" hidden aria-labelledby="continue-h">
  <h2 id="continue-h" class="section-title">Keep going!</h2>
  <div class="continue-card card" data-continue></div>
</section>

<section class="wrap section" aria-labelledby="popular-h">
  <div class="section-head"><h2 id="popular-h" class="section-title"><span class="spark" aria-hidden="true"></span>Popular Lessons<span class="spark flip" aria-hidden="true"></span></h2><a class="btn btn-outline btn-sm" href="${href('/lessons/')}">View All Lessons ${icon('arrow')}</a></div>
  <div class="grid grid-4">${popular}</div>
</section>

<section class="why" aria-labelledby="why-h">
  ${wave('why-wave-top', '#FFF8EC')}
  <div class="wrap why-inner">
    <div class="why-copy"><h2 id="why-h" class="section-title left">Why Tiny Spanish?</h2>
      <ul class="checks"><li>Simple explanations</li><li>Cheerful, clear visuals</li><li>Fun quizzes &amp; activities</li><li>Learn at your own pace</li></ul></div>
    <div class="why-chars" aria-hidden="true">${art('why-hug', 415, 255, { cls: 'why-hug' })}<span class="heart h1">♥</span><span class="heart h2">♥</span><span class="heart h3">♥</span></div>
    <div class="bubble"><p>Because learning Spanish can be fun!</p><span aria-hidden="true">♥</span></div>
    <div class="why-flag" aria-hidden="true">${flag()}</div>
  </div>
  <div class="why-sky" aria-hidden="true">${skyline()}</div>
</section>

<section class="wrap section" aria-labelledby="paths-h">
  <div class="section-head"><h2 id="paths-h" class="section-title"><span class="spark" aria-hidden="true"></span>Choose your path<span class="spark flip" aria-hidden="true"></span></h2><a class="btn btn-outline btn-sm" href="${href('/courses/')}">All courses ${icon('arrow')}</a></div>
  <div class="grid grid-4">${courseCards}</div>
</section>
${reviews}
<section class="wrap section cta-wrap" aria-labelledby="cta-h">
  <div class="cta-card">
    <div class="skyline-wrap" aria-hidden="true">${skyline()}</div>
    <div class="cta-copy"><h2 id="cta-h">Ready to start your Spanish journey?</h2><a class="btn btn-gold btn-lg" href="${href('/lessons/hola/')}">Start Learning Now ${icon('arrow')}</a></div>
    <div class="cta-chars">${art('cta-duo', 415, 197, { cls: 'cta-duo' })}<span class="cta-bubble b1">¡Vamos!</span><span class="cta-bubble b2">¡Tú puedes!</span></div>
    <div class="cta-city" aria-hidden="true">${cityLights()}</div>
  </div>
</section>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url + SITE.base + '/', description: 'Learn Spanish with Emma and Mateo: short lessons, vocabulary, grammar, quizzes and progress tracking.' }];
  return { id: 'home', title: SITE.name, description: 'Learn Spanish with Emma & Mateo. Friendly beginner lessons, vocabulary with pronunciation, grammar and quizzes. Tiny lessons, big progress.', path: '/', body, jsonld };
}

/* ---------------- Lessons index ---------------- */
export function lessonsIndex() {
  const topics = [...new Set(lessons.map((l) => l.topic))];
  const body = `
<section class="page-head"><div class="wrap"><h1>Lessons</h1><p>Short, story-based Spanish lessons. Pick any lesson, listen, repeat, then check yourself with a quiz.</p></div></section>
<section class="wrap section">
  <div class="toolbar" role="group" aria-label="Filter lessons">
    <div class="chips" data-chips="topic" role="group" aria-label="Topic"><button class="chip is-on" type="button" data-value="">All</button>${topics.map((t) => `<button class="chip" type="button" data-value="${esc(t)}">${esc(t)}</button>`).join('')}</div>
    <label class="select-wrap">Show <select data-status-filter aria-label="Filter by status"><option value="">All lessons</option><option value="todo">To do</option><option value="done">Completed</option></select></label>
  </div>
  <p class="muted" data-count aria-live="polite">${lessons.length} lessons</p>
  <div class="grid grid-4" data-lesson-grid>${lessons.map((l) => lessonCard(l)).join('')}</div>
  <p class="empty" data-empty hidden>No lessons match. Try another filter.</p>
</section>`;
  return { id: 'lessons', title: 'Spanish Lessons', description: 'Beginner Spanish lessons with dialogues, English translations, pronunciation guides and vocabulary.', path: '/lessons/', body };
}

/* ---------------- Lesson detail ---------------- */
function videoBlock(l) {
  const v = l.video;
  if (v?.type === 'youtube') return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}" title="${esc(l.title)} video lesson" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
  if (v?.type === 'file') return `<div class="video-frame"><video controls preload="metadata" ${v.poster ? `poster="${esc(v.poster)}"` : ''} src="${esc(v.src)}"><track kind="captions" srclang="en" label="English"></video></div>`;
  return `<div class="video-frame video-placeholder scene-${l.scene}"><div class="vp-chars">${character('emma', { head: true, mood: 'open' })}${character('mateo', { head: true })}</div><p><strong>Video lesson coming soon</strong><span>Read and listen to the dialogue below in the meantime.</span></p></div>`;
}

export function lessonPage(l, i) {
  const prev = lessons[i - 1], next = lessons[i + 1];
  const sentences = l.sentences.map((s, k) => `
    <li class="line line-${s.who}">
      ${avatar(s.who)}
      <div class="line-body"><p class="line-es" lang="es">${esc(s.es)}</p><p class="line-pron" data-pron>${esc(s.pron)}</p><p class="line-en" data-en>${esc(s.en)}</p></div>
      <div class="line-actions">${speakBtn(s.es, 'Listen', false, s.audio)}${speakBtn(s.es, 'Listen slowly', true).replace('class="speak"', 'class="speak speak-slow"')}</div>
    </li>`).join('');
  const vocab = l.vocab.map((w) => `<li class="word-card"><div><strong lang="es">${esc(w.es)}</strong><span class="pron" data-pron>${esc(w.pron)}</span><span class="en" data-en>${esc(w.en)}</span></div>${speakBtn(w.es)}</li>`).join('');
  const body = `
<section class="lesson-head scene-${l.scene}">
  <div class="wrap lesson-head-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${href('/lessons/')}">Lessons</a><span aria-hidden="true">›</span><span aria-current="page">Lesson ${l.n}</span></nav>
    <div class="lesson-title"><div><p class="eyebrow">${levelBadge(l.level)} <span class="badge">${esc(l.topic)}</span> <span class="badge">${l.minutes} min</span></p><h1>${esc(l.title)}</h1><p class="lead">${esc(l.subtitle)}. ${esc(l.intro)}</p></div>
    <div class="lesson-hero">${character(l.hero, { mood: 'open', pose: l.hero === 'emma' ? 'peace' : 'thumbs' })}</div></div>
  </div>
</section>
<div class="wrap lesson-layout" data-lesson-page="${l.slug}">
  <div class="lesson-main">
    ${videoBlock(l)}
    ${l.reviewNote ? `<p class="note note-warn"><strong>Please note:</strong> ${esc(l.reviewNote)}</p>` : ''}
    <div class="panel-head"><h2>Dialogue</h2>
      <div class="toggles"><label class="toggle"><input type="checkbox" data-toggle="pron" checked> Pronunciation</label><label class="toggle"><input type="checkbox" data-toggle="en" checked> English</label></div></div>
    <ol class="dialogue">${sentences}</ol>
    <h2>Words to learn</h2>
    <ul class="word-grid">${vocab}</ul>
    <aside class="tip card"><span class="tip-emoji" aria-hidden="true">💡</span><div><strong>Tiny tip</strong><p>${esc(l.tip)}</p></div></aside>
    ${l.reviewed ? '' : '<p class="note">Draft lesson: written to help you practice. A native-speaker review is still pending.</p>'}
  </div>
  <aside class="lesson-side">
    <div class="card side-card">
      <h2>Finished?</h2>
      <button class="btn btn-primary btn-block" type="button" data-complete>${icon('check')} <span data-complete-label>Mark lesson complete</span></button>
      <a class="btn btn-outline btn-block" href="${href('/quizzes/#lesson-' + l.slug)}">Take the quiz</a>
      <p class="muted small" data-complete-msg></p>
    </div>
  </aside>
</div>
<nav class="wrap lesson-pager" aria-label="More lessons">
  ${prev ? `<a class="btn btn-outline" href="${href('/lessons/' + prev.slug + '/')}">← ${esc(prev.title)}</a>` : '<span></span>'}
  ${next ? `<a class="btn btn-primary" href="${href('/lessons/' + next.slug + '/')}">${esc(next.title)} →</a>` : `<a class="btn btn-primary" href="${href('/courses/')}">Back to courses →</a>`}
</nav>`;
  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'LearningResource', name: `${l.title} – ${l.subtitle}`, description: l.intro,
    educationalLevel: l.level, inLanguage: ['en', 'es'], teaches: l.topic, learningResourceType: 'Lesson', timeRequired: `PT${l.minutes}M`,
    isPartOf: { '@type': 'Course', name: `Tiny Spanish ${l.level}`, provider: { '@type': 'Organization', name: SITE.name } },
  }];
  return { id: 'lesson', title: `${l.title}: ${l.subtitle}`, description: `${l.intro} Spanish phrases with English translation and pronunciation.`, path: `/lessons/${l.slug}/`, body, jsonld };
}

/* ---------------- Courses ---------------- */
export function coursesPage() {
  const cards = courses.map((c) => {
    const all = c.units.flatMap((u) => u.lessons);
    const units = c.status === 'open'
      ? c.units.map((u, ui) => `<li><h4>Unit ${ui + 1}: ${esc(u.title)}</h4><ul class="unit-lessons">${u.lessons.map((s) => `<li><a href="${href('/lessons/' + s + '/')}" data-course-lesson="${s}"><span class="dot" aria-hidden="true"></span>${esc(bySlug[s].title)}</a></li>`).join('')}</ul></li>`).join('')
      : c.planned.map((p, pi) => `<li><h4>Unit ${pi + 1}: ${esc(p)}</h4><p class="muted small">Planned</p></li>`).join('');
    return `<article class="card course course-${c.color}${c.status === 'soon' ? ' is-soon' : ''}" id="${c.id}" data-course="${c.id}" data-lessons="${all.join(',')}">
      <header><span class="course-level">${c.level}</span><div><h2>${esc(c.title)}</h2><p class="muted">${esc(c.tagline)}</p></div>${c.status === 'soon' ? '<span class="badge badge-soon">Coming soon</span>' : '<span class="badge badge-open">Open now</span>'}</header>
      <p>${esc(c.description)}</p>
      ${c.status === 'open' ? `<div class="progress" role="progressbar" aria-label="${c.level} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progressbar><span style="width:0%"></span></div><p class="small muted" data-progress-text>0 of ${all.length} lessons complete</p>` : ''}
      <ol class="units">${units}</ol>
      ${c.status === 'open' ? `<a class="btn btn-primary" href="${href('/lessons/' + all[0] + '/')}" data-course-cta>Start ${c.level} ${icon('arrow')}</a>` : '<button class="btn btn-outline" type="button" disabled>Lessons coming soon</button>'}
    </article>`;
  }).join('');
  const body = `
<section class="page-head"><div class="wrap"><h1>Courses</h1><p>Four clear learning paths from first words to confident conversation. Start with A1 and move up when you are ready.</p></div></section>
<section class="wrap section"><div class="course-grid">${cards}</div></section>`;
  const a1 = courses[0];
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Tiny Spanish A1: Beginner Spanish', description: a1.description, provider: { '@type': 'Organization', name: SITE.name, sameAs: SITE.url }, educationalLevel: 'Beginner', inLanguage: 'en', isAccessibleForFree: true }];
  return { id: 'courses', title: 'Spanish Courses A1–B2', description: 'Structured Spanish learning paths: A1 beginner now open, with A2, B1 and B2 coming soon.', path: '/courses/', body, jsonld };
}

/* ---------------- Vocabulary ---------------- */
export function vocabularyPage() {
  const sections = vocabTopics.map((t) => `
  <section class="vocab-topic" data-topic="${t.id}" aria-labelledby="vt-${t.id}">
    <h2 id="vt-${t.id}"><span aria-hidden="true">${t.emoji}</span> ${esc(t.title)}</h2>
    <ul class="word-grid">${t.words.map((w) => `<li class="word-card" data-word="${esc(w.es)}" data-search="${esc((w.es + ' ' + w.en).toLowerCase())}"><div><strong lang="es">${esc(w.es)}</strong><span class="pron" data-pron>${esc(w.pron)}</span><span class="en" data-en>${esc(w.en)}</span></div><div class="word-actions">${speakBtn(w.es)}<button class="know" type="button" aria-pressed="false" aria-label="Mark “${esc(w.es)}” as learned">${icon('check')}</button></div></li>`).join('')}</ul>
  </section>`).join('');
  const body = `
<section class="page-head"><div class="wrap"><h1>Vocabulary</h1><p>Search by Spanish or English, listen to each word, and tick the ones you know.</p></div></section>
<section class="wrap section">
  <div class="toolbar">
    <label class="search"><span class="sr-only">Search vocabulary</span>${icon('search')}<input type="search" placeholder="Search words, e.g. “agua” or “thank you”" data-vocab-search autocomplete="off"></label>
    <label class="toggle"><input type="checkbox" data-toggle="en" checked> Show English</label>
    <label class="toggle"><input type="checkbox" data-toggle="pron" checked> Show pronunciation</label>
  </div>
  <div class="chips" data-chips="topic" role="group" aria-label="Topic"><button class="chip is-on" type="button" data-value="">All topics</button>${vocabTopics.map((t) => `<button class="chip" type="button" data-value="${t.id}">${t.emoji} ${esc(t.title)}</button>`).join('')}</div>
  <p class="muted" data-count aria-live="polite"></p>
  <div data-vocab-list>${sections}</div>
  <p class="empty" data-empty hidden>No words found. Try another search.</p>
</section>`;
  return { id: 'vocabulary', title: 'Spanish Vocabulary', description: 'Searchable beginner Spanish vocabulary by topic with English translations and pronunciation guides.', path: '/vocabulary/', body };
}

/* ---------------- Grammar ---------------- */
export function grammarPage() {
  const toc = grammar.map((g) => `<li><a href="#${g.id}">${g.emoji} ${esc(g.title)}</a></li>`).join('');
  const topics = grammar.map((g) => `
  <article class="card grammar-topic" id="${g.id}">
    <header><span class="g-emoji" aria-hidden="true">${g.emoji}</span><div><h2>${esc(g.title)}</h2><p class="muted">${esc(g.summary)}</p></div>${levelBadge(g.level)}</header>
    ${g.body.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${g.table ? `<div class="table-wrap"><table><thead><tr>${g.table.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${g.table.rows.map((r) => `<tr>${r.map((c, ci) => (ci === 0 ? `<th scope="row">${esc(c)}</th>` : `<td lang="es">${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
    <h3>Examples</h3>
    <ul class="examples">${g.examples.map((e) => `<li><div><span class="ex-es" lang="es">${esc(e.es)}</span><span class="ex-en">${esc(e.en)}</span></div>${speakBtn(e.es.split(' → ')[0])}</li>`).join('')}</ul>
    <p class="tip-line"><span aria-hidden="true">💡</span> ${esc(g.tip)}</p>
  </article>`).join('');
  const body = `
<section class="page-head"><div class="wrap"><h1>Grammar</h1><p>Beginner-friendly explanations with real examples. No jargon overload.</p></div></section>
<div class="wrap grammar-layout">
  <nav class="grammar-toc card" aria-label="Grammar topics"><h2>Topics</h2><ol>${toc}</ol><a class="btn btn-primary btn-block" href="${href('/quizzes/#grammar-articles')}">Practice with a quiz</a></nav>
  <div class="grammar-list">${topics}</div>
</div>`;
  return { id: 'grammar', title: 'Spanish Grammar for Beginners', description: 'Simple Spanish grammar explanations with examples: gender, articles, ser vs estar, verbs, questions and more.', path: '/grammar/', body };
}

/* ---------------- Quizzes ---------------- */
export function quizzesPage() {
  const group = (kind, title, blurb) => {
    const list = quizzes.filter((q) => q.kind === kind);
    return `<section class="quiz-group" aria-labelledby="qg-${kind}"><h2 id="qg-${kind}">${title}</h2><p class="muted">${blurb}</p><div class="grid grid-3">${list.map((q) => `
      <button class="card quiz-card" type="button" data-quiz="${q.id}"><span class="quiz-emoji" aria-hidden="true">${q.emoji}</span><strong>${esc(q.title)}</strong><small>${esc(q.desc)}</small><span class="quiz-meta"><span>${q.questions.length} questions</span><span class="quiz-best" data-best hidden></span></span></button>`).join('')}</div></section>`;
  };
  const body = `
<section class="page-head"><div class="wrap"><h1>Quizzes</h1><p>Multiple-choice practice with instant feedback. Your best scores are saved on this device.</p></div></section>
<section class="wrap section">
  <div data-quiz-list>
    ${group('lesson', 'Lesson quizzes', 'Check what you learned in each lesson.')}
    ${group('grammar', 'Grammar quizzes', 'Practice the rules from the grammar page.')}
    ${group('vocab', 'Vocabulary quizzes', 'Review words by topic.')}
  </div>
  <div class="quiz-stage" data-quiz-stage hidden aria-live="polite"></div>
  <template id="tpl-emma-happy">${character('emma', { mood: 'open', pose: 'peace', label: 'Emma cheering' })}</template>
  <template id="tpl-mateo-happy">${character('mateo', { mood: 'open', pose: 'thumbs', label: 'Mateo cheering' })}</template>
  <template id="tpl-emma-try">${character('emma', { mood: 'smile', label: 'Emma encouraging you' })}</template>
</section>`;
  return { id: 'quizzes', title: 'Spanish Quizzes', description: 'Interactive multiple-choice Spanish quizzes for beginners with instant feedback and saved scores.', path: '/quizzes/', body };
}

/* ---------------- Progress ---------------- */
export function progressPage() {
  const body = `
<section class="page-head"><div class="wrap"><h1>My Progress</h1><p>Your lessons, scores and streaks. Everything is saved privately in this browser.</p></div></section>
<section class="wrap section" data-progress-root>
  <ul class="stat-grid" aria-label="Summary">
    <li class="card stat"><span class="stat-ico">${icon('flame')}</span><strong data-stat="streak">0</strong><span>day streak</span><small data-stat="longest">Best: 0 days</small></li>
    <li class="card stat"><span class="stat-ico">${icon('check')}</span><strong data-stat="lessons">0</strong><span>lessons done</span><small data-stat="lessons-of"></small></li>
    <li class="card stat"><span class="stat-ico">${icon('star')}</span><strong data-stat="xp">0</strong><span>XP earned</span><small data-stat="level"></small></li>
    <li class="card stat"><span class="stat-ico">${icon('trophy')}</span><strong data-stat="avg">–</strong><span>average quiz score</span><small data-stat="quizzes">0 quizzes taken</small></li>
  </ul>

  <div class="two-col">
    <section class="card pad" aria-labelledby="cp-h"><h2 id="cp-h">Course progress</h2><div data-course-progress></div></section>
    <section class="card pad" aria-labelledby="act-h"><h2 id="act-h">Last 28 days</h2><div class="heat" data-heat role="img" aria-label="Activity calendar"></div><p class="muted small">Each square is a day you learned something.</p></section>
  </div>

  <section class="card pad" aria-labelledby="badges-h"><h2 id="badges-h">Badges</h2><ul class="badges" data-badges></ul></section>
  <section class="card pad" aria-labelledby="scores-h"><h2 id="scores-h">Quiz scores</h2><div data-scores><p class="muted">No quizzes yet. <a href="${href('/quizzes/')}">Take your first quiz</a>.</p></div></section>
  <section class="card pad" aria-labelledby="done-h"><h2 id="done-h">Completed lessons</h2><div data-done><p class="muted">Nothing here yet. <a href="${href('/lessons/hola/')}">Start with ¡Hola!</a></p></div></section>

  <section class="card pad data-tools" aria-labelledby="data-h"><h2 id="data-h">Your data</h2><p class="muted">Progress stays on this device. Export a backup to move it to another browser.</p>
    <div class="btn-row"><button class="btn btn-outline btn-sm" type="button" data-export>Export backup</button><label class="btn btn-outline btn-sm file-btn">Import backup<input type="file" accept="application/json" data-import hidden></label><button class="btn btn-danger btn-sm" type="button" data-reset>Reset progress</button></div></section>
</section>`;
  return { id: 'progress', title: 'My Progress', description: 'Track your completed Spanish lessons, quiz scores, learning streak and course progress.', path: '/progress/', body };
}

/* ---------------- 404 ---------------- */
export function notFound() {
  const body = `<section class="wrap section center nf"><div class="nf-chars">${character('emma', { mood: 'smile', cls: 'nf-char' })}${character('mateo', { mood: 'open', cls: 'nf-char' })}</div><h1>¡Ay! Page not found</h1><p>We could not find that page. Let’s get you back on track.</p><p><a class="btn btn-primary" href="${href('/')}">Go home</a> <a class="btn btn-outline" href="${href('/lessons/')}">Browse lessons</a></p></section>`;
  return { id: 'notfound', title: 'Page not found', description: 'This page could not be found.', path: '/404.html', body, noindex: true };
}
