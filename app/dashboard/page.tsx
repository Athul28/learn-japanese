"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Flame,
  Star,
  Crown,
  Lock,
  Play,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Mock data - in real app this would come from your database
const mockUser = {
  name: "Yuki Tanaka",
  level: 12,
  xp: 2450,
  xpToNext: 500,
  streak: 7,
  totalLessons: 45,
  completedLessons: 32,
  isPro: false,
};

const lessonCategories = [
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
    title: "Basic Verbs",
    description: "Essential action words",
    icon: "⚡",
    totalLessons: 15,
    completedLessons: 0,
    isUnlocked: false,
    color: "bg-red-100 border-red-300",
    lessons: [
      { id: 12, title: "Movement: Ikimasu, Kimasu", completed: false },
      { id: 13, title: "Daily Actions: Tabemasu, Nomimasu", completed: false },
    ],
  },
  {
    id: 6,
    title: "Particles Mastery",
    description: "Master wa, ga, o, ni, de, and more",
    icon: "🔗",
    totalLessons: 20,
    completedLessons: 0,
    isUnlocked: false,
    color: "bg-indigo-100 border-indigo-300",
    lessons: [],
  },
];

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const progressPercentage =
    (mockUser.xp / (mockUser.xp + mockUser.xpToNext)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Header */}
      <Navbar
        showAuthButtons={false}
        userInitials="YT"
        showUserStats={true}
        userStats={{
          streak: mockUser.streak,
          xp: mockUser.xp,
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Progress & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Progress Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{mockUser.name}</CardTitle>
                    <CardDescription>Level {mockUser.level}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level {mockUser.level + 1}</span>
                      <span>
                        {mockUser.xp}/{mockUser.xp + mockUser.xpToNext} XP
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {mockUser.streak}
                      </div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {mockUser.completedLessons}
                      </div>
                      <div className="text-xs text-gray-600">Lessons Done</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            {!mockUser.isPro && (
              <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                    Upgrade to Pro
                  </CardTitle>
                  <CardDescription>
                    Unlock unlimited lessons and advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                    asChild
                  >
                    <Link href="/upgrade">Upgrade Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lessons completed</span>
                    <span className="text-sm font-semibold">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-600">
                    2 more lessons to reach your daily goal!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Lessons */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Learning Path
              </h1>
              <p className="text-gray-600">
                Continue your Japanese journey with structured lessons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessonCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`${
                    category.color
                  } border-2 hover:shadow-lg transition-all cursor-pointer ${
                    !category.isUnlocked ? "opacity-60" : ""
                  }`}
                  onClick={() =>
                    category.isUnlocked && setSelectedCategory(category.id)
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{category.icon}</div>
                        <div>
                          <CardTitle className="text-lg">
                            {category.title}
                          </CardTitle>
                          <CardDescription>
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                      {!category.isUnlocked && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.completedLessons}/{category.totalLessons}{" "}
                          lessons
                        </span>
                        {category.completedLessons === category.totalLessons &&
                          category.totalLessons > 0 && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                      </div>
                      <Progress
                        value={
                          (category.completedLessons / category.totalLessons) *
                          100
                        }
                        className="h-2"
                      />

                      {category.isUnlocked ? (
                        <Button className="w-full" asChild>
                          <Link href={`/lesson/${category.id}`}>
                            <Play className="w-4 h-4 mr-2" />
                            {category.completedLessons === 0
                              ? "Start"
                              : "Continue"}
                          </Link>
                        </Button>
                      ) : (
                        <Button className="w-full" disabled>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Completed "Japanese Greetings"
                      </p>
                      <p className="text-sm text-gray-600">
                        Earned 100 XP • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">7-day streak!</p>
                      <p className="text-sm text-gray-600">
                        Keep it up! • Today
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
