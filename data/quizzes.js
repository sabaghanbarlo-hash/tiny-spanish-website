// Hand-written quizzes. Lesson and vocabulary quizzes are generated automatically in lib/quizzes.mjs.
// Question shape: { q, answer, wrong: [3 wrong choices], explain }.
export const customQuizzes = [
  {
    id: 'grammar-articles', kind: 'grammar', level: 'A1', title: 'Gender & Articles', emoji: '📎',
    desc: 'el, la, un, una, and noun gender.',
    questions: [
      { q: 'Which article goes with “casa”?', answer: 'la', wrong: ['el', 'los', 'un'], explain: '“Casa” is feminine, so it takes “la”: la casa.' },
      { q: 'Which article goes with “libro”?', answer: 'el', wrong: ['la', 'las', 'una'], explain: '“Libro” is masculine: el libro.' },
      { q: 'How do you say “a jacket”?', answer: 'una chaqueta', wrong: ['un chaqueta', 'el chaqueta', 'unos chaqueta'], explain: '“Chaqueta” is feminine and singular, so “una”.' },
      { q: 'Choose the plural of “el gato”.', answer: 'los gatos', wrong: ['las gatos', 'el gatos', 'los gato'], explain: 'Masculine plural: los + noun with -s.' },
      { q: 'What is the plural of “papel”?', answer: 'papeles', wrong: ['papels', 'papelles', 'papelos'], explain: 'Nouns ending in a consonant add -es.' },
      { q: 'What is the plural of “lápiz”?', answer: 'lápices', wrong: ['lápizes', 'lápizs', 'lápiz'], explain: 'Nouns ending in -z change z to c before -es.' },
      { q: '“El día” is…', answer: 'masculine', wrong: ['feminine', 'plural only', 'neither'], explain: 'Even though “día” ends in -a, it is a masculine exception.' },
      { q: 'Which is correct?', answer: 'los libros rojos', wrong: ['los rojos libros', 'los libros rojo', 'las libros rojos'], explain: 'Adjectives go after the noun and match number: libros rojos.' },
    ],
  },
  {
    id: 'grammar-ser-estar', kind: 'grammar', level: 'A1', title: 'Ser or Estar?', emoji: '⚖️',
    desc: 'Pick the right “to be”.',
    questions: [
      { q: 'Complete: “Yo ___ Emma.”', answer: 'soy', wrong: ['estoy', 'es', 'eres'], explain: 'Use “ser” to say who you are: soy.' },
      { q: 'Complete: “El baño ___ a la derecha.”', answer: 'está', wrong: ['es', 'son', 'soy'], explain: 'Location uses “estar”: está.' },
      { q: 'Complete: “Mateo ___ cansado.”', answer: 'está', wrong: ['es', 'soy', 'están'], explain: 'A temporary condition uses “estar”.' },
      { q: 'Complete: “Nosotros ___ amigos.”', answer: 'somos', wrong: ['estamos', 'son', 'estoy'], explain: 'Relationships use “ser”: somos.' },
      { q: 'Complete: “___ las tres.”', answer: 'Son', wrong: ['Están', 'Es', 'Estás'], explain: 'Time uses “ser”, and plural hours take “son”: Son las tres.' },
      { q: 'Complete: “¿Cómo ___ tú?”', answer: 'estás', wrong: ['eres', 'es', 'soy'], explain: '“¿Cómo estás?” asks how you feel right now.' },
      { q: 'Complete: “Ellos ___ de México.”', answer: 'son', wrong: ['están', 'es', 'somos'], explain: 'Origin uses “ser”: son de México.' },
      { q: 'Complete: “Estoy ___ la librería.”', answer: 'en', wrong: ['de', 'a', 'por'], explain: 'To say you are at a place, use “estar en”.' },
    ],
  },
  {
    id: 'grammar-verbs-questions', kind: 'grammar', level: 'A1', title: 'Verbs & Questions', emoji: '🗣️',
    desc: '-ar verbs, gustar, and question words.',
    questions: [
      { q: 'Complete: “Yo ___ español.” (hablar)', answer: 'hablo', wrong: ['hablas', 'habla', 'hablamos'], explain: 'For “yo”, -ar verbs end in -o.' },
      { q: 'Complete: “Mateo ___ muy bien.” (bailar)', answer: 'baila', wrong: ['bailo', 'bailas', 'bailan'], explain: 'For él/ella, -ar verbs end in -a.' },
      { q: 'Complete: “Nosotros ___ juntos.” (cocinar)', answer: 'cocinamos', wrong: ['cocinan', 'cocino', 'cocinas'], explain: 'For nosotros, the ending is -amos.' },
      { q: 'Which means “I like dogs”?', answer: 'Me gustan los perros.', wrong: ['Me gusta los perros.', 'Me gustan el perro.', 'Yo gusto perros.'], explain: 'Several things: “gustan”.' },
      { q: 'Which means “I like coffee”?', answer: 'Me gusta el café.', wrong: ['Me gustan el café.', 'Yo gusta café.', 'Me gusto el café.'], explain: 'One thing: “gusta”.' },
      { q: 'Which question word means “where”?', answer: 'dónde', wrong: ['cuándo', 'quién', 'cómo'], explain: '“Dónde” means where.' },
      { q: 'How do you ask “How much is it?”', answer: '¿Cuánto es?', wrong: ['¿Cuántos es?', '¿Cómo es?', '¿Quién es?'], explain: '“Cuánto” means how much.' },
      { q: 'Which is the correct way to start a question?', answer: '¿Cómo te llamas?', wrong: ['Cómo te llamas?', '¡Cómo te llamas?', 'Cómo te llamas.'], explain: 'Spanish questions open with ¿ and close with ?.' },
    ],
  },
];
