// User profile and achievement data
export interface Achievement {
  id: number;
  name: string;
  description: string;
  earned: boolean;
  date: string | null;
}

export interface WeeklyStat {
  day: string;
  lessons: number;
  xp: number;
}

export interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  longestStreak: number;
  totalLessons: number;
  completedLessons: number;
  studyTime: number; // hours
  isPro: boolean;
  achievements: Achievement[];
  weeklyStats: WeeklyStat[];
}

export const mockUserData: UserProfile = {
  name: "Yuki Tanaka",
  email: "yuki.tanaka@example.com",
  joinDate: "March 2024",
  level: 12,
  xp: 2450,
  xpToNext: 550,
  streak: 7,
  longestStreak: 23,
  totalLessons: 45,
  completedLessons: 32,
  studyTime: 127, // hours
  isPro: false,
  achievements: [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first lesson",
      earned: true,
      date: "Mar 15, 2024",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      earned: true,
      date: "Mar 22, 2024",
    },
    {
      id: 3,
      name: "Hiragana Hero",
      description: "Master all hiragana characters",
      earned: true,
      date: "Apr 2, 2024",
    },
    {
      id: 4,
      name: "Grammar Guru",
      description: "Complete 10 grammar lessons",
      earned: false,
      date: null,
    },
    {
      id: 5,
      name: "Conversation King",
      description: "Practice 50 conversations",
      earned: false,
      date: null,
    },
  ],
  weeklyStats: [
    { day: "Mon", lessons: 3, xp: 45 },
    { day: "Tue", lessons: 2, xp: 30 },
    { day: "Wed", lessons: 4, xp: 60 },
    { day: "Thu", lessons: 1, xp: 15 },
    { day: "Fri", lessons: 3, xp: 45 },
    { day: "Sat", lessons: 2, xp: 30 },
    { day: "Sun", lessons: 3, xp: 45 },
  ],
};
