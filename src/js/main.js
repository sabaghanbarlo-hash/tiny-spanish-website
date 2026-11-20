// Entry point: shared behavior everywhere, then one small module per page.
import { createStore } from './store.js';
import { initNav, initSpeech, initChrome, hydrateLessonLinks } from './ui.js';

const store = createStore();
initNav(); initSpeech(); initChrome(store); hydrateLessonLinks(store);

const page = document.body.dataset.page;
const modules = { home: './pages/home.js', lessons: './pages/lessons.js', lesson: './pages/lesson.js', courses: './pages/courses.js', vocabulary: './pages/vocabulary.js', quizzes: './pages/quizzes.js', progress: './pages/progress.js' };
if (modules[page]) import(modules[page]).then((m) => m.init(store)).catch((err) => console.error('Page script failed', err));
