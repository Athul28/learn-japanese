// Sample lesson data with questions - this would typically come from the database
export const sampleLessons = [
  {
    id: "lesson-1",
    title: "Basic Japanese Greetings",
    description: "Learn essential daily greetings in Japanese",
    xpReward: 25,
    questions: [
      {
        id: "q1",
        type: "multiple-choice" as const,
        question: "How do you say 'Good morning' in Japanese?",
        options: ["Konnichiwa", "Ohayou gozaimasu", "Konbanwa", "Sayonara"],
        correctAnswer: "Ohayou gozaimasu",
        explanation:
          "Ohayou gozaimasu (おはようございます) is the polite way to say good morning in Japanese.",
      },
      {
        id: "q2",
        type: "multiple-choice" as const,
        question: "What does 'Arigatou gozaimasu' mean?",
        options: [
          "Good morning",
          "Thank you very much",
          "Excuse me",
          "Good evening",
        ],
        correctAnswer: "Thank you very much",
        explanation:
          "Arigatou gozaimasu (ありがとうございます) is the polite way to say 'thank you very much' in Japanese.",
      },
      {
        id: "q3",
        type: "multiple-choice" as const,
        question: "How do you say 'Good evening' in Japanese?",
        options: ["Ohayou", "Konnichiwa", "Konbanwa", "Oyasumi"],
        correctAnswer: "Konbanwa",
        explanation:
          "Konbanwa (こんばんは) is used to greet someone in the evening, typically after 6 PM.",
      },
      {
        id: "q4",
        type: "multiple-choice" as const,
        question: "What is the casual way to say 'goodbye' in Japanese?",
        options: ["Mata ne", "Sayonara", "Ja mata", "Both A and C"],
        correctAnswer: "Both A and C",
        explanation:
          "Both 'Mata ne' (またね) and 'Ja mata' (じゃまた) are casual ways to say goodbye, meaning 'see you later'.",
      },
      {
        id: "q5",
        type: "multiple-choice" as const,
        question: "When would you use 'Sumimasen'?",
        options: [
          "To say thank you",
          "To apologize or get attention",
          "To say goodbye",
          "To say good morning",
        ],
        correctAnswer: "To apologize or get attention",
        explanation:
          "Sumimasen (すみません) is a versatile word used to apologize or politely get someone's attention.",
      },
    ],
  },
  {
    id: "lesson-2",
    title: "Hiragana: A-I-U-E-O",
    description: "Learn the basic vowels in hiragana",
    xpReward: 20,
    questions: [
      {
        id: "q1",
        type: "multiple-choice" as const,
        question: "Which hiragana character represents the sound 'A'?",
        options: ["あ", "い", "う", "え"],
        correctAnswer: "あ",
        explanation:
          "あ (a) is the first vowel in the Japanese hiragana syllabary.",
      },
      {
        id: "q2",
        type: "multiple-choice" as const,
        question: "What sound does 'う' make?",
        options: ["A", "I", "U", "E"],
        correctAnswer: "U",
        explanation:
          "う represents the 'u' sound, pronounced like 'oo' in 'food'.",
      },
      {
        id: "q3",
        type: "multiple-choice" as const,
        question: "Which character is 'E'?",
        options: ["え", "お", "あ", "い"],
        correctAnswer: "え",
        explanation: "え represents the 'e' sound, pronounced like 'eh'.",
      },
    ],
  },
];

// Function to get lesson by ID
export function getLessonById(id: string) {
  return sampleLessons.find((lesson) => lesson.id === id);
}

// Function to get all lessons
export function getAllLessons() {
  return sampleLessons;
}
