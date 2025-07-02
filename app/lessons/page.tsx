"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Lock,
  Play,
  CheckCircle,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Trophy,
} from "lucide-react";

// Expanded lesson categories with all content from the PDF
const allLessonCategories = [
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
  {
    id: 13,
    title: "Food Vocabulary",
    description: "Food items: onigiri, yasai, niku, sakana",
    icon: "🍱",
    totalLessons: 7,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Beginner",
    estimatedTime: "12 min",
    color: "bg-amber-100 border-amber-300",
    topics: ["onigiri", "yasai", "niku", "sakana", "tamago"],
  },
  {
    id: 14,
    title: "Daily Expressions",
    description: "Common phrases: tadaima, okaerinasai, itte kimasu",
    icon: "💬",
    totalLessons: 10,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Intermediate",
    estimatedTime: "18 min",
    color: "bg-teal-100 border-teal-300",
    topics: ["tadaima", "okaerinasai", "itte kimasu", "wakarimashita"],
  },
  {
    id: 15,
    title: "Existence (Aru/Iru)",
    description: "Learn aru and iru for existence of things and people",
    icon: "📍",
    totalLessons: 8,
    completedLessons: 0,
    isUnlocked: false,
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    color: "bg-lime-100 border-lime-300",
    topics: ["arimasu", "imasu", "arimasen", "imasen"],
  },
];

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredLessons = allLessonCategories.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || lesson.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const totalLessons = allLessonCategories.reduce(
    (sum, cat) => sum + cat.totalLessons,
    0
  );
  const completedLessons = allLessonCategories.reduce(
    (sum, cat) => sum + cat.completedLessons,
    0
  );
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Japanese Lessons
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Master Japanese through our comprehensive curriculum
          </p>

          {/* Overall Progress */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Your Overall Progress
                  </h3>
                  <p className="text-blue-100">
                    {completedLessons} of {totalLessons} lessons completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{overallProgress}%</div>
                  <div className="text-blue-100">Complete</div>
                </div>
              </div>
              <Progress value={overallProgress} className="h-3 bg-blue-400" />
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`${
                lesson.color
              } border-2 hover:shadow-lg transition-all ${
                !lesson.isUnlocked ? "opacity-60" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{lesson.icon}</div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge
                      variant={
                        lesson.difficulty === "Beginner"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {lesson.difficulty}
                    </Badge>
                    {!lesson.isUnlocked && (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription className="text-sm">
                  {lesson.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Lesson Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{lesson.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        {lesson.completedLessons}/{lesson.totalLessons}{" "}
                        completed
                      </span>
                      {lesson.completedLessons === lesson.totalLessons &&
                        lesson.totalLessons > 0 && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                    </div>
                    <Progress
                      value={
                        (lesson.completedLessons / lesson.totalLessons) * 100
                      }
                      className="h-2"
                    />
                  </div>

                  {/* Topics Preview */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2">
                      Topics covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.topics.slice(0, 3).map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {lesson.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lesson.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  {lesson.isUnlocked ? (
                    <Button className="w-full" asChild>
                      <Link href={`/lesson/${lesson.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        {lesson.completedLessons === 0 ? "Start" : "Continue"}
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

        {/* Study Tips */}
        <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Trophy className="w-5 h-5 mr-2" />
              Study Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Practice Daily</p>
                  <p className="text-gray-600">
                    Even 10 minutes a day helps build consistency
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Join Study Groups</p>
                  <p className="text-gray-600">
                    Practice with other learners in our community
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <BookOpen className="w-4 h-4 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium">Review Regularly</p>
                  <p className="text-gray-600">
                    Revisit completed lessons to reinforce learning
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
