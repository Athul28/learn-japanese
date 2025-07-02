// Lesson categories data
export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

export interface LessonCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  isUnlocked: boolean;
  difficulty?: string;
  estimatedTime?: string;
  color: string;
  topics?: string[];
  lessons?: Lesson[];
}

// Dashboard lesson categories (simplified)
export const dashboardLessonCategories: LessonCategory[] = [
  {
    id: 1,
    title: "Japanese Greetings",
    description: "Learn essential daily greetings",
    icon: "👋",
    totalLessons: 10,
    completedLessons: 10,
    isUnlocked: true,
    color: "bg-green-100 border-green-300",
    lessons: [
      { id: 1, title: "Konnichiwa & Basic Greetings", completed: true },
      { id: 2, title: "Morning & Evening Greetings", completed: true },
      { id: 3, title: "Polite Expressions", completed: true },
    ],
  },
  {
    id: 2,
    title: "Hiragana Basics",
    description: "Master the hiragana writing system",
    icon: "あ",
    totalLessons: 15,
    completedLessons: 8,
    isUnlocked: true,
    color: "bg-blue-100 border-blue-300",
    lessons: [
      { id: 4, title: "A-I-U-E-O Vowels", completed: true },
      { id: 5, title: "Ka-Ki-Ku-Ke-Ko", completed: true },
      { id: 6, title: "Sa-Shi-Su-Se-So", completed: false },
    ],
  },
  {
    id: 3,
    title: "Adjectives (na & i)",
    description: "Descriptive words and their usage",
    icon: "📝",
    totalLessons: 12,
    completedLessons: 5,
    isUnlocked: true,
    color: "bg-purple-100 border-purple-300",
    lessons: [
      { id: 7, title: "Na-Adjectives: Genki, Suki, Kirei", completed: true },
      { id: 8, title: "I-Adjectives: Atsui, Samui, Takai", completed: false },
      { id: 9, title: "Adjective Conjugation", completed: false },
    ],
  },
  {
    id: 4,
    title: "Body Parts",
    description: "Learn vocabulary for body parts",
    icon: "👤",
    totalLessons: 8,
    completedLessons: 0,
    isUnlocked: true,
    color: "bg-yellow-100 border-yellow-300",
    lessons: [
      { id: 10, title: "Head & Face: Atama, Kao, Me", completed: false },
      { id: 11, title: "Arms & Hands: Te, Yubi, Kata", completed: false },
    ],
  },
  {
    id: 5,
    title: "Verb Basics",
    description: "Essential action words",
    icon: "⚡",
    totalLessons: 10,
    completedLessons: 0,
    isUnlocked: false,
    color: "bg-red-100 border-red-300",
    lessons: [
      { id: 12, title: "Ikimasu/Kimasu - Go/Come", completed: false },
      { id: 13, title: "Tabemasu/Nomimasu - Eat/Drink", completed: false },
    ],
  },
];

// Extended lesson categories for lessons page
export const allLessonCategories: LessonCategory[] = [
  {
    id: 1,
    title: "Japanese Greetings",
    description: "Essential daily greetings and polite expressions",
    icon: "👋",
    totalLessons: 10,
    completedLessons: 10,
    isUnlocked: true,
    difficulty: "Beginner",
    estimatedTime: "15 min",
    color: "bg-green-100 border-green-300",
    topics: [
      "Konnichiwa",
      "Ohayou gozaimasu",
      "Arigatou gozaimasu",
      "Sumimasen",
    ],
  },
  {
    id: 2,
    title: "Hiragana Mastery",
    description: "Complete hiragana writing system with romaji",
    icon: "あ",
    totalLessons: 15,
    completedLessons: 8,
    isUnlocked: true,
    difficulty: "Beginner",
    estimatedTime: "20 min",
    color: "bg-blue-100 border-blue-300",
    topics: [
      "A-I-U-E-O",
      "Ka-Ki-Ku-Ke-Ko",
      "Sa-Shi-Su-Se-So",
      "Combined characters",
    ],
  },
  {
    id: 3,
    title: "Na-Adjectives",
    description: "Descriptive na-adjectives: genki, suki, kirei",
    icon: "✨",
    totalLessons: 8,
    completedLessons: 5,
    isUnlocked: true,
    difficulty: "Beginner",
    estimatedTime: "12 min",
    color: "bg-purple-100 border-purple-300",
    topics: ["genki", "suki/kirai", "jouzu/heta", "kirei", "shizuka"],
  },
  {
    id: 4,
    title: "I-Adjectives",
    description: "Essential i-adjectives: atsui, furui, takai",
    icon: "🌡️",
    totalLessons: 8,
    completedLessons: 3,
    isUnlocked: true,
    difficulty: "Beginner",
    estimatedTime: "12 min",
    color: "bg-orange-100 border-orange-300",
    topics: ["atsui/samui", "takai/yasui", "ooki/chiisai", "ii/warui"],
  },
  {
    id: 5,
    title: "Body Parts",
    description: "Learn vocabulary for body parts: atama, me, te",
    icon: "👤",
    totalLessons: 6,
    completedLessons: 0,
    isUnlocked: true,
    difficulty: "Beginner",
    estimatedTime: "10 min",
    color: "bg-yellow-100 border-yellow-300",
    topics: ["atama", "kao", "te", "ashi", "me", "mimi"],
  },
  {
    id: 6,
    title: "Basic Verbs",
    description: "Essential action words: ikimasu, tabemasu, shimasu",
    icon: "⚡",
    totalLessons: 12,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Beginner",
    estimatedTime: "18 min",
    color: "bg-red-100 border-red-300",
    topics: ["ikimasu/kimasu", "tabemasu/nomimasu", "shimasu", "mimasu"],
  },
  {
    id: 7,
    title: "Verb Conjugation",
    description: "Master present, negative, past, and past negative forms",
    icon: "🔄",
    totalLessons: 15,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Intermediate",
    estimatedTime: "25 min",
    color: "bg-indigo-100 border-indigo-300",
    topics: ["masu form", "masen form", "mashita form", "masen deshita"],
  },
  {
    id: 8,
    title: "Particles Mastery",
    description: "Master wa, ga, o, ni, de, and more particles",
    icon: "🔗",
    totalLessons: 18,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Intermediate",
    estimatedTime: "30 min",
    color: "bg-pink-100 border-pink-300",
    topics: ["wa particle", "ga particle", "o particle", "ni/de particles"],
  },
  {
    id: 9,
    title: "Colors in Japanese",
    description: "Learn color vocabulary: aka, shiro, kuro, ao",
    icon: "🎨",
    totalLessons: 5,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Beginner",
    estimatedTime: "8 min",
    color: "bg-rose-100 border-rose-300",
    topics: ["aka", "shiro", "kuro", "ao", "midori", "ki"],
  },
  {
    id: 10,
    title: "Family Members",
    description: "Family vocabulary: chichi, haha, ani, imouto",
    icon: "👨‍👩‍👧‍👦",
    totalLessons: 6,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Beginner",
    estimatedTime: "10 min",
    color: "bg-emerald-100 border-emerald-300",
    topics: ["chichi/haha", "ani/ane", "otouto/imouto", "ojisan/obasan"],
  },
  {
    id: 11,
    title: "Numbers & Kanji",
    description: "Numbers 1-10000 in kanji with readings",
    icon: "🔢",
    totalLessons: 10,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Intermediate",
    estimatedTime: "20 min",
    color: "bg-cyan-100 border-cyan-300",
    topics: ["1-10", "11-100", "100-1000", "10000+"],
  },
  {
    id: 12,
    title: "Days & Dates",
    description: "Days of week and monthly dates",
    icon: "📅",
    totalLessons: 8,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Beginner",
    estimatedTime: "15 min",
    color: "bg-violet-100 border-violet-300",
    topics: ["getsuyoubi", "tsuitachi", "futsuka", "dates"],
  },
];

// Mock user data
export interface User {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalLessons: number;
  completedLessons: number;
  isPro: boolean;
}

export const mockUser: User = {
  name: "Yuki Tanaka",
  level: 12,
  xp: 2450,
  xpToNext: 500,
  streak: 7,
  totalLessons: 45,
  completedLessons: 32,
  isPro: false,
};
