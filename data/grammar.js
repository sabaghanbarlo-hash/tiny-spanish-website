// Grammar topics. `table` is optional: { head: [...], rows: [[...], ...] }.
export const grammar = [
  {
    id: 'gender', title: 'Nouns & gender', level: 'A1', emoji: '🧩',
    summary: 'Every Spanish noun is masculine or feminine.',
    body: [
      'In Spanish, every noun has a gender. Most nouns ending in -o are masculine, and most ending in -a are feminine. Learn each noun together with its article (el or la) so the gender sticks.',
      'There are common exceptions: “el día” (the day) and “el mapa” (the map) end in -a but are masculine, and “la mano” (the hand) ends in -o but is feminine.',
    ],
    examples: [
      { es: 'el libro', en: 'the book (masculine)' }, { es: 'la casa', en: 'the house (feminine)' },
      { es: 'el día', en: 'the day (masculine exception)' }, { es: 'la mano', en: 'the hand (feminine exception)' },
    ],
    tip: 'Do not guess gender from meaning. Learn “la casa”, not just “casa”.',
  },
  {
    id: 'articles', title: 'Articles: el, la, un, una', level: 'A1', emoji: '📎',
    summary: 'The Spanish words for “the” and “a”.',
    body: ['Articles match the noun’s gender and number. Use “el/la/los/las” for specific things (the) and “un/una/unos/unas” for non-specific things (a, an, some).'],
    table: { head: ['', 'Masculine', 'Feminine'], rows: [['the (singular)', 'el', 'la'], ['the (plural)', 'los', 'las'], ['a / an', 'un', 'una'], ['some', 'unos', 'unas']] },
    examples: [
      { es: 'el gato', en: 'the cat' }, { es: 'una chaqueta', en: 'a jacket' }, { es: 'los libros', en: 'the books' }, { es: 'unas sudaderas', en: 'some hoodies' },
    ],
    tip: 'Before a feminine noun that starts with a stressed “a”, use “el” in the singular: “el agua” (but “las aguas”).',
  },
  {
    id: 'plurals', title: 'Making plurals', level: 'A1', emoji: '➕',
    summary: 'Add -s after a vowel, -es after a consonant.',
    body: ['To make a noun plural, add -s if it ends in a vowel and -es if it ends in a consonant. Nouns ending in -z change z to c before -es. The article changes too.'],
    examples: [
      { es: 'libro → libros', en: 'book → books' }, { es: 'papel → papeles', en: 'paper → papers' },
      { es: 'lápiz → lápices', en: 'pencil → pencils' }, { es: 'lección → lecciones', en: 'lesson → lessons (the accent drops)' },
    ],
    tip: 'Plural adjectives agree too: “los libros rojos”.',
  },
  {
    id: 'pronouns', title: 'Subject pronouns', level: 'A1', emoji: '🙋',
    summary: 'I, you, he, she, we, they.',
    body: [
      'Spanish often drops the subject pronoun because the verb ending already tells you who is acting. You add it for emphasis or clarity.',
      'In Latin America, “ustedes” is the plural “you” for everyone. (“Vosotros” is used mainly in Spain.) “Tú” is informal singular “you”, and “usted” is formal.',
    ],
    table: { head: ['Pronoun', 'Meaning'], rows: [['yo', 'I'], ['tú', 'you (informal)'], ['él / ella / usted', 'he / she / you (formal)'], ['nosotros / nosotras', 'we'], ['ellos / ellas / ustedes', 'they / you all']] },
    examples: [{ es: 'Yo soy Emma.', en: 'I am Emma.' }, { es: '¿Tú eres Mateo?', en: 'Are you Mateo?' }, { es: 'Ustedes hablan español.', en: 'You all speak Spanish.' }],
    tip: 'Say “Soy Emma” instead of “Yo soy Emma” in everyday speech. It sounds more natural.',
  },
  {
    id: 'ser', title: 'The verb “ser”', level: 'A1', emoji: '🪪',
    summary: 'To be: who or what someone is.',
    body: ['Use “ser” for identity, origin, professions, descriptions, and time. Think of it as the “what something is” verb.'],
    table: { head: ['Pronoun', 'ser'], rows: [['yo', 'soy'], ['tú', 'eres'], ['él / ella / usted', 'es'], ['nosotros', 'somos'], ['ellos / ustedes', 'son']] },
    examples: [{ es: 'Soy estudiante.', en: 'I am a student.' }, { es: 'Mateo es de México.', en: 'Mateo is from Mexico.' }, { es: 'Son las tres.', en: "It's three o'clock." }],
    tip: 'Memory hook: use ser for DOCTOR (Description, Occupation, Characteristic, Time, Origin, Relationship).',
  },
  {
    id: 'estar', title: 'The verb “estar”', level: 'A1', emoji: '📍',
    summary: 'To be: where and how someone is.',
    body: ['Use “estar” for location and for feelings or conditions that can change. Think of it as the “where and how” verb.'],
    table: { head: ['Pronoun', 'estar'], rows: [['yo', 'estoy'], ['tú', 'estás'], ['él / ella / usted', 'está'], ['nosotros', 'estamos'], ['ellos / ustedes', 'están']] },
    examples: [{ es: 'Estoy en la librería.', en: "I'm at the bookstore." }, { es: 'Emma está feliz.', en: 'Emma is happy.' }, { es: '¿Cómo estás?', en: 'How are you?' }],
    tip: 'Memory hook: PLACE, how you feel: Position, Location, Action, Condition, Emotion.',
  },
  {
    id: 'ar-verbs', title: 'Present tense: -ar verbs', level: 'A1', emoji: '🗣️',
    summary: 'Regular verbs like hablar, bailar, cocinar.',
    body: ['Remove -ar from the verb to get the stem, then add the ending that matches the subject. This pattern works for hundreds of verbs.'],
    table: { head: ['Pronoun', 'hablar (to speak)'], rows: [['yo', 'hablo'], ['tú', 'hablas'], ['él / ella / usted', 'habla'], ['nosotros', 'hablamos'], ['ellos / ustedes', 'hablan']] },
    examples: [{ es: 'Hablo un poco de español.', en: 'I speak a little Spanish.' }, { es: 'Mateo baila muy bien.', en: 'Mateo dances very well.' }, { es: 'Cocinamos juntos.', en: 'We cook together.' }],
    tip: 'The same endings work for caminar, estudiar, cocinar, bailar, and many more.',
  },
  {
    id: 'adjectives', title: 'Adjectives agree', level: 'A1', emoji: '🎀',
    summary: 'Adjectives match gender and number, and go after the noun.',
    body: ['Most adjectives come after the noun and change to match it. Adjectives ending in -o have four forms (-o, -a, -os, -as). Adjectives ending in -e or a consonant only change for number (grande, grandes; azul, azules).'],
    examples: [{ es: 'el gato negro', en: 'the black cat' }, { es: 'la casa blanca', en: 'the white house' }, { es: 'los libros rojos', en: 'the red books' }, { es: 'las chaquetas azules', en: 'the blue jackets' }],
    tip: 'Say “la chaqueta naranja”, not “la naranja chaqueta”.',
  },
  {
    id: 'questions', title: 'Asking questions', level: 'A1', emoji: '❓',
    summary: 'Question words and the upside-down ¿.',
    body: ['Questions start with ¿ and end with ?. Question words always carry a written accent.'],
    table: { head: ['Word', 'Meaning'], rows: [['qué', 'what'], ['quién', 'who'], ['dónde', 'where'], ['cuándo', 'when'], ['cómo', 'how'], ['cuánto', 'how much'], ['por qué', 'why']] },
    examples: [{ es: '¿Dónde está el baño?', en: 'Where is the bathroom?' }, { es: '¿Cómo te llamas?', en: "What's your name?" }, { es: '¿Cuánto es?', en: 'How much is it?' }],
    tip: 'For yes/no questions, just raise your voice: “¿Hablas español?”',
  },
  {
    id: 'gustar', title: 'Gustar: saying what you like', level: 'A1', emoji: '💛',
    summary: 'Me gusta + one thing, me gustan + several.',
    body: ['“Gustar” works backwards: the thing you like is the subject. Use “gusta” for one thing or an action, and “gustan” for more than one thing. Change “me” to “te” (you) or “le” (he/she).'],
    examples: [{ es: 'Me gusta el café.', en: 'I like coffee.' }, { es: 'Me gustan los perros.', en: 'I like dogs.' }, { es: 'Te gusta bailar.', en: 'You like to dance.' }, { es: 'No le gusta el pescado.', en: "He/she doesn't like fish." }],
    tip: 'Think “coffee pleases me” instead of “I like coffee”. That is why “gusta” matches the thing.',
  },
];
