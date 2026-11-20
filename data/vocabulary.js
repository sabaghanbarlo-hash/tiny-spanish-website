// Vocabulary topics. Each word: [spanish, english, pronunciation]. Add words or a new topic here and rebuild.
export const vocabTopics = [
  { id: 'greetings', title: 'Greetings', emoji: '👋', words: [
    ['hola', 'hello', 'OH-lah'], ['adiós', 'goodbye', 'ah-DYOHS'], ['buenos días', 'good morning', 'BWEH-nohs DEE-ahs'],
    ['buenas tardes', 'good afternoon', 'BWEH-nahs TAR-dehs'], ['buenas noches', 'good evening / good night', 'BWEH-nahs NOH-chehs'],
    ['gracias', 'thank you', 'GRAH-syahs'], ['por favor', 'please', 'pohr fah-VOHR'], ['de nada', "you're welcome", 'deh NAH-dah'],
  ] },
  { id: 'numbers', title: 'Numbers 1–10', emoji: '🔢', words: [
    ['uno', 'one', 'OO-noh'], ['dos', 'two', 'dohs'], ['tres', 'three', 'trehs'], ['cuatro', 'four', 'KWAH-troh'], ['cinco', 'five', 'SEEN-koh'],
    ['seis', 'six', 'seys'], ['siete', 'seven', 'SYEH-teh'], ['ocho', 'eight', 'OH-choh'], ['nueve', 'nine', 'NWEH-veh'], ['diez', 'ten', 'dyehs'],
  ] },
  { id: 'food', title: 'Food & Drink', emoji: '🥐', words: [
    ['café', 'coffee', 'kah-FEH'], ['agua', 'water', 'AH-gwah'], ['jugo', 'juice', 'HOO-goh'], ['pan', 'bread', 'pahn'], ['leche', 'milk', 'LEH-cheh'],
    ['huevo', 'egg', 'WEH-voh'], ['manzana', 'apple', 'mahn-SAH-nah'], ['queso', 'cheese', 'KEH-soh'], ['arroz', 'rice', 'ah-RROHS'], ['pollo', 'chicken', 'POH-yoh'],
  ] },
  { id: 'family', title: 'Family', emoji: '🏠', words: [
    ['madre', 'mother', 'MAH-dreh'], ['padre', 'father', 'PAH-dreh'], ['hermano', 'brother', 'ehr-MAH-noh'], ['hermana', 'sister', 'ehr-MAH-nah'],
    ['abuelo', 'grandfather', 'ah-BWEH-loh'], ['abuela', 'grandmother', 'ah-BWEH-lah'], ['hijo', 'son', 'EE-hoh'], ['hija', 'daughter', 'EE-hah'],
  ] },
  { id: 'colors', title: 'Colors', emoji: '🎨', words: [
    ['rojo', 'red', 'ROH-hoh'], ['azul', 'blue', 'ah-SOOL'], ['amarillo', 'yellow', 'ah-mah-REE-yoh'], ['verde', 'green', 'VEHR-deh'],
    ['naranja', 'orange', 'nah-RAHN-hah'], ['rosa', 'pink', 'ROH-sah'], ['negro', 'black', 'NEH-groh'], ['blanco', 'white', 'BLAHN-koh'],
  ] },
  { id: 'places', title: 'Places', emoji: '📍', words: [
    ['casa', 'house / home', 'KAH-sah'], ['escuela', 'school', 'ehs-KWEH-lah'], ['librería', 'bookstore', 'lee-breh-REE-ah'], ['baño', 'bathroom', 'BAH-nyoh'],
    ['parque', 'park', 'PAHR-keh'], ['tienda', 'store', 'TYEN-dah'], ['hospital', 'hospital', 'ohs-pee-TAHL'], ['playa', 'beach', 'PLAH-yah'],
  ] },
  { id: 'time', title: 'Time & Days', emoji: '⏰', words: [
    ['hoy', 'today', 'oy'], ['mañana', 'tomorrow / morning', 'mah-NYAH-nah'], ['ayer', 'yesterday', 'ah-YEHR'], ['semana', 'week', 'seh-MAH-nah'],
    ['lunes', 'Monday', 'LOO-nehs'], ['martes', 'Tuesday', 'MAHR-tehs'], ['hora', 'hour / time', 'OH-rah'], ['año', 'year', 'AH-nyoh'],
  ] },
  { id: 'verbs', title: 'Everyday Verbs', emoji: '🏃', words: [
    ['ser', 'to be (identity)', 'sehr'], ['estar', 'to be (state / place)', 'ehs-TAHR'], ['tener', 'to have', 'teh-NEHR'], ['querer', 'to want / to love', 'keh-REHR'],
    ['comer', 'to eat', 'koh-MEHR'], ['beber', 'to drink', 'beh-BEHR'], ['hablar', 'to speak', 'ah-BLAHR'], ['vivir', 'to live', 'bee-BEER'],
  ] },
].map((t) => ({ ...t, words: t.words.map(([es, en, pron]) => ({ es, en, pron, topic: t.id })) }));
