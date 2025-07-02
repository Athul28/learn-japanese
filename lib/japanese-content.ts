// Japanese learning content based on the provided notes
import type { LessonContent } from "./db-schema"

export const JAPANESE_GREETINGS: LessonContent = {
  title: "Japanese Greetings",
  description: "Learn essential daily greetings",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'Konnichiwa' mean?",
      options: ["Good morning", "Hello", "Good night", "Goodbye"],
      correct: 1,
      explanation: "Konnichiwa (こんにちは) is the most common greeting meaning 'Hello' in Japanese.",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'Good morning' in Japanese?",
      answer: "Ohayou gozaimasu",
      explanation: "Ohayou gozaimasu (おはようございます) is the polite way to say 'Good morning'.",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What is the meaning of 'Arigatou gozaimasu'?",
      options: ["Excuse me", "Thank you very much", "I'm sorry", "You're welcome"],
      correct: 1,
      explanation:
        "Arigatou gozaimasu (ありがとうございます) means 'Thank you very much' - a polite expression of gratitude.",
    },
    {
      id: 4,
      type: "matching",
      question: "Match the Japanese greeting with its English meaning:",
      pairs: [
        { japanese: "Sumimasen", english: "Excuse me" },
        { japanese: "Ja mata", english: "See you" },
        { japanese: "Oyasumi nasai", english: "Good night" },
        { japanese: "Douitashi mashite", english: "You are welcome" },
        { japanese: "Gomen-nasai", english: "Sorry" },
        { japanese: "Hajimemashite", english: "How do you do" },
      ],
      explanation: "These are common daily expressions used in various social situations.",
    },
  ],
}

export const NA_ADJECTIVES: LessonContent = {
  title: "Na-Adjectives",
  description: "Learn descriptive na-adjectives",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'genki' mean?",
      options: ["sad", "healthy/energetic", "quiet", "busy"],
      correct: 1,
      explanation: "Genki (元気) means healthy, energetic, or cheerful.",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'beautiful' in Japanese?",
      answer: "kirei",
      explanation: "Kirei (きれい) means beautiful or clean.",
    },
    {
      id: 3,
      type: "matching",
      question: "Match the na-adjective with its meaning:",
      pairs: [
        { japanese: "suki", english: "like" },
        { japanese: "kirai", english: "dislike" },
        { japanese: "jouzu", english: "skillful" },
        { japanese: "heta", english: "unskillful" },
        { japanese: "shizuka", english: "quiet" },
        { japanese: "nigiyaka", english: "lively" },
      ],
      explanation: "Na-adjectives are used with 'na' when modifying nouns directly.",
    },
  ],
}

export const I_ADJECTIVES: LessonContent = {
  title: "I-Adjectives",
  description: "Learn descriptive i-adjectives",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'atsui' mean?",
      options: ["cold", "hot", "expensive", "cheap"],
      correct: 1,
      explanation: "Atsui (暑い/熱い) means hot (weather or temperature).",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'expensive' in Japanese?",
      answer: "takai",
      explanation: "Takai (高い) means expensive or high.",
    },
    {
      id: 3,
      type: "matching",
      question: "Match the i-adjective with its meaning:",
      pairs: [
        { japanese: "furui", english: "old" },
        { japanese: "ii", english: "good" },
        { japanese: "warui", english: "bad" },
        { japanese: "samui", english: "cold" },
        { japanese: "yasui", english: "cheap" },
        { japanese: "ooki", english: "big" },
        { japanese: "chiisai", english: "small" },
      ],
      explanation: "I-adjectives end in 'i' and can be conjugated for tense and negation.",
    },
  ],
}

export const BODY_PARTS: LessonContent = {
  title: "Body Parts",
  description: "Learn vocabulary for body parts",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'atama' mean?",
      options: ["hand", "head", "foot", "eye"],
      correct: 1,
      explanation: "Atama (頭) means head.",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'hand' in Japanese?",
      answer: "te",
      explanation: "Te (手) means hand.",
    },
    {
      id: 3,
      type: "matching",
      question: "Match the body part with its Japanese name:",
      pairs: [
        { japanese: "kao", english: "face" },
        { japanese: "me", english: "eye" },
        { japanese: "mimi", english: "ear" },
        { japanese: "kuchi", english: "mouth" },
        { japanese: "yubi", english: "finger" },
        { japanese: "ashi", english: "leg" },
      ],
      explanation: "These are essential body part vocabulary words used in daily conversation.",
    },
  ],
}

export const BASIC_VERBS: LessonContent = {
  title: "Basic Verbs",
  description: "Learn essential action words",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'ikimasu' mean?",
      options: ["to come", "to go", "to eat", "to drink"],
      correct: 1,
      explanation: "Ikimasu (行きます) means 'to go' in polite form.",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'to eat' in polite form?",
      answer: "tabemasu",
      explanation: "Tabemasu (食べます) is the polite form of 'to eat'.",
    },
    {
      id: 3,
      type: "matching",
      question: "Match the verb with its meaning:",
      pairs: [
        { japanese: "kimasu", english: "to come" },
        { japanese: "nomimasu", english: "to drink" },
        { japanese: "kaimasu", english: "to buy" },
        { japanese: "kakimasu", english: "to write" },
        { japanese: "mimasu", english: "to see" },
        { japanese: "wakarimasu", english: "to understand" },
      ],
      explanation: "These verbs are in their polite 'masu' form, used in formal situations.",
    },
  ],
}

export const PARTICLES: LessonContent = {
  title: "Japanese Particles",
  description: "Master wa, ga, o, ni, de, and more",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which particle is used to mark the topic of a sentence?",
      options: ["ga", "wa", "o", "ni"],
      correct: 1,
      explanation: "The particle 'wa' (は) is used to mark the topic of a sentence.",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "Which particle marks the direct object?",
      options: ["wa", "ga", "o", "de"],
      correct: 2,
      explanation: "The particle 'o' (を) marks the direct object of a verb.",
    },
    {
      id: 3,
      type: "translation",
      question: "Fill in the particle: Watashi ___ gakusei desu. (I am a student)",
      answer: "wa",
      explanation: "Watashi wa gakusei desu. 'Wa' marks 'watashi' as the topic.",
    },
  ],
}

export const COLORS: LessonContent = {
  title: "Colors in Japanese",
  description: "Learn color vocabulary",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the color with its Japanese name:",
      pairs: [
        { japanese: "aka", english: "red" },
        { japanese: "shiro", english: "white" },
        { japanese: "kuro", english: "black" },
        { japanese: "ao", english: "blue" },
        { japanese: "midori", english: "green" },
        { japanese: "ki", english: "yellow" },
      ],
      explanation: "These are the basic color names in Japanese.",
    },
  ],
}

export const FAMILY_MEMBERS: LessonContent = {
  title: "Family Members",
  description: "Learn family vocabulary",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the family member with its Japanese name:",
      pairs: [
        { japanese: "chichi", english: "father" },
        { japanese: "haha", english: "mother" },
        { japanese: "ani", english: "older brother" },
        { japanese: "ane", english: "older sister" },
        { japanese: "otouto", english: "younger brother" },
        { japanese: "imouto", english: "younger sister" },
      ],
      explanation: "These are family terms used when talking about your own family.",
    },
  ],
}

export const HIRAGANA_BASICS: LessonContent = {
  title: "Hiragana Basics",
  description: "Master the hiragana writing system",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the romaji for 'あ'?",
      options: ["i", "a", "u", "e"],
      correct: 1,
      explanation: "あ is pronounced 'a' - the first vowel in the hiragana system.",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is the romaji for 'か'?",
      options: ["ka", "ki", "ku", "ke"],
      correct: 0,
      explanation: "か is pronounced 'ka' - combining the 'k' consonant with 'a' vowel.",
    },
    {
      id: 3,
      type: "matching",
      question: "Match the hiragana with its romaji:",
      pairs: [
        { japanese: "さ", english: "sa" },
        { japanese: "し", english: "shi" },
        { japanese: "す", english: "su" },
        { japanese: "せ", english: "se" },
        { japanese: "そ", english: "so" },
      ],
      explanation: "These are the 'sa' row hiragana characters.",
    },
  ],
}

// Add these new lesson contents:

export const VERB_CONJUGATION: LessonContent = {
  title: "Verb Conjugation",
  description: "Master present, negative, past, and past negative forms",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the masu form of 'taberu' (to eat)?",
      options: ["tabemasu", "tabemasen", "tabemashita", "tabemasendeshita"],
      correct: 0,
      explanation: "To convert 'taberu' to masu form: remove 'ru' and add 'masu' = tabemasu",
    },
    {
      id: 2,
      type: "translation",
      question: "Convert 'nomu' (to drink) to present negative form:",
      answer: "nomimasen",
      explanation: "Replace 'u' with 'i' then add 'masen': nomu → nomi → nomimasen",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What is the past tense of 'ikimasu' (to go)?",
      options: ["ikimasen", "ikimashita", "ikimasendeshita", "ikimasu"],
      correct: 1,
      explanation: "Past tense of masu form: replace 'masu' with 'mashita' = ikimashita",
    },
  ],
}

export const EXISTENCE_ARU_IRU: LessonContent = {
  title: "Existence (Aru/Iru)",
  description: "Learn aru and iru for existence of things and people",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which verb is used for the existence of living things?",
      options: ["aru", "iru", "both", "neither"],
      correct: 1,
      explanation: "Iru (いる) is used for living things like people and animals",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say 'There is a tree'?",
      answer: "ki ga arimasu",
      explanation: "Trees use 'aru' even though they're living: ki ga arimasu",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What is the negative form of 'imasu'?",
      options: ["imasen", "arimasen", "imasendeshita", "irimasen"],
      correct: 0,
      explanation: "The negative form of 'imasu' is 'imasen'",
    },
  ],
}

export const NUMBERS_KANJI: LessonContent = {
  title: "Numbers & Kanji",
  description: "Numbers 1-10000 in kanji with readings",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the kanji number with its reading:",
      pairs: [
        { japanese: "一", english: "ichi" },
        { japanese: "二", english: "ni" },
        { japanese: "三", english: "san" },
        { japanese: "四", english: "yon/shi" },
        { japanese: "五", english: "go" },
      ],
      explanation: "These are the basic kanji numbers 1-5",
    },
    {
      id: 2,
      type: "translation",
      question: "How do you say '25' in Japanese?",
      answer: "nijuu go",
      explanation: "25 = ni (2) + juu (10) + go (5) = nijuu go",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What does '百' (hyaku) mean?",
      options: ["10", "100", "1000", "10000"],
      correct: 1,
      explanation: "百 (hyaku) means 100",
    },
  ],
}

export const DAYS_DATES: LessonContent = {
  title: "Days & Dates",
  description: "Days of week and monthly dates",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the day with its Japanese name:",
      pairs: [
        { japanese: "getsuyoubi", english: "Monday" },
        { japanese: "kayoubi", english: "Tuesday" },
        { japanese: "suiyoubi", english: "Wednesday" },
        { japanese: "mokuyoubi", english: "Thursday" },
        { japanese: "kinyoubi", english: "Friday" },
      ],
      explanation: "These are the weekdays in Japanese",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "How do you say 'the 1st' (of the month)?",
      options: ["ichinichi", "tsuitachi", "hajimari", "ichi"],
      correct: 1,
      explanation: "The 1st of the month is 'tsuitachi' (ついたち)",
    },
  ],
}

export const FOOD_VOCABULARY: LessonContent = {
  title: "Food Vocabulary",
  description: "Food items: onigiri, yasai, niku, sakana",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the food item with its English meaning:",
      pairs: [
        { japanese: "onigiri", english: "rice ball" },
        { japanese: "yasai", english: "vegetables" },
        { japanese: "niku", english: "meat" },
        { japanese: "sakana", english: "fish" },
        { japanese: "tamago", english: "egg" },
      ],
      explanation: "These are common food vocabulary words",
    },
  ],
}

export const DAILY_EXPRESSIONS: LessonContent = {
  title: "Daily Expressions",
  description: "Common phrases: tadaima, okaerinasai, itte kimasu",
  questions: [
    {
      id: 1,
      type: "matching",
      question: "Match the expression with its meaning:",
      pairs: [
        { japanese: "Tadaima", english: "I'm home" },
        { japanese: "Okaerimasai", english: "Welcome back" },
        { japanese: "Itte kimasu", english: "I'm leaving" },
        { japanese: "Wakarimashita", english: "I understood" },
      ],
      explanation: "These are daily expressions used at home and in conversation",
    },
  ],
}

// Update the ALL_LESSONS object to include all lessons:
export const ALL_LESSONS = {
  1: JAPANESE_GREETINGS,
  2: HIRAGANA_BASICS,
  3: NA_ADJECTIVES,
  4: I_ADJECTIVES,
  5: BODY_PARTS,
  6: BASIC_VERBS,
  7: VERB_CONJUGATION,
  8: PARTICLES,
  9: COLORS,
  10: FAMILY_MEMBERS,
  11: NUMBERS_KANJI,
  12: DAYS_DATES,
  13: FOOD_VOCABULARY,
  14: DAILY_EXPRESSIONS,
  15: EXISTENCE_ARU_IRU,
} as const
