// Database schema definitions for Prisma
// This would typically be in your schema.prisma file

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  level: number
  xp: number
  streak: number
  longestStreak: number
  isPro: boolean
  stripeCustomerId?: string
  subscriptionId?: string
  subscriptionStatus?: string
  createdAt: Date
  updatedAt: Date

  // Relations
  progress: Progress[]
  groupMemberships: GroupMembership[]
  messages: Message[]
  achievements: UserAchievement[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  category: string
  level: number
  order: number
  content: any // JSON content for lesson questions
  xpReward: number
  isLocked: boolean
  createdAt: Date
  updatedAt: Date

  // Relations
  progress: Progress[]
}

export interface Progress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  score: number
  attempts: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date

  // Relations
  user: User
  lesson: Lesson
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  level: string
  isPublic: boolean
  memberCount: number
  createdById: string
  createdAt: Date
  updatedAt: Date

  // Relations
  memberships: GroupMembership[]
  messages: Message[]
  createdBy: User
}

export interface GroupMembership {
  id: string
  userId: string
  groupId: string
  role: "MEMBER" | "MODERATOR" | "ADMIN"
  joinedAt: Date

  // Relations
  user: User
  group: StudyGroup
}

export interface Message {
  id: string
  content: string
  userId: string
  groupId: string
  createdAt: Date
  updatedAt: Date

  // Relations
  user: User
  group: StudyGroup
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: any // JSON for achievement requirements
  xpReward: number
  createdAt: Date

  // Relations
  userAchievements: UserAchievement[]
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  earnedAt: Date

  // Relations
  user: User
  achievement: Achievement
}

// Lesson content types
export interface Question {
  id: number
  type: "multiple-choice" | "translation" | "writing" | "matching"
  question: string
  options?: string[]
  correct?: number
  answer?: string
  pairs?: { japanese: string; english: string }[]
  explanation: string
}

export interface LessonContent {
  title: string
  description: string
  questions: Question[]
}

// Japanese learning content categories
export const LESSON_CATEGORIES = {
  GREETINGS: "greetings",
  HIRAGANA: "hiragana",
  ADJECTIVES: "adjectives",
  BODY_PARTS: "body-parts",
  VERBS: "verbs",
  PARTICLES: "particles",
  COLORS: "colors",
  FAMILY: "family",
  NUMBERS: "numbers",
  DAYS: "days",
  FOOD: "food",
  EXPRESSIONS: "expressions",
} as const

export type LessonCategory = (typeof LESSON_CATEGORIES)[keyof typeof LESSON_CATEGORIES]
