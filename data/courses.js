// Learning paths. `status: 'open'` courses list real lesson slugs; 'soon' courses show planned unit titles
// (`planned`) until lessons are written. To launch A2: add lessons to data/lessons.js with course: 'a2',
// list their slugs under units[].lessons, and set status to 'open'.
export const courses = [
  {
    id: 'a1', level: 'A1', title: 'Beginner', tagline: 'Start from zero', status: 'open', color: 'teal',
    description: 'Greetings, numbers, ordering food, asking for directions and staying safe. Everything you need for your first real conversations.',
    units: [
      { title: 'First Words', lessons: ['hola', 'me-llamo', 'como-estas'] },
      { title: 'Everyday Life', lessons: ['numeros', 'cafeteria', 'familia', 'colores'] },
      { title: 'Out & About', lessons: ['libreria', 'donde-esta', 'el-tiempo'] },
      { title: 'Likes & Safety', lessons: ['me-gusta', 'alergico'] },
    ],
  },
  {
    id: 'a2', level: 'A2', title: 'Elementary', tagline: 'Talk about your day', status: 'soon', color: 'orange',
    description: 'Past events, daily routines, shopping, and travel. Build longer sentences and handle simple everyday situations with confidence.',
    units: [],
    planned: ['Routines & the present tense', 'Talking about yesterday (the preterite)', 'Shopping & prices', 'Travel & transport', 'Health & the doctor'],
  },
  {
    id: 'b1', level: 'B1', title: 'Intermediate', tagline: 'Tell your story', status: 'soon', color: 'red',
    description: 'Narrate experiences, share opinions, and make plans. Learn the past tenses, future plans, and the subjunctive basics.',
    units: [],
    planned: ['Past tenses together', 'Plans & the future', 'Opinions & agreeing', 'Work & study', 'Culture & celebrations'],
  },
  {
    id: 'b2', level: 'B2', title: 'Upper-Intermediate', tagline: 'Speak with nuance', status: 'soon', color: 'purple',
    description: 'Follow native-speed conversations, debate topics, and express hypotheticals and subtle shades of meaning.',
    units: [],
    planned: ['The subjunctive in depth', 'Hypotheticals & conditionals', 'Media & current events', 'Formal writing', 'Idioms & regional Spanish'],
  },
];
