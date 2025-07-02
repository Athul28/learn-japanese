// Community data including study groups and messages
export interface StudyGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  isJoined: boolean;
  level: string;
  activity: string;
}

export interface CommunityMessage {
  id: number;
  user: string;
  avatar: string;
  message: string;
  group: string;
  time: string;
  replies: number;
}

export const studyGroups: StudyGroup[] = [
  {
    id: 1,
    name: "Beginner Japanese Learners",
    description: "Perfect for those just starting their Japanese journey",
    members: 156,
    isJoined: true,
    level: "Beginner",
    activity: "Very Active",
  },
  {
    id: 2,
    name: "Hiragana Masters",
    description: "Focus on mastering hiragana writing and reading",
    members: 89,
    isJoined: false,
    level: "Beginner",
    activity: "Active",
  },
  {
    id: 3,
    name: "Grammar Enthusiasts",
    description: "Deep dive into Japanese grammar patterns",
    members: 234,
    isJoined: true,
    level: "Intermediate",
    activity: "Very Active",
  },
  {
    id: 4,
    name: "Daily Conversation Practice",
    description: "Practice everyday Japanese conversations",
    members: 67,
    isJoined: false,
    level: "Intermediate",
    activity: "Moderate",
  },
];

export const recentMessages: CommunityMessage[] = [
  {
    id: 1,
    user: "Sakura_Chan",
    avatar: "/placeholder.svg?height=32&width=32",
    message:
      "Can someone help me understand the difference between は and が particles?",
    group: "Grammar Enthusiasts",
    time: "2 minutes ago",
    replies: 3,
  },
  {
    id: 2,
    user: "TokyoDreamer",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Just completed my first week of hiragana practice! がんばって！",
    group: "Beginner Japanese Learners",
    time: "15 minutes ago",
    replies: 8,
  },
  {
    id: 3,
    user: "KanjiMaster",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Does anyone have tips for remembering kanji readings?",
    group: "Grammar Enthusiasts",
    time: "1 hour ago",
    replies: 12,
  },
];
