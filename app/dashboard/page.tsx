"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useProgress } from "@/hooks/use-progress";
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
  const { data: session, status } = useSession();
  const {
    userProgress,
    lessonProgress,
    loading,
    error,
    updateProgress,
    updateLessonProgress,
    isAuthenticated,
  } = useProgress();

  // Show loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading progress: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Calculate XP needed for next level
  const xpForCurrentLevel = (userProgress.level - 1) * 500;
  const xpForNextLevel = userProgress.level * 500;
  const xpProgress = userProgress.xp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = xpNeeded > 0 ? (xpProgress / xpNeeded) * 100 : 0;

  // Calculate daily goal progress
  const dailyGoalProgress =
    userProgress.dailyGoal > 0
      ? (userProgress.completedLessons / userProgress.dailyGoal) * 100
      : 0;

  const getUserInitials = () => {
    const name = getDisplayName();
    if (name === "Guest User") return "GU";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = () => {
    if (isAuthenticated && session?.user?.name) {
      return session.user.name;
    }
    return "Guest User";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Progress & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Guest User Notice */}
            {!isAuthenticated && (
              <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">👋</div>
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Welcome, Guest!
                    </p>
                    <p className="text-xs text-blue-700 mb-3">
                      Your progress is saved locally. Sign up to sync across
                      devices!
                    </p>
                    <Button
                      size="sm"
                      asChild
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Link href="/auth/signup">Create Account</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* User Progress Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        session?.user?.image ||
                        "/placeholder.svg?height=48&width=48"
                      }
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {getDisplayName()}
                      {!isAuthenticated && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Guest
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Level {userProgress.level}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level {userProgress.level + 1}</span>
                      <span>
                        {xpProgress}/{xpNeeded} XP
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {userProgress.streak}
                      </div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {userProgress.completedLessons}
                      </div>
                      <div className="text-xs text-gray-600">Lessons Done</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            {!userProgress.isProMember && (
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
                <CardTitle className="text-lg">Today&apos;s Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lessons completed</span>
                    <span className="text-sm font-semibold">
                      {userProgress.completedLessons}/{userProgress.dailyGoal}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(dailyGoalProgress, 100)}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600">
                    {userProgress.completedLessons >= userProgress.dailyGoal
                      ? "🎉 Daily goal achieved!"
                      : `${
                          userProgress.dailyGoal - userProgress.completedLessons
                        } more lesson${
                          userProgress.dailyGoal -
                            userProgress.completedLessons ===
                          1
                            ? ""
                            : "s"
                        } to reach your daily goal!`}
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
                  {lessonProgress.length > 0 ? (
                    <>
                      {lessonProgress
                        .filter((p) => p.status === "COMPLETED")
                        .slice(0, 2)
                        .map((progress, index) => (
                          <div
                            key={progress.lessonId}
                            className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Completed Lesson</p>
                              <p className="text-sm text-gray-600">
                                Score: {progress.score || 0}% •{" "}
                                {progress.completedAt
                                  ? new Date(
                                      progress.completedAt
                                    ).toLocaleDateString()
                                  : "Recently"}
                              </p>
                            </div>
                          </div>
                        ))}
                      {userProgress.streak > 0 && (
                        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <Flame className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {userProgress.streak}-day streak!
                            </p>
                            <p className="text-sm text-gray-600">
                              Keep it up! • Today
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-gray-400 mb-2">
                        <Trophy className="w-12 h-12 mx-auto" />
                      </div>
                      <p className="text-gray-600">No achievements yet</p>
                      <p className="text-sm text-gray-500">
                        Complete your first lesson to get started!
                      </p>
                    </div>
                  )}
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
